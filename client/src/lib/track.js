// First-party event tracking. Deliberately independent from lib/api.js:
// analytics must never hard-redirect a user on 401 and must survive tab
// close via fetch keepalive (sendBeacon cannot carry the Bearer header).
import { getToken } from './api.js';

const FLUSH_MS = 8000;
const MAX_BATCH = 25;
const HEARTBEAT_MS = 120_000;
const ACTIVE_WINDOW_MS = 2 * 60_000;

let queue = [];
let timer = null;
let lastActivity = Date.now();
let heartbeatTimer = null;
let started = false;

// One session id per tab; stitches events into visits.
function sessionId() {
  try {
    let sid = sessionStorage.getItem('is8_sid');
    if (!sid) {
      sid = (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2)) + '';
      sessionStorage.setItem('is8_sid', sid);
    }
    return sid;
  } catch {
    return 'nosess';
  }
}

// Dev StrictMode double-mounts fire mount effects twice; drop exact repeats
// landing within a second of each other.
let lastKey = '';
let lastAt = 0;

export function track(type, payload = {}) {
  const key = type + JSON.stringify(payload);
  const now = Date.now();
  if (key === lastKey && now - lastAt < 1000) return;
  lastKey = key;
  lastAt = now;

  queue.push({ type, payload, sessionId: sessionId(), at: new Date().toISOString() });
  if (queue.length >= MAX_BATCH) flush();
  else if (!timer) timer = setTimeout(flush, FLUSH_MS);
}

// High-intent events that race a navigation (outbound clicks) flush at once.
export function trackNow(type, payload = {}) {
  track(type, payload);
  flush(true);
}

function flush(keepalive = false) {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (!queue.length) return;
  const token = getToken();
  if (!token) {
    queue = [];
    return;
  }
  // Drain the whole queue now, in batch-sized chunks. On pagehide there is
  // no "later": every chunk must be its own keepalive-capable request.
  while (queue.length) {
    const body = JSON.stringify({ events: queue.splice(0, MAX_BATCH) });
    fetch('/api/events', {
      method: 'POST',
      keepalive,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    }).catch(() => {});
  }
}

// Time-on-platform: one heartbeat every two minutes, only while the tab is
// visible AND the user did something (pointer/key/scroll) in the last two.
function startHeartbeat() {
  const markActive = () => {
    lastActivity = Date.now();
  };
  window.addEventListener('pointerdown', markActive, { passive: true });
  window.addEventListener('keydown', markActive, { passive: true });
  // The app scrolls an inner container; scroll doesn't bubble but does capture.
  window.addEventListener('scroll', markActive, { passive: true, capture: true });
  window.addEventListener('wheel', markActive, { passive: true });
  window.addEventListener('touchmove', markActive, { passive: true });

  heartbeatTimer = setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    if (Date.now() - lastActivity > ACTIVE_WINDOW_MS) return;
    track('heartbeat', {});
  }, HEARTBEAT_MS);
}

// Flush whatever is queued when the tab hides or unloads.
function startUnloadFlush() {
  const onHide = () => flush(true);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') onHide();
  });
  window.addEventListener('pagehide', onHide);
}

// Idempotent bootstrap; called once from the authed app shell.
export function initTracking() {
  if (started) return;
  started = true;
  startHeartbeat();
  startUnloadFlush();
}

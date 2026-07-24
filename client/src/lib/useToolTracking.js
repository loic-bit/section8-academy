import { useEffect, useRef } from 'react';
import { track } from './track.js';

// Shared tool_state analytics for the interactive tools. Skips the first
// render (default inputs are noise), then debounces 1.5s so we log settled
// states instead of every keystroke or slider tick.
export function useToolTracking(tool, deps, getPayload) {
  const firstState = useRef(true);

  useEffect(() => {
    if (firstState.current) {
      firstState.current = false;
      return;
    }
    const t = setTimeout(() => {
      track('tool_state', { tool, ...getPayload() });
    }, 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

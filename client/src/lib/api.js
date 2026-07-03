// Thin fetch wrapper. Attaches the auth token, unwraps JSON / errors, and
// clears a dead session on 401 so an expired token can't wedge the app.
const TOKEN_KEY = 'is8_token';

// localStorage can throw (private mode, blocked storage). Never let that crash the app.
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};
export const setToken = (t) => {
  try {
    localStorage.setItem(TOKEN_KEY, t);
  } catch {
    /* storage blocked — session lives in memory for this tab only */
  }
};
export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
};

export async function api(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`/api${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    // Network failure — give a human message instead of a raw TypeError.
    throw new Error('Network error. Check your connection and try again.');
  }

  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    // Session is dead. Clear it and bounce to login (unless we're mid-auth).
    clearToken();
    if (!path.startsWith('/auth/')) {
      window.location.assign('/login');
    }
  }

  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

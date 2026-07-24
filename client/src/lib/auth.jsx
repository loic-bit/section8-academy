import { createContext, useContext, useEffect, useState } from 'react';
import { api, setToken, clearToken, getToken } from './api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On load, if we have a token, fetch the current user.
  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    api('/auth/me')
      .then((d) => setUser(d.user))
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, []);

  async function signup(payload) {
    const d = await api('/auth/signup', { method: 'POST', body: payload });
    setToken(d.token);
    setUser(d.user);
  }

  async function login(payload) {
    const d = await api('/auth/login', { method: 'POST', body: payload });
    setToken(d.token);
    setUser(d.user);
  }

  function logout() {
    clearToken();
    // Drop the cached quiz result so one browser's result can never bleed
    // into the next account that logs in here.
    try {
      localStorage.removeItem('is8_quiz_result');
    } catch {
      /* ignore */
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

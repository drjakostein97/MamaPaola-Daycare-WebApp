import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { login as loginRequest } from '../services/authService';
import type { ApiResult, LoginPayload, LoginResponse } from '../services/types';

const TOKEN_KEY = 'admin_token';
const EXPIRES_KEY = 'admin_token_expires_at';
const DISPLAY_NAME_KEY = 'admin_display_name';

function readStoredAuth(): { token: string | null; displayName: string | null } {
  const token = localStorage.getItem(TOKEN_KEY);
  const expiresAt = localStorage.getItem(EXPIRES_KEY);
  const displayName = localStorage.getItem(DISPLAY_NAME_KEY);

  if (!token || !expiresAt || Date.now() >= new Date(expiresAt).getTime()) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(DISPLAY_NAME_KEY);
    return { token: null, displayName: null };
  }

  return { token, displayName };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ token, displayName }, setAuth] = useState(readStoredAuth);

  const login = useCallback(
    async (payload: LoginPayload): Promise<ApiResult<LoginResponse>> => {
      const result = await loginRequest(payload);
      if (result.success && result.data) {
        localStorage.setItem(TOKEN_KEY, result.data.token);
        localStorage.setItem(EXPIRES_KEY, result.data.expiresAt);
        localStorage.setItem(DISPLAY_NAME_KEY, result.data.displayName);
        setAuth({ token: result.data.token, displayName: result.data.displayName });
      }
      return result;
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(DISPLAY_NAME_KEY);
    setAuth({ token: null, displayName: null });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, displayName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

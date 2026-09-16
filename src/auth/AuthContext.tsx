import { createContext } from 'react';
import type { ApiResult, LoginPayload, LoginResponse } from '../services/types';

export interface AuthContextValue {
  isAuthenticated: boolean;
  token: string | null;
  displayName: string | null;
  login: (payload: LoginPayload) => Promise<ApiResult<LoginResponse>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { AuthProvider } from './AuthProvider';
import { useAuth } from './useAuth';
import { login as loginRequest } from '../services/authService';
import type { ApiResult, LoginResponse } from '../services/types';

vi.mock('../services/authService');

const TOKEN_KEY = 'admin_token';
const EXPIRES_KEY = 'admin_token_expires_at';
const DISPLAY_NAME_KEY = 'admin_display_name';

function renderAuth() {
  return renderHook(() => useAuth(), { wrapper: AuthProvider });
}

beforeEach(() => {
  localStorage.clear();
  vi.mocked(loginRequest).mockReset();
});

describe('AuthProvider', () => {
  it('starts unauthenticated when nothing is stored', () => {
    const { result } = renderAuth();

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.token).toBeNull();
  });

  it('loads a valid, non-expired stored token on mount', () => {
    localStorage.setItem(TOKEN_KEY, 'stored-token');
    localStorage.setItem(EXPIRES_KEY, new Date(Date.now() + 60_000).toISOString());
    localStorage.setItem(DISPLAY_NAME_KEY, 'Admin');

    const { result } = renderAuth();

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.token).toBe('stored-token');
    expect(result.current.displayName).toBe('Admin');
  });

  it('clears an expired stored token on mount and stays unauthenticated', () => {
    localStorage.setItem(TOKEN_KEY, 'stale-token');
    localStorage.setItem(EXPIRES_KEY, new Date(Date.now() - 60_000).toISOString());
    localStorage.setItem(DISPLAY_NAME_KEY, 'Admin');

    const { result } = renderAuth();

    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    expect(localStorage.getItem(EXPIRES_KEY)).toBeNull();
    expect(localStorage.getItem(DISPLAY_NAME_KEY)).toBeNull();
  });

  it('login() success writes localStorage and becomes authenticated', async () => {
    const data: LoginResponse = { token: 'new-token', expiresAt: new Date(Date.now() + 60_000).toISOString(), displayName: 'Admin' };
    vi.mocked(loginRequest).mockResolvedValue({ success: true, data } as ApiResult<LoginResponse>);

    const { result } = renderAuth();

    await act(async () => {
      await result.current.login({ username: 'admin', password: 'secret' });
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.token).toBe('new-token');
    expect(localStorage.getItem(TOKEN_KEY)).toBe('new-token');
  });

  it('login() failure does not write localStorage and returns the raw result', async () => {
    vi.mocked(loginRequest).mockResolvedValue({ success: false, error: 'Invalid username or password.' } as ApiResult<LoginResponse>);

    const { result } = renderAuth();
    let returned: ApiResult<LoginResponse> | undefined;
    await act(async () => {
      returned = await result.current.login({ username: 'admin', password: 'wrong' });
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    expect(returned).toEqual({ success: false, error: 'Invalid username or password.' });
  });

  it('logout() clears localStorage and resets state', async () => {
    localStorage.setItem(TOKEN_KEY, 'stored-token');
    localStorage.setItem(EXPIRES_KEY, new Date(Date.now() + 60_000).toISOString());
    localStorage.setItem(DISPLAY_NAME_KEY, 'Admin');

    const { result } = renderAuth();
    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
  });
});

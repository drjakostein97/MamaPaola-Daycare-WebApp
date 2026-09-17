import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login } from './authService';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

describe('login', () => {
  it('rewrites a 401 error to a friendly invalid-credentials message', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('{}', { status: 401 }));

    const result = await login({ username: 'admin', password: 'wrong' });

    expect(result).toEqual({
      success: false,
      error: 'Invalid username or password.',
      status: 401,
    });
  });

  it('passes through other error statuses unchanged', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response('{}', { status: 500 }));

    const result = await login({ username: 'admin', password: 'x' });

    expect(result).toEqual({
      success: false,
      error: 'Request failed with status 500',
      status: 500,
    });
  });

  it('passes through a successful response unchanged', async () => {
    const body = { token: 'abc', expiresAt: '2026-01-01T00:00:00Z', displayName: 'Admin' };
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify(body), { status: 200 }));

    const result = await login({ username: 'admin', password: 'correct' });

    expect(result).toEqual({ success: true, data: body });
  });

  it('POSTs to /api/auth/login with the payload as the body', async () => {
    const fetchSpy = vi.mocked(fetch).mockResolvedValue(new Response('{}', { status: 200 }));

    await login({ username: 'admin', password: 'secret' });

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.test.local/api/auth/login',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ username: 'admin', password: 'secret' }),
      }),
    );
  });
});

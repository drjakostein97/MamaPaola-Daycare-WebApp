import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('request', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('short-circuits without calling fetch when VITE_API_BASE_URL is unset', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '');
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    const { request } = await import('./client');
    const result = await request('/api/test');

    expect(result).toEqual({ success: false, error: 'API base URL is not configured yet.' });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('returns success with parsed data on an ok response', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.test.local');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ foo: 'bar' }), { status: 200 })),
    );

    const { request } = await import('./client');
    const result = await request<{ foo: string }>('/api/test');

    expect(result).toEqual({ success: true, data: { foo: 'bar' } });
  });

  it('merges Content-Type with caller headers, letting the caller override', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.test.local');
    const fetchSpy = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchSpy);

    const { request } = await import('./client');
    await request('/api/test', { headers: { Authorization: 'Bearer abc', 'Content-Type': 'text/plain' } });

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.test.local/api/test',
      expect.objectContaining({
        headers: { 'Content-Type': 'text/plain', Authorization: 'Bearer abc' },
      }),
    );
  });

  it('returns a status-coded error on a non-ok response', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.test.local');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 404 })));

    const { request } = await import('./client');
    const result = await request('/api/missing');

    expect(result).toEqual({
      success: false,
      error: 'Request failed with status 404',
      status: 404,
    });
  });

  it('returns a network error when fetch throws', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'https://api.test.local');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));

    const { request } = await import('./client');
    const result = await request('/api/test');

    expect(result).toEqual({ success: false, error: 'Network error' });
  });
});

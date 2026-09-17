import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitContactForm } from './contactService';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

describe('submitContactForm', () => {
  it('POSTs to /api/contact with the payload as the body', async () => {
    const fetchSpy = vi.mocked(fetch).mockResolvedValue(new Response('{}', { status: 200 }));
    const payload = { name: 'Jane', email: 'jane@example.com', phone: '555-1234', message: 'Hi' };

    const result = await submitContactForm(payload);

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.test.local/api/contact',
      expect.objectContaining({ method: 'POST', body: JSON.stringify(payload) }),
    );
    expect(result.success).toBe(true);
  });
});

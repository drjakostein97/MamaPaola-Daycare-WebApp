import { describe, it, expect, vi, beforeEach } from 'vitest';
import { submitEnrollmentInquiry } from './enrollmentService';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

describe('submitEnrollmentInquiry', () => {
  it('POSTs to /api/enrollment with the payload as the body', async () => {
    const fetchSpy = vi.mocked(fetch).mockResolvedValue(new Response('{}', { status: 200 }));
    const payload = {
      parentName: 'Jane Doe',
      email: 'jane@example.com',
      phone: '555-1234',
      children: [{ age: '4' }],
      preferredStartDate: '2026-10-01',
    };

    const result = await submitEnrollmentInquiry(payload);

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.test.local/api/enrollment',
      expect.objectContaining({ method: 'POST', body: JSON.stringify(payload) }),
    );
    expect(result.success).toBe(true);
  });
});

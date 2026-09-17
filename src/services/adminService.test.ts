import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getContactSubmissions, getEnrollmentInquiries, getStaff, createStaff } from './adminService';

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn());
});

describe('adminService', () => {
  it('getContactSubmissions attaches the Authorization header', async () => {
    const fetchSpy = vi.mocked(fetch).mockResolvedValue(new Response('[]', { status: 200 }));

    await getContactSubmissions('my-token');

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.test.local/api/admin/contact-submissions',
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer my-token' }) }),
    );
  });

  it('getEnrollmentInquiries attaches the Authorization header', async () => {
    const fetchSpy = vi.mocked(fetch).mockResolvedValue(new Response('[]', { status: 200 }));

    await getEnrollmentInquiries('my-token');

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.test.local/api/admin/enrollment-inquiries',
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer my-token' }) }),
    );
  });

  it('getStaff attaches the Authorization header', async () => {
    const fetchSpy = vi.mocked(fetch).mockResolvedValue(new Response('[]', { status: 200 }));

    await getStaff('my-token');

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.test.local/api/admin/staff',
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer my-token' }) }),
    );
  });

  it('createStaff POSTs with the Authorization header and payload body', async () => {
    const fetchSpy = vi.mocked(fetch).mockResolvedValue(new Response('{}', { status: 201 }));
    const payload = { username: 'newstaff', displayName: 'New Staff', password: 'Password1!' };

    await createStaff('my-token', payload);

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://api.test.local/api/admin/staff',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ Authorization: 'Bearer my-token' }),
        body: JSON.stringify(payload),
      }),
    );
  });
});

import { request } from './api/client';
import type {
  ApiResult,
  ContactSubmissionRecord,
  CreateStaffPayload,
  EnrollmentInquiryRecord,
  StaffRecord,
} from './types';

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` };
}

export async function getContactSubmissions(token: string): Promise<ApiResult<ContactSubmissionRecord[]>> {
  return request<ContactSubmissionRecord[]>('/api/admin/contact-submissions', {
    headers: authHeaders(token),
  });
}

export async function getEnrollmentInquiries(token: string): Promise<ApiResult<EnrollmentInquiryRecord[]>> {
  return request<EnrollmentInquiryRecord[]>('/api/admin/enrollment-inquiries', {
    headers: authHeaders(token),
  });
}

export async function getStaff(token: string): Promise<ApiResult<StaffRecord[]>> {
  return request<StaffRecord[]>('/api/admin/staff', {
    headers: authHeaders(token),
  });
}

export async function createStaff(
  token: string,
  payload: CreateStaffPayload,
): Promise<ApiResult<StaffRecord>> {
  return request<StaffRecord>('/api/admin/staff', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });
}

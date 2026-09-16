import { request } from './api/client';
import type { ApiResult, EnrollmentInquiryPayload } from './types';

export async function submitEnrollmentInquiry(
  payload: EnrollmentInquiryPayload,
): Promise<ApiResult<null>> {
  return request<null>('/api/enrollment', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

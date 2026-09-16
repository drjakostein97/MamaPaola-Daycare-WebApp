import { request } from './api/client';
import type { ApiResult, ContactFormPayload } from './types';

export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<ApiResult<null>> {
  return request<null>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

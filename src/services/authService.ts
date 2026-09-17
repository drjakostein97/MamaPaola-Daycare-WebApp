import { request } from './api/client';
import type { ApiResult, LoginPayload, LoginResponse } from './types';

export async function login(payload: LoginPayload): Promise<ApiResult<LoginResponse>> {
  const result = await request<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (!result.success && result.status === 401) {
    return { ...result, error: 'Invalid username or password.' };
  }
  return result;
}

import { request } from './api/client';
import type { ApiResult, LoginPayload, LoginResponse } from './types';

export async function login(payload: LoginPayload): Promise<ApiResult<LoginResponse>> {
  return request<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

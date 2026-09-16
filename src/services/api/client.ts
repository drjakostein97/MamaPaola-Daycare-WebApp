import type { ApiResult } from '../types';

// Base URL for the future C# (ASP.NET Core) API. Unused until VITE_API_BASE_URL is set.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResult<T>> {
  if (!API_BASE_URL) {
    return { success: false, error: 'API base URL is not configured yet.' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!response.ok) {
      return { success: false, error: `Request failed with status ${response.status}` };
    }
    const data = (await response.json()) as T;
    return { success: true, data };
  } catch {
    return { success: false, error: 'Network error' };
  }
}

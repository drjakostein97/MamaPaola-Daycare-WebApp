import type { ApiResult, EnrollmentInquiryPayload } from './types';

export async function submitEnrollmentInquiry(
  payload: EnrollmentInquiryPayload,
): Promise<ApiResult<null>> {
  // TODO: swap mock for real POST once the C# API is live at VITE_API_BASE_URL
  console.log('Enrollment inquiry submitted (mock):', payload);
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, data: null };
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface EnrollmentInquiryPayload {
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: string;
  preferredStartDate: string;
  notes?: string;
}

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

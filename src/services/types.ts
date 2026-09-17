export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface EnrollmentChild {
  age: string;
}

export interface EnrollmentInquiryPayload {
  parentName: string;
  email: string;
  phone: string;
  children: EnrollmentChild[];
  preferredStartDate: string;
  notes?: string;
}

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
  displayName: string;
}

export interface ContactSubmissionRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface EnrollmentInquiryRecord {
  id: number;
  parentName: string;
  email: string;
  phone: string;
  children: EnrollmentChild[];
  preferredStartDate: string;
  notes?: string;
  createdAt: string;
}

export interface StaffRecord {
  id: number;
  username: string;
  displayName: string;
  createdAt: string;
}

export interface CreateStaffPayload {
  username: string;
  displayName: string;
  password: string;
}

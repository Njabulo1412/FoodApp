export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password?: string;
  createdAt?: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

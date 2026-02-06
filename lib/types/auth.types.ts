export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  role: string;
}

export interface User {
  id: number;
  username: string;
  role: 'Admin' | 'HR' | 'Employee';
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}

export enum UserRole {
  Admin = 'Admin',
  HR = 'HR',
  Employee = 'Employee'
}
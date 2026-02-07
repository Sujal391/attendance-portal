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
  role: 'Admin' | 'Hr' | 'Manager' | 'Supervisor';
  name?: string;
  department?: string;
}

export interface AuthResponse {
  token: string;
}

export interface JwtPayload {
  [key: string]: any;
}

export enum UserRole {
  Admin = 'Admin',
  HR = 'Hr',
  Manager = 'Manager',
  Supervisor = 'Supervisor',
}
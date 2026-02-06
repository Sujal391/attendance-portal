// src/services/auth.service.ts
import { apiClient } from '@/lib/api/client';
import { RegisterDto } from '@/lib/types';

export const authService = {
  login: async (username: string, password: string) => {
    return apiClient.post('/api/Auth/login', { username, password });
  },
  
  register: async (data: RegisterDto) => {
    return apiClient.post('/api/Auth/register', data);
  },
};

export default authService;
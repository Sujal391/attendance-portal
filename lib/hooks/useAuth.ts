import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { authService } from '@/services/auth.service';
import type { LoginDto, RegisterDto } from '@/lib/types';

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    async (credentials: LoginDto) => {
      setLoading(true);
      try {
        await authService.login(credentials.username, credentials.password);
        message.success('Login successful!');
        router.push('/dashboard');
      } catch (error: any) {
        message.error(error.response?.data?.message || 'Login failed');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const register = useCallback(
    async (data: RegisterDto) => {
      setLoading(true);
      try {
        await authService.register(data);
        message.success('Registration successful! Please login.');
        router.push('/login');
      } catch (error: any) {
        message.error(error.response?.data?.message || 'Registration failed');
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      // Since session is managed by backend, just redirect
      message.success('Logged out successfully');
      router.push('/login');
    } catch (error: any) {
      message.error('Logout failed');
    } finally {
      setLoading(false);
    }
  }, [router]);

  return {
    login,
    register,
    logout,
    loading,
  };
};

export default useAuth;
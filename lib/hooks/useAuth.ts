import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { ROLE_REDIRECTS } from '@/lib/utils/constants';
import type { LoginDto, RegisterDto } from '@/lib/types';

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearStoreUser = useAuthStore((s) => s.clearUser);

  const login = useCallback(
    async (credentials: LoginDto) => {
      setLoading(true);
      try {
        const { token, user } = await authService.login(
          credentials.username,
          credentials.password
        );

        if (!user) {
          message.error({
            content: 'Login failed: could not read user info from token.',
            key: 'login-error',
            duration: 3,
          });
          return;
        }

        // Persist user + token in zustand (also persisted to localStorage)
        setAuth(user, token);

        message.success({
          content: 'Login successful!',
          key: 'login-success',
          duration: 2,
        });

        // Redirect based on role
        const redirectPath =
          ROLE_REDIRECTS[user.role as keyof typeof ROLE_REDIRECTS] ||
          '/dashboard';
        router.push(redirectPath);
      } catch (error: any) {
        message.error({
          content:
            error.response?.data?.message ||
            'Login failed. Please check your credentials.',
          key: 'login-error',
          duration: 3,
        });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [router, setAuth]
  );

  const register = useCallback(
    async (data: RegisterDto) => {
      setLoading(true);
      try {
        await authService.register(data);
        message.success({
          content: 'Registration successful! Please login.',
          key: 'register-success',
          duration: 2,
        });
        router.push('/login');
      } catch (error: any) {
        message.error({
          content:
            error.response?.data?.message ||
            'Registration failed. Please try again.',
          key: 'register-error',
          duration: 3,
        });
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
      await authService.logout();
      clearStoreUser();
      message.success({
        content: 'Logged out successfully',
        key: 'logout-success',
        duration: 2,
      });
      router.push('/login');
    } catch (error: any) {
      message.error({
        content: 'Logout failed',
        key: 'logout-error',
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  }, [router, clearStoreUser]);

  return {
    login,
    register,
    logout,
    loading,
  };
};

export default useAuth;
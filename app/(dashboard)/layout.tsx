'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuthStore } from '@/store';
import { authService } from '@/services/auth.service';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Spin } from 'antd';

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const token = useAuthStore((s) => s.token);
  const clearUser = useAuthStore((s) => s.clearUser);
  const router = useRouter();
  const axiosRehydrated = useRef(false);

  // Once zustand has loaded from localStorage, re-set the axios Authorization header
  useEffect(() => {
    if (!hasHydrated || axiosRehydrated.current) return;
    axiosRehydrated.current = true;

    if (token) {
      const user = authService.rehydrate(token);
      if (!user) {
        clearUser();
      }
    }
  }, [hasHydrated, token, clearUser]);

  // Redirect to login only AFTER hydration is complete and user is not authenticated
  useEffect(() => {
    if (hasHydrated && !isAuthenticated) {
      router.replace('/login');
    }
  }, [hasHydrated, isAuthenticated, router]);

  // Show spinner while zustand is rehydrating OR user is not authenticated yet
  if (!hasHydrated || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#CBDDE9]">
        <Spin size="large" />
      </div>
    );
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

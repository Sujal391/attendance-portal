'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page immediately
    router.replace('/login');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#CBDDE9]">
      <Spin size="large" />
    </div>
  );
}
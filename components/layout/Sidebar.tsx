'use client';

import { Layout, Menu, Typography } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { USER_ROLES } from '@/lib/utils/constants';
import type { MenuProps } from 'antd';

const { Sider } = Layout;
const { Title } = Typography;

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const role = user?.role;

  const getMenuItems = (): MenuProps['items'] => {
    const items: MenuProps['items'] = [];

    // Dashboard - available to all roles
    items.push({
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    });

    // Employee management - Admin, HR & Supervisor only
    if (role === USER_ROLES.ADMIN || role === USER_ROLES.HR || role === USER_ROLES.SUPERVISOR) {
      items.push({
        key: 'employees-menu',
        icon: <TeamOutlined />,
        label: 'Employees',
        children: [
          {
            key: '/employees',
            icon: <TeamOutlined />,
            label: 'All Employees',
          },
          {
            key: '/employees/new',
            icon: <UserAddOutlined />,
            label: 'Register Employee',
          },
        ],
      });
    }

    // Profile - available to all roles
    items.push({
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Profile',
    });

    return items;
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key);
  };

  // Determine selected key from pathname
  const selectedKey = pathname;

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={240}
      style={{
        background: 'linear-gradient(180deg, #1d5580 0%, #2872A1 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center py-5 px-3">
        {collapsed ? (
          <Title level={4} className="!text-white !mb-0">
            AMS
          </Title>
        ) : (
          <Title level={4} className="!text-white !mb-0 text-center">
            Attendance Portal
          </Title>
        )}
      </div>

      {/* Navigation Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={['employees-menu']}
        items={getMenuItems()}
        onClick={handleMenuClick}
        style={{ background: 'transparent', borderRight: 0 }}
      />
    </Sider>
  );
}

'use client';

import { Layout, Button, Dropdown, Typography, Avatar, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/lib/hooks';
import { useAuthStore } from '@/store';
import type { MenuProps } from 'antd';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Header({ collapsed, onToggle }: HeaderProps) {
  const { logout, loading } = useAuth();
  const user = useAuthStore((s) => s.user);

  const menuItems: MenuProps['items'] = [
    {
      key: 'role',
      label: (
        <Text className="text-gray-500 text-xs">
          Role: {user?.role || 'N/A'}
        </Text>
      ),
      disabled: true,
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: logout,
    },
  ];

  return (
    <AntHeader
      className="flex items-center justify-between px-4 shadow-sm"
      style={{ background: '#fff', padding: '0 24px', height: 64 }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={onToggle}
        className="text-lg"
      />

      <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={['click']}>
        <Space className="cursor-pointer hover:opacity-80 transition-opacity">
          <Avatar
            style={{ backgroundColor: '#2872A1' }}
            icon={<UserOutlined />}
          />
          <Text className="font-medium hidden sm:inline">
            {user?.username || 'User'}
          </Text>
        </Space>
      </Dropdown>
    </AntHeader>
  );
}

'use client';

import { Card, Descriptions, Tag, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/store';

const { Title } = Typography;

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="rounded-xl shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <Avatar
            size={64}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#2872A1' }}
          />
          <div>
            <Title level={4} className="!text-[#2872A1] !mb-0">
              {user?.username || 'User'}
            </Title>
            <Tag color="blue" className="mt-1">
              {user?.role || 'N/A'}
            </Tag>
          </div>
        </div>

        <Descriptions bordered column={1} size="middle">
          <Descriptions.Item label="Username">
            {user?.username || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Role">
            <Tag color="blue">{user?.role || 'N/A'}</Tag>
          </Descriptions.Item>
          {user?.name && (
            <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
          )}
          {user?.department && (
            <Descriptions.Item label="Department">
              {user.department}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </div>
  );
}

'use client';

import { Card, Row, Col, Statistic, Typography, Button, Space } from 'antd';
import {
  TeamOutlined,
  UserAddOutlined,
  DashboardOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { useEmployees } from '@/lib/hooks';
import { USER_ROLES } from '@/lib/utils/constants';

const { Title, Text } = Typography;

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const role = user?.role;
  const { employees, isLoading } = useEmployees();

  const totalEmployees = employees?.length || 0;
  const departments = [...new Set(employees?.map((e) => e.department) || [])];

  // Check if user can manage employees
  const canManageEmployees =
    role === USER_ROLES.ADMIN ||
    role === USER_ROLES.HR ||
    role === USER_ROLES.SUPERVISOR;

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <Title level={3} className="!text-[#2872A1] !mb-1">
          <DashboardOutlined className="mr-2" />
          Dashboard
        </Title>
        <Text className="text-gray-500 text-base">
          Welcome back, <strong>{user?.username}</strong>! You are logged in as{' '}
          <strong>{role}</strong>.
        </Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={8}>
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Total Employees"
              value={totalEmployees}
              prefix={<TeamOutlined style={{ color: '#2872A1' }} />}
              loading={isLoading}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title="Departments"
              value={departments.length}
              prefix={<DashboardOutlined style={{ color: '#52c41a' }} />}
              loading={isLoading}
            />
          </Card>
        </Col>
        {canManageEmployees && (
          <Col xs={24} sm={12} lg={8}>
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-start">
                <Text className="text-gray-500 mb-2">Quick Actions</Text>
                <Space direction="vertical" size="small">
                  <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    onClick={() => router.push('/employees/new')}
                    style={{
                      background: 'linear-gradient(135deg, #2872A1 0%, #1d5580 100%)',
                      border: 'none',
                    }}
                  >
                    Register Employee
                  </Button>
                  <Button
                    icon={<TeamOutlined />}
                    onClick={() => router.push('/employees')}
                  >
                    View All Employees
                  </Button>
                </Space>
              </div>
            </Card>
          </Col>
        )}
      </Row>

      {/* Department Overview for Admin/Manager */}
      {(role === USER_ROLES.ADMIN || role === USER_ROLES.MANAGER) && (
        <Card className="rounded-xl shadow-sm" title="Department Overview">
          <Row gutter={[16, 16]}>
            {departments.map((dept) => {
              const count = employees?.filter((e) => e.department === dept).length || 0;
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={dept}>
                  <Card size="small" className="text-center rounded-lg bg-gray-50">
                    <Statistic title={dept} value={count} suffix="employees" />
                  </Card>
                </Col>
              );
            })}
            {departments.length === 0 && !isLoading && (
              <Col span={24}>
                <Text className="text-gray-400">No employees registered yet.</Text>
              </Col>
            )}
          </Row>
        </Card>
      )}

      {/* Employee Management Quick Access for HR/Supervisor */}
      {canManageEmployees && (
        <Card
          className="rounded-xl shadow-sm mt-6"
          title="Employee Management"
          extra={
            <Button
              type="link"
              icon={<ArrowRightOutlined />}
              onClick={() => router.push('/employees')}
            >
              View All
            </Button>
          }
        >
          <Text className="text-gray-500">
            You have access to register and manage employees. Use the sidebar or quick
            actions above to get started.
          </Text>
        </Card>
      )}
    </div>
  );
}

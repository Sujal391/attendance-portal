'use client';

import { Card, Descriptions, Tag, Button, Space, Typography } from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  BankOutlined,
  IdcardOutlined,
  CameraOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { formatMobile } from '@/lib/utils/formatters';
import type { Employee } from '@/lib/types';

const { Title } = Typography;

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const router = useRouter();

  return (
    <Card className="rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <Title level={4} className="!text-[#2872A1] !mb-0">
          <UserOutlined className="mr-2" />
          Employee Details
        </Title>
        <Space>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => router.push('/employees')}
          >
            Back
          </Button>
          <Button
            type="primary"
            icon={<CameraOutlined />}
            onClick={() => router.push(`/employees/${employee.id}/face-registration`)}
            style={{
              background: 'linear-gradient(135deg, #2872A1 0%, #1d5580 100%)',
              border: 'none',
            }}
          >
            Upload Photo
          </Button>
        </Space>
      </div>

      <Descriptions bordered column={{ xs: 1, sm: 2 }} size="middle">
        <Descriptions.Item
          label={<><IdcardOutlined className="mr-1" /> Employee Code</>}
        >
          <Tag color="blue">{employee.empCode}</Tag>
        </Descriptions.Item>
        <Descriptions.Item
          label={<><UserOutlined className="mr-1" /> Name</>}
        >
          {employee.name}
        </Descriptions.Item>
        <Descriptions.Item
          label={<><BankOutlined className="mr-1" /> Department</>}
        >
          {employee.department}
        </Descriptions.Item>
        <Descriptions.Item
          label={<><PhoneOutlined className="mr-1" /> Mobile</>}
        >
          {formatMobile(employee.mobile)}
        </Descriptions.Item>
        <Descriptions.Item
          label={<><MailOutlined className="mr-1" /> Email</>}
          span={2}
        >
          {employee.email}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}

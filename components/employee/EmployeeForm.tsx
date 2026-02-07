'use client';

import { Form, Input, Select, Button, Card, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import {
  empCodeRules,
  nameRules,
  mobileRules,
  emailRules,
  departmentRules,
} from '@/lib/utils/validations';
import { DEPARTMENT_OPTIONS } from '@/lib/utils/constants';
import type { CreateEmployeeDto } from '@/lib/types';

const { Title } = Typography;

interface EmployeeFormProps {
  onSubmit: (values: CreateEmployeeDto) => Promise<void>;
  loading?: boolean;
  initialValues?: Partial<CreateEmployeeDto>;
  title?: string;
}

export default function EmployeeForm({
  onSubmit,
  loading = false,
  initialValues,
  title = 'Register New Employee',
}: EmployeeFormProps) {
  const [form] = Form.useForm();

  const handleFinish = async (values: CreateEmployeeDto) => {
    await onSubmit(values);
    form.resetFields();
  };

  return (
    <Card className="rounded-xl shadow-md">
      <Title level={4} className="!text-[#2872A1] !mb-6">
        {title}
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
        size="large"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <Form.Item name="empCode" label="Employee Code" rules={empCodeRules}>
            <Input placeholder="e.g. EMP001" />
          </Form.Item>

          <Form.Item name="name" label="Full Name" rules={nameRules}>
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item name="department" label="Department" rules={departmentRules}>
            <Select placeholder="Select department" options={DEPARTMENT_OPTIONS} />
          </Form.Item>

          <Form.Item name="mobile" label="Mobile Number" rules={mobileRules}>
            <Input placeholder="10-digit mobile number" maxLength={10} />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={emailRules} className="md:col-span-2">
            <Input placeholder="employee@company.com" />
          </Form.Item>
        </div>

        <Form.Item className="mb-0 mt-4">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SaveOutlined />}
            size="large"
            style={{
              background: 'linear-gradient(135deg, #2872A1 0%, #1d5580 100%)',
              border: 'none',
            }}
          >
            Register Employee
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

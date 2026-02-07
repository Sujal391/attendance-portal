'use client';

import { Form, Input, Button, Card, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useAuth } from '@/lib/hooks';
import { usernameRules, passwordRules } from '@/lib/utils';
import type { LoginDto } from '@/lib/types';
import Link from 'next/link';

const { Title, Text } = Typography;

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [form] = Form.useForm();

  const handleSubmit = async (values: LoginDto) => {
    try {
      await login(values);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#CBDDE9] to-[#a8c5d9] flex items-center justify-center p-5">
      <div className="w-full max-w-md animate-fadeInUp">
        <Card 
          className="rounded-2xl shadow-2xl border-0"
          style={{ 
            boxShadow: '0 10px 40px rgba(40, 114, 161, 0.15)',
          }}
        >
          {/* Logo/Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg"
                 style={{ background: 'linear-gradient(135deg, #2872A1 0%, #1d5580 100%)' }}>
              <LoginOutlined className="text-4xl text-white" />
            </div>
            <Title level={2} className="!text-[#2872A1] !font-bold !mb-2 !text-3xl">
              Welcome Back
            </Title>
            <Text className="text-gray-600 text-base">
              Sign in to your account to continue
            </Text>
          </div>

          {/* Login Form */}
          <Form
            form={form}
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            className="mt-8"
          >
            <Form.Item
              name="username"
              rules={usernameRules}
              className="mb-5"
            >
              <Input
                prefix={<UserOutlined className="text-[#2872A1] text-base" />}
                placeholder="Username"
                autoComplete="username"
                className="rounded-lg border-gray-300 hover:border-[#2872A1] focus:border-[#2872A1] transition-all"
                style={{
                  padding: '12px 15px',
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={passwordRules}
              className="mb-5"
            >
              <Input.Password
                prefix={<LockOutlined className="text-[#2872A1] text-base" />}
                placeholder="Password"
                autoComplete="current-password"
                className="rounded-lg border-gray-300 hover:border-[#2872A1] focus:border-[#2872A1] transition-all"
                style={{
                  padding: '12px 15px',
                }}
              />
            </Form.Item>

            <Form.Item className="mb-0 mt-2">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                icon={<LoginOutlined />}
                className="rounded-lg font-semibold text-base transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                style={{
                  height: '48px',
                  background: 'linear-gradient(135deg, #2872A1 0%, #1d5580 100%)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(40, 114, 161, 0.2)',
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Divider className="!my-6 !text-gray-500 !text-sm">OR</Divider>

          {/* Register Link */}
          <div className="text-center mt-4">
            <Text className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link 
                href="/register" 
                className="text-[#2872A1] font-semibold hover:text-[#1d5580] hover:underline transition-all"
              >
                Create Account
              </Link>
            </Text>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <Text className="text-gray-600 text-xs">
            © 2024 Attendance Management System. All rights reserved.
          </Text>
        </div>
      </div>
    </div>
  );
}
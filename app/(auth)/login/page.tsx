"use client";

import { Form, Input, Button, Card } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#CBDDE9]">
      <Card
        className="w-full max-w-md shadow-lg rounded-xl"
        bordered={false}
      >
        <h1 className="text-2xl font-semibold text-center text-[#2872A1] mb-6">
          Login to Your Account
        </h1>

        <Form layout="vertical">
          <Form.Item
            label={<span className="text-[#2872A1]">Email</span>}
            name="email"
            rules={[{ required: true }]}
          >
            <Input
              prefix={<MailOutlined className="text-[#2872A1]" />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#2872A1]">Password</span>}
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-[#2872A1]" />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full mt-4">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

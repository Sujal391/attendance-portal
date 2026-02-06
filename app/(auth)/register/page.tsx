"use client";

import { Form, Input, Button, Card } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#CBDDE9]">
      <Card
        className="w-full max-w-md shadow-lg rounded-xl"
        bordered={false}
      >
        <h1 className="text-2xl font-semibold text-center text-[#2872A1] mb-6">
          Create Account
        </h1>

        <Form layout="vertical">
          <Form.Item
            label={<span className="text-[#2872A1]">Full Name</span>}
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              prefix={<UserOutlined className="text-[#2872A1]" />}
              placeholder="Enter your full name"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#2872A1]">Email</span>}
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              prefix={<MailOutlined className="text-[#2872A1]" />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#2872A1]">Password</span>}
            name="password"
            rules={[{ required: true, message: "Please enter a password" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-[#2872A1]" />}
              placeholder="Create a password"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full mt-4"
          >
            Register
          </Button>

          <p className="text-center text-sm text-[#2872A1] mt-4">
            Already have an account?{" "}
            <a href="/login" className="font-medium underline">
              Login
            </a>
          </p>
        </Form>
      </Card>
    </div>
  );
}

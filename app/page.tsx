"use client";

import { Button, Form, Input, Card, Typography } from "antd";
const { Title } = Typography;

export default function Login() {
  return (
    <div className="w-full max-w-md">
      <Card 
        title={
          <Title level={2} className="!text-[#2872A1] !mb-6 text-center">
            Employee Login
          </Title>
        }
        className="shadow-lg border-2 border-[#2872A1]"
        styles={{
          body: {
            padding: '32px 24px',
          }
        }}
      >
        <Form layout="vertical" size="large">
          <Form.Item 
            label={<span className="text-[#2872A1] font-medium">Employee ID</span>} 
            name="empId" 
            required
          >
            <Input className="border-[#2872A1]" />
          </Form.Item>

          <Form.Item 
            label={<span className="text-[#2872A1] font-medium">Password</span>} 
            name="password" 
            required
          >
            <Input.Password className="border-[#2872A1]" />
          </Form.Item>

          <Button 
            type="primary" 
            block 
            size="large"
            className="mt-4 h-12 text-lg font-semibold"
            style={{
              backgroundColor: "#2872A1",
              borderColor: "#2872A1",
            }}
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
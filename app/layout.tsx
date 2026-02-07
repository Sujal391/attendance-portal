import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, App } from 'antd';
import './globals.css';

export const metadata: Metadata = {
  title: 'Attendance Management System',
  description: 'Professional attendance tracking and management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#2872A1',
                colorLink: '#2872A1',
                colorLinkHover: '#1d5580',
                borderRadius: 8,
                colorBgContainer: '#ffffff',
              },
              components: {
                Button: {
                  colorPrimary: '#2872A1',
                  algorithm: true,
                },
                Input: {
                  colorPrimary: '#2872A1',
                  colorPrimaryHover: '#2872A1',
                },
                Select: {
                  colorPrimary: '#2872A1',
                },
                Message: {
                  contentBg: '#ffffff',
                  contentPadding: '10px 16px',
                },
              },
            }}
          >
            <App>
              {children}
            </App>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
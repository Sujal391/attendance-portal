import "antd/dist/reset.css";
import "./globals.css"; // Import the updated CSS
import { ReactNode } from "react";
import { ConfigProvider } from "antd";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full">
      <head>
        <style>{`
          /* Nuclear option - forces background */
          html, body, #__next {
            background-color: #CBDDE9 !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        `}</style>
      </head>
      <body className="bg-[#CBDDE9] h-full">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#2872A1",
              colorText: "#2872A1",
              colorBgContainer: "#FFFFFF",
              colorBgLayout: "#CBDDE9",
            },
          }}
        >
          <div className="min-h-screen flex items-center justify-center p-4 bg-[#CBDDE9]">
            {children}
          </div>
        </ConfigProvider>
      </body>
    </html>
  );
}
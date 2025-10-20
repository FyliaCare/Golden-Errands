'use client';

// AntD Provider Component for Next.js App Router
import React from 'react';
import { ConfigProvider, theme } from 'antd';

export default function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#E63946',
          colorSuccess: '#06d6a0',
          colorWarning: '#FFB703',
          colorError: '#E63946',
          colorInfo: '#0096FF',
          borderRadius: 8,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        components: {
          Button: {
            controlHeight: 40,
            fontSize: 16,
          },
          Input: {
            controlHeight: 40,
            fontSize: 16,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

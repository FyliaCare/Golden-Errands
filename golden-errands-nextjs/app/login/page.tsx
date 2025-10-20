'use client';

import React, { useState } from 'react';
import { Form, Input, Button, message, Typography, Space, Divider } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, RocketOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await login(values.email, values.password);
      message.success('Login successful! Welcome to Golden Errands');
    } catch (err: any) {
      message.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@goldenerrands.com', password: 'admin@2024' },
    { role: 'Driver', email: 'driver@goldenerrands.com', password: 'driver@2024' },
    { role: 'Customer', email: 'customer@example.com', password: 'customer@2024' },
  ];

  return (
    <div className="login-container">
      <div className="login-card fade-in-up">
        <div className="login-logo">
          <RocketOutlined style={{ fontSize: '3rem', color: '#E63946' }} />
          <Title level={1} style={{ margin: '0.5rem 0' }}>
            GOLDEN ERRANDS
          </Title>
          <Text className="brand-tagline">We deliver with passion!</Text>
        </div>

        <Divider />

        <Form name="login" onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email Address" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              icon={<LoginOutlined />}
              size="large"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Divider>Demo Accounts</Divider>

        <Space direction="vertical" style={{ width: '100%' }} size="small">
          {demoAccounts.map((account) => (
            <div
              key={account.email}
              style={{
                padding: '8px 12px',
                background: '#f5f5f5',
                borderRadius: '6px',
                fontSize: '0.875rem',
              }}
            >
              <Text strong style={{ color: '#E63946' }}>
                {account.role}:
              </Text>{' '}
              <Text type="secondary">{account.email}</Text> / <Text code>{account.password}</Text>
            </div>
          ))}
        </Space>

        <Divider />

        <div style={{ textAlign: 'center' }}>
          <Space split={<Divider type="vertical" />}>
            <Text type="secondary">📞 0256039212</Text>
            <Text type="secondary">📧 info@goldenerrands.com</Text>
          </Space>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Typography, Space, Button, message } from 'antd';
import {
  ShoppingOutlined,
  DollarOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  UserOutlined,
  TrophyOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';

const { Title, Text } = Typography;

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, accessToken, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.data || []);
      } else {
        message.error('Failed to fetch orders');
      }
    } catch (error) {
      message.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      PENDING: 'orange',
      CONFIRMED: 'blue',
      ASSIGNED: 'cyan',
      PICKED_UP: 'purple',
      IN_TRANSIT: 'geekblue',
      DELIVERED: 'green',
      FAILED: 'red',
      CANCELLED: 'red',
    };
    return statusColors[status] || 'default';
  };

  const columns = [
    {
      title: 'Order #',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (text: string) => <Text strong>{text.substring(0, 8)}...</Text>,
    },
    {
      title: 'Pickup',
      dataIndex: 'pickupAddress',
      key: 'pickupAddress',
      ellipsis: true,
    },
    {
      title: 'Delivery',
      dataIndex: 'deliveryAddress',
      key: 'deliveryAddress',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: 'Amount',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (amount: number, record: any) => (
        <Text strong>
          {record.currency} {amount.toFixed(2)}
        </Text>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: <ShoppingOutlined />,
      color: '#E63946',
    },
    {
      title: 'Completed',
      value: orders.filter((o: any) => o.status === 'DELIVERED').length,
      icon: <CheckCircleOutlined />,
      color: '#06d6a0',
    },
    {
      title: 'Pending',
      value: orders.filter((o: any) => ['PENDING', 'CONFIRMED', 'ASSIGNED'].includes(o.status))
        .length,
      icon: <ClockCircleOutlined />,
      color: '#FFB703',
    },
    {
      title: 'Revenue',
      value: `GHS ${orders.reduce((sum: number, o: any) => sum + (o.totalPrice || 0), 0).toFixed(2)}`,
      icon: <DollarOutlined />,
      color: '#0096FF',
    },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <DashboardLayout>
      <div>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>Dashboard</Title>
          <Text type="secondary">
            Welcome back, {user?.firstName}! Here's your overview.
          </Text>
        </div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card bordered={false}>
                <Statistic
                  title={stat.title}
                  value={stat.value}
                  prefix={React.cloneElement(stat.icon, { style: { color: stat.color } })}
                  valueStyle={{ color: stat.color }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Recent Orders */}
        <Card
          title="Recent Orders"
          bordered={false}
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => router.push('/dashboard/new-order')}
            >
              New Order
            </Button>
          }
        >
          <Table
            dataSource={orders}
            columns={columns}
            loading={loading}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    </DashboardLayout>
  );
}

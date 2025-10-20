'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Menu, Card, Row, Col, Statistic, Table, Tag, Button, Space, Typography } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  CarOutlined,
  ShoppingOutlined,
  DollarOutlined,
  SettingOutlined,
  LogoutOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    activeOrders: 0,
    completedOrders: 0,
    totalDrivers: 0,
    activeDrivers: 0,
    totalClients: 0,
    todayRevenue: 0,
    pendingDrivers: 0,
  });

  useEffect(() => {
    // TODO: Fetch real data from API
    setLoading(false);
    // Mock data
    setStats({
      totalOrders: 1234,
      activeOrders: 45,
      completedOrders: 1150,
      totalDrivers: 87,
      activeDrivers: 42,
      totalClients: 567,
      todayRevenue: 15420,
      pendingDrivers: 12,
    });
  }, []);

  const menuItems = [
    { key: '/admin/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/admin/orders', icon: <ShoppingOutlined />, label: 'Orders' },
    { key: '/admin/drivers', icon: <CarOutlined />, label: 'Drivers' },
    { key: '/admin/clients', icon: <TeamOutlined />, label: 'Clients' },
    { key: '/admin/payments', icon: <DollarOutlined />, label: 'Payments' },
    { key: '/admin/users', icon: <UserOutlined />, label: 'Users' },
    { key: '/admin/settings', icon: <SettingOutlined />, label: 'Settings' },
  ];

  const recentOrders = [
    { key: '1', orderId: 'GE-2025-001234', customer: 'John Doe', driver: 'Kwame A.', status: 'IN_TRANSIT', amount: 'GH₵25' },
    { key: '2', orderId: 'GE-2025-001235', customer: 'Jane Smith', driver: 'Ama B.', status: 'PICKED_UP', amount: 'GH₵15' },
    { key: '3', orderId: 'GE-2025-001236', customer: 'Bob Wilson', driver: 'Kofi C.', status: 'PENDING', amount: 'GH₵30' },
  ];

  const pendingDrivers = [
    { key: '1', name: 'Yaw Mensah', phone: '0241234567', vehicleType: 'Motorcycle', appliedDate: '2025-10-18' },
    { key: '2', name: 'Akua Owusu', phone: '0242345678', vehicleType: 'Bicycle', appliedDate: '2025-10-19' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} style={{ background: '#fff' }}>
        <div style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={4} style={{ color: '#E63946', margin: 0 }}>
            Admin Panel
          </Title>
          <Text type="secondary" style={{ fontSize: 12 }}>System Administrator</Text>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={['/admin/dashboard']}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
          style={{ borderRight: 0 }}
        />
        <div style={{ position: 'absolute', bottom: 20, width: '100%', padding: '0 20px' }}>
          <Button
            icon={<LogoutOutlined />}
            block
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
          <Title level={3} style={{ margin: '16px 0' }}>Dashboard Overview</Title>
        </Header>

        <Content style={{ margin: '24px', minHeight: 280 }}>
          {/* Stats Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Orders"
                  value={stats.totalOrders}
                  prefix={<ShoppingOutlined style={{ color: '#E63946' }} />}
                  valueStyle={{ color: '#E63946' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Active Orders"
                  value={stats.activeOrders}
                  prefix={<ClockCircleOutlined style={{ color: '#FFB703' }} />}
                  valueStyle={{ color: '#FFB703' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Active Drivers"
                  value={`${stats.activeDrivers}/${stats.totalDrivers}`}
                  prefix={<CarOutlined style={{ color: '#06d6a0' }} />}
                  valueStyle={{ color: '#06d6a0' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Today's Revenue"
                  value={stats.todayRevenue}
                  prefix="GH₵"
                  valueStyle={{ color: '#8338EC' }}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Clients"
                  value={stats.totalClients}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Completed Orders"
                  value={stats.completedOrders}
                  prefix={<CheckCircleOutlined style={{ color: '#06d6a0' }} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card style={{ background: '#FFF3E0', borderLeft: '4px solid #FFB703' }}>
                <Statistic
                  title="Pending Drivers"
                  value={stats.pendingDrivers}
                  prefix={<ClockCircleOutlined />}
                  suffix={
                    <Button
                      type="link"
                      size="small"
                      onClick={() => router.push('/admin/drivers?tab=pending')}
                    >
                      Review
                    </Button>
                  }
                />
              </Card>
            </Col>
          </Row>

          {/* Recent Orders */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={14}>
              <Card
                title="Recent Orders"
                extra={<Button type="link" onClick={() => router.push('/admin/orders')}>View All</Button>}
              >
                <Table
                  dataSource={recentOrders}
                  pagination={false}
                  size="small"
                  columns={[
                    { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
                    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
                    { title: 'Driver', dataIndex: 'driver', key: 'driver' },
                    {
                      title: 'Status',
                      dataIndex: 'status',
                      key: 'status',
                      render: (status) => {
                        const colors: any = {
                          PENDING: 'orange',
                          PICKED_UP: 'blue',
                          IN_TRANSIT: 'cyan',
                          DELIVERED: 'green',
                        };
                        return <Tag color={colors[status]}>{status.replace('_', ' ')}</Tag>;
                      },
                    },
                    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
                  ]}
                />
              </Card>
            </Col>

            <Col xs={24} lg={10}>
              <Card
                title="Pending Driver Applications"
                extra={<Button type="link" onClick={() => router.push('/admin/drivers')}>View All</Button>}
              >
                <Table
                  dataSource={pendingDrivers}
                  pagination={false}
                  size="small"
                  columns={[
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    { title: 'Vehicle', dataIndex: 'vehicleType', key: 'vehicleType' },
                    {
                      title: 'Action',
                      key: 'action',
                      render: () => (
                        <Space>
                          <Button type="link" size="small" style={{ color: '#06d6a0' }}>
                            Approve
                          </Button>
                          <Button type="link" size="small" danger>
                            Reject
                          </Button>
                        </Space>
                      ),
                    },
                  ]}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Menu, Card, Row, Col, Statistic, Table, Tag, Button, Space, Typography, Drawer } from 'antd';
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
  MenuOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
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

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [pendingDrivers, setPendingDrivers] = useState<any[]>([]);

  useEffect(() => {
    // Check screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
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

    setRecentOrders([
      { key: '1', orderId: 'GE-2025-001234', customer: 'John Doe', driver: 'Kwame A.', status: 'IN_TRANSIT', amount: 'GH₵25' },
      { key: '2', orderId: 'GE-2025-001235', customer: 'Jane Smith', driver: 'Ama B.', status: 'PICKED_UP', amount: 'GH₵15' },
      { key: '3', orderId: 'GE-2025-001236', customer: 'Bob Wilson', driver: 'Kofi C.', status: 'PENDING', amount: 'GH₵30' },
    ]);

    setPendingDrivers([
      { key: '1', name: 'Kwadwo Mensah', phone: '0244123456', vehicle: 'Motorcycle', appliedDate: '2025-01-18' },
      { key: '2', name: 'Abena Osei', phone: '0201234567', vehicle: 'Motorcycle', appliedDate: '2025-01-17' },
    ]);

    setLoading(false);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  const menuItems = [
    { key: '1', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '2', icon: <ShoppingOutlined />, label: 'Orders' },
    { key: '3', icon: <CarOutlined />, label: 'Drivers' },
    { key: '4', icon: <TeamOutlined />, label: 'Clients' },
    { key: '5', icon: <DollarOutlined />, label: 'Payments' },
    { key: '6', icon: <UserOutlined />, label: 'Users' },
    { key: '7', icon: <SettingOutlined />, label: 'Settings' },
  ];

  const handleMenuClick = (e: any) => {
    const routes: any = {
      '2': '/admin/orders',
      '3': '/admin/drivers',
      '4': '/admin/clients',
      '5': '/admin/payments',
      '6': '/admin/users',
      '7': '/admin/settings',
    };
    
    if (routes[e.key]) {
      router.push(routes[e.key]);
    }
    
    // Close mobile menu after navigation
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: any = {
      'IN_TRANSIT': 'processing',
      'PICKED_UP': 'cyan',
      'PENDING': 'warning',
      'DELIVERED': 'success',
      'CANCELLED': 'error',
    };
    return colors[status] || 'default';
  };

  // Table columns with responsive config
  const orderColumns = [
    { 
      title: 'Order ID', 
      dataIndex: 'orderId', 
      key: 'orderId',
      responsive: ['sm'] as any,
    },
    { 
      title: 'Customer', 
      dataIndex: 'customer', 
      key: 'customer',
    },
    { 
      title: 'Driver', 
      dataIndex: 'driver', 
      key: 'driver',
      responsive: ['md'] as any,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status.replace('_', ' ')}</Tag>
      ),
    },
    { 
      title: 'Amount', 
      dataIndex: 'amount', 
      key: 'amount',
    },
  ];

  const driverColumns = [
    { 
      title: 'Name', 
      dataIndex: 'name', 
      key: 'name',
    },
    { 
      title: 'Phone', 
      dataIndex: 'phone', 
      key: 'phone',
      responsive: ['sm'] as any,
    },
    { 
      title: 'Vehicle', 
      dataIndex: 'vehicle', 
      key: 'vehicle',
      responsive: ['md'] as any,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="small">
          <Button type="primary" size="small" style={{ background: '#06d6a0' }}>
            Approve
          </Button>
          <Button danger size="small">
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  const SidebarMenu = () => (
    <Menu
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{ height: '100%', borderRight: 0 }}
      onClick={handleMenuClick}
      items={menuItems}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider
          width={250}
          style={{
            background: '#fff',
            borderRight: '1px solid #f0f0f0',
          }}
        >
          <div style={{ padding: '24px 16px', borderBottom: '1px solid #f0f0f0' }}>
            <Title level={4} style={{ margin: 0, color: '#E63946' }}>
              Admin Panel
            </Title>
          </div>
          <SidebarMenu />
        </Sider>
      )}

      {/* Mobile Drawer */}
      <Drawer
        title={<Text strong style={{ color: '#E63946' }}>Admin Panel</Text>}
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
        styles={{ body: { padding: 0 } }}
      >
        <SidebarMenu />
      </Drawer>

      <Layout>
        <Header 
          className="dashboard-header"
          style={{ 
            background: '#fff', 
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileMenuOpen(true)}
                style={{ fontSize: '20px' }}
              />
            )}
            <Title level={3} style={{ margin: 0 }}>
              Dashboard
            </Title>
          </div>
          <Space size="small" wrap>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
              {!isMobile && 'Logout'}
            </Button>
          </Space>
        </Header>

        <Content className="mobile-spacing">
          {/* Stats Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={12} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Total Orders"
                  value={stats.totalOrders}
                  valueStyle={{ color: '#E63946', fontSize: isMobile ? '20px' : '24px' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Active Orders"
                  value={stats.activeOrders}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: '#FFB703', fontSize: isMobile ? '20px' : '24px' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Active Drivers"
                  value={`${stats.activeDrivers}/${stats.totalDrivers}`}
                  prefix={<CarOutlined />}
                  valueStyle={{ color: '#06d6a0', fontSize: isMobile ? '20px' : '24px' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Today's Revenue"
                  value={stats.todayRevenue}
                  prefix="GH₵"
                  valueStyle={{ color: '#8338EC', fontSize: isMobile ? '20px' : '24px' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Additional Stats - Hidden on very small screens */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={12} sm={8}>
              <Card>
                <Statistic
                  title="Total Clients"
                  value={stats.totalClients}
                  prefix={<TeamOutlined />}
                  valueStyle={{ fontSize: isMobile ? '18px' : '20px' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={8}>
              <Card>
                <Statistic
                  title="Completed"
                  value={stats.completedOrders}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: '#06d6a0', fontSize: isMobile ? '18px' : '20px' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card>
                <Statistic
                  title="Pending Drivers"
                  value={stats.pendingDrivers}
                  valueStyle={{ color: '#FFB703', fontSize: isMobile ? '18px' : '20px' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Recent Orders */}
          <Card 
            title="Recent Orders" 
            style={{ marginBottom: 24 }}
            styles={{ 
              header: { fontSize: isMobile ? '16px' : '18px' }
            }}
          >
            <Table
              dataSource={recentOrders}
              columns={orderColumns}
              pagination={false}
              scroll={{ x: isMobile ? 800 : undefined }}
              size={isMobile ? 'small' : 'middle'}
            />
          </Card>

          {/* Pending Driver Applications */}
          <Card 
            title="Pending Driver Applications"
            styles={{ 
              header: { fontSize: isMobile ? '16px' : '18px' }
            }}
          >
            <Table
              dataSource={pendingDrivers}
              columns={driverColumns}
              pagination={false}
              scroll={{ x: isMobile ? 600 : undefined }}
              size={isMobile ? 'small' : 'middle'}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}

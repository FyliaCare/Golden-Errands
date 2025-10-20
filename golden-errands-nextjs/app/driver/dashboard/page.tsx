'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Card, Row, Col, Statistic, Switch, Button, List, Tag, Typography, Space, Avatar } from 'antd';
import {
  CarOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
  StarOutlined,
  BellOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function DriverDashboard() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(false);
  const [stats, setStats] = useState({
    todayEarnings: 0,
    todayDeliveries: 0,
    totalDeliveries: 0,
    rating: 5.0,
    completionRate: 0,
  });

  const [activeOrders, setActiveOrders] = useState<any[]>([]);
  const [availableOrders, setAvailableOrders] = useState<any[]>([]);

  useEffect(() => {
    // TODO: Fetch real data from API
    // Mock data
    setStats({
      todayEarnings: 145.50,
      todayDeliveries: 8,
      totalDeliveries: 234,
      rating: 4.8,
      completionRate: 96,
    });

    setActiveOrders([
      {
        id: '1',
        orderId: 'GE-2025-001234',
        pickup: 'Osu, Accra',
        delivery: 'East Legon, Accra',
        status: 'PICKED_UP',
        amount: 25,
        distance: '5.2 km',
      },
    ]);

    setAvailableOrders([
      {
        id: '2',
        orderId: 'GE-2025-001235',
        pickup: 'Labone, Accra',
        delivery: 'Cantonments, Accra',
        amount: 20,
        distance: '3.8 km',
      },
      {
        id: '3',
        orderId: 'GE-2025-001236',
        pickup: 'Osu, Accra',
        delivery: 'Airport, Accra',
        amount: 30,
        distance: '7.5 km',
      },
    ]);
  }, []);

  const handleToggleOnline = (checked: boolean) => {
    setIsOnline(checked);
    // TODO: Update driver status in backend
  };

  const handleAcceptOrder = (orderId: string) => {
    // TODO: Accept order via API
    console.log('Accepting order:', orderId);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    router.push('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={3} style={{ margin: '16px 0' }}>
            <CarOutlined style={{ color: '#E63946', marginRight: 8 }} />
            Driver Dashboard
          </Title>
          <Space size="large">
            <div>
              <Text strong style={{ marginRight: 8 }}>Status:</Text>
              <Switch
                checked={isOnline}
                onChange={handleToggleOnline}
                checkedChildren="Online"
                unCheckedChildren="Offline"
              />
            </div>
            <Button icon={<BellOutlined />} />
            <Button icon={<UserOutlined />} onClick={() => router.push('/driver/profile')} />
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Button>
          </Space>
        </div>
      </Header>

      <Content style={{ padding: '24px' }}>
        {/* Stats */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Today's Earnings"
                value={stats.todayEarnings}
                prefix="GH₵"
                valueStyle={{ color: '#E63946', fontWeight: 'bold' }}
                suffix={
                  <Text type="secondary" style={{ fontSize: 14 }}>
                    /{stats.todayDeliveries} deliveries
                  </Text>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Deliveries"
                value={stats.totalDeliveries}
                prefix={<CheckCircleOutlined style={{ color: '#06d6a0' }} />}
                valueStyle={{ color: '#06d6a0' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Rating"
                value={stats.rating}
                prefix={<StarOutlined style={{ color: '#FFB703' }} />}
                suffix="/ 5.0"
                valueStyle={{ color: '#FFB703' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Completion Rate"
                value={stats.completionRate}
                suffix="%"
                valueStyle={{ color: '#8338EC' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {/* Active Deliveries */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <span>
                  <ClockCircleOutlined style={{ marginRight: 8, color: '#FFB703' }} />
                  Active Deliveries
                </span>
              }
              extra={<Tag color="processing">{activeOrders.length} Active</Tag>}
            >
              {activeOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <Text type="secondary">No active deliveries</Text>
                  <Paragraph type="secondary" style={{ marginTop: 8 }}>
                    {isOnline ? 'Waiting for new orders...' : 'Go online to receive orders'}
                  </Paragraph>
                </div>
              ) : (
                <List
                  dataSource={activeOrders}
                  renderItem={(order) => (
                    <List.Item
                      actions={[
                        <Button
                          type="primary"
                          danger
                          onClick={() => router.push(`/driver/delivery/${order.id}`)}
                        >
                          View Details
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <Space>
                            <Text strong>{order.orderId}</Text>
                            <Tag color="blue">{order.status.replace('_', ' ')}</Tag>
                          </Space>
                        }
                        description={
                          <div>
                            <div>
                              <EnvironmentOutlined style={{ marginRight: 4 }} />
                              Pickup: {order.pickup}
                            </div>
                            <div>
                              <EnvironmentOutlined style={{ marginRight: 4 }} />
                              Delivery: {order.delivery}
                            </div>
                            <div style={{ marginTop: 4 }}>
                              <Text type="secondary">{order.distance}</Text>
                              <Text strong style={{ marginLeft: 16, color: '#E63946' }}>
                                GH₵{order.amount}
                              </Text>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Col>

          {/* Available Orders */}
          <Col xs={24} lg={12}>
            <Card
              title={
                <span>
                  <CarOutlined style={{ marginRight: 8, color: '#E63946' }} />
                  Available Orders
                </span>
              }
              extra={
                isOnline ? (
                  <Tag color="success">Receiving Orders</Tag>
                ) : (
                  <Tag color="default">Offline</Tag>
                )
              }
            >
              {!isOnline ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <CarOutlined style={{ fontSize: 48, color: '#ccc', marginBottom: 16 }} />
                  <Paragraph type="secondary">
                    You are currently offline. Turn on "Online" status to receive delivery requests.
                  </Paragraph>
                  <Button
                    type="primary"
                    danger
                    size="large"
                    onClick={() => setIsOnline(true)}
                  >
                    Go Online
                  </Button>
                </div>
              ) : availableOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <Text type="secondary">No available orders at the moment</Text>
                </div>
              ) : (
                <List
                  dataSource={availableOrders}
                  renderItem={(order) => (
                    <List.Item
                      actions={[
                        <Button
                          type="primary"
                          danger
                          onClick={() => handleAcceptOrder(order.id)}
                        >
                          Accept
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{ background: '#E63946' }}
                            icon={<DollarOutlined />}
                          >
                            {order.amount}
                          </Avatar>
                        }
                        title={<Text strong>GH₵{order.amount}</Text>}
                        description={
                          <div>
                            <div>
                              <EnvironmentOutlined style={{ marginRight: 4 }} />
                              {order.pickup} → {order.delivery}
                            </div>
                            <Text type="secondary">{order.distance}</Text>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable onClick={() => router.push('/driver/earnings')}>
              <Statistic
                title="View Earnings"
                value=""
                prefix={<DollarOutlined style={{ fontSize: 32, color: '#E63946' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable onClick={() => router.push('/driver/history')}>
              <Statistic
                title="Delivery History"
                value=""
                prefix={<CheckCircleOutlined style={{ fontSize: 32, color: '#06d6a0' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable onClick={() => router.push('/driver/profile')}>
              <Statistic
                title="My Profile"
                value=""
                prefix={<UserOutlined style={{ fontSize: 32, color: '#8338EC' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable onClick={() => router.push('/driver/support')}>
              <Statistic
                title="Support"
                value=""
                prefix={<BellOutlined style={{ fontSize: 32, color: '#FFB703' }} />}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

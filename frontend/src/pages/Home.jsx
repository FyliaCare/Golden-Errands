import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Typography, Space, Statistic } from 'antd';
import {
  RocketOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function Home() {
  const navigate = useNavigate();

  const services = [
    {
      icon: <RocketOutlined />,
      title: 'Food Delivery',
      description: 'Hot meals delivered fresh from your favorite restaurants',
      color: '#E63946',
    },
    {
      icon: <EnvironmentOutlined />,
      title: 'Parcel Delivery',
      description: 'Safe and secure package delivery across the city',
      color: '#FB8500',
    },
    {
      icon: <ThunderboltOutlined />,
      title: 'Grocery Errands',
      description: 'Shop for groceries while you focus on what matters',
      color: '#FFB703',
    },
    {
      icon: <SafetyOutlined />,
      title: 'Pharmaceutical',
      description: 'Timely delivery of medicines and health products',
      color: '#06d6a0',
    },
    {
      icon: <TeamOutlined />,
      title: 'Bus Station Pickup',
      description: 'Collect parcels from bus stations on your behalf',
      color: '#0096FF',
    },
    {
      icon: <CheckCircleOutlined />,
      title: 'Personal Errands',
      description: 'Any errand you need - we handle it with care',
      color: '#8338EC',
    },
  ];

  const features = [
    { value: '5000+', label: 'Deliveries Completed', prefix: <RocketOutlined /> },
    { value: '500+', label: 'Happy Customers', prefix: <TeamOutlined /> },
  { value: '50+', label: 'Professional Riders', prefix: <SafetyOutlined /> },
    { value: '24/7', label: 'Available Support', prefix: <ClockCircleOutlined /> },
  ];

  return (
    <div style={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
          padding: '80px 20px',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <RocketOutlined style={{ fontSize: 64, marginBottom: 16 }} />
            <Title level={1} style={{ color: 'white', fontSize: 48, marginBottom: 8 }}>
              GOLDEN ERRANDS
            </Title>
            <Title level={3} style={{ color: '#FFB703', fontWeight: 'normal', marginTop: 0 }}>
              We Deliver with Passion!
            </Title>
          </div>

          <Paragraph style={{ fontSize: 20, color: 'white', maxWidth: 600, margin: '0 auto 32px' }}>
            Your trusted partner for fast, reliable, and professional delivery services.
            From food to parcels, we handle your errands with care.
          </Paragraph>

          <Space size="large" wrap style={{ marginBottom: 32 }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                height: 50,
                padding: '0 32px',
                fontSize: 18,
                background: '#FFB703',
                border: 'none',
                borderRadius: 8,
                color: '#1a1a1a',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <RocketOutlined />
              Get Started
            </button>
            <button
              onClick={() => (window.location.href = 'tel:0256039212')}
              style={{
                height: 50,
                padding: '0 32px',
                fontSize: 18,
                background: 'white',
                border: 'none',
                borderRadius: 8,
                color: '#E63946',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <PhoneOutlined />
              Call Us Now
            </button>
          </Space>

          <div style={{ marginTop: 32 }}>
            <Space size="large" wrap>
              <Space>
                <PhoneOutlined style={{ fontSize: 20 }} />
                <Text strong style={{ color: 'white', fontSize: 16 }}>
                  0256039212 | 0256039213 | 0256039214
                </Text>
              </Space>
            </Space>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '60px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            {features.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  bordered={false}
                  style={{
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderTop: '4px solid #E63946',
                  }}
                >
                  <Statistic
                    title={stat.label}
                    value={stat.value}
                    prefix={React.cloneElement(stat.prefix, {
                      style: { color: '#E63946', fontSize: 24 },
                    })}
                    valueStyle={{ color: '#E63946', fontWeight: 'bold', fontSize: 32 }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2} style={{ color: '#E63946', fontSize: 36 }}>
              Our Services
            </Title>
            <Paragraph style={{ fontSize: 18, color: '#666', maxWidth: 600, margin: '0 auto' }}>
              We offer a wide range of delivery and errand services tailored to your needs
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {services.map((service, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card
                  hoverable
                  bordered={false}
                  style={{
                    height: '100%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    borderTop: `4px solid ${service.color}`,
                  }}
                  bodyStyle={{ textAlign: 'center' }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: `${service.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    {React.cloneElement(service.icon, {
                      style: { fontSize: 40, color: service.color },
                    })}
                  </div>
                  <Title level={4} style={{ color: '#1a1a1a', marginBottom: 8 }}>
                    {service.title}
                  </Title>
                  <Text style={{ color: '#666' }}>{service.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: '80px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2} style={{ color: '#E63946', fontSize: 36 }}>
              Why Choose Golden Errands?
            </Title>
          </div>

          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {[
                  {
                    icon: <ThunderboltOutlined />,
                    title: 'Lightning Fast',
                    desc: 'Quick pickups and deliveries within minutes',
                  },
                  {
                    icon: <SafetyOutlined />,
                    title: 'Secure & Reliable',
                    desc: 'Your items are insured and handled with care',
                  },
                  {
                    icon: <ClockCircleOutlined />,
                    title: '24/7 Service',
                    desc: 'Available round the clock for your convenience',
                  },
                  {
                    icon: <TeamOutlined />,
                    title: 'Professional Team',
                    desc: 'Trained and verified delivery professionals',
                  },
                ].map((item, index) => (
                  <Card key={index} bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <Space>
                      <div
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          background: '#E6394615',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {React.cloneElement(item.icon, { style: { fontSize: 24, color: '#E63946' } })}
                      </div>
                      <div>
                        <Title level={5} style={{ marginBottom: 4 }}>
                          {item.title}
                        </Title>
                        <Text type="secondary">{item.desc}</Text>
                      </div>
                    </Space>
                  </Card>
                ))}
              </Space>
            </Col>
            <Col xs={24} lg={12}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
                  borderRadius: 16,
                  padding: 48,
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                <RocketOutlined style={{ fontSize: 80, marginBottom: 24 }} />
                <Title level={3} style={{ color: 'white' }}>
                  Ready to Get Started?
                </Title>
                <Paragraph style={{ fontSize: 16, color: 'white', marginBottom: 32 }}>
                  Join thousands of satisfied customers who trust Golden Errands
                  for their delivery needs.
                </Paragraph>
                <button
                  onClick={() => navigate('/login')}
                  style={{
                    height: 50,
                    padding: '0 32px',
                    fontSize: 18,
                    background: '#FFB703',
                    border: 'none',
                    borderRadius: 8,
                    color: '#1a1a1a',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <RocketOutlined />
                  Access Platform
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Contact Section */}
      <section
        style={{
          padding: '60px 20px',
          background: '#1a1a1a',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#FFB703', marginBottom: 8 }}>
            GOLDEN ERRANDS
          </Title>
          <Title level={4} style={{ color: '#E63946', fontWeight: 'normal', marginTop: 0 }}>
            We Deliver with Passion!
          </Title>

          <Space direction="vertical" size="large" style={{ marginTop: 32 }}>
            <Space size="large" wrap>
              <Space>
                <PhoneOutlined style={{ fontSize: 20, color: '#FFB703' }} />
                <Text strong style={{ color: 'white', fontSize: 16 }}>
                  0256039212
                </Text>
              </Space>
              <Text style={{ color: '#666' }}>|</Text>
              <Space>
                <PhoneOutlined style={{ fontSize: 20, color: '#FFB703' }} />
                <Text strong style={{ color: 'white', fontSize: 16 }}>
                  0256039213
                </Text>
              </Space>
              <Text style={{ color: '#666' }}>|</Text>
              <Space>
                <PhoneOutlined style={{ fontSize: 20, color: '#FFB703' }} />
                <Text strong style={{ color: 'white', fontSize: 16 }}>
                  0256039214
                </Text>
              </Space>
            </Space>

            <Space>
              <MailOutlined style={{ fontSize: 20, color: '#FFB703' }} />
              <Text strong style={{ color: 'white', fontSize: 16 }}>
                info@goldenerrands.com
              </Text>
            </Space>
          </Space>
        </div>
      </section>
    </div>
  );
}

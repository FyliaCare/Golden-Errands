'use client';

import React from 'react';
import { Row, Col, Card, Typography, Button, Space, List } from 'antd';
import {
  RocketOutlined,
  EnvironmentOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ShoppingOutlined,
  MedicineBoxOutlined,
  CarOutlined,
  GiftOutlined,
  FileTextOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';

const { Title, Paragraph, Text } = Typography;

export default function ServicesPage() {
  const services = [
    {
      icon: <RocketOutlined />,
      title: 'Food Delivery',
      description: 'Hot and fresh meals delivered from restaurants to your doorstep',
      color: '#E63946',
      features: [
        'Partner with 100+ restaurants',
        'Average delivery time: 30-45 minutes',
        'Food kept fresh with insulated bags',
        'Real-time tracking',
        'Contactless delivery available',
      ],
    },
    {
      icon: <EnvironmentOutlined />,
      title: 'Parcel & Package Delivery',
      description: 'Safe and secure delivery of packages of all sizes across the city',
      color: '#FB8500',
      features: [
        'Documents to large packages',
        'Door-to-door service',
        'Insurance coverage available',
        'Proof of delivery with photo',
        'Same-day & next-day options',
      ],
    },
    {
      icon: <ShoppingOutlined />,
      title: 'Grocery Shopping & Delivery',
      description: 'We shop for your groceries and deliver them fresh to your home',
      color: '#FFB703',
      features: [
        'Shop from your favorite stores',
        'Fresh produce selection',
        'Refrigerated transport for perishables',
        'Shopping receipt provided',
        'Scheduled or on-demand delivery',
      ],
    },
    {
      icon: <MedicineBoxOutlined />,
      title: 'Pharmaceutical Delivery',
      description: 'Timely and secure delivery of medicines and medical supplies',
      color: '#06d6a0',
      features: [
        'Temperature-controlled delivery',
        'Prescription verification',
        'Direct from pharmacy to you',
        'Discreet packaging',
        'Emergency delivery available',
      ],
    },
    {
      icon: <CarOutlined />,
      title: 'Bus Station Pickup',
      description: 'We collect your parcels from bus stations so you don\'t have to',
      color: '#0096FF',
      features: [
        'All major bus terminals covered',
        'Parcel collection on your behalf',
        'Tracking number integration',
        'Direct home delivery',
        'No waiting in long queues',
      ],
    },
    {
      icon: <GiftOutlined />,
      title: 'Gift & Special Deliveries',
      description: 'Make someone\'s day special with our gift delivery service',
      color: '#D946EF',
      features: [
        'Birthday & anniversary deliveries',
        'Gift wrapping available',
        'Personalized delivery messages',
        'Scheduled future deliveries',
        'Photo confirmation',
      ],
    },
    {
      icon: <FileTextOutlined />,
      title: 'Document Courier',
      description: 'Express delivery of important documents for businesses',
      color: '#8338EC',
      features: [
        'Legal & business documents',
        'Chain of custody tracking',
        'Signature confirmation',
        'Multiple pickup/dropoff points',
        'Corporate accounts available',
      ],
    },
    {
      icon: <ToolOutlined />,
      title: 'Custom Errands',
      description: 'Whatever errand you need - we\'ll handle it professionally',
      color: '#14B8A6',
      features: [
        'Bank deposits & withdrawals',
        'Bill payments',
        'Market runs',
        'Pick up & delivery service',
        'Tailored to your needs',
      ],
    },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
          padding: '80px 20px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title level={1} style={{ color: 'white', fontSize: 48, marginBottom: 16 }}>
            Our Services
          </Title>
          <Paragraph style={{ fontSize: 20, color: 'white', maxWidth: 700, margin: '0 auto' }}>
            Comprehensive delivery solutions for all your needs
          </Paragraph>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            {services.map((service, index) => (
              <Col xs={24} md={12} key={index}>
                <Card
                  hoverable
                  bordered={false}
                  style={{
                    height: '100%',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderTop: `4px solid ${service.color}`,
                  }}
                >
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: `${service.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                    }}
                  >
                    {React.cloneElement(service.icon, {
                      style: { fontSize: 36, color: service.color },
                    })}
                  </div>
                  <Title level={3} style={{ color: '#1a1a1a', marginBottom: 12 }}>
                    {service.title}
                  </Title>
                  <Paragraph style={{ color: '#666', fontSize: 16, marginBottom: 20 }}>
                    {service.description}
                  </Paragraph>
                  <List
                    size="small"
                    dataSource={service.features}
                    renderItem={(item) => (
                      <List.Item style={{ border: 'none', padding: '4px 0' }}>
                        <Space>
                          <CheckCircleOutlined style={{ color: service.color }} />
                          <Text style={{ color: '#666' }}>{item}</Text>
                        </Space>
                      </List.Item>
                    )}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2} style={{ color: '#E63946', fontSize: 36 }}>
              How It Works
            </Title>
            <Paragraph style={{ fontSize: 18, color: '#666' }}>
              Simple steps to get your delivery started
            </Paragraph>
          </div>

          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                  fontSize: 48,
                  fontWeight: 'bold',
                }}
              >
                1
              </div>
              <Title level={4}>Place Order</Title>
              <Paragraph style={{ color: '#666' }}>
                Call us, use our app, or order online with your delivery details
              </Paragraph>
            </Col>

            <Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                  fontSize: 48,
                  fontWeight: 'bold',
                }}
              >
                2
              </div>
              <Title level={4}>Rider Assignment</Title>
              <Paragraph style={{ color: '#666' }}>
                We assign the nearest available rider to your delivery
              </Paragraph>
            </Col>

            <Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #06d6a0 0%, #00a896 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                  fontSize: 48,
                  fontWeight: 'bold',
                }}
              >
                3
              </div>
              <Title level={4}>Track Delivery</Title>
              <Paragraph style={{ color: '#666' }}>
                Track your delivery in real-time as it makes its way to you
              </Paragraph>
            </Col>

            <Col xs={24} sm={12} md={6} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8338EC 0%, #6a1eb4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'white',
                  fontSize: 48,
                  fontWeight: 'bold',
                }}
              >
                4
              </div>
              <Title level={4}>Receive & Enjoy</Title>
              <Paragraph style={{ color: '#666' }}>
                Receive your delivery with proof of delivery confirmation
              </Paragraph>
            </Col>
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 20px', background: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#E63946', marginBottom: 16 }}>
            Ready to Get Started?
          </Title>
          <Paragraph style={{ fontSize: 18, color: '#666', marginBottom: 32 }}>
            Join hundreds of satisfied customers who trust Golden Errands for their delivery needs
          </Paragraph>
          <Space size="large" wrap>
            <Link href="/login">
              <Button type="primary" size="large" danger icon={<RocketOutlined />}>
                Place Your First Order
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="large" icon={<TeamOutlined />}>
                Contact Sales Team
              </Button>
            </Link>
          </Space>
        </div>
      </section>
    </PublicLayout>
  );
}

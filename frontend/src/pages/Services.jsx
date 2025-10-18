import React from 'react';
import { Row, Col, Card, Typography, Space, List, Button } from 'antd';
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
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      icon: <RocketOutlined />,
      title: 'Food Delivery',
      description: 'Hot, fresh meals from your favorite restaurants delivered to your doorstep',
      color: '#E63946',
      features: [
        'Partner restaurants across the city',
        'Temperature-controlled delivery',
        'Real-time order tracking',
        'Contactless delivery available',
        'Average delivery time: 30-45 minutes',
      ],
    },
    {
      icon: <ShoppingOutlined />,
      title: 'Parcel Delivery',
      description: 'Safe and secure delivery of packages of all sizes',
      color: '#FB8500',
      features: [
        'Same-day delivery available',
        'Package insurance included',
        'Door-to-door service',
        'Fragile items handling',
        'Signature confirmation',
      ],
    },
    {
      icon: <ThunderboltOutlined />,
      title: 'Grocery Errands',
      description: 'We shop for your groceries while you focus on what matters',
      color: '#FFB703',
      features: [
        'Shopping from your favorite stores',
        'Fresh produce selection',
        'Receipt and photo verification',
        'Multiple store pickup available',
        'Cash or card payment options',
      ],
    },
    {
      icon: <MedicineBoxOutlined />,
      title: 'Pharmaceutical Delivery',
      description: 'Timely and confidential delivery of medicines and health products',
      color: '#06d6a0',
      features: [
        'Prescription pickup service',
        'Confidential handling',
        'Temperature-sensitive medication care',
        'Partner pharmacies network',
        'Priority delivery available',
      ],
    },
    {
      icon: <CarOutlined />,
      title: 'Bus Station Pickup',
      description: 'Collect parcels and packages from bus stations on your behalf',
      color: '#0096FF',
      features: [
        'Major bus terminals covered',
        'Package verification and photos',
        'Safe storage until delivery',
        'Tracking number verification',
        'Direct delivery to your location',
      ],
    },
    {
      icon: <EnvironmentOutlined />,
      title: 'Online Shopping Delivery',
      description: 'Pickup and delivery from online marketplaces and stores',
      color: '#8338EC',
      features: [
        'E-commerce platform pickups',
        'Marketplace integrations',
        'COD (Cash on Delivery) handling',
        'Return and exchange support',
        'Bulk order discounts',
      ],
    },
    {
      icon: <TeamOutlined />,
      title: 'Personal Errands',
      description: 'Any errand you need - we handle it with care and professionalism',
      color: '#E63946',
      features: [
        'Document delivery',
        'Bill payments',
        'Bank deposits/withdrawals',
        'Gift delivery with message',
        'Custom errand requests',
      ],
    },
    {
      icon: <SafetyOutlined />,
      title: 'Corporate Solutions',
      description: 'Tailored delivery solutions for businesses of all sizes',
      color: '#00b894',
      features: [
        'Dedicated account manager',
        'Volume discounts',
        'API integration available',
        'Monthly billing options',
        'Custom delivery schedules',
      ],
    },
  ];

  const whyChoose = [
    {
      title: 'Real-Time Tracking',
      description: 'Track your delivery in real-time with our advanced GPS system',
      icon: <EnvironmentOutlined />,
    },
    {
  title: 'Professional Riders',
  description: 'All riders are trained, verified, and background-checked',
      icon: <TeamOutlined />,
    },
    {
      title: 'Insurance Coverage',
      description: 'Your items are insured against damage or loss',
      icon: <SafetyOutlined />,
    },
    {
      title: '24/7 Support',
      description: 'Our customer support team is always available to help',
      icon: <CheckCircleOutlined />,
    },
  ];

  return (
    <div style={{ background: '#fafafa' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
          padding: '100px 20px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <RocketOutlined style={{ fontSize: 64, marginBottom: 24 }} />
          <Title level={1} style={{ color: 'white', fontSize: 48, marginBottom: 16 }}>
            Our Services
          </Title>
          <Paragraph style={{ fontSize: 20, color: 'white', maxWidth: 700, margin: '0 auto' }}>
            Comprehensive delivery solutions for all your needs. From food to parcels, 
            we've got you covered!
          </Paragraph>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            {services.map((service, index) => (
              <Col xs={24} md={12} lg={12} key={index}>
                <Card
                  bordered={false}
                  style={{
                    height: '100%',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderLeft: `4px solid ${service.color}`,
                  }}
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: `${service.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {React.cloneElement(service.icon, {
                          style: { fontSize: 30, color: service.color },
                        })}
                      </div>
                      <Title level={3} style={{ margin: 0 }}>
                        {service.title}
                      </Title>
                    </div>

                    <Paragraph style={{ fontSize: 16, color: '#666', marginBottom: 16 }}>
                      {service.description}
                    </Paragraph>

                    <List
                      size="small"
                      dataSource={service.features}
                      renderItem={(item) => (
                        <List.Item style={{ border: 'none', padding: '4px 0' }}>
                          <Space>
                            <CheckCircleOutlined style={{ color: service.color }} />
                            <Text>{item}</Text>
                          </Space>
                        </List.Item>
                      )}
                    />
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '80px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2} style={{ color: '#E63946' }}>
              Why Choose Golden Errands?
            </Title>
          </div>

          <Row gutter={[24, 24]}>
            {whyChoose.map((item, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  bordered={false}
                  style={{
                    height: '100%',
                    textAlign: 'center',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: '#E6394615',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    {React.cloneElement(item.icon, { style: { fontSize: 32, color: '#E63946' } })}
                  </div>
                  <Title level={4}>{item.title}</Title>
                  <Text type="secondary">{item.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: '80px 20px',
          background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <RocketOutlined style={{ fontSize: 64, color: '#FFB703', marginBottom: 24 }} />
          <Title level={2} style={{ color: 'white' }}>
            Ready to Get Started?
          </Title>
          <Paragraph style={{ fontSize: 18, color: 'white', maxWidth: 600, margin: '0 auto 32px' }}>
            Join thousands of satisfied customers and experience the Golden Errands difference today!
          </Paragraph>
          <Space size="large">
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={() => navigate('/login')}
              style={{
                height: 50,
                fontSize: 18,
                background: '#FFB703',
                borderColor: '#FFB703',
                color: '#1a1a1a',
                fontWeight: 'bold',
              }}
            >
              Book a Delivery
            </Button>
            <Button
              size="large"
              onClick={() => navigate('/contact')}
              style={{
                height: 50,
                fontSize: 18,
                background: 'white',
                color: '#E63946',
                borderColor: 'white',
                fontWeight: 'bold',
              }}
            >
              Contact Us
            </Button>
          </Space>
        </div>
      </section>
    </div>
  );
}

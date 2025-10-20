'use client';

import React from 'react';
import { Row, Col, Card, Typography, Button, List, Space } from 'antd';
import { CheckCircleOutlined, RocketOutlined, CrownOutlined, ThunderboltOutlined } from '@ant-design/icons';
import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';

const { Title, Paragraph, Text } = Typography;

export default function PricingPage() {
  const pricingPlans = [
    {
      name: 'Pay Per Delivery',
      icon: <RocketOutlined />,
      price: 'GH₵15',
      unit: 'per delivery',
      description: 'Perfect for occasional deliveries',
      features: [
        'Standard delivery speed',
        'Within 10km radius',
        'Real-time tracking',
        'Email notifications',
        'Business hour deliveries',
        'Insurance up to GH₵500',
      ],
      color: '#E63946',
      popular: false,
    },
    {
      name: 'Business Plan',
      icon: <ThunderboltOutlined />,
      price: 'GH₵400',
      unit: 'per month',
      description: 'Best for small businesses',
      features: [
        '40 deliveries per month',
        'Priority rider assignment',
        'Extended coverage area',
        'Dedicated account manager',
        'Invoice & receipt management',
        'Insurance up to GH₵1,000',
        'API access',
        'Monthly reports',
      ],
      color: '#FFB703',
      popular: true,
    },
    {
      name: 'Enterprise',
      icon: <CrownOutlined />,
      price: 'Custom',
      unit: 'contact sales',
      description: 'For large organizations',
      features: [
        'Unlimited deliveries',
        'Dedicated fleet option',
        'Custom SLA agreements',
        '24/7 priority support',
        'Advanced analytics dashboard',
        'Custom insurance coverage',
        'White-label options',
        'Integration support',
        'Volume discounts',
      ],
      color: '#8338EC',
      popular: false,
    },
  ];

  const additionalServices = [
    { service: 'Express Delivery (30 min)', price: '+GH₵10' },
    { service: 'After Hours (6PM - 6AM)', price: '+GH₵5' },
    { service: 'Weekend Delivery', price: '+GH₵5' },
    { service: 'Fragile Item Handling', price: '+GH₵8' },
    { service: 'Additional Insurance (per GH₵1000)', price: '+GH₵3' },
    { service: 'Waiting Time (per 15 min)', price: '+GH₵5' },
  ];

  return (
    <PublicLayout>
      {/* Hero */}
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
            Simple, Transparent Pricing
          </Title>
          <Paragraph style={{ fontSize: 20, color: 'white', maxWidth: 700, margin: '0 auto' }}>
            Choose the plan that fits your needs. No hidden fees, no surprises.
          </Paragraph>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: '80px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[24, 24]} justify="center">
            {pricingPlans.map((plan, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  bordered={false}
                  style={{
                    height: '100%',
                    boxShadow: plan.popular ? '0 8px 24px rgba(230,57,70,0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
                    borderTop: `6px solid ${plan.color}`,
                    position: 'relative',
                    transform: plan.popular ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {plan.popular && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        background: '#FFB703',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}
                    >
                      POPULAR
                    </div>
                  )}
                  <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: `${plan.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                      }}
                    >
                      {React.cloneElement(plan.icon, {
                        style: { fontSize: 40, color: plan.color },
                      })}
                    </div>
                    <Title level={3} style={{ marginBottom: 8 }}>
                      {plan.name}
                    </Title>
                    <Paragraph style={{ color: '#666', marginBottom: 16 }}>
                      {plan.description}
                    </Paragraph>
                    <div>
                      <span style={{ fontSize: 40, fontWeight: 'bold', color: plan.color }}>
                        {plan.price}
                      </span>
                      <Text style={{ color: '#666', display: 'block', marginTop: 4 }}>
                        {plan.unit}
                      </Text>
                    </div>
                  </div>
                  <List
                    dataSource={plan.features}
                    renderItem={(item) => (
                      <List.Item style={{ border: 'none', padding: '8px 0' }}>
                        <Space>
                          <CheckCircleOutlined style={{ color: plan.color, fontSize: 18 }} />
                          <Text>{item}</Text>
                        </Space>
                      </List.Item>
                    )}
                  />
                  <Link href="/login">
                    <Button
                      type={plan.popular ? 'primary' : 'default'}
                      size="large"
                      block
                      danger={plan.popular}
                      style={{ marginTop: 24 }}
                    >
                      {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                    </Button>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Additional Services */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2} style={{ color: '#E63946' }}>
              Additional Services
            </Title>
            <Paragraph style={{ fontSize: 16, color: '#666' }}>
              Customize your delivery with these optional add-ons
            </Paragraph>
          </div>
          <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <List
              dataSource={additionalServices}
              renderItem={(item) => (
                <List.Item>
                  <Text strong>{item.service}</Text>
                  <Text style={{ color: '#E63946', fontWeight: 'bold' }}>{item.price}</Text>
                </List.Item>
              )}
            />
          </Card>
        </div>
      </section>

      {/* Distance Pricing */}
      <section style={{ padding: '80px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <Title level={2} style={{ color: '#E63946', marginBottom: 24 }}>
            Distance-Based Pricing
          </Title>
          <Card bordered={false} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>0 - 5 km</Text>
              </Col>
              <Col span={12}>
                <Text style={{ color: '#E63946', fontWeight: 'bold' }}>GH₵10</Text>
              </Col>
              <Col span={12}>
                <Text strong>5 - 10 km</Text>
              </Col>
              <Col span={12}>
                <Text style={{ color: '#E63946', fontWeight: 'bold' }}>GH₵15</Text>
              </Col>
              <Col span={12}>
                <Text strong>10 - 15 km</Text>
              </Col>
              <Col span={12}>
                <Text style={{ color: '#E63946', fontWeight: 'bold' }}>GH₵20</Text>
              </Col>
              <Col span={12}>
                <Text strong>15 - 20 km</Text>
              </Col>
              <Col span={12}>
                <Text style={{ color: '#E63946', fontWeight: 'bold' }}>GH₵25</Text>
              </Col>
              <Col span={24} style={{ marginTop: 16 }}>
                <Paragraph style={{ color: '#666', margin: 0 }}>
                  * Prices shown are base rates. Additional charges may apply for special services.
                </Paragraph>
              </Col>
            </Row>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 20px', background: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#E63946', marginBottom: 16 }}>
            Have Questions About Pricing?
          </Title>
          <Paragraph style={{ fontSize: 18, color: '#666', marginBottom: 32 }}>
            Our team is here to help you find the perfect plan for your needs
          </Paragraph>
          <Space size="large">
            <Link href="/contact">
              <Button size="large" type="primary" danger>
                Contact Us
              </Button>
            </Link>
            <a href="tel:0256039212">
              <Button size="large">
                Call 0256039212
              </Button>
            </a>
          </Space>
        </div>
      </section>
    </PublicLayout>
  );
}

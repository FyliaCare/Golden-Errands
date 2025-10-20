'use client';

import React from 'react';
import Link from 'next/link';
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
import PublicLayout from '@/components/PublicLayout';

const { Title, Text, Paragraph } = Typography;

export default function HomePage() {
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
    <PublicLayout>
      <div style={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
          padding: '40px 16px',
          textAlign: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}
        className="hero-section"
      >
        <style jsx>{`
          @media (min-width: 768px) {
            .hero-section {
              padding: 80px 20px !important;
            }
            .hero-icon {
              font-size: 64px !important;
            }
            .hero-title {
              font-size: 48px !important;
            }
            .hero-subtitle {
              font-size: 24px !important;
            }
            .hero-text {
              font-size: 20px !important;
            }
            .hero-button {
              height: 50px !important;
              padding: 0 32px !important;
              font-size: 18px !important;
            }
          }
        `}</style>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}>
            <RocketOutlined className="hero-icon" style={{ fontSize: 40, marginBottom: 16 }} />
            <Title level={1} className="hero-title" style={{ color: 'white', fontSize: 32, marginBottom: 8 }}>
              GOLDEN ERRANDS
            </Title>
            <Title level={3} className="hero-subtitle" style={{ color: '#FFB703', fontWeight: 'normal', marginTop: 0, fontSize: 18 }}>
              We Deliver with Passion!
            </Title>
          </div>

          <Paragraph className="hero-text" style={{ fontSize: 16, color: 'white', maxWidth: 600, margin: '0 auto 24px', padding: '0 16px' }}>
            Your trusted partner for fast, reliable, and professional delivery services.
            From food to parcels, we handle your errands with care.
          </Paragraph>

          <Space size="middle" wrap style={{ marginBottom: 24 }}>
            <Link href="/login">
              <button
                className="hero-button"
                style={{
                  height: 44,
                  padding: '0 20px',
                  fontSize: 16,
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
            </Link>
            <a href="tel:0256039212">
              <button
                className="hero-button"
                style={{
                  height: 44,
                  padding: '0 20px',
                  fontSize: 16,
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
                Call Us
              </button>
            </a>
          </Space>

          <div style={{ marginTop: 24 }}>
            <Space size="small" wrap direction="vertical">
              <Space size="small">
                <PhoneOutlined style={{ fontSize: 16 }} />
                <Text strong style={{ color: 'white', fontSize: 14 }}>
                  0256039212 | 0256039213
                </Text>
              </Space>
            </Space>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" style={{ padding: '40px 16px', background: '#fafafa' }}>
        <style jsx>{`
          @media (min-width: 768px) {
            .stats-section {
              padding: 60px 20px !important;
            }
          }
        `}</style>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[16, 16]}>
            {features.map((stat, index) => (
              <Col xs={12} sm={12} lg={6} key={index}>
                <Card
                  bordered={false}
                  className="mobile-full-width"
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
      <section className="services-section" style={{ padding: '40px 16px', background: 'white' }}>
        <style jsx>{`
          .services-section .section-title {
            font-size: 28px;
          }
          .services-section .section-subtitle {
            font-size: 14px;
          }
          .services-section .service-icon-wrapper {
            width: 60px;
            height: 60px;
          }
          .services-section .service-icon-wrapper > * {
            font-size: 30px !important;
          }
          .services-section .service-title {
            font-size: 16px;
          }
          .services-section .service-description {
            font-size: 13px;
          }
          
          @media (min-width: 768px) {
            .services-section {
              padding: 80px 20px !important;
            }
            .services-section .section-title {
              font-size: 36px !important;
            }
            .services-section .section-subtitle {
              font-size: 18px !important;
            }
            .services-section .service-icon-wrapper {
              width: 80px !important;
              height: 80px !important;
            }
            .services-section .service-icon-wrapper > * {
              font-size: 40px !important;
            }
            .services-section .service-title {
              font-size: 18px !important;
            }
            .services-section .service-description {
              font-size: 14px !important;
            }
          }
        `}</style>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <Title level={2} className="section-title" style={{ color: '#E63946' }}>
              Our Services
            </Title>
            <Paragraph className="section-subtitle" style={{ color: '#666', maxWidth: 600, margin: '0 auto' }}>
              We offer a wide range of delivery and errand services tailored to your needs
            </Paragraph>
          </div>

          <Row gutter={[16, 16]}>
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
                    className="service-icon-wrapper"
                    style={{
                      borderRadius: '50%',
                      background: `${service.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    {React.cloneElement(service.icon, {
                      style: { color: service.color },
                    })}
                  </div>
                  <Title level={4} className="service-title" style={{ color: '#1a1a1a', marginBottom: 8 }}>
                    {service.title}
                  </Title>
                  <Text className="service-description" style={{ color: '#666' }}>{service.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="contact-section"
        style={{
          padding: '40px 16px',
          background: '#1a1a1a',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <style jsx>{`
          .contact-section .brand-title {
            font-size: 24px;
          }
          .contact-section .brand-subtitle {
            font-size: 16px;
          }
          .contact-section .phone-icon {
            font-size: 16px;
          }
          .contact-section .phone-text {
            font-size: 14px;
          }
          
          @media (min-width: 768px) {
            .contact-section {
              padding: 60px 20px !important;
            }
            .contact-section .brand-title {
              font-size: 28px !important;
            }
            .contact-section .brand-subtitle {
              font-size: 20px !important;
            }
            .contact-section .phone-icon {
              font-size: 20px !important;
            }
            .contact-section .phone-text {
              font-size: 16px !important;
            }
          }
        `}</style>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title level={2} className="brand-title" style={{ color: '#FFB703', marginBottom: 8 }}>
            GOLDEN ERRANDS
          </Title>
          <Title level={4} className="brand-subtitle" style={{ color: '#E63946', fontWeight: 'normal', marginTop: 0 }}>
            We Deliver with Passion!
          </Title>

          <Space direction="vertical" size="middle" style={{ marginTop: 24, width: '100%' }}>
            <Space size="small" wrap style={{ justifyContent: 'center' }}>
              <Space size="small">
                <PhoneOutlined className="phone-icon" style={{ color: '#FFB703' }} />
                <Text strong className="phone-text" style={{ color: 'white' }}>
                  0256039212
                </Text>
              </Space>
              <Text style={{ color: '#666' }}>|</Text>
              <Space size="small">
                <PhoneOutlined className="phone-icon" style={{ color: '#FFB703' }} />
                <Text strong className="phone-text" style={{ color: 'white' }}>
                  0256039213
                </Text>
              </Space>
              <Text style={{ color: '#666' }}>|</Text>
              <Space size="small">
                <PhoneOutlined className="phone-icon" style={{ color: '#FFB703' }} />
                <Text strong className="phone-text" style={{ color: 'white' }}>
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
    </PublicLayout>
  );
}

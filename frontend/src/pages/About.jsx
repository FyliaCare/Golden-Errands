import React from 'react';
import { Row, Col, Card, Typography, Space, Timeline } from 'antd';
import {
  RocketOutlined,
  SafetyOutlined,
  TeamOutlined,
  TrophyOutlined,
  HeartOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function About() {
  const values = [
    {
      icon: <HeartOutlined />,
      title: 'Passion',
      description: 'We deliver with passion and care for every customer',
      color: '#E63946',
    },
    {
      icon: <SafetyOutlined />,
      title: 'Reliability',
      description: 'Your trust is our foundation - we deliver on time, every time',
      color: '#06d6a0',
    },
    {
      icon: <ThunderboltOutlined />,
      title: 'Speed',
      description: 'Lightning-fast service without compromising quality',
      color: '#FFB703',
    },
    {
      icon: <TeamOutlined />,
      title: 'Teamwork',
      description: 'Our professional team works together for your satisfaction',
      color: '#0096FF',
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Golden Errands was born with a vision to revolutionize delivery services in Ghana',
    },
    {
      year: '2021',
      title: 'Expansion',
  description: 'Expanded to 5 major cities with a fleet of 20 professional riders',
    },
    {
      year: '2022',
      title: '1000+ Deliveries',
      description: 'Reached milestone of 1000 successful deliveries with 98% customer satisfaction',
    },
    {
      year: '2023',
      title: 'Technology Integration',
      description: 'Launched our advanced delivery management platform with real-time tracking',
    },
    {
      year: '2024',
      title: 'Market Leader',
      description: 'Became the leading delivery service provider with 5000+ monthly deliveries',
    },
    {
      year: '2025',
      title: 'Continued Growth',
      description: 'Expanding services and reaching more communities across the nation',
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
            About Golden Errands
          </Title>
          <Title level={3} style={{ color: '#FFB703', fontWeight: 'normal', marginTop: 0 }}>
            We Deliver with Passion!
          </Title>
          <Paragraph style={{ fontSize: 20, color: 'white', maxWidth: 700, margin: '24px auto' }}>
            Your trusted partner in delivery excellence. We're more than just a delivery service - 
            we're your reliable companion for all your errand needs.
          </Paragraph>
        </div>
      </section>

      {/* Our Story */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Title level={2} style={{ color: '#E63946' }}>
                Our Story
              </Title>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                Golden Errands was founded with a simple yet powerful mission: to make life easier 
                for everyone by providing reliable, fast, and professional delivery services.
              </Paragraph>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                What started as a small team of passionate individuals has grown into Ghana's 
                leading delivery service provider, serving thousands of customers daily across 
                multiple cities.
              </Paragraph>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                Our commitment to excellence, customer satisfaction, and innovation has made us 
                the go-to choice for individuals and businesses alike. We don't just deliver 
                packages - we deliver peace of mind.
              </Paragraph>
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
                <TrophyOutlined style={{ fontSize: 80, marginBottom: 24 }} />
                <Title level={3} style={{ color: 'white' }}>
                  Award-Winning Service
                </Title>
                <Paragraph style={{ fontSize: 16, color: 'white' }}>
                  Recognized as the Best Delivery Service Provider 2024
                </Paragraph>
                <Space direction="vertical" size="large" style={{ marginTop: 32, width: '100%' }}>
                  <div>
                    <Title level={2} style={{ color: '#FFB703', margin: 0 }}>98%</Title>
                    <Text style={{ color: 'white' }}>Customer Satisfaction</Text>
                  </div>
                  <div>
                    <Title level={2} style={{ color: '#FFB703', margin: 0 }}>5000+</Title>
                    <Text style={{ color: 'white' }}>Monthly Deliveries</Text>
                  </div>
                  <div>
                    <Title level={2} style={{ color: '#FFB703', margin: 0 }}>50+</Title>
                    <Text style={{ color: 'white' }}>Professional Riders</Text>
                  </div>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Our Values */}
      <section style={{ padding: '80px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2} style={{ color: '#E63946' }}>
              Our Core Values
            </Title>
            <Paragraph style={{ fontSize: 18, color: '#666', maxWidth: 600, margin: '0 auto' }}>
              The principles that guide everything we do
            </Paragraph>
          </div>

          <Row gutter={[24, 24]}>
            {values.map((value, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  hoverable
                  bordered={false}
                  style={{
                    height: '100%',
                    textAlign: 'center',
                    borderTop: `4px solid ${value.color}`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: `${value.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    {React.cloneElement(value.icon, {
                      style: { fontSize: 40, color: value.color },
                    })}
                  </div>
                  <Title level={4}>{value.title}</Title>
                  <Text type="secondary">{value.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Our Journey */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Title level={2} style={{ color: '#E63946' }}>
              Our Journey
            </Title>
            <Paragraph style={{ fontSize: 18, color: '#666' }}>
              Milestones that shaped Golden Errands
            </Paragraph>
          </div>

          <Timeline
            mode="alternate"
            items={milestones.map((milestone, index) => ({
              color: index === milestones.length - 1 ? '#E63946' : '#0096FF',
              dot: index === milestones.length - 1 ? <RocketOutlined style={{ fontSize: 16 }} /> : null,
              children: (
                <Card
                  bordered={false}
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                >
                  <Title level={4} style={{ color: '#E63946', marginBottom: 8 }}>
                    {milestone.year}
                  </Title>
                  <Title level={5} style={{ marginBottom: 8 }}>
                    {milestone.title}
                  </Title>
                  <Text type="secondary">{milestone.description}</Text>
                </Card>
              ),
            }))}
          />
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '80px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <Title level={2} style={{ color: '#E63946' }}>
            Our Amazing Team
          </Title>
          <Paragraph style={{ fontSize: 18, color: '#666', maxWidth: 700, margin: '0 auto 48px' }}>
            Behind every successful delivery is our dedicated team of professionals who work 
            tirelessly to ensure your satisfaction.
          </Paragraph>

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={8}>
              <Card
                hoverable
                bordered={false}
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              >
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
                  }}
                >
                  <TeamOutlined style={{ fontSize: 50, color: 'white' }} />
                </div>
                <Title level={4}>Operations Team</Title>
                <Text type="secondary">
                  Coordinating every delivery with precision and care
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                hoverable
                bordered={false}
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              >
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
                  }}
                >
                  <RocketOutlined style={{ fontSize: 50, color: 'white' }} />
                </div>
                <Title level={4}>Delivery Riders</Title>
                <Text type="secondary">
                  Professional, trained, and verified delivery experts
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                hoverable
                bordered={false}
                style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #06d6a0 0%, #00b894 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <HeartOutlined style={{ fontSize: 50, color: 'white' }} />
                </div>
                <Title level={4}>Customer Support</Title>
                <Text type="secondary">
                  Available 24/7 to assist with your needs
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
}

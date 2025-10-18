import React, { useState } from 'react';
import { Row, Col, Card, Form, Input, Button, Typography, Space, message } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  RocketOutlined,
  SendOutlined,
} from '@ant-design/icons';
import SimpleMap from '../components/SimpleMap';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    message.success('Thank you! We will get back to you shortly.');
    form.resetFields();
    setLoading(false);
  };

  const contactInfo = [
    {
      icon: <PhoneOutlined />,
      title: 'Phone',
      items: ['0256039212', '0256039213', '0256039214'],
      color: '#E63946',
    },
    {
      icon: <MailOutlined />,
      title: 'Email',
      items: ['info@goldenerrands.com', 'support@goldenerrands.com'],
      color: '#0096FF',
    },
    {
      icon: <EnvironmentOutlined />,
      title: 'Address',
      items: ['Accra, Ghana', 'Kumasi, Ghana', 'Takoradi, Ghana'],
      color: '#FFB703',
    },
    {
      icon: <ClockCircleOutlined />,
      title: 'Working Hours',
      items: ['24/7 Service Available', 'Customer Support: Always Active'],
      color: '#06d6a0',
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
          <MailOutlined style={{ fontSize: 64, marginBottom: 24 }} />
          <Title level={1} style={{ color: 'white', fontSize: 48, marginBottom: 16 }}>
            Contact Us
          </Title>
          <Paragraph style={{ fontSize: 20, color: 'white', maxWidth: 700, margin: '0 auto' }}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond 
            as soon as possible.
          </Paragraph>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            {contactInfo.map((info, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  bordered={false}
                  style={{
                    height: '100%',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderTop: `4px solid ${info.color}`,
                  }}
                >
                  <div
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: `${info.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    {React.cloneElement(info.icon, { style: { fontSize: 32, color: info.color } })}
                  </div>
                  <Title level={4} style={{ marginBottom: 16 }}>
                    {info.title}
                  </Title>
                  <Space direction="vertical" size="small">
                    {info.items.map((item, idx) => (
                      <Text key={idx} style={{ display: 'block', color: '#666' }}>
                        {item}
                      </Text>
                    ))}
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Contact Form */}
      <section style={{ padding: '80px 20px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[48, 48]} align="middle">
            <Col xs={24} lg={12}>
              <div>
                <Title level={2} style={{ color: '#E63946' }}>
                  Send Us a Message
                </Title>
                <Paragraph style={{ fontSize: 16, color: '#666', marginBottom: 32 }}>
                  Fill out the form below and our team will get back to you within 24 hours.
                </Paragraph>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  size="large"
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter your first name' }]}
                      >
                        <Input placeholder="John" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                      >
                        <Input placeholder="Doe" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="john@example.com" />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please enter your phone number' }]}
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="0201234567" />
                  </Form.Item>

                  <Form.Item
                    name="subject"
                    label="Subject"
                    rules={[{ required: true, message: 'Please enter a subject' }]}
                  >
                    <Input placeholder="How can we help you?" />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label="Message"
                    rules={[{ required: true, message: 'Please enter your message' }]}
                  >
                    <TextArea
                      rows={5}
                      placeholder="Tell us more about your inquiry..."
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      icon={<SendOutlined />}
                      size="large"
                      style={{ background: '#E63946', borderColor: '#E63946' }}
                    >
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>

            <Col xs={24} lg={12}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
                  borderRadius: 16,
                  padding: 48,
                  color: 'white',
                  height: '100%',
                }}
              >
                <RocketOutlined style={{ fontSize: 64, marginBottom: 24 }} />
                <Title level={3} style={{ color: 'white' }}>
                  Let's Work Together
                </Title>
                <Paragraph style={{ fontSize: 16, color: 'white', marginBottom: 32 }}>
                  Whether you need a one-time delivery or ongoing logistics support, 
                  we're here to help your business succeed.
                </Paragraph>

                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <div>
                    <Title level={5} style={{ color: '#FFB703', marginBottom: 8 }}>
                      Quick Response
                    </Title>
                    <Text style={{ color: 'white' }}>
                      We typically respond to all inquiries within 2-4 hours during business hours
                    </Text>
                  </div>

                  <div>
                    <Title level={5} style={{ color: '#FFB703', marginBottom: 8 }}>
                      Professional Support
                    </Title>
                    <Text style={{ color: 'white' }}>
                      Our dedicated team is ready to assist with any questions or concerns
                    </Text>
                  </div>

                  <div>
                    <Title level={5} style={{ color: '#FFB703', marginBottom: 8 }}>
                      Custom Solutions
                    </Title>
                    <Text style={{ color: 'white' }}>
                      We can create tailored delivery packages for businesses of all sizes
                    </Text>
                  </div>

                  <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                    <Title level={5} style={{ color: '#FFB703', marginBottom: 16 }}>
                      Emergency Hotline
                    </Title>
                    <Space direction="vertical" size="small">
                      <Space>
                        <PhoneOutlined style={{ fontSize: 20 }} />
                        <Text strong style={{ color: 'white', fontSize: 18 }}>
                          0256039212
                        </Text>
                      </Space>
                      <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                        Available 24/7 for urgent deliveries
                      </Text>
                    </Space>
                  </div>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <Title level={2} style={{ color: '#E63946', marginBottom: 16 }}>
            Visit Our Offices
          </Title>
          <Paragraph style={{ fontSize: 16, color: '#666', marginBottom: 32 }}>
            We have locations across Ghana to serve you better
          </Paragraph>
          <SimpleMap
            locations={[
              {
                name: 'Accra Office',
                lat: 5.6037,
                lng: -0.1870,
                address: 'Golden Errands HQ, Accra, Ghana',
              },
              {
                name: 'Kumasi Branch',
                lat: 6.6884,
                lng: -1.6244,
                address: 'Golden Errands, Kumasi, Ghana',
              },
              {
                name: 'Takoradi Branch',
                lat: 4.8974,
                lng: -1.7503,
                address: 'Golden Errands, Takoradi, Ghana',
              },
            ]}
            style={{ height: 500 }}
          />
        </div>
      </section>
    </div>
  );
}

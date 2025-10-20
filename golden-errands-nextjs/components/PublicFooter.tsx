'use client';

import React from 'react';
import Link from 'next/link';
import { Row, Col, Typography, Space, Input, Button } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  RocketOutlined,
  SendOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function PublicFooter() {
  return (
    <footer style={{ background: '#1a1a1a', color: 'white', paddingTop: 60 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 20px' }}>
        <Row gutter={[32, 32]}>
          {/* Company Info */}
          <Col xs={24} sm={12} lg={6}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <RocketOutlined style={{ fontSize: 32, color: '#E63946' }} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 'bold', color: '#E63946', lineHeight: 1 }}>
                  GOLDEN ERRANDS
                </div>
                <div style={{ fontSize: 10, color: '#FFB703', fontWeight: 500 }}>
                  We Deliver with Passion!
                </div>
              </div>
            </div>
            <Paragraph style={{ color: '#999', fontSize: 14 }}>
              Your trusted partner for fast, reliable, and professional delivery services across Ghana.
            </Paragraph>
            <Space size="middle">
              <FacebookOutlined style={{ fontSize: 24, color: '#FFB703', cursor: 'pointer' }} />
              <TwitterOutlined style={{ fontSize: 24, color: '#FFB703', cursor: 'pointer' }} />
              <InstagramOutlined style={{ fontSize: 24, color: '#FFB703', cursor: 'pointer' }} />
              <LinkedinOutlined style={{ fontSize: 24, color: '#FFB703', cursor: 'pointer' }} />
            </Space>
          </Col>

          {/* Quick Links */}
          <Col xs={24} sm={12} lg={6}>
            <Title level={4} style={{ color: '#FFB703', marginBottom: 16 }}>
              Quick Links
            </Title>
            <Space direction="vertical" size="small">
              <Link href="/about" style={{ color: '#999', display: 'block' }}>About Us</Link>
              <Link href="/services" style={{ color: '#999', display: 'block' }}>Our Services</Link>
              <Link href="/pricing" style={{ color: '#999', display: 'block' }}>Pricing</Link>
              <Link href="/track" style={{ color: '#999', display: 'block' }}>Track Order</Link>
              <Link href="/careers" style={{ color: '#999', display: 'block' }}>Careers</Link>
              <Link href="/blog" style={{ color: '#999', display: 'block' }}>Blog</Link>
            </Space>
          </Col>

          {/* Support */}
          <Col xs={24} sm={12} lg={6}>
            <Title level={4} style={{ color: '#FFB703', marginBottom: 16 }}>
              Support
            </Title>
            <Space direction="vertical" size="small">
              <Link href="/faq" style={{ color: '#999', display: 'block' }}>FAQ</Link>
              <Link href="/contact" style={{ color: '#999', display: 'block' }}>Contact Us</Link>
              <Link href="/help" style={{ color: '#999', display: 'block' }}>Help Center</Link>
              <Link href="/terms" style={{ color: '#999', display: 'block' }}>Terms & Conditions</Link>
              <Link href="/privacy" style={{ color: '#999', display: 'block' }}>Privacy Policy</Link>
              <Link href="/driver-recruitment" style={{ color: '#999', display: 'block' }}>Become a Driver</Link>
            </Space>
          </Col>

          {/* Contact Info */}
          <Col xs={24} sm={12} lg={6}>
            <Title level={4} style={{ color: '#FFB703', marginBottom: 16 }}>
              Contact Us
            </Title>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Space>
                <PhoneOutlined style={{ color: '#E63946', fontSize: 18 }} />
                <Text style={{ color: '#999' }}>0256039212</Text>
              </Space>
              <Space>
                <PhoneOutlined style={{ color: '#E63946', fontSize: 18 }} />
                <Text style={{ color: '#999' }}>0256039213</Text>
              </Space>
              <Space>
                <MailOutlined style={{ color: '#E63946', fontSize: 18 }} />
                <Text style={{ color: '#999' }}>info@goldenerrands.com</Text>
              </Space>
              <Space align="start">
                <EnvironmentOutlined style={{ color: '#E63946', fontSize: 18 }} />
                <Text style={{ color: '#999' }}>Accra, Ghana</Text>
              </Space>
            </Space>
          </Col>
        </Row>

        {/* Newsletter */}
        <Row style={{ marginTop: 40, paddingTop: 40, borderTop: '1px solid #333' }}>
          <Col xs={24} md={12}>
            <Title level={4} style={{ color: '#FFB703', marginBottom: 8 }}>
              Subscribe to Our Newsletter
            </Title>
            <Text style={{ color: '#999' }}>Get updates on special offers and delivery tips</Text>
          </Col>
          <Col xs={24} md={12} style={{ marginTop: 16 }}>
            <Space.Compact style={{ width: '100%' }}>
              <Input
                placeholder="Enter your email"
                size="large"
                style={{ borderRadius: 0 }}
              />
              <Button
                type="primary"
                size="large"
                danger
                icon={<SendOutlined />}
                style={{ borderRadius: 0 }}
              >
                Subscribe
              </Button>
            </Space.Compact>
          </Col>
        </Row>

        {/* Bottom Bar */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 20,
            paddingBottom: 20,
            borderTop: '1px solid #333',
            textAlign: 'center',
          }}
        >
          <Text style={{ color: '#666' }}>
            © {new Date().getFullYear()} Golden Errands. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}

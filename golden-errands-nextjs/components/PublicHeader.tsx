'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Drawer, Button, Space } from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  CustomerServiceOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  LoginOutlined,
  MenuOutlined,
  RocketOutlined,
  DollarOutlined,
  FileTextOutlined,
  SafetyOutlined,
  CarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import InstallPWA from './InstallPWA';

export default function PublicHeader() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { key: '/', label: 'Home', icon: <HomeOutlined /> },
    { key: '/about', label: 'About Us', icon: <InfoCircleOutlined /> },
    { key: '/services', label: 'Services', icon: <CustomerServiceOutlined /> },
    { key: '/pricing', label: 'Pricing', icon: <DollarOutlined /> },
    { key: '/track', label: 'Track Order', icon: <CarOutlined /> },
    { key: '/contact', label: 'Contact', icon: <PhoneOutlined /> },
    { key: '/faq', label: 'FAQ', icon: <QuestionCircleOutlined /> },
  ];

  return (
    <header
      style={{
        background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 70,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RocketOutlined style={{ fontSize: 32, color: '#E63946' }} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 'bold', color: '#E63946', lineHeight: 1 }}>
                GOLDEN ERRANDS
              </div>
              <div style={{ fontSize: 11, color: '#FFB703', fontWeight: 500 }}>
                We Deliver with Passion!
              </div>
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          <Menu
            mode="horizontal"
            selectedKeys={[pathname]}
            style={{ border: 'none', minWidth: 700 }}
            items={menuItems.map(item => ({
              key: item.key,
              label: <Link href={item.key}>{item.label}</Link>,
              icon: item.icon,
            }))}
          />
        </div>

        {/* Desktop Actions */}
        <Space className="desktop-actions">
          <InstallPWA />
          <Link href="/login">
            <Button type="primary" icon={<LoginOutlined />} size="large" danger>
              Login
            </Button>
          </Link>
        </Space>

        {/* Mobile Menu Button */}
        <Button
          type="text"
          className="mobile-menu-btn"
          icon={<MenuOutlined style={{ fontSize: 24 }} />}
          onClick={() => setDrawerVisible(true)}
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <RocketOutlined style={{ fontSize: 24, color: '#E63946' }} />
            <span style={{ color: '#E63946' }}>GOLDEN ERRANDS</span>
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          selectedKeys={[pathname]}
          onClick={() => setDrawerVisible(false)}
          items={menuItems.map(item => ({
            key: item.key,
            label: <Link href={item.key}>{item.label}</Link>,
            icon: item.icon,
          }))}
        />
        <div style={{ marginTop: 20, padding: '0 16px' }}>
          <InstallPWA />
          <Link href="/login" style={{ marginTop: 12, display: 'block' }}>
            <Button type="primary" icon={<LoginOutlined />} block size="large" danger>
              Login
            </Button>
          </Link>
        </div>
      </Drawer>
    </header>
  );
}

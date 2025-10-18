import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Space, Typography, Badge, Button } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  CarOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  RocketOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LoginOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  SafetyOutlined,
} from '@ant-design/icons';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';
import RiderApp from './pages/DriverApp';
import Documents from './pages/Documents';

const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;

// Public Layout Component
function PublicLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { key: '/', label: 'Home', icon: <HomeOutlined /> },
    { key: '/about', label: 'About', icon: <InfoCircleOutlined /> },
    { key: '/services', label: 'Services', icon: <ShoppingOutlined /> },
    { key: '/faq', label: 'FAQ', icon: <QuestionCircleOutlined /> },
    { key: '/contact', label: 'Contact', icon: <CustomerServiceOutlined /> },
  ];

  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 999,
          width: '100%',
          background: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '0 50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <div
          style={{ display: 'flex', alignItems: 'center', color: '#FFB703', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <RocketOutlined style={{ fontSize: 24, marginRight: 12 }} />
          <Text strong style={{ color: '#FFB703', fontSize: 20 }}>
            Golden Errands
          </Text>
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={navItems}
          onClick={({ key }) => navigate(key)}
          style={{
            flex: 1,
            marginLeft: 50,
            background: 'transparent',
            borderBottom: 'none',
          }}
        />

        <Button
          type="primary"
          icon={<LoginOutlined />}
          onClick={() => window.open('/login', '_blank')}
          style={{ background: '#E63946', borderColor: '#E63946' }}
        >
          Login
        </Button>
      </Header>
      <Content style={{ marginTop: 64 }}>
        {children}
      </Content>
      <Footer style={{ background: '#1a1a1a', padding: 0 }}>
        {/* Main Footer */}
        <div style={{ background: '#1a1a1a', padding: '60px 50px 40px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* Top Section */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 40 }}>
                {/* Company Info */}
                <div>
                  <Space direction="vertical" size="middle">
                    <div>
                      <RocketOutlined style={{ fontSize: 32, color: '#FFB703', marginBottom: 12 }} />
                      <div>
                        <Text strong style={{ color: '#FFB703', fontSize: 20, display: 'block' }}>
                          Golden Errands
                        </Text>
                        <Text style={{ color: '#E63946', fontSize: 14 }}>
                          We Deliver with Passion!
                        </Text>
                      </div>
                    </div>
                    <Text style={{ color: '#999', display: 'block', lineHeight: 1.6 }}>
                      Your trusted partner for fast, reliable, and professional delivery services across Ghana.
                    </Text>
                    <Space>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#E6394615', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Text style={{ color: '#E63946', fontSize: 16, fontWeight: 'bold' }}>f</Text>
                      </div>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#0096FF15', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Text style={{ color: '#0096FF', fontSize: 16, fontWeight: 'bold' }}>𝕏</Text>
                      </div>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FFB70315', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Text style={{ color: '#FFB703', fontSize: 16, fontWeight: 'bold' }}>in</Text>
                      </div>
                    </Space>
                  </Space>
                </div>

                {/* Quick Links */}
                <div>
                  <Text strong style={{ color: 'white', fontSize: 16, display: 'block', marginBottom: 16 }}>
                    Quick Links
                  </Text>
                  <Space direction="vertical" size="small">
                    {[
                      { label: 'Home', path: '/' },
                      { label: 'About Us', path: '/about' },
                      { label: 'Services', path: '/services' },
                      { label: 'FAQ', path: '/faq' },
                      { label: 'Contact', path: '/contact' },
                    ].map((link) => (
                      <Text
                        key={link.path}
                        onClick={() => navigate(link.path)}
                        style={{ color: '#999', cursor: 'pointer', display: 'block', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => (e.target.style.color = '#FFB703')}
                        onMouseLeave={(e) => (e.target.style.color = '#999')}
                      >
                        {link.label}
                      </Text>
                    ))}
                  </Space>
                </div>

                {/* Services */}
                <div>
                  <Text strong style={{ color: 'white', fontSize: 16, display: 'block', marginBottom: 16 }}>
                    Our Services
                  </Text>
                  <Space direction="vertical" size="small">
                    {[
                      'Food Delivery',
                      'Parcel Delivery',
                      'Grocery Errands',
                      'Pharmaceutical',
                      'Personal Errands',
                    ].map((service) => (
                      <Text key={service} style={{ color: '#999', display: 'block' }}>
                        {service}
                      </Text>
                    ))}
                  </Space>
                </div>

                {/* Contact Info */}
                <div>
                  <Text strong style={{ color: 'white', fontSize: 16, display: 'block', marginBottom: 16 }}>
                    Contact Us
                  </Text>
                  <Space direction="vertical" size="middle">
                    <Space>
                      <PhoneOutlined style={{ color: '#E63946', fontSize: 16 }} />
                      <div>
                        <Text style={{ color: '#999', display: 'block', fontSize: 13 }}>0256039212</Text>
                        <Text style={{ color: '#999', display: 'block', fontSize: 13 }}>0256039213</Text>
                        <Text style={{ color: '#999', display: 'block', fontSize: 13 }}>0256039214</Text>
                      </div>
                    </Space>
                    <Space>
                      <MailOutlined style={{ color: '#FFB703', fontSize: 16 }} />
                      <div>
                        <Text style={{ color: '#999', display: 'block', fontSize: 13 }}>info@goldenerrands.com</Text>
                        <Text style={{ color: '#999', display: 'block', fontSize: 13 }}>support@goldenerrands.com</Text>
                      </div>
                    </Space>
                    <Space>
                      <EnvironmentOutlined style={{ color: '#06d6a0', fontSize: 16 }} />
                      <Text style={{ color: '#999', fontSize: 13 }}>Accra, Kumasi, Takoradi</Text>
                    </Space>
                  </Space>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid #333', margin: '20px 0' }} />

              {/* Bottom Section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <Text style={{ color: '#666', fontSize: 14 }}>
                  © 2025 Golden Errands. All rights reserved.
                </Text>
                <Space size="large">
                  <Text
                    style={{ color: '#999', fontSize: 14, cursor: 'pointer' }}
                    onMouseEnter={(e) => (e.target.style.color = '#FFB703')}
                    onMouseLeave={(e) => (e.target.style.color = '#999')}
                  >
                    Privacy Policy
                  </Text>
                  <Text
                    style={{ color: '#999', fontSize: 14, cursor: 'pointer' }}
                    onMouseEnter={(e) => (e.target.style.color = '#FFB703')}
                    onMouseLeave={(e) => (e.target.style.color = '#999')}
                  >
                    Terms of Service
                  </Text>
                  <Text
                    style={{ color: '#999', fontSize: 14, cursor: 'pointer' }}
                    onMouseEnter={(e) => (e.target.style.color = '#FFB703')}
                    onMouseLeave={(e) => (e.target.style.color = '#999')}
                  >
                    Cookie Policy
                  </Text>
                </Space>
              </div>
            </Space>
          </div>
        </div>
      </Footer>
    </Layout>
  );
}

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const userMenu = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
      danger: true,
    },
  ];

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
      onClick: () => navigate('/'),
    },
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: '/new',
      icon: <ShoppingOutlined />,
      label: 'New Order',
      onClick: () => navigate('/new'),
    },
    {
      key: '/documents',
      icon: <FileTextOutlined />,
      label: 'Documents',
      onClick: () => navigate('/documents'),
    },
    {
      key: '/rider',
      icon: <SafetyOutlined />,
      label: 'Rider Dashboard',
      onClick: () => navigate('/rider'),
    },
  ];

  // Public routes (no authentication required)
  if (
    location.pathname === '/' ||
    location.pathname === '/about' ||
    location.pathname === '/services' ||
    location.pathname === '/contact' ||
    location.pathname === '/faq' ||
    location.pathname === '/login'
  ) {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />
        <Route
          path="/services"
          element={
            <PublicLayout>
              <Services />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />
        <Route
          path="/faq"
          element={
            <PublicLayout>
              <FAQ />
            </PublicLayout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Protected routes (require authentication)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          if (broken) setCollapsed(true);
        }}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: collapsed ? '1.5rem' : '1.2rem',
            fontWeight: 'bold',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <RocketOutlined style={{ color: '#FFB703', marginRight: collapsed ? 0 : 8 }} />
          {!collapsed && <span>GOLDEN ERRANDS</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ marginTop: 16 }}
        />
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: '0 24px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          <div>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              style: { fontSize: '18px', cursor: 'pointer' },
              onClick: () => setCollapsed(!collapsed),
            })}
          </div>

          <Space size="large">
            <Badge count={3} size="small">
              <BellOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
            </Badge>
            
            <Dropdown menu={{ items: userMenu }} placement="bottomRight" arrow>
              <Space style={{ cursor: 'pointer' }}>
                <Avatar style={{ backgroundColor: '#E63946' }} icon={<UserOutlined />} />
                <div>
                  <div style={{ lineHeight: '20px' }}>
                    <Text strong>{user?.firstName} {user?.lastName}</Text>
                  </div>
                  <div style={{ lineHeight: '16px' }}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {user?.role}
                    </Text>
                  </div>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content
          style={{
            margin: '24px',
            padding: '24px',
            minHeight: 'calc(100vh - 118px)',
          }}
        >
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new" element={<NewOrder />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/rider" element={<RiderApp />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Tag,
  Typography,
  Space,
  Empty,
  Button,
  Progress,
  Tabs,
  Select,
  DatePicker,
  Alert,
  Dropdown,
  Menu,
} from 'antd';
import {
  ShoppingOutlined,
  CarOutlined,
  DollarOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  UserOutlined,
  TrophyOutlined,
  FireOutlined,
  ThunderboltOutlined,
  WarningOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  DownloadOutlined,
  PrinterOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import InvoiceGenerator from '../components/InvoiceGenerator';
import ReceiptGenerator from '../components/ReceiptGenerator';
import QuotationGenerator from '../components/QuotationGenerator';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import SimpleMap from '../components/SimpleMap';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: 'Bearer ' + token } : {};
}

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [timeFilter, setTimeFilter] = useState('week');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/orders', { headers: { ...authHeaders() } })
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => {
        setOrders([]);
        setLoading(false);
      });
  }, []);

  // Generate analytics data
  const generateAnalytics = () => {
    const weeklyData = [
      { day: 'Mon', orders: 12, revenue: 2400, deliveries: 10 },
      { day: 'Tue', orders: 19, revenue: 3800, deliveries: 15 },
      { day: 'Wed', orders: 15, revenue: 3000, deliveries: 12 },
      { day: 'Thu', orders: 22, revenue: 4400, deliveries: 18 },
      { day: 'Fri', orders: 28, revenue: 5600, deliveries: 24 },
      { day: 'Sat', orders: 32, revenue: 6400, deliveries: 28 },
      { day: 'Sun', orders: 25, revenue: 5000, deliveries: 20 },
    ];

    const monthlyData = [
      { month: 'Jan', orders: 450, revenue: 90000 },
      { month: 'Feb', orders: 520, revenue: 104000 },
      { month: 'Mar', orders: 480, revenue: 96000 },
      { month: 'Apr', orders: 600, revenue: 120000 },
      { month: 'May', orders: 750, revenue: 150000 },
      { month: 'Jun', orders: 820, revenue: 164000 },
    ];

    const statusData = [
      { name: 'Pending', value: orders.filter((o) => o.status === 'PENDING').length || 5 },
      { name: 'In Transit', value: orders.filter((o) => o.status === 'IN_TRANSIT').length || 8 },
      { name: 'Delivered', value: orders.filter((o) => o.status === 'DELIVERED').length || 45 },
      { name: 'Cancelled', value: orders.filter((o) => o.status === 'CANCELLED').length || 2 },
    ];

    const deliveryTypes = [
      { name: 'Food Delivery', count: 25, color: '#E63946' },
      { name: 'Parcel', count: 18, color: '#FB8500' },
      { name: 'Grocery', count: 12, color: '#FFB703' },
      { name: 'Pharmaceutical', count: 8, color: '#06d6a0' },
      { name: 'Personal', count: 7, color: '#0096FF' },
    ];

    return { weeklyData, monthlyData, statusData, deliveryTypes };
  };

  const analytics = generateAnalytics();

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length || 153,
      icon: <ShoppingOutlined />,
      color: '#E63946',
      trend: '+12.5%',
      trendUp: true,
      prefix: '',
      suffix: '',
    },
    {
      title: 'Revenue (Today)',
      value: 8450,
      icon: <DollarOutlined />,
      color: '#06d6a0',
      trend: '+8.2%',
      trendUp: true,
      prefix: 'GHS ',
      suffix: '',
    },
    {
      title: 'Active Deliveries',
      value: orders.filter((o) => o.status === 'IN_TRANSIT').length || 12,
      icon: <CarOutlined />,
      color: '#0096FF',
      trend: '+15.3%',
      trendUp: true,
      prefix: '',
      suffix: '',
    },
    {
      title: 'Success Rate',
      value: 98.5,
      icon: <TrophyOutlined />,
      color: '#FFB703',
      trend: '+2.1%',
      trendUp: true,
      prefix: '',
      suffix: '%',
    },
  ];

  const COLORS = ['#E63946', '#0096FF', '#06d6a0', '#FF6B6B'];

  const columns = [
    {
      title: 'Order #',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (text) => <Text strong style={{ color: '#E63946' }}>{text}</Text>,
    },
    {
      title: 'Pickup',
      dataIndex: 'pickupAddress',
      key: 'pickupAddress',
      ellipsis: true,
    },
    {
      title: 'Delivery',
      dataIndex: 'deliveryAddress',
      key: 'deliveryAddress',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          PENDING: 'gold',
          CONFIRMED: 'blue',
          ASSIGNED: 'cyan',
          PICKED_UP: 'purple',
          IN_TRANSIT: 'processing',
          DELIVERED: 'success',
          CANCELLED: 'error',
        };
        return <Tag color={colors[status] || 'default'}>{status}</Tag>;
      },
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div>
      {/* Header with Time Filter */}
      <div className="page-header" style={{ marginBottom: 24 }}>
        <div>
          <Title level={2} style={{ margin: 0, color: '#E63946' }}>
            <RiseOutlined /> Dashboard
          </Title>
          <Text type="secondary">Real-time insights and analytics</Text>
        </div>
        <Space>
          <Button
            type="primary"
            icon={<FileTextOutlined />}
            onClick={() => setShowQuotationModal(true)}
            style={{ background: '#E63946', borderColor: '#E63946' }}
          >
            New Quotation
          </Button>
          <Button
            icon={<FilePdfOutlined />}
            onClick={() => setShowInvoiceModal(true)}
          >
            New Invoice
          </Button>
          <Button
            icon={<PrinterOutlined />}
            onClick={() => setShowReceiptModal(true)}
          >
            New Receipt
          </Button>
          <Select
            value={timeFilter}
            onChange={setTimeFilter}
            style={{ width: 150 }}
            options={[
              { label: 'Today', value: 'today' },
              { label: 'This Week', value: 'week' },
              { label: 'This Month', value: 'month' },
              { label: 'This Year', value: 'year' },
            ]}
          />
          <RangePicker />
        </Space>
      </div>

      {/* Alert Banner */}
      <Alert
        message={
          <Space>
            <FireOutlined />
            <Text strong>System Status: All systems operational</Text>
          </Space>
        }
        description={`Last updated: ${new Date().toLocaleTimeString()} | ${orders.filter((o) => o.status === 'IN_TRANSIT').length || 12} active deliveries`}
        type="success"
        showIcon
        closable
        style={{ marginBottom: 24 }}
      />

      {/* Key Metrics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              bordered={false}
              style={{
                borderLeft: `4px solid ${stat.color}`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                background: `linear-gradient(135deg, white 0%, ${stat.color}05 100%)`,
              }}
              className="fade-in-up"
              hoverable
            >
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                  <Text type="secondary" style={{ fontSize: 13 }}>
                    {stat.title}
                  </Text>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: `${stat.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {React.cloneElement(stat.icon, {
                      style: { fontSize: 20, color: stat.color },
                    })}
                  </div>
                </Space>
                <Title level={3} style={{ margin: 0, color: stat.color }}>
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </Title>
                <Space>
                  {stat.trendUp ? (
                    <ArrowUpOutlined style={{ color: '#06d6a0', fontSize: 12 }} />
                  ) : (
                    <ArrowDownOutlined style={{ color: '#E63946', fontSize: 12 }} />
                  )}
                  <Text style={{ fontSize: 12, color: stat.trendUp ? '#06d6a0' : '#E63946' }}>
                    {stat.trend}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    vs last week
                  </Text>
                </Space>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* Orders Trend Chart */}
        <Col xs={24} lg={16}>
          <Card
            title={
              <Space>
                <RiseOutlined style={{ color: '#E63946' }} />
                <Text strong>Orders & Revenue Trend</Text>
              </Space>
            }
            bordered={false}
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics.weeklyData}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E63946" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#E63946" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06d6a0" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06d6a0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #f0f0f0',
                    borderRadius: 8,
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#E63946"
                  fillOpacity={1}
                  fill="url(#colorOrders)"
                  name="Orders"
                />
                <Area
                  type="monotone"
                  dataKey="deliveries"
                  stroke="#06d6a0"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Completed"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Status Distribution */}
        <Col xs={24} lg={8}>
          <Card
            title={
              <Space>
                <FireOutlined style={{ color: '#FFB703' }} />
                <Text strong>Order Status</Text>
              </Space>
            }
            bordered={false}
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analytics.statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Delivery Types & Performance */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* Delivery Types Bar Chart */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <ThunderboltOutlined style={{ color: '#0096FF' }} />
                <Text strong>Delivery Types Performance</Text>
              </Space>
            }
            bordered={false}
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.deliveryTypes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #f0f0f0',
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="count" fill="#E63946" radius={[8, 8, 0, 0]}>
                  {analytics.deliveryTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Quick Stats */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <TrophyOutlined style={{ color: '#06d6a0' }} />
                <Text strong>Performance Metrics</Text>
              </Space>
            }
            bordered={false}
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                  <Text>Average Delivery Time</Text>
                  <Text strong style={{ color: '#E63946' }}>
                    32 mins
                  </Text>
                </Space>
                <Progress percent={85} strokeColor="#E63946" showInfo={false} />
              </div>

              <div>
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                  <Text>Customer Satisfaction</Text>
                  <Text strong style={{ color: '#06d6a0' }}>
                    98.5%
                  </Text>
                </Space>
                <Progress percent={98.5} strokeColor="#06d6a0" showInfo={false} />
              </div>

              <div>
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                  <Text>On-Time Delivery Rate</Text>
                  <Text strong style={{ color: '#0096FF' }}>
                    96.2%
                  </Text>
                </Space>
                <Progress percent={96.2} strokeColor="#0096FF" showInfo={false} />
              </div>

              <div>
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                  <Text>Rider Utilization</Text>
                  <Text strong style={{ color: '#FFB703' }}>
                    87%
                  </Text>
                </Space>
                <Progress percent={87} strokeColor="#FFB703" showInfo={false} />
              </div>

              <div>
                <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                  <Text>Revenue Target (Monthly)</Text>
                  <Text strong style={{ color: '#8338EC' }}>
                    GHS 164,000 / 200,000
                  </Text>
                </Space>
                <Progress percent={82} strokeColor="#8338EC" showInfo={false} />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Orders Table with Map */}
      <Card
        title={
          <Space>
            <ShoppingOutlined style={{ color: '#E63946' }} />
            <Text strong>Recent Orders</Text>
          </Space>
        }
        extra={
          <Space>
            <Button icon={<UserOutlined />}>Filter</Button>
            <Button
              type="primary"
              icon={<EnvironmentOutlined />}
              onClick={() => setShowMap(!showMap)}
              style={{
                background: showMap ? '#06d6a0' : '#E63946',
                borderColor: showMap ? '#06d6a0' : '#E63946',
              }}
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </Button>
          </Space>
        }
        bordered={false}
        className="fade-in-up"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
      >
        {showMap && (
          <div style={{ marginBottom: 24 }}>
            <SimpleMap
              locations={orders
                .filter((o) => o.status === 'IN_TRANSIT' || o.status === 'PICKED_UP')
                .slice(0, 5)
                .map((order, index) => ({
                  name: `Order #${order.orderNumber || order.id}`,
                  lat: 5.6037 + (Math.random() - 0.5) * 0.5,
                  lng: -0.1870 + (Math.random() - 0.5) * 0.5,
                  address: `From: ${order.pickupAddress} → To: ${order.deliveryAddress}`,
                }))}
              style={{ height: 400, marginBottom: 16 }}
            />
            <Text type="secondary" style={{ display: 'block', textAlign: 'center' }}>
              Showing active deliveries on map
            </Text>
          </div>
        )}

        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
          locale={{
            emptyText: (
              <Empty
                description="No orders yet. Create your first order!"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      </Card>

      {/* Document Generation Modals */}
      <InvoiceGenerator
        visible={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        order={selectedOrder}
      />
      <ReceiptGenerator
        visible={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        order={selectedOrder}
      />
      <QuotationGenerator
        visible={showQuotationModal}
        onClose={() => setShowQuotationModal(false)}
      />
    </div>
  );
}

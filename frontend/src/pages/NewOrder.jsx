import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Select, Row, Col, Typography, Space } from 'antd';
import { ShoppingOutlined, EnvironmentOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: 'Bearer ' + token } : {};
}

export default function NewOrder() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  async function onFinish(values) {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      
      if (res.ok) {
        message.success(`Order created successfully! Order #${data.orderNumber}`);
        form.resetFields();
      } else {
        message.error(data.error || 'Failed to create order');
      }
    } catch (error) {
      message.error('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <Title level={2} style={{ margin: 0, color: '#E63946' }}>
          <ShoppingOutlined /> Create New Order
        </Title>
        <Text type="secondary">Fill in the details to create a delivery order</Text>
      </div>

      <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          size="large"
          initialValues={{
            deliveryType: 'PARCEL_DELIVERY',
            packageSize: 'MEDIUM',
            paymentMethod: 'CASH_ON_DELIVERY',
          }}
        >
          <Row gutter={16}>
            <Col xs={24} lg={12}>
              <Title level={4} style={{ color: '#E63946', marginTop: 0 }}>
                <EnvironmentOutlined /> Pickup Information
              </Title>

              <Form.Item
                name="pickupAddress"
                label="Pickup Address"
                rules={[{ required: true, message: 'Please enter pickup address' }]}
              >
                <Input
                  prefix={<EnvironmentOutlined />}
                  placeholder="Enter pickup location"
                />
              </Form.Item>

              <Form.Item name="pickupContact" label="Pickup Contact">
                <Input prefix={<PhoneOutlined />} placeholder="Contact number" />
              </Form.Item>

              <Form.Item name="pickupInstructions" label="Pickup Instructions">
                <TextArea rows={3} placeholder="Any special instructions for pickup" />
              </Form.Item>
            </Col>

            <Col xs={24} lg={12}>
              <Title level={4} style={{ color: '#E63946', marginTop: 0 }}>
                <EnvironmentOutlined /> Delivery Information
              </Title>

              <Form.Item
                name="deliveryAddress"
                label="Delivery Address"
                rules={[{ required: true, message: 'Please enter delivery address' }]}
              >
                <Input
                  prefix={<EnvironmentOutlined />}
                  placeholder="Enter delivery location"
                />
              </Form.Item>

              <Form.Item name="recipientName" label="Recipient Name">
                <Input prefix={<UserOutlined />} placeholder="Recipient's name" />
              </Form.Item>

              <Form.Item name="recipientPhone" label="Recipient Phone">
                <Input prefix={<PhoneOutlined />} placeholder="Recipient's contact" />
              </Form.Item>

              <Form.Item name="deliveryInstructions" label="Delivery Instructions">
                <TextArea rows={3} placeholder="Any special instructions for delivery" />
              </Form.Item>
            </Col>
          </Row>

          <Title level={4} style={{ color: '#E63946', marginTop: 24 }}>
            <ShoppingOutlined /> Package Details
          </Title>

          <Row gutter={16}>
            <Col xs={24} sm={8}>
              <Form.Item name="deliveryType" label="Delivery Type">
                <Select>
                  <Select.Option value="FOOD_DELIVERY">🍕 Food Delivery</Select.Option>
                  <Select.Option value="PARCEL_DELIVERY">📦 Parcel Delivery</Select.Option>
                  <Select.Option value="GROCERY_ERRANDS">🛒 Grocery Errands</Select.Option>
                  <Select.Option value="PHARMACEUTICAL">💊 Pharmaceutical</Select.Option>
                  <Select.Option value="BUS_STATION_PICKUP">🚌 Bus Station Pickup</Select.Option>
                  <Select.Option value="ONLINE_SHOPS">🛍️ Online Shops</Select.Option>
                  <Select.Option value="PERSONAL_ERRANDS">📋 Personal Errands</Select.Option>
                  <Select.Option value="OTHER">✨ Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item name="packageSize" label="Package Size">
                <Select>
                  <Select.Option value="SMALL">Small</Select.Option>
                  <Select.Option value="MEDIUM">Medium</Select.Option>
                  <Select.Option value="LARGE">Large</Select.Option>
                  <Select.Option value="EXTRA_LARGE">Extra Large</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={8}>
              <Form.Item name="paymentMethod" label="Payment Method">
                <Select>
                  <Select.Option value="CASH_ON_DELIVERY">Cash on Delivery</Select.Option>
                  <Select.Option value="ONLINE_CARD">Online Card</Select.Option>
                  <Select.Option value="MOBILE_MONEY">Mobile Money</Select.Option>
                  <Select.Option value="WALLET">Wallet</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="packageDescription" label="Package Description">
            <TextArea
              rows={2}
              placeholder="Describe the package contents (e.g., Electronics, Documents, etc.)"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 32 }}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                icon={<ShoppingOutlined />}
              >
                Create Order
              </Button>
              <Button size="large" onClick={() => form.resetFields()}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

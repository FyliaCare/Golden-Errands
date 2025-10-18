
import React, { useEffect, useState } from 'react';
import { Card, List, Tag, Button, Space, Typography, Badge, Empty, message, Tabs, Modal, Form, Input, Select } from 'antd';
import {
  UserOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SafetyOutlined,
  PlusOutlined,
  EditOutlined,
  CarOutlined,
} from '@ant-design/icons';
import SimpleMap from '../components/SimpleMap';

const { Title, Text } = Typography;

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: 'Bearer ' + token } : {};
}

export default function RiderApp() {
  // Rider management state
  const [riders, setRiders] = useState([]);
  const [selectedRider, setSelectedRider] = useState(null);
  const [showRiderModal, setShowRiderModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  // Demo: Fetch riders (replace with API)
  useEffect(() => {
    setRiders([
      { id: 1, name: 'Kwame Mensah', phone: '0241234567', email: 'kwame@riders.com', moto: 'Yamaha M-123', status: 'Active' },
      { id: 2, name: 'Ama Asante', phone: '0509876543', email: 'ama@riders.com', moto: 'Honda H-456', status: 'Inactive' },
    ]);
  }, []);

  // Add or edit rider
  const handleSaveRider = (values) => {
    if (isEdit && selectedRider) {
      setRiders(riders.map(r => r.id === selectedRider.id ? { ...selectedRider, ...values } : r));
      message.success('Rider details updated');
    } else {
      setRiders([...riders, { ...values, id: Date.now(), status: 'Active' }]);
      message.success('New rider profile created');
    }
    setShowRiderModal(false);
    setSelectedRider(null);
    setIsEdit(false);
    form.resetFields();
  };

  // Assign rider to motorbike
  const handleAssignMoto = (riderId, moto) => {
    setRiders(riders.map(r => r.id === riderId ? { ...r, moto } : r));
    message.success('Motorbike assigned');
  };

  return (
    <div>
      <div className="page-header">
        <Title level={2} style={{ margin: 0, color: '#E63946' }}>
          <SafetyOutlined /> Rider Dashboard
        </Title>
        <Text type="secondary">Manage riders, profiles, and assignments</Text>
      </div>

      <Card bordered={false} style={{ marginBottom: 16 }}>
        <Space size="large">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => { setShowRiderModal(true); setIsEdit(false); form.resetFields(); }}>Start New Rider Profile</Button>
        </Space>
      </Card>

      <Card title={<Text strong>Rider Profiles</Text>} bordered={false}>
        <List
          dataSource={riders}
          locale={{ emptyText: <Empty description="No riders yet" /> }}
          renderItem={rider => (
            <List.Item
              key={rider.id}
              actions={[
                <Button icon={<EditOutlined />} onClick={() => { setSelectedRider(rider); setIsEdit(true); setShowRiderModal(true); form.setFieldsValue(rider); }}>Edit</Button>,
                <Select defaultValue={rider.moto} style={{ width: 140 }} onChange={moto => handleAssignMoto(rider.id, moto)}>
                  <Select.Option value="Yamaha M-123">Yamaha M-123</Select.Option>
                  <Select.Option value="Honda H-456">Honda H-456</Select.Option>
                  <Select.Option value="Suzuki S-789">Suzuki S-789</Select.Option>
                  <Select.Option value="Bajaj B-321">Bajaj B-321</Select.Option>
                </Select>
              ]}
            >
              <List.Item.Meta
                avatar={<UserOutlined style={{ fontSize: 32, color: '#E63946' }} />}
                title={<Text strong>{rider.name}</Text>}
                description={
                  <Space direction="vertical">
                    <Text>Email: {rider.email}</Text>
                    <Text>Phone: {rider.phone}</Text>
                    <Text>Motorbike: <Tag color="blue">{rider.moto}</Tag></Text>
                    <Text>Status: <Tag color={rider.status === 'Active' ? 'green' : 'red'}>{rider.status}</Tag></Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      <Modal
        title={isEdit ? 'Edit Rider Profile' : 'Start New Rider Profile'}
        open={showRiderModal}
        onCancel={() => { setShowRiderModal(false); setIsEdit(false); form.resetFields(); }}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveRider}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}> <Input /> </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="moto" label="Assign Motorbike" rules={[{ required: true }]}> <Select>
            <Select.Option value="Yamaha M-123">Yamaha M-123</Select.Option>
            <Select.Option value="Honda H-456">Honda H-456</Select.Option>
            <Select.Option value="Suzuki S-789">Suzuki S-789</Select.Option>
            <Select.Option value="Bajaj B-321">Bajaj B-321</Select.Option>
          </Select> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

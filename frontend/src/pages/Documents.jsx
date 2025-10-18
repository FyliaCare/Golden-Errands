import React, { useState } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Typography,
  Input,
  Select,
  DatePicker,
  Dropdown,
  Menu,
  message,
  Tabs,
  Statistic,
  Row,
  Col,
} from 'antd';
import {
  FileTextOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  FileExcelOutlined,
  DollarOutlined,
  FileProtectOutlined,
  FileAddOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import InvoiceGenerator from '../components/InvoiceGenerator';
import ReceiptGenerator from '../components/ReceiptGenerator';
import QuotationGenerator from '../components/QuotationGenerator';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

export default function Documents() {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data - in real app, fetch from backend
  const [invoices] = useState([
    {
      id: 1,
      number: 'INV-2025-001',
      date: '2025-01-15',
      customer: 'Kwame Mensah',
      amount: 2500,
      status: 'Paid',
      dueDate: '2025-02-14',
    },
    {
      id: 2,
      number: 'INV-2025-002',
      date: '2025-01-18',
      customer: 'Ama Asante',
      amount: 1800,
      status: 'Pending',
      dueDate: '2025-02-17',
    },
    {
      id: 3,
      number: 'INV-2025-003',
      date: '2025-01-20',
      customer: 'Kofi Boateng',
      amount: 3200,
      status: 'Overdue',
      dueDate: '2025-01-20',
    },
  ]);

  const [receipts] = useState([
    {
      id: 1,
      number: 'RCP-2025-001',
      date: '2025-01-15',
      customer: 'Kwame Mensah',
      amount: 2500,
      method: 'Mobile Money',
      reference: 'MM-12345678',
    },
    {
      id: 2,
      number: 'RCP-2025-002',
      date: '2025-01-16',
      customer: 'Akua Frimpong',
      amount: 850,
      method: 'Cash',
      reference: 'N/A',
    },
  ]);

  const [quotations] = useState([
    {
      id: 1,
      number: 'QUO-2025-001',
      date: '2025-01-10',
      customer: 'Ghana Tech Ltd',
      amount: 15000,
      status: 'Sent',
      validUntil: '2025-02-10',
    },
    {
      id: 2,
      number: 'QUO-2025-002',
      date: '2025-01-12',
      customer: 'Accra Motors',
      amount: 8500,
      status: 'Accepted',
      validUntil: '2025-02-12',
    },
    {
      id: 3,
      number: 'QUO-2025-003',
      date: '2025-01-14',
      customer: 'Tema Trading Co',
      amount: 12000,
      status: 'Draft',
      validUntil: '2025-02-14',
    },
  ]);

  const exportToExcel = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, `${filename}_${dayjs().format('YYYY-MM-DD')}.xlsx`);
    message.success(`Exported to ${filename}.xlsx`);
  };

  const invoiceColumns = [
    {
      title: 'Invoice #',
      dataIndex: 'number',
      key: 'number',
      render: (text) => <Text strong style={{ color: '#E63946' }}>{text}</Text>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `GHS ${amount.toFixed(2)}`,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          Paid: 'success',
          Pending: 'warning',
          Overdue: 'error',
          Cancelled: 'default',
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" icon={<EyeOutlined />}>
            View
          </Button>
          <Button type="link" size="small" icon={<FilePdfOutlined />}>
            PDF
          </Button>
          <Button type="link" size="small" icon={<PrinterOutlined />}>
            Print
          </Button>
        </Space>
      ),
    },
  ];

  const receiptColumns = [
    {
      title: 'Receipt #',
      dataIndex: 'number',
      key: 'number',
      render: (text) => <Text strong style={{ color: '#E63946' }}>{text}</Text>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `GHS ${amount.toFixed(2)}`,
    },
    {
      title: 'Payment Method',
      dataIndex: 'method',
      key: 'method',
      render: (method) => <Tag color="blue">{method}</Tag>,
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" icon={<EyeOutlined />}>
            View
          </Button>
          <Button type="link" size="small" icon={<FilePdfOutlined />}>
            PDF
          </Button>
          <Button type="link" size="small" icon={<PrinterOutlined />}>
            Print
          </Button>
        </Space>
      ),
    },
  ];

  const quotationColumns = [
    {
      title: 'Quotation #',
      dataIndex: 'number',
      key: 'number',
      render: (text) => <Text strong style={{ color: '#E63946' }}>{text}</Text>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `GHS ${amount.toFixed(2)}`,
    },
    {
      title: 'Valid Until',
      dataIndex: 'validUntil',
      key: 'validUntil',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          Draft: 'default',
          Sent: 'processing',
          Reviewed: 'warning',
          Accepted: 'success',
          Rejected: 'error',
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small" icon={<EyeOutlined />}>
            View
          </Button>
          <Button type="link" size="small" icon={<EditOutlined />}>
            Edit
          </Button>
          <Button type="link" size="small" icon={<FilePdfOutlined />}>
            PDF
          </Button>
        </Space>
      ),
    },
  ];

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReceived = receipts.reduce((sum, rec) => sum + rec.amount, 0);
  const totalQuoted = quotations.reduce((sum, quo) => sum + quo.amount, 0);
  const pendingInvoices = invoices.filter((inv) => inv.status === 'Pending').length;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: 24 }}>
        <div>
          <Title level={2} style={{ margin: 0, color: '#E63946' }}>
            <FileTextOutlined /> Document Management
          </Title>
          <Text type="secondary">Invoices, Receipts, and Quotations</Text>
        </div>
        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setShowQuotationModal(true)}
            style={{ background: '#E63946', borderColor: '#E63946' }}
          >
            New Quotation
          </Button>
          <Button icon={<FilePdfOutlined />} onClick={() => setShowInvoiceModal(true)}>
            New Invoice
          </Button>
          <Button icon={<PrinterOutlined />} onClick={() => setShowReceiptModal(true)}>
            New Receipt
          </Button>
        </Space>
      </div>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Invoiced"
              value={totalInvoiced}
              precision={2}
              prefix="GHS "
              valueStyle={{ color: '#E63946' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Received"
              value={totalReceived}
              precision={2}
              prefix="GHS "
              valueStyle={{ color: '#06d6a0' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Total Quoted"
              value={totalQuoted}
              precision={2}
              prefix="GHS "
              valueStyle={{ color: '#FFB703' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title="Pending Invoices"
              value={pendingInvoices}
              valueStyle={{ color: '#0096FF' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Documents Tabs */}
      <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Tabs defaultActiveKey="invoices">
          <TabPane
            tab={
              <span>
                <FilePdfOutlined />
                Invoices ({invoices.length})
              </span>
            }
            key="invoices"
          >
            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
              <Space>
                <Search
                  placeholder="Search invoices..."
                  allowClear
                  style={{ width: 250 }}
                  onSearch={(value) => setSearchText(value)}
                />
                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  onChange={setFilterStatus}
                  options={[
                    { label: 'All Status', value: 'all' },
                    { label: 'Paid', value: 'Paid' },
                    { label: 'Pending', value: 'Pending' },
                    { label: 'Overdue', value: 'Overdue' },
                  ]}
                />
                <RangePicker />
              </Space>
              <Button
                icon={<FileExcelOutlined />}
                onClick={() => exportToExcel(invoices, 'Invoices')}
              >
                Export to Excel
              </Button>
            </Space>
            <Table
              columns={invoiceColumns}
              dataSource={invoices}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>

          <TabPane
            tab={
              <span>
                <PrinterOutlined />
                Receipts ({receipts.length})
              </span>
            }
            key="receipts"
          >
            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
              <Space>
                <Search
                  placeholder="Search receipts..."
                  allowClear
                  style={{ width: 250 }}
                />
                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  options={[
                    { label: 'All Methods', value: 'all' },
                    { label: 'Cash', value: 'Cash' },
                    { label: 'Mobile Money', value: 'Mobile Money' },
                    { label: 'Bank Transfer', value: 'Bank Transfer' },
                  ]}
                />
                <RangePicker />
              </Space>
              <Button
                icon={<FileExcelOutlined />}
                onClick={() => exportToExcel(receipts, 'Receipts')}
              >
                Export to Excel
              </Button>
            </Space>
            <Table
              columns={receiptColumns}
              dataSource={receipts}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>

          <TabPane
            tab={
              <span>
                <FileTextOutlined />
                Quotations ({quotations.length})
              </span>
            }
            key="quotations"
          >
            <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
              <Space>
                <Search
                  placeholder="Search quotations..."
                  allowClear
                  style={{ width: 250 }}
                />
                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  onChange={setFilterStatus}
                  options={[
                    { label: 'All Status', value: 'all' },
                    { label: 'Draft', value: 'Draft' },
                    { label: 'Sent', value: 'Sent' },
                    { label: 'Accepted', value: 'Accepted' },
                    { label: 'Rejected', value: 'Rejected' },
                  ]}
                />
                <RangePicker />
              </Space>
              <Button
                icon={<FileExcelOutlined />}
                onClick={() => exportToExcel(quotations, 'Quotations')}
              >
                Export to Excel
              </Button>
            </Space>
            <Table
              columns={quotationColumns}
              dataSource={quotations}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Document Generation Modals */}
      <InvoiceGenerator
        visible={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
      />
      <ReceiptGenerator
        visible={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
      />
      <QuotationGenerator
        visible={showQuotationModal}
        onClose={() => setShowQuotationModal(false)}
      />
    </div>
  );
}

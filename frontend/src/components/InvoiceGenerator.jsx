import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, Table, InputNumber, Space, message } from 'antd';
import { PlusOutlined, DeleteOutlined, FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const InvoiceGenerator = ({ visible, onClose, order }) => {
  const [form] = Form.useForm();
  const [items, setItems] = useState([
    { id: 1, description: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id, field, value) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantity' || field === 'rate') {
          updated.amount = (updated.quantity || 0) * (updated.rate || 0);
        }
        return updated;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.amount || 0), 0);
    const taxRate = form.getFieldValue('taxRate') || 0;
    const discountRate = form.getFieldValue('discountRate') || 0;
    
    const discount = subtotal * (discountRate / 100);
    const taxableAmount = subtotal - discount;
    const tax = taxableAmount * (taxRate / 100);
    const total = taxableAmount + tax;

    return { subtotal, discount, tax, total };
  };

  const generateInvoicePDF = (action = 'download') => {
    form.validateFields().then(values => {
      const doc = new jsPDF();
      const totals = calculateTotals();

      // Header with company logo area
      doc.setFillColor(230, 57, 70); // Red
      doc.rect(0, 0, 210, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(28);
      doc.setFont(undefined, 'bold');
      doc.text('GOLDEN ERRANDS', 15, 20);
      
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.text('We Deliver with Passion!', 15, 28);
      doc.text('0256039212 | 0256039213 | 0256039214', 15, 34);

      // Invoice title and number
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(24);
      doc.setFont(undefined, 'bold');
      doc.text('INVOICE', 150, 20);
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`Invoice #: ${values.invoiceNumber}`, 150, 28);
      doc.text(`Date: ${dayjs(values.invoiceDate).format('MMM DD, YYYY')}`, 150, 34);
      if (values.dueDate) {
        doc.text(`Due Date: ${dayjs(values.dueDate).format('MMM DD, YYYY')}`, 150, 40);
      }

      // Bill To section
      let yPos = 55;
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('BILL TO:', 15, yPos);
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      yPos += 7;
      doc.text(values.customerName, 15, yPos);
      if (values.customerEmail) {
        yPos += 5;
        doc.text(`Email: ${values.customerEmail}`, 15, yPos);
      }
      if (values.customerPhone) {
        yPos += 5;
        doc.text(`Phone: ${values.customerPhone}`, 15, yPos);
      }
      if (values.customerAddress) {
        yPos += 5;
        const addressLines = doc.splitTextToSize(values.customerAddress, 80);
        doc.text(addressLines, 15, yPos);
        yPos += addressLines.length * 5;
      }

      // Company address (right side)
      let rightYPos = 55;
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('FROM:', 120, rightYPos);
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      rightYPos += 7;
      doc.text('Golden Errands Ltd.', 120, rightYPos);
      rightYPos += 5;
      doc.text('Liberation Road, Accra', 120, rightYPos);
      rightYPos += 5;
      doc.text('info@goldenerrands.com', 120, rightYPos);

      // Items table
      const tableData = items.map(item => [
        item.description,
        item.quantity,
        `GHS ${item.rate.toFixed(2)}`,
        `GHS ${item.amount.toFixed(2)}`
      ]);

      doc.autoTable({
        startY: yPos + 10,
        head: [['Description', 'Qty', 'Rate', 'Amount']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [230, 57, 70],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 9,
          cellPadding: 5
        },
        columnStyles: {
          0: { cellWidth: 90 },
          1: { cellWidth: 20, halign: 'center' },
          2: { cellWidth: 35, halign: 'right' },
          3: { cellWidth: 35, halign: 'right' }
        }
      });

      // Totals section
      const finalY = doc.lastAutoTable.finalY + 10;
      const totalsX = 130;
      
      doc.setFontSize(10);
      doc.text('Subtotal:', totalsX, finalY);
      doc.text(`GHS ${totals.subtotal.toFixed(2)}`, 185, finalY, { align: 'right' });
      
      if (totals.discount > 0) {
        doc.text(`Discount (${values.discountRate}%):`, totalsX, finalY + 6);
        doc.text(`- GHS ${totals.discount.toFixed(2)}`, 185, finalY + 6, { align: 'right' });
      }
      
      if (totals.tax > 0) {
        doc.text(`Tax (${values.taxRate}%):`, totalsX, finalY + 12);
        doc.text(`GHS ${totals.tax.toFixed(2)}`, 185, finalY + 12, { align: 'right' });
      }

      // Total line
      doc.setDrawColor(230, 57, 70);
      doc.setLineWidth(0.5);
      doc.line(totalsX, finalY + 16, 195, finalY + 16);
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('TOTAL:', totalsX, finalY + 22);
      doc.text(`GHS ${totals.total.toFixed(2)}`, 185, finalY + 22, { align: 'right' });

      // Notes section
      if (values.notes) {
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Notes:', 15, finalY + 35);
        doc.setFont(undefined, 'normal');
        const notesLines = doc.splitTextToSize(values.notes, 180);
        doc.text(notesLines, 15, finalY + 42);
      }

      // Payment terms
      if (values.paymentTerms) {
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Payment Terms:', 15, finalY + 60);
        doc.setFont(undefined, 'normal');
        doc.text(values.paymentTerms, 15, finalY + 67);
      }

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Thank you for your business!', 105, 280, { align: 'center' });
      doc.text('Golden Errands - We Deliver with Passion!', 105, 285, { align: 'center' });

      if (action === 'download') {
        doc.save(`Invoice_${values.invoiceNumber}.pdf`);
        message.success('Invoice downloaded successfully!');
      } else if (action === 'print') {
        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
        message.success('Invoice ready for printing!');
      }
    }).catch(err => {
      message.error('Please fill in all required fields');
    });
  };

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      width: '40%',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => updateItem(record.id, 'description', e.target.value)}
          placeholder="Item description"
        />
      )
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      width: '15%',
      render: (text, record) => (
        <InputNumber
          min={1}
          value={text}
          onChange={(value) => updateItem(record.id, 'quantity', value)}
          style={{ width: '100%' }}
        />
      )
    },
    {
      title: 'Rate (GHS)',
      dataIndex: 'rate',
      width: '20%',
      render: (text, record) => (
        <InputNumber
          min={0}
          step={0.01}
          value={text}
          onChange={(value) => updateItem(record.id, 'rate', value)}
          style={{ width: '100%' }}
          precision={2}
        />
      )
    },
    {
      title: 'Amount (GHS)',
      dataIndex: 'amount',
      width: '20%',
      render: (text) => `GHS ${text.toFixed(2)}`
    },
    {
      title: '',
      width: '5%',
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeItem(record.id)}
          disabled={items.length === 1}
        />
      )
    }
  ];

  const totals = calculateTotals();

  return (
    <Modal
      title="Generate Invoice"
      open={visible}
      onCancel={onClose}
      width={900}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="print"
          icon={<PrinterOutlined />}
          onClick={() => generateInvoicePDF('print')}
        >
          Print
        </Button>,
        <Button
          key="download"
          type="primary"
          icon={<FilePdfOutlined />}
          onClick={() => generateInvoicePDF('download')}
        >
          Download PDF
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          invoiceNumber: `INV-${Date.now()}`,
          invoiceDate: dayjs(),
          taxRate: 12.5,
          discountRate: 0,
          paymentTerms: 'Net 30'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            label="Invoice Number"
            name="invoiceNumber"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Invoice Date"
            name="invoiceDate"
            rules={[{ required: true, message: 'Required' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Customer Name"
            name="customerName"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Customer Email" name="customerEmail">
            <Input />
          </Form.Item>

          <Form.Item label="Customer Phone" name="customerPhone">
            <Input />
          </Form.Item>

          <Form.Item label="Due Date" name="dueDate">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <Form.Item label="Customer Address" name="customerAddress">
          <TextArea rows={2} />
        </Form.Item>

        <div style={{ marginTop: '24px', marginBottom: '16px' }}>
          <h4>Invoice Items</h4>
        </div>

        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          rowKey="id"
          size="small"
        />

        <Button
          type="dashed"
          onClick={addItem}
          icon={<PlusOutlined />}
          style={{ width: '100%', marginTop: '8px' }}
        >
          Add Item
        </Button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
          <Form.Item label="Tax Rate (%)" name="taxRate">
            <InputNumber min={0} max={100} style={{ width: '100%' }} onChange={() => form.setFieldsValue({})} />
          </Form.Item>

          <Form.Item label="Discount (%)" name="discountRate">
            <InputNumber min={0} max={100} style={{ width: '100%' }} onChange={() => form.setFieldsValue({})} />
          </Form.Item>
        </div>

        <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Subtotal:</span>
            <strong>GHS {totals.subtotal.toFixed(2)}</strong>
          </div>
          {totals.discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Discount:</span>
              <strong style={{ color: '#52c41a' }}>- GHS {totals.discount.toFixed(2)}</strong>
            </div>
          )}
          {totals.tax > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Tax:</span>
              <strong>GHS {totals.tax.toFixed(2)}</strong>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '12px', borderTop: '2px solid #d9d9d9' }}>
            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Total:</span>
            <strong style={{ fontSize: '18px', color: '#E63946' }}>GHS {totals.total.toFixed(2)}</strong>
          </div>
        </div>

        <Form.Item label="Payment Terms" name="paymentTerms" style={{ marginTop: '16px' }}>
          <Select>
            <Option value="Due on Receipt">Due on Receipt</Option>
            <Option value="Net 7">Net 7 Days</Option>
            <Option value="Net 15">Net 15 Days</Option>
            <Option value="Net 30">Net 30 Days</Option>
            <Option value="Net 60">Net 60 Days</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <TextArea rows={3} placeholder="Additional notes or terms..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InvoiceGenerator;

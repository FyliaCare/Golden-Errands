import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, Table, InputNumber, message } from 'antd';
import { PlusOutlined, DeleteOutlined, FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const QuotationGenerator = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [items, setItems] = useState([
    { id: 1, service: '', description: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      service: '',
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

  const generateQuotationPDF = (action = 'download') => {
    form.validateFields().then(values => {
      const doc = new jsPDF();
      const totals = calculateTotals();

      // Header with gradient effect simulation
      doc.setFillColor(230, 57, 70);
      doc.rect(0, 0, 210, 45, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(32);
      doc.setFont(undefined, 'bold');
      doc.text('GOLDEN ERRANDS', 15, 22);
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.text('We Deliver with Passion!', 15, 30);
      doc.text('📞 0256039212 | 0256039213 | 0256039214', 15, 37);

      // Quotation badge
      doc.setFillColor(255, 183, 3); // Gold
      doc.roundedRect(150, 10, 45, 25, 3, 3, 'F');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.text('QUOTATION', 172.5, 19, { align: 'center' });
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`#${values.quotationNumber}`, 172.5, 27, { align: 'center' });
      doc.text(dayjs(values.quotationDate).format('MMM DD, YYYY'), 172.5, 32, { align: 'center' });

      // Client information section
      let yPos = 60;
      doc.setTextColor(0, 0, 0);
      doc.setFillColor(245, 245, 245);
      doc.rect(15, yPos - 5, 85, 40, 'F');
      
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(230, 57, 70);
      doc.text('PREPARED FOR:', 20, yPos);
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(values.clientName, 20, yPos + 7);
      
      doc.setFont(undefined, 'normal');
      if (values.clientCompany) {
        doc.text(values.clientCompany, 20, yPos + 13);
      }
      if (values.clientEmail) {
        doc.text(`✉ ${values.clientEmail}`, 20, yPos + 19);
      }
      if (values.clientPhone) {
        doc.text(`📞 ${values.clientPhone}`, 20, yPos + 25);
      }
      if (values.clientAddress) {
        const addressLines = doc.splitTextToSize(values.clientAddress, 75);
        doc.text(addressLines, 20, yPos + 31);
      }

      // Quotation details
      doc.setFillColor(245, 245, 245);
      doc.rect(110, yPos - 5, 85, 40, 'F');
      
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(230, 57, 70);
      doc.text('QUOTATION DETAILS:', 115, yPos);
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text(`Quote #: ${values.quotationNumber}`, 115, yPos + 7);
      doc.text(`Date: ${dayjs(values.quotationDate).format('MMM DD, YYYY')}`, 115, yPos + 13);
      doc.text(`Valid Until: ${dayjs(values.validUntil).format('MMM DD, YYYY')}`, 115, yPos + 19);
      doc.text(`Project: ${values.projectName || 'N/A'}`, 115, yPos + 25);
      doc.text(`Status: ${values.status || 'Draft'}`, 115, yPos + 31);

      // Services/Items table
      const tableData = items.map(item => [
        item.service,
        item.description,
        item.quantity,
        `GHS ${item.rate.toFixed(2)}`,
        `GHS ${item.amount.toFixed(2)}`
      ]);

      doc.autoTable({
        startY: yPos + 50,
        head: [['Service', 'Description', 'Qty', 'Rate', 'Amount']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [230, 57, 70],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold',
          halign: 'left'
        },
        styles: {
          fontSize: 9,
          cellPadding: 4
        },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 60 },
          2: { cellWidth: 15, halign: 'center' },
          3: { cellWidth: 30, halign: 'right' },
          4: { cellWidth: 30, halign: 'right' }
        },
        alternateRowStyles: {
          fillColor: [250, 250, 250]
        }
      });

      // Totals section
      const finalY = doc.lastAutoTable.finalY + 10;
      const totalsX = 135;
      
      // Subtotal
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('Subtotal:', totalsX, finalY);
      doc.text(`GHS ${totals.subtotal.toFixed(2)}`, 190, finalY, { align: 'right' });
      
      // Discount
      if (totals.discount > 0) {
        doc.text(`Discount (${values.discountRate}%):`, totalsX, finalY + 6);
        doc.setTextColor(52, 168, 83); // Green
        doc.text(`- GHS ${totals.discount.toFixed(2)}`, 190, finalY + 6, { align: 'right' });
        doc.setTextColor(0, 0, 0);
      }
      
      // Tax
      if (totals.tax > 0) {
        doc.text(`Tax (${values.taxRate}%):`, totalsX, finalY + (totals.discount > 0 ? 12 : 6));
        doc.text(`GHS ${totals.tax.toFixed(2)}`, 190, finalY + (totals.discount > 0 ? 12 : 6), { align: 'right' });
      }

      // Total with gold background
      const totalY = finalY + (totals.discount > 0 ? 20 : 14);
      doc.setFillColor(255, 183, 3);
      doc.rect(totalsX - 5, totalY - 5, 65, 12, 'F');
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('TOTAL:', totalsX, totalY + 3);
      doc.setFontSize(14);
      doc.setTextColor(230, 57, 70);
      doc.text(`GHS ${totals.total.toFixed(2)}`, 190, totalY + 3, { align: 'right' });

      // Terms and conditions
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Terms & Conditions:', 15, totalY + 20);
      
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const terms = values.terms || `1. This quotation is valid for ${dayjs(values.validUntil).diff(dayjs(values.quotationDate), 'day')} days from the date of issue.
2. Prices are quoted in Ghana Cedis (GHS) and are subject to change without notice.
3. Payment terms: 50% deposit required, balance upon completion.
4. Delivery timeline will be confirmed upon order acceptance.
5. Additional charges may apply for services outside normal business hours.`;
      
      const termsLines = doc.splitTextToSize(terms, 180);
      doc.text(termsLines, 15, totalY + 28);

      // Notes section
      if (values.notes) {
        const notesY = totalY + 28 + (termsLines.length * 4) + 8;
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text('Notes:', 15, notesY);
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        const notesLines = doc.splitTextToSize(values.notes, 180);
        doc.text(notesLines, 15, notesY + 5);
      }

      // Footer with contact info
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 270, 210, 27, 'F');
      
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(230, 57, 70);
      doc.text('Ready to Get Started?', 105, 278, { align: 'center' });
      
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(80, 80, 80);
      doc.text('Contact us: info@goldenerrands.com | Liberation Road, Accra', 105, 284, { align: 'center' });
      doc.text('Golden Errands - We Deliver with Passion!', 105, 289, { align: 'center' });

      if (action === 'download') {
        doc.save(`Quotation_${values.quotationNumber}.pdf`);
        message.success('Quotation downloaded successfully!');
      } else if (action === 'print') {
        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
        message.success('Quotation ready for printing!');
      }
    }).catch(err => {
      message.error('Please fill in all required fields');
    });
  };

  const columns = [
    {
      title: 'Service',
      dataIndex: 'service',
      width: '25%',
      render: (text, record) => (
        <Select
          value={text}
          onChange={(value) => updateItem(record.id, 'service', value)}
          style={{ width: '100%' }}
          placeholder="Select service"
        >
          <Option value="Food Delivery">Food Delivery</Option>
          <Option value="Parcel Delivery">Parcel Delivery</Option>
          <Option value="Grocery Delivery">Grocery Delivery</Option>
          <Option value="Pharmaceutical Delivery">Pharmaceutical Delivery</Option>
          <Option value="Bus Station Pickup">Bus Station Pickup</Option>
          <Option value="Online Shopping Delivery">Online Shopping Delivery</Option>
          <Option value="Personal Errands">Personal Errands</Option>
          <Option value="Corporate Solutions">Corporate Solutions</Option>
          <Option value="Custom Service">Custom Service</Option>
        </Select>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '30%',
      render: (text, record) => (
        <Input
          value={text}
          onChange={(e) => updateItem(record.id, 'description', e.target.value)}
          placeholder="Service details"
        />
      )
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      width: '10%',
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
      width: '15%',
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
      width: '15%',
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
      title="Generate Quotation"
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="print"
          icon={<PrinterOutlined />}
          onClick={() => generateQuotationPDF('print')}
        >
          Print
        </Button>,
        <Button
          key="download"
          type="primary"
          icon={<FilePdfOutlined />}
          onClick={() => generateQuotationPDF('download')}
        >
          Download PDF
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          quotationNumber: `QUO-${Date.now()}`,
          quotationDate: dayjs(),
          validUntil: dayjs().add(30, 'days'),
          taxRate: 12.5,
          discountRate: 0,
          status: 'Draft'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <Form.Item
            label="Quotation Number"
            name="quotationNumber"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quotation Date"
            name="quotationDate"
            rules={[{ required: true, message: 'Required' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Valid Until"
            name="validUntil"
            rules={[{ required: true, message: 'Required' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            label="Client Name"
            name="clientName"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Company Name" name="clientCompany">
            <Input />
          </Form.Item>

          <Form.Item label="Client Email" name="clientEmail">
            <Input />
          </Form.Item>

          <Form.Item label="Client Phone" name="clientPhone">
            <Input />
          </Form.Item>

          <Form.Item label="Project Name" name="projectName">
            <Input />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select>
              <Option value="Draft">Draft</Option>
              <Option value="Sent">Sent</Option>
              <Option value="Reviewed">Reviewed</Option>
              <Option value="Accepted">Accepted</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item label="Client Address" name="clientAddress">
          <TextArea rows={2} />
        </Form.Item>

        <div style={{ marginTop: '24px', marginBottom: '16px' }}>
          <h4>Services / Items</h4>
        </div>

        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          rowKey="id"
          size="small"
          scroll={{ x: 'max-content' }}
        />

        <Button
          type="dashed"
          onClick={addItem}
          icon={<PlusOutlined />}
          style={{ width: '100%', marginTop: '8px' }}
        >
          Add Service
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

        <Form.Item label="Terms & Conditions" name="terms" style={{ marginTop: '16px' }}>
          <TextArea
            rows={4}
            placeholder="Enter terms and conditions for this quotation..."
          />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <TextArea rows={2} placeholder="Additional notes..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default QuotationGenerator;

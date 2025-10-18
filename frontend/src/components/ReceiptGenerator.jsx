import React from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, InputNumber, message } from 'antd';
import { FilePdfOutlined, PrinterOutlined } from '@ant-design/icons';
import jsPDF from 'jspdf';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const ReceiptGenerator = ({ visible, onClose, order }) => {
  const [form] = Form.useForm();

  const generateReceiptPDF = (action = 'download') => {
    form.validateFields().then(values => {
      const doc = new jsPDF();

      // Header with company branding
      doc.setFillColor(230, 57, 70);
      doc.rect(0, 0, 210, 35, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont(undefined, 'bold');
      doc.text('GOLDEN ERRANDS', 105, 15, { align: 'center' });
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('We Deliver with Passion!', 105, 22, { align: 'center' });
      doc.text('0256039212 | 0256039213 | 0256039214', 105, 28, { align: 'center' });

      // Receipt title
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.text('PAYMENT RECEIPT', 105, 50, { align: 'center' });

      // Receipt details box
      doc.setDrawColor(230, 57, 70);
      doc.setLineWidth(0.5);
      doc.rect(15, 60, 180, 40);

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Receipt #:', 20, 70);
      doc.setFont(undefined, 'normal');
      doc.text(values.receiptNumber, 55, 70);

      doc.setFont(undefined, 'bold');
      doc.text('Date:', 20, 78);
      doc.setFont(undefined, 'normal');
      doc.text(dayjs(values.receiptDate).format('MMMM DD, YYYY'), 55, 78);

      doc.setFont(undefined, 'bold');
      doc.text('Payment Method:', 20, 86);
      doc.setFont(undefined, 'normal');
      doc.text(values.paymentMethod, 55, 86);

      doc.setFont(undefined, 'bold');
      doc.text('Reference:', 20, 94);
      doc.setFont(undefined, 'normal');
      doc.text(values.transactionReference || 'N/A', 55, 94);

      // Customer information
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('RECEIVED FROM:', 15, 115);

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      doc.text(values.customerName, 15, 123);
      if (values.customerPhone) {
        doc.text(`Phone: ${values.customerPhone}`, 15, 130);
      }
      if (values.customerEmail) {
        doc.text(`Email: ${values.customerEmail}`, 15, 137);
      }

      // Payment details
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('PAYMENT DETAILS:', 15, 155);

      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      const descLines = doc.splitTextToSize(values.description, 170);
      doc.text(descLines, 15, 163);

      // Amount section with gold background
      const amountY = 163 + (descLines.length * 6) + 15;
      doc.setFillColor(255, 183, 3); // Gold
      doc.rect(15, amountY - 8, 180, 25, 'F');

      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('AMOUNT RECEIVED:', 20, amountY);
      
      doc.setFontSize(18);
      doc.setTextColor(230, 57, 70); // Red
      doc.text(`GHS ${parseFloat(values.amount).toFixed(2)}`, 175, amountY + 8, { align: 'right' });

      // Amount in words
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont(undefined, 'italic');
      const amountInWords = numberToWords(values.amount);
      doc.text(`(${amountInWords} Ghana Cedis)`, 20, amountY + 8);

      // Notes section
      if (values.notes) {
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        doc.text('Notes:', 15, amountY + 25);
        doc.setFont(undefined, 'normal');
        const notesLines = doc.splitTextToSize(values.notes, 170);
        doc.text(notesLines, 15, amountY + 32);
      }

      // Signature section
      const sigY = 240;
      doc.setDrawColor(200, 200, 200);
      doc.line(15, sigY, 85, sigY);
      doc.line(125, sigY, 195, sigY);

      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text('Authorized Signature', 15, sigY + 5);
      doc.text('Customer Signature', 125, sigY + 5);

      // Footer
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 270, 210, 27, 'F');
      
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('This is a computer-generated receipt and is valid without signature.', 105, 278, { align: 'center' });
      doc.text('Golden Errands Ltd. | Liberation Road, Accra | info@goldenerrands.com', 105, 283, { align: 'center' });
      doc.text('Thank you for your business!', 105, 288, { align: 'center' });

      if (action === 'download') {
        doc.save(`Receipt_${values.receiptNumber}.pdf`);
        message.success('Receipt downloaded successfully!');
      } else if (action === 'print') {
        doc.autoPrint();
        window.open(doc.output('bloburl'), '_blank');
        message.success('Receipt ready for printing!');
      }
    }).catch(err => {
      message.error('Please fill in all required fields');
    });
  };

  // Helper function to convert number to words
  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    const convertHundreds = (n) => {
      if (n === 0) return '';
      if (n < 10) return ones[n];
      if (n >= 10 && n < 20) return teens[n - 10];
      if (n >= 20 && n < 100) {
        return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
      }
      return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertHundreds(n % 100) : '');
    };

    const integer = Math.floor(num);
    const decimal = Math.round((num - integer) * 100);

    let result = convertHundreds(integer);
    if (decimal > 0) {
      result += ' and ' + decimal + '/100';
    }
    return result || 'Zero';
  };

  return (
    <Modal
      title="Generate Receipt"
      open={visible}
      onCancel={onClose}
      width={700}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="print"
          icon={<PrinterOutlined />}
          onClick={() => generateReceiptPDF('print')}
        >
          Print
        </Button>,
        <Button
          key="download"
          type="primary"
          icon={<FilePdfOutlined />}
          onClick={() => generateReceiptPDF('download')}
        >
          Download PDF
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          receiptNumber: `RCP-${Date.now()}`,
          receiptDate: dayjs(),
          paymentMethod: 'Cash'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            label="Receipt Number"
            name="receiptNumber"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Receipt Date"
            name="receiptDate"
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

          <Form.Item label="Customer Phone" name="customerPhone">
            <Input />
          </Form.Item>
        </div>

        <Form.Item label="Customer Email" name="customerEmail">
          <Input />
        </Form.Item>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Select>
              <Option value="Cash">Cash</Option>
              <Option value="Mobile Money">Mobile Money</Option>
              <Option value="Bank Transfer">Bank Transfer</Option>
              <Option value="Credit Card">Credit Card</Option>
              <Option value="Debit Card">Debit Card</Option>
              <Option value="Cheque">Cheque</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Amount (GHS)"
            name="amount"
            rules={[{ required: true, message: 'Required' }]}
          >
            <InputNumber
              min={0}
              step={0.01}
              precision={2}
              style={{ width: '100%' }}
              prefix="GHS"
            />
          </Form.Item>
        </div>

        <Form.Item label="Transaction Reference" name="transactionReference">
          <Input placeholder="e.g., Mobile Money transaction ID" />
        </Form.Item>

        <Form.Item
          label="Payment Description"
          name="description"
          rules={[{ required: true, message: 'Required' }]}
        >
          <TextArea
            rows={3}
            placeholder="e.g., Payment for delivery service, Order #12345"
          />
        </Form.Item>

        <Form.Item label="Additional Notes" name="notes">
          <TextArea rows={2} placeholder="Optional notes..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReceiptGenerator;

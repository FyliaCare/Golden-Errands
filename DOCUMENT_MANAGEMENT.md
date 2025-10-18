# 📄 Document Management System

## Overview
The Golden Errands Delivery Management System includes a comprehensive document management module for generating professional invoices, receipts, and quotations with PDF export and printing capabilities.

## Features

### 🧾 Invoice Generation
- **Professional PDF Invoices** with company branding
- **Itemized billing** with quantities, rates, and amounts
- **Automatic calculations** for subtotal, tax, discount, and total
- **Customizable fields**: Invoice number, dates, customer info, payment terms
- **Tax & Discount support** with percentage-based calculations
- **Notes & Terms** section for additional information
- **Multiple export options**: Download PDF or Print directly

### 📜 Receipt Generation
- **Payment receipts** for all transactions
- **Multiple payment methods**: Cash, Mobile Money, Bank Transfer, Credit/Debit Card, Cheque
- **Transaction reference** tracking
- **Amount in words** conversion (e.g., "Two Thousand Five Hundred Ghana Cedis")
- **Digital signatures** section
- **Professional formatting** with Golden Errands branding
- **Auto-numbering** system (RCP-YYYYMMDD-XXX)

### 💼 Quotation Creation
- **Service-based quotations** with 9 predefined delivery types
- **Detailed descriptions** for each service
- **Project tracking** with project name and status fields
- **Validity period** management
- **Status workflow**: Draft → Sent → Reviewed → Accepted/Rejected
- **Comprehensive terms & conditions** section
- **Client information** with company details
- **Professional presentation** with color-coded sections

### 📊 Document Management Dashboard
- **Centralized document hub** for all invoices, receipts, and quotations
- **Tabbed interface** for easy navigation
- **Quick statistics**:
  - Total Invoiced Amount
  - Total Received Payments
  - Total Quoted Amount
  - Pending Invoices Count
- **Advanced filtering**:
  - Search by number, customer, or amount
  - Filter by status (Paid, Pending, Overdue, etc.)
  - Date range filtering
- **Excel export** functionality for reports
- **Action buttons** for View, PDF, Print, Edit, Delete

## Components

### 1. InvoiceGenerator Component
**Location**: `frontend/src/components/InvoiceGenerator.jsx`

**Key Features**:
- Dynamic item addition/removal
- Real-time amount calculations
- Tax and discount support (12.5% default tax rate)
- Customer information fields
- Payment terms selection (Net 7/15/30/60)
- Notes and custom terms

**Usage**:
```jsx
import InvoiceGenerator from '../components/InvoiceGenerator';

<InvoiceGenerator
  visible={showInvoiceModal}
  onClose={() => setShowInvoiceModal(false)}
  order={selectedOrder}
/>
```

**PDF Structure**:
- Header: Company logo, name, contact info
- Invoice details: Number, date, due date
- Bill To & From sections
- Itemized table with descriptions, quantities, rates, amounts
- Totals section: Subtotal, Discount, Tax, Grand Total
- Notes and Payment Terms
- Professional footer

### 2. ReceiptGenerator Component
**Location**: `frontend/src/components/ReceiptGenerator.jsx`

**Key Features**:
- Payment method selection (6 options)
- Transaction reference tracking
- Customer details capture
- Amount-to-words conversion
- Signature sections (authorized & customer)
- Auto-generated receipt numbers

**Usage**:
```jsx
import ReceiptGenerator from '../components/ReceiptGenerator';

<ReceiptGenerator
  visible={showReceiptModal}
  onClose={() => setShowReceiptModal(false)}
  order={selectedOrder}
/>
```

**PDF Structure**:
- Golden Errands header branding
- Receipt number, date, payment method, reference
- Customer information
- Payment description
- Amount section with gold background
- Amount in words
- Signature lines
- Legal footer text

### 3. QuotationGenerator Component
**Location**: `frontend/src/components/QuotationGenerator.jsx`

**Key Features**:
- 9 predefined service types
- Multi-service quotations
- Project name and status tracking
- Validity period management
- Terms & conditions editor
- Tax and discount calculations

**Usage**:
```jsx
import QuotationGenerator from '../components/QuotationGenerator';

<QuotationGenerator
  visible={showQuotationModal}
  onClose={() => setShowQuotationModal(false)}
/>
```

**Service Types**:
1. Food Delivery
2. Parcel Delivery
3. Grocery Delivery
4. Pharmaceutical Delivery
5. Bus Station Pickup
6. Online Shopping Delivery
7. Personal Errands
8. Corporate Solutions
9. Custom Service

**PDF Structure**:
- Red header with company branding
- Gold quotation badge
- Client information section (gray background)
- Quotation details box
- Service/items table with descriptions
- Totals with gold background for grand total
- Terms & conditions section
- Professional footer with CTA

### 4. Documents Page
**Location**: `frontend/src/pages/Documents.jsx`

**Key Features**:
- Three tabs: Invoices, Receipts, Quotations
- Statistics cards for each document type
- Advanced search and filtering
- Excel export for each tab
- Bulk operations support
- Responsive table views

**Usage**:
Navigate to `/documents` in the application or click "Documents" in the sidebar menu.

## Integration with Dashboard

The Dashboard now includes three quick-access buttons in the header:
1. **New Quotation** (Primary button - Red)
2. **New Invoice** (Secondary button)
3. **New Receipt** (Secondary button)

These buttons open the respective document generation modals for quick access.

## PDF Generation Technology

**Library**: jsPDF + jsPDF-AutoTable
**Features**:
- High-quality PDF rendering
- Custom fonts and colors
- Automatic table pagination
- Professional layouts
- Print-optimized formatting

## Excel Export Technology

**Library**: XLSX (SheetJS)
**Features**:
- Export to .xlsx format
- Automatic date formatting
- Column headers included
- Filename with current date

## Branding & Design

All documents maintain consistent Golden Errands branding:
- **Primary Color**: Red (#E63946)
- **Accent Color**: Gold (#FFB703)
- **Contact**: 0256039212 | 0256039213 | 0256039214
- **Email**: info@goldenerrands.com
- **Address**: Liberation Road, Accra
- **Tagline**: "We Deliver with Passion!"

## Document Numbering System

### Invoices
Format: `INV-{timestamp}`
Example: `INV-1729267890123`

### Receipts
Format: `RCP-{timestamp}`
Example: `RCP-1729267890456`

### Quotations
Format: `QUO-{timestamp}`
Example: `QUO-1729267890789`

## Workflow Examples

### Creating an Invoice
1. Click "New Invoice" button in Dashboard or Documents page
2. Fill in customer details (name, email, phone, address)
3. Set invoice number, date, and due date
4. Add line items with descriptions, quantities, and rates
5. Set tax rate (default 12.5%) and discount if applicable
6. Add payment terms and notes
7. Preview totals in the summary section
8. Click "Download PDF" or "Print"

### Generating a Receipt
1. Click "New Receipt" button
2. Enter receipt number and date
3. Fill customer information
4. Select payment method
5. Enter transaction reference (if applicable)
6. Input amount and description
7. Add optional notes
8. Download or print receipt

### Creating a Quotation
1. Click "New Quotation" button
2. Set quotation number, date, and validity period
3. Enter client details and project name
4. Add services with descriptions and pricing
5. Configure tax and discount rates
6. Write terms & conditions
7. Set status (Draft, Sent, etc.)
8. Generate PDF for client

## API Integration (Future Enhancement)

The document management system is ready for backend integration:

### Endpoints to Implement
```javascript
POST   /api/invoices          - Create invoice
GET    /api/invoices          - List all invoices
GET    /api/invoices/:id      - Get single invoice
PUT    /api/invoices/:id      - Update invoice
DELETE /api/invoices/:id      - Delete invoice

POST   /api/receipts          - Create receipt
GET    /api/receipts          - List all receipts
GET    /api/receipts/:id      - Get single receipt

POST   /api/quotations        - Create quotation
GET    /api/quotations        - List all quotations
GET    /api/quotations/:id    - Get single quotation
PUT    /api/quotations/:id    - Update quotation
PATCH  /api/quotations/:id/status - Update status
```

### Database Schema (Recommended)

```sql
-- Invoices Table
CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  invoice_date DATE NOT NULL,
  due_date DATE,
  customer_name VARCHAR(200) NOT NULL,
  customer_email VARCHAR(200),
  customer_phone VARCHAR(50),
  customer_address TEXT,
  subtotal DECIMAL(10,2) NOT NULL,
  discount_rate DECIMAL(5,2) DEFAULT 0,
  tax_rate DECIMAL(5,2) DEFAULT 12.5,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending',
  payment_terms VARCHAR(50),
  notes TEXT,
  items JSONB, -- Array of line items
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Receipts Table
CREATE TABLE receipts (
  id SERIAL PRIMARY KEY,
  receipt_number VARCHAR(50) UNIQUE NOT NULL,
  receipt_date DATE NOT NULL,
  customer_name VARCHAR(200) NOT NULL,
  customer_email VARCHAR(200),
  customer_phone VARCHAR(50),
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  transaction_reference VARCHAR(100),
  description TEXT NOT NULL,
  notes TEXT,
  invoice_id INTEGER REFERENCES invoices(id),
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quotations Table
CREATE TABLE quotations (
  id SERIAL PRIMARY KEY,
  quotation_number VARCHAR(50) UNIQUE NOT NULL,
  quotation_date DATE NOT NULL,
  valid_until DATE NOT NULL,
  client_name VARCHAR(200) NOT NULL,
  client_company VARCHAR(200),
  client_email VARCHAR(200),
  client_phone VARCHAR(50),
  client_address TEXT,
  project_name VARCHAR(200),
  subtotal DECIMAL(10,2) NOT NULL,
  discount_rate DECIMAL(5,2) DEFAULT 0,
  tax_rate DECIMAL(5,2) DEFAULT 12.5,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'Draft',
  items JSONB, -- Array of services
  terms TEXT,
  notes TEXT,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Testing

### Manual Testing Checklist
- [ ] Generate invoice with multiple line items
- [ ] Test tax calculation (12.5% default)
- [ ] Test discount calculation
- [ ] Verify PDF download works
- [ ] Test print functionality
- [ ] Generate receipt with all payment methods
- [ ] Verify amount-to-words conversion
- [ ] Create quotation with all service types
- [ ] Test Excel export for each document type
- [ ] Verify search and filtering in Documents page
- [ ] Test responsive design on mobile

### Sample Test Data

**Test Invoice**:
- Customer: "Kwame Mensah"
- Items: 
  - Food Delivery (Qty: 5, Rate: 200) = 1000
  - Parcel Delivery (Qty: 3, Rate: 150) = 450
- Subtotal: 1450
- Tax (12.5%): 181.25
- Total: 1631.25

**Test Receipt**:
- Customer: "Ama Asante"
- Amount: 1631.25
- Method: Mobile Money
- Reference: MM-20250118-12345

**Test Quotation**:
- Client: "Ghana Tech Ltd"
- Services:
  - Corporate Solutions (Monthly contract) = 5000
  - Custom Service (API integration) = 3000
- Total: 8000 (before tax/discount)

## Troubleshooting

### PDF Not Downloading
- Check browser permissions for downloads
- Verify jsPDF and jsPDF-autotable are installed
- Check console for JavaScript errors

### Calculations Incorrect
- Verify tax_rate and discount_rate are between 0-100
- Check that item quantities and rates are positive numbers
- Ensure all required fields are filled

### Excel Export Fails
- Confirm XLSX library is installed
- Check data format (should be array of objects)
- Verify browser supports Blob downloads

### Print Preview Blank
- Ensure PDF generation completes before print
- Check for popup blockers
- Try using "Download PDF" then print from PDF viewer

## Dependencies

```json
{
  "jspdf": "latest",
  "jspdf-autotable": "latest",
  "xlsx": "latest",
  "dayjs": "latest",
  "antd": "^5.27.5",
  "react": "^18.0.0"
}
```

## License & Credits

- **jsPDF**: MIT License - https://github.com/parallax/jsPDF
- **SheetJS**: Apache 2.0 - https://sheetjs.com/
- **Ant Design**: MIT License - https://ant.design/
- **Golden Errands**: Proprietary - © 2025 Golden Errands Ltd.

## Support

For technical support or feature requests:
- Email: dev@goldenerrands.com
- Phone: 0256039212
- Documentation: Check README.md files in component directories

---

**Last Updated**: October 18, 2025
**Version**: 1.0.0
**Status**: Production Ready ✅

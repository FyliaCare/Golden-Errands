# Golden Errands - Delivery Management System

![Golden Errands](https://img.shields.io/badge/Golden-Errands-red?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## 🚀 About

**Golden Errands** - *"We deliver with passion!"*

A comprehensive, production-ready Delivery Management System designed for modern delivery operations in Ghana and beyond. Built with TypeScript, PostgreSQL, React, and modern web technologies.

### 🎯 Services Offered

- 🍕 **Food Delivery** - Hot meals, fast delivery
- 📦 **Parcel Delivery** - Safe and secure package delivery
- 🛒 **Grocery Errands** - Shop and deliver groceries
- 💊 **Pharmaceutical Deliveries** - Prescription and medical supplies
- 🚌 **Bus Station Pickups** - Intercity package collection
- 🛍️ **Online Shops Delivery** - E-commerce fulfillment
- 📋 **Personal Errands** - Custom delivery requests
- ✨ **And many more...**

### ✨ Key Features

- ✅ **Multi-Role Access Control** - Admin, Dispatch Manager, Driver, Customer, Finance
- 📦 **Advanced Order Management** - Create, track, and manage deliveries
- 🗺️ **Real-Time GPS Tracking** - Live driver location and route optimization
- 💰 **Payment Integration** - Paystack, Stripe, Cash on Delivery, Mobile Money
- 📱 **Driver Mobile App** - Responsive interface for drivers
- 📊 **Analytics Dashboard** - Comprehensive reports and insights
- 🔔 **Real-Time Notifications** - SMS, Email, Push notifications
- 🔐 **Security First** - JWT authentication, rate limiting, audit logs
- 📝 **Proof of Delivery** - Photo, signature, QR code verification
- 🌍 **Route Optimization** - Efficient multi-drop planning
- 📧 **Communication System** - In-app messaging and notifications

## 📋 Tech Stack

### Backend
- **TypeScript** - Type-safe JavaScript
- **Node.js & Express** - Server framework
- **PostgreSQL** - Production database
- **Prisma ORM** - Type-safe database client
- **JWT** - Secure authentication with refresh tokens
- **Socket.io** - Real-time communication
- **Winston** - Advanced logging
- **Helmet** - Security headers
- **Rate Limiting** - API protection

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe frontend
- **Vite** - Lightning-fast build tool
- **React Router** - Navigation
- **Ant Design / Material-UI** - Beautiful UI components
- **Google Maps API** - Maps and geolocation
- **Axios** - HTTP client

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn package manager
- Git

### 1. Backend Setup

```powershell
cd backend

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

# Configure your database in .env
# DATABASE_URL="postgresql://user:password@localhost:5432/golden_errands"
```

### 2. Database Setup

```powershell
# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database with initial data
npm run prisma:seed
```

### 3. Start Backend Server

```powershell
# Development mode (with hot reload)
npm run dev

# Production build
npm run build
npm start
```

Backend will run on `http://localhost:4000`

### 4. Frontend Setup

Open a new terminal:

```powershell
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📝 Default Login Credentials

After seeding the database:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@goldenerrands.com | admin@2024 |
| **Dispatch Manager** | dispatch@goldenerrands.com | dispatch@2024 |
| **Driver 1** | kwame.rider@goldenerrands.com | driver@2024 |
| **Driver 2** | ama.delivery@goldenerrands.com | driver@2024 |
| **Customer** | customer@example.com | customer@2024 |
| **Finance** | finance@goldenerrands.com | finance@2024 |

## 📚 API Documentation

### Authentication

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phoneNumber": "0244123456",
  "role": "CUSTOMER"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@goldenerrands.com",
  "password": "admin@2024"
}
```

### Orders

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "pickupAddress": "Accra Mall, Accra",
  "deliveryAddress": "East Legon, Accra",
  "deliveryType": "PARCEL_DELIVERY",
  "packageSize": "MEDIUM",
  "recipientPhone": "0244123456"
}
```

## 🎨 User Roles & Permissions

### 👨‍💼 Admin
- Full system access
- User management
- System configuration
- View all analytics and reports
- Manage delivery zones and pricing

### 📋 Dispatch Manager
- Manage all orders
- Assign drivers to deliveries
- View and optimize routes
- Monitor real-time deliveries
- Handle reassignments

### 🏍️ Driver
- View assigned deliveries
- Update delivery status
- Upload proof of delivery
- Update GPS location
- Communicate with customers

### 👤 Customer
- Create delivery orders
- Track deliveries in real-time
- View order history
- Make payments
- Rate drivers

### 💰 Finance
- View all payments
- Generate financial reports
- Reconciliation dashboard
- Invoice management
- Commission tracking

## 📊 Database Schema

Main entities:

- **Users** - All system users with role-based access
- **DriverProfile** - Driver-specific information and status
- **Orders** - Delivery order records
- **Deliveries** - Active delivery tracking
- **Vehicles** - Driver vehicle information
- **Payments** - Payment transactions and invoices
- **DeliveryZones** - Service areas with pricing
- **Notifications** - Real-time user notifications
- **Messages** - In-app messaging
- **AuditLog** - Complete activity audit trail
- **TrackingHistory** - Order status history

## 📱 Contact Golden Errands

**Head Office**
- 📞 **Phone**: 0256039212 / 0256039213 / 0256039214
- 📧 **Email**: info@goldenerrands.com
- 🌐 **Website**: www.goldenerrands.com
- 📍 **Location**: Accra, Ghana

## 🔐 Security Features

- JWT access & refresh tokens
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Helmet.js security headers
- Input validation & sanitization
- Audit logging
- Role-based access control (RBAC)

## 🚀 Deployment

See deployment guides in `/docs` folder for:
- Docker deployment
- AWS deployment
- Heroku deployment
- DigitalOcean deployment

## 📄 License

Proprietary - © 2024 Golden Errands. All rights reserved.

---

**Built with ❤️ by Golden Errands Development Team**

*"QUICKER DELIVERY - NOT CHEAP BUT VALUE FOR YOUR MONEY - MOST RELIABLE DISPATCH RIDERS - EXCELLENT COMMUNICATION - YET, SIMPLE TO USE US"*

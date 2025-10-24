# 🚀 Taadiway - Advanced Delivery Management Platform# 🚀 Taadiway - Advanced Delivery Management Platform# 🚀 Taadiway - Advanced Delivery Management Platform



**"We deliver with passion!"**



A comprehensive, full-stack delivery management system built with Next.js 15, TypeScript, Prisma, and Ant Design.**"We deliver with passion!"****"We deliver with passion!"**



---



## ✨ FeaturesA comprehensive, full-stack delivery management system built with Next.js 15, TypeScript, Prisma, and Ant Design.A comprehensive, full-stack delivery management system built with Next.js 15, TypeScript, Prisma, and Ant Design. Taadiway is a 3-way platform connecting clients, drivers, and administrators for seamless delivery operations in Takoradi, Ghana.



### 🎯 **3-Way Platform**

- **Clients:** Order tracking, multiple delivery types, business accounts

- **Drivers:** Live orders, GPS routing, earnings tracking, performance dashboard---A modern, full-stack delivery management platform built with Next.js 15, TypeScript, Prisma, and PostgreSQL.

- **Admins:** Advanced analytics, live tracking, user/order/driver management



---

## ✨ Features## Tech Stack

## 🛠️ Tech Stack



- **Next.js 15.5.6** - React framework with App Router

- **TypeScript 5** - Type safety### 🎯 **3-Way Platform**- **Frontend:** Next.js 15 (App Router), React, TypeScript, Ant Design

- **Prisma ORM 5.22** - Database management

- **Ant Design 5.22** - UI components- **Clients:** Order tracking, multiple delivery types, business accounts- **Backend:** Next.js API Routes

- **JWT Authentication** - Secure auth with jose

- **SQLite/PostgreSQL** - Database (SQLite dev, PostgreSQL production)- **Drivers:** Live orders, GPS routing, earnings tracking, performance dashboard- **Database:** PostgreSQL (Vercel Postgres / Neon)

- **Web Vitals** - Performance monitoring

- **Admins:** Advanced analytics, live tracking, user/order/driver management- **ORM:** Prisma

---

- **Auth:** JWT (jose)

## 🚀 Quick Start

---- **Deployment:** Vercel (Free Forever!)

```bash

# Install dependencies

npm install

## 🛠️ Tech Stack## Features

# Setup environment

cp .env.example .env.local



# Initialize database- **Next.js 15.5.6** - React framework- 🚀 Customer order placement

npx prisma generate

npx prisma db push- **TypeScript 5** - Type safety- 🚚 Driver management

npm run prisma:seed

- **Prisma ORM** - Database management- 📦 Order tracking

# Start development

npm run dev- **Ant Design 5.22.6** - UI components- 📄 Document generation (invoices, receipts, quotations)

```

- **JWT Authentication** - Secure auth- 🔐 JWT authentication

Visit `http://localhost:3000` 🎉

- **SQLite/PostgreSQL** - Database- 🗺️ Google Maps integration

---



## 🔐 Test Credentials

---## Getting Started

**Admin:** admin@taadiway.com / Admin@123456  

**Driver:** driver@taadiway.com / Driver@123  

**Client:** client@taadiway.com / Client@123

## 🚀 Quick Start### Prerequisites

---

- Node.js 18+

## 📁 Project Structure

```bash- PostgreSQL database

```

app/# Install dependencies

├── admin/dashboard/     # Admin control center

├── admin/tracking/      # Live driver trackingnpm install### Installation

├── driver/dashboard/    # Driver interface

├── dashboard/           # Client dashboard

└── api/                # Backend API routes

# Setup environment1. Clone the repository

components/             # Reusable components

contexts/              # React contextscp .env.example .env.local2. Install dependencies:

lib/                   # Utilities & helpers

prisma/               # Database schema & seeds```bash

```

# Initialize databasenpm install

---

npx prisma generate```

## 🎨 Key Features

npx prisma db push

### Admin Dashboard (`/admin/dashboard`)

- Real-time statistics (revenue, orders, drivers)npm run prisma:seed3. Set up environment variables (`.env.local`):

- Recent orders table

- Top performing drivers```env

- Activity feed

- Quick actions panel# Start developmentDATABASE_URL="your-postgresql-connection-string"



### Live Tracking (`/admin/tracking`)npm run devJWT_SECRET="your-jwt-secret"

- Real-time driver locations

- Status monitoring (Online/Busy/Offline)```JWT_REFRESH_SECRET="your-jwt-refresh-secret"

- Driver details with metrics

- Map visualization (Google Maps ready)NODE_ENV="development"

- Auto-refresh every 5 seconds

Visit `http://localhost:3000` 🎉```

---



## 🌐 API Endpoints

---4. Run database migrations:

### Authentication

- `POST /api/auth/login` - User login```bash

- `POST /api/auth/register-*` - Registration (admin/driver/client)

- `POST /api/auth/logout` - Logout## 🔐 Test Credentialsnpx prisma migrate dev

- `GET /api/auth/profile` - Get profile

npx prisma db seed

### Orders

- `GET /api/orders` - List orders**Admin:** admin@taadiway.com / Admin@123456  ```

- `POST /api/orders` - Create order

- `GET /api/orders/:id` - Order details**Driver:** driver@taadiway.com / Driver@123  



---**Client:** client@taadiway.com / Client@1235. Start the development server:



## 🔧 Scripts```bash



```bash---npm run dev

npm run dev              # Development server

npm run dev:turbo        # Dev with Turbopack (faster)```

npm run build            # Production build

npm run build:analyze    # Build + bundle analysis## 📁 Project Structure

npm run lint             # Code linting

npm run optimize         # Full optimization checkOpen [http://localhost:3000](http://localhost:3000) to view the app.

npx prisma studio        # Database GUI

``````



---app/## Database Schema



## ⚡ Performance├── admin/dashboard/     # Admin control center



Fully optimized for speed and efficiency:├── admin/tracking/      # Live driver tracking15 Prisma models including:

- **Bundle size** < 1.5 MB (50% reduction)

- **Image optimization** - WebP/AVIF format├── driver/dashboard/    # Driver interface- User, Customer, Driver

- **Code splitting** - Lazy loading heavy components

- **API caching** - In-memory cache with ETag├── dashboard/           # Client dashboard- Order, OrderItem, OrderTracking

- **Data fetching** - Request deduplication & SWR

- **Core Web Vitals** - Real-time monitoring└── api/                # Backend API routes- Payment, Invoice, Receipt, Quotation



📖 **Documentation:**- Vehicle, Route, and more

- [PERFORMANCE.md](./PERFORMANCE.md) - Comprehensive guide

- [OPTIMIZATION_SUMMARY.md](./OPTIMIZATION_SUMMARY.md) - What was donecomponents/             # Reusable components

- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Quick tips

contexts/              # React contexts## Deployment

---

lib/                   # Utilities & helpers

## 📱 Responsive Design

prisma/               # Database schema & seeds### Render (Primary - RECOMMENDED ✅)

Optimized for:

- 📱 Mobile (320px+)```**See [QUICK_START_RENDER.md](./QUICK_START_RENDER.md) for 10-minute deployment**

- 📲 Tablet (768px+)

- 💻 Desktop (1024px+)

- 🖥️ Large screens (1920px+)

---**Why Render:**

---

- ✅ More reliable than Vercel (no random deployment failures)

## 🎯 Coming Soon

## 🎨 Key Features- ✅ FREE Forever (750 hours/month + free PostgreSQL)

- Google Maps integration

- WebSocket real-time updates- ✅ Zero configuration - auto-detects Next.js

- Payment gateways (Paystack, Mobile Money)

- SMS & Email notifications### Admin Dashboard (`/admin/dashboard`)- ✅ Includes free database (Vercel charges for Postgres)

- Advanced analytics

- Real-time statistics (revenue, orders, drivers)- ✅ Better for full-stack Next.js apps

---

- Recent orders table- ✅ Simple, straightforward deployment

## 📞 Contact

- Top performing drivers

**Email:** taadiway@gmail.com  

**Phone:** 0559 220 442  - Activity feedQuick steps:

**Location:** Takoradi, Ghana 🇬🇭

- Quick actions panel1. Sign up: https://render.com/

---

2. Create PostgreSQL database (free, 1-click)

**Made with 💪 in Ghana**

### Live Tracking (`/admin/tracking`)3. Create web service from GitHub

Happy Delivering! 🚀

- Real-time driver locations4. Add environment variables

- Status monitoring (Online/Busy/Offline)5. Deploy! (automatic from GitHub)

- Driver details with metrics

- Map visualization (Google Maps ready)**Free tier includes:**

- Auto-refresh every 5 seconds- 750 hours/month (31 days continuous)

- Free PostgreSQL database (1GB, renewable)

---- 512MB RAM

- 100GB bandwidth/month

## 🌐 API Endpoints- Custom domains with SSL

- Automatic deployments

### Authentication

- `POST /api/auth/login` - User login### Vercel (Alternative)

- `POST /api/auth/register-*` - Registration (admin/driver/client)**See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed guide**

- `POST /api/auth/logout` - Logout

- `GET /api/auth/profile` - Get profile**Note:** Vercel works great for static sites but can have issues with full-stack Next.js apps. If Vercel deployment fails, use Render instead.



### OrdersQuick steps:

- `GET /api/orders` - List orders1. Push code to GitHub

- `POST /api/orders` - Create order2. Import project on Vercel: https://vercel.com/new

- `GET /api/orders/:id` - Order details3. Add environment variables (DATABASE_URL, JWT secrets)

4. Deploy! (automatic from GitHub)

---

**Free tier includes:**

## 🔧 Scripts- 100GB bandwidth/month

- Unlimited deployments

```bash- Automatic HTTPS

npm run dev              # Development server- Global CDN

npx prisma studio        # Database GUI

npm run build            # Production build**Features:**

npm run lint             # Code linting- ✅ Automatic deployments from GitHub

```- ✅ PostgreSQL database options (Render includes free, Vercel charges)

- ✅ Environment variables management

---- ✅ Custom domains with SSL

- ✅ Edge network for fast global delivery

## 📱 Responsive Design

## Project Structure

Optimized for:

- 📱 Mobile (320px+)```

- 📲 Tablet (768px+)taadiway-nextjs/

- 💻 Desktop (1024px+)├── app/              # Next.js pages & API routes

- 🖥️ Large screens (1920px+)├── components/       # React components

├── contexts/         # React contexts (Auth, etc.)

---├── lib/              # Utilities & Prisma client

├── prisma/           # Database schema & migrations

## 🎯 Coming Soon└── public/           # Static assets

```

- Google Maps integration
- WebSocket real-time updates
- Payment gateways (Paystack, Mobile Money)
- SMS & Email notifications
- Advanced analytics

---

## 📞 Contact

**Email:** taadiway@gmail.com  
**Phone:** 0559 220 442  
**Location:** Takoradi, Ghana 🇬🇭

---

**Made with 💪 in Ghana**

Happy Delivering! 🚀

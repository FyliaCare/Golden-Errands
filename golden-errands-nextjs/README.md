# Golden Errands - Delivery Platform

A modern, full-stack delivery management platform built with Next.js 15, TypeScript, Prisma, and PostgreSQL.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React, TypeScript, Ant Design
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Vercel Postgres / Neon)
- **ORM:** Prisma
- **Auth:** JWT (jose)
- **Deployment:** Vercel (Free Forever!)

## Features

- 🚀 Customer order placement
- 🚚 Driver management
- 📦 Order tracking
- 📄 Document generation (invoices, receipts, quotations)
- 🔐 JWT authentication
- 🗺️ Google Maps integration

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (`.env.local`):
```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-jwt-refresh-secret"
NODE_ENV="development"
```

4. Run database migrations:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Database Schema

15 Prisma models including:
- User, Customer, Driver
- Order, OrderItem, OrderTracking
- Payment, Invoice, Receipt, Quotation
- Vehicle, Route, and more

## Deployment

### Render (Primary - RECOMMENDED ✅)
**See [QUICK_START_RENDER.md](./QUICK_START_RENDER.md) for 10-minute deployment**

**Why Render:**
- ✅ More reliable than Vercel (no random deployment failures)
- ✅ FREE Forever (750 hours/month + free PostgreSQL)
- ✅ Zero configuration - auto-detects Next.js
- ✅ Includes free database (Vercel charges for Postgres)
- ✅ Better for full-stack Next.js apps
- ✅ Simple, straightforward deployment

Quick steps:
1. Sign up: https://render.com/
2. Create PostgreSQL database (free, 1-click)
3. Create web service from GitHub
4. Add environment variables
5. Deploy! (automatic from GitHub)

**Free tier includes:**
- 750 hours/month (31 days continuous)
- Free PostgreSQL database (1GB, renewable)
- 512MB RAM
- 100GB bandwidth/month
- Custom domains with SSL
- Automatic deployments

### Vercel (Alternative)
**See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed guide**

**Note:** Vercel works great for static sites but can have issues with full-stack Next.js apps. If Vercel deployment fails, use Render instead.

Quick steps:
1. Push code to GitHub
2. Import project on Vercel: https://vercel.com/new
3. Add environment variables (DATABASE_URL, JWT secrets)
4. Deploy! (automatic from GitHub)

**Free tier includes:**
- 100GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS
- Global CDN

**Features:**
- ✅ Automatic deployments from GitHub
- ✅ PostgreSQL database options (Render includes free, Vercel charges)
- ✅ Environment variables management
- ✅ Custom domains with SSL
- ✅ Edge network for fast global delivery

## Project Structure

```
golden-errands-nextjs/
├── app/              # Next.js pages & API routes
├── components/       # React components
├── contexts/         # React contexts (Auth, etc.)
├── lib/              # Utilities & Prisma client
├── prisma/           # Database schema & migrations
└── public/           # Static assets
```

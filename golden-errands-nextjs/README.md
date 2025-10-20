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

### Vercel (Primary - Recommended)
**See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed guide**

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
- Free PostgreSQL database (Vercel Postgres)

### Features:
- ✅ Automatic deployments from GitHub
- ✅ PostgreSQL database (Vercel Postgres or Neon)
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

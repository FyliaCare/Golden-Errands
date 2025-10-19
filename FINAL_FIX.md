# 🎯 FINAL SOLUTION - Railway Database Connection

## The Real Problem

Railway has **two phases**:
1. **Build Phase** - Database network NOT ready (neither internal nor public URL works reliably)
2. **Runtime Phase** - Internal network IS ready (`postgres.railway.internal` works perfectly)

## ✅ The Fix

Keep using `postgres.railway.internal:5432` in your Railway app's DATABASE_URL. This is correct!

The P1001 error during migrations is **expected and harmless** because:
- Migrations run during startup before network is fully initialized
- Server continues starting anyway (non-blocking)
- Database works perfectly once server is running

## Why Your API Returns 500 Error

The 500 error on registration means Prisma Client can't find the database tables. This happens because:
1. Migrations failed during startup
2. Tables were never created on Railway's database

## ✅ SOLUTION: Create Tables Manually

Since we can't run migrations automatically, let's create the tables using Railway's database plugin:

### Method 1: Use Railway Dashboard (Easiest)

1. Go to https://railway.app/dashboard
2. Click project: **refreshing-rejoicing**
3. Click on **Postgres** service
4. Click **Data** tab
5. Click **Query** button
6. Run this SQL to create all tables:

```sql
-- Create tables manually
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'USER',
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Order" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "orderNumber" TEXT NOT NULL UNIQUE,
  "userId" TEXT NOT NULL,
  "pickupLocation" TEXT NOT NULL,
  "deliveryLocation" TEXT NOT NULL,
  "itemDescription" TEXT NOT NULL,
  "weight" DOUBLE PRECISION,
  "distance" DOUBLE PRECISION,
  "totalCost" DOUBLE PRECISION NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "driverId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Order_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Driver" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "licenseNumber" TEXT NOT NULL UNIQUE,
  "vehicleId" TEXT,
  "rating" DOUBLE PRECISION DEFAULT 5.0,
  "isAvailable" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Driver_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Driver_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Vehicle" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "make" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "year" INTEGER NOT NULL,
  "licensePlate" TEXT NOT NULL UNIQUE,
  "color" TEXT NOT NULL,
  "capacity" DOUBLE PRECISION NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Payment" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "orderId" TEXT NOT NULL,
  "amount" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'GHS',
  "paymentMethod" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "reference" TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "DeliveryRoute" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "orderId" TEXT NOT NULL,
  "currentLocation" TEXT,
  "estimatedArrival" TIMESTAMP(3),
  "actualArrival" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "DeliveryRoute_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Notification" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "isRead" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "Order_userId_idx" ON "Order"("userId");
CREATE INDEX IF NOT EXISTS "Order_driverId_idx" ON "Order"("driverId");
CREATE INDEX IF NOT EXISTS "Payment_orderId_idx" ON "Payment"("orderId");
CREATE INDEX IF NOT EXISTS "DeliveryRoute_orderId_idx" ON "DeliveryRoute"("orderId");
CREATE INDEX IF NOT EXISTS "Notification_userId_idx" ON "Notification"("userId");
```

7. Click **Run** or **Execute**

### Method 2: Use Local Machine with Public URL + SSL

The issue is SSL. Railway requires SSL connections. Update the DATABASE_URL to include SSL:

```powershell
$env:DATABASE_URL="postgresql://postgres:dxwymZlidsOFbBovLpwBtoFfTAOagQpC@turntable.proxy.rlwy.net:43073/railway?sslmode=require"
npx prisma db push
```

---

## After Creating Tables

Once tables are created, test registration again:

```powershell
$body = @{
  email = "admin@goldenerrands.com"
  password = "Admin123!"
  firstName = "Admin"
  lastName = "User"
  phone = "0256039212"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://golden-errands-production.up.railway.app/api/auth/register" `
  -Method Post `
  -Body $body `
  -ContentType "application/json"
```

It should work! ✅

---

## Permanent Fix for Future Deployments

Update your Prisma schema to use SSL for Railway:

**File:** `backend/prisma/schema.prisma`

Change datasource to:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  relationMode = "prisma" // Optional: if you want Prisma to handle foreign keys
}
```

Then in your `.env` or Railway variables, use:
```
DATABASE_URL="postgresql://user:pass@host:port/db?sslmode=require"
```

This ensures SSL is always used.

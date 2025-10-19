-- Golden Errands Database Schema
-- Run this in Railway Dashboard → Postgres → Data → Query

-- Drop existing tables if needed (uncomment if recreating)
-- DROP TABLE IF EXISTS "Notification" CASCADE;
-- DROP TABLE IF EXISTS "DeliveryRoute" CASCADE;
-- DROP TABLE IF EXISTS "Payment" CASCADE;
-- DROP TABLE IF EXISTS "Order" CASCADE;
-- DROP TABLE IF EXISTS "Driver" CASCADE;
-- DROP TABLE IF EXISTS "Vehicle" CASCADE;
-- DROP TABLE IF NOT EXISTS "User" CASCADE;

-- Create User table
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
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Vehicle table
CREATE TABLE IF NOT EXISTS "Vehicle" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "make" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "year" INTEGER NOT NULL,
  "licensePlate" TEXT NOT NULL UNIQUE,
  "color" TEXT NOT NULL,
  "capacity" DOUBLE PRECISION NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create Driver table
CREATE TABLE IF NOT EXISTS "Driver" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL UNIQUE,
  "licenseNumber" TEXT NOT NULL UNIQUE,
  "vehicleId" TEXT,
  "rating" DOUBLE PRECISION DEFAULT 5.0,
  "isAvailable" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Driver_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Driver_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Create Order table
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
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Order_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Create Payment table
CREATE TABLE IF NOT EXISTS "Payment" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "orderId" TEXT NOT NULL,
  "amount" DOUBLE PRECISION NOT NULL,
  "currency" TEXT NOT NULL DEFAULT 'GHS',
  "paymentMethod" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "reference" TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create DeliveryRoute table
CREATE TABLE IF NOT EXISTS "DeliveryRoute" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "orderId" TEXT NOT NULL,
  "currentLocation" TEXT,
  "estimatedArrival" TIMESTAMP(3),
  "actualArrival" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "DeliveryRoute_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create Notification table
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "Order_userId_idx" ON "Order"("userId");
CREATE INDEX IF NOT EXISTS "Order_driverId_idx" ON "Order"("driverId");
CREATE INDEX IF NOT EXISTS "Order_status_idx" ON "Order"("status");
CREATE INDEX IF NOT EXISTS "Payment_orderId_idx" ON "Payment"("orderId");
CREATE INDEX IF NOT EXISTS "Payment_reference_idx" ON "Payment"("reference");
CREATE INDEX IF NOT EXISTS "DeliveryRoute_orderId_idx" ON "DeliveryRoute"("orderId");
CREATE INDEX IF NOT EXISTS "Notification_userId_idx" ON "Notification"("userId");
CREATE INDEX IF NOT EXISTS "Notification_isRead_idx" ON "Notification"("isRead");
CREATE INDEX IF NOT EXISTS "Driver_userId_idx" ON "Driver"("userId");
CREATE INDEX IF NOT EXISTS "Driver_isAvailable_idx" ON "Driver"("isAvailable");

-- Verify tables were created
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;

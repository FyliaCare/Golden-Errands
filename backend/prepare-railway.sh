#!/bin/bash
# Railway deployment preparation script

echo "🚀 Preparing for Railway deployment..."

# Switch to PostgreSQL schema for production
echo "📄 Switching to PostgreSQL schema..."
cp prisma/schema.prod.prisma prisma/schema.prisma

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🔨 Building application..."
npm run build

echo "✅ Railway deployment preparation complete!"
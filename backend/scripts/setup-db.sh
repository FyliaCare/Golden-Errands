#!/bin/bash
# Database setup script for Railway deployment

echo "🔄 Setting up database for Golden Errands..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Check if seeding is needed (only for fresh databases)
echo "🌱 Checking if database needs seeding..."
if [ "$SEED_DATABASE" = "true" ]; then
    echo "🌱 Seeding database with initial data..."
    npm run prisma:seed
fi

echo "✅ Database setup complete!"
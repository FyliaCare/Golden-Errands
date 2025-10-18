#!/bin/bash
# Setup script for local development

echo "🚀 Setting up Golden Errands for local development..."

# Navigate to backend
cd backend

echo "📦 Installing backend dependencies..."
npm install

echo "🗄️ Setting up database..."
npx prisma generate
npx prisma migrate dev --name init

echo "🌱 Seeding database with sample data..."
npm run prisma:seed

echo "✅ Backend setup complete!"
echo ""
echo "🎉 You can now run:"
echo "   npm run dev              # Start backend in development mode"
echo "   npm run start:backend    # Start backend in production mode"
echo ""

# Navigate to frontend
cd ../frontend

echo "📦 Installing frontend dependencies..."
npm install

echo "✅ Frontend setup complete!"
echo ""
echo "🎉 You can now run:"
echo "   npm run dev              # Start frontend in development mode"
echo ""
echo "🌐 URLs:"
echo "   Backend:  http://localhost:4000"
echo "   Frontend: http://localhost:5173"
echo "   API Docs: http://localhost:4000/api-docs"
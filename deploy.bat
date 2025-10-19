@echo off
REM Windows deployment script for Golden Errands API

echo 🚀 Starting deployment for Golden Errands API...

cd backend

echo 📦 Installing dependencies...
call npm ci
if %errorlevel% neq 0 exit /b %errorlevel%

echo 🔧 Generating Prisma client...
call npx prisma generate
if %errorlevel% neq 0 exit /b %errorlevel%

echo 🏗️ Building TypeScript...
call npm run build
if %errorlevel% neq 0 exit /b %errorlevel%

echo 🗄️ Running database migrations...
call npx prisma migrate deploy
if %errorlevel% neq 0 exit /b %errorlevel%

echo ✅ Deployment preparation complete!
echo 🌐 Starting server...
node dist/server.js
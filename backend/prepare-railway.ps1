# PowerShell Railway deployment preparation script

Write-Host "🚀 Preparing for Railway deployment..." -ForegroundColor Green

# Switch to PostgreSQL schema for production
Write-Host "📄 Switching to PostgreSQL schema..." -ForegroundColor Blue
Copy-Item "prisma\schema.prod.prisma" "prisma\schema.prisma" -Force

# Generate Prisma client
Write-Host "📦 Generating Prisma client..." -ForegroundColor Blue
npx prisma generate

# Build the application
Write-Host "🔨 Building application..." -ForegroundColor Blue
npm run build

Write-Host "✅ Railway deployment preparation complete!" -ForegroundColor Green
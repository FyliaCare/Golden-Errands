# PowerShell setup script for local development

Write-Host "🚀 Setting up Golden Errands for local development..." -ForegroundColor Green

# Navigate to backend
Set-Location backend

Write-Host "📦 Installing backend dependencies..." -ForegroundColor Blue
npm install

Write-Host "🗄️ Setting up database..." -ForegroundColor Blue
npx prisma generate
npx prisma migrate dev --name init

Write-Host "🌱 Seeding database with sample data..." -ForegroundColor Blue
npm run prisma:seed

Write-Host "✅ Backend setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 You can now run:" -ForegroundColor Yellow
Write-Host "   npm run dev              # Start backend in development mode" -ForegroundColor White
Write-Host "   npm run start:backend    # Start backend in production mode" -ForegroundColor White
Write-Host ""

# Navigate to frontend
Set-Location ../frontend

Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Blue
npm install

Write-Host "✅ Frontend setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 You can now run:" -ForegroundColor Yellow
Write-Host "   npm run dev              # Start frontend in development mode" -ForegroundColor White
Write-Host ""
Write-Host "🌐 URLs:" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:4000" -ForegroundColor White
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   API Docs: http://localhost:4000/api-docs" -ForegroundColor White

# Return to root
Set-Location ..
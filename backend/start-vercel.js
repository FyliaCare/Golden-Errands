// Runtime startup script for Vercel
const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting Golden Errands API...');

// Check if DATABASE_URL exists at runtime
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not set!');
  console.error('Please add DATABASE_URL in Vercel environment variables.');
  process.exit(1);
}

try {
  // Regenerate Prisma Client with real DATABASE_URL
  console.log('📦 Regenerating Prisma Client with production DATABASE_URL...');
  execSync('npx prisma generate', { 
    cwd: path.join(__dirname),
    stdio: 'inherit',
    env: process.env
  });

  // Run migrations
  console.log('🔄 Deploying database migrations...');
  execSync('npx prisma migrate deploy', { 
    cwd: path.join(__dirname),
    stdio: 'inherit',
    env: process.env
  });

  console.log('✅ Prisma ready, starting server...');
  
  // Start the Express server
  require('./dist/server.js');
  
} catch (error) {
  console.error('❌ Startup failed:', error.message);
  process.exit(1);
}

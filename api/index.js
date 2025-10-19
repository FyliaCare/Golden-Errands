// Vercel Serverless Function Entry Point
const { execSync } = require('child_process');
const path = require('path');

// Ensure DATABASE_URL is set (Vercel provides it at runtime)
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL not set!');
  throw new Error('DATABASE_URL environment variable required');
}

// Backend directory
const backendPath = path.join(__dirname, '..', 'backend');

// Generate Prisma Client on cold start (with real DATABASE_URL)
try {
  console.log('📦 Generating Prisma Client...');
  execSync('npx prisma generate', { 
    cwd: backendPath,
    stdio: 'pipe',
    env: { ...process.env }
  });
  console.log('✅ Prisma Client ready');
} catch (error) {
  console.warn('⚠️  Prisma generate warning:', error.message);
  // Continue anyway, client might already exist
}

// Import Express app
const app = require('../backend/dist/server.js');

// Export for Vercel
module.exports = app.default || app;

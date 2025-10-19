// Vercel serverless function entry point
const { execSync } = require('child_process');
const path = require('path');

// CRITICAL: Set DATABASE_URL BEFORE any Prisma commands
if (!process.env.DATABASE_URL) {
  console.log('⚠️  DATABASE_URL not found, using placeholder for build...');
  process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@placeholder:5432/placeholder?schema=public';
}

console.log('🔧 Vercel Build Starting...');

try {
  // Generate Prisma Client with placeholder DATABASE_URL
  console.log('📦 Generating Prisma Client...');
  execSync('npx prisma generate', { 
    cwd: path.join(__dirname),
    stdio: 'inherit',
    env: process.env
  });

  // Build TypeScript
  console.log('🏗️ Compiling TypeScript...');
  execSync('npx tsc', { 
    cwd: path.join(__dirname),
    stdio: 'inherit' 
  });

  console.log('✅ Build Complete!');
  console.log('ℹ️  Prisma Client will regenerate at runtime with real DATABASE_URL');
} catch (error) {
  console.error('❌ Build Failed:', error.message);
  process.exit(1);
}

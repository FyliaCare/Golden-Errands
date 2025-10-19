#!/usr/bin/env node
/**
 * Production Startup Script
 * Works on Railway, Render, Heroku, Digital Ocean, AWS, etc.
 * Handles Prisma generation + migrations + server start
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Golden Errands API - Production Startup\n');

// Validate required environment variables
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please configure DATABASE_URL in your hosting platform.\n');
  process.exit(1);
}

try {
  // Step 1: Generate Prisma Client with production DATABASE_URL
  console.log('📦 Generating Prisma Client...');
  execSync('npx prisma generate', { 
    stdio: 'inherit',
    env: process.env
  });
  console.log('✅ Prisma Client generated\n');

  // Step 2: Run database migrations
  console.log('🔄 Running database migrations...');
  try {
    execSync('npx prisma migrate deploy', { 
      stdio: 'inherit',
      env: process.env
    });
    console.log('✅ Migrations completed\n');
  } catch (migrateError) {
    console.warn('⚠️  Migration warning (may be expected if no migrations):', migrateError.message);
  }

  // Step 3: Start the server
  console.log('🌟 Starting server...\n');
  require('./dist/server.js');

} catch (error) {
  console.error('❌ Startup failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}

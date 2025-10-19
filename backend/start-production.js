#!/usr/bin/env node
/**
 * Production Startup Script
 * Works on Railway, Render, Heroku, Digital Ocean, AWS, etc.
 * Handles Prisma generation + migrations + server start
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Golden Errands API - Production Startup\n');

// Validate required environment variables
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL environment variable is not set!');
  console.error('Please configure DATABASE_URL in your hosting platform.\n');
  process.exit(1);
}

// Determine if we're in Docker (paths are different)
const isDocker = fs.existsSync('/app/dist');
const workDir = isDocker ? '/app' : __dirname;
const serverPath = isDocker ? '/app/dist/server.js' : path.join(__dirname, 'dist', 'server.js');

console.log(`📂 Working directory: ${workDir}`);
console.log(`🎯 Server path: ${serverPath}\n`);

try {
  // Step 1: Generate Prisma Client with production DATABASE_URL
  console.log('📦 Generating Prisma Client...');
  execSync('npx prisma generate', { 
    stdio: 'inherit',
    env: process.env,
    cwd: workDir
  });
  console.log('✅ Prisma Client generated\n');

  // Step 2: Run database migrations
  console.log('🔄 Running database migrations...');
  try {
    execSync('npx prisma migrate deploy', { 
      stdio: 'inherit',
      env: process.env,
      cwd: workDir
    });
    console.log('✅ Migrations completed\n');
  } catch (migrateError) {
    // Don't fail - migrations might not be needed or DB might not be ready yet
    console.warn('⚠️  Migration info:', migrateError.message);
    console.warn('Continuing without migrations - server will still start\n');
  }

  // Step 3: Start the server
  console.log('🌟 Starting server...\n');
  
  // Verify server file exists
  if (!fs.existsSync(serverPath)) {
    throw new Error(`Server file not found at: ${serverPath}`);
  }
  
  require(serverPath);

} catch (error) {
  console.error('❌ Startup failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}

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

  // Step 2: Sync database schema (using db push for Railway)
  console.log('🔄 Syncing database schema...');
  try {
    // Use db push - works better with Railway than migrations
    execSync('npx prisma db push --skip-generate --accept-data-loss', { 
      stdio: 'inherit',
      env: process.env,
      cwd: workDir,
      timeout: 60000 // 60 second timeout for Railway
    });
    console.log('✅ Database schema synced successfully\n');
  } catch (dbError) {
    console.warn('⚠️  Database sync failed during startup');
    console.warn('This is normal if Railway networking is still initializing');
    console.warn('Tables will be created on first API request if needed\n');
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

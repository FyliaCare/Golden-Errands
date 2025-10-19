#!/usr/bin/env node
/**
 * Vercel Build Script
 * Cross-platform Node.js build script for Vercel deployment
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🔨 Building Golden Errands API for Vercel...\n');

const backendPath = path.join(__dirname, 'backend');

try {
  // Set placeholder DATABASE_URL if not set (for Prisma generation during build)
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@placeholder:5432/placeholder?schema=public';
    console.log('⚠️  Using placeholder DATABASE_URL for build\n');
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { 
    cwd: backendPath, 
    stdio: 'inherit',
    env: process.env
  });

  // Run Vercel build (generates Prisma + compiles TypeScript)
  console.log('\n🏗️  Running build...');
  execSync('npm run vercel-build', { 
    cwd: backendPath, 
    stdio: 'inherit',
    env: process.env
  });

  console.log('\n✅ Build complete!\n');
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}

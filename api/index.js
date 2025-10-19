// Vercel Serverless Function Entry Point
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const backendPath = path.join(__dirname, '..', 'backend');
const distPath = path.join(backendPath, 'dist', 'server.js');

// Build backend if not already built
if (!fs.existsSync(distPath)) {
  console.log('🏗️  Building backend...');
  
  // Set placeholder DATABASE_URL for build
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@placeholder:5432/placeholder';
  }
  
  try {
    // Install dependencies
    execSync('npm install', { 
      cwd: backendPath,
      stdio: 'inherit',
      env: process.env
    });
    
    // Build
    execSync('npm run vercel-build', { 
      cwd: backendPath,
      stdio: 'inherit',
      env: process.env
    });
  } catch (error) {
    console.error('Build failed:', error);
    throw error;
  }
}

// Ensure DATABASE_URL is set at runtime
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('placeholder')) {
  console.error('❌ DATABASE_URL not properly set!');
  module.exports = (req, res) => {
    res.status(500).json({ 
      error: 'Database configuration error',
      message: 'DATABASE_URL environment variable not set in Vercel'
    });
  };
} else {
  // Generate Prisma Client with real DATABASE_URL on cold start
  try {
    console.log('📦 Generating Prisma Client...');
    execSync('npx prisma generate', { 
      cwd: backendPath,
      stdio: 'pipe',
      env: process.env
    });
  } catch (error) {
    console.warn('⚠️  Prisma generate warning:', error.message);
  }

  // Import and export Express app
  const app = require(distPath);
  module.exports = app.default || app;
}

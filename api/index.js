/**
 * Vercel Serverless Function Adapter
 * Clean, simple approach that works with Vercel's architecture
 */

const { execSync } = require('child_process');
const path = require('path');

const backendPath = path.join(__dirname, '..', 'backend');

// Initialize Prisma Client on cold start (once per container)
let prismaInitialized = false;

function initializePrisma() {
  if (prismaInitialized) return;
  
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable not set in Vercel');
  }
  
  try {
    console.log('🔄 Initializing Prisma Client for serverless...');
    execSync('npx prisma generate', { 
      cwd: backendPath,
      stdio: 'pipe',
      env: process.env
    });
    prismaInitialized = true;
    console.log('✅ Prisma Client ready');
  } catch (error) {
    console.error('Prisma initialization failed:', error.message);
    throw error;
  }
}

// Export handler
module.exports = async (req, res) => {
  try {
    // Initialize Prisma on first request
    if (!prismaInitialized) {
      initializePrisma();
    }
    
    // Import Express app (dynamically to ensure Prisma is ready)
    const app = require(path.join(backendPath, 'dist', 'server.js'));
    const expressApp = app.default || app;
    
    // Handle request with Express
    return expressApp(req, res);
    
  } catch (error) {
    console.error('❌ Serverless handler error:', error);
    
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      hint: 'Check Vercel function logs for details'
    });
  }
};

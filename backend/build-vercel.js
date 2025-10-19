// Vercel serverless function entry point
const { execSync } = require('child_process');
const path = require('path');

// Set DATABASE_URL placeholder if not exists (for build)
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://user:pass@host:5432/db';
}

console.log('🔧 Vercel Build Starting...');

try {
  // Generate Prisma Client
  console.log('📦 Generating Prisma Client...');
  execSync('npx prisma generate', { 
    cwd: path.join(__dirname),
    stdio: 'inherit' 
  });

  // Build TypeScript
  console.log('🏗️ Compiling TypeScript...');
  execSync('npx tsc', { 
    cwd: path.join(__dirname),
    stdio: 'inherit' 
  });

  console.log('✅ Build Complete!');
} catch (error) {
  console.error('❌ Build Failed:', error.message);
  process.exit(1);
}

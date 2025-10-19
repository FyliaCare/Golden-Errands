// Vercel Build Script - Handles missing DATABASE_URL
const { execSync } = require('child_process');

console.log('🔨 Starting Vercel Build...');

// Set placeholder DATABASE_URL if not present
if (!process.env.DATABASE_URL) {
  console.log('⚠️  DATABASE_URL not set, using placeholder for build');
  process.env.DATABASE_URL = 'postgresql://placeholder:placeholder@placeholder:5432/placeholder?schema=public';
}

try {
  console.log('📦 Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('🏗️  Building TypeScript...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build complete!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

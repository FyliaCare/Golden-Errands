#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Golden Errands API...');

// Change to backend directory
process.chdir(path.join(__dirname, 'backend'));

console.log('📍 Working directory:', process.cwd());

// Run database migrations
console.log('🗄️ Running database migrations...');
const migrate = spawn('npx', ['prisma', 'migrate', 'deploy'], {
  stdio: 'inherit',
  shell: true
});

migrate.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Migration failed with code:', code);
    process.exit(1);
  }
  
  console.log('✅ Migrations completed successfully');
  console.log('🌐 Starting server...');
  
  // Start the server
  const server = spawn('node', ['dist/server.js'], {
    stdio: 'inherit'
  });
  
  server.on('close', (code) => {
    console.log('Server exited with code:', code);
    process.exit(code);
  });
});

migrate.on('error', (err) => {
  console.error('❌ Migration process error:', err);
  process.exit(1);
});
#!/usr/bin/env node
/**
 * Golden Errands - Deployment Readiness Check
 * Run this before deploying to any platform
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Golden Errands - Deployment Readiness Check\n');
console.log('=' .repeat(60) + '\n');

const checks = [];

function check(name, fn) {
  try {
    const result = fn();
    if (result === true || result === undefined) {
      console.log(`✅ ${name}`);
      checks.push({ name, status: 'pass' });
      return true;
    } else {
      console.log(`⚠️  ${name}: ${result}`);
      checks.push({ name, status: 'warn', message: result });
      return false;
    }
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    checks.push({ name, status: 'fail', message: error.message });
    return false;
  }
}

console.log('📦 File Structure Checks:\n');

check('Dockerfile exists', () => {
  if (!fs.existsSync('./Dockerfile')) throw new Error('Missing Dockerfile');
});

check('.dockerignore exists', () => {
  if (!fs.existsSync('./.dockerignore')) throw new Error('Missing .dockerignore');
});

check('railway.json exists', () => {
  if (!fs.existsSync('./railway.json')) throw new Error('Missing railway.json');
});

check('vercel.json exists', () => {
  if (!fs.existsSync('./vercel.json')) throw new Error('Missing vercel.json');
});

check('api/index.js exists', () => {
  if (!fs.existsSync('./api/index.js')) throw new Error('Missing api/index.js');
});

check('docker-compose.yml exists', () => {
  if (!fs.existsSync('./docker-compose.yml')) throw new Error('Missing docker-compose.yml');
});

console.log('\n🔧 Backend Configuration:\n');

check('backend/package.json exists', () => {
  if (!fs.existsSync('./backend/package.json')) throw new Error('Missing backend/package.json');
});

check('backend/start-production.js exists', () => {
  if (!fs.existsSync('./backend/start-production.js')) throw new Error('Missing backend/start-production.js');
});

check('backend/src/server.ts exists', () => {
  if (!fs.existsSync('./backend/src/server.ts')) throw new Error('Missing backend/src/server.ts');
});

check('Prisma schema exists', () => {
  if (!fs.existsSync('./backend/prisma/schema.prisma')) throw new Error('Missing prisma/schema.prisma');
});

console.log('\n📝 Package.json Validation:\n');

check('backend dependencies include Prisma', () => {
  const pkg = JSON.parse(fs.readFileSync('./backend/package.json', 'utf8'));
  if (!pkg.dependencies['@prisma/client']) throw new Error('@prisma/client not in dependencies');
  if (!pkg.dependencies['prisma']) throw new Error('prisma not in dependencies');
});

check('backend has production start script', () => {
  const pkg = JSON.parse(fs.readFileSync('./backend/package.json', 'utf8'));
  if (!pkg.scripts.start) throw new Error('No start script defined');
  if (pkg.scripts.start !== 'node start-production.js') {
    return `start script is "${pkg.scripts.start}", should be "node start-production.js"`;
  }
});

check('backend has build scripts', () => {
  const pkg = JSON.parse(fs.readFileSync('./backend/package.json', 'utf8'));
  if (!pkg.scripts.build) throw new Error('No build script');
  if (!pkg.scripts['build:docker']) throw new Error('No build:docker script');
  if (!pkg.scripts['build:vercel']) throw new Error('No build:vercel script');
});

console.log('\n🐳 Docker Configuration:\n');

check('Dockerfile uses multi-stage build', () => {
  const dockerfile = fs.readFileSync('./Dockerfile', 'utf8');
  if (!dockerfile.includes('AS builder')) throw new Error('Not using multi-stage build');
  if (!dockerfile.includes('AS production')) throw new Error('Missing production stage');
});

check('Dockerfile has health check', () => {
  const dockerfile = fs.readFileSync('./Dockerfile', 'utf8');
  if (!dockerfile.includes('HEALTHCHECK')) throw new Error('No health check defined');
});

console.log('\n⚡ Vercel Configuration:\n');

check('Vercel build command configured', () => {
  const vercelConfig = JSON.parse(fs.readFileSync('./vercel.json', 'utf8'));
  if (!vercelConfig.buildCommand) throw new Error('No buildCommand in vercel.json');
});

check('Vercel routes to api/index.js', () => {
  const vercelConfig = JSON.parse(fs.readFileSync('./vercel.json', 'utf8'));
  if (!vercelConfig.routes || !vercelConfig.routes.length) throw new Error('No routes configured');
  const hasApiRoute = vercelConfig.routes.some(r => 
    (r.dest || r.destination) === '/api/index.js'
  );
  if (!hasApiRoute) throw new Error('No route to /api/index.js');
});

console.log('\n🚂 Railway Configuration:\n');

check('Railway uses Dockerfile', () => {
  const railwayConfig = JSON.parse(fs.readFileSync('./railway.json', 'utf8'));
  if (!railwayConfig.build) throw new Error('No build config');
  if (railwayConfig.build.builder !== 'DOCKERFILE') {
    throw new Error('Railway not configured to use Dockerfile');
  }
});

console.log('\n🔐 Environment Variables Check:\n');

check('DATABASE_URL documented', () => {
  const deployment = fs.readFileSync('./DEPLOYMENT.md', 'utf8');
  if (!deployment.includes('DATABASE_URL')) throw new Error('DATABASE_URL not in docs');
});

check('JWT_SECRET documented', () => {
  const deployment = fs.readFileSync('./DEPLOYMENT.md', 'utf8');
  if (!deployment.includes('JWT_SECRET')) throw new Error('JWT_SECRET not in docs');
});

console.log('\n📚 Documentation:\n');

check('DEPLOYMENT.md exists and is comprehensive', () => {
  if (!fs.existsSync('./DEPLOYMENT.md')) throw new Error('Missing DEPLOYMENT.md');
  const content = fs.readFileSync('./DEPLOYMENT.md', 'utf8');
  if (content.length < 5000) return 'DEPLOYMENT.md seems incomplete';
  if (!content.includes('Railway')) return 'Missing Railway instructions';
  if (!content.includes('Vercel')) return 'Missing Vercel instructions';
  if (!content.includes('Render')) return 'Missing Render instructions';
});

check('PRODUCTION_READY.md exists', () => {
  if (!fs.existsSync('./PRODUCTION_READY.md')) throw new Error('Missing PRODUCTION_READY.md');
});

console.log('\n' + '='.repeat(60));
console.log('📊 SUMMARY\n');

const passed = checks.filter(c => c.status === 'pass').length;
const warned = checks.filter(c => c.status === 'warn').length;
const failed = checks.filter(c => c.status === 'fail').length;

console.log(`✅ Passed: ${passed}/${checks.length}`);
console.log(`⚠️  Warnings: ${warned}/${checks.length}`);
console.log(`❌ Failed: ${failed}/${checks.length}\n`);

if (failed > 0) {
  console.log('🔴 CRITICAL ISSUES - Fix these before deploying:\n');
  checks.filter(c => c.status === 'fail').forEach(c => {
    console.log(`   ❌ ${c.name}: ${c.message}`);
  });
  console.log('');
}

if (warned > 0) {
  console.log('⚠️  WARNINGS - Review these:\n');
  checks.filter(c => c.status === 'warn').forEach(c => {
    console.log(`   ⚠️  ${c.name}: ${c.message}`);
  });
  console.log('');
}

if (failed === 0 && warned === 0) {
  console.log('✨ ' + '='.repeat(56) + ' ✨');
  console.log('🎉 YOUR PLATFORM IS PRODUCTION-READY! 🎉');
  console.log('✨ ' + '='.repeat(56) + ' ✨\n');
  
  console.log('📋 Next Steps:\n');
  console.log('1. Commit your changes:');
  console.log('   git add .');
  console.log('   git commit -m "Production-ready deployment configuration"');
  console.log('   git push origin main\n');
  
  console.log('2. Choose your platform:\n');
  console.log('   🚂 Railway (Recommended): See DEPLOYMENT.md → Railway section');
  console.log('   ⚡ Vercel (Serverless): See DEPLOYMENT.md → Vercel section');
  console.log('   🎨 Render (Free tier): See DEPLOYMENT.md → Render section\n');
  
  console.log('3. Deploy and enjoy! 🚀\n');
  
  console.log('📖 Full guide: DEPLOYMENT.md');
  console.log('📊 Summary: PRODUCTION_READY.md\n');
}

process.exit(failed > 0 ? 1 : 0);

#!/usr/bin/env node
/**
 * Vercel Deployment Troubleshooting Script
 * Run this to check if your deployment is properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Golden Errands - Vercel Deployment Check\n');

const checks = {
  passed: [],
  failed: [],
  warnings: []
};

function check(name, condition, failMessage, warnMessage = null) {
  if (condition === true) {
    checks.passed.push(name);
    console.log(`✅ ${name}`);
  } else if (condition === 'warn') {
    checks.warnings.push({ name, message: warnMessage });
    console.log(`⚠️  ${name}: ${warnMessage}`);
  } else {
    checks.failed.push({ name, message: failMessage });
    console.log(`❌ ${name}: ${failMessage}`);
  }
}

// Check 1: vercel.json exists
const vercelJsonExists = fs.existsSync(path.join(__dirname, 'vercel.json'));
check(
  'vercel.json exists',
  vercelJsonExists,
  'Missing vercel.json configuration file'
);

// Check 2: api/index.js exists
const apiIndexExists = fs.existsSync(path.join(__dirname, 'api', 'index.js'));
check(
  'api/index.js exists',
  apiIndexExists,
  'Missing serverless function entry point'
);

// Check 3: build.sh exists
const buildShExists = fs.existsSync(path.join(__dirname, 'build.sh'));
check(
  'build.sh exists',
  buildShExists,
  'Missing build script'
);

// Check 4: backend/package.json exists
const backendPackageExists = fs.existsSync(path.join(__dirname, 'backend', 'package.json'));
check(
  'backend/package.json exists',
  backendPackageExists,
  'Missing backend package.json'
);

// Check 5: Verify backend dependencies
if (backendPackageExists) {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'backend', 'package.json'), 'utf8')
  );
  
  const requiredDeps = ['express', 'prisma', '@prisma/client', 'typescript'];
  const missingDeps = requiredDeps.filter(dep => 
    !packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]
  );
  
  check(
    'Required dependencies present',
    missingDeps.length === 0,
    `Missing: ${missingDeps.join(', ')}`
  );
  
  // Check if dependencies are in dependencies not devDependencies
  const prismaInDev = packageJson.devDependencies?.['prisma'];
  check(
    'Prisma in dependencies (not devDependencies)',
    !prismaInDev ? true : 'warn',
    null,
    'Prisma should be in dependencies for Vercel deployment'
  );
}

// Check 6: server.ts exports app
const serverTsPath = path.join(__dirname, 'backend', 'src', 'server.ts');
if (fs.existsSync(serverTsPath)) {
  const serverContent = fs.readFileSync(serverTsPath, 'utf8');
  const hasExport = serverContent.includes('export default app') || 
                    serverContent.includes('export { app }') ||
                    serverContent.includes('module.exports');
  
  check(
    'server.ts exports app',
    hasExport,
    'server.ts must export the Express app'
  );
  
  // Check if app.listen is conditional
  const hasConditionalListen = serverContent.includes('process.env.VERCEL') ||
                                 serverContent.includes('!process.env.VERCEL');
  
  check(
    'app.listen() is conditional',
    hasConditionalListen ? true : 'warn',
    null,
    'Consider making app.listen() conditional for Vercel'
  );
}

// Check 7: tsconfig.json outputs to dist
const tsconfigPath = path.join(__dirname, 'backend', 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
  const outputDir = tsconfig.compilerOptions?.outDir;
  
  check(
    'TypeScript outputs to dist/',
    outputDir === './dist' || outputDir === 'dist',
    `outDir is "${outputDir}", should be "dist"`
  );
}

// Check 8: build-vercel.js exists
const buildVercelExists = fs.existsSync(path.join(__dirname, 'backend', 'build-vercel.js'));
check(
  'backend/build-vercel.js exists',
  buildVercelExists,
  'Missing build-vercel.js script'
);

// Check 9: Verify vercel.json configuration
if (vercelJsonExists) {
  const vercelConfig = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8')
  );
  
  check(
    'vercel.json has builds config',
    Array.isArray(vercelConfig.builds) && vercelConfig.builds.length > 0,
    'Missing builds configuration'
  );
  
  check(
    'vercel.json has routes config',
    Array.isArray(vercelConfig.routes) && vercelConfig.routes.length > 0,
    'Missing routes configuration'
  );
  
  const hasCatchAllRoute = vercelConfig.routes?.some(r => 
    r.src === '/(.*)'  || r.source === '/(.*)'
  );
  
  check(
    'vercel.json has catch-all route',
    hasCatchAllRoute,
    'Missing catch-all route to api/index.js'
  );
}

// Check 10: No Railway or Docker files
const railwayExists = fs.existsSync(path.join(__dirname, 'railway.json'));
const dockerfileExists = fs.existsSync(path.join(__dirname, 'Dockerfile'));

check(
  'No conflicting deployment configs',
  !railwayExists && !dockerfileExists ? true : 'warn',
  null,
  'Found railway.json or Dockerfile - may cause conflicts'
);

// Summary
console.log('\n' + '='.repeat(60));
console.log('📊 SUMMARY\n');
console.log(`✅ Passed: ${checks.passed.length}`);
console.log(`⚠️  Warnings: ${checks.warnings.length}`);
console.log(`❌ Failed: ${checks.failed.length}\n`);

if (checks.failed.length > 0) {
  console.log('🔴 CRITICAL ISSUES:');
  checks.failed.forEach(f => console.log(`   - ${f.name}: ${f.message}`));
  console.log('\n❗ Fix these issues before deploying to Vercel\n');
}

if (checks.warnings.length > 0) {
  console.log('⚠️  WARNINGS:');
  checks.warnings.forEach(w => console.log(`   - ${w.name}: ${w.message}`));
  console.log('\n⚡ These may not prevent deployment but should be reviewed\n');
}

if (checks.failed.length === 0) {
  console.log('✨ Your project is ready for Vercel deployment!');
  console.log('\nNext steps:');
  console.log('1. git add . && git commit -m "Ready for Vercel"');
  console.log('2. git push origin main');
  console.log('3. Import project in Vercel dashboard');
  console.log('4. Set DATABASE_URL environment variable');
  console.log('5. Deploy!');
  console.log('\nSee VERCEL_DEPLOYMENT.md for detailed instructions.\n');
}

// Exit with error code if critical checks failed
process.exit(checks.failed.length > 0 ? 1 : 0);

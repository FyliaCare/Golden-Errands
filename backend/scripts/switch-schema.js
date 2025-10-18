const fs = require('fs');
const path = require('path');

console.log('🔄 Switching to production PostgreSQL schema...');

const prodSchemaPath = path.join(__dirname, '..', 'prisma', 'schema.prod.prisma');
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');

try {
  // Check if production schema exists
  if (fs.existsSync(prodSchemaPath)) {
    // Copy production schema to main schema
    fs.copyFileSync(prodSchemaPath, schemaPath);
    console.log('✅ Successfully switched to PostgreSQL schema for production');
  } else {
    console.log('⚠️  Production schema not found, using current schema');
  }
} catch (error) {
  console.error('❌ Error switching schema:', error.message);
  process.exit(1);
}
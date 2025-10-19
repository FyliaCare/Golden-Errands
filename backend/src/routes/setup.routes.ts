import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import logger from '../utils/logger';

const router = Router();
const prisma = new PrismaClient();

/**
 * Setup database tables
 * This endpoint runs prisma db push to create all tables
 * Only use this once after deployment or when tables need to be created
 */
router.post('/init-database', async (req: Request, res: Response) => {
  try {
    logger.info('🔧 Manual database initialization requested');

    // Step 1: Test database connection
    logger.info('Testing database connection...');
    await prisma.$connect();
    logger.info('✅ Database connection successful');

    // Step 2: Push schema to database
    logger.info('Pushing schema to database...');
    try {
      execSync('npx prisma db push --skip-generate --accept-data-loss', {
        stdio: 'inherit',
        cwd: process.cwd(),
        timeout: 60000,
      });
      logger.info('✅ Database schema pushed successfully');
    } catch (pushError) {
      logger.error('Schema push failed, trying alternative method...');
      // Try without accept-data-loss flag
      execSync('npx prisma db push --skip-generate', {
        stdio: 'inherit',
        cwd: process.cwd(),
        timeout: 60000,
      });
    }

    // Step 3: Verify tables exist
    const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;

    await prisma.$disconnect();

    res.json({
      success: true,
      message: 'Database initialized successfully! 🎉',
      tables: tables.map((t) => t.table_name),
      tableCount: tables.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    logger.error('Database initialization failed:', error);
    res.status(500).json({
      success: false,
      error: 'Database initialization failed',
      message: error.message,
      details: error.stack,
    });
  }
});

/**
 * Check database status
 * Returns connection status and list of existing tables
 */
router.get('/database-status', async (req: Request, res: Response) => {
  try {
    // Test connection
    await prisma.$connect();

    // Get list of tables
    const tables = await prisma.$queryRaw<Array<{ table_name: string }>>`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;

    // Check if our expected tables exist
    const tableNames = tables.map((t) => t.table_name);
    const expectedTables = ['User', 'Order', 'Driver', 'Vehicle', 'Payment', 'DeliveryRoute', 'Notification'];
    const missingTables = expectedTables.filter((t) => !tableNames.includes(t));

    await prisma.$disconnect();

    res.json({
      connected: true,
      tableCount: tables.length,
      tables: tableNames,
      expectedTables,
      missingTables,
      ready: missingTables.length === 0,
      message: missingTables.length === 0 
        ? 'Database is ready! ✅' 
        : `Missing tables: ${missingTables.join(', ')}. Run POST /api/setup/init-database to create them.`,
    });
  } catch (error: any) {
    res.status(500).json({
      connected: false,
      error: 'Cannot connect to database',
      message: error.message,
    });
  }
});

export default router;

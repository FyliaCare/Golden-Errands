import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { config } from './config';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import logger from './utils/logger';

const app: Application = express();

// Trust proxy for Railway/production environments
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Create necessary directories
const uploadsDir = path.join(__dirname, '..', 'uploads');
const logsDir = path.join(__dirname, '..', 'logs');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Static files
app.use('/uploads', express.static(uploadsDir));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env,
  });
});

// API routes
app.use('/api', routes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'Golden Errands Delivery Management API',
    version: '2.0.0',
    description: 'Professional delivery management system for Golden Errands',
    company: config.company,
    documentation: '/api-docs',
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
  });
});

// Error handler
app.use(errorHandler);

// Start server (only if not in serverless environment)
if (process.env.VERCEL !== '1') {
  const PORT = config.port;

  app.listen(PORT, () => {
    logger.info(`🚀 Golden Errands API Server running on port ${PORT}`);
    logger.info(`📦 Environment: ${config.env}`);
    logger.info(`🌐 CORS Origin: ${config.cors.origin}`);
    logger.info(`📍 Access the API at: http://localhost:${PORT}`);
    console.log(`
  ╔══════════════════════════════════════════════╗
  ║                                              ║
  ║         GOLDEN ERRANDS                       ║
  ║    Delivery Management System API            ║
  ║                                              ║
  ║    Server running on port ${PORT}             ║
  ║    Environment: ${config.env.padEnd(22)} ║
  ║                                              ║
  ╚══════════════════════════════════════════════╝
  `);
  });
}

export default app;

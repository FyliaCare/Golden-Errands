# Production-Ready Multi-Stage Dockerfile
# Works on Railway, Render, Digital Ocean, AWS, GCP, Azure, Heroku, etc.

# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./backend/
COPY backend/prisma ./backend/prisma/

# Install dependencies (including dev dependencies for build)
WORKDIR /app/backend
RUN npm ci

# Copy backend source
COPY backend ./

# Build TypeScript (Prisma will generate at runtime when DATABASE_URL is available)
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS production

# Install OpenSSL 1.1 compatibility for Prisma
RUN apk add --no-cache openssl1.1-compat

WORKDIR /app

# Install production dependencies only
COPY backend/package*.json ./
RUN npm ci --only=production

# Copy Prisma schema (needed for runtime generation)
COPY backend/prisma ./prisma/

# Copy startup script
COPY backend/start-production.js ./start-production.js

# Copy built application from builder
COPY --from=builder /app/backend/dist ./dist

# Create uploads directory
RUN mkdir -p uploads && chmod 777 uploads

# Expose port (Railway/Render will override with PORT env var)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:' + (process.env.PORT || 3000) + '/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"

# Start script that handles Prisma generation + migrations + server start
CMD ["npm", "start"]

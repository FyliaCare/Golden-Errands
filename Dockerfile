# Golden Errands Backend - Railway Deployment
# Multi-stage build for Node.js TypeScript application

FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci

# Copy backend source code
COPY backend/ ./

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY backend/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy Prisma schema for runtime generation
COPY backend/prisma ./prisma

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Generate Prisma Client in production
RUN npx prisma generate

# Expose port (Railway will set PORT env var)
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start command: run migrations then start server
CMD npx prisma migrate deploy && node dist/server.js

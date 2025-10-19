# Multi-stage Docker build for Golden Errands API
FROM node:18-alpine AS base

# Install required system dependencies
RUN apk add --no-cache openssl

# Set working directory to app root
WORKDIR /app

# Stage 1: Dependencies and Build
FROM base AS builder

# Copy backend package files
COPY backend/package*.json ./backend/
COPY backend/prisma ./backend/prisma/

# Install all dependencies (including dev dependencies for build)
WORKDIR /app/backend
RUN npm ci

# Copy source code
COPY backend/src ./src/
COPY backend/tsconfig.json ./

# Generate Prisma client and compile TypeScript
RUN npx prisma generate
RUN npm run build

# Stage 2: Production Runtime
FROM base AS runtime

# Copy backend package files for production install
COPY backend/package*.json ./backend/

# Install only production dependencies
WORKDIR /app/backend
RUN npm ci --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/backend/dist ./dist/
COPY --from=builder /app/backend/node_modules/.prisma ./node_modules/.prisma/
COPY --from=builder /app/backend/prisma ./prisma/

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version || exit 1

# Start with migration and then server
CMD sh -c "npx prisma migrate deploy && node dist/server.js"
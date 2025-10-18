# Backend Dockerfile for Golden Errands API
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Build the source code only when needed
FROM base AS builder
WORKDIR /app
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci

COPY backend/src ./src
COPY backend/prisma ./prisma
COPY backend/tsconfig.json ./

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy the built application
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --from=deps --chown=nestjs:nodejs /app/node_modules ./node_modules

# Create necessary directories
RUN mkdir -p /app/uploads /app/logs
RUN chown -R nestjs:nodejs /app/uploads /app/logs

USER nestjs

EXPOSE 4000

ENV PORT=4000

# Start the server
CMD ["node", "dist/server.js"]
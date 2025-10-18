# Frontend Dockerfile for Golden Errands React App
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Build the source code only when needed
FROM base AS builder
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

COPY frontend/src ./src
COPY frontend/index.html ./
COPY frontend/vite.config.js* ./

# Build the application
RUN npm run build

# Production image, serve with nginx
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built assets from builder stage
COPY --from=builder /app/dist .

# Copy nginx configuration
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
# Universal Deployment Guide

## Platform-Agnostic Setup

This application is a standard Node.js/Express + React stack. Deploy anywhere.

### What You Need

1. **PostgreSQL Database** (any provider)
2. **Environment Variables:**
   - `DATABASE_URL` - PostgreSQL connection
   - `JWT_SECRET` - Random secret key

### Deploy Steps (Any Platform)

1. **Connect your GitHub repo**
2. **Configure build:**
   - Root: `backend`
   - Build: `npm install && npm run build`
   - Start: `npm start`
3. **Add environment variables** (DATABASE_URL, JWT_SECRET)
4. **Deploy**

The platform will handle the rest automatically.

### Supported Platforms

- Vercel, Railway, Render
- Heroku, DigitalOcean, Fly.io  
- AWS, Google Cloud, Azure
- Any Node.js 18+ hosting

### Database Providers

- Neon, Supabase, PlanetScale
- Railway Postgres, Render Postgres
- AWS RDS, Google Cloud SQL
- Self-hosted PostgreSQL

That's it! No special configs needed.

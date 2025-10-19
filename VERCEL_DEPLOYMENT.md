# Vercel Deployment Guide

## 🚀 Quick Deploy

### Prerequisites
- GitHub account with repository access
- Vercel account (free tier works)
- PostgreSQL database (can use Vercel Postgres or external)

### Deployment Steps

#### 1. Push Latest Code to GitHub
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

#### 2. Import Project to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration from `vercel.json`

#### 3. Configure Environment Variables
Before deploying, add these environment variables in Vercel:

**Required:**
- `DATABASE_URL` - Your PostgreSQL connection string
  ```
  postgresql://user:password@host:5432/database?schema=public
  ```

**Optional:**
- `JWT_SECRET` - Secret for JWT tokens (auto-generated if not set)
- `NODE_ENV` - Set to `production`
- `PORT` - Will be set automatically by Vercel

**How to add:**
1. In your Vercel project dashboard
2. Go to Settings → Environment Variables
3. Add each variable for Production, Preview, and Development
4. Click "Save"

#### 4. Deploy
Click "Deploy" button - Vercel will:
1. Run `build.sh` which:
   - Installs dependencies
   - Generates Prisma Client (with placeholder)
   - Compiles TypeScript
2. Deploy the serverless function
3. Your API will be available at `https://your-project.vercel.app`

---

## 🔍 How It Works

### Build Process
1. **build.sh** runs during deployment
   - Sets placeholder DATABASE_URL for Prisma generation
   - Compiles TypeScript to `backend/dist/`
   
2. **api/index.js** is the serverless function entry point
   - Regenerates Prisma Client with real DATABASE_URL at runtime
   - Imports and serves the Express app

### Runtime Flow
```
Request → Vercel Edge → api/index.js → Prisma Generate (first run) → Express App → Response
```

---

## 🔧 Configuration Files

### vercel.json
```json
{
  "version": 2,
  "buildCommand": "bash build.sh",
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/api/index.js"
    }
  ]
}
```

- **buildCommand**: Runs our custom build script
- **builds**: Defines serverless function
- **routes**: Routes all traffic to our API handler

### build.sh
Custom build script that:
- Installs dependencies
- Sets placeholder DATABASE_URL
- Generates Prisma Client
- Compiles TypeScript

### api/index.js
Serverless function that:
- Checks for DATABASE_URL at runtime
- Regenerates Prisma Client (on cold start)
- Imports Express app from `backend/dist/server.js`
- Handles all requests

---

## 🧪 Testing Deployment

### Test Endpoints
After deployment, test these endpoints:

```bash
# Health check
curl https://your-project.vercel.app/

# Auth endpoints
curl https://your-project.vercel.app/api/auth/register \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Protected route (with JWT token)
curl https://your-project.vercel.app/api/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Check Logs
1. Go to your Vercel project dashboard
2. Click on Deployments → Latest Deployment
3. Click "View Function Logs"
4. Look for:
   - ✅ Build success messages
   - 🚀 Serverless function invocations
   - 📦 Prisma Client generation
   - ❌ Any errors

---

## 🐛 Troubleshooting

### 404 Errors
**Problem:** All routes return 404

**Solutions:**
1. Check `vercel.json` routes configuration
2. Verify `api/index.js` exists and is correct
3. Ensure Express app exports correctly in `server.ts`
4. Check Vercel function logs for errors

### P1012: DATABASE_URL Not Found
**Problem:** Build fails with Prisma error

**This should be fixed by our build script**, but if it occurs:
1. Check `build.sh` is executable
2. Verify it sets `DATABASE_URL` before `prisma generate`
3. Ensure `backend/build-vercel.js` handles it correctly

### Database Connection Errors
**Problem:** Runtime errors connecting to database

**Solutions:**
1. Verify `DATABASE_URL` is set in Vercel environment variables
2. Check database is accessible from internet
3. Verify connection string format:
   ```
   postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
   ```
4. Check database firewall allows Vercel IPs

### Cold Start Performance
**Problem:** First request after inactivity is slow

**Expected behavior:**
- First request (cold start): 2-5 seconds
- Subsequent requests: <500ms
- Cold starts happen after ~5 minutes of inactivity on free tier

**To improve:**
- Upgrade to Vercel Pro (faster cold starts)
- Use Vercel Cron to keep function warm
- Optimize Prisma queries

### Module Not Found Errors
**Problem:** `Cannot find module '../backend/dist/server.js'`

**Solutions:**
1. Ensure build completed successfully
2. Check build logs for TypeScript compilation errors
3. Verify `backend/tsconfig.json` outputs to `dist/`
4. Make sure all dependencies are in `dependencies` not `devDependencies`

---

## 📦 Database Setup

### Option 1: Vercel Postgres (Recommended)
1. In Vercel project dashboard
2. Go to Storage tab
3. Click "Create Database" → Choose Postgres
4. Copy the `DATABASE_URL` connection string
5. Add it to Environment Variables (if not auto-added)

### Option 2: External PostgreSQL
Use any PostgreSQL provider:
- [Neon](https://neon.tech) - Serverless Postgres (free tier)
- [Supabase](https://supabase.com) - Open source (free tier)
- [Railway](https://railway.app) - Just for database
- [ElephantSQL](https://www.elephantsql.com) - Managed Postgres

Get the connection string and add it to Vercel environment variables.

---

## 🔄 Migrations

### Running Migrations

**Automatic (on deploy):**
Migrations don't run automatically. You need to run them manually or add a migration step.

**Manual (recommended for production):**
1. Install Vercel CLI: `npm i -g vercel`
2. Link your project: `vercel link`
3. Pull environment variables: `vercel env pull .env`
4. Run migrations locally (but against production DB):
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

**Via Vercel CLI (remote):**
```bash
vercel exec -- npm run migrate --cwd backend
```

### Creating New Migrations
```bash
cd backend
npx prisma migrate dev --name your_migration_name
```

Then commit the migration files and redeploy.

---

## 🔐 Security Checklist

- [ ] `DATABASE_URL` set in Vercel environment variables (not in code)
- [ ] `JWT_SECRET` set to a strong random value
- [ ] CORS configured properly in `server.ts`
- [ ] Rate limiting enabled (if needed)
- [ ] Input validation on all endpoints
- [ ] No sensitive data in logs
- [ ] Database connection uses SSL
- [ ] Environment variables marked as "Sensitive" in Vercel

---

## 📊 Monitoring

### View Logs
```bash
# Install Vercel CLI
npm i -g vercel

# View real-time logs
vercel logs --follow
```

### Performance Metrics
- Check Response Times in Vercel Dashboard
- Monitor Database Connections
- Track Error Rates
- Set up alerts for failures

---

## 🚦 Deployment Workflow

### Development
```bash
# Local development
npm run dev

# Test build
npm run build

# Run locally after build
npm start
```

### Staging
1. Push to `staging` branch
2. Vercel auto-deploys preview
3. Test with preview URL
4. Review deployment logs

### Production
1. Merge to `main` branch
2. Vercel auto-deploys to production
3. Run migrations if needed
4. Monitor logs for errors
5. Test production endpoints

---

## 📚 Additional Resources

- [Vercel Node.js Documentation](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Express on Vercel](https://vercel.com/guides/using-express-with-vercel)

---

## 🆘 Support

If you encounter issues:

1. **Check Vercel Logs:** Most errors show detailed stack traces
2. **Verify Environment Variables:** Ensure all required vars are set
3. **Test Database Connection:** Use a tool like pgAdmin or psql
4. **Review Recent Changes:** Check git diff for breaking changes
5. **Redeploy:** Sometimes a fresh deploy fixes cache issues

**Common Commands:**
```bash
# Force redeploy
vercel --prod --force

# View environment variables
vercel env ls

# Pull environment variables locally
vercel env pull .env
```

---

## ✅ Deployment Checklist

Before going live:

- [ ] All tests passing locally
- [ ] Environment variables configured in Vercel
- [ ] Database migrations run successfully
- [ ] API endpoints tested on preview deployment
- [ ] CORS configured for production domain
- [ ] Error handling tested
- [ ] Logs reviewed for warnings
- [ ] Performance acceptable (cold start < 5s)
- [ ] Database connection pooling configured
- [ ] Backup strategy in place
- [ ] Monitoring and alerts set up

---

**Status:** ✅ Ready for Deployment

Deploy to Vercel now and your Golden Errands API will be live!

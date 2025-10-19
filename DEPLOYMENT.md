# 🚀 Universal Deployment Guide - Golden Errands API

This guide covers deployment to **ALL major platforms** with a single, production-ready codebase.

---

## 📋 Table of Contents

1. [Quick Start](#-quick-start)
2. [Railway Deployment](#-railway-deployment-recommended)
3. [Vercel Deployment](#-vercel-deployment-serverless)
4. [Render Deployment](#-render-deployment)
5. [Heroku Deployment](#-heroku-deployment)
6. [Digital Ocean App Platform](#-digital-ocean-app-platform)
7. [AWS/GCP/Azure](#-awsgcpazure)
8. [Environment Variables](#-environment-variables)
9. [Troubleshooting](#-troubleshooting)

---

## 🎯 Quick Start

### Prerequisites
- GitHub repository with your code
- PostgreSQL database (or use platform-provided)
- Account on your chosen platform

### What Makes This Production-Ready?

✅ **Single Dockerfile** - Works on all container-based platforms  
✅ **Clean Serverless Adapter** - No hacks for Vercel/Netlify  
✅ **Smart Startup Script** - Handles Prisma generation + migrations automatically  
✅ **Multi-stage Build** - Optimized image size  
✅ **Health Checks** - Built-in monitoring  
✅ **Environment Agnostic** - Adapts to any platform's PORT/env setup  

---

## 🚂 Railway Deployment (Recommended)

**Best for:** Full-stack apps, databases included, easiest setup

### Steps:

1. **Create New Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select `FyliaCare/Golden-Errands`

2. **Add PostgreSQL Database**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway auto-connects it (sets `DATABASE_URL`)

3. **Configure Build**
   - Railway auto-detects the `Dockerfile`
   - No additional configuration needed!

4. **Set Environment Variables**
   ```
   NODE_ENV=production
   JWT_SECRET=your-secret-key-here
   ```
   (`DATABASE_URL` is auto-set by Railway)

5. **Deploy**
   - Click "Deploy"
   - Railway builds the Docker image
   - Your API is live! 🎉

### Custom Domain
- Go to Settings → Networking
- Add your custom domain
- Update DNS records as shown

**Deployment Time:** ~3-5 minutes  
**Cost:** $5/month (includes database)  
**Rating:** ⭐⭐⭐⭐⭐

---

## ⚡ Vercel Deployment (Serverless)

**Best for:** Serverless APIs, global edge distribution

### Steps:

1. **Import Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import `FyliaCare/Golden-Errands`

2. **Configure Database**
   - Option A: Use Vercel Postgres
     - Go to Storage tab → Create Database → Postgres
     - `DATABASE_URL` is auto-set
   
   - Option B: Use External Database
     - Go to Settings → Environment Variables
     - Add `DATABASE_URL` with your connection string

3. **Set Environment Variables**
   ```
   DATABASE_URL=postgresql://user:pass@host:5432/db
   NODE_ENV=production
   JWT_SECRET=your-secret-key-here
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel runs `npm run build:vercel` automatically
   - Your API is live at `https://your-project.vercel.app`

### Run Migrations
```bash
npm install -g vercel
vercel login
vercel link
vercel env pull .env
cd backend
npx prisma migrate deploy
```

**Deployment Time:** ~2-3 minutes  
**Cost:** Free tier available  
**Rating:** ⭐⭐⭐⭐ (serverless limitations)

---

## 🎨 Render Deployment

**Best for:** Simple Docker deployments, free tier

### Steps:

1. **Create Web Service**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect GitHub: `FyliaCare/Golden-Errands`

2. **Configure Service**
   - **Name:** golden-errands-api
   - **Environment:** Docker
   - **Dockerfile Path:** `./Dockerfile`
   - **Instance Type:** Free or Starter

3. **Add PostgreSQL Database**
   - Click "New" → "PostgreSQL"
   - Copy the "Internal Database URL"

4. **Set Environment Variables**
   ```
   DATABASE_URL=<your-internal-database-url>
   NODE_ENV=production
   JWT_SECRET=your-secret-key-here
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render builds and deploys automatically

**Deployment Time:** ~5-7 minutes  
**Cost:** Free tier available  
**Rating:** ⭐⭐⭐⭐

---

## 🟣 Heroku Deployment

**Best for:** Traditional PaaS, lots of add-ons

### Steps:

1. **Install Heroku CLI**
   ```bash
   # Windows (PowerShell)
   winget install Heroku.HerokuCLI
   
   # Mac
   brew tap heroku/brew && brew install heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create golden-errands-api
   ```

3. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret-key-here
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **Run Migrations**
   ```bash
   heroku run npm run prisma:deploy --app golden-errands-api
   ```

**Deployment Time:** ~5-8 minutes  
**Cost:** $7/month minimum  
**Rating:** ⭐⭐⭐

---

## 🌊 Digital Ocean App Platform

**Best for:** Flexible pricing, good performance

### Steps:

1. **Create App**
   - Go to [digitalocean.com/products/app-platform](https://digitalocean.com/products/app-platform)
   - Click "Create App"
   - Connect GitHub: `FyliaCare/Golden-Errands`

2. **Configure App**
   - **Type:** Web Service
   - **Dockerfile Path:** `Dockerfile`
   - **HTTP Port:** 3000

3. **Add PostgreSQL Database**
   - Click "Add Resource" → "Database" → "PostgreSQL"
   - Digital Ocean auto-connects it

4. **Set Environment Variables**
   ```
   NODE_ENV=production
   JWT_SECRET=your-secret-key-here
   ```

5. **Deploy**
   - Click "Create Resources"
   - Your app deploys automatically

**Deployment Time:** ~5-10 minutes  
**Cost:** $5/month (app) + $15/month (database)  
**Rating:** ⭐⭐⭐⭐

---

## ☁️ AWS/GCP/Azure

### AWS Elastic Beanstalk
```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p docker golden-errands-api

# Create environment with RDS
eb create golden-errands-env --database

# Deploy
eb deploy
```

### Google Cloud Run
```bash
# Build image
gcloud builds submit --tag gcr.io/PROJECT_ID/golden-errands-api

# Deploy
gcloud run deploy golden-errands-api \
  --image gcr.io/PROJECT_ID/golden-errands-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure Container Instances
```bash
# Build and push to ACR
az acr build --registry myregistry \
  --image golden-errands-api:latest .

# Deploy
az container create \
  --resource-group mygroup \
  --name golden-errands-api \
  --image myregistry.azurecr.io/golden-errands-api:latest \
  --dns-name-label golden-errands \
  --ports 3000
```

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db?schema=public` |
| `NODE_ENV` | Environment mode | `production` |
| `JWT_SECRET` | Secret for JWT tokens | `your-super-secret-key-min-32-chars` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `JWT_EXPIRY` | Token expiration | `15m` |
| `JWT_REFRESH_EXPIRY` | Refresh token expiration | `7d` |
| `CORS_ORIGIN` | Allowed CORS origins | `*` |

### Setting Variables by Platform

**Railway:**
```
Variables tab → Add variable
```

**Vercel:**
```
Settings → Environment Variables → Add
```

**Render:**
```
Environment tab → Add Environment Variable
```

**Heroku:**
```bash
heroku config:set VARIABLE=value
```

**Docker/Docker Compose:**
```yaml
environment:
  - DATABASE_URL=postgresql://...
  - NODE_ENV=production
```

---

## 🔧 Troubleshooting

### Build Failures

#### "P1012: DATABASE_URL not found"
**Cause:** Prisma trying to connect during build  
**Solution:** ✅ Already handled by our build scripts

#### "Module not found"
**Cause:** Dependencies not installed  
**Solution:** Ensure all dependencies are in `dependencies` not `devDependencies`

#### "TypeScript compilation errors"
**Cause:** Type errors in code  
**Solution:** Run `npm run build` locally to see errors

### Runtime Errors

#### "Cannot connect to database"
**Cause:** Invalid DATABASE_URL or database not accessible  
**Solution:**
1. Verify DATABASE_URL format: `postgresql://user:pass@host:port/db`
2. Check database is running and accessible
3. Verify firewall/network rules allow connections

#### "Port already in use"
**Cause:** Multiple instances or port conflict  
**Solution:** Platform will set PORT automatically, don't hardcode it

#### "Prisma Client not generated"
**Cause:** Generation failed during startup  
**Solution:** Check logs for Prisma errors, verify DATABASE_URL is correct

### Performance Issues

#### "Slow cold starts (serverless)"
**Expected Behavior:** First request after idle takes 2-5 seconds  
**Solutions:**
- Use Vercel Pro for faster cold starts
- Implement warming pings
- Consider container-based hosting (Railway/Render)

#### "Out of memory"
**Cause:** Insufficient resources  
**Solution:** Upgrade instance size or optimize queries

---

## 📊 Platform Comparison

| Platform | Type | Difficulty | Cost/Month | Database | Cold Starts | Rating |
|----------|------|------------|------------|----------|-------------|--------|
| **Railway** | Container | ⭐ Easy | $5 | Included | No | ⭐⭐⭐⭐⭐ |
| **Vercel** | Serverless | ⭐⭐ Medium | Free-$20 | Separate | Yes | ⭐⭐⭐⭐ |
| **Render** | Container | ⭐ Easy | Free-$7 | Separate | No | ⭐⭐⭐⭐ |
| **Heroku** | PaaS | ⭐⭐ Medium | $7+ | Add-on | No | ⭐⭐⭐ |
| **DigitalOcean** | Container | ⭐⭐ Medium | $5-20 | Separate | No | ⭐⭐⭐⭐ |

---

## ✅ Pre-Deployment Checklist

- [ ] All tests pass locally
- [ ] Database migrations created
- [ ] Environment variables documented
- [ ] Health check endpoint working (`/health`)
- [ ] Error handling tested
- [ ] CORS configured correctly
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] Database connection string is correct
- [ ] `.env` file in `.gitignore`
- [ ] Dockerfile builds successfully locally

### Test Locally

```bash
# Test Docker build
docker build -t golden-errands-api .

# Test Docker run
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e NODE_ENV="production" \
  -e JWT_SECRET="test-secret" \
  golden-errands-api

# Test API
curl http://localhost:3000/health
```

---

## 🎯 Recommended Workflow

### For Development
1. **Local:** `npm run dev` with local PostgreSQL
2. **Staging:** Deploy to Vercel preview (serverless)
3. **Production:** Deploy to Railway (container)

### For Production
1. **Choose Platform:** Railway for simplicity, Vercel for scale
2. **Set up Database:** Use platform's built-in or external
3. **Configure Environment:** Set all required variables
4. **Deploy:** Push to main branch
5. **Run Migrations:** Use CLI or migration script
6. **Test:** Verify all endpoints work
7. **Monitor:** Check logs and metrics

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deployment Guides](https://www.prisma.io/docs/guides/deployment)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices)

---

## 🆘 Still Having Issues?

1. **Check Logs:** Every platform has detailed logs
2. **Verify Environment Variables:** Most issues are config-related
3. **Test Locally:** Use Docker to replicate production
4. **Database Connection:** Use tools like pgAdmin to verify connectivity
5. **Review Startup Script:** Check `backend/start-production.js` logs

---

## 🎉 Success!

Your Golden Errands API is now production-ready and can be deployed to **any platform** with confidence!

**Recommended:** Start with Railway for the smoothest experience, then scale to other platforms as needed.

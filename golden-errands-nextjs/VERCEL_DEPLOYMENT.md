# 🚀 Vercel Deployment Guide - Golden Errands

## Why Vercel?
- ✅ **FREE Forever** (No expiration like Railway)
- ✅ Built specifically for Next.js
- ✅ Automatic deployments from GitHub
- ✅ Free PostgreSQL database (Vercel Postgres)
- ✅ 100GB bandwidth/month (free tier)
- ✅ Unlimited projects and deployments
- ✅ Custom domains included
- ✅ Global CDN and edge network

---

## 📋 Step-by-Step Deployment

### 1️⃣ **Sign Up for Vercel**
1. Go to: https://vercel.com/signup
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account

### 2️⃣ **Import Your Project**
1. Click **"Add New..."** → **"Project"**
2. Find and select: **FyliaCare/Golden-Errands**
3. Click **"Import"**

### 3️⃣ **Configure Project Settings**

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `golden-errands-nextjs`

**Build Command:** `prisma generate && next build` (already set in vercel.json)

**Install Command:** `npm install` (auto-detected)

### 4️⃣ **Set Up Database (Vercel Postgres)**

#### Option A: Use Vercel Postgres (Recommended - FREE)
1. In Vercel Dashboard → Go to **Storage** tab
2. Click **"Create Database"** → Select **"Postgres"**
3. Name it: `golden-errands-db`
4. Click **"Create"**
5. Vercel will automatically add `DATABASE_URL` to your environment variables

#### Option B: Continue Using Neon (Your Current Database)
1. Go to your Neon dashboard: https://console.neon.tech
2. Copy your connection string
3. In Vercel project → **Settings** → **Environment Variables**
4. Add: `DATABASE_URL` = `your-neon-connection-string`

### 5️⃣ **Add Environment Variables**

Go to: **Project Settings** → **Environment Variables**

Add these variables for **Production**, **Preview**, and **Development**:

```env
# Database (from Vercel Postgres or Neon)
DATABASE_URL=postgresql://username:password@host/database

# JWT Secrets (generate new secure keys)
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production-min-32-chars

# API URL (will be your Vercel domain)
NEXT_PUBLIC_API_URL=https://your-project.vercel.app

# Node Environment
NODE_ENV=production
```

**🔑 Generate Secure JWT Secrets:**
Open PowerShell and run:
```powershell
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate JWT_REFRESH_SECRET  
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 6️⃣ **Deploy**
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. Your app will be live at: `https://your-project.vercel.app`

### 7️⃣ **Run Database Migrations**

After first deployment, run migrations:

1. In Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Copy your `DATABASE_URL`
3. Open terminal locally:

```powershell
cd "C:\Users\Jay Monty\Desktop\Projects\delivery_platform\Golden-Errands\golden-errands-nextjs"

# Set DATABASE_URL temporarily
$env:DATABASE_URL="your-vercel-postgres-url"

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npx prisma db seed
```

**OR** use Vercel CLI to run migrations on their servers:

```powershell
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run migration remotely
vercel env pull .env.production
npx prisma migrate deploy
```

---

## 🔄 Automatic Deployments

After initial setup:
- **Push to `main` branch** = Automatic production deployment
- **Push to other branches** = Preview deployments
- **Pull Requests** = Automatic preview URLs

---

## 🌐 Custom Domain (Optional)

### Add Your Own Domain:
1. Go to Project → **Settings** → **Domains**
2. Add your domain (e.g., `goldenerrands.com`)
3. Update DNS records as instructed by Vercel
4. SSL certificate is automatically provisioned

---

## 📊 Vercel Free Tier Limits

| Resource | Free Tier | Your Usage |
|----------|-----------|------------|
| Bandwidth | 100 GB/month | Low (API-heavy) |
| Build Time | 6000 minutes/month | ~5 min/deploy |
| Serverless Executions | 100 GB-hours | Low-medium |
| Projects | Unlimited | 1 project |
| Team Members | 1 | Just you |
| Storage (Postgres) | 256 MB | Sufficient for start |

**You'll be well within limits!** ✅

---

## 🐛 Troubleshooting

### Build Fails with Prisma Error:
```bash
# Add this to package.json scripts:
"postinstall": "prisma generate"
```

### Environment Variables Not Working:
- Make sure they're added to **all environments** (Production, Preview, Development)
- Redeploy after adding variables

### Database Connection Issues:
- Verify `DATABASE_URL` format: `postgresql://user:pass@host:5432/db?sslmode=require`
- Make sure SSL mode is enabled for Postgres

### API Routes Return 404:
- Check that `vercel.json` is in root of `golden-errands-nextjs` folder
- Verify API routes are in `app/api/` directory

---

## 🎯 Next Steps After Deployment

1. ✅ Test all pages and API routes
2. ✅ Create first admin user (use `/api/auth/register-admin`)
3. ✅ Test driver registration and client registration
4. ✅ Verify mobile responsiveness on real devices
5. ✅ Set up monitoring (Vercel provides analytics)
6. ✅ Configure custom domain (optional)

---

## 💰 Cost Comparison

| Platform | Free Tier | Expires? | Best For |
|----------|-----------|----------|----------|
| **Vercel** | 100GB/mo | ❌ Never | Next.js apps ✅ |
| Railway | $5 credit | ✅ Yes | Any framework |
| Render | 750 hours | ❌ Never | Full-stack apps |
| Netlify | 100GB/mo | ❌ Never | Static/JAMstack |

**Vercel is the best choice for your Next.js project!** 🏆

---

## 📞 Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions

---

**Ready to deploy?** Follow the steps above and your app will be live in minutes! 🚀

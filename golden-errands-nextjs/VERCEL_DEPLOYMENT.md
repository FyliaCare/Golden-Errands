# 🚀 Vercel Deployment Guide - Golden Errands

## Quick Deploy to Vercel

**GitHub Repository**: https://github.com/FyliaCare/Golden-Errands  
**Branch**: main  
**Project**: golden-errands-nextjs

---

## 📋 **Pre-Deployment Checklist**

- [x] Code committed to GitHub
- [x] Next.js project configured
- [x] vercel.json created
- [x] .env.example provided
- [ ] Vercel account created
- [ ] Database provider chosen

---

## 🎯 **Step-by-Step Deployment**

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project

1. Click **"Add New Project"**
2. Select **"Import Git Repository"**
3. Find **"FyliaCare/Golden-Errands"** in the list
4. Click **"Import"**

### Step 3: Configure Project

```
Framework Preset: Next.js (Auto-detected ✅)
Root Directory: golden-errands-nextjs
Build Command: npm run build (Auto-configured)
Output Directory: .next (Auto-configured)
Install Command: npm install (Auto-configured)
```

**Important**: Set **Root Directory** to `golden-errands-nextjs`

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add these:

#### Required Variables

```bash
# Database (we'll add this in Step 5)
DATABASE_URL=postgresql://...

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# JWT Refresh Secret (generate another random string)
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-too

# Node Environment
NODE_ENV=production
```

**Generate Secure Secrets:**
```powershell
# Run this to generate random secrets
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
node -e "console.log('JWT_REFRESH_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Add Database (Vercel Postgres)

#### Option A: Vercel Postgres (Recommended)

1. In your Vercel project dashboard, go to **"Storage"** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Choose a region (closest to your users)
5. Click **"Create"**
6. Vercel will automatically add `DATABASE_URL` to your environment variables ✅

#### Option B: External Database (Neon, Supabase, Railway)

**Neon** (Recommended alternative):
1. Go to https://neon.tech
2. Sign up and create a new project
3. Copy the connection string
4. Add as `DATABASE_URL` in Vercel

**Supabase**:
1. Go to https://supabase.com
2. Create new project
3. Get connection string from Settings → Database
4. Add as `DATABASE_URL` in Vercel

### Step 6: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes for build ⏱️
3. You'll get a URL like: `https://golden-errands-xyz.vercel.app`

---

## 🗄️ **Database Setup After Deployment**

### Option 1: Using Vercel CLI

```powershell
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
cd "c:\Users\Jay Monty\Desktop\Projects\delivery_platform\Golden-Errands\golden-errands-nextjs"
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npx prisma db seed
```

### Option 2: Using Vercel Dashboard

1. Go to your project → **Settings** → **Environment Variables**
2. Copy the `DATABASE_URL`
3. Update your local `.env.local` with this URL
4. Run locally:
```powershell
npx prisma migrate deploy
npx prisma db seed
```

---

## 🔧 **Post-Deployment Configuration**

### 1. Set Up Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your custom domain (e.g., `goldenerrands.com`)
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### 2. Configure CORS (if needed)

Already configured in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" }
      ]
    }
  ]
}
```

### 3. Set Up Monitoring

1. Go to **Analytics** tab
2. Enable **Web Analytics** (free)
3. Optional: Add **Speed Insights**

---

## 🧪 **Testing Your Deployment**

### Test Public Pages
```
https://your-app.vercel.app/home
https://your-app.vercel.app/login
```

### Test Login
Use demo credentials:
```
Email: customer@example.com
Password: customer@2024
```

### Test Dashboard
After login:
```
https://your-app.vercel.app/dashboard
https://your-app.vercel.app/dashboard/new-order
https://your-app.vercel.app/dashboard/orders
https://your-app.vercel.app/dashboard/drivers
https://your-app.vercel.app/dashboard/documents
```

---

## 🔄 **Automatic Deployments**

Vercel automatically deploys when you push to GitHub:

```powershell
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Vercel automatically deploys! 🚀
```

**Preview Deployments**: Every branch gets its own URL
**Production Deployments**: main branch → production URL

---

## 🐛 **Troubleshooting**

### Build Fails

**Error**: `Cannot find module 'prisma'`
```bash
Solution: Ensure postinstall script is in package.json:
"postinstall": "prisma generate"
```

**Error**: `Database connection failed`
```bash
Solution: Check DATABASE_URL environment variable
Go to Settings → Environment Variables → Verify DATABASE_URL
```

### Runtime Errors

**Error**: `JWT_SECRET is not defined`
```bash
Solution: Add JWT_SECRET and JWT_REFRESH_SECRET to environment variables
```

**Error**: `Prisma Client not initialized`
```bash
Solution: Redeploy to trigger prisma generate
Go to Deployments → Click "Redeploy"
```

### Database Issues

**Error**: `Can't reach database server`
```bash
Solution 1: Check database is running (Vercel Postgres or external)
Solution 2: Verify DATABASE_URL is correct
Solution 3: Check database allows connections from Vercel IPs
```

**Error**: `Table does not exist`
```bash
Solution: Run migrations on production database
Use Vercel CLI or connect to DB directly and run migrations
```

---

## 📊 **Performance Optimization**

### Already Configured

- ✅ Static page optimization
- ✅ Image optimization (Next.js Image component)
- ✅ Automatic code splitting
- ✅ Edge network CDN
- ✅ HTTP/2 and Brotli compression
- ✅ Tree shaking

### Additional Optimizations

1. **Enable ISR (Incremental Static Regeneration)**
```typescript
// In dashboard pages, add revalidation
export const revalidate = 60; // Revalidate every 60 seconds
```

2. **Add Caching Headers**
```typescript
// In API routes
export const dynamic = 'force-dynamic'; // For real-time data
// or
export const revalidate = 3600; // Cache for 1 hour
```

3. **Use Edge Functions** (optional)
```typescript
// In API routes
export const runtime = 'edge';
```

---

## 💰 **Pricing**

### Vercel Free Tier (Hobby)
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ✅ Web Analytics
- ✅ Perfect for testing!

### Vercel Pro ($20/month)
- Everything in Free
- Team collaboration
- More bandwidth
- Priority support
- Commercial use allowed

### Vercel Postgres Pricing
- **Free Tier**: 256 MB storage, 60 hours compute
- **Pro**: $24/month for 512 MB, more compute
- **Alternative**: Use Neon (generous free tier)

---

## 🎯 **Quick Deployment Checklist**

### Before Deploying
- [x] Code pushed to GitHub
- [x] Environment variables prepared
- [ ] Vercel account created
- [ ] Database provider chosen

### During Deployment
- [ ] Project imported to Vercel
- [ ] Root directory set to `golden-errands-nextjs`
- [ ] Environment variables added
- [ ] Database connected
- [ ] First deployment successful

### After Deployment
- [ ] Database migrations run
- [ ] Demo data seeded
- [ ] Login tested
- [ ] All pages accessible
- [ ] API endpoints working
- [ ] Custom domain configured (optional)

---

## 🔗 **Useful Links**

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Next.js on Vercel**: https://vercel.com/docs/frameworks/nextjs
- **Vercel Postgres**: https://vercel.com/docs/storage/vercel-postgres
- **Your GitHub Repo**: https://github.com/FyliaCare/Golden-Errands

---

## 🎊 **You're Ready to Deploy!**

### Quick Steps Summary:

1. **Sign up**: https://vercel.com → Continue with GitHub
2. **Import**: Select FyliaCare/Golden-Errands
3. **Configure**: Set root directory to `golden-errands-nextjs`
4. **Add Secrets**: JWT_SECRET, JWT_REFRESH_SECRET
5. **Add Database**: Create Vercel Postgres or use Neon
6. **Deploy**: Click Deploy button
7. **Migrate**: Run database migrations
8. **Test**: Visit your-app.vercel.app and login!

**Estimated Time**: 10-15 minutes ⏱️

---

## 📞 **Need Help?**

- Check Vercel deployment logs in dashboard
- Review environment variables
- Verify database connection
- Check this guide's troubleshooting section
- Contact Vercel support (very responsive!)

---

**Happy Deploying! 🚀**

*Your Golden Errands platform will be live in minutes!*

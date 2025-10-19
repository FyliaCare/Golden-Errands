# Vercel Deployment Guide

## 🚀 Deploy to Vercel in 3 Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Vercel deployment ready"
git push origin main
```

### 2. Import to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import: `FyliaCare/Golden-Errands`
3. Configure:
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** `npm run vercel-build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### 3. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_super_secure_secret_key_here
NODE_ENV=production
```

### 4. Deploy!
Click "Deploy" - Vercel will automatically build and deploy.

## 📊 Database Options

### Option 1: Vercel Postgres (Easiest)
1. In Vercel project → Storage tab
2. Create → Postgres
3. DATABASE_URL automatically added

### Option 2: Neon (Free tier)
1. Sign up at [neon.tech](https://neon.tech)
2. Create project → Copy connection string
3. Add as DATABASE_URL in Vercel

### Option 3: Supabase
1. Sign up at [supabase.com](https://supabase.com)
2. Create project → Get connection string
3. Add as DATABASE_URL in Vercel

## ✅ After Deployment

Your API will be at: `https://your-project.vercel.app`

Test endpoints:
- `GET /health` - Health check
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login

## 🐛 Troubleshooting

**Build fails?**
- Check DATABASE_URL is set in Vercel environment variables
- Ensure all dependencies are in package.json

**Runtime errors?**
- Check Vercel Functions logs
- Verify database is accessible from Vercel

**Migrations not running?**
- Vercel doesn't auto-run migrations
- Run locally: `npx prisma migrate deploy`
- Or use Vercel CLI: `vercel env pull` then migrate

---

**That's it! Simple Vercel deployment ready!** 🎉

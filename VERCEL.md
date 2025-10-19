# Vercel Deployment - Complete Guide

## 🚀 Quick Deploy (3 Steps)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Vercel deployment ready"
git push origin main
```

### Step 2: Import to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select: `FyliaCare/Golden-Errands`
4. **DO NOT change any build settings** - Use defaults
5. Click "Deploy"

### Step 3: Add Environment Variables
After first deployment, go to Settings → Environment Variables:

**Required:**
```
DATABASE_URL=your_postgresql_connection_string_here
JWT_SECRET=your_super_secure_random_secret_key_32_chars_min
```

**Optional:**
```
NODE_ENV=production
CORS_ORIGIN=*
```

Then **redeploy** from Deployments tab.

## 📊 Database Setup

### Option 1: Vercel Postgres (Recommended - Easiest)
1. In your Vercel project → "Storage" tab
2. Click "Create" → Select "Postgres"
3. Follow prompts
4. `DATABASE_URL` automatically added to your project
5. Redeploy

### Option 2: Neon (Free Tier Available)
1. Sign up: [neon.tech](https://neon.tech)
2. Create project → Copy connection string
3. Add as `DATABASE_URL` in Vercel → Settings → Environment Variables
4. Redeploy

### Option 3: Supabase (Free Tier Available)
1. Sign up: [supabase.com](https://supabase.com)
2. Create project → Database Settings → Connection String
3. Use "Connection Pooling" string
4. Add as `DATABASE_URL` in Vercel
5. Redeploy

## 🏗️ Project Structure

```
Golden-Errands/
├── api/
│   └── index.js          ← Vercel serverless entry point
├── backend/
│   ├── src/              ← Your Express app
│   ├── prisma/           ← Database schema
│   ├── dist/             ← Built TypeScript (created during build)
│   ├── build-vercel.js   ← Build script (handles Prisma)
│   └── package.json
├── vercel.json           ← Vercel configuration
└── VERCEL.md            ← This file
```

## ⚙️ How It Works

**Build Phase:**
1. Vercel runs: `cd backend && npm install && npm run vercel-build`
2. `build-vercel.js` sets placeholder DATABASE_URL
3. Prisma generates client (for TypeScript types)
4. TypeScript compiles to `backend/dist/`

**Runtime Phase:**
1. Request hits Vercel
2. `api/index.js` is called (serverless function)
3. Prisma regenerates with real DATABASE_URL
4. Express app handles request
5. Response sent back

## ✅ After Deployment

Your API will be at: `https://your-project.vercel.app`

### Test Endpoints:
```bash
# Health check
curl https://your-project.vercel.app/health

# Register user
curl -X POST https://your-project.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","firstName":"Test","lastName":"User"}'

# Login
curl -X POST https://your-project.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

## 🐛 Troubleshooting

### "404: NOT_FOUND"
- **Cause:** Vercel can't find the function
- **Fix:** Ensure `api/index.js` exists and `vercel.json` has correct rewrites
- **Solution:** Redeploy from Vercel dashboard

### "No framework detected"
- **Cause:** Vercel doesn't recognize project type
- **Fix:** `vercel.json` now specifies build commands explicitly
- **Solution:** Already fixed in current setup

### "P1012: DATABASE_URL not found"
- **Cause:** DATABASE_URL not set in Vercel
- **Fix:** Add in Settings → Environment Variables → Redeploy

### "Prisma Client not generated"
- **Cause:** Cold start issue
- **Fix:** `api/index.js` regenerates Prisma on each cold start
- **Solution:** Already handled automatically

### "Function timeout"
- **Cause:** Long-running operation
- **Fix:** Vercel free tier has 10s limit, pro has 60s
- **Solution:** Optimize database queries or upgrade plan

### Database Connection Errors
- **Cause:** DATABASE_URL wrong or database unreachable
- **Fix:** 
  - Verify connection string is correct
  - Check database allows connections from Vercel IPs
  - Use connection pooling (for Supabase/Neon)

## 📝 Important Notes

1. **Migrations:** Run locally or via Vercel CLI
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

2. **Environment Variables:** Must redeploy after adding/changing

3. **Logs:** View in Vercel Dashboard → Functions → Logs

4. **Cold Starts:** First request may be slow (Prisma generation)

5. **File Uploads:** Use external storage (S3, Cloudinary) - Vercel is ephemeral

## 🎯 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] First deployment completed
- [ ] DATABASE_URL added in Vercel
- [ ] JWT_SECRET added in Vercel
- [ ] Project redeployed
- [ ] `/health` endpoint returns 200
- [ ] Can register/login users
- [ ] Database queries work

---

**Your Golden Errands API is now live on Vercel!** 🎉

For issues: Check Vercel Function logs in dashboard.

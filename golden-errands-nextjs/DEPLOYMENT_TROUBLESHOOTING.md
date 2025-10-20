# 🔧 Deployment Troubleshooting Guide

## Build Error: "Exited with status 1"

### ✅ Local Build Success
Your project builds successfully locally, which means the code is fine. The issue is with the deployment platform configuration.

---

## 🚨 Common Causes & Fixes

### 1️⃣ **Root Directory Not Set** (Most Common)

**Render:**
- Go to your service settings
- Set **Root Directory**: `golden-errands-nextjs`
- Click "Save Changes"
- Trigger manual deploy

**Vercel:**
- Project Settings → General
- Set **Root Directory**: `golden-errands-nextjs`
- Redeploy

---

### 2️⃣ **Missing Environment Variables**

Required variables for production:

```env
DATABASE_URL=postgresql://username:password@host:5432/database
JWT_SECRET=9972bf38050211f5ef6faf0eeb6a3e8a6180e675dc89f586f65acb0c047409d4
JWT_REFRESH_SECRET=1fb4603d52e0c2f313042de160a042770b23fdfffca1681cc908366e1133a66d
NODE_ENV=production
```

**How to Fix:**

**Render:**
1. Go to Environment tab
2. Add all 4 variables above
3. DATABASE_URL: Use the auto-connected value from Render Postgres
4. Save and redeploy

**Vercel:**
1. Settings → Environment Variables
2. Add all 4 variables
3. Make sure they're set for "Production"
4. Redeploy

---

### 3️⃣ **Database Not Connected**

**Render:**
- Your database should auto-connect via `render.yaml`
- Check Environment tab → DATABASE_URL should be set automatically
- If missing, manually add it from the database's "Connections" tab

**Vercel:**
- Create Vercel Postgres in Storage tab
- DATABASE_URL is added automatically
- Or use external DB (Neon, Railway, etc.)

---

### 4️⃣ **Build Command Issues**

**Current Build Command:**
```bash
npm install && npx prisma generate && npm run build
```

**Alternative (if issues):**
```bash
npm ci && npx prisma generate && npm run build
```

**Where to Change:**

**Render:**
- Settings → Build & Deploy
- Update "Build Command"
- Save and redeploy

**Vercel:**
- Uses `vercel.json` which is already configured
- Or set in Project Settings → Build & Development Settings

---

### 5️⃣ **Node Version Mismatch**

**Check your local Node version:**
```powershell
node --version
```

**Set in deployment platform:**

**Render:**
- Settings → Environment
- Add: `NODE_VERSION` = `20` (or your version)

**Vercel:**
- Automatically uses Node 20.x
- Or specify in `package.json`:
```json
"engines": {
  "node": ">=18.0.0"
}
```

---

## 🔍 Debug Steps

### Step 1: Check Deployment Logs
Look for specific error messages in build logs:
- Database connection errors
- Missing dependencies
- TypeScript errors
- Prisma generation failures

### Step 2: Verify Settings

**Render Checklist:**
- ✅ Root Directory: `golden-errands-nextjs`
- ✅ Build Command: `npm install && npx prisma generate && npm run build`
- ✅ Start Command: `npm start`
- ✅ All 4 environment variables set
- ✅ Database created and connected

**Vercel Checklist:**
- ✅ Root Directory: `golden-errands-nextjs`
- ✅ Framework: Next.js
- ✅ All 4 environment variables set
- ✅ Build Command: Uses `vercel.json` (already configured)

### Step 3: Try Manual Deploy

**Render:**
```
Settings → Manual Deploy → Deploy Latest Commit
```

**Vercel:**
```
Deployments → Redeploy → Use Existing Build Cache: OFF
```

---

## 🎯 Quick Fix Actions

### Action 1: Force Clean Rebuild

**Render:**
1. Settings → Clear Build Cache
2. Manual Deploy

**Vercel:**
1. Redeploy without cache
2. Or delete `.next` in deployment

### Action 2: Verify Package.json Scripts

Your scripts should look like:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### Action 3: Check Prisma Schema

Run locally to ensure schema is valid:
```powershell
cd golden-errands-nextjs
npx prisma generate
npx prisma validate
```

---

## 💡 Most Likely Issue

Based on "Exited with status 1" with no specific error:

**99% it's the Root Directory setting:**

1. Go to your deployment platform dashboard
2. Find your service/project settings
3. Set **Root Directory** to: `golden-errands-nextjs`
4. Save and trigger a new deployment

The build is trying to run from the root `Golden-Errands/` folder instead of `Golden-Errands/golden-errands-nextjs/` where your `package.json` lives.

---

## 📞 Still Not Working?

1. **Copy your full build log** from deployment platform
2. Look for the first error message (usually near the top)
3. Share the specific error message

Common error patterns:
- `Cannot find module` → Missing dependency or wrong directory
- `ENOENT: no such file` → Wrong root directory
- `Database connection failed` → DATABASE_URL not set
- `Prisma schema not found` → Wrong root directory
- `Build script not found` → Wrong root directory

---

## ✅ Success Checklist

After fixing, you should see:
- ✅ Build completes successfully
- ✅ Deployment succeeds
- ✅ Site is accessible
- ✅ Can login with demo accounts
- ✅ Dashboards load correctly

---

**Most Important: Set Root Directory to `golden-errands-nextjs`** 🎯

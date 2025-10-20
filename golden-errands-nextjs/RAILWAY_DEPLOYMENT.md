# 🚂 Railway Deployment Guide - Golden Errands

## Quick Deploy to Railway

**Railway.app is now open in Simple Browser!**

Railway is **PERFECT** for your Next.js + PostgreSQL app because:
- ✅ Auto-detects Next.js
- ✅ Built-in PostgreSQL (no separate setup!)
- ✅ Simple environment variables
- ✅ $5 free credit/month
- ✅ Fast deployments
- ✅ Better reliability than Vercel for this project

---

## 📋 **Step-by-Step Railway Deployment**

### **Step 1: Sign Up** (1 minute)

In the Simple Browser (Railway.app):

1. Click **"Login"** or **"Start a New Project"**
2. Choose **"Login with GitHub"** ⭐ (Recommended)
3. Authorize Railway to access your GitHub
4. You'll see the Railway dashboard

---

### **Step 2: Create New Project** (2 minutes)

1. Click **"New Project"** (big purple button)
2. Select **"Deploy from GitHub repo"**
3. Find and select: **"FyliaCare/Golden-Errands"**
4. Railway will ask: **"Select a directory"**
   - Choose: `golden-errands-nextjs` ⚠️ **IMPORTANT!**
5. Click **"Deploy"**

Railway will start building immediately!

---

### **Step 3: Add PostgreSQL Database** (1 minute)

While the app is building:

1. In your project, click **"+ New"** button
2. Select **"Database"**
3. Choose **"PostgreSQL"**
4. Railway creates and links it automatically! ✅

The `DATABASE_URL` is **automatically added** to your app's environment variables!

---

### **Step 4: Add Environment Variables** (2 minutes)

1. Click on your **Next.js service** (not the database)
2. Go to **"Variables"** tab
3. Click **"+ New Variable"**
4. Add these:

```bash
JWT_SECRET=0ff35b6e6e81c393a54175d7f12e2c9c811d94fdad78dec66cb24a761c94d944

JWT_REFRESH_SECRET=056f405fd621ad9c81d8dc805d5fc08e1f15dfb1a4d84d87808abbcbaa27a6d4

NODE_ENV=production
```

**Note**: `DATABASE_URL` is already added automatically by Railway when you created the Postgres database!

---

### **Step 5: Configure Settings** (1 minute)

1. Still in your Next.js service
2. Go to **"Settings"** tab
3. Scroll to **"Deploy"** section
4. Verify these are set:
   ```
   Root Directory: golden-errands-nextjs
   Build Command: prisma generate && npm run build
   Start Command: npm start
   ```
5. Railway auto-detects these from your `railway.json` ✅

---

### **Step 6: Wait for Deployment** (3-5 minutes)

1. Go to **"Deployments"** tab
2. Click on the active deployment
3. Watch the logs:
   - Installing dependencies
   - Generating Prisma Client
   - Building Next.js
   - Starting server

4. When you see: **"Deployment successful"** ✅
5. You'll get a public URL like: `https://your-app.up.railway.app`

---

### **Step 7: Run Database Migrations** (2 minutes)

After deployment succeeds:

**Option A: Using Railway CLI** (Recommended)

```powershell
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
cd "c:\Users\Jay Monty\Desktop\Projects\delivery_platform\Golden-Errands\golden-errands-nextjs"
railway link

# Run migrations
railway run npx prisma migrate deploy

# Seed demo data
railway run npx prisma db seed
```

**Option B: Using Railway Shell**

1. In Railway dashboard, click your Next.js service
2. Click **"..."** menu → **"Shell"**
3. In the terminal that opens, run:
```bash
npx prisma migrate deploy
npx prisma db seed
```

---

## 🎯 **Your Environment Variables Checklist**

Railway should show these variables:

```bash
✅ DATABASE_URL (auto-added by PostgreSQL service)
✅ JWT_SECRET (you added)
✅ JWT_REFRESH_SECRET (you added)
✅ NODE_ENV=production (you added)
```

---

## 🧪 **Testing Your Railway Deployment**

### 1. Get Your URL
```
Railway assigns: https://your-app-name.up.railway.app
Find it in: Settings → Domains
```

### 2. Test Public Pages
```
https://your-app.up.railway.app/home
https://your-app.up.railway.app/login
```

### 3. Test Login
```
Email: customer@example.com
Password: customer@2024
```

### 4. Test Dashboard
After login, test all features:
- Dashboard overview
- Create new order
- View all orders
- Manage drivers
- Documents with Excel export

---

## 🔄 **Automatic Deployments**

Every push to GitHub **automatically deploys**:

```powershell
# Make changes
git add .
git commit -m "Updated feature"
git push origin main

# Railway auto-deploys! 🚂
```

---

## 💰 **Railway Pricing**

### Free Trial
- ✅ $5 free credit (no credit card required)
- ✅ Enough for ~500 hours of usage
- ✅ Perfect for testing and small apps

### Developer Plan ($5/month)
- 500 hours of usage
- Perfect for production apps
- Additional usage: $0.000231/min

### Your App Usage
- Next.js service: ~$3-4/month
- PostgreSQL: ~$1-2/month
- **Total: ~$5/month** with normal traffic

---

## 🎨 **Railway vs Vercel**

| Feature | Railway | Vercel |
|---------|---------|--------|
| **Next.js Support** | ✅ Excellent | ✅ Excellent |
| **Database Included** | ✅ Yes (PostgreSQL) | ⚠️ Separate service |
| **Setup Complexity** | ✅ Simpler | ⚠️ More complex |
| **Deployment Speed** | ✅ 3-5 min | ⚠️ Hit timeouts |
| **Reliability** | ✅ Very stable | ⚠️ Platform issues |
| **Free Tier** | $5 credit | 100GB bandwidth |
| **Best For** | Full-stack apps | Frontend-heavy |

**For your app: Railway is better!** ⭐

---

## 🔧 **Troubleshooting**

### Build Fails
**Error**: "Cannot find module 'prisma'"
```bash
Solution: Railway auto-runs postinstall script
Check package.json has:
"postinstall": "prisma generate"
```

### Database Connection Fails
**Error**: "Can't reach database server"
```bash
Solution:
1. Verify PostgreSQL service is running
2. Check DATABASE_URL is in variables
3. Redeploy the Next.js service
```

### App Won't Start
**Error**: "Application failed to respond"
```bash
Solution:
1. Check logs in Deployments tab
2. Verify start command: "npm start"
3. Check Node version compatibility
```

---

## 📊 **Railway Dashboard Features**

### Metrics Tab
- CPU usage
- Memory usage
- Request count
- Response times

### Logs Tab
- Real-time application logs
- Build logs
- Error tracking
- Search functionality

### Deployments Tab
- Deployment history
- Rollback to previous versions
- Build logs for each deployment

---

## 🎯 **Post-Deployment Checklist**

### Immediately After Deploy
- [ ] Deployment shows "Success"
- [ ] Public URL is accessible
- [ ] Home page loads
- [ ] Login page works

### Database Setup
- [ ] PostgreSQL service created
- [ ] DATABASE_URL added to variables
- [ ] Migrations run successfully
- [ ] Demo data seeded

### Testing
- [ ] Can log in with demo credentials
- [ ] Dashboard loads with data
- [ ] Can create new order
- [ ] Can view all orders
- [ ] Can manage drivers
- [ ] Can export documents to Excel

### Optional
- [ ] Add custom domain
- [ ] Enable auto-scaling
- [ ] Set up monitoring alerts

---

## 🌟 **Custom Domain (Optional)**

After deployment:

1. Go to **Settings** → **Domains**
2. Click **"+ Custom Domain"**
3. Enter your domain: `goldenerrands.com`
4. Add DNS records as shown:
   ```
   Type: CNAME
   Name: @
   Value: [your-app].up.railway.app
   ```
5. Wait for SSL certificate (automatic)

---

## 📞 **Railway Support**

- **Docs**: https://docs.railway.app
- **Discord**: Very active community
- **Status**: https://status.railway.app
- **GitHub**: https://github.com/railwayapp/railway

---

## 🎊 **You're Ready to Deploy!**

### Quick Steps:
1. ✅ Railway.app opened in Simple Browser
2. ✅ Code pushed to GitHub
3. ✅ `railway.json` configuration added

### Now Do This:
1. **Sign up** with GitHub (in Simple Browser)
2. **Create project** from your repo
3. **Select directory**: `golden-errands-nextjs`
4. **Add PostgreSQL** database
5. **Add secrets** (JWT keys)
6. **Wait 5 minutes** for deployment
7. **Run migrations** via Railway CLI or Shell
8. **Test your app**! 🎉

---

## 💡 **Why Railway Will Work**

Your Vercel builds succeeded - proving your code is perfect!

Railway advantages:
- ✅ No timeout issues
- ✅ Better handling of serverless functions
- ✅ Integrated PostgreSQL
- ✅ Simpler configuration
- ✅ More reliable for full-stack apps

**Estimated Total Time: 10-15 minutes from now to live app!** ⏱️

---

**Ready? Follow the steps in the Simple Browser! 🚂🚀**

*Railway.app is loaded and waiting for you!*

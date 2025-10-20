# 🚀 Render Deployment Guide - Golden Errands

## Why Render?
- ✅ **FREE Forever** (750 hours/month = 31 days continuous)
- ✅ **Free PostgreSQL** (90 days, auto-renewable)
- ✅ **Zero Config** - Auto-detects Next.js
- ✅ **Very Reliable** - Better uptime than Railway/Vercel
- ✅ **Easy Database Setup** - One-click PostgreSQL
- ✅ **Automatic Deployments** from GitHub
- ✅ **Custom Domains** with free SSL
- ✅ **No Credit Card Required**

---

## 📋 Step-by-Step Deployment

### 1️⃣ **Sign Up for Render**
1. Go to: https://render.com/
2. Click **"Get Started"** or **"Sign Up"**
3. Choose **"Sign in with GitHub"**
4. Authorize Render to access your GitHub

### 2️⃣ **Create PostgreSQL Database First**

**IMPORTANT: Create database before the web service!**

1. In Render Dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name**: `golden-errands-db`
   - **Database**: `golden_errands`
   - **User**: `golden_errands_user` (auto-generated)
   - **Region**: Choose closest to you (e.g., Oregon, Frankfurt)
   - **Plan**: **Free** (90 days, renewable)
3. Click **"Create Database"**
4. Wait 1-2 minutes for database to be ready
5. **Copy the "Internal Database URL"** - you'll need this!

### 3️⃣ **Create Web Service**

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository:
   - **Repository**: `FyliaCare/Golden-Errands`
   - Click **"Connect"**

### 4️⃣ **Configure Web Service**

**Basic Settings:**
- **Name**: `golden-errands` (or your choice)
- **Region**: Same as database (e.g., Oregon)
- **Branch**: `main`
- **Root Directory**: `golden-errands-nextjs`
- **Runtime**: **Node**
- **Build Command**: `npm install && npx prisma generate && npm run build`
- **Start Command**: `npm start`

**Instance Type:**
- **Plan**: **Free** (750 hours/month)

### 5️⃣ **Add Environment Variables**

Click **"Advanced"** → Scroll to **"Environment Variables"**

Add these variables:

```env
# Database (from step 2 - Internal Database URL)
DATABASE_URL
postgresql://golden_errands_user:xxxxx@dpg-xxxxx/golden_errands

# JWT Secrets
JWT_SECRET
9972bf38050211f5ef6faf0eeb6a3e8a6180e675dc89f586f65acb0c047409d4

JWT_REFRESH_SECRET
1fb4603d52e0c2f313042de160a042770b23fdfffca1681cc908366e1133a66d

# Node Environment
NODE_ENV
production

# API URL (will be your Render URL)
NEXT_PUBLIC_API_URL
https://golden-errands.onrender.com
```

**To add each variable:**
1. Click **"Add Environment Variable"**
2. Enter **Key** (e.g., `DATABASE_URL`)
3. Enter **Value**
4. Repeat for all variables

### 6️⃣ **Create Web Service**

1. Scroll down and click **"Create Web Service"**
2. Render will start deploying (takes 5-10 minutes for first deploy)
3. Watch the build logs - you'll see:
   ```
   ==> Installing dependencies
   ==> Running build
   ==> Generating Prisma Client
   ==> Building Next.js app
   ==> Deploy successful
   ```

### 7️⃣ **Run Database Migrations**

After first successful deployment, you need to run migrations.

**Option A: Use Render Shell (Recommended)**

1. In Render Dashboard → Your Web Service
2. Click **"Shell"** tab (top menu)
3. Run these commands:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed  # Optional: seed with test data
   ```

**Option B: Use Local Terminal**

```powershell
cd "C:\Users\Jay Monty\Desktop\Projects\delivery_platform\Golden-Errands\golden-errands-nextjs"

# Copy DATABASE_URL from Render
$env:DATABASE_URL="postgresql://your-render-database-url"

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npx prisma db seed
```

### 8️⃣ **Access Your App**

Your app will be live at:
- **URL**: `https://golden-errands.onrender.com` (or your custom name)
- **Admin Dashboard**: `https://golden-errands.onrender.com/admin/dashboard`
- **Driver Dashboard**: `https://golden-errands.onrender.com/driver/dashboard`
- **Client Dashboard**: `https://golden-errands.onrender.com/dashboard`

---

## 🔄 Automatic Deployments

After initial setup:
- **Push to `main` branch** = Automatic deployment
- **Manual Deploy** = Click "Manual Deploy" → "Deploy latest commit"
- **Build Logs** = Real-time logs in dashboard

---

## 🗄️ Database Management

### Access PostgreSQL:

**Via Render Dashboard:**
- Go to your database in Render
- Click **"Connect"** → Copy connection details
- Use any PostgreSQL client (pgAdmin, TablePlus, etc.)

**Via Render Shell:**
```bash
# In your web service shell
npx prisma studio
```

### Database Renewal:

Free PostgreSQL expires after 90 days, but:
1. Render sends email 7 days before expiry
2. Click renewal link in email (takes 1 click)
3. Or create new database and migrate data

---

## 🌐 Custom Domain (Optional)

### Add Your Own Domain:

1. Go to Web Service → **Settings** → **Custom Domains**
2. Click **"Add Custom Domain"**
3. Enter your domain (e.g., `goldenerrands.com`)
4. Add these DNS records to your domain:
   ```
   Type: CNAME
   Name: www
   Value: golden-errands.onrender.com
   
   Type: A
   Name: @
   Value: [Render provides the IP]
   ```
5. SSL certificate is automatically provisioned (free)

---

## 📊 Render Free Tier Limits

| Resource | Free Tier | Notes |
|----------|-----------|-------|
| **Web Service Hours** | 750 hours/month | = 31 days continuous |
| **PostgreSQL** | Free for 90 days | Renewable with 1 click |
| **Database Storage** | 1 GB | More than enough |
| **RAM** | 512 MB | Sufficient for Next.js |
| **Build Minutes** | Unlimited | No limits! |
| **Bandwidth** | 100 GB/month | Plenty for APIs |
| **Deployment Speed** | ~5-10 min | First deploy slower |

**Free tier spins down after 15 min inactivity** (takes 30 sec to wake up)
- To prevent: Use a free uptime monitor (e.g., UptimeRobot)

---

## 🐛 Troubleshooting

### Build Fails:

**Error: "Prisma generate failed"**
```bash
# Fix: Update build command to:
npm install && npx prisma generate && npm run build
```

**Error: "Cannot find module @prisma/client"**
```bash
# Add to package.json scripts:
"postinstall": "prisma generate"
```

### Database Connection Issues:

**Error: "Can't reach database server"**
- Make sure you're using **Internal Database URL** (not External)
- Format: `postgresql://user:pass@dpg-xxxxx-a/database`
- Check DATABASE_URL in environment variables

**Error: "SSL required"**
- Add to DATABASE_URL: `?sslmode=require`
- Full example: `postgresql://user:pass@host/db?sslmode=require`

### App Not Loading:

**503 Service Unavailable**
- Free tier spins down after 15 min inactivity
- First request wakes it up (takes 30 seconds)
- Set up UptimeRobot to ping every 5 min (keeps it awake)

**Build Successful but App Crashes**
- Check **Logs** tab in Render dashboard
- Look for missing environment variables
- Verify start command: `npm start`

### Slow Performance:

**App feels slow**
- Free tier has 512MB RAM (sufficient but not fast)
- Upgrade to Starter ($7/mo) for 2GB RAM
- Or optimize your code/queries

---

## 🎯 After Deployment Checklist

- ✅ Web service deployed successfully
- ✅ Database created and connected
- ✅ Migrations run (`npx prisma migrate deploy`)
- ✅ Can access homepage
- ✅ Can login to admin/driver/client dashboards
- ✅ Environment variables set correctly
- ✅ Custom domain added (optional)
- ✅ Set up UptimeRobot to prevent spindown (optional)

---

## 🆙 Keep Your App Awake (Optional)

Free tier spins down after 15 min inactivity. To prevent:

### Use UptimeRobot (Free):

1. Go to: https://uptimerobot.com/
2. Sign up (free)
3. Click **"Add New Monitor"**
4. Configure:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: Golden Errands
   - **URL**: `https://golden-errands.onrender.com`
   - **Monitoring Interval**: 5 minutes
5. Click **"Create Monitor"**

Now your app stays awake 24/7! ✅

---

## 💰 Cost Comparison

| Platform | Free Tier | Database | Expires? | Spindown? |
|----------|-----------|----------|----------|-----------|
| **Render** | 750 hrs/mo | ✅ Free (90d) | Renewable | Yes (15 min) |
| Vercel | 100GB/mo | Paid | Never | No |
| Railway | $5 credit | Paid | ✅ Yes | No |
| Netlify | 300 min/mo | No DB | Never | No |

**Render is the best free option with database!** 🏆

---

## 📞 Support

- **Render Docs**: https://render.com/docs
- **Community**: https://community.render.com/
- **Support**: help@render.com
- **Status**: https://status.render.com/

---

## 🚀 Alternative: Render + Neon (Best Combo)

If you want to avoid 90-day database renewal:

1. Use **Render** for web service (free 750 hrs)
2. Use **Neon** for database (free forever, 500MB)
   - Already have Neon setup!
   - Just use your existing DATABASE_URL from Neon
3. Best of both worlds: No renewals needed!

---

**Your Golden Errands platform will be rock-solid on Render!** 🎉

**Expected Deploy Time**: 10-15 minutes total
**Difficulty**: ⭐⭐☆☆☆ (Easy)

# 🚀 Render Deployment Guide - Taadiway# 🚀 Render Deployment Guide - Taadiway



Complete guide to deploy Taadiway on Render.com (FREE forever plan!)## Why Render?

- ✅ **FREE Forever** (750 hours/month = 31 days continuous)

---- ✅ **Free PostgreSQL** (90 days, auto-renewable)

- ✅ **Zero Config** - Auto-detects Next.js

## 🎯 Why Render?- ✅ **Very Reliable** - Better uptime than Railway/Vercel

- ✅ **Easy Database Setup** - One-click PostgreSQL

- ✅ **FREE Forever** - 750 hours/month (31 days continuous)- ✅ **Automatic Deployments** from GitHub

- ✅ **Free PostgreSQL** - 1GB database included- ✅ **Custom Domains** with free SSL

- ✅ **Zero Config** - Auto-detects Next.js- ✅ **No Credit Card Required**

- ✅ **Auto Deploy** - From GitHub commits

- ✅ **Better Reliability** - Fewer deployment failures than Vercel---

- ✅ **Includes Database** - Unlike Vercel (charges extra)

## 📋 Step-by-Step Deployment

---

### 1️⃣ **Sign Up for Render**

## 📋 Prerequisites1. Go to: https://render.com/

2. Click **"Get Started"** or **"Sign Up"**

1. **GitHub Account** - Your code must be on GitHub3. Choose **"Sign in with GitHub"**

2. **Render Account** - Sign up at https://render.com (free)4. Authorize Render to access your GitHub

3. **Project Ready** - All code committed and pushed

### 2️⃣ **Create PostgreSQL Database First**

---

**IMPORTANT: Create database before the web service!**

## 🗄️ Step 1: Create PostgreSQL Database

1. In Render Dashboard, click **"New +"** → **"PostgreSQL"**

### Option A: Via Render Dashboard (Recommended)2. Configure:

   - **Name**: `Taadiway-db`

1. Go to https://dashboard.render.com   - **Database**: `taadiway`

2. Click **"New +"** → **"PostgreSQL"**   - **User**: `taadiway_user` (auto-generated)

3. Configure:   - **Region**: Choose closest to you (e.g., Oregon, Frankfurt)

   - **Name:** `taadiway-db`   - **Plan**: **Free** (90 days, renewable)

   - **Database:** `taadiway_production`3. Click **"Create Database"**

   - **User:** `taadiway`4. Wait 1-2 minutes for database to be ready

   - **Region:** Choose closest to you5. **Copy the "Internal Database URL"** - you'll need this!

   - **Plan:** **Free** (1GB storage)

4. Click **"Create Database"**### 3️⃣ **Create Web Service**

5. **Wait 2-3 minutes** for database to initialize

6. Copy the **Internal Database URL** (starts with `postgresql://`)1. Click **"New +"** → **"Web Service"**

2. Connect your GitHub repository:

### Option B: Via Blueprint (render.yaml)   - **Repository**: `FyliaCare/Taadiway`

   - Click **"Connect"**

The `render.yaml` file in the root will automatically create the database when you deploy.

### 4️⃣ **Configure Web Service**

---

**Basic Settings:**

## 🌐 Step 2: Create Web Service- **Name**: `Taadiway` (or your choice)

- **Region**: Same as database (e.g., Oregon)

### Method 1: Manual Setup (Recommended for First Time)- **Branch**: `main`

- **Root Directory**: `taadiway-nextjs`

1. Go to https://dashboard.render.com- **Runtime**: **Node**

2. Click **"New +"** → **"Web Service"**- **Build Command**: `npm install && npx prisma generate && npm run build`

3. Connect your GitHub repository:- **Start Command**: `npm start`

   - **Repository:** `FyliaCare/Golden-Errands`

   - **Branch:** `main`**Instance Type:**

4. Configure service:- **Plan**: **Free** (750 hours/month)

   - **Name:** `taadiway-web`

   - **Region:** Same as database### 5️⃣ **Add Environment Variables**

   - **Branch:** `main`

   - **Root Directory:** Leave empty (or `taadiway-nextjs` if in subfolder)Click **"Advanced"** → Scroll to **"Environment Variables"**

   - **Environment:** `Node`

   - **Build Command:** `npm install && npx prisma generate && npm run build`Add these variables:

   - **Start Command:** `npm start`

   - **Plan:** **Free**```env

# Database (from step 2 - Internal Database URL)

5. Click **"Advanced"** and add environment variables:DATABASE_URL

postgresql://taadiway_user:xxxxx@dpg-xxxxx/taadiway

```env

NODE_ENV=production# JWT Secrets

DATABASE_URL=[Paste Internal Database URL from Step 1]JWT_SECRET

JWT_SECRET=[Generate a random 64-character string]9972bf38050211f5ef6faf0eeb6a3e8a6180e675dc89f586f65acb0c047409d4

JWT_REFRESH_SECRET=[Generate another random 64-character string]

NEXT_PUBLIC_API_URL=https://taadiway-web.onrender.comJWT_REFRESH_SECRET

```1fb4603d52e0c2f313042de160a042770b23fdfffca1681cc908366e1133a66d



6. Click **"Create Web Service"**# Node Environment

NODE_ENV

### Method 2: Blueprint Deploy (render.yaml)production



1. Go to https://dashboard.render.com# API URL (will be your Render URL)

2. Click **"New +"** → **"Blueprint"**NEXT_PUBLIC_API_URL

3. Connect repository and select `render.yaml`https://Taadiway.onrender.com

4. Review and approve the configuration```

5. Click **"Apply"**

**To add each variable:**

---1. Click **"Add Environment Variable"**

2. Enter **Key** (e.g., `DATABASE_URL`)

## 🔐 Step 3: Generate Secrets3. Enter **Value**

4. Repeat for all variables

### Generate JWT Secrets (PowerShell):

### 6️⃣ **Create Web Service**

```powershell

# Generate JWT_SECRET1. Scroll down and click **"Create Web Service"**

-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})2. Render will start deploying (takes 5-10 minutes for first deploy)

3. Watch the build logs - you'll see:

# Generate JWT_REFRESH_SECRET   ```

-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | ForEach-Object {[char]$_})   ==> Installing dependencies

```   ==> Running build

   ==> Generating Prisma Client

Or use the included script:   ==> Building Next.js app

```powershell   ==> Deploy successful

.\scripts\generate-secrets.ps1   ```

```

### 7️⃣ **Run Database Migrations**

---

After first successful deployment, you need to run migrations.

## 🗄️ Step 4: Run Database Migrations

**Option A: Use Render Shell (Recommended)**

### Option A: Automatic (During Build)

1. In Render Dashboard → Your Web Service

Migrations run automatically via the build command. Check build logs to verify.2. Click **"Shell"** tab (top menu)

3. Run these commands:

### Option B: Manual (Using Render Shell)   ```bash

   npx prisma migrate deploy

1. Go to your web service dashboard   npx prisma db seed  # Optional: seed with test data

2. Click **"Shell"** tab   ```

3. Run:

```bash**Option B: Use Local Terminal**

npx prisma migrate deploy

``````powershell

cd "C:\Users\Jay Monty\Desktop\Projects\delivery_platform\Taadiway\taadiway-nextjs"

### Option C: Seed Database (Optional)

# Copy DATABASE_URL from Render

To add test data:$env:DATABASE_URL="postgresql://your-render-database-url"

```bash

npm run prisma:seed# Run migrations

```npx prisma migrate deploy



---# Seed database (optional)

npx prisma db seed

## ✅ Step 5: Verify Deployment```



### Check Health Endpoint### 8️⃣ **Access Your App**



Visit: `https://taadiway-web.onrender.com/api/health`Your app will be live at:

- **URL**: `https://Taadiway.onrender.com` (or your custom name)

Expected response:- **Admin Dashboard**: `https://Taadiway.onrender.com/admin/dashboard`

```json- **Driver Dashboard**: `https://Taadiway.onrender.com/driver/dashboard`

{- **Client Dashboard**: `https://Taadiway.onrender.com/dashboard`

  "status": "healthy",

  "timestamp": "2025-10-24T...",---

  "service": "Taadiway API",

  "database": "connected",## 🔄 Automatic Deployments

  "version": "2.0.0"

}After initial setup:

```- **Push to `main` branch** = Automatic deployment

- **Manual Deploy** = Click "Manual Deploy" → "Deploy latest commit"

### Test Login- **Build Logs** = Real-time logs in dashboard



Visit: `https://taadiway-web.onrender.com/login`---



Try test credentials:## 🗄️ Database Management

- **Admin:** admin@taadiway.com / Admin@123456

- **Driver:** driver@taadiway.com / Driver@123### Access PostgreSQL:

- **Client:** client@taadiway.com / Client@123

**Via Render Dashboard:**

---- Go to your database in Render

- Click **"Connect"** → Copy connection details

## 🔄 Step 6: Enable Auto-Deploy- Use any PostgreSQL client (pgAdmin, TablePlus, etc.)



1. Go to web service settings**Via Render Shell:**

2. Under **"Build & Deploy"**```bash

3. Enable **"Auto-Deploy"** from `main` branch# In your web service shell

4. Every push to `main` will trigger automatic deploymentnpx prisma studio

```

---

### Database Renewal:

## 🎨 Step 7: Custom Domain (Optional)

Free PostgreSQL expires after 90 days, but:

### Add Custom Domain1. Render sends email 7 days before expiry

2. Click renewal link in email (takes 1 click)

1. Go to service **"Settings"**3. Or create new database and migrate data

2. Scroll to **"Custom Domains"**

3. Click **"Add Custom Domain"**---

4. Enter your domain: `www.taadiway.com`

5. Add CNAME record to your DNS:## 🌐 Custom Domain (Optional)

   ```

   CNAME www taadiway-web.onrender.com### Add Your Own Domain:

   ```

6. Wait for SSL certificate (automatic, free)1. Go to Web Service → **Settings** → **Custom Domains**

2. Click **"Add Custom Domain"**

---3. Enter your domain (e.g., `taadiway.com`)

4. Add these DNS records to your domain:

## 📊 Monitoring & Logs   ```

   Type: CNAME

### View Logs   Name: www

   Value: Taadiway.onrender.com

1. Go to service dashboard   

2. Click **"Logs"** tab   Type: A

3. See real-time application logs   Name: @

4. Filter by severity   Value: [Render provides the IP]

   ```

### Monitor Performance5. SSL certificate is automatically provisioned (free)



1. Click **"Metrics"** tab---

2. View:

   - CPU usage## 📊 Render Free Tier Limits

   - Memory usage

   - Request count| Resource | Free Tier | Notes |

   - Response time|----------|-----------|-------|

| **Web Service Hours** | 750 hours/month | = 31 days continuous |

### Set Up Alerts| **PostgreSQL** | Free for 90 days | Renewable with 1 click |

| **Database Storage** | 1 GB | More than enough |

1. Go to **"Settings"**| **RAM** | 512 MB | Sufficient for Next.js |

2. Add **"Notification Channels"**| **Build Minutes** | Unlimited | No limits! |

3. Configure alerts for:| **Bandwidth** | 100 GB/month | Plenty for APIs |

   - Service down| **Deployment Speed** | ~5-10 min | First deploy slower |

   - Build failures

   - High resource usage**Free tier spins down after 15 min inactivity** (takes 30 sec to wake up)

- To prevent: Use a free uptime monitor (e.g., UptimeRobot)

---

---

## 🚨 Troubleshooting

## 🐛 Troubleshooting

### Build Fails

### Build Fails:

**Error:** `Prisma Client not generated`

```bash**Error: "Prisma generate failed"**

# Solution: Ensure build command includes:```bash

npm install && npx prisma generate && npm run build# Fix: Update build command to:

```npm install && npx prisma generate && npm run build

```

**Error:** `Cannot find module '@prisma/client'`

```bash**Error: "Cannot find module @prisma/client"**

# Solution: Run in Render Shell:```bash

npx prisma generate# Add to package.json scripts:

```"postinstall": "prisma generate"

```

### Database Connection Issues

### Database Connection Issues:

**Error:** `Can't reach database server`

```bash**Error: "Can't reach database server"**

# Check:- Make sure you're using **Internal Database URL** (not External)

1. DATABASE_URL is set correctly (Internal URL)- Format: `postgresql://user:pass@dpg-xxxxx-a/database`

2. Database is running (check database dashboard)- Check DATABASE_URL in environment variables

3. Region matches (database and web service same region)

```**Error: "SSL required"**

- Add to DATABASE_URL: `?sslmode=require`

**Error:** `SSL connection required`- Full example: `postgresql://user:pass@host/db?sslmode=require`

```env

# Add to DATABASE_URL:### App Not Loading:

?sslmode=require

```**503 Service Unavailable**

- Free tier spins down after 15 min inactivity

### Application Crashes- First request wakes it up (takes 30 seconds)

- Set up UptimeRobot to ping every 5 min (keeps it awake)

**Check logs:**

1. Go to **Logs** tab**Build Successful but App Crashes**

2. Look for error messages- Check **Logs** tab in Render dashboard

3. Common issues:- Look for missing environment variables

   - Missing environment variables- Verify start command: `npm start`

   - Database migration not run

   - Port binding issues### Slow Performance:



**Check environment:****App feels slow**

```bash- Free tier has 512MB RAM (sufficient but not fast)

# In Render Shell:- Upgrade to Starter ($7/mo) for 2GB RAM

echo $DATABASE_URL- Or optimize your code/queries

echo $JWT_SECRET

echo $NODE_ENV---

```

## 🎯 After Deployment Checklist

### Slow Cold Starts

- ✅ Web service deployed successfully

Free tier services spin down after 15 minutes of inactivity.- ✅ Database created and connected

- ✅ Migrations run (`npx prisma migrate deploy`)

**Solutions:**- ✅ Can access homepage

1. Upgrade to paid plan ($7/month - instant starts)- ✅ Can login to admin/driver/client dashboards

2. Use a uptime monitor to ping every 10 minutes- ✅ Environment variables set correctly

3. Accept 30-60 second cold start on first request- ✅ Custom domain added (optional)

- ✅ Set up UptimeRobot to prevent spindown (optional)

---

---

## 💡 Performance Tips

## 🆙 Keep Your App Awake (Optional)

### 1. Database Connection Pooling

Free tier spins down after 15 min inactivity. To prevent:

Already configured in `lib/prisma.ts` with connection limit.

### Use UptimeRobot (Free):

### 2. Enable Caching

1. Go to: https://uptimerobot.com/

API caching already implemented in `lib/cache.ts`.2. Sign up (free)

3. Click **"Add New Monitor"**

### 3. CDN for Static Assets4. Configure:

   - **Monitor Type**: HTTP(s)

Render automatically serves static files via CDN.   - **Friendly Name**: Taadiway

   - **URL**: `https://Taadiway.onrender.com`

### 4. Optimize Images   - **Monitoring Interval**: 5 minutes

5. Click **"Create Monitor"**

Already configured - images served as WebP/AVIF.

Now your app stays awake 24/7! ✅

### 5. Monitor Performance

---

Use built-in metrics + Core Web Vitals monitoring.

## 💰 Cost Comparison

---

| Platform | Free Tier | Database | Expires? | Spindown? |

## 💰 Pricing|----------|-----------|----------|----------|-----------|

| **Render** | 750 hrs/mo | ✅ Free (90d) | Renewable | Yes (15 min) |

### Free Plan (Current)| Vercel | 100GB/mo | Paid | Never | No |

- ✅ 750 hours/month| Railway | $5 credit | Paid | ✅ Yes | No |

- ✅ 512 MB RAM| Netlify | 300 min/mo | No DB | Never | No |

- ✅ 100 GB bandwidth

- ✅ Free SSL**Render is the best free option with database!** 🏆

- ✅ Automatic deployments

- ⚠️ Spins down after 15 min inactivity---



### Starter Plan ($7/month)## 📞 Support

- ✅ Always on (no spin down)

- ✅ 512 MB RAM- **Render Docs**: https://render.com/docs

- ✅ 100 GB bandwidth- **Community**: https://community.render.com/

- ✅ Everything in Free +- **Support**: help@render.com

- ✅ Instant wake up- **Status**: https://status.render.com/



### Standard Plan ($25/month)---

- ✅ 2 GB RAM

- ✅ Priority support## 🚀 Alternative: Render + Neon (Best Combo)

- ✅ Faster builds

- ✅ More bandwidthIf you want to avoid 90-day database renewal:



---1. Use **Render** for web service (free 750 hrs)

2. Use **Neon** for database (free forever, 500MB)

## 🔗 Useful Links   - Already have Neon setup!

   - Just use your existing DATABASE_URL from Neon

- **Render Dashboard:** https://dashboard.render.com3. Best of both worlds: No renewals needed!

- **Render Docs:** https://render.com/docs

- **Support:** https://render.com/support---

- **Status Page:** https://status.render.com

**Your Taadiway platform will be rock-solid on Render!** 🎉

---

**Expected Deploy Time**: 10-15 minutes total

## 📝 Environment Variables Reference**Difficulty**: ⭐⭐☆☆☆ (Easy)


```env
# Required
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
JWT_SECRET=your-64-char-secret
JWT_REFRESH_SECRET=your-other-64-char-secret
NODE_ENV=production

# Optional
NEXT_PUBLIC_API_URL=https://your-domain.onrender.com
ANALYZE=false
```

---

## 🎉 Success Checklist

- [ ] PostgreSQL database created
- [ ] Web service deployed
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Health check passes
- [ ] Test login works
- [ ] Auto-deploy enabled
- [ ] Custom domain added (optional)
- [ ] Monitoring configured
- [ ] Performance optimized

---

## 🆘 Need Help?

1. **Check Logs** - Most issues visible in logs
2. **Render Docs** - Comprehensive documentation
3. **Community** - Active Discord community
4. **Support** - Email support@render.com

---

**Your app should now be live at:** `https://taadiway-web.onrender.com` 🚀

**Deployment time:** ~5-10 minutes for first deploy

**Happy deploying!** 🎉

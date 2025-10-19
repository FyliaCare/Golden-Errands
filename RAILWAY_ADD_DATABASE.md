# 🚂 Railway: Add PostgreSQL Database (2 Minutes)

## Current Situation

✅ Your app deployed successfully to Railway  
✅ Container is running  
❌ Needs DATABASE_URL environment variable  

**Fix:** Add PostgreSQL database

---

## Step-by-Step Guide

### Step 1: Open Your Railway Project (10 seconds)

1. Go to https://railway.app
2. Click on your **Golden-Errands** project
3. You should see your service running (might show error in logs)

---

### Step 2: Add PostgreSQL Database (30 seconds)

```
In your Railway project:

1. Look for the "+ New" button (usually top right)
2. Click it
3. You'll see options:
   - Empty Service
   - GitHub Repo
   - Database ← Choose this one
   - Template
   
4. Click "Database"
5. Select "Add PostgreSQL"
6. Railway creates the database instantly ✅
```

**That's it! Railway automatically:**
- ✅ Creates a PostgreSQL database
- ✅ Sets the `DATABASE_URL` environment variable
- ✅ Links it to your service
- ✅ Triggers a redeploy

---

### Step 3: Watch the Redeploy (1 minute)

Your service will automatically redeploy. Watch the logs:

1. Click on your **Golden-Errands service** (not the database)
2. Go to **"Deployments"** tab
3. Click on the latest deployment
4. Click **"View Logs"**

You should see:

```
🚀 Golden Errands API - Production Startup

📂 Working directory: /app
🎯 Server path: /app/dist/server.js

📦 Generating Prisma Client...
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
✔ Generated Prisma Client
✅ Prisma Client generated

🔄 Running database migrations...
✅ Migrations completed

🌟 Starting server...
✅ Server started successfully
🚀 Server is running on port 3000
```

---

### Step 4: Get Your Live URL (10 seconds)

1. In your service view, look for **"Settings"** tab
2. Under **"Domains"**, you'll see your URL:
   ```
   https://golden-errands-production.up.railway.app
   ```
   (or something similar)

3. Copy this URL

---

### Step 5: Test Your API (30 seconds)

Open PowerShell and test:

```powershell
# Replace with your actual Railway URL
$URL = "https://your-project.up.railway.app"

# Test health endpoint
curl "$URL/health"

# Should return something like:
# {"status":"ok","timestamp":"2025-10-19T..."}
```

If you see that response, **YOUR API IS LIVE! 🎉**

---

## What Railway Just Did

```
Before:
┌──────────────┐
│  Your Service│  ← Running but no database
└──────────────┘
       ❌ DATABASE_URL not set

After:
┌──────────────┐      ┌──────────────┐
│  Your Service│─────▶│  PostgreSQL  │
└──────────────┘      └──────────────┘
       ✅ DATABASE_URL automatically set
       ✅ Both linked
       ✅ App running
```

---

## Visual Walkthrough

### Where to Click:

```
Railway Dashboard
├─ Your Projects
│  └─ Golden-Errands Project ← Click here
│     │
│     ├─ [+ New] ← Click here
│     │   │
│     │   └─ Select "Database"
│     │      │
│     │      └─ Click "Add PostgreSQL" ← Click here
│     │
│     └─ Your Service
│        │
│        ├─ Deployments ← Check logs here
│        │
│        └─ Settings
│           └─ Domains ← Get your URL here
```

---

## Troubleshooting

### If database doesn't link automatically:

1. Go to your **service** (Golden-Errands)
2. Click **"Variables"** tab
3. Check if `DATABASE_URL` exists
4. If not, click **"+ New Variable"**
5. Reference the PostgreSQL database:
   - Click "Add a variable reference"
   - Select your PostgreSQL database
   - Choose `DATABASE_URL`
6. Save and redeploy

### If deployment fails:

1. Check the deployment logs for specific error
2. Verify DATABASE_URL is set (Variables tab)
3. Try manual redeploy:
   - Deployments → Latest → "Redeploy"

### If you see "database does not exist":

The migrations will create it automatically. Just wait a bit longer.

---

## Environment Variables You Should Have

After adding the database, in your service's **Variables** tab you should see:

```
DATABASE_URL (from PostgreSQL)  ← Railway sets this automatically
JWT_SECRET (set manually)       ← You need to add this
NODE_ENV = production           ← Optional but recommended
```

### To add JWT_SECRET:

1. Go to your service → **Variables** tab
2. Click **"+ New Variable"**
3. Name: `JWT_SECRET`
4. Value: `your-super-secret-key-at-least-32-characters-long-please`
5. Click **"Add"**

---

## What Happens After Adding Database

1. **Automatic Redeploy** (~1-2 minutes)
2. **Prisma generates** the client with your PostgreSQL connection
3. **Migrations run** (creates tables in your database)
4. **Server starts** and listens for requests
5. **Your API is live!** 🚀

---

## Cost

Railway charges for:
- **Service:** ~$5/month (compute)
- **PostgreSQL:** Included in above, or separate based on usage
- **Free Trial:** $5 free credit to start

---

## Next Steps After It's Live

### 1. Test All Endpoints

```powershell
$URL = "https://your-project.up.railway.app"

# Register a user
curl -X POST "$URL/api/auth/register" `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@golden.com","password":"Admin123!","name":"Admin User"}'

# Login
curl -X POST "$URL/api/auth/login" `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@golden.com","password":"Admin123!"}'
```

### 2. Set Up Custom Domain (Optional)

1. In Railway service → Settings → Domains
2. Click "Add custom domain"
3. Enter your domain (e.g., api.goldenerrands.com)
4. Update your DNS records as shown
5. SSL certificate generated automatically

### 3. Monitor Your App

- **Logs:** Real-time in Railway dashboard
- **Metrics:** CPU, Memory usage
- **Database:** Check PostgreSQL usage

---

## 🎉 Success!

Once you see these logs:

```
✅ Prisma Client generated
✅ Migrations completed
✅ Server started successfully
```

**Your Golden Errands API is officially LIVE on Railway! 🚀**

You can now:
- ✅ Register users
- ✅ Create orders
- ✅ Manage deliveries
- ✅ Use all your endpoints

**Congratulations! Your deployment is complete! 🎊**

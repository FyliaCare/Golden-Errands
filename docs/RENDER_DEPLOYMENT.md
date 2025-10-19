# 🎨 Deploy to Render - Complete Guide

Deploy your full-stack Golden Errands application to Render for **100% FREE** hosting!

---

## ✨ What You'll Get (All FREE)

- ✅ **Backend API** - Node.js/Express server
- ✅ **Frontend** - React/Vite static site
- ✅ **PostgreSQL Database** - 1GB storage
- ✅ **Auto HTTPS** - SSL certificates included
- ✅ **Auto Deploy** - Deploys on every git push
- ⚠️ **Limitation:** Services sleep after 15 minutes of inactivity (wakes up in ~30 seconds)

---

## 🚀 Method 1: Blueprint (One-Click Deploy) - RECOMMENDED

### Step 1: Push Changes to GitHub

```powershell
cd 'c:\Users\Jay Monty\Desktop\Projects\delivery_platform\Golden-Errands'
git add .
git commit -m "Add Render configuration files"
git push origin main
```

### Step 2: Deploy via Render Dashboard

1. Go to https://dashboard.render.com
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub account (if not connected)
4. Select repository: **FyliaCare/Golden-Errands**
5. Render will detect `render.yaml` and show preview
6. Click **"Apply"**
7. Render will create:
   - PostgreSQL database
   - Backend API service
   - Frontend static site

### Step 3: Configure Environment Variables

After services are created, add these:

**Backend Service:**
- Go to **golden-errands-api** service → Environment
- Add: `CORS_ORIGIN` = `https://golden-errands-frontend.onrender.com` (use your actual frontend URL)

**Frontend Service:**
- Go to **golden-errands-frontend** service → Environment  
- Add: `VITE_API_URL` = `https://golden-errands-api.onrender.com/api` (use your actual backend URL)

### Step 4: Trigger Redeploy

- Click **"Manual Deploy"** → **"Deploy latest commit"** on both services
- Wait 5-10 minutes for initial build

### Step 5: Initialize Database

```powershell
# After backend finishes deploying
$backendUrl = "https://golden-errands-api.onrender.com"

# Create database tables
Invoke-RestMethod -Uri "$backendUrl/api/setup/init-database" -Method Post

# Verify tables
Invoke-RestMethod -Uri "$backendUrl/api/setup/database-status"
```

---

## 🔧 Method 2: Manual Setup (More Control)

### Step 1: Create PostgreSQL Database

1. Go to https://dashboard.render.com
2. Click **"New"** → **"PostgreSQL"**
3. Configure:
   - **Name:** `golden-errands-db`
   - **Database:** `golden_errands`
   - **User:** `golden_errands_user`
   - **Region:** Oregon (or closest to you)
   - **Plan:** Free
4. Click **"Create Database"**
5. **Save the Internal Database URL** (you'll need it)

### Step 2: Deploy Backend

1. Click **"New"** → **"Web Service"**
2. Connect to **FyliaCare/Golden-Errands** repository
3. Configure:
   - **Name:** `golden-errands-api`
   - **Region:** Oregon
   - **Branch:** `main`
   - **Root Directory:** Leave empty
   - **Runtime:** `Node`
   - **Build Command:** 
     ```bash
     cd backend && npm install && npm run build && npx prisma generate
     ```
   - **Start Command:**
     ```bash
     cd backend && node start-production.js
     ```
   - **Plan:** Free
4. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `3000`
   - `DATABASE_URL` = (paste Internal Database URL from Step 1)
   - `JWT_SECRET` = `your-super-secret-key-change-this`
   - `JWT_ACCESS_EXPIRY` = `15m`
   - `JWT_REFRESH_EXPIRY` = `7d`
5. Click **"Create Web Service"**

### Step 3: Deploy Frontend

1. Click **"New"** → **"Static Site"**
2. Connect to **FyliaCare/Golden-Errands** repository
3. Configure:
   - **Name:** `golden-errands-frontend`
   - **Region:** Oregon
   - **Branch:** `main`
   - **Root Directory:** Leave empty
   - **Build Command:**
     ```bash
     cd frontend && npm install && npm run build:vite
     ```
   - **Publish Directory:** `frontend/dist`
4. Add Environment Variable:
   - `VITE_API_URL` = `https://golden-errands-api.onrender.com/api` (use your actual backend URL)
5. Click **"Create Static Site"**

### Step 4: Update CORS

After frontend deploys, update backend CORS:

1. Go to backend service → Environment
2. Add/Update: `CORS_ORIGIN` = `https://golden-errands-frontend.onrender.com`
3. Click **"Manual Deploy"** to redeploy

### Step 5: Initialize Database

```powershell
# Get your backend URL from Render dashboard
$backendUrl = "https://golden-errands-api.onrender.com"

# Create tables
Invoke-RestMethod -Uri "$backendUrl/api/setup/init-database" -Method Post

# Register first user
$body = @{
  email = "admin@goldenerrands.com"
  password = "Admin123!"
  firstName = "Admin"
  lastName = "User"
  phone = "0256039212"
} | ConvertTo-Json

Invoke-RestMethod -Uri "$backendUrl/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

---

## 🧪 Testing Your Deployment

### Test Backend
```powershell
# Health check
Invoke-RestMethod -Uri "https://golden-errands-api.onrender.com/health"

# Database status
Invoke-RestMethod -Uri "https://golden-errands-api.onrender.com/api/setup/database-status"
```

### Test Frontend
1. Open your frontend URL (e.g., https://golden-errands-frontend.onrender.com)
2. Test navigation: Home, About, Services, FAQ, Contact
3. Test registration/login
4. Create a test order

---

## ⚠️ Important Notes

### Free Tier Limitations:
- Services **sleep after 15 minutes** of inactivity
- First request after sleep takes ~30 seconds to wake up
- Database: **1GB storage limit** (plenty for starting)
- **750 hours/month** per service (enough for 24/7 if only one service)

### Keep Services Awake (Optional):
You can use a free service like **UptimeRobot** to ping your backend every 10 minutes:
1. Go to https://uptimerobot.com
2. Add monitor for your backend health endpoint
3. Set interval to 10 minutes

---

## 🔄 Auto-Deploy Setup

Render automatically redeploys when you push to GitHub:

```powershell
# Make changes to your code
git add .
git commit -m "Your changes"
git push origin main

# Render will automatically detect and redeploy!
```

---

## 📊 Render vs Railway Comparison

| Feature | Render (Free) | Railway ($5/mo) |
|---------|---------------|-----------------|
| **Cost** | $0 | $5 |
| **Sleep** | Yes (15 min) | No |
| **Wake Time** | ~30 seconds | N/A |
| **Database** | 1GB | 1GB |
| **Build Time** | 5-10 min | 3-5 min |
| **Uptime** | 750h/mo | Unlimited |
| **Performance** | Good | Better |

---

## 🆘 Troubleshooting

### Service Won't Start
- Check build logs in Render dashboard
- Verify all environment variables are set
- Ensure DATABASE_URL is correct

### Database Connection Failed
- Use **Internal Database URL** (not external)
- Verify DATABASE_URL includes all connection parameters

### Frontend Can't Reach Backend
- Check CORS_ORIGIN includes your frontend URL
- Verify VITE_API_URL points to correct backend
- Redeploy frontend after changing env vars

### Slow First Load
- This is normal! Free tier services sleep
- Consider using UptimeRobot to keep awake
- Or upgrade to paid plan ($7/mo for always-on)

---

## 🎉 Success Criteria

When deployment is complete, you should have:
- ✅ Backend URL: `https://golden-errands-api.onrender.com`
- ✅ Frontend URL: `https://golden-errands-frontend.onrender.com`
- ✅ Health endpoint responding
- ✅ Database tables created
- ✅ Can register and login users
- ✅ Can create orders

---

## 📚 Additional Resources

- **Render Docs:** https://render.com/docs
- **Free Tier Details:** https://render.com/docs/free
- **PostgreSQL:** https://render.com/docs/databases
- **Deploy Logs:** Check in Render dashboard for each service

---

## 💡 Pro Tips

1. **Monitor Logs:** Keep Render dashboard open during first deploy to watch logs
2. **Database Backups:** Render takes automatic backups on free tier
3. **Custom Domain:** You can add custom domain later (free on Render)
4. **Staging Environment:** Create separate services for testing

---

**Estimated Setup Time:** 15-20 minutes

**Total Cost:** $0/month 🎉

Good luck with your Render deployment! 🚀

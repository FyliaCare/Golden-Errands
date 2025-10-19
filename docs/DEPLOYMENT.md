# 🚀 Golden Errands - Deployment Guide

Complete guide to deploy the Golden Errands Delivery Management Platform.

---

## 📋 Prerequisites

- GitHub account
- Railway account (for backend + database)
- Vercel account (for frontend)

---

## 🎯 Quick Start (5 Steps)

### **1. Deploy Backend to Railway**

1. Go to https://railway.app/dashboard
2. Click **New Project** → **Deploy from GitHub repo**
3. Select **FyliaCare/Golden-Errands**
4. Railway will auto-detect the Dockerfile
5. Wait for deployment to complete

### **2. Add PostgreSQL Database**

1. In your Railway project, click **+ New** → **Database** → **Add PostgreSQL**
2. Railway will automatically create database and set environment variables

### **3. Configure Backend Environment Variables**

In your Railway backend service, add these variables:

- `DATABASE_URL` - Reference from Postgres service → `DATABASE_PUBLIC_URL`
- `JWT_SECRET` - Your secret key (e.g., `your-super-secret-key-123`)
- `PORT` - `3000`
- `NODE_ENV` - `production`

**Important:** Use **Variable Reference** for DATABASE_URL (not hardcoded value)

### **4. Initialize Database Tables**

After backend deploys successfully, run:

```powershell
# Check status
Invoke-RestMethod -Uri "https://your-app.up.railway.app/api/setup/database-status"

# Create tables
Invoke-RestMethod -Uri "https://your-app.up.railway.app/api/setup/init-database" -Method Post
```

Replace `your-app.up.railway.app` with your actual Railway URL.

### **5. Deploy Frontend to Vercel**

1. Go to https://vercel.com/dashboard
2. Click **Add New** → **Project**
3. Import **FyliaCare/Golden-Errands**
4. Configure:
   - **Framework:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build:vite`
   - **Output Directory:** `dist`
5. Add environment variable:
   - `VITE_API_URL` = `https://your-app.up.railway.app/api`
6. Click **Deploy**

---

## ✅ Verification

### Test Backend
```powershell
# Health check
Invoke-RestMethod -Uri "https://your-app.up.railway.app/health"

# Register user
$body = @{
  email = "admin@goldenerrands.com"
  password = "Admin123!"
  firstName = "Admin"
  lastName = "User"
  phone = "0256039212"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://your-app.up.railway.app/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

### Test Frontend
Open your Vercel URL and test:
- Home, About, Services, FAQ, Contact pages
- Login/Register functionality
- Creating orders

---

## 🏗️ Architecture

```
┌─────────────────┐
│  Vercel         │
│  (Frontend)     │
│  React + Vite   │
└────────┬────────┘
         │ HTTPS
         ↓
┌─────────────────┐      ┌──────────────┐
│  Railway        │─────→│  PostgreSQL  │
│  (Backend API)  │      │  (Database)  │
│  Node.js+Express│      │  Railway     │
└─────────────────┘      └──────────────┘
```

---

## 📁 Project Structure

```
Golden-Errands/
├── backend/                 # Node.js Express API
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # Auth, validation
│   │   └── utils/          # Helpers
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── Dockerfile          # Container config
│   └── start-production.js # Startup script
│
├── frontend/               # React Vite app
│   ├── src/
│   │   ├── pages/         # Route pages
│   │   ├── components/    # Reusable components
│   │   └── config/        # API configuration
│   └── package.json
│
├── docs/                  # Documentation
└── README.md             # This file
```

---

## 🔧 Troubleshooting

### Backend Issues

**Problem:** Can't reach database
**Solution:** Make sure DATABASE_URL uses Variable Reference to DATABASE_PUBLIC_URL, not the internal URL

**Problem:** Migrations fail during startup
**Solution:** Normal! Use the `/api/setup/init-database` endpoint to create tables after server starts

**Problem:** Rate limiting errors
**Solution:** Already fixed with `app.set('trust proxy', 1)` in server.ts

### Frontend Issues

**Problem:** API calls fail
**Solution:** Verify `VITE_API_URL` environment variable is set in Vercel

**Problem:** Build fails
**Solution:** Make sure Root Directory is set to `frontend` in Vercel settings

### Database Issues

**Problem:** Tables don't exist
**Solution:** Run `POST /api/setup/init-database` endpoint to create tables

---

## 🔐 Security Notes

- Change `JWT_SECRET` to a strong random value in production
- The `/api/setup/*` endpoints should only be called once
- Consider adding authentication to setup endpoints after initial use
- Use environment variables for all sensitive data

---

## 📚 Additional Resources

- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **React Router:** https://reactrouter.com

---

## 🆘 Need Help?

If you encounter issues:
1. Check Railway deployment logs
2. Check Vercel deployment logs
3. Verify all environment variables are set correctly
4. Run database status endpoint to check tables

---

## 🎉 Success!

Once deployed, you'll have:
- ✅ Public frontend URL (Vercel)
- ✅ Public backend API (Railway)
- ✅ Managed PostgreSQL database (Railway)
- ✅ Full-stack application accessible anywhere

**Your Golden Errands platform is now live!** 🚀

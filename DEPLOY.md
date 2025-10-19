# 🚀 Render Deployment - Golden Errands

## ✅ Deployment Files Ready

Your project is now **100% Render-ready** with all deployment files configured:

- ✅ `render.yaml` - Complete Blueprint for backend + frontend + database
- ✅ `docs/RENDER_DEPLOYMENT.md` - Full deployment guide

## 🎯 Next Steps to Deploy

### Option A: Blueprint Deployment (Recommended - One Click)

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Click "New +" → "Blueprint"

2. **Connect Repository**
   - Select your GitHub repository: `FyliaCare/Golden-Errands`
   - Branch: `main`
   - Render will auto-detect `render.yaml`

3. **Click "Apply"**
   - Render will create:
     - ✅ PostgreSQL database (`golden-errands-db`)
     - ✅ Backend API (`golden-errands-api`)
     - ✅ Frontend site (`golden-errands-frontend`)

4. **Wait for Deployment** (~5-10 minutes)
   - Database provisions first
   - Backend builds and deploys (auto-connects to database)
   - Frontend builds and deploys (auto-connects to backend)

### Option B: Manual Service Creation

If Blueprint doesn't work, see `docs/RENDER_DEPLOYMENT.md` for manual setup.

## 🔧 After Deployment

### 1. Initialize Database Tables

```powershell
# Initialize database schema
Invoke-RestMethod -Uri "https://golden-errands-api.onrender.com/api/setup/init-database" -Method Post

# Verify tables created
Invoke-RestMethod -Uri "https://golden-errands-api.onrender.com/api/setup/database-status"
```

### 2. Test Backend

```powershell
# Health check
Invoke-RestMethod -Uri "https://golden-errands-api.onrender.com/health"

# Should return:
# { status: "ok", message: "Server is running", timestamp: "..." }
```

### 3. Test Registration

```powershell
$body = @{
  email = "admin@goldenerrands.com"
  password = "Admin123!"
  firstName = "Admin"
  lastName = "User"
  phone = "0256039212"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://golden-errands-api.onrender.com/api/auth/register" -Method Post -Body $body -ContentType "application/json"
```

### 4. Access Frontend

- Visit: `https://golden-errands-frontend.onrender.com`
- Login with registered credentials
- Test order creation

## 🚨 Troubleshooting

### If DATABASE_URL Error (P1013)

**Symptom:** "invalid port number in database URL"

**Solution:**
1. Go to Render → PostgreSQL service (`golden-errands-db`)
2. Copy **Internal Database URL** (exactly as shown, one line)
3. Go to Backend service → Environment
4. Update `DATABASE_URL` variable
5. Format must be: `postgresql://user:pass@host:port/database`
   - No spaces, no line breaks
   - Special characters URL-encoded

### If Database Service Missing

1. Click "New +" → "PostgreSQL"
2. Name: `golden-errands-db`
3. Database: `golden_errands`
4. Plan: Free
5. Region: Oregon
6. After creation:
   - Copy "Internal Database URL"
   - Add to backend service environment variables

## 📦 Deployment Configuration

### Backend API (`golden-errands-api`)
- Runtime: Node.js 18
- Build: `npm ci && npm run build && npx prisma generate`
- Start: `npm start`
- Port: 10000 (Render auto-assigns)
- Health: `/health`

### Frontend (`golden-errands-frontend`)
- Runtime: Static Site
- Build: `npm ci && npm run build:vite`
- Output: `dist/`
- Routes: SPA mode (all routes → `index.html`)

### Database (`golden-errands-db`)
- Type: PostgreSQL 15
- Plan: Free (sleep after 90 days inactivity)
- Region: Oregon
- Connection: Auto-injected to backend via `DATABASE_URL`

## 🎉 Success Checklist

- [ ] Blueprint deployed all 3 services
- [ ] Backend health check returns `{ status: "ok" }`
- [ ] Database tables created (7 tables)
- [ ] Can register users
- [ ] Frontend loads and connects to backend
- [ ] Can create orders from frontend
- [ ] No CORS errors

## 📚 Full Documentation

See `docs/RENDER_DEPLOYMENT.md` for complete guide including:
- Detailed setup instructions
- Environment variables reference
- Troubleshooting guide
- Manual deployment steps
- Production checklist

## 🌐 Expected URLs

After deployment:
- **Backend API:** `https://golden-errands-api.onrender.com`
- **Frontend:** `https://golden-errands-frontend.onrender.com`
- **Health Check:** `https://golden-errands-api.onrender.com/health`

---

**Note:** Render free tier sleeps after 15 minutes of inactivity. First request after sleep will take ~30 seconds to wake up.

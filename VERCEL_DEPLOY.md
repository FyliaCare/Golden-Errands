# Deploy Golden Errands to Vercel

## 🚀 Quick Deploy

### 1. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import from GitHub: `FyliaCare/Golden-Errands`
4. Configure:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Set Environment Variables

In Vercel Project Settings → Environment Variables:

```
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your_super_secure_secret_key_minimum_32_characters
NODE_ENV=production
```

### 4. Add PostgreSQL Database

**Option A: Vercel Postgres** (Recommended)
1. In your project, go to Storage tab
2. Click "Create Database" → Select "Postgres"
3. DATABASE_URL will be automatically set

**Option B: External Provider** (Neon, Supabase, etc.)
1. Create PostgreSQL database on your provider
2. Copy the connection string
3. Add as DATABASE_URL in Vercel environment variables

### 5. Deploy
- Click "Deploy"
- Vercel will:
  - Install dependencies
  - Generate Prisma Client
  - Run migrations
  - Build TypeScript
  - Deploy your API

## 📁 Project Structure

```
Golden-Errands/
├── backend/              ← Vercel deploys this
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── tsconfig.json
├── frontend/             ← Ignored (deploy separately if needed)
├── vercel.json          ← Vercel configuration
├── .vercelignore        ← Files to ignore
└── README.md
```

## ✅ What's Been Cleaned

Removed all Railway-specific files:
- ❌ Dockerfile
- ❌ railway.json
- ❌ .railwayignore
- ❌ nixpacks.toml
- ❌ .dockerignore
- ❌ All deployment docs

Added Vercel-specific files:
- ✅ vercel.json
- ✅ .vercelignore
- ✅ vercel-build script in package.json

## 🔧 Backend Configuration

**package.json scripts:**
```json
{
  "build": "tsc",
  "start": "node dist/server.js",
  "vercel-build": "node vercel-build.js",
  "postinstall": "prisma generate || echo 'Prisma generate skipped'"
}
```

**vercel-build.js** - Handles missing DATABASE_URL during build:
- Sets placeholder DATABASE_URL if not present
- Generates Prisma Client
- Builds TypeScript

**vercel.json:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "backend/src/server.ts"
    }
  ]
}
```

## 🎯 API Endpoints

After deployment, your API will be available at:
```
https://your-project.vercel.app/
https://your-project.vercel.app/health
https://your-project.vercel.app/api/auth/login
https://your-project.vercel.app/api/orders
```

## ⚙️ Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Your JWT secret key

Optional (have defaults):
- `NODE_ENV` - Production (auto-set)
- `PORT` - Auto-set by Vercel
- `CORS_ORIGIN` - Frontend URL

## 🐛 Troubleshooting

### Build Fails
- Check DATABASE_URL is set in environment variables
- Verify all dependencies are in package.json
- Check build logs for specific errors

### Prisma Errors
- Ensure DATABASE_URL is valid and accessible
- Check database is PostgreSQL (not MySQL/SQLite)
- Verify migrations are in prisma/migrations folder

### Runtime Errors
- Check environment variables are set
- Verify database is reachable from Vercel
- Check function logs in Vercel dashboard

## 📊 Monitoring

- **Function Logs**: Vercel Dashboard → your-project → Logs
- **Deployment Status**: Vercel Dashboard → Deployments
- **Database**: If using Vercel Postgres, check Storage tab

## 🎉 Success Checklist

After deployment:
- [ ] Build completes successfully
- [ ] No Prisma errors in logs
- [ ] /health endpoint returns 200
- [ ] Can register/login users
- [ ] Database queries work
- [ ] All API endpoints respond

---

**Your app is now clean and ready for Vercel deployment!** 🚀

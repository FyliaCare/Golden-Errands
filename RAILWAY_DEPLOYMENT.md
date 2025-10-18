# 🚀 Golden Errands - Railway Deployment Guide

This guide will help you deploy the Golden Errands delivery management platform to Railway.

## 📋 Prerequisites

- Railway account ([signup here](https://railway.app))
- GitHub repository with your code
- Basic understanding of environment variables

## 🏗️ Deployment Architecture

The platform consists of:
- **Backend**: Node.js/TypeScript API with Prisma ORM
- **Frontend**: React/Vite single-page application  
- **Database**: PostgreSQL (managed by Railway)

## 🚀 Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure all the Railway configuration files are in place:
- ✅ `railway.json` (root level)
- ✅ `backend/Dockerfile`
- ✅ `frontend/Dockerfile`
- ✅ `backend/nixpacks.toml`
- ✅ `frontend/nixpacks.toml`
- ✅ Environment configuration files

### 2. Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your Golden Errands repository

**IMPORTANT**: Railway will detect this as a monorepo. You need to deploy each service separately:

#### Option 1: Deploy via Railway Dashboard (Recommended)
1. After connecting the repo, Railway will show "No services deployed"
2. Click **"+ New Service"** 
3. Select **"GitHub Repo"**
4. Choose your repository again
5. Set the **Root Directory** to either:
   - `backend` (for the API service)
   - `frontend` (for the web app)

#### Option 2: Deploy via Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy backend
cd backend
railway up

# Deploy frontend (in new terminal)
cd frontend
railway up
```

### 3. Set Up Database Service

1. In your Railway project, click **"+ New Service"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway will automatically create a PostgreSQL database
4. Note the connection details (Railway provides these as environment variables)

### 4. Configure Backend Service

1. **Deploy Backend:**
   - **Method 1 (Dashboard)**: Create new service → GitHub Repo → Set Root Directory to `backend`
   - **Method 2 (CLI)**: Run `railway up` from the `backend` directory
   - Railway will use the `backend/nixpacks.toml` configuration

2. **Set Environment Variables:**
   ```bash
   # Automatic (provided by Railway)
   DATABASE_URL=postgresql://...
   PORT=3000
   
   # Required (you must add these)
   JWT_ACCESS_SECRET=your-super-secure-access-secret-key-here
   JWT_REFRESH_SECRET=your-super-secure-refresh-secret-key-here
   GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   CORS_ORIGIN=https://your-frontend-domain.up.railway.app
   
   # Payment Gateways (add if using)
   PAYSTACK_SECRET_KEY=sk_test_...
   PAYSTACK_PUBLIC_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   
   # SMS/Email (add if using)
   TWILIO_ACCOUNT_SID=AC...
   TWILIO_AUTH_TOKEN=...
   TWILIO_PHONE_NUMBER=+1...
   SENDGRID_API_KEY=SG...
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   
   # Company Info
   COMPANY_NAME=Golden Errands
   COMPANY_EMAIL=info@goldenerrands.com
   COMPANY_PHONE=0256039212
   ```

3. **Database Setup:**
   - The backend will automatically run migrations on first deploy
   - To seed the database, add: `SEED_DATABASE=true`

### 5. Configure Frontend Service

1. **Deploy Frontend:**
   - **Method 1 (Dashboard)**: Create new service → GitHub Repo → Set Root Directory to `frontend`
   - **Method 2 (CLI)**: Run `railway up` from the `frontend` directory
   - Railway will use the `frontend/nixpacks.toml` configuration

2. **Set Environment Variables:**
   ```bash
   # Backend Connection
   VITE_API_BASE_URL=https://your-backend-domain.up.railway.app/api
   
   # API Keys (client-side)
   VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   VITE_PAYSTACK_PUBLIC_KEY=pk_test_...
   
   # App Info
   VITE_APP_NAME=Golden Errands
   VITE_COMPANY_PHONE=0256039212
   VITE_COMPANY_EMAIL=info@goldenerrands.com
   ```

### 6. Update Backend CORS

Once your frontend is deployed:
1. Copy the frontend URL (e.g., `https://golden-errands-frontend.up.railway.app`)
2. Update the backend's `CORS_ORIGIN` environment variable
3. Redeploy the backend service

## 🔧 Environment Variables Reference

### Critical Backend Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Auto-provided |
| `JWT_ACCESS_SECRET` | Secret for access tokens | ✅ Generate secure key |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | ✅ Generate secure key |
| `CORS_ORIGIN` | Frontend URL for CORS | ✅ Set after frontend deploy |

### Optional Integration Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_MAPS_API_KEY` | For maps functionality | 🔄 Recommended |
| `PAYSTACK_SECRET_KEY` | Payment processing | 🔄 If using Paystack |
| `STRIPE_SECRET_KEY` | Payment processing | 🔄 If using Stripe |
| `TWILIO_ACCOUNT_SID` | SMS notifications | ❌ Optional |
| `SENDGRID_API_KEY` | Email notifications | ❌ Optional |

### Frontend Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_BASE_URL` | Backend API endpoint | ✅ Required |
| `VITE_GOOGLE_MAPS_API_KEY` | Maps (client-side) | 🔄 Recommended |

## 🔐 Security Best Practices

1. **Generate Strong Secrets:**
   ```bash
   # Use a tool like this to generate secure secrets
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Use Environment-Specific Keys:**
   - Use test keys for staging
   - Use production keys for production

3. **Restrict CORS Origins:**
   - Set `CORS_ORIGIN` to your exact frontend domain
   - Don't use wildcards (*) in production

## 🐛 Troubleshooting

### Backend Issues
- **Build fails**: Check TypeScript compilation errors
- **Database connection fails**: Verify `DATABASE_URL` is set correctly
- **API not accessible**: Check PORT environment (Railway auto-assigns)

### Frontend Issues
- **API calls fail**: Verify `VITE_API_BASE_URL` points to backend
- **Build fails**: Check for missing environment variables
- **CORS errors**: Verify backend `CORS_ORIGIN` is set correctly

### Database Issues
- **Migration fails**: Check database connection and permissions
- **Seeding fails**: Verify `SEED_DATABASE=true` if needed

## 📊 Monitoring & Logs

1. **View Logs:**
   - Go to Railway dashboard
   - Select your service
   - Click "Logs" tab

2. **Monitor Performance:**
   - Railway provides CPU/memory usage metrics
   - Set up alerts for high resource usage

3. **Health Checks:**
   - Backend: `https://your-backend.up.railway.app/health`
   - Frontend: Access your app URL

## 🔄 Updates & Maintenance

1. **Automatic Deployments:**
   - Railway auto-deploys on git push to main branch
   - You can disable this in project settings

2. **Manual Deployments:**
   - Use Railway CLI: `railway deploy`
   - Or trigger from Railway dashboard

3. **Database Migrations:**
   - New migrations run automatically on deployment
   - Use `railway run npx prisma studio` to view data

## 🌐 Custom Domains

1. Go to your service settings in Railway
2. Navigate to "Domains" tab
3. Add your custom domain
4. Update DNS records as instructed
5. Update environment variables with new domain

## 📞 Support

- Railway Documentation: [docs.railway.app](https://docs.railway.app)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Project Issues: Create GitHub issues for bugs

---

🎉 **Congratulations!** Your Golden Errands platform should now be running on Railway.

Access your deployed application:
- **Frontend**: `https://your-frontend-service.up.railway.app`
- **Backend API**: `https://your-backend-service.up.railway.app`
- **API Docs**: `https://your-backend-service.up.railway.app/api-docs`
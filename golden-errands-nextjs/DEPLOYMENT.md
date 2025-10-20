# Deploying Golden Errands to Vercel

This guide will walk you through deploying your Next.js Golden Errands application to Vercel with a PostgreSQL database.

## Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- PostgreSQL database (we'll use Vercel Postgres or Neon)

## Step 1: Prepare Your Repository

1. **Initialize Git repository (if not already done):**
```powershell
cd "c:\Users\Jay Monty\Desktop\Projects\delivery_platform\Golden-Errands\golden-errands-nextjs"
git init
git add .
git commit -m "Initial commit: Next.js Golden Errands platform"
```

2. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it "golden-errands-nextjs"
   - Don't initialize with README (we already have one)

3. **Push to GitHub:**
```powershell
git remote add origin https://github.com/YOUR_USERNAME/golden-errands-nextjs.git
git branch -M main
git push -u origin main
```

## Step 2: Set Up Database

### Option A: Vercel Postgres (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Storage" → "Create Database"
3. Select "Postgres"
4. Choose a name (e.g., "golden-errands-db")
5. Select your region
6. Click "Create"
7. Copy the `DATABASE_URL` connection string

### Option B: Neon (Free PostgreSQL)

1. Go to [neon.tech](https://neon.tech)
2. Sign up/login
3. Create a new project
4. Copy the connection string

### Option C: Supabase (Free PostgreSQL)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (use "Connection pooling" mode)

## Step 3: Deploy to Vercel

1. **Go to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"

2. **Import your repository:**
   - Select your GitHub account
   - Choose "golden-errands-nextjs" repository
   - Click "Import"

3. **Configure Project:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

4. **Add Environment Variables:**
   Click "Environment Variables" and add:

   ```env
   DATABASE_URL=your-database-connection-string-here
   JWT_SECRET=generate-a-strong-secret-key-here
   JWT_REFRESH_SECRET=generate-another-strong-secret-key-here
   NODE_ENV=production
   NEXT_PUBLIC_APP_NAME=Golden Errands
   NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
   ```

   **Generate secure secrets:**
   ```powershell
   # In PowerShell, generate random strings:
   [System.Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
   ```

5. **Click "Deploy"**
   - Vercel will build and deploy your application
   - This may take 2-3 minutes

## Step 4: Initialize Database

After deployment, you need to run database migrations:

1. **Install Vercel CLI:**
```powershell
npm install -g vercel
```

2. **Login to Vercel:**
```powershell
vercel login
```

3. **Link your project:**
```powershell
cd "c:\Users\Jay Monty\Desktop\Projects\delivery_platform\Golden-Errands\golden-errands-nextjs"
vercel link
```

4. **Pull environment variables:**
```powershell
vercel env pull .env.production
```

5. **Run migrations:**
```powershell
npx prisma migrate deploy
```

Or you can run migrations from the Vercel dashboard:
- Go to your project → Settings → Functions
- Add a deployment hook that runs: `npx prisma migrate deploy`

## Step 5: Verify Deployment

1. **Visit your deployed application:**
   - URL: `https://your-app-name.vercel.app`

2. **Test API endpoints:**
   ```bash
   # Health check (create one if needed)
   curl https://your-app-name.vercel.app/api/health
   
   # Register a test user
   curl -X POST https://your-app-name.vercel.app/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"Test123!","firstName":"Test","lastName":"User"}'
   ```

3. **Check logs:**
   - Vercel Dashboard → Your Project → Deployments → View Function Logs

## Step 6: Custom Domain (Optional)

1. Go to your project → Settings → Domains
2. Add your custom domain
3. Follow Vercel's instructions to configure DNS
4. Update `NEXT_PUBLIC_APP_URL` environment variable

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request gets a preview URL

## Troubleshooting

### Build Fails

Check build logs in Vercel dashboard. Common issues:
- Missing environment variables
- Prisma Client not generated
- TypeScript errors

**Fix:**
```json
// Ensure your package.json has:
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}
```

### Database Connection Issues

- Ensure `DATABASE_URL` is correctly set
- Check if database allows connections from Vercel IPs
- For Vercel Postgres, make sure you're using the correct connection string

### API Routes Return 500

- Check Function Logs in Vercel dashboard
- Ensure all environment variables are set
- Verify Prisma Client is generated during build

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `JWT_SECRET` | Yes | Secret for access tokens |
| `JWT_REFRESH_SECRET` | Yes | Secret for refresh tokens |
| `NODE_ENV` | Yes | Set to "production" |
| `NEXT_PUBLIC_APP_NAME` | No | Application name |
| `NEXT_PUBLIC_APP_URL` | Yes | Your app's URL |

## Performance Tips

1. **Enable Edge Runtime** for faster API responses:
   ```typescript
   // In API routes
   export const runtime = 'edge';
   ```

2. **Use Vercel Analytics:**
   - Go to project → Analytics → Enable

3. **Enable ISR (Incremental Static Regeneration):**
   ```typescript
   // For pages that can be cached
   export const revalidate = 3600; // Revalidate every hour
   ```

## Security Checklist

- ✅ Strong JWT secrets (32+ characters)
- ✅ Database credentials in environment variables
- ✅ CORS properly configured
- ✅ Rate limiting enabled
- ✅ HTTPS enforced (automatic with Vercel)
- ✅ Environment variables not committed to Git

## Next Steps

1. Set up monitoring (Vercel Analytics, Sentry)
2. Configure custom domain
3. Set up email notifications
4. Add payment gateway integration
5. Configure backup strategy for database

## Support

For issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Check [Next.js Documentation](https://nextjs.org/docs)
- Check [Prisma Documentation](https://www.prisma.io/docs)

---

**Deployed by FyliaCare** 🚀

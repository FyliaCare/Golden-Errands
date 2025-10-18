# 🚀 Quick Start Guide - Golden Errands DMS

Get the Golden Errands Delivery Management System up and running in 5 minutes!

## Prerequisites Check

✅ Node.js installed? Run: `node --version` (need v18+)
✅ PostgreSQL installed? Run: `psql --version` (need v14+)
✅ npm installed? Run: `npm --version`

If any are missing, see INSTALLATION.md for detailed setup.

## Step 1: Install Backend Dependencies (2 min)

```powershell
cd backend
npm install
```

**What this does:**
- Installs TypeScript, Express, Prisma
- Installs authentication & security packages
- Sets up all required dependencies

## Step 2: Configure Database (30 seconds)

1. Create PostgreSQL database:
```sql
-- Run in psql or pgAdmin
CREATE DATABASE golden_errands;
```

2. Update `.env` file in backend folder:
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/golden_errands?schema=public"
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

## Step 3: Setup Database (1 min)

```powershell
# Still in backend folder
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

**What this does:**
- Creates all database tables
- Seeds test data
- Creates 6 demo user accounts

## Step 4: Start Backend Server (10 seconds)

```powershell
npm run dev
```

✅ **Success!** You should see:
```
🚀 Golden Errands API Server running on port 4000
📦 Environment: development
```

Backend is now running at: `http://localhost:4000`

## Step 5: Test the API (30 seconds)

Open a new terminal and test the login:

```powershell
curl -X POST http://localhost:4000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@goldenerrands.com\",\"password\":\"admin@2024\"}'
```

✅ **Success!** You should receive a JSON response with an access token.

## Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@goldenerrands.com | admin@2024 |
| Dispatch | dispatch@goldenerrands.com | dispatch@2024 |
| Driver | kwame.rider@goldenerrands.com | driver@2024 |
| Customer | customer@example.com | customer@2024 |

## Common Commands

```powershell
# Backend
cd backend
npm run dev              # Start development server
npm run build            # Build for production
npm run prisma:studio    # Open database viewer

# View logs
cat logs/combined.log    # All logs
cat logs/error.log       # Error logs only
```

## Testing Checklist

- [ ] Backend server starts without errors
- [ ] Can access `http://localhost:4000/health`
- [ ] Login API works with test credentials
- [ ] Database has 6 users (check with Prisma Studio)

## Troubleshooting

**Problem:** "Cannot find module"
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

**Problem:** Database connection failed
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Test connection: `psql -U postgres -d golden_errands`

**Problem:** Port 4000 already in use
```powershell
# Find and kill process using port 4000
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

## Next Steps

1. **Explore the API:**
   - Install Postman or Insomnia
   - Import the API collection (coming soon)
   - Test all endpoints

2. **View Database:**
   ```powershell
   npm run prisma:studio
   ```
   Opens at `http://localhost:5555`

3. **Customize:**
   - Update company info in system settings
   - Add more test users
   - Configure delivery zones

4. **Deploy:**
   - See deployment guide (coming soon)
   - Configure production environment
   - Set up SSL certificates

## API Quick Reference

**Base URL:** `http://localhost:4000/api`

**Authentication:**
- POST `/auth/login` - Login
- POST `/auth/register` - Register
- GET `/auth/profile` - Get profile (requires token)

**Orders:**
- POST `/orders` - Create order
- GET `/orders` - List orders
- GET `/orders/:id` - Get order details

**Drivers:**
- GET `/drivers` - List available drivers
- POST `/drivers/:id/location` - Update location

## Getting Help

1. Check INSTALLATION.md for detailed setup
2. See IMPLEMENTATION_SUMMARY.md for feature list
3. Review logs in `backend/logs/`
4. Contact: info@goldenerrands.com

---

**Total Setup Time:** ~5 minutes
**Difficulty:** Easy
**Status:** ✅ Ready to use

**You're all set!** 🎉

Now you can:
- Create orders
- Assign drivers
- Track deliveries
- Manage users

*Golden Errands - We deliver with passion!*

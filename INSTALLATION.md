# Golden Errands - Installation Guide

This guide will walk you through setting up the Golden Errands Delivery Management System on your local machine.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Database Configuration](#database-configuration)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **PostgreSQL** (v14 or higher)
   - Windows: https://www.postgresql.org/download/windows/
   - Verify installation: `psql --version`

3. **Git**
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

4. **Code Editor** (recommended: VS Code)
   - Download from: https://code.visualstudio.com/

### Optional but Recommended

- **PostgreSQL GUI Tool**: pgAdmin or DBeaver
- **API Testing Tool**: Postman or Insomnia
- **Terminal**: Windows Terminal (better than default cmd/powershell)

## Backend Setup

### Step 1: Navigate to Backend Directory

```powershell
cd "c:\Users\Jay Monty\Desktop\Projects\delivery_platform\backend"
```

### Step 2: Install Dependencies

```powershell
npm install
```

This will install all required packages including:
- Express, TypeScript, Prisma
- Authentication libraries (JWT, bcryptjs)
- Security packages (helmet, rate-limit)
- Logging and utility packages

### Step 3: Create Environment File

```powershell
# Copy the example environment file
copy .env.example .env
```

### Step 4: Configure Environment Variables

Open the `.env` file in your editor and update the following:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/golden_errands?schema=public"

# JWT Secrets (IMPORTANT: Change these in production!)
JWT_ACCESS_SECRET=your_very_secure_access_token_secret_key_here
JWT_REFRESH_SECRET=your_very_secure_refresh_token_secret_key_here

# Optional: API Keys (can be added later)
GOOGLE_MAPS_API_KEY=
TWILIO_ACCOUNT_SID=
PAYSTACK_SECRET_KEY=
```

**Important Notes:**
- Replace `yourpassword` with your PostgreSQL password
- The database `golden_errands` will be created in the next step
- JWT secrets should be long, random strings in production

## Database Configuration

### Step 1: Create Database

Open PostgreSQL command line (psql) or pgAdmin and create the database:

```sql
CREATE DATABASE golden_errands;
```

### Step 2: Generate Prisma Client

```powershell
npm run prisma:generate
```

This generates TypeScript types based on your Prisma schema.

### Step 3: Run Database Migrations

```powershell
npm run prisma:migrate
```

When prompted for a migration name, enter: `initial_migration`

This creates all database tables, indexes, and relationships.

### Step 4: Seed the Database

```powershell
npm run prisma:seed
```

This will:
- Create default admin, dispatch, driver, customer, and finance users
- Set up delivery zones
- Configure system settings

**Default Users Created:**
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@goldenerrands.com | admin@2024 |
| Dispatch | dispatch@goldenerrands.com | dispatch@2024 |
| Driver 1 | kwame.rider@goldenerrands.com | driver@2024 |
| Driver 2 | ama.delivery@goldenerrands.com | driver@2024 |
| Customer | customer@example.com | customer@2024 |
| Finance | finance@goldenerrands.com | finance@2024 |

### Step 5: Verify Database Setup (Optional)

```powershell
# Open Prisma Studio to view your database
npm run prisma:studio
```

This opens a browser-based database viewer at `http://localhost:5555`

## Start Backend Server

### Development Mode (Recommended for testing)

```powershell
npm run dev
```

You should see:
```
🚀 Golden Errands API Server running on port 4000
📦 Environment: development
🌐 CORS Origin: http://localhost:5173
📍 Access the API at: http://localhost:4000
```

### Production Build

```powershell
npm run build
npm start
```

## Frontend Setup

### Step 1: Navigate to Frontend Directory

Open a **new terminal window** and run:

```powershell
cd "c:\Users\Jay Monty\Desktop\Projects\delivery_platform\frontend"
```

### Step 2: Install Dependencies

```powershell
npm install
```

### Step 3: Start Development Server

```powershell
npm run dev
```

You should see:
```
VITE v4.4.9  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Testing the Application

### 1. Access the Frontend

Open your browser and navigate to: `http://localhost:5173`

### 2. Test Login

Try logging in with any of the seeded accounts:
- Email: `admin@goldenerrands.com`
- Password: `admin@2024`

### 3. Test API Directly

You can also test the API using curl or Postman:

```powershell
# Health check
curl http://localhost:4000/health

# Login
curl -X POST http://localhost:4000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@goldenerrands.com\",\"password\":\"admin@2024\"}'
```

## Troubleshooting

### Issue: "Cannot find module" errors

**Solution:**
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Issue: Database connection failed

**Solution:**
1. Verify PostgreSQL is running:
   ```powershell
   # Check if PostgreSQL service is running
   Get-Service -Name postgresql*
   ```

2. Test database connection:
   ```powershell
   psql -U postgres -d golden_errands
   ```

3. Verify DATABASE_URL in `.env` is correct

### Issue: Port already in use

**Solution:**
```powershell
# Find process using port 4000
netstat -ano | findstr :4000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Issue: Prisma migration errors

**Solution:**
```powershell
# Reset database (WARNING: Deletes all data!)
npm run prisma:migrate reset

# Then run seed again
npm run prisma:seed
```

### Issue: TypeScript compilation errors

**Solution:**
The TypeScript errors you see are expected until you run `npm install`. They will disappear once all dependencies are installed.

## Next Steps

After successful installation:

1. **Explore the API**
   - Check API documentation at `/api-docs` (coming soon)
   - Test all endpoints with Postman

2. **Customize Configuration**
   - Update company information in system settings
   - Configure delivery zones and pricing
   - Set up payment gateway credentials

3. **Deploy to Production**
   - See deployment guide in `/docs`
   - Configure production environment variables
   - Set up SSL certificates

## Getting Help

If you encounter issues not covered here:

1. Check the main README.md for more information
2. Review the logs in `backend/logs/`
3. Contact the development team

## Quick Reference Commands

```powershell
# Backend
cd backend
npm run dev              # Start development server
npm run build            # Build for production
npm run prisma:studio    # Open database viewer
npm run prisma:migrate   # Run migrations
npm run prisma:seed      # Seed database

# Frontend
cd frontend
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
```

---

**Congratulations!** 🎉 You've successfully set up Golden Errands Delivery Management System!

*For detailed feature documentation, see the main README.md file.*

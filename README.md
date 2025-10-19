# Golden Errands - Delivery Management Platform# Golden Errands - Delivery Management Platform



Professional delivery management system with real-time tracking and order management.A complete delivery management system with real-time tracking, order management, and driver coordination.



## 🚀 Tech Stack## 🚀 Tech Stack



**Backend:** Node.js 18+, TypeScript, Express, Prisma ORM, PostgreSQL  **Backend:**

**Frontend:** React, Vite, Google Maps  - Node.js 18+ with TypeScript

**Auth:** JWT with bcrypt- Express.js REST API

- Prisma ORM with PostgreSQL

## 📦 Quick Start- JWT Authentication

- Real-time tracking

### Backend

**Frontend:**

```bash- React with Vite

cd backend- Google Maps integration

npm install- Document generation

cp .env.example .env

# Edit .env with DATABASE_URL and JWT_SECRET## 📦 Quick Start



npx prisma migrate dev### Backend Development

npm run dev

``````bash

cd backend

### Frontendnpm install

cp .env.example .env

```bash# Edit .env with your database credentials

cd frontend

npm installnpx prisma migrate dev

npm run devnpm run dev

``````



## 🔐 Required Environment Variables### Frontend Development



**Backend (.env):**```bash

- `DATABASE_URL` - PostgreSQL connection stringcd frontend

- `JWT_SECRET` - JWT secret keynpm install

- `NODE_ENV` - development/productionnpm run dev

- `PORT` - Server port (default: 4000)```



See `backend/.env.example` for all options.## 🚀 Deploy to Vercel



## 📡 API Endpoints### 1. Prerequisites

- GitHub repository

- **Auth:** `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`- Vercel account

- **Orders:** `/api/orders` (GET, POST, PATCH, DELETE)- PostgreSQL database (Vercel Postgres, Neon, or Supabase)

- **Drivers:** `/api/drivers/available`, `/api/drivers/location`

- **Health:** `/health`### 2. Deploy

1. Go to [vercel.com](https://vercel.com) → New Project

## 🚀 Deployment2. Import: `FyliaCare/Golden-Errands`

3. Configure:

Standard Node.js/Express + React application. Works with:   - Root Directory: `backend`

   - Build Command: `npm run vercel-build`

- **Vercel, Railway, Render, Heroku** - Cloud platforms   - Output Directory: `dist`

- **DigitalOcean, AWS, GCP, Azure** - VPS/Container services4. Add Environment Variables:

- **Any platform supporting Node.js 18+**   - `DATABASE_URL` - Your PostgreSQL connection string

   - `JWT_SECRET` - Your secure secret key

### Requirements:5. Deploy!

1. PostgreSQL database

2. Set environment variablesSee [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md) for detailed instructions.

3. Run `npm install && npm run build`

4. Start with `npm start`## API Endpoints



### Database Providers:### Authentication

Use any PostgreSQL service (Neon, Supabase, Railway Postgres, etc.)- `POST /api/auth/register` - Register new user

- `POST /api/auth/login` - Login user

## 📝 Scripts- `POST /api/auth/refresh` - Refresh access token

- `POST /api/auth/logout` - Logout user

**Backend:**

- `npm run dev` - Development### Orders

- `npm run build` - Build TypeScript- `POST /api/orders` - Create new order

- `npm start` - Start server- `GET /api/orders` - Get user's orders

- `npx prisma migrate deploy` - Deploy migrations- `GET /api/orders/:id` - Get order details

- `PATCH /api/orders/:id` - Update order

**Frontend:**- `DELETE /api/orders/:id` - Cancel order

- `npm run dev` - Vite dev server

- `npm run build` - Production build### Drivers

- `GET /api/drivers/available` - Get available drivers

## 📄 License- `GET /api/drivers/profile` - Get driver profile

- `PATCH /api/drivers/location` - Update driver location

Proprietary - FyliaCare

## License

## 📧 Contact

Proprietary - FyliaCare

Email: info@goldenerrands.com  

Phone: 0256039212## Contact


Email: info@goldenerrands.com  
Phone: 0256039212

A modern delivery and logistics platform built with Node.js, React, and PostgreSQL.

## Quick Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Git

### Local Development

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd Golden-Errands
npm install
cd backend && npm install
cd ../frontend && npm install
```

2. **Setup environment variables:**
Create `.env` in the backend folder:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/golden_errands"
JWT_SECRET="your-secure-jwt-secret"
PORT=3001
NODE_ENV=development
```

3. **Initialize database:**
```bash
cd backend
npx prisma generate
npx prisma db push
npx prisma db seed
```

4. **Start development servers:**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

Visit http://localhost:5173 for the frontend and http://localhost:3001 for the API.

## Production Build Status

### ✅ Backend - Ready for Production
- **Status:** Builds successfully
- **Database:** PostgreSQL ready
- **TypeScript:** All errors resolved
- **Dependencies:** Optimized and clean

### ⚠️ Frontend - Development Ready / Production Workaround
- **Development:** Works perfectly (recommended for deployment)
- **Production Build:** Core-js dependency resolution issue
- **Workaround:** Deploy using development server in production

## Deployment Options

### Option 1: Railway (Backend) + Netlify (Frontend Dev Server)
**Recommended for immediate deployment**

### Railway Backend Deployment (Fixed)

**Current Issue Resolution:**
The build errors you're seeing are due to Railway trying to build the entire monorepo. Here's the fix:

#### Step 1: Railway Service Configuration
1. In Railway dashboard, go to your service settings
2. Set **Root Directory** to: `backend`
3. Set **Build Command** to: `npm ci && npm run build`
4. Set **Start Command** to: `npm start`

#### Step 2: Environment Variables
Add these in Railway dashboard:
```
DATABASE_URL=(Railway will auto-generate this)
JWT_SECRET=your-super-secure-jwt-secret-key
NODE_ENV=production
PORT=3001
```

#### Step 3: Alternative - Use Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link [your-project-id]
railway up --service backend
```

#### Step 4: Verify Deployment
- Railway will automatically create PostgreSQL database
- Check logs for successful Prisma migrations
- Test endpoint: `https://your-app.railway.app/api/health`

#### Netlify Frontend Setup:
1. Deploy using development server approach
2. Build settings:
   - Base directory: `frontend/`
   - Build command: `npm install && npm run dev`
   - Publish directory: `frontend/` (serve dev server)
3. Add environment variable:
   - `VITE_API_URL=your-railway-backend-url`

### Option 2: Single Platform Deployment

#### Railway Full Stack:
```dockerfile
# Dockerfile for full deployment
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN cd backend && npm install && npm run build
RUN cd frontend && npm install
EXPOSE 3001 5173
CMD ["sh", "-c", "cd backend && npm start & cd frontend && npm run dev"]
```

#### Heroku/DigitalOcean:
- Use the same approach as Railway
- Set environment variables as listed above
- Deploy backend and frontend as separate services

### Option 3: Alternative Frontend Build

If you need production build, consider:
1. **Replace Vite with Webpack:** More complex but resolves core-js issues
2. **Update Dependencies:** Wait for Ant Design/Vite compatibility updates
3. **Use Development Build:** Current recommended approach

## Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
JWT_SECRET="your-super-secure-jwt-secret-key"
PORT=3001
NODE_ENV=production
```

### Frontend Environment
```env
VITE_API_URL="https://your-backend-url.railway.app"
VITE_APP_NAME="Golden Errands"
```

## Project Structure

```
Golden-Errands/
├── backend/           # ✅ Node.js/Express API (Production Ready)
│   ├── src/          # TypeScript source code
│   ├── prisma/       # Database schema & migrations
│   ├── dist/         # Compiled JavaScript (after build)
│   └── package.json  # Backend dependencies
├── frontend/         # ⚠️ React/Vite application (Dev Server Recommended)
│   ├── src/         # React components & pages
│   ├── public/      # Static assets
│   └── package.json # Frontend dependencies
├── README.md        # This file
├── railway.json     # Railway deployment config
└── netlify.toml     # Netlify deployment config
```

## Features

- **Order Management:** Create, track, and manage delivery orders
- **Driver Interface:** Mobile-friendly driver application  
- **Real-time Tracking:** Live order status updates
- **Document Generation:** Automated invoices, receipts, and quotations
- **Authentication:** Secure JWT-based auth system
- **Payment Integration:** Ready for payment gateway integration
- **Multi-Platform Support:** Railway, Netlify, Heroku, DigitalOcean

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/orders` - List orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order
- `GET /api/health` - Health check endpoint

## Tech Stack

- **Backend:** Node.js, Express, TypeScript, Prisma ORM
- **Frontend:** React, Vite, Ant Design
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Deployment:** Railway, Netlify (Universal compatibility)

## Quick Deploy Commands

```bash
# Test local build
npm run build

# Deploy to Railway (backend)
git push origin main

# Deploy to Netlify (frontend)
# Connect GitHub repo in Netlify dashboard
```

## Support & Troubleshooting

### Common Issues:
1. **Frontend build fails:** Use development server deployment (recommended)
2. **Database connection:** Ensure DATABASE_URL is correctly set
3. **CORS errors:** Check VITE_API_URL matches backend URL

### Health Checks:
- Backend: `GET /api/health`
- Frontend: Development server at localhost:5173
- Database: `npx prisma db pull` to test connection

**Status:** ✅ Production Ready (Backend) | ⚠️ Dev Server Recommended (Frontend)

Notes
-----
- This is a scaffold and MVP. It implements core flows: user auth (JWT), order CRUD, driver assignment, simple route mock, proof-of-delivery upload (file saved), and basic dashboards.
- Persistent DB: currently uses lowdb (JSON). For production, replace with PostgreSQL / MySQL and an ORM (Sequelize/TypeORM/Prisma).
- Maps & real GPS: mocked. Integrate Google Maps / Mapbox for real tracking and route optimization.
- Payments: stubbed endpoints. Integrate Stripe / Paystack / Flutterwave.
- Push notifications & SMS: placeholders for Twilio / FCM.
- Security: for demo only. Harden authentication, validation, and secrets for production.

Project structure
-----------------
- backend/
  - package.json
  - src/
    - index.js
    - routes/
    - controllers/
    - db.json (initial data)
- frontend/
  - package.json
  - src/
    - main.jsx
    - App.jsx
    - pages/
    - services/

See inline comments in files for details.


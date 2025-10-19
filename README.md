# 🚚 Golden Errands - Delivery Management Platform# Golden Errands - Delivery Management Platform# Golden Errands - Delivery Management Platform



A complete full-stack delivery management system with real-time tracking, order management, and driver coordination.



[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app)Professional delivery management system with real-time tracking and order management.A complete delivery management system with real-time tracking, order management, and driver coordination.

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com)



---

## 🚀 Tech Stack## 🚀 Tech Stack

## ✨ Features



- 📦 **Order Management** - Create, track, and manage delivery orders

- 🚗 **Driver Interface** - Mobile-friendly driver application**Backend:** Node.js 18+, TypeScript, Express, Prisma ORM, PostgreSQL  **Backend:**

- 📍 **Real-time Tracking** - Live order status and location updates

- 📄 **Document Generation** - Automated invoices, receipts, and quotations**Frontend:** React, Vite, Google Maps  - Node.js 18+ with TypeScript

- 🔐 **Secure Authentication** - JWT-based auth with refresh tokens

- 💳 **Payment Ready** - Integration-ready for payment gateways**Auth:** JWT with bcrypt- Express.js REST API

- 📱 **Responsive Design** - Works on desktop and mobile

- Prisma ORM with PostgreSQL

---

## 📦 Quick Start- JWT Authentication

## 🏗️ Tech Stack

- Real-time tracking

### Backend

- **Runtime:** Node.js 18+ with TypeScript### Backend

- **Framework:** Express.js

- **Database:** PostgreSQL with Prisma ORM**Frontend:**

- **Authentication:** JWT with bcrypt

- **Container:** Docker (Alpine Linux)```bash- React with Vite



### Frontendcd backend- Google Maps integration

- **Framework:** React 18

- **Build Tool:** Vite 4npm install- Document generation

- **Maps:** Google Maps integration

- **Routing:** React Routercp .env.example .env

- **State:** Context API

# Edit .env with DATABASE_URL and JWT_SECRET## 📦 Quick Start

---



## 🚀 Quick Start

npx prisma migrate dev### Backend Development

### Prerequisites

- Node.js 18 or highernpm run dev

- PostgreSQL database

- Git``````bash



### Local Developmentcd backend



1. **Clone the repository:**### Frontendnpm install

```bash

git clone https://github.com/FyliaCare/Golden-Errands.gitcp .env.example .env

cd Golden-Errands

``````bash# Edit .env with your database credentials



2. **Setup Backend:**cd frontend

```bash

cd backendnpm installnpx prisma migrate dev

npm install

cp .env.example .envnpm run devnpm run dev

# Edit .env with your DATABASE_URL and JWT_SECRET

npx prisma generate``````

npx prisma db push

npm run dev

```

## 🔐 Required Environment Variables### Frontend Development

3. **Setup Frontend:**

```bash

cd ../frontend

npm install**Backend (.env):**```bash

npm run dev

```- `DATABASE_URL` - PostgreSQL connection stringcd frontend



4. **Access the application:**- `JWT_SECRET` - JWT secret keynpm install

- Frontend: http://localhost:5173

- Backend API: http://localhost:3000- `NODE_ENV` - development/productionnpm run dev



---- `PORT` - Server port (default: 4000)```



## 🌐 Production Deployment



See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for complete deployment guide.See `backend/.env.example` for all options.## 🚀 Deploy to Vercel



### Quick Deploy Steps:



1. **Backend (Railway):**## 📡 API Endpoints### 1. Prerequisites

   - Deploy from GitHub

   - Add PostgreSQL database- GitHub repository

   - Set environment variables (DATABASE_URL, JWT_SECRET, PORT, NODE_ENV)

   - Initialize database via `/api/setup/init-database`- **Auth:** `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`- Vercel account



2. **Frontend (Vercel):**- **Orders:** `/api/orders` (GET, POST, PATCH, DELETE)- PostgreSQL database (Vercel Postgres, Neon, or Supabase)

   - Import from GitHub

   - Set Root Directory to `frontend`- **Drivers:** `/api/drivers/available`, `/api/drivers/location`

   - Add `VITE_API_URL` environment variable

   - Deploy- **Health:** `/health`### 2. Deploy



---1. Go to [vercel.com](https://vercel.com) → New Project



## 📁 Project Structure## 🚀 Deployment2. Import: `FyliaCare/Golden-Errands`



```3. Configure:

Golden-Errands/

├── backend/                 # Node.js Express APIStandard Node.js/Express + React application. Works with:   - Root Directory: `backend`

│   ├── src/

│   │   ├── routes/         # API endpoints   - Build Command: `npm run vercel-build`

│   │   ├── controllers/    # Business logic

│   │   ├── middleware/     # Auth, validation- **Vercel, Railway, Render, Heroku** - Cloud platforms   - Output Directory: `dist`

│   │   └── config/         # Configuration

│   ├── prisma/- **DigitalOcean, AWS, GCP, Azure** - VPS/Container services4. Add Environment Variables:

│   │   └── schema.prisma   # Database schema

│   ├── Dockerfile          # Container configuration- **Any platform supporting Node.js 18+**   - `DATABASE_URL` - Your PostgreSQL connection string

│   └── package.json

│   - `JWT_SECRET` - Your secure secret key

├── frontend/               # React Vite application

│   ├── src/### Requirements:5. Deploy!

│   │   ├── pages/         # Route pages

│   │   ├── components/    # Reusable components1. PostgreSQL database

│   │   └── config/        # API configuration

│   └── package.json2. Set environment variablesSee [VERCEL_DEPLOY.md](VERCEL_DEPLOY.md) for detailed instructions.

│

├── docs/                  # Documentation3. Run `npm install && npm run build`

│   └── DEPLOYMENT.md      # Deployment guide

└── README.md             # This file4. Start with `npm start`## API Endpoints

```



---

### Database Providers:### Authentication

## 🔌 API Endpoints

Use any PostgreSQL service (Neon, Supabase, Railway Postgres, etc.)- `POST /api/auth/register` - Register new user

### Authentication

- `POST /api/auth/register` - Register new user- `POST /api/auth/login` - Login user

- `POST /api/auth/login` - Login user

- `POST /api/auth/refresh` - Refresh access token## 📝 Scripts- `POST /api/auth/refresh` - Refresh access token

- `POST /api/auth/logout` - Logout user

- `POST /api/auth/logout` - Logout user

### Orders

- `GET /api/orders` - Get user's orders**Backend:**

- `POST /api/orders` - Create new order

- `GET /api/orders/:id` - Get order details- `npm run dev` - Development### Orders

- `PATCH /api/orders/:id` - Update order

- `DELETE /api/orders/:id` - Cancel order- `npm run build` - Build TypeScript- `POST /api/orders` - Create new order



### Drivers- `npm start` - Start server- `GET /api/orders` - Get user's orders

- `GET /api/drivers/available` - Get available drivers

- `GET /api/drivers/profile` - Get driver profile- `npx prisma migrate deploy` - Deploy migrations- `GET /api/orders/:id` - Get order details

- `PATCH /api/drivers/location` - Update driver location

- `PATCH /api/orders/:id` - Update order

### System

- `GET /health` - Health check endpoint**Frontend:**- `DELETE /api/orders/:id` - Cancel order

- `POST /api/setup/init-database` - Initialize database tables

- `GET /api/setup/database-status` - Check database status- `npm run dev` - Vite dev server



---- `npm run build` - Production build### Drivers



## 🔐 Environment Variables- `GET /api/drivers/available` - Get available drivers



### Backend (.env)## 📄 License- `GET /api/drivers/profile` - Get driver profile

```env

DATABASE_URL="postgresql://user:password@host:5432/dbname"- `PATCH /api/drivers/location` - Update driver location

JWT_SECRET="your-super-secret-key-change-in-production"

JWT_ACCESS_EXPIRY="15m"Proprietary - FyliaCare

JWT_REFRESH_EXPIRY="7d"

PORT=3000## License

NODE_ENV=production

CORS_ORIGIN="https://your-frontend-url.vercel.app"## 📧 Contact

```

Proprietary - FyliaCare

### Frontend (.env.production)

```envEmail: info@goldenerrands.com  

VITE_API_URL="https://your-backend.up.railway.app/api"

```Phone: 0256039212## Contact



---

Email: info@goldenerrands.com  

## 📝 Development ScriptsPhone: 0256039212



### BackendA modern delivery and logistics platform built with Node.js, React, and PostgreSQL.

```bash

npm run dev        # Start development server with hot reload## Quick Setup

npm run build      # Compile TypeScript to JavaScript

npm start          # Start production server### Prerequisites

npm run prisma     # Open Prisma Studio (database GUI)- Node.js 18+

```- PostgreSQL database

- Git

### Frontend

```bash### Local Development

npm run dev          # Start Vite dev server

npm run build:vite   # Build for production1. **Clone and install dependencies:**

npm run preview      # Preview production build```bash

```git clone <repository-url>

cd Golden-Errands

---npm install

cd backend && npm install

## 🧪 Testingcd ../frontend && npm install

```

### Test Backend Health

```powershell2. **Setup environment variables:**

Invoke-RestMethod -Uri "http://localhost:3000/health"Create `.env` in the backend folder:

``````env

DATABASE_URL="postgresql://username:password@localhost:5432/golden_errands"

### Test RegistrationJWT_SECRET="your-secure-jwt-secret"

```powershellPORT=3001

$body = @{NODE_ENV=development

  email = "test@example.com"```

  password = "Test123!"

  firstName = "Test"3. **Initialize database:**

  lastName = "User"```bash

  phone = "0256039212"cd backend

} | ConvertTo-Jsonnpx prisma generate

npx prisma db push

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/register" -Method Post -Body $body -ContentType "application/json"npx prisma db seed

``````



---4. **Start development servers:**

```bash

## 🗺️ Roadmap# Terminal 1 - Backend

cd backend

- [ ] Mobile app (React Native)npm run dev

- [ ] Payment gateway integration (Paystack/Stripe)

- [ ] SMS notifications (Twilio)# Terminal 2 - Frontend  

- [ ] Advanced route optimizationcd frontend

- [ ] Multi-language supportnpm run dev

- [ ] Admin dashboard```

- [ ] Analytics and reporting

Visit http://localhost:5173 for the frontend and http://localhost:3001 for the API.

---

## Production Build Status

## 🤝 Contributing

### ✅ Backend - Ready for Production

This is a proprietary project by FyliaCare. For collaboration inquiries, please contact us.- **Status:** Builds successfully

- **Database:** PostgreSQL ready

---- **TypeScript:** All errors resolved

- **Dependencies:** Optimized and clean

## 📄 License

### ⚠️ Frontend - Development Ready / Production Workaround

Proprietary - © 2025 FyliaCare. All rights reserved.- **Development:** Works perfectly (recommended for deployment)

- **Production Build:** Core-js dependency resolution issue

---- **Workaround:** Deploy using development server in production



## 📞 Contact & Support## Deployment Options



- **Email:** info@goldenerrands.com### Option 1: Railway (Backend) + Netlify (Frontend Dev Server)

- **Phone:** +233 (0) 256 039 212**Recommended for immediate deployment**

- **Company:** FyliaCare

### Railway Backend Deployment (Fixed)

---

**Current Issue Resolution:**

## 🙏 AcknowledgmentsThe build errors you're seeing are due to Railway trying to build the entire monorepo. Here's the fix:



Built with:#### Step 1: Railway Service Configuration

- [Express.js](https://expressjs.com/)1. In Railway dashboard, go to your service settings

- [React](https://react.dev/)2. Set **Root Directory** to: `backend`

- [Prisma](https://www.prisma.io/)3. Set **Build Command** to: `npm ci && npm run build`

- [Railway](https://railway.app/)4. Set **Start Command** to: `npm start`

- [Vercel](https://vercel.com/)

#### Step 2: Environment Variables

---Add these in Railway dashboard:

```

**Status:** ✅ Production Ready | 🚀 Actively DeployedDATABASE_URL=(Railway will auto-generate this)

JWT_SECRET=your-super-secure-jwt-secret-key

*For detailed deployment instructions, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)*NODE_ENV=production

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


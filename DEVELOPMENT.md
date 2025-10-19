# Golden Errands - Clean Development Setup

## 🎯 Project Structure

This is a clean development environment with no deployment configurations.

```
Golden-Errands/
├── README.md              # Project overview
├── NEXT_STEPS.md          # Development guide
├── backend/               # Node.js/Express API
│   ├── src/              # TypeScript source code
│   ├── prisma/           # Database schema
│   ├── package.json      # Dependencies
│   └── tsconfig.json     # TypeScript config
└── frontend/             # React application
    ├── src/              # React components
    ├── package.json      # Dependencies
    └── vite.config.js    # Vite config
```

## 🚀 Local Development

### Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

Server runs on: `http://localhost:3000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App runs on: `http://localhost:5173`

### Environment Variables

Create `backend/.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/golden_errands"
JWT_SECRET="your-secret-key"
PORT=3000
NODE_ENV=development
```

## 📦 Build for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

Output: `frontend/dist/`

## 🎨 Tech Stack

**Backend:**
- Node.js 18+
- TypeScript
- Express
- Prisma ORM
- PostgreSQL

**Frontend:**
- React 18
- Vite
- Ant Design
- Axios

## 📝 Available Scripts

### Backend
- `npm run dev` - Development server with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Run production build
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### Frontend
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview production build

## 🔧 Development Tools

- **Backend**: `tsx` for TypeScript execution
- **Frontend**: Vite for fast development
- **Database**: Prisma Studio for database management

---

**Note:** All deployment configurations have been removed. This is a clean development environment.

For deployment, you'll need to add platform-specific configuration files based on your chosen hosting provider.

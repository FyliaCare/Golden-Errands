Delivery Management System - Fullstack MVP Scaffold
==================================================

What's included:
- backend/        -> Node.js + Express minimal API (uses lowdb JSON store for demo)
- frontend/       -> React + Vite scaffold with pages for Admin, Dispatcher, Driver, Customer
- README contains run instructions and notes about features included and extension points.

How to run (locally)
--------------------
1. Install Node.js (>=18) and npm.
2. Backend:
   cd backend
   npm install
   npm run dev
   (Express server runs on http://localhost:4000)
3. Frontend:
   cd frontend
   npm install
   npm run dev
   (Vite dev server runs on http://localhost:5173)

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


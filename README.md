# 🛍️ Nova Store - Full Stack E-commerce App

**Tech Stack:** React (frontend), Node.js/Express (backend), PostgreSQL (database), Prisma ORM, Stripe (payments)

## 🔧 Features

### 🧑‍💻 Customer Features:
- User registration & login (JWT Auth)
- Product browsing & search
- Shopping cart with quantity updates
- Stripe checkout integration
- Order history

### 🛠️ Admin Features (optional):
- Product & category management
- View customer orders

---

## 🗂️ Folder Structure

### Frontend (`/client`)
```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Main pages (Home, Product, Cart, Checkout)
│   ├── context/        # Auth & Cart context
│   ├── services/       # API calls to backend
│   ├── App.jsx
│   └── main.jsx
├── public/
├── vite.config.js
```

### Backend (`/server`)
```
server/
├── src/
│   ├── controllers/    # Route logic
│   ├── routes/         # API route handlers
│   ├── middleware/     # Auth & error middleware
│   ├── models/         # Prisma models
│   ├── utils/          # Helper functions (Stripe config, etc)
│   └── index.js        # Entry point
├── prisma/schema.prisma
├── .env
```

---

## 🛠️ Setup Instructions

### 1. Clone Repo
```bash
git clone https://github.com/yourusername/nova-store.git
cd nova-store
```

### 2. Setup Backend
```bash
cd server
npm install
npx prisma migrate dev --name init
dotenv -e .env -- node src/index.js
```

### 3. Setup Frontend
```bash
cd ../client
npm install
npm run dev
```

---

## 🌐 Deployment
- Frontend: [Vercel](https://vercel.com/)
- Backend: [Render](https://render.com/), [Railway](https://railway.app/)
- Database: [Supabase](https://supabase.io/), [ElephantSQL](https://www.elephantsql.com/)

---

## 🎯 To-Do / Stretch Goals
- Add product reviews & ratings
- Admin dashboard UI
- Email order confirmations
- Pagination & filtering

---

## 🔗 License
MIT License

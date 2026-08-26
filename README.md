# ☕ Brew Haven Cafe

> **A modern full‑stack cafe web application** – online ordering, table reservations, real‑time order tracking, admin dashboard, loyalty points, and more.

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8-010101?logo=socket.io)](https://socket.io/)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Environment Variables](#3-environment-variables)
  - [4. Seed the Database (Optional)](#4-seed-the-database-optional)
  - [5. Run the Application](#5-run-the-application)
- [API Endpoints](#api-endpoints)
- [Admin Dashboard](#admin-dashboard)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🧠 Overview

Brew Haven Cafe is a full‑featured web application designed for a modern café. It allows customers to browse a dynamic menu, place orders with customizations, reserve tables, earn loyalty points, and track orders in real time. The admin dashboard provides complete control over orders, reservations, menu items, reviews, and users.

Built with **React** (frontend) and **Node.js + Express + MongoDB** (backend), the app uses **Socket.io** for live updates and **JWT** for secure authentication (guest users are supported without passwords).

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🍽️ **Dynamic Menu** | Fetched from MongoDB, filterable by category, dietary tags, and search. |
| 🛒 **Cart & Checkout** | Add items with customizations (milk, sweetness, extras), view subtotal, tax, and tip. |
| 📦 **Order Placement** | Choose dine‑in, pickup, or delivery. Email confirmation sent automatically. |
| 🔄 **Real‑time Order Tracking** | Live status updates via Socket.io (Received → Preparing → Ready → Delivered). |
| 🪑 **Table Reservations** | Pick date, time, guests, and seating area (Garden, Indoor, Rooftop, Private). |
| ⭐ **Reviews & Ratings** | Users can leave reviews and mark them as helpful. |
| 👤 **User Profile** | Edit name, phone, address, view order history and loyalty points. |
| 🎯 **Loyalty Program** | Earn 1 point per ₹100 spent. Points can be redeemed (future feature). |
| 🔐 **Authentication** | Guest login (no password) and Google OAuth ready (backend implemented, frontend button available). |
| 🛡️ **Admin Dashboard** | Manage orders, reservations, reviews, users, and menu items (CRUD). |
| 📧 **Email Notifications** | Order and reservation confirmations via Nodemailer. |
| 🌙 **Dark Mode** | Built with Tailwind CSS, respects system preference. |
| 📱 **Responsive** | Works on desktop, tablet, and mobile. |

---

## 🧰 Tech Stack

### Frontend
- **React 19** – UI library
- **Vite** – build tool
- **TypeScript** – type safety
- **Tailwind CSS 4** – styling
- **React Router v6** – routing
- **Axios** – HTTP client
- **Socket.io‑client** – real‑time updates
- **Lucide React** – icons
- **Motion** – animations

### Backend
- **Node.js 22** – runtime
- **Express 4** – web framework
- **MongoDB 8** + **Mongoose** – database & ODM
- **Socket.io** – real‑time bi‑directional communication
- **JSON Web Tokens** – authentication
- **bcryptjs** – password hashing
- **Nodemailer** – email service
- **CORS** – cross‑origin resource sharing
- **dotenv** – environment variables

---

## 📂 Project Structure
artisan-cafe/
├── src/ # Frontend (React)
│ ├── api/ # Axios client
│ ├── components/ # Reusable UI components
│ ├── context/ # React Context providers (Auth, Cart, Theme, Socket)
│ ├── data/ # Static data (gallery, menu – now only fallback)
│ ├── pages/ # Route pages (AdminDashboard, UserProfile)
│ ├── types/ # TypeScript interfaces
│ ├── App.tsx
│ ├── main.tsx
│ └── index.css
├── server/ # Backend (Node.js)
│ ├── models/ # Mongoose models (User, Order, Reservation, Review, MenuItem, Loyalty)
│ ├── routes/ # Express route handlers
│ ├── middleware/ # auth, admin
│ ├── services/ # email.cjs (Nodemailer)
│ ├── seed.cjs # Optional script to seed menu items
│ ├── server.cjs # Entry point
│ ├── .env.example # Example environment variables
│ └── package.json
├── .gitignore
├── package.json
├── README.md
└── ... (vite config, tsconfig, etc.)

text

---

## 🛠️ Prerequisites

- **Node.js** (v18 or later) – [Download](https://nodejs.org/)
- **MongoDB** – local installation or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free tier
- **Git** – for cloning

> If you use **MongoDB Atlas**, you’ll need a connection string (see `.env`).

---

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/artisan-cafe.git
cd artisan-cafe
2. Install Dependencies
bash
# Frontend (root)
npm install

# Backend (server/ folder)
cd server
npm install
3. Environment Variables
Create server/.env (copy from .env.example) and fill in your values:

env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@brew-haven-cafe.forlqby.mongodb.net/artisan_cafe
JWT_SECRET=your_super_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password   # For Gmail, use an App Password (not your regular password)
Important: .env is already in .gitignore – never commit it.

4. Seed the Database (Optional)
To populate the menu with sample items (prices in ₹200–₹620), run:

bash
cd server
node seed.cjs
You’ll see ✅ Menu seeded with INR prices!.
You can also manage menu items via the admin dashboard later.

5. Run the Application
Start the backend (from server/ folder):

bash
node server.cjs
# or with auto‑restart (if you have nodemon installed)
npm run dev
You should see:

text
✅ MongoDB connected
🚀 Server running on port 5000
Start the frontend (in a separate terminal, from root):

bash
npm run dev
Now open your browser at http://localhost:3000 – the Brew Haven Cafe app is live.

If port 5000 is busy, the backend automatically tries the next available port (5001, etc.).
Update src/api/client.js with the correct port if needed.

## Deploy to Render

1. Push this repository to GitHub and create a new **Blueprint** in Render.
2. Select the repository. Render will use `render.yaml` to create the API and static frontend services.
3. In the API service, set `MONGODB_URI` to a MongoDB Atlas connection string and fill in `EMAIL_USER` and `EMAIL_PASS` if email notifications are needed.
4. If you change the API service name, update the frontend service's `VITE_API_URL` to `https://<api-service>.onrender.com/api`, then redeploy the frontend.

The frontend service is configured with an SPA rewrite, and the backend listens on Render's `PORT` environment variable. Keep `JWT_SECRET` configured in Render and never commit `.env` files.

🌐 API Endpoints
All endpoints are prefixed with /api.
Public routes (no authentication required) are marked with *.

Method	Route	Description
GET	/menu *	List active menu items
POST	/orders *	Place a new order
GET	/orders/:id *	Get order by ID (tracking)
PUT	/orders/:id/status *	Update order status (simulation)
POST	/reservations *	Create a table reservation
GET	/reservations?email= *	Get reservations by email (guest)
DELETE	/reservations/:id?email= *	Cancel reservation (guest)
POST	/auth/guest *	Create a guest session (returns JWT)
POST	/auth/login	Login with email/password
POST	/auth/register	Register new user
GET	/auth/me	Get current user (needs token)
GET	/profile	Get profile + loyalty + orders (auth)
PUT	/profile	Update profile (auth)
GET	/admin/orders	Admin – list all orders
PUT	/admin/orders/:id	Admin – update order status
...	...	(Full admin CRUD for orders, reservations, reviews, users, menu)
🛡️ Admin Dashboard
Access the admin panel at /admin (e.g., http://localhost:3000/admin).
You need a user with role: "admin" – set it manually in MongoDB:

js
db.users.updateOne({ email: "your-email@example.com" }, { $set: { role: "admin" } })
The dashboard provides:

Orders: View all orders, change status with one click.

Reservations: List and cancel bookings.

Reviews: Approve or delete customer reviews.

Users: Change user roles (user/admin).

Menu: Add, edit, delete menu items (with image URL, price, customizations).


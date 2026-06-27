# Taskflow — MERN Todo App

A full-stack Todo application built with MongoDB, Express, React, and Node.js.

---

## 📁 Project Structure

```
todo-mern/
├── backend/          # Express + MongoDB API
│   ├── models/       # Mongoose schemas
│   ├── routes/       # REST endpoints
│   ├── server.js     # Entry point
│   ├── .env          # Environment variables
│   └── package.json
└── frontend/         # React app
    ├── public/
    ├── src/
    │   ├── api/          # Axios calls
    │   ├── components/   # UI components
    │   ├── context/      # Global state (Context + useReducer)
    │   ├── App.js
    │   └── index.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local) **or** a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

### 1. Backend

```bash
cd backend
npm install
```

Edit `.env` to set your MongoDB URI:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-mern
# or for Atlas:
# MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/todo-mern
```

```bash
npm run dev   # starts with nodemon
# or
npm start     # production
```

### 2. Frontend

```bash
cd frontend
npm install
npm start     # runs on http://localhost:3000
```

The React app proxies `/api` requests to `http://localhost:5000` automatically.

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/todos` | Get all todos (optional: `?completed=true&priority=high`) |
| GET | `/api/todos/:id` | Get single todo |
| POST | `/api/todos` | Create todo |
| PUT | `/api/todos/:id` | Update todo |
| PATCH | `/api/todos/:id/toggle` | Toggle completed |
| DELETE | `/api/todos/:id` | Delete todo |
| DELETE | `/api/todos/bulk/completed` | Delete all completed |

---

## ✨ Features

- ✅ Create, read, update, delete tasks
- 🔄 Toggle complete / incomplete
- 🏷 Priority levels: Low / Medium / High
- 📅 Optional due dates with overdue detection
- 🔍 Filter by status (All / Active / Completed) and priority
- 🗑 Bulk delete completed tasks
- 💾 Data persists in MongoDB
- 📱 Responsive design

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Context API, useReducer, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Styling | Pure CSS with CSS variables |

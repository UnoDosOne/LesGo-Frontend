# LesGo Web Application

**LesGo** is a modern, full-stack web-based student queuing system. It features a responsive **React (Vite)** frontend and a RESTful **Express.js** backend, integrated with **MongoDB** for persistent storage. The frontend and backend are unified under a single project structure for ease of deployment and maintenance.

---

## 🚀 Features

### Frontend (React + Vite)
- Fast, modular development with **Vite**.
- Component-based UI built with **React**.
- Fully responsive design using **Tailwind CSS**.
- Seamless API communication with backend.

### Backend (Express.js + MongoDB)
- RESTful API server built with **Express.js**.
- Uses **Mongoose** for MongoDB interaction.
- Handles authentication, request validation, and form queuing logic.

### Full-Stack Integration
- Unified deployment: frontend is built and served through the Express server in production.
- Environment-based configuration using `.env`.

---

## 📦 Project Structure

LesGo-WebApp/ │ ├── backend/ # Express server code │ └── ...
│ ├── frontend/ # Vite + React application │ ├── public/ │ └── src/ │ ├── components/ │ ├── pages/ │ ├── routes/ │ └── main.jsx │ ├── .env # Environment variables ├── package.json # Shared dependencies and scripts ├── vite.config.js # Vite config (frontend) └── server.js # Express entry point (backend + static frontend)

yaml
Copy
Edit

---

## ✅ Prerequisites

Ensure the following are installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (locally or via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

## 🛠️ Installation

1. **Clone the repository**

bash
git clone https://github.com/UnoDosOne/LesGo-WebApp.git
cd LesGo-WebApp








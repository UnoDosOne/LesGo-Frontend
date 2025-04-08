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

Install dependencies

Install all required packages for both backend and frontend:

bash
Copy
Edit
npm install
Configure environment variables

Create a .env file in the root directory:

dotenv
Copy
Edit
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<db-name>?retryWrites=true&w=majority
PORT=5000
⚠️ Replace <username>, <password>, and <db-name> with your actual MongoDB credentials.

🧪 Running the Application
Development Mode (Frontend + Backend Concurrently)
Start the development servers for both frontend and backend:

bash
Copy
Edit
npm run dev
Frontend will run on: http://localhost:5173

Backend API will run on: http://localhost:5000/api

Requests from the frontend are proxied to the backend using Vite's proxy config.

Production Build
To build the React frontend and serve it via Express:

bash
Copy
Edit
# Build the frontend
npm run build

# Start the Express server
npm start
The frontend will be served statically from the Express backend at http://localhost:5000

🧾 License
This project is licensed under the MIT License.

text
Copy
Edit
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), ...
[license text truncated for brevity]
👤 Author
UnoDosOne

GitHub: @UnoDosOne

Email: [your.email@example.com]

📬 Feedback or Contributions?
Feel free to submit an issue or pull request. Contributions are always welcome!

python
Copy
Edit

---

Let me know if you'd like to generate a separate `README.md` specifically for the `frontend` folder (Re






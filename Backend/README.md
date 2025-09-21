# 🔧 Backend - Note App

This is the **backend** of the Note App, built with **Node.js**, **Express**, and **MongoDB**.  
It provides REST APIs for authentication, CRUD operations on notes, and image upload with Cloudinary.

---

## 🚀 Features
- User Authentication (Signup, Login)
- JWT-based Authentication & Authorization
- CRUD APIs for Notes
- Upload and manage images using **Multer + Cloudinary**
- Secure password hashing with bcrypt
- Error handling and validations

---

## ⚙️ Installation
```bash
cd Backend
npm install
npm run dev
```

---

## 🔑 Environment Variables
Create a `.env` file in the backend folder with the following keys:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 📡 API Endpoints
### Auth Routes
- `POST /api/auth/signup` → Register a new user  
- `POST /api/auth/login` → Login and get JWT  

### Note Routes
- `POST /api/notes` → Create a new note (with optional image)  
- `GET /api/notes` → Get all notes for the logged-in user  
- `GET /api/notes/:id` → Get a single note  
- `PUT /api/notes/:id` → Update a note  
- `DELETE /api/notes/:id` → Delete a note  

---

## 🛠️ Tech Stack
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- Multer + Cloudinary  
- JWT + bcrypt  

---

## 📄 License
MIT License

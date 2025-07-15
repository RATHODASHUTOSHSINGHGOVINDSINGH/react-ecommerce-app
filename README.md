🚀 **Deployed My E-commerce App — Firebase Auth + Cart Logic + React Hooks!**

## **Tech Stack:** React + Vite, React Router, Firebase Auth,Firestore, Tailwind CSS**

**Code:** https://github.com/RATHODASHUTOSHSINGHGOVINDSINGH/react-ecommerce-app

 **Live:** https://react-ecommerce-app-ashutosh-rathod-projects.vercel.app/

💡 **Real-world problem and Solution:**
Problem: Users lose their shopping cart after logging in, which stops them from completing their purchase.
Solution: This app uses Firebase Auth and Firestore to keep each user’s cart saved and secure after login.

✅ **My solution:**

🔐 Firebase Auth for secure login & signup

🛍️ Each user gets a private shopping cart — saved in Firestore

📦 Cart is automatically restored after login, even on a new device

🔐 Only the logged-in user can view or update their own cart

🎨 Clean UI styled with Tailwind CSS

🌐 Deployed instantly with Vercel

---

✨ Key Features:
✅ Firebase Auth (Email/password sign-up and login)

✅ Firestore Integration — each user has their own private cart

✅ Cart Persistence — saved and restored automatically after login

✅ Protected Routes using React Router (only logged-in users can access cart)

✅ Responsive UI with Tailwind CSS

✅ Deployed on Vercel for smooth, fast performance

---

📚 **What I learned while building this:**

🔐 Authentication & Authorization with Firebase Auth

📦 Real-time data handling using Firestore

🧠 Solving real-world UX issues like cart loss after login

🔄 React hooks: useState, useEffect, useContext for global auth state

🚦 Route protection using React Router, useNavigate, useLocation

💻 Component-driven, clean, and DRY architecture with reusable logic

⚡ Deployed with Vercel for fast frontend performance

---

# 📁 Portfolio Project Setup

## ✅ Installation

### 1. Install Vite with React

```bash
npm create vite@latest my-portfolio --template react
cd my-portfolio
npm install
npm run dev
```

### 2. Install Tailwind CSS v4

```bash
npm install tailwindcss @tailwindcss/vite
```

#### Configure `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

#### Add Tailwind to `src/index.css`

```css
@import "tailwindcss";
```

### 3. Configure the Vite Plugin

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
});
```

### 4. Install React Router v7

```bash
npm install react-router
```

Wrap your app in `main.jsx`:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

### 5. Initialize Git Repository

```bash
git init
git remote add origin <your-repo-url>
git add .
git commit -m "Initial commit"
git push origin main
```

### 6. Build and Deploy on Vercel

```bash
npm run build
```

Then:

1. Go to [Vercel](https://vercel.com/)
2. Import GitHub repo
3. Configure & Deploy

### 7. Add `vercel.json`

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

# ✅ Firebase Auth Setup — Full Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Add project → Name it `blog-app`
3. Register Web App → Copy `firebaseConfig`

## Step 2: Install Firebase SDK

```bash
npm install firebase
```

## Step 3: Setup Firebase SDK

📄 **src/firebase.js**

```js
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

## Step 4: Auth Pages

📄 **src/pages/Signup.jsx** and 📄 **src/pages/Login.jsx** (with React states and Firebase Auth methods)

## Step 5: App Routing

📄 **src/App.jsx**

```jsx
import { BrowserRouter, Routes, Route } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
```

## Firebase Auth Configuration Error Fix:

✅ **Enable Email/Password Auth** in Firebase Console
✅ Add `localhost` and `vercel.app` to **Authorized Domains**

Restart server:

```bash
npm run dev
```

## 🌐 Deployment

1. Push to GitHub
2. Deploy from Vercel
3. Add domain in Firebase Auth → Authorized Domains

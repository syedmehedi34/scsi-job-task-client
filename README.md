# Task Management Application

## 📌 Overview

A fully responsive **Task Management Application** where users can **add, edit, delete, and reorder** tasks using a **drag-and-drop interface**. Tasks are categorized into **To-Do, In Progress, and Done**, with instant database updates to ensure persistence. The application integrates **Firebase Authentication** for user login and uses **real-time synchronization** with **TanStack Query**.

## 🌐 Live Demo

🔗 [Live Application](https://my-todo-task-management.netlify.app/)

## 📁 Repository Links

- **Frontend:** [GitHub Repository](https://github.com/syedmehedi34/scsi-job-task-client)
- **Backend:** [GitHub Repository](https://github.com/syedmehedi34/scsi-job-task-server)

---

## 📜 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Bonus Features](#-bonus-features)
- [Contributors](#-contributors)

---

## ✨ Features

- **User Authentication:** Google Sign-In via Firebase.
- **Task Management System:**
  - Add, edit, delete, and reorder tasks.
  - Categorized into **To-Do, In Progress, and Done**.
  - **Drag and drop** tasks within and across categories.
  - Changes are **saved instantly** to the database.
- **Modern UI:** Built with TailwindCSS and Material Tailwind.
- **Fully Responsive:** Works seamlessly on both desktop and mobile.
- **Real-Time Synchronization:** Uses **TanStack Query** for efficient data fetching.

---

## 🛠 Technologies Used

### **Frontend:**

- [React](https://react.dev/) (with Vite.js)
- [TanStack React Query](https://tanstack.com/query/latest)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)

### **Backend:**

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

## 📥 Installation

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/syedmehedi34/scsi-job-task-client
```

### **2️⃣ Install Dependencies**

#### **Frontend**

`cd frontend
npm install`

#### **Backend**

`cd backend
npm install`

### **3️⃣ Configure Environment Variables**

#### **Frontend (`.env.local`)**

Create a `.env.local` file in the **frontend** folder and add:

`VITE_apiKey=replace_your
VITE_authDomain=replace_your
VITE_projectId=replace_your
VITE_storageBucket=replace_your
VITE_messagingSenderId=replace_your
VITE_appId=replace_your

#### **Backend (`.env`)**

Create a `.env` file in the **backend** folder and add:

`PORT=5000
MONGO_URI=mongodb+srv://your_mongodb_connection_string
JWT_SECRET=your_jwt_secret`

---

## 🚀 Usage

### **Run the Backend**

`cd backend
npm start`

or for development mode:

`npm run dev`

### **Run the Frontend**

`cd frontend
npm run dev`

---

## 🎉 Bonus Features

- **🌙 Dark Mode** toggle for better accessibility.
- **📅 Task Due Dates** with color-coded urgency indicators.
- **📜 Activity Log** to track changes (e.g., "Task moved to Done"). [Need to add future]

---

## 👨‍💻 Contributors

- **Syed Mehedi Hasan** - [GitHub](https://github.com/syedmehedi34)

---

🔥 **Developed with ❤️ using React, Express, and MongoDB.**

`This README is **well-structured**, **detailed**, and **easy to follow**. Let me know if you need any modifications! 🚀`

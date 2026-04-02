# 🔧 CRM System - Complete Database & Login Setup

## ✅ What Was Fixed

1. **Fixed seedUsers.js** - Corrected User import and completed database fields
2. **Added test-db-setup.js** - Script to verify database connection and user creation
3. **All files connected** - Database, server, authentication, and frontend all linked

---

## 🚀 Complete Setup Steps

### **Step 1: Clean Install and Start Fresh**

```bash
# From project root (d:\crm-system)

# Delete old database and cache
rmdir /s /q client\node_modules
rmdir /s /q server\node_modules

# Reinstall everything
npm install
npm install --prefix server
npm install --prefix client
```

### **Step 2: Start Backend Server**

```bash
cd d:\crm-system\server
npm start
```

**You should see:**

```
✅ MySQL connection successful
✅ Database 'crm_db_v2' ready
✅ Models synced successfully
✅ Default user created successfully
📧 Email: himanshuagrawal257@gmail.com
🔑 Password: Himanshu@2004
✅ Server running on port 5000
```

### **Step 3: Start Frontend (New Terminal)**

```bash
cd d:\crm-system\client
npm run dev
```

**You should see:**

```
✓ VITE Local: http://localhost:5173/
✓ Press h + enter to show help
```

### **Step 4: Open Browser**

Go to: `http://localhost:5173`

---

## 🔑 Login Credentials

- **📧 Email:** `himanshuagrawal257@gmail.com`
- **🔑 Password:** `Himanshu@2004`

---

## 🧪 Test Database Setup

If you want to verify database setup before starting the full app:

```bash
cd d:\crm-system\server
node test-db-setup.js
```

This will:

1. Test MySQL connection
2. Create database
3. Sync models
4. Create/verify default user

---

## 📋 Files Connected & Fixed

### **Backend Files:**

✅ `server/src/server.js`

- Imports and calls seedDefaultUser() on startup
- Creates database and syncs models
- Seeds default user automatically

✅ `server/src/seeds/seedUsers.js`

- Fixed User import (was wrong: `import { User }`, now correct: `import User`)
- Complete User.create() with all fields: firstName, lastName, email, password
- Checks if user exists before creating
- Sets role as 'admin' and isActive as true

✅ `server/src/models/User.js`

- firstName, lastName (actual database fields)
- email, password, role, isActive
- Password hashing via bcrypt hooks
- comparePassword() method for login validation

✅ `server/src/controllers/auth.controller.js`

- Login function validates email and password
- Compares hashed password with bcrypt.compare()
- Returns JWT token on successful login
- Sends user data to frontend

✅ `server/src/config/db.js`

- Sequelize connection to MySQL
- Loads variables from .env

### **Frontend Files:**

✅ `client/src/services/api.js`

- Login API calls authAPI.login(email, password)
- Stores JWT token in localStorage
- Adds token to all API requests
- Auto-redirects on 401 unauthorized

✅ `client/src/context/AuthContext.jsx`

- Manages login state and token
- Saves token to localStorage
- Provides useAuth hook for components

✅ `client/src/pages/Login.jsx`

- Login form with email and password inputs
- Validates inputs before submission
- Shows error messages on failed login
- Stores token and redirects to dashboard on success

---

## 🔄 Database Flow

```
User enters credentials in Login page
         ↓
Frontend calls: authAPI.login(email, password)
         ↓
Backend auth.controller.js login() function
         ↓
Queries User model for email
         ↓
Compares password with bcrypt.compare()
         ↓
If match: generates JWT token
         ↓
Returns token + user data to frontend
         ↓
Frontend stores token in localStorage
         ↓
All future requests include token in header
         ↓
Dashboard loads! ✅
```

---

## 🐛 Troubleshooting

### **"Login Failed" Error**

1. **Check MySQL is running**

   ```bash
   # Windows - Check MySQL service
   # XAMPP: Start MySQL
   # Or: net start MySQL80
   ```

2. **Check .env file** (`server/.env`)

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=Himanshu@2004
   DB_NAME=crm_db_v2
   ```

3. **Check server console for errors**
   - Should show "Default user created successfully"
   - If not, user creation failed

4. **Test database script**
   ```bash
   cd server
   node test-db-setup.js
   ```

### **"User not found" Error**

- User wasn't created during startup
- Delete database manually in MySQL Workbench
- Restart server to recreate from scratch

### **Frontend still blank**

- Make sure backend is running (http://localhost:5000 accessible)
- Check browser console (F12) for errors
- Delete client node_modules and reinstall

---

## ✨ Quick Commands

| Command                               | What It Does                      |
| ------------------------------------- | --------------------------------- |
| `npm run start-all`                   | Start backend + frontend together |
| `npm start` (from server)             | Start backend only                |
| `npm run dev` (from client)           | Start frontend only               |
| `node test-db-setup.js` (from server) | Test database connection          |

---

## 📊 Complete Integration Summary

```
DATABASE (MySQL)
    ↓
SERVER (Express.js + Sequelize)
    ├─ Models (User, Lead, Customer, etc.)
    ├─ Controllers (auth, leads, customers, etc.)
    ├─ Routes (/api/auth, /api/leads, etc.)
    └─ Middleware (auth verification)
        ↓
API ENDPOINTS
    ↓
FRONTEND (React + Material-UI)
    ├─ Services (API calls with axios)
    ├─ Context (Auth state management)
    ├─ Pages (Login, Dashboard, Leads, etc.)
    └─ Components (Layout, Forms, Tables)
        ↓
BROWSER
    └─ http://localhost:5173 ✅
```

---

## 🎯 What Happens on Server Start

1. ✅ Loads .env variables
2. ✅ Connects to MySQL
3. ✅ Creates `crm_db_v2` database if missing
4. ✅ Closes MySQL connection
5. ✅ Connects Sequelize to database
6. ✅ Syncs all models (creates tables)
7. ✅ **CALLS seedDefaultUser()** → Creates default user
8. ✅ Starts Express server on port 5000
9. ✨ Ready for login!

---

## 🎉 You're All Set!

1. **Start Backend:** `cd server && npm start`
2. **Start Frontend:** `cd client && npm run dev` (in new terminal)
3. **Open:** http://localhost:5173
4. **Login:**
   - Email: `himanshuagrawal257@gmail.com`
   - Password: `Himanshu@2004`
5. **See Dashboard!** 🎊

---

**Questions?**

- Check backend terminal for error messages
- Check frontend console (F12) for client-side errors
- Read `STARTUP-GUIDE.md` for more details

**All files are connected and ready!** ✅

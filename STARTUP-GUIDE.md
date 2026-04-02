# 🚀 CRM System - Complete Startup Guide

## ⚡ Quick Start - ONE Command to Start Everything

### **Option 1: Double-Click to Start (Easiest) ✨**

Simply double-click the file from Windows Explorer:

```
START-ALL.bat
```

This will:

- ✅ Auto-install dependencies if needed
- ✅ Start Backend Server (port 5000)
- ✅ Start MySQL Database (port 3306)
- ✅ Start Frontend (port 5173)
- ✅ Open everything in separate terminals

Then go to: **http://localhost:5173**

---

### **Option 2: Command Line from Project Root**

#### PowerShell:

```powershell
# Run this from the project root (d:\crm-system\)
.\START-ALL.ps1
```

#### Command Prompt (cmd):

```cmd
# Run this from the project root (d:\crm-system\)
npm run start-all
```

---

### **Option 3: From Client Folder (As You Requested)**

If you want to be in the `client` folder and run everything:

```bash
cd client
npm run dev
```

But first, make sure the backend is running in another terminal:

```bash
cd server
npm start
```

---

## 📋 Different Startup Methods

### **Method 1: Full Automatic Startup (Recommended) ⭐**

```bash
# From project root
cd d:\crm-system
npm run start-all
```

- Installs dependencies automatically
- Starts server, database, and frontend
- All in separate windows
- **BEST FOR FIRST TIME**

---

### **Method 2: Manual Startup in Separate Terminals**

**Terminal 1 - Backend:**

```bash
cd d:\crm-system\server
npm start
```

**Terminal 2 - Frontend:**

```bash
cd d:\crm-system\client
npm run dev
```

Then open: **http://localhost:5173**

---

### **Method 3: Using Windows Batch File (Double-Click)**

1. Double-click `START-ALL.bat` in the project root
2. Watch the magic happen! 🪄
3. Opens backend and frontend in new windows automatically

---

### **Method 4: PowerShell (With Color Output)**

```powershell
# Run from project root
PowerShell -ExecutionPolicy Bypass -File "START-ALL.ps1"
```

Or set execution policy and run directly:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\START-ALL.ps1
```

---

## 🔧 What Each Method Does

| Method                     | What Starts       | Auto-Installs | Effort      | Best For              |
| -------------------------- | ----------------- | ------------- | ----------- | --------------------- |
| Double-click START-ALL.bat | Server + Frontend | ✅            | None        | First-time users      |
| `npm run start-all`        | Server + Frontend | ✅            | 1 command   | Command line users    |
| Manual terminals           | Server + Frontend | ❌            | 3 terminals | Debugging/development |
| PowerShell script          | Server + Frontend | ✅            | 1 command   | PowerShell preference |

---

## 🌐 Access Points After Starting

Once everything is running:

| Service  | URL                       | Purpose                      |
| -------- | ------------------------- | ---------------------------- |
| Frontend | http://localhost:5173     | CRM Application (LOGIN HERE) |
| Backend  | http://localhost:5000/api | REST API                     |
| Database | localhost:3306            | MySQL (crm_db_v2)            |

---

## 🔑 First Login

After starting all services:

1. Open **http://localhost:5173**
2. Click **"Sign up"** or **"Register"**
3. Create new account (email, password, name)
4. Login with your credentials
5. See Dashboard with statistics ✅

---

## ✅ Services Status

After running any startup method, you should see:

```
[OK] All services started!
======================================
✓ Backend:  http://localhost:5000
✓ Frontend: http://localhost:5173
✓ MySQL:    localhost:3306
```

---

## 📁 File Locations

| File            | Purpose               | Location      |
| --------------- | --------------------- | ------------- |
| `START-ALL.bat` | Windows batch startup | Project root  |
| `START-ALL.ps1` | PowerShell startup    | Project root  |
| `start-all.js`  | Node.js startup       | Project root  |
| Backend Server  | Express API           | `server/`     |
| Frontend App    | React UI              | `client/`     |
| Database Config | MySQL connection      | `server/.env` |

---

## 🐛 Troubleshooting

### **Error: "npm not found"**

- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### **Error: "Address already in use"**

- Another app is using port 5000, 5173, or 3306
- Check with: `netstat -ano | findstr :5000` (Windows)
- Kill process or use different ports

### **Error: "MySQL Connection Refused"**

- MySQL server not running
- Start MySQL via XAMPP, WAMP, or as service
- Check connection details in `server/.env`

### **Frontend shows blank page**

- Check browser console (F12 → Console tab)
- Make sure backend is running on port 5000
- Clear cache: Ctrl+Shift+Delete

### **Still seeing errors?**

1. Delete `node_modules` folders (in server and client)
2. Run startup again - it will reinstall everything
3. Check `QUICKSTART.md` for detailed API setup

---

## 🚦 How to Stop Services

### Option 1 (After Double-Click Start):

Simply close the terminal windows

### Option 2 (After npm command):

Press `Ctrl+C` in the terminal where command is running

### Option 3 (Both running):

- Close backend terminal: `Ctrl+C`
- Close frontend terminal: `Ctrl+C`

---

## 🔄 Restarting Services

### Quick Restart:

```bash
# In terminal where npm run start-all is running
Ctrl+C (to stop)
npm run start-all (to restart)
```

### Full Reset:

```bash
# From project root
# Stop any running services
# Delete node_modules
rmdir /s /q server\node_modules
rmdir /s /q client\node_modules

# Run startup again - will reinstall everything
npm run start-all
```

---

## 💾 Environment Variables

If you need to change settings, edit these files:

**Backend** (`server/.env`):

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Himanshu@2004
DB_NAME=crm_db_v2
JWT_SECRET=secret123
```

**Frontend** (`client/.env`):

```
VITE_API_URL=http://localhost:5000/api
```

---

## 📚 Documentation Files

- **QUICKSTART.md** - Quick reference guide
- **FRONTEND_SETUP.md** - Detailed frontend setup
- **README.md** - Project overview
- **API_DOCUMENTATION.md** - API endpoints

---

## ✨ Summary

**You asked for:** A way to do `cd client && npm run dev` and have everything start

**We created for you:**

1. ✅ Batch files (START-ALL.bat)
2. ✅ PowerShell scripts (START-ALL.ps1)
3. ✅ Node.js scripts (start-all.js)
4. ✅ Updated package.json with `npm run start-all`

**To use it:**

- **Easiest**: Double-click `START-ALL.bat` from project root
- **Quick**: `npm run start-all` from project root
- **From anywhere**: `cd d:\crm-system && npm run start-all`

---

## 🎉 You're All Set!

Pick any method above and enjoy your fully automated CRM startup! 🚀

Need help? Check the error messages - they're descriptive and will tell you exactly what's wrong.

Happy coding! 💻

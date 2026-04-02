# 🚀 CRM System - Complete Startup Guide

## ⚡ QUICK START (Choose One Method)

### Method 1: Windows Batch File (EASIEST) ✨

1. **Double-click** `START-CRM.bat` in the root folder
2. Wait 30 seconds for servers to start
3. Open browser to `http://localhost:5173`
4. ✅ Done!

### Method 2: Windows PowerShell

1. **Right-click** `START-CRM.ps1` → Run with PowerShell
2. If you get execution error, run once:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Then run the script again
4. Open browser to `http://localhost:5173`

### Method 3: From Command Line / Terminal

```bash
# From root folder
npm run dev
```

This will start both backend and frontend servers simultaneously.

### Method 4: Individual Servers (For Debugging)

**Terminal 1 - Start Backend:**

```bash
cd server
npm start
# Backend runs on http://localhost:5000
```

**Terminal 2 - Start Frontend:**

```bash
cd client
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📋 What Each Command Does

| Command               | Location      | Does What                                                |
| --------------------- | ------------- | -------------------------------------------------------- |
| `npm run dev`         | Root folder   | ▶️ Starts BOTH backend + frontend together               |
| `npm run server`      | Root folder   | ▶️ Starts only backend server (port 5000)                |
| `npm run client`      | Root folder   | ▶️ Starts only frontend server (port 5173)               |
| `npm start`           | Server folder | ▶️ Starts backend (same as `npm run server`)             |
| `npm run dev`         | Client folder | ▶️ Starts frontend (same as `npm run client`)            |
| `npm run install-all` | Root folder   | 📦 Installs all dependencies for both frontend & backend |

---

## ✅ Prerequisites

Before starting, make sure you have:

1. **Node.js** installed
   - Check: `node --version` (should be v16 or higher)
   - Download: https://nodejs.org/

2. **MySQL Server** running
   - Windows: Start MySQL from Services panel
   - Or use: MySQL Command Line Client
   - Check: `mysql --version`

3. **Ports Available**
   - Port 5000 (Backend API)
   - Port 5173 (Frontend)
   - Port 3306 (MySQL Database)

---

## 🔍 First Time Setup

If this is your first run:

```bash
# Install all dependencies
npm run install-all

# Then start everything
npm run dev
```

---

## 🌐 Access Points

Once running, open in your browser:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **MySQL:** localhost:3306

---

## 📝 Login Details

After creating an account on the Sign Up page:

- Email: `your-email@example.com`
- Password: `your-password`

---

## 🛑 Stopping Everything

- **If using batch file:** Close the command window or press `Ctrl+C`
- **If using `npm run dev`:** Press `Ctrl+C` in terminal

---

## 🐛 Troubleshooting

### "Port 5000 already in use"

- Another process is using port 5000
- Solution: Kill the process or change port in `server/.env`

### "Port 5173 already in use"

- Another process is using port 5173
- Solution: Kill the process or Vite will auto-select next port

### "Cannot find module"

- Dependencies not installed
- Solution: Run `npm run install-all` from root

### "Connection refused to MySQL"

- MySQL server is not running
- Solution: Start MySQL service

### "Blank frontend page"

- Check browser console (F12)
- Make sure backend is running on port 5000
- Try refreshing the page

### "Backend shows error on startup"

- Database might not exist (it will auto-create)
- Check if MySQL is running
- Check `.env` files are configured correctly

---

## 📂 Environment Variables

### Backend (server/.env)

```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Himanshu@2004
DB_NAME=crm_db_v2
JWT_SECRET=secret123
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### Frontend (client/.env)

```
VITE_API_URL=http://localhost:5000/api
```

---

## 📊 What Happens When You Start

1. **Concurrently** launches both servers
2. **Backend** (Node.js):
   - Connects to MySQL
   - Auto-creates database `crm_db_v2` if needed
   - Auto-syncs Sequelize models
   - Starts API on port 5000
   - Shows: `✓ Server running on port 5000`

3. **Frontend** (Vite):
   - Compiles React + Material-UI components
   - Starts dev server on port 5173
   - Shows: `VITE v5.0.8 ready in XXX ms`
   - Watches for file changes

4. **Browser**:
   - Open http://localhost:5173 automatically (on some systems)
   - You'll see the Login page
   - Create account → Login → Access dashboard

---

## 💾 Viewing Live Logs

When both servers are running, you'll see logs like:

```
[0] ✓ Server running on port 5000
[0] ▸ Database connected: crm_db_v2
[1] VITE v5.0.8 ready in 523 ms
[1] ➜ Local: http://localhost:5173/
[1] ➜ Press q to quit
```

- `[0]` = Backend logs
- `[1]` = Frontend logs

---

## 🔄 Development Workflow

### Making Backend Changes

1. Edit files in `server/src/`
2. If using `npm start`: Restart server
3. If using `npm run dev`: Auto-restarts with nodemon

### Making Frontend Changes

1. Edit files in `client/src/`
2. Auto-reloads in browser (Vite HMR)
3. Changes appear instantly

### Making Database Changes

1. Edit Sequelize models in `server/src/models/`
2. Database syncs automatically on startup
3. ✅ No migrations needed for dev

---

## 🎯 Other Useful Commands

```bash
# Check what's running on ports
netstat -ano | findstr :5000    # Check port 5000
netstat -ano | findstr :5173    # Check port 5173
netstat -ano | findstr :3306    # Check port 3306

# Kill a process using a port (Windows)
taskkill /PID [PID] /F

# Install dependencies individually
cd server && npm install
cd ../client && npm install
```

---

## ✨ Next Steps

Once everything is running:

1. ✅ Create an account
2. ✅ Login to dashboard
3. ✅ Add some leads/customers
4. ✅ Test the CRUD operations
5. ✅ Check the API responses (DevTools F12 → Network tab)

---

## 📞 Support

If you encounter issues:

1. Check the console logs (both backend and frontend)
2. Verify MySQL is running
3. Make sure ports are available
4. Check `.env` files are configured
5. Try running `npm run install-all` again
6. Restart both servers

---

**Happy coding! 🎉**

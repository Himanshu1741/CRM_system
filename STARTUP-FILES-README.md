# 🎯 CRM System - Startup Files Guide

Welcome! This guide explains how to start your complete CRM system using different methods. Choose the one that works best for you!

---

## 📁 Startup Files Overview

| File | Type | How to Use | Best For |
|------|------|-----------|----------|
| **START-CRM.bat** | Windows Batch | Double-click it | Windows users (EASIEST) |
| **START-CRM.ps1** | PowerShell | Right-click → Run with PowerShell | Advanced Windows users |
| **start-all.js** | Node.js Script | `node start-all.js` or `npm run start:all` | Developers / Cross-platform |
| **STARTUP-GUIDE.md** | Documentation | Read for detailed info | Learning all options |

---

## 🚀 Quick Start (Choose One)

### Option 1: Windows Batch File (EASIEST) ✨
**Best for: Windows users who want simplicity**

```
1. Find: START-CRM.bat in the root folder
2. Double-click it
3. Wait 30 seconds
4. Open: http://localhost:5173
5. Done! ✅
```

**What it does automatically:**
- ✓ Checks Node.js installation
- ✓ Checks MySQL status
- ✓ Installs missing dependencies
- ✓ Starts backend + frontend together
- ✓ Shows URLs and logs in one window

---

### Option 2: Command Line / Terminal (FLEXIBLE)
**Best for: Developers & Linux/Mac users**

```bash
# From project root folder
npm run dev
```

Or individually:
```bash
# Terminal 1
npm run server          # Backend only

# Terminal 2
npm run client          # Frontend only
```

---

### Option 3: PowerShell Script (ADVANCED)
**Best for: Windows PowerShell users**

```powershell
# Right-click START-CRM.ps1 → Run with PowerShell
# Or from PowerShell terminal:
.\START-CRM.ps1
```

**First time only:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### Option 4: Node.js Startup Script (CUSTOM)
**Best for: Developers wanting custom startup logic**

```bash
npm run start:all
# Or directly:
node start-all.js
```

---

## 📋 What Each Startup Method Does

### Batch File (START-CRM.bat)
```
[1/5] Check Node.js                  ✓
[2/5] Check MySQL service           ✓ (warns if not running)
[3/5] Check dependencies            ✓ (installs concurrently)
[4/5] Check server node_modules     ✓ (installs if missing)
[5/5] Check client node_modules     ✓ (installs if missing)

→ npm run dev                        (starts both servers)

Backend: http://localhost:5000
Frontend: http://localhost:5173
```

### npm run dev (from terminal)
```
→ Runs concurrently:
  - Backend: cd server && npm start
  - Frontend: cd client && npm run dev

Backend: http://localhost:5000
Frontend: http://localhost:5173
```

### Node.js Script (start-all.js)
```
[✓] Check Node.js version
[✓] Check server node_modules
[✓] Check client node_modules
    ↓ Install missing
[✓] Install root dependencies

→ npm run dev                        (starts both servers)

Backend: http://localhost:5000
Frontend: http://localhost:5173
```

---

## ✅ Prerequisites Checklist

Before starting, verify:

- [ ] **Node.js installed** - `node --version` should return v16+
  - Download from: https://nodejs.org/
  
- [ ] **MySQL running** - Windows Services panel or MySQL Command Line
  - Check: `mysql --version`

- [ ] **Ports are free:**
  - 5000 (Backend)
  - 5173 (Frontend)  
  - 3306 (MySQL)

- [ ] **Folders are set up:**
  - `server/` folder exists with `src/server.js`
  - `client/` folder exists with React app
  - Root `package.json` exists

---

## 📂 What Happens When You Start

### Backend Server (Port 5000)
```
1. Connects to MySQL
2. Checks if crm_db_v2 database exists
3. If missing → Creates it automatically
4. Syncs Sequelize models to database
5. Starts listening on http://localhost:5000
6. Ready for API requests ✅
```

### Frontend Server (Port 5173)
```
1. Vite compiler starts
2. Bundles React + Material-UI components
3. Starts dev server with HMR (hot reload)
4. Listening on http://localhost:5173
5. Auto-refreshes on file changes ✅
```

### First Load in Browser
```
1. Open http://localhost:5173
2. See Login page (no account yet)
3. Click "Sign up"
4. Create account with email/password
5. Login
6. See Dashboard ✅
```

---

## 🔥 Common Issues & Fixes

| Problem | Solution |
|---------|----------|
| Batch file doesn't run | Enable scripts: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` |
| "Port 5000 in use" | Kill process or change server PORT in `server/.env` |
| "Cannot find module" | Run `npm run install-all` |
| MySQL not found | Start MySQL service or install from https://dev.mysql.com/downloads/mysql/ |
| Blank frontend page | Check browser console (F12), refresh page |
| "Database connection error" | Ensure MySQL is running with correct credentials in `server/.env` |

---

## 💡 Pro Tips

### View Both Logs Clearly
If using batch/PowerShell/npm run dev, you'll see:
- `[0]` prefix = Backend logs
- `[1]` prefix = Frontend logs

### Stop Everything
- **Batch file:** Close window or press `Ctrl+C`
- **Terminal:** Press `Ctrl+C`
- **PowerShell:** Press `Ctrl+C`

### Check if Services Running
```bash
# Check ports
netstat -ano | findstr :5000    # Backend
netstat -ano | findstr :5173    # Frontend
netstat -ano | findstr :3306    # MySQL
```

### Auto-Install Dependencies
```bash
npm run install-all
```

### Just Start One Server
```bash
npm run server          # Backend only (port 5000)
npm run client          # Frontend only (port 5173)
```

---

## 🎯 Development Workflow

Once servers are running:

1. **Make backend changes** (in `server/src/`)
   - Auto-restarts if using `npm run dev`
   - Manual restart if using `npm start`

2. **Make frontend changes** (in `client/src/`)
   - Auto-reloads in browser (Vite HMR)
   - Changes visible instantly

3. **Make database changes** (in `server/src/models/`)
   - Auto-syncs on backend restart
   - No migrations needed

---

## 🔄 Startup Methods Comparison

| Method | Speed | Easy | Skills Needed | Best For |
|--------|-------|------|---------------|----------|
| **Batch File** | Medium | ⭐⭐⭐⭐⭐ | None | Windows beginners |
| **Command Line** | Fast | ⭐⭐⭐⭐ | Basic terminal | Most users |
| **PowerShell** | Medium | ⭐⭐⭐ | PowerShell | Windows advanced |
| **Node.js Script** | Medium | ⭐⭐⭐ | JavaScript | Developers |

---

## 📞 Help & Support

1. **Check logs** - Look in the terminal window console logs
2. **Verify MySQL** - Make sure MySQL service is running
3. **Reinstall dependencies** - `npm run install-all`
4. **Check .env files:**
   - `server/.env` - Database credentials
   - `client/.env` - API URL configuration
5. **Restart everything** - Sometimes fixes random issues

---

## 🎉 Success Indicators

When everything is working:

✅ Backend shows: `Server running on port 5000`
✅ Frontend shows: `VITE ready in XXX ms`
✅ Browser loads login page at `http://localhost:5173`
✅ Can create account and login
✅ Dashboard shows statistics

---

## 📖 Read More

- **[STARTUP-GUIDE.md](./STARTUP-GUIDE.md)** - Detailed setup instructions
- **[QUICKSTART.md](./QUICKSTART.md)** - Quick reference
- **[FRONTEND_SETUP.md](./FRONTEND_SETUP.md)** - Frontend architecture
- **[server/README.md](./server/README.md)** - Backend setup

---

## 🎓 File Descriptions

### START-CRM.bat
Windows batch script that:
- Checks Node.js is installed
- Checks MySQL is running  
- Installs missing dependencies
- Starts both servers together
- Shows helpful status messages

**Perfect for:** Clicking and forgetting

---

### START-CRM.ps1
PowerShell version with:
- Colored console output
- Service status checking
- Dependency verification
- Graceful error messages

**Perfect for:** PowerShell enthusiasts

---

### start-all.js
Node.js script with:
- Cross-platform compatibility
- Programmatic dependency checking
- Clean startup output
- Exit code handling

**Perfect for:** Custom CI/CD pipelines

---

### STARTUP-GUIDE.md
Comprehensive guide covering:
- All startup methods
- Environment variables
- Troubleshooting
- Development workflow
- API endpoints

**Perfect for:** Learning all options

---

## ✨ That's It!

Choose your preferred startup method above and you're ready to go!

**Questions?** Check the troubleshooting section or read the detailed guides linked above.

**Happy coding! 🚀**

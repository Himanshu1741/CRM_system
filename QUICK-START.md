# 🎯 QUICK REFERENCE - How to Start Your CRM System

## ⚡ ONE COMMAND START

### From Command Prompt (cmd):

```
cd d:\crm-system
npm run start-all
```

### From PowerShell:

```
cd d:\crm-system
.\START-ALL.ps1
```

### From Windows Explorer:

```
Double-click: START-ALL.bat
```

---

## 📊 What Happens When You Start

```
┌─────────────────────────────────────┐
│  Running: npm run start-all         │
└─────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  Check Project Folders              │
│  ✓ server/ found                    │
│  ✓ client/ found                    │
└─────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  Install Dependencies (if needed)   │
│  ✓ npm install (server)             │
│  ✓ npm install (client)             │
└─────────────────────────────────────┘
                  │
        ┌────────┴────────┐
        ▼                 ▼
   ┌─────────┐      ┌─────────────┐
   │ Backend │      │ Frontend    │
   │ Window  │      │ Window      │
   └─────────┘      └─────────────┘
        │                 │
        ▼                 ▼
    PORT 5000         PORT 5173
   (Express.js)      (Vite React)
        │                 │
        ▼                 ▼
    MySQL          Browser opens
    (crm_db_v2)          │
                         ▼
                 http://localhost:5173
```

---

## 📁 Two Terminals Open

### Terminal 1 - Backend

```
[Backend] Express.js server
[Backend] Listening on: http://localhost:5000
[Database] MySQL crm_db_v2
[Database] Connection successful
```

### Terminal 2 - Frontend

```
[Frontend] Vite React Application
[Frontend] Local: http://localhost:5173
[Frontend] Press h to show help
```

### Browser

```
http://localhost:5173
├── Login Page Opens ✅
├── Create an Account
└── Login → Dashboard Shows! 🎉
```

---

## 🎮 First Time - What to Do

### Step 1: Click "Sign Up"

- Enter name: Your name
- Email: your@email.com
- Password: anything (min 6 chars)
- Click "Register" ✅

### Step 2: You're Auto-Logged In

- Dashboard appears with stats 📊

### Step 3: Explore

- Click "Leads" → See full CRUD (Create, Read, Update, Delete)
- Click "Customers" → Table ready for data
- Click "Deals" → Structure ready
- etc.

---

## 🛑 To Stop Everything

Press **Ctrl+C** in either terminal, OR close the windows

---

## 📚 Files Reference

| File                  | What To Do         | Result                          |
| --------------------- | ------------------ | ------------------------------- |
| **START-ALL.bat**     | Double-click       | Everything starts automatically |
| **npm run start-all** | Type in cmd        | Everything starts in 1 terminal |
| **.\START-ALL.ps1**   | Type in PowerShell | Beautiful colored startup       |
| **npm run verify**    | Check setup        | Shows ✅ if ready to start      |

---

## 🔑 Access Points

After startup, you have:

| What         | Where                     | For What            |
| ------------ | ------------------------- | ------------------- |
| **Frontend** | http://localhost:5173     | CRM UI - LOGIN HERE |
| **Backend**  | http://localhost:5000/api | REST APIs           |
| **Database** | localhost:3306            | MySQL (crm_db_v2)   |

---

## ✨ That's It!

One command = Everything running = CRM ready to use! 🚀

---

**Problems?**

- Check terminal for error messages
- See COMPLETE-STARTUP-SETUP.md for troubleshooting
- Read STARTUP-GUIDE.md for detailed help

**Questions?**

- All documentation in root folder
- Check console (F12) in browser for frontend errors
- Backend errors show in terminal window

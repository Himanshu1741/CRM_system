# CRM System - Quick Start Guide

## ✅ What's Been Created

### Backend (Server)

✅ Express.js REST API with 7 endpoints (Auth, Leads, Customers, Deals, Tasks, Notes, Activities)
✅ MySQL database with 7 tables and auto-sync via Sequelize
✅ JWT authentication with token expiration
✅ Password hashing with bcrypt
✅ Input validation utilities
✅ Centralized error handling
✅ CORS enabled for frontend requests

### Frontend (Client)

✅ React 18 with Vite
✅ Material-UI (MUI) component library
✅ JWT-based authentication (Login/Register)
✅ Protected routes with ProtectedRoute wrapper
✅ Sidebar navigation with 7 modules
✅ Full CRUD pages for:

- Leads (List, Add, Edit, Delete)
- Dashboard (Statistics cards)
- Login & Register
  ✅ Axios with interceptors for automatic token attachment
  ✅ Material-UI Layout with responsive design

### Ready for Implementation

🔄 Customers CRUD (table structure ready, needs API integration)
🔄 Deals CRUD (table structure ready, needs API integration)
🔄 Tasks CRUD (table structure ready, needs API integration)
🔄 Notes CRUD (table structure ready, needs API integration)
🔄 Activities View (ready, needs API integration)

---

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**

```bash
cd server
npm install
```

**Frontend:**

```bash
cd client
npm install
```

### Step 2: Start the Backend

```bash
cd server
npm start
```

✅ Server runs on `http://localhost:5000`
✅ Automatically creates/syncs MySQL database

### Step 3: Start the Frontend (New Terminal)

```bash
cd client
npm run dev
```

✅ Frontend runs on `http://localhost:5173`

### Step 4: Test the Application

1. Open `http://localhost:5173` in your browser
2. Click "Sign up" and create an account
3. Login with your credentials
4. You'll see the Dashboard with statistics
5. Navigate through Leads, Customers, Deals, Tasks, Notes, Activities in the sidebar

---

## 📋 Current Implementation Details

### Authentication Flow

```
User Registration/Login
    ↓
Submit credentials (email, password)
    ↓
Backend validates & generates JWT token
    ↓
Token stored in browser localStorage
    ↓
Token added to all future API requests
    ↓
Protected component checks token validity
    ↓
If token expired → Auto logout & redirect to login
```

### API Response Format (Standardized)

```json
{
  "success": true/false,
  "message": "Description",
  "data": { /* actual data */ }
}
```

### File Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Layout.jsx              ← Main layout with sidebar
│   │   ├── ProtectedRoute.jsx      ← Auth guard
│   │   └── ...
│   ├── pages/
│   │   ├── Login.jsx               ← Login form
│   │   ├── Register.jsx            ← Registration form
│   │   ├── Dashboard.jsx           ← Statistics dashboard
│   │   ├── Leads.jsx               ← Leads CRUD (Fully implemented)
│   │   ├── Customers.jsx           ← Ready for API calls
│   │   ├── Deals.jsx               ← Ready for API calls
│   │   ├── Tasks.jsx               ← Ready for API calls
│   │   ├── Notes.jsx               ← Ready for API calls
│   │   └── Activities.jsx          ← Ready for API calls
│   ├── context/
│   │   └── AuthContext.jsx         ← Authentication state
│   ├── hooks/
│   │   └── useAuth.js              ← useAuth custom hook
│   ├── services/
│   │   └── api.js                  ← Axios API methods
│   └── App.jsx                     ← Router setup & Auth
```

---

## 🔧 Environment Variables

### Backend (.env)

```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=Himanshu@2004
DB_NAME=crm_db_v2
DB_PORT=3306
JWT_SECRET=secret123
JWT_EXPIRE=7d
API_URL=http://localhost:5000
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

---

## 🎯 Features Ready to Use

### ✅ Working Right Now

1. **User Authentication**
   - Register new account
   - Login with email/password
   - JWT token generation & storage
   - Auto-logout on token expiration

2. **Dashboard**
   - View total leads count
   - View total customers count
   - View total deals count
   - View total tasks count

3. **Leads Management** (FULLY FUNCTIONAL)
   - View all leads in table
   - Add new lead (opens dialog form)
   - Edit existing lead
   - Delete lead
   - Real-time API calls

4. **Navigation**
   - Sidebar menu with all 7 modules
   - Responsive mobile-friendly layout
   - Logout functionality

### 🔄 Next Steps to Complete

These pages have the UI components ready, they just need the API calls:

1. **Customers** - Table, Add, Edit, Delete dialogs ready
2. **Deals** - Customer dropdown, amount fields, stage selector ready
3. **Tasks** - Priority & status selectors, due date picker ready
4. **Notes** - Card-based layout ready
5. **Activities** - Read-only activity log table ready

---

## 🧪 Testing the API

### Test Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Test Protected Request (Leads)

```bash
curl -X GET http://localhost:5000/api/leads \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 🐛 Common Issues & Solutions

| Issue                            | Solution                                                           |
| -------------------------------- | ------------------------------------------------------------------ |
| "Database not found"             | Database `crm_db_v2` will be auto-created. Check MySQL is running. |
| "CORS error"                     | Ensure `CORS_ORIGIN` in server `.env` matches frontend URL         |
| "Cannot POST /api/auth"          | Server not running OR using wrong port                             |
| "401 Unauthorized"               | Token may be expired. Login again. Check localStorage.             |
| "Material-UI styles not loading" | Run `npm install` in client folder                                 |
| "Page blank after login"         | Check browser console for errors (F12)                             |

---

## 📱 API Endpoints Summary

| Method | Endpoint       | Auth | Description           |
| ------ | -------------- | ---- | --------------------- |
| POST   | /auth/register | ❌   | Create new account    |
| POST   | /auth/login    | ❌   | Login (returns token) |
| GET    | /auth/me       | ✅   | Get current user      |
| GET    | /leads         | ✅   | Get all leads         |
| POST   | /leads         | ✅   | Create lead           |
| PUT    | /leads/:id     | ✅   | Update lead           |
| DELETE | /leads/:id     | ✅   | Delete lead           |
| GET    | /customers     | ✅   | Get all customers     |
| POST   | /customers     | ✅   | Create customer       |
| PUT    | /customers/:id | ✅   | Update customer       |
| DELETE | /customers/:id | ✅   | Delete customer       |
| GET    | /deals         | ✅   | Get all deals         |
| POST   | /deals         | ✅   | Create deal           |
| PUT    | /deals/:id     | ✅   | Update deal           |
| DELETE | /deals/:id     | ✅   | Delete deal           |
| GET    | /tasks         | ✅   | Get all tasks         |
| POST   | /tasks         | ✅   | Create task           |
| PUT    | /tasks/:id     | ✅   | Update task           |
| DELETE | /tasks/:id     | ✅   | Delete task           |
| GET    | /notes         | ✅   | Get all notes         |
| POST   | /notes         | ✅   | Create note           |
| PUT    | /notes/:id     | ✅   | Update note           |
| DELETE | /notes/:id     | ✅   | Delete note           |
| GET    | /activities    | ✅   | Get all activities    |
| POST   | /activities    | ✅   | Create activity       |

---

## 💡 Next Enhancements

1. **Complete remaining CRUD pages** (Customers, Deals, Tasks, Notes)
2. **Add search & filtering** for each module
3. **Add pagination** for large datasets
4. **Add export to CSV/PDF** functionality
5. **Add real-time notifications**
6. **Add role-based access control**
7. **Add file attachment support**
8. **Add activity timeline view**
9. **Add reporting & analytics**
10. **Add mobile app version**

---

## 📖 File References

- **Backend setup**: See `server/` folder and `server/README.md`
- **Frontend setup**: See [FRONTEND_SETUP.md](./FRONTEND_SETUP.md)
- **API documentation**: All endpoints detailed in [FRONTEND_SETUP.md](./FRONTEND_SETUP.md)

---

## ✨ Key Achievements

✅ **Complete Backend**: Express.js + Sequelize + MySQL
✅ **JWT Authentication**: Secure token-based auth
✅ **Frontend Framework**: React + Material-UI
✅ **API Integration**: Axios with interceptors
✅ **Protected Routes**: ProtectedRoute component
✅ **State Management**: Context API
✅ **Responsive Design**: Mobile-friendly UI
✅ **Error Handling**: Consistent error responses
✅ **Code Quality**: Organized folder structure

---

## 🚀 You're All Set

Everything is ready to:

1. ✅ Start both servers
2. ✅ Create user accounts
3. ✅ Login
4. ✅ View dashboard
5. ✅ Manage leads
6. ✅ Complete remaining CRUD operations

**Happy coding!** 🎉

---

For detailed setup instructions, see [FRONTEND_SETUP.md](./FRONTEND_SETUP.md)

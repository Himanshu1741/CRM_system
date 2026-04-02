# CRM System - Complete Setup Guide

## Project Structure

```
crm-system/
├── server/                    # Backend (Express.js + Sequelize + MySQL)
│   ├── src/
│   │   ├── models/           # Sequelize models (7 tables)
│   │   ├── controllers/      # CRUD operations
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Validation & error handling
│   │   ├── config/           # Database config
│   │   ├── middleware/       # Auth middleware
│   │   ├── app.js            # Express app
│   │   └── server.js         # Server entry point
│   ├── .env                  # EV variables
│   └── package.json
│
└── client/                   # Frontend (React + Material-UI + Vite)
    ├── src/
    │   ├── components/       # Reusable components
    │   │   ├── Layout.jsx        # Sidebar layout
    │   │   ├── ProtectedRoute.jsx
    │   │   └── ...
    │   ├── pages/            # Page components
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Leads.jsx
    │   │   ├── Customers.jsx
    │   │   ├── Deals.jsx
    │   │   ├── Tasks.jsx
    │   │   ├── Notes.jsx
    │   │   └── Activities.jsx
    │   ├── context/          # Context API
    │   │   └── AuthContext.jsx
    │   ├── hooks/            # Custom hooks
    │   │   └── useAuth.js
    │   ├── services/         # API calls
    │   │   └── api.js        # Axios instance + API methods
    │   ├── App.jsx           # Main app with routing
    │   ├── main.jsx          # Entry point
    │   └── index.css
    ├── .env                  # Frontend env variables
    ├── vite.config.js
    ├── package.json
    └── index.html
```

## Installation & Setup

### Prerequisites

- Node.js 16+ & npm
- MySQL 8.0+
- Git

### Step 1: Backend Setup

```bash
cd server
npm install
```

**Create `.env`:**

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

**start the Server:**

```bash
npm start
```

Server runs on `http://localhost:5000`

### Step 2: Frontend Setup

```bash
cd client
npm install
```

**Create `.env`:**

```
VITE_API_URL=http://localhost:5000/api
```

**Start Development Server:**

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints (All Authenticated except Login/Register)

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (returns JWT token)
- `GET /api/auth/me` - Get current user

### Leads (Full CRUD)

- `GET /api/leads` - Get all leads
- `GET /api/leads/:id` - Get single lead
- `POST /api/leads` - Create lead
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead

### Customers (Full CRUD)

- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get single customer
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Deals (Full CRUD)

- `GET /api/deals` - Get all deals
- `GET /api/deals/:id` - Get single deal
- `POST /api/deals` - Create deal
- `PUT /api/deals/:id` - Update deal
- `DELETE /api/deals/:id` - Delete deal

### Tasks (Full CRUD + Filtering)

- `GET /api/tasks` - Get all tasks
- `GET /api/tasks?status=pending` - Filter by status
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Notes (Full CRUD)

- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Activities (Read + Filter)

- `GET /api/activities` - Get all activities
- `GET /api/activities?type=email` - Filter by type
- `GET /api/activities/:id` - Get single activity
- `POST /api/activities` - Create activity

## Database Schema

### Users Table

- id, firstName, lastName, email, password (hashed), role, isActive, createdAt,updatedAt

### Leads Table

- id, firstName, lastName, email, phone, company, status, source, notes, assignedTo, createdBy

### Customers Table

- id, firstName, lastName, email, phone, company, industry, address, city, state, zipCode, country, status, totalSpent, notes, assignedTo, createdBy

### Deals Table

- id, title, description, customerId, amount, stage, probability, expectedCloseDate, actualCloseDate, notes, assignedTo, createdBy

### Tasks Table

- id, title, description, status, priority, assignedTo, dueDate, createdBy

### Notes Table

- id, title, content, leadId, customerId, dealId, createdBy

### Activities Table

- id, type, description, leadId, customerId, dealId, createdBy

## Frontend Pages & Features

### 1. **Authentication**

- Login page with JWT token storage
- Registration with validation
- Protected routes (ProtectedRoute component)

### 2. **Dashboard**

- Statistics cards (Leads, Customers, Deals, Tasks counts)
- Quick overview of all modules

### 3. **Leads Management**

- List all leads in table format
- Add new lead (Dialog form)
- Edit existing lead
- Delete lead
- Fields: First Name, Last Name, Email, Phone, Company, Status, Source, Notes

### 4. **Customers Management**

- Full CRUD for customers
- Detailed customer information
- Status tracking
- Fields include industry, address, city, state, zip code, country

### 5. **Deals Management**

- Manage sales deals
- Link deals to customers
- Track deal amount and probability
- Deal stages (Prospect, Qualification, Proposal, Negotiation, Won, Lost)

### 6. **Tasks Management**

- Task creation and tracking
- Priority levels (High, Medium, Low)
- Status tracking (Pending, In Progress, Completed)
- Due date management

### 7. **Notes Management**

- Create notes with title and content
- Card view for better readability
- Can be linked to leads, customers, or deals

### 8. **Activities Log**

- View all activities in the system
- Type filtering
- Timestamp tracking
- Read-only view

## Technology Stack

### Backend

- **Express.js** - Web framework
- **Sequelize** - ORM for MySQL
- **MySQL** - Database
- **bcrypt** - Password hashing
- **JWT** - Authentication
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend

- **React 18** - UI library
- **React Router v6** - Routing
- **Material-UI (MUI)** - Component library
- **Axios** - HTTP client
- **Vite** - Build tool & dev server
- **Context API** - State management

## Authentication Flow

1. User registers/logs in with email & password
2. Backend validates and returns JWT token
3. Token stored in localStorage
4. Token added to every API request header
5. Protected routes check token validity
6. Automatic logout on token expiration (401 response)

## Usage Example

### Test Login Flow

```bash
# Start server
cd server && npm start

# Start client in new terminal
cd client && npm run dev

# Open browser: http://localhost:5173
# Use test account to login
```

### API Authentication Header

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Common Issues & Solutions

### 1. **Database Connection Error**

- Ensure MySQL is running
- Verify credentials in `.env`
- Database `crm_db_v2` should exist or be auto-created

### 2. **CORS Errors**

- Check CORS_ORIGIN in server `.env`
- Ensure frontend URL matches CORS_ORIGIN

### 3. **401 Unauthorized Errors**

- Token may have expired
- Check token in localStorage browser devtools
- Login again if needed

### 4. **API Calls Not Working**

- Verify `VITE_API_URL` in client `.env`
- Check server is running on port 5000
- Check network tab in browser devtools

## Performance Features

- **Lazy loading** - Pages load on demand via React Router
- **Token-based auth** - No sessions, scalable authentication
- **Material-UI** - Optimized components
- **Axios interceptors** - Automatic token attachment
- **Error boundaries** - Graceful error handling

## Future Enhancements

- [ ] Advanced filtering & search
- [ ] Data export (PDF, CSV)
- [ ] Real-time notifications
- [ ] Role-based access control (RBAC)
- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] File attachments
- [ ] Activity timeline
- [ ] Calendar integration
- [ ] Mobile app version

## Deployment

### Backend (Node.js server)

```bash
# Production build
npm install
npm start
```

### Frontend (Static files)

```bash
npm run build
# Deploy 'dist' folder to static hosting
```

## Support & Troubleshooting

For issues:

1. Check console for errors (browser devtools / terminal)
2. Verify all environment variables are set
3. Ensure both backend and frontend are running
4. Check network requests in browser devtools
5. Review API response status codes

---

**CRM System v1.0** - Built with Express.js, React, Material-UI, and MySQL

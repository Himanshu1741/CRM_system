# CRM System - Getting Started Guide

## Project Structure

```
crm-system/
├── client/              # React frontend (Vite)
├── server/              # Node.js/Express backend
├── database/            # SQL schemas and migrations
├── docs/                # Documentation
├── package.json         # Root package.json
└── README.md           # Project overview
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB or MySQL (depending on your preference)

## Installation & Setup

### 1. Install Server Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Create `.env` file in the `server` directory:

```
PORT=3001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/crm-system
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRE=7d
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

### 4. Start Development Servers

**Terminal 1 - Start Backend:**

```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**

```bash
cd client
npm run dev
```

The application will be available at:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001/api`

## Database Setup

### Using MongoDB (With Mongoose)

MongoDB is already configured in the backend. Start MongoDB and the app will connect automatically.

### Using MySQL

1. Create the database:

```bash
mysql -u root -p -e "CREATE DATABASE crm_system"
```

2. Run migrations:

```bash
mysql -u root -p crm_system < database/schema.sql
```

3. Seed sample data:

```bash
mysql -u root -p crm_system < database/seed/*.sql
```

## Available Endpoints

See [API.md](./API.md) for complete API documentation.

### Core Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET/POST/PUT/DELETE /api/leads` - Lead management
- `GET/POST/PUT/DELETE /api/customers` - Customer management
- `GET/POST/PUT/DELETE /api/deals` - Deal management
- `GET/POST/PUT/DELETE /api/tasks` - Task management
- `GET/POST/PUT/DELETE /api/notes` - Note management
- `GET/POST /api/activities` - Activity logging
- `GET /api/reports/*` - Various reports

## Core Features

### 1. Authentication

- User registration and login
- JWT-based authentication
- Role-based access control (admin, manager, user)

### 2. Lead Management

- Create, read, update, delete leads
- Track lead source and status
- Assign leads to team members

### 3. Customer Management

- Manage customer profiles
- Track customer information and history
- Link customers to deals

### 4. Sales Pipeline

- Manage deals through different stages
- Track deal probability and expected close dates
- Monitor pipeline value

### 5. Task Management

- Create tasks with priority levels
- Assign tasks to team members
- Track task status and due dates

### 6. Activities & Notes

- Log customer interactions (calls, emails, meetings)
- Add notes to leads, customers, and deals
- Track interaction history

### 7. Reports

- Sales pipeline analysis
- Activity summary
- Lead conversion rates
- Team performance metrics

## Frontend Pages

- **Dashboard** - Overview of key metrics
- **Leads** - Lead management interface
- **Customers** - Customer database
- **Deals** - Sales pipeline view
- **Tasks** - Task list and management
- **Activities** - Activity feed and log
- **Notes** - Notes collection
- **Reports** - Sales and team reports
- **Settings** - Application settings

## Backend Architecture

### Models

- User - User accounts and authentication
- Lead - Sales leads
- Customer - Customer records
- Deal - Sales opportunities
- Task - Tasks and assignments
- Note - Notes and documentation
- Activity - Activity log entries

### Controllers

- Authentication
- Lead management
- Customer management
- Deal management
- Task management
- Note management
- Activity logging
- Report generation

### Middleware

- JWT authentication
- Role-based authorization
- Error handling

## Development Workflow

1. **Backend Changes**
   - Modify controller files in `server/src/controllers/`
   - Add routes in `server/src/routes/`
   - Server auto-reloads with nodemon

2. **Frontend Changes**
   - Modify component files in `client/src/components/`
   - Modify page files in `client/src/pages/`
   - Browser auto-refreshes with Vite

3. **Database Changes**
   - Create new migration files in `database/migrations/`
   - Update schemas as needed
   - Run migrations with MySQL commands

## Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"test123"}'

# Create Lead
curl -X POST http://localhost:3001/api/leads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com"}'
```

### Using Postman

1. Import the endpoints from [API.md](./API.md)
2. Set up environment variables for `base_url` and `token`
3. Test each endpoint

## Troubleshooting

### Server won't start

- Check if port 3001 is in use: `lsof -i :3001`
- Verify MongoDB/MySQL is running
- Check `.env` configuration

### Frontend won't connect to API

- Verify backend is running on port 3001
- Check CORS settings in `server/src/app.js`
- Look for errors in browser console

### Database connection issues

- Verify MongoDB URI in `.env`
- OR ensure MySQL server is running and credentials are correct
- Check database exists and migrations have been run

## Next Steps

1. **Connect Frontend to Backend**
   - Update API service calls in `client/src/services/api.js`
   - Implement auth context for token management

2. **Add More Features**
   - File uploads for documents
   - Email notifications
   - Advanced filtering and search
   - Dashboard analytics

3. **Deployment**
   - Build frontend: `npm run build`
   - Configure backend for production
   - Set up database backups
   - Deploy to hosting platform

---

For more details, see individual documentation files in the `docs/` directory.

# CRM System API - Complete Documentation

## Overview

The CRM System is a Node.js/Express backend REST API built with MySQL and Sequelize ORM, providing comprehensive customer relationship management functionality.

**Live Server:** http://localhost:5000

## Project Status

✅ **Production Ready** - All core API endpoints tested and functional

## Tech Stack

- **Backend Framework:** Express 4.18
- **ORM:** Sequelize 6.35
- **Database:** MySQL 8.4
- **Authentication:** JWT + bcrypt
- **Runtime:** Node.js (ES Modules)

## Database Schema

### Tables

| Table          | Purpose          | Key Fields                                                            |
| -------------- | ---------------- | --------------------------------------------------------------------- |
| **users**      | System users     | id, firstName, lastName, email, password, role, isActive              |
| **leads**      | Sales leads      | id, firstName, lastName, email, phone, company, status, assignedTo    |
| **customers**  | Customer records | id, firstName, lastName, email, company, industry, status, totalSpent |
| **deals**      | Sales deals      | id, title, amount, stage, customerId, assignedTo, probability         |
| **tasks**      | Task management  | id, title, description, status, priority, dueDate, assignedTo         |
| **notes**      | Notes            | id, title, content, leadId, customerId, dealId, createdBy             |
| **activities** | Activity log     | id, type, description, leadId, customerId, dealId, createdBy          |

## API Endpoints

### Authentication Routes

All user authentication endpoints are under `/api/auth`

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Developer",
  "email": "john@dev.com",
  "password": "Dev@1234"
}
```

**Response (201):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Developer",
    "email": "john@dev.com",
    "role": "user"
  }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@dev.com",
  "password": "Dev@1234"
}
```

**Response (200):**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Developer",
    "email": "john@dev.com",
    "role": "user"
  }
}
```

#### Get Current User (Protected)

```http
GET /api/auth/me
Authorization: Bearer <JWT_TOKEN>
```

**Response (200):**

```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Developer",
    "email": "john@dev.com",
    "role": "user"
  }
}
```

---

### Leads Routes

Base endpoint: `/api/leads`

#### Get All Leads

```http
GET /api/leads
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "firstName": "Sarah",
      "lastName": "Johnson",
      "email": "sarah@example.com",
      "phone": "555-9876",
      "status": "new"
    }
  ]
}
```

#### Get Lead by ID

```http
GET /api/leads/:id
```

#### Create Lead (Protected)

```http
POST /api/leads
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "firstName": "Sarah",
  "lastName": "Johnson",
  "email": "sarah@example.com",
  "phone": "555-9876",
  "status": "new"
}
```

#### Update Lead (Protected)

```http
PUT /api/leads/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "status": "contacted"
}
```

#### Delete Lead (Protected)

```http
DELETE /api/leads/:id
Authorization: Bearer <JWT_TOKEN>
```

---

### Customers Routes

Base endpoint: `/api/customers`

Similar CRUD operations as Leads:

- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer details
- `POST /api/customers` - Create customer (Protected)
- `PUT /api/customers/:id` - Update customer (Protected)
- `DELETE /api/customers/:id` - Delete customer (Protected)

**Customer Fields:**

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john@company.com",
  "phone": "555-1234",
  "company": "ABC Corp",
  "industry": "Technology",
  "status": "active"
}
```

---

### Deals Routes

Base endpoint: `/api/deals`

**Deal Fields:**

```json
{
  "title": "Enterprise License Deal",
  "amount": 50000,
  "customerId": 1,
  "stage": "negotiation",
  "probability": 75
}
```

Similar CRUD operations as Leads with customer relationship support.

---

### Tasks Routes

Base endpoint: `/api/tasks`

**Task Fields:**

```json
{
  "title": "Follow up with client",
  "description": "Schedule demo",
  "status": "pending",
  "priority": "high",
  "dueDate": "2026-12-31"
}
```

---

### Notes Routes

Base endpoint: `/api/notes`

**Note Fields:**

```json
{
  "title": "Meeting notes",
  "content": "Discussed pricing",
  "leadId": 1,
  "customerId": null,
  "dealId": null
}
```

---

### Activities Routes

Base endpoint: `/api/activities`

**Activity Fields:**

```json
{
  "type": "call",
  "description": "Phone call with client",
  "leadId": 1,
  "customerId": null,
  "dealId": null
}
```

---

## Authentication

### JWT Token Usage

All protected endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <JWT_TOKEN>
```

### Token Details

- **Algorithm:** HS256
- **Expiration:** 7 days
- **Secret:** Via `JWT_SECRET` environment variable

### Protected Operations

The following operations require authentication:

- ✅ POST (Create) - All resources
- ✅ PUT (Update) - All resources
- ✅ DELETE - All resources
- ✅ GET (Retrieve current user) - `/api/auth/me`

---

## Error Handling

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes

| Status | Meaning                                  |
| ------ | ---------------------------------------- |
| 200    | OK - Request successful                  |
| 201    | Created - Resource created successfully  |
| 400    | Bad Request - Missing/invalid parameters |
| 401    | Unauthorized - Invalid/missing JWT token |
| 404    | Not Found - Resource doesn't exist       |
| 500    | Internal Server Error - Server issue     |

---

## Environment Configuration

Create a `.env` file in the `server/` directory:

```env
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=crm_system
DB_PORT=3306

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d

# Server
API_URL=http://localhost:5000
CORS_ORIGIN=http://localhost:5173
```

---

## Startup Instructions

### Prerequisites

- Node.js 18+
- MySQL 8+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Navigate to server directory
cd server
npm install
```

### Database Setup

```bash
# Option 1: Auto-sync (recommended)
# Tables are automatically created/updated on server start

# Option 2: Manual SQL
# Run migrations in order:
mysql -u root -p crm_system < database/migrations/001_create_users_table.sql
mysql -u root -p crm_system < database/migrations/002_create_leads_table.sql
# ... continue with remaining migrations
```

### Start Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on **http://localhost:5000**

---

## Testing Endpoints

### Using curl

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Developer","email":"john@dev.com","password":"Dev@1234"}'

# Get leads
curl http://localhost:5000/api/leads

# Create lead (with token)
curl -X POST http://localhost:5000/api/leads \
  -H "Authorization: Bearer <YOUR_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Sarah","lastName":"Johnson","email":"sarah@example.com","phone":"555-9876"}'
```

### Using Postman

1. Import collection from API documentation
2. Set `Authorization` header for protected routes
3. Use Bearer token format: `Bearer <YOUR_JWT_TOKEN>`

---

## Role-Based Access Control

Currently supports 3 user roles:

- **admin** - Full access to all operations
- **manager** - Manage team leads/customers
- **user** - Standard user access (default)

---

## Performance Considerations

- Connection pooling enabled (max 5 connections)
- Indexed columns for fast queries on: email, status, foreign keys
- Query optimization via Sequelize ORM

---

## Security Features

- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT token-based authentication
- ✅ CORS protection
- ✅ Protected routes with middleware
- ✅ Environment variable configuration

---

## Known Limitations

- No pagination implemented yet (returns all results)
- No rate limiting on endpoints
- File uploads not supported
- No real-time notifications

---

## Future Enhancements

- [ ] Pagination and filtering
- [ ] Advanced search capabilities
- [ ] Bulk operations
- [ ] WebSocket support for real-time updates
- [ ] Email notifications
- [ ] SMS integration
- [ ] Mobile app API

---

## Support & Debugging

### Server Won't Start?

1. Check MySQL is running: `mysql -u root -p`
2. Verify `.env` database credentials
3. Ensure port 5000 is available: `netstat -ano | findstr :5000`
4. Check Node.js version: `node --version` (should be 18+)

### Database Connection Issues?

```bash
# Test connection
mysql -h localhost -u root -p -D crm_system -e "SELECT 1;"

# Check credentials in .env file
# Verify MySQL service is running
```

### JWT Token Issues?

- Token expired? Register/login again to get new token
- Invalid token format? Use exact Bearer format: `Bearer <token>`
- Missing Authorization header? Add it for protected routes

---

## License

MIT

---

**Last Updated:** 2026-04-02
**API Version:** 1.0.0
**Database:** MySQL (crm_system)

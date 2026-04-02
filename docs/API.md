# CRM System API Documentation

Base URL: `http://localhost:3001/api`

## Authentication Endpoints

### POST /api/auth/register
Register a new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### POST /api/auth/login
Login with email and password.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### GET /api/auth/me
Get current user profile. Requires JWT token.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2026-04-02T10:00:00Z"
  }
}
```

---

## Leads Endpoints

### GET /api/leads
Get all leads.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "lead_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "555-0101",
      "company": "Tech Corp",
      "status": "new",
      "source": "website",
      "notes": "Interested in enterprise plan",
      "assignedTo": { "id": "user_id", "name": "Jane Smith", "email": "jane@example.com" },
      "createdAt": "2026-04-02T10:00:00Z"
    }
  ]
}
```

### GET /api/leads/:id
Get a specific lead.

### POST /api/leads
Create a new lead. Requires JWT token.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-0101",
  "company": "Tech Corp",
  "status": "new",
  "source": "website",
  "notes": "Interested in enterprise plan"
}
```

### PUT /api/leads/:id
Update a lead. Requires JWT token.

### DELETE /api/leads/:id
Delete a lead. Requires JWT token.

---

## Customers Endpoints

### GET /api/customers
Get all customers.

### GET /api/customers/:id
Get a specific customer.

### POST /api/customers
Create a new customer. Requires JWT token.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-0101",
  "company": "Tech Corp",
  "industry": "Technology",
  "address": "123 Main St",
  "city": "San Francisco",
  "state": "CA",
  "zipCode": "94105",
  "country": "USA",
  "status": "active",
  "notes": "Key account"
}
```

### PUT /api/customers/:id
Update a customer. Requires JWT token.

### DELETE /api/customers/:id
Delete a customer. Requires JWT token.

---

## Deals Endpoints

### GET /api/deals
Get all deals.

### GET /api/deals/:id
Get a specific deal.

### POST /api/deals
Create a new deal. Requires JWT token.

**Request:**
```json
{
  "title": "Enterprise Software License",
  "description": "Annual software license for 500 users",
  "customer": "customer_id",
  "amount": 50000,
  "stage": "proposal",
  "probability": 75,
  "expectedCloseDate": "2026-05-15",
  "notes": "Customer wants volume discount"
}
```

**Deal Stages:** prospect, negotiation, proposal, closed-won, closed-lost

### PUT /api/deals/:id
Update a deal. Requires JWT token.

### DELETE /api/deals/:id
Delete a deal. Requires JWT token.

---

## Tasks Endpoints

### GET /api/tasks
Get all tasks. Supports query filters.

**Query Parameters:**
- `status` - Filter by status (pending, in-progress, completed, cancelled)
- `priority` - Filter by priority (low, medium, high, urgent)
- `assignedTo` - Filter by assigned user ID

### GET /api/tasks/:id
Get a specific task.

### POST /api/tasks
Create a new task. Requires JWT token.

**Request:**
```json
{
  "title": "Follow up with client",
  "description": "Call customer about proposal",
  "dueDate": "2026-04-10",
  "priority": "high",
  "status": "pending",
  "assignedTo": "user_id",
  "lead": "lead_id",
  "customer": "customer_id",
  "deal": "deal_id"
}
```

**Priority:** low, medium, high, urgent
**Status:** pending, in-progress, completed, cancelled

### PUT /api/tasks/:id
Update a task. Requires JWT token.

### DELETE /api/tasks/:id
Delete a task. Requires JWT token.

---

## Notes Endpoints

### GET /api/notes
Get all notes. Supports query filters.

**Query Parameters:**
- `lead` - Filter by lead ID
- `customer` - Filter by customer ID
- `deal` - Filter by deal ID

### GET /api/notes/:id
Get a specific note.

### POST /api/notes
Create a new note. Requires JWT token.

**Request:**
```json
{
  "title": "Meeting Notes",
  "content": "Discussed pricing and implementation timeline",
  "lead": "lead_id",
  "customer": "customer_id",
  "deal": "deal_id"
}
```

### PUT /api/notes/:id
Update a note. Requires JWT token.

### DELETE /api/notes/:id
Delete a note. Requires JWT token.

---

## Activities Endpoints

### GET /api/activities
Get all activities. Supports query filters.

**Query Parameters:**
- `type` - Filter by type (call, email, meeting, note, task, status-change)
- `lead` - Filter by lead ID
- `customer` - Filter by customer ID
- `deal` - Filter by deal ID

### GET /api/activities/:id
Get a specific activity.

### POST /api/activities
Create a new activity. Requires JWT token.

**Request:**
```json
{
  "type": "call",
  "description": "Called customer, discussed pricing options",
  "lead": "lead_id",
  "customer": "customer_id",
  "deal": "deal_id"
}
```

**Activity Types:** call, email, meeting, note, task, status-change

### DELETE /api/activities/:id
Delete an activity. Requires JWT token.

---

## Reports Endpoints

### GET /api/reports
Get available report types. Requires JWT token.

**Response:**
```json
{
  "success": true,
  "data": {
    "reportTypes": ["sales-pipeline", "activity-summary", "lead-conversion", "team-performance"],
    "message": "Available report types"
  }
}
```

### GET /api/reports/sales-pipeline
Get sales pipeline report by stage. Requires JWT token.

### GET /api/reports/activity-summary
Get activity summary report. Requires JWT token.

### GET /api/reports/lead-conversion
Get lead conversion rate report. Requires JWT token.

### GET /api/reports/team-performance
Get team performance report. Requires JWT token.

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing required fields)
- `401` - Unauthorized (invalid or missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

---

## Authentication

Most endpoints (POST, PUT, DELETE) require JWT authentication. Include the token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Example Workflow

1. **Register/Login** → Get JWT token
2. **Create Lead** → POST /api/leads (with token)
3. **Convert to Customer** → POST /api/customers (with token)
4. **Create Deal** → POST /api/deals (with token)
5. **Track Tasks** → POST /api/tasks (with token)
6. **Log Activities** → POST /api/activities (with token)
7. **Add Notes** → POST /api/notes (with token)
8. **View Reports** → GET /api/reports/* (with token)

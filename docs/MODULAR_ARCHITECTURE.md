# Modular Architecture Documentation

## Overview

This CRM system uses a scalable modular architecture where each feature is self-contained with its own controller, service, routes, and business logic.

## Module Structure

```
server/src/modules/
├── auth/
│   ├── auth.controller.js    # HTTP request handlers
│   ├── auth.service.js       # Business logic & database operations
│   └── auth.routes.js        # Route definitions
├── leads/
│   ├── lead.controller.js
│   ├── lead.service.js
│   └── lead.routes.js
├── customers/
├── deals/
├── tasks/
├── notes/
├── activities/
├── reports/
└── index.js                  # Central exports
```

## Module Layers

### 1. Routes Layer (`*.routes.js`)
- Defines HTTP endpoints
- Validates authentication and authorization middleware
- Routes requests to controllers

Example:
```javascript
router.get('/:id', getTask)
router.post('/', protect, createTask)
```

### 2. Controller Layer (`*.controller.js`)
- Handles HTTP request/response
- Validates input parameters
- Calls service methods
- Returns formatted JSON responses

Example:
```javascript
export const createTask = async (req, res, next) => {
  // Validate input
  // Call service
  // Return response
}
```

### 3. Service Layer (`*.service.js`)
- Contains all business logic
- Handles database operations
- Performs data transformations
- Can be reused by multiple controllers

Example:
```javascript
export class TaskService {
  static async create(taskData, userId) {
    // Business logic
    // Database operations
    // Data population
  }
}
```

## Benefits of This Architecture

### 1. **Scalability**
- Easy to add new modules without affecting existing code
- Each module is independent and testable

### 2. **Maintainability**
- Clear separation of concerns
- Each layer has a specific responsibility
- Easier to debug and fix issues

### 3. **Reusability**
- Services can be used by multiple controllers
- Shared middleware
- Consistent error handling

### 4. **Testing**
- Easy to unit test services in isolation
- Mock dependencies easily
- Test at each layer independently

### 5. **Code Organization**
- Related code grouped together
- Easier to navigate and understand
- Clear folder structure

## Adding a New Module

To add a new feature to the CRM:

1. **Create the module folder** under `server/src/modules/{feature}/`

2. **Create the Model** in `server/src/models/{Feature}.js`

3. **Create the Service** (`{feature}.service.js`)
```javascript
export class FeatureService {
  static async getAll() { }
  static async getById(id) { }
  static async create(data, userId) { }
  static async update(id, data) { }
  static async delete(id) { }
}
```

4. **Create the Controller** (`{feature}.controller.js`)
```javascript
export const getFeatures = async (req, res, next) => {
  const data = await FeatureService.getAll()
  res.json({ success: true, data })
}
```

5. **Create the Routes** (`{feature}.routes.js`)
```javascript
router.get('/', getFeatures)
router.post('/', protect, createFeature)
```

6. **Export in `modules/index.js`**
```javascript
import featureRoutes from './features/feature.routes.js'
export default { features: featureRoutes }
```

7. **Mount in `app.js`**
```javascript
app.use('/api/features', modules.features)
```

## Service Class Pattern

All services follow this pattern:

```javascript
export class XyzService {
  static async getAll(filters = {}) {
    // Return all with filters
  }

  static async getById(id) {
    // Return single item
  }

  static async create(data, userId) {
    // Create and return new item
  }

  static async update(id, updateData) {
    // Update and return modified item
  }

  static async delete(id) {
    // Delete item
  }
}
```

## Error Handling

Errors are handled at the middleware level:

```javascript
try {
  // Business logic
} catch (error) {
  next(error)  // Pass to errorHandler middleware
}
```

## Authentication & Authorization

Protected routes use middleware:

```javascript
router.post('/', protect, createItem)  // Requires valid JWT
router.delete('/:id', protect, deleteItem)
```

## Data Population

Services automatically populate related data:

```javascript
await task.populate('assignedTo', 'name email')
await task.populate('createdBy', 'name email')
```

## Performance Considerations

- Use lean() for read-only queries if available
- Index frequently queried fields
- Paginate large result sets
- Use field filtering in populate()

## Migration Strategy

When refactoring existing code:

1. Create new service classes
2. Update controllers to use services
3. Ensure all tests pass
4. Remove old direct model usage
5. Deploy with monitoring

---

This modular structure allows the CRM to scale from a simple app to an enterprise system while maintaining clean, organized code.

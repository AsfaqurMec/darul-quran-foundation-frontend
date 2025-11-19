# Backend API Specifications

This document contains the API specifications for the new admin user management and user listing features.

## Base URL
All endpoints should be prefixed with: `/api/v1`

## Authentication
All endpoints require Bearer token authentication in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 1. Create Admin User

### Endpoint
```
POST /api/v1/users/create-admin
```

### Description
Creates a new admin or editor user. This endpoint should only be accessible to existing admin users.

### Request Body
```json
{
  "fullName": "string (required)",
  "email": "string (required, must be valid email)",
  "password": "string (required, minimum 6 characters recommended)",
  "role": "string (required, must be 'admin' or 'editor')"
}
```

### Example Request
```json
{
  "fullName": "John Doe",
  "email": "admin@example.com",
  "password": "securePassword123",
  "role": "admin"
}
```

### Success Response (201 Created)
```json
{
  "success": true,
  "message": "Admin user created successfully",
  "data": {
    "_id": "user_id_here",
    "fullName": "John Doe",
    "email": "admin@example.com",
    "role": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Error Responses

#### 400 Bad Request - Validation Error
```json
{
  "success": false,
  "message": "Validation error: Email is required"
}
```

#### 400 Bad Request - Email Already Exists
```json
{
  "success": false,
  "message": "Email already exists"
}
```

#### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized. Admin access required"
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### Validation Rules
- `fullName`: Required, string, minimum 2 characters
- `email`: Required, valid email format, must be unique
- `password`: Required, string, minimum 6 characters (recommended)
- `role`: Required, must be either "admin" or "editor"

### Notes
- Password should be hashed before storing in database (use bcrypt or similar)
- Email should be normalized (lowercase) before checking uniqueness
- Only users with admin role should be able to create admin users

---

## 2. Get All Users (with Pagination, Search, and Filters)

### Endpoint
```
GET /api/v1/users
```

### Description
Retrieves a paginated list of users with optional search and filter capabilities. This endpoint should only be accessible to admin users.

### Query Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| page | number | No | Page number (default: 1) |
| limit | number | No | Items per page (default: 10) |
| searchTerm | string | No | Search by email (case-insensitive partial match) |
| role | string | No | Filter by role (admin, editor, user) |

### Example Requests
```
GET /api/v1/users
GET /api/v1/users?page=1&limit=10
GET /api/v1/users?page=2&limit=20&searchTerm=john@example.com
GET /api/v1/users?role=admin&page=1&limit=10
GET /api/v1/users?searchTerm=example&role=user&page=1&limit=10
```

### Success Response (200 OK)
```json
{
  "success": true,
  "data": [
    {
      "_id": "user_id_1",
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "role": "user",
      "companyName": "Example Corp",
      "fullAddress": "123 Main St",
      "images": [],
      "totalDonate": 1500.50,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "_id": "user_id_2",
      "fullName": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+1234567891",
      "role": "admin",
      "companyName": "Admin Corp",
      "fullAddress": "456 Oak Ave",
      "images": [],
      "totalDonate": 2500.00,
      "createdAt": "2024-01-02T00:00:00.000Z",
      "updatedAt": "2024-01-02T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

### Error Responses

#### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized. Admin access required"
}
```

#### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### Implementation Notes
- `searchTerm` should search in the `email` field (case-insensitive, partial match)
- `role` filter should match exact role value
- Pagination should be calculated based on filtered results
- `totalDonate` should be calculated from donations/transactions associated with the user
- If no users match the criteria, return empty array with pagination info

### Database Query Example (MongoDB/Mongoose)
```javascript
// Pseudo-code example
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 10;
const skip = (page - 1) * limit;

const query = {};
if (req.query.role) {
  query.role = req.query.role;
}
if (req.query.searchTerm) {
  query.email = { $regex: req.query.searchTerm, $options: 'i' };
}

const users = await User.find(query)
  .skip(skip)
  .limit(limit)
  .sort({ createdAt: -1 });

const totalItems = await User.countDocuments(query);
const totalPages = Math.ceil(totalItems / limit);

// Calculate totalDonate for each user (aggregate from donations collection)
```

---

## 3. Update User

### Endpoint
```
PUT /api/v1/users/:id
```

### Description
Updates user information. This endpoint should only be accessible to admin users.

### URL Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | User ID |

### Request Body
All fields are optional. Only include fields that need to be updated.
```json
{
  "fullName": "string (optional)",
  "email": "string (optional, must be valid email if provided)",
  "role": "string (optional, must be 'admin', 'editor', or 'user')",
  "phone": "string (optional)",
  "companyName": "string (optional)",
  "fullAddress": "string (optional)"
}
```

### Example Request
```json
{
  "fullName": "John Updated",
  "email": "john.updated@example.com",
  "role": "editor"
}
```

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "_id": "user_id_here",
    "fullName": "John Updated",
    "email": "john.updated@example.com",
    "role": "editor",
    "phone": "+1234567890",
    "companyName": "Example Corp",
    "fullAddress": "123 Main St",
    "images": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-15T00:00:00.000Z"
  }
}
```

### Error Responses

#### 400 Bad Request - Validation Error
```json
{
  "success": false,
  "message": "Validation error: Invalid email format"
}
```

#### 400 Bad Request - Email Already Exists
```json
{
  "success": false,
  "message": "Email already exists"
}
```

#### 404 Not Found
```json
{
  "success": false,
  "message": "User not found"
}
```

#### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized. Admin access required"
}
```

### Validation Rules
- `email`: If provided, must be valid email format and unique
- `role`: If provided, must be "admin", "editor", or "user"
- At least one field must be provided in the request body

---

## 4. Delete User

### Endpoint
```
DELETE /api/v1/users/:id
```

### Description
Deletes a user from the system. This endpoint should only be accessible to admin users.

### URL Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | User ID |

### Example Request
```
DELETE /api/v1/users/507f1f77bcf86cd799439011
```

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### Error Responses

#### 404 Not Found
```json
{
  "success": false,
  "message": "User not found"
}
```

#### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized. Admin access required"
}
```

#### 400 Bad Request - Cannot Delete Self
```json
{
  "success": false,
  "message": "Cannot delete your own account"
}
```

### Implementation Notes
- Prevent users from deleting their own account
- Consider soft delete (mark as deleted) instead of hard delete to preserve data integrity
- If using soft delete, update the query in GET /users to exclude deleted users

---

## User Model Schema

The user model should include the following fields:

```javascript
{
  _id: ObjectId (or string),
  fullName: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  phone: String (optional),
  role: String (required, enum: ['admin', 'editor', 'user'], default: 'user'),
  companyName: String (optional),
  fullAddress: String (optional),
  images: [String] (optional, array of image URLs),
  totalDonate: Number (optional, default: 0, calculated from donations),
  createdAt: Date (required, auto-generated),
  updatedAt: Date (required, auto-updated),
  isDeleted: Boolean (optional, default: false, for soft delete)
}
```

---

## Authentication & Authorization

### Middleware Requirements
1. **Authentication Middleware**: Verify Bearer token and attach user to request
2. **Authorization Middleware**: Check if user has admin role for all these endpoints

### Example Middleware (Express.js)
```javascript
// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Admin authorization middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Unauthorized. Admin access required' 
    });
  }
  next();
};

// Usage in routes
router.post('/create-admin', authenticate, requireAdmin, createAdminController);
router.get('/users', authenticate, requireAdmin, getUsersController);
router.put('/users/:id', authenticate, requireAdmin, updateUserController);
router.delete('/users/:id', authenticate, requireAdmin, deleteUserController);
```

---

## Error Handling

All endpoints should follow a consistent error response format:

```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

HTTP Status Codes:
- `200 OK`: Successful GET, PUT, DELETE operations
- `201 Created`: Successful POST operations
- `400 Bad Request`: Validation errors, invalid input
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: User doesn't have required permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side errors

---

## Testing Recommendations

1. **Create Admin User**
   - Test with valid data
   - Test with duplicate email
   - Test with invalid email format
   - Test with missing required fields
   - Test without authentication
   - Test with non-admin user

2. **Get Users**
   - Test pagination
   - Test search functionality
   - Test role filtering
   - Test combined search and filter
   - Test with no results
   - Test without authentication
   - Test with non-admin user

3. **Update User**
   - Test updating single field
   - Test updating multiple fields
   - Test with invalid email
   - Test with duplicate email
   - Test with non-existent user ID
   - Test without authentication
   - Test with non-admin user

4. **Delete User**
   - Test deleting existing user
   - Test deleting non-existent user
   - Test preventing self-deletion
   - Test without authentication
   - Test with non-admin user

---

## Additional Notes

1. **Password Hashing**: Use bcrypt or similar library with salt rounds (recommended: 10-12)
2. **Email Validation**: Use a proper email validation library or regex
3. **Rate Limiting**: Consider implementing rate limiting for these endpoints
4. **Logging**: Log all admin actions for audit purposes
5. **Total Donate Calculation**: This should be calculated from a donations/transactions collection. If you don't have this, you can set it to 0 or remove it from the response.
6. **Soft Delete**: Consider implementing soft delete instead of hard delete to preserve data integrity

---

## Summary

You need to implement 4 endpoints:

1. `POST /api/v1/users/create-admin` - Create admin/editor user
2. `GET /api/v1/users` - Get paginated users with search and filters
3. `PUT /api/v1/users/:id` - Update user
4. `DELETE /api/v1/users/:id` - Delete user

All endpoints require:
- Bearer token authentication
- Admin role authorization
- Consistent error response format
- Proper validation

Good luck with the implementation! 🚀


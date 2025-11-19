# Backend API Specification

This document specifies the backend API endpoints required for the Hero Images slider and Donation Form features.

## Base URL

All endpoints should be prefixed with `/api/v1` or as configured in your backend.

---

## 1. Hero Images API

### 1.1 Get All Hero Images

**Endpoint:** `GET /hero-images`

**Description:** Retrieve all hero images (for admin/dashboard use).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "image": "string (URL or path)",
      "title": "string (optional)",
      "description": "string (optional)",
      "order": "number (default: 0)",
      "isActive": "boolean (default: true)",
      "createdAt": "string (ISO date)",
      "updatedAt": "string (ISO date)"
    }
  ],
  "message": "string (optional)"
}
```

### 1.2 Get Active Hero Images

**Endpoint:** `GET /hero-images?isActive=true`

**Description:** Retrieve only active hero images (for frontend slider use).

**Query Parameters:**
- `isActive` (boolean, optional): Filter by active status

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "image": "string",
      "title": "string (optional)",
      "description": "string (optional)",
      "order": "number",
      "isActive": true,
      "createdAt": "string",
      "updatedAt": "string"
    }
  ]
}
```

**Notes:**
- Images should be sorted by `order` field (ascending)
- Only images where `isActive === true` should be returned

### 1.3 Get Single Hero Image

**Endpoint:** `GET /hero-images/:id`

**Parameters:**
- `id` (string): Hero image ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "image": "string",
    "title": "string (optional)",
    "description": "string (optional)",
    "order": "number",
    "isActive": "boolean",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### 1.4 Create Hero Image

**Endpoint:** `POST /hero-images`

**Authentication:** Required (Bearer token)

**Content-Type:** `multipart/form-data` (for file upload)

**Request Body (FormData):**
- `image` (File): Image file (required)
- `title` (string, optional): Image title
- `description` (string, optional): Image description
- `order` (number, optional): Display order (default: 0)
- `isActive` (boolean, optional): Active status (default: true)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "image": "string (uploaded image path/URL)",
    "title": "string",
    "description": "string",
    "order": "number",
    "isActive": "boolean",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "message": "Hero image created successfully"
}
```

**Validation:**
- `image` is required
- `image` must be a valid image file (jpg, jpeg, png, webp, etc.)
- `order` should be a non-negative integer
- File size should be validated (suggest max 10MB)

### 1.5 Update Hero Image

**Endpoint:** `PUT /hero-images/:id`

**Authentication:** Required (Bearer token)

**Content-Type:** `multipart/form-data` (if updating image) or `application/json` (if only updating metadata)

**Parameters:**
- `id` (string): Hero image ID

**Request Body:**
- `image` (File, optional): New image file
- `title` (string, optional): Image title
- `description` (string, optional): Image description
- `order` (number, optional): Display order
- `isActive` (boolean, optional): Active status

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "image": "string",
    "title": "string",
    "description": "string",
    "order": "number",
    "isActive": "boolean",
    "createdAt": "string",
    "updatedAt": "string"
  },
  "message": "Hero image updated successfully"
}
```

**Notes:**
- All fields are optional (partial update)
- If `image` is provided, old image should be deleted from storage
- Only send `multipart/form-data` if `image` is being updated

### 1.6 Delete Hero Image

**Endpoint:** `DELETE /hero-images/:id`

**Authentication:** Required (Bearer token)

**Parameters:**
- `id` (string): Hero image ID

**Response:**
```json
{
  "success": true,
  "message": "Hero image deleted successfully"
}
```

**Notes:**
- Delete the associated image file from storage when deleting the record

---

## 2. Donations API

### 2.1 Create Donation

**Endpoint:** `POST /donations`

**Content-Type:** `application/json`

**Description:** Create a new donation submission (public endpoint, no authentication required).

**Request Body:**
```json
{
  "purpose": "string (required)",
  "contact": "string (required, email or phone)",
  "amount": "number (required, must be > 0)"
}
```

**Example:**
```json
{
  "purpose": "orphan_responsibility",
  "contact": "user@example.com",
  "amount": 5000.00
}
```

**Validation:**
- `purpose` is required and must be a valid purpose value (one of: orphan_responsibility, deprived_students, widow_responsibility, rehabilitation_poor_family, tube_well_install, wudu_place_install, dowry_responsibility, skill_development, winter_clothes, mosque_construction, orphanage_construction, zakat_fund, general_fund, iftar_program, qurbani_program, emergency_relief, shelterless_housing)
- `contact` is required and should be validated as email or phone number
- `amount` is required and must be a positive number

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "purpose": "string",
    "contact": "string",
    "amount": "number",
    "status": "pending",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  },
  "message": "Donation submitted successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Validation error message"
}
```

**Error Codes:**
- `400`: Bad Request (validation errors)
- `500`: Internal Server Error

### 2.2 Get All Donations (Admin)

**Endpoint:** `GET /donations`

**Authentication:** Required (Bearer token, admin only)

**Query Parameters (optional):**
- `page` (number): Page number for pagination
- `limit` (number): Items per page
- `status` (string): Filter by status (pending, completed, failed)
- `purpose` (string): Filter by purpose
- `startDate` (string): Filter donations from date (ISO format)
- `endDate` (string): Filter donations to date (ISO format)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "purpose": "string",
      "contact": "string",
      "amount": "number",
      "status": "pending | completed | failed",
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "totalPages": "number"
  }
}
```

### 2.3 Get Single Donation

**Endpoint:** `GET /donations/:id`

**Authentication:** Required (Bearer token, admin only)

**Parameters:**
- `id` (string): Donation ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "purpose": "string",
    "contact": "string",
    "amount": "number",
    "status": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

## Database Schema

### Hero Images Table

```sql
CREATE TABLE hero_images (
  id VARCHAR(255) PRIMARY KEY,
  image VARCHAR(500) NOT NULL,
  title VARCHAR(255),
  description TEXT,
  order INT DEFAULT 0,
  isActive BOOLEAN DEFAULT true,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_order (order),
  INDEX idx_isActive (isActive)
);
```

### Donations Table

```sql
CREATE TABLE donations (
  id VARCHAR(255) PRIMARY KEY,
  purpose VARCHAR(100) NOT NULL,
  contact VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_purpose (purpose),
  INDEX idx_createdAt (createdAt)
);
```

---

## Error Responses

All error responses should follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

---

## Authentication

All admin endpoints (create, update, delete for hero images, and get all donations) require authentication using Bearer token:

```
Authorization: Bearer <token>
```

The token should be validated and user permissions checked for admin-only endpoints.

---

## File Upload

For hero image uploads:

1. Accept `multipart/form-data` requests
2. Validate file type (images only)
3. Validate file size (suggest max 10MB)
4. Store files in a dedicated directory (e.g., `/uploads/hero-images/`)
5. Generate unique filenames to prevent conflicts
6. Return the stored file path/URL in the response
7. Delete old files when updating or deleting records

---

## Notes for Backend Developer

1. **Image Storage**: Consider using a cloud storage service (AWS S3, Cloudinary, etc.) for production. For development, local file storage is acceptable.

2. **Image Optimization**: Consider resizing/optimizing uploaded images to improve frontend performance.

3. **CORS**: Ensure CORS is properly configured to allow requests from your frontend domain.

4. **Rate Limiting**: Consider implementing rate limiting for the donation endpoint to prevent abuse.

5. **Email Notifications**: Consider sending email notifications when donations are submitted (optional enhancement).

6. **Payment Gateway Integration**: The donation endpoint currently only stores donation data. Integration with a payment gateway (Stripe, PayPal, etc.) would be a future enhancement.

7. **Data Validation**: Implement comprehensive server-side validation. Don't rely solely on frontend validation.

8. **Error Handling**: Return clear, user-friendly error messages that help frontend developers debug issues.

9. **Pagination**: For the donations list endpoint, implement pagination to handle large datasets efficiently.

10. **Logging**: Log all donation submissions and admin actions for audit purposes.

---

## Testing

Test the following scenarios:

**Hero Images:**
- Upload image with all fields
- Upload image with only required fields
- Update image metadata without changing image
- Update image file
- Delete image
- Get active images (should exclude inactive ones)
- Images should be sorted by order

**Donations:**
- Submit donation with valid data
- Submit donation with invalid purpose
- Submit donation with invalid email/phone
- Submit donation with negative amount
- Submit donation with missing required fields
- Get donations list (admin)
- Filter donations by status, purpose, date range


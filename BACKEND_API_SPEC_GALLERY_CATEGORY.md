# Gallery Category API Specification

This document provides the backend API specification for the Gallery Category endpoints. These endpoints should be created to support the frontend gallery category management functionality.

## Base URL
```
/api/v1/gallery-category
```

## Authentication
All endpoints require authentication via Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. GET /gallery-category
Get all gallery categories with optional pagination and search.

**Query Parameters:**
- `page` (optional, number): Page number (default: 1)
- `limit` (optional, number): Items per page (default: 10)
- `searchTerm` (optional, string): Search term to filter categories by title

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "createdAt": "ISO 8601 date string",
      "updatedAt": "ISO 8601 date string"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalItems": 10,
    "itemsPerPage": 10
  }
}
```

**Error Response (500):**
```json
{
  "success": false,
  "message": "Error message"
}
```

---

### 2. GET /gallery-category/:id
Get a single gallery category by ID.

**Path Parameters:**
- `id` (required, string): Category ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "createdAt": "ISO 8601 date string",
    "updatedAt": "ISO 8601 date string"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Category not found"
}
```

---

### 3. POST /gallery-category
Create a new gallery category.

**Request Body:**
```json
{
  "title": "string" // Required, unique
}
```

**Validation:**
- `title` is required
- `title` must be a non-empty string
- `title` should be unique (check for duplicates)

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "createdAt": "ISO 8601 date string",
    "updatedAt": "ISO 8601 date string"
  },
  "message": "Category created successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation error message"
}
```

**Error Response (409 Conflict):**
```json
{
  "success": false,
  "message": "Category with this title already exists"
}
```

---

### 4. PUT /gallery-category/:id
Update an existing gallery category.

**Path Parameters:**
- `id` (required, string): Category ID

**Request Body:**
```json
{
  "title": "string" // Required
}
```

**Validation:**
- `title` is required
- `title` must be a non-empty string
- `title` should be unique (check for duplicates, excluding current category)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "createdAt": "ISO 8601 date string",
    "updatedAt": "ISO 8601 date string"
  },
  "message": "Category updated successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Category not found"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Validation error message"
}
```

**Error Response (409 Conflict):**
```json
{
  "success": false,
  "message": "Category with this title already exists"
}
```

---

### 5. DELETE /gallery-category/:id
Delete a gallery category.

**Path Parameters:**
- `id` (required, string): Category ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": null,
  "message": "Category deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Category not found"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Cannot delete category: it is being used by gallery items"
}
```

**Note:** Before deleting, check if any gallery items are using this category. If yes, either:
- Prevent deletion and return an error, OR
- Set the category to null/undefined for those items, OR
- Move items to a default category

---

## Database Schema

### GalleryCategory Model
```javascript
{
  _id: ObjectId,           // MongoDB ID
  id: String,             // Can be same as _id or a separate unique identifier
  title: String,          // Required, unique, indexed
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-updated
}
```

### Indexes
- Create a unique index on `title` field
- Create an index on `id` field for faster lookups

---

## Implementation Notes

### 1. Route Structure
Create a router file (e.g., `routes/galleryCategory.js` or `routes/galleryCategory.ts`) with the following structure:

```javascript
// Example Express.js route structure
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);
```

### 2. Middleware
- Authentication middleware: Verify JWT token
- Authorization middleware: Check if user has admin/editor role (if applicable)
- Validation middleware: Validate request body using a library like Joi, Yup, or express-validator

### 3. Controller Functions

#### getAllCategories
- Parse query parameters (page, limit, searchTerm)
- Implement pagination
- If searchTerm is provided, filter categories by title (case-insensitive search)
- Return paginated results

#### getCategoryById
- Validate ID format
- Find category by ID
- Return 404 if not found

#### createCategory
- Validate request body
- Check if category with same title already exists
- Create new category
- Return created category

#### updateCategory
- Validate request body and ID
- Find category by ID
- Check if another category with same title exists (excluding current one)
- Update category
- Return updated category

#### deleteCategory
- Find category by ID
- Check if any gallery items are using this category
- If items exist, either prevent deletion or handle cascade
- Delete category
- Return success response

### 4. Error Handling
- Use consistent error response format
- Return appropriate HTTP status codes:
  - 200: Success
  - 201: Created
  - 400: Bad Request (validation errors)
  - 401: Unauthorized (missing/invalid token)
  - 403: Forbidden (insufficient permissions)
  - 404: Not Found
  - 409: Conflict (duplicate title)
  - 500: Internal Server Error

### 5. Testing Considerations
- Test all CRUD operations
- Test pagination
- Test search functionality
- Test duplicate title prevention
- Test deletion with/without associated gallery items
- Test authentication and authorization

---

## Example Implementation (Express.js + MongoDB)

```javascript
// routes/galleryCategory.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { validateCategory } = require('../middleware/validation');
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/galleryCategoryController');

router.get('/', authenticate, getAllCategories);
router.get('/:id', authenticate, getCategoryById);
router.post('/', authenticate, validateCategory, createCategory);
router.put('/:id', authenticate, validateCategory, updateCategory);
router.delete('/:id', authenticate, deleteCategory);

module.exports = router;
```

```javascript
// controllers/galleryCategoryController.js
const GalleryCategory = require('../models/GalleryCategory');
const Gallery = require('../models/Gallery');

exports.getAllCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, searchTerm } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const query = {};
    if (searchTerm) {
      query.title = { $regex: searchTerm, $options: 'i' };
    }
    
    const categories = await GalleryCategory.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });
    
    const totalItems = await GalleryCategory.countDocuments(query);
    const totalPages = Math.ceil(totalItems / parseInt(limit));
    
    res.json({
      success: true,
      data: categories,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { title } = req.body;
    
    // Check for duplicate
    const existing = await GalleryCategory.findOne({ title });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Category with this title already exists'
      });
    }
    
    const category = new GalleryCategory({ title });
    await category.save();
    
    res.status(201).json({
      success: true,
      data: category,
      message: 'Category created successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Similar implementations for other controllers...
```

---

## Integration with Gallery Items

When implementing, consider the relationship between Gallery Categories and Gallery Items:

1. **Reference in Gallery Model:**
   - Gallery items should reference category by `title` or `id`
   - When a category is deleted, decide on cascade behavior

2. **Category Usage Check:**
   ```javascript
   // Before deleting a category
   const itemsUsingCategory = await Gallery.countDocuments({ category: categoryTitle });
   if (itemsUsingCategory > 0) {
     // Handle accordingly
   }
   ```

---

## Additional Recommendations

1. **Soft Delete:** Consider implementing soft delete (isDeleted flag) instead of hard delete
2. **Audit Trail:** Log category creation, updates, and deletions
3. **Caching:** Consider caching category list for better performance
4. **Rate Limiting:** Implement rate limiting on create/update/delete endpoints
5. **Validation:** Use a validation library to ensure data integrity
6. **Localization:** If your app supports multiple languages, consider storing category titles in multiple languages

---

## Questions for Backend Team

1. Should category deletion cascade to gallery items, or prevent deletion if items exist?
2. Do we need role-based access control (e.g., only admins can create/delete categories)?
3. Should category titles be case-sensitive or case-insensitive for uniqueness?
4. Do we need category descriptions or other additional fields?
5. Should we implement category ordering/priority for display purposes?








# Donation Category Model - Backend API Specification

## Overview
This document specifies the backend implementation for a **Donation Category** model. The Donation Category model includes fields for managing donation category information with conditional amount options.

---

## Database Schema / Model

### DonationCategory Model

```typescript
// TypeScript/JavaScript Example (adapt to your backend language)
interface DonationCategory {
  id: string;                    // Auto-generated unique identifier
  title: string;                 // Required - Category title
  subtitle: string;              // Required - Category subtitle
  video: string;                 // Required - Video link (URL)
  description: string;           // Required - Full description (preserve line breaks and newlines)
  slug: string;                  // Required - URL-friendly unique identifier
  expenseCategory: string;       // Required - Expense category name
  thumbnail: string;             // Required - Single image URL/path for thumbnail
  daily?: number[];              // Optional - Array of daily donation amounts (numbers)
  monthly?: number[];            // Optional - Array of monthly donation amounts (numbers)
  amount?: number[];             // Optional - Array of donation amounts (numbers) - shown when daily/monthly are not selected
  formTitle: string;             // Required - Form title
  formDescription: string;       // Required - Form description
  createdAt: Date;               // Auto-generated timestamp
  updatedAt: Date;               // Auto-updated timestamp
}
```

### Database Schema Examples

#### MongoDB (Mongoose)
```javascript
const donationCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  video: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Video must be a valid URL'
    }
  },
  description: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly']
  },
  expenseCategory: {
    type: String,
    required: true,
    trim: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  daily: {
    type: [Number],
    default: null,
    validate: {
      validator: function(v) {
        return !v || (Array.isArray(v) && v.every(n => typeof n === 'number' && n > 0));
      },
      message: 'Daily amounts must be an array of positive numbers'
    }
  },
  monthly: {
    type: [Number],
    default: null,
    validate: {
      validator: function(v) {
        return !v || (Array.isArray(v) && v.every(n => typeof n === 'number' && n > 0));
      },
      message: 'Monthly amounts must be an array of positive numbers'
    }
  },
  amount: {
    type: [Number],
    default: null,
    validate: {
      validator: function(v) {
        return !v || (Array.isArray(v) && v.every(n => typeof n === 'number' && n > 0));
      },
      message: 'Amounts must be an array of positive numbers'
    }
  },
  formTitle: {
    type: String,
    required: true,
    trim: true
  },
  formDescription: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Index for faster slug lookups
donationCategorySchema.index({ slug: 1 });

// Validation: At least one of daily, monthly, or amount must be provided
donationCategorySchema.pre('save', function(next) {
  const hasDaily = this.daily && this.daily.length > 0;
  const hasMonthly = this.monthly && this.monthly.length > 0;
  const hasAmount = this.amount && this.amount.length > 0;
  
  if (!hasDaily && !hasMonthly && !hasAmount) {
    return next(new Error('At least one of daily, monthly, or amount must be provided'));
  }
  next();
});
```

#### PostgreSQL (Prisma)
```prisma
model DonationCategory {
  id              String   @id @default(uuid())
  title           String
  subtitle        String
  video           String
  description     String   @db.Text
  slug            String   @unique
  expenseCategory String
  thumbnail       String
  daily           Float[]
  monthly         Float[]
  amount          Float[]
  formTitle       String
  formDescription String   @db.Text
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([slug])
  @@map("donation_categories")
}
```

#### SQL (Raw SQL)
```sql
CREATE TABLE donation_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  video TEXT NOT NULL,
  description TEXT NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  expense_category VARCHAR(255) NOT NULL,
  thumbnail TEXT NOT NULL,
  form_title VARCHAR(255) NOT NULL,
  form_description TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Separate table for daily amounts
CREATE TABLE donation_category_daily_amounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES donation_categories(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  display_order INTEGER DEFAULT 0
);

-- Separate table for monthly amounts
CREATE TABLE donation_category_monthly_amounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES donation_categories(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  display_order INTEGER DEFAULT 0
);

-- Separate table for general amounts
CREATE TABLE donation_category_amounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES donation_categories(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  display_order INTEGER DEFAULT 0
);

-- Indexes
CREATE INDEX idx_donation_categories_slug ON donation_categories(slug);
CREATE INDEX idx_daily_amounts_category_id ON donation_category_daily_amounts(category_id);
CREATE INDEX idx_monthly_amounts_category_id ON donation_category_monthly_amounts(category_id);
CREATE INDEX idx_amounts_category_id ON donation_category_amounts(category_id);
```

---

## API Endpoints

### Base URL
```
/api/donation-categories
```

### 1. Create Donation Category
**POST** `/api/donation-categories`

**Request Body:**
```json
{
  "title": "Education Support",
  "subtitle": "Support education initiatives",
  "video": "https://www.youtube.com/watch?v=example",
  "description": "Full description\n\nWith line breaks\n\nAnd newlines preserved",
  "slug": "education-support",
  "expenseCategory": "Education",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "daily": [100, 200, 500],
  "monthly": null,
  "amount": null,
  "formTitle": "Donate for Education",
  "formDescription": "Your donation will help support education"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "title": "Education Support",
    "subtitle": "Support education initiatives",
    "video": "https://www.youtube.com/watch?v=example",
    "description": "Full description\n\nWith line breaks\n\nAnd newlines preserved",
    "slug": "education-support",
    "expenseCategory": "Education",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "daily": [100, 200, 500],
    "monthly": null,
    "amount": null,
    "formTitle": "Donate for Education",
    "formDescription": "Your donation will help support education",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Validation Rules:**
- `title`: Required, string, max 255 characters
- `subtitle`: Required, string, max 255 characters
- `video`: Required, string, must be valid URL
- `description`: Required, string, preserve line breaks and newlines exactly as provided
- `slug`: Required, string, unique, URL-friendly (lowercase, hyphens only), max 255 characters
- `expenseCategory`: Required, string
- `thumbnail`: Required, string, must be valid URL
- `daily`: Optional, array of positive numbers
- `monthly`: Optional, array of positive numbers
- `amount`: Optional, array of positive numbers
- `formTitle`: Required, string
- `formDescription`: Required, string
- **At least one of `daily`, `monthly`, or `amount` must be provided and non-empty**

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "At least one of daily, monthly, or amount must be provided"
}
```

---

### 2. Get All Donation Categories
**GET** `/api/donation-categories`

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "title": "Education Support",
      "subtitle": "Support education",
      "slug": "education-support",
      "expenseCategory": "Education",
      "thumbnail": "https://example.com/thumb1.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 3. Get Donation Category by ID
**GET** `/api/donation-categories/:id`

**Response (200 OK):** Full category object with all fields

---

### 4. Get Donation Category by Slug
**GET** `/api/donation-categories/slug/:slug`

**Response (200 OK):** Full category object with all fields

---

### 5. Update Donation Category
**PUT** `/api/donation-categories/:id`

**Request Body:** Same structure as Create (all fields optional for PATCH)

**Response (200 OK):** Updated category object

---

### 6. Delete Donation Category
**DELETE** `/api/donation-categories/:id`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Donation category deleted successfully"
}
```

---

## Important Implementation Notes

### 1. Conditional Amount Fields
- `daily` and `monthly` are optional arrays of numbers
- `amount` is optional array of numbers
- **At least one of these three fields must have values** (validation rule)
- Frontend logic:
  - If `daily` checkbox is checked → show daily input, hide amount
  - If `monthly` checkbox is checked → show monthly input, hide amount
  - If both `daily` and `monthly` are unchecked → show amount input
  - If both are checked → show both daily and monthly, hide amount

### 2. Number Array Fields
- All number arrays (`daily`, `monthly`, `amount`) should contain only positive numbers
- Validate that each number is > 0
- Store as array of numbers (not strings)
- Can be null or empty array

### 3. Description Field Formatting
- **CRITICAL**: The `description` field must preserve line breaks (`\n`) and newlines exactly as provided
- When storing in database, use `TEXT` type (not VARCHAR) to handle long content
- When returning in API, ensure line breaks are preserved in JSON response

### 4. Slug Generation
- Slugs should be auto-generated from title if not provided
- Convert to lowercase
- Replace spaces with hyphens
- Remove special characters
- Ensure uniqueness (append number if duplicate)
- Example: "Education Support" → "education-support"

### 5. Thumbnail Field
- Store as string (image URL)
- Validate that URL is valid
- Consider implementing image upload endpoint separately
- Return full URLs in API responses

### 6. Video Field
- Accept any valid URL (YouTube, Vimeo, direct video links, etc.)
- Frontend will handle embedding based on URL type
- Validate URL format but don't restrict to specific platforms

### 7. Form Fields
- `formTitle`: Title to display on the donation form
- `formDescription`: Description to display on the donation form
- Both are required text fields

### 8. Timestamps
- Auto-generate `createdAt` on creation
- Auto-update `updatedAt` on any modification
- Return in ISO 8601 format

### 9. Error Handling
- Return consistent error format
- Include validation errors with field names
- Use appropriate HTTP status codes:
  - 200: Success
  - 201: Created
  - 400: Bad Request (validation errors)
  - 404: Not Found
  - 500: Internal Server Error

---

## Example Implementation (Node.js/Express)

```javascript
// routes/donationCategories.js
const express = require('express');
const router = express.Router();
const DonationCategory = require('../models/DonationCategory');

// Create Donation Category
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const { title, subtitle, video, description, slug, expenseCategory, thumbnail, formTitle, formDescription } = req.body;
    
    if (!title || !subtitle || !video || !description || !slug || !expenseCategory || !thumbnail || !formTitle || !formDescription) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Validate at least one amount field
    const hasDaily = req.body.daily && Array.isArray(req.body.daily) && req.body.daily.length > 0;
    const hasMonthly = req.body.monthly && Array.isArray(req.body.monthly) && req.body.monthly.length > 0;
    const hasAmount = req.body.amount && Array.isArray(req.body.amount) && req.body.amount.length > 0;
    
    if (!hasDaily && !hasMonthly && !hasAmount) {
      return res.status(400).json({
        success: false,
        error: 'At least one of daily, monthly, or amount must be provided'
      });
    }

    // Validate number arrays
    const validateNumberArray = (arr, fieldName) => {
      if (!arr) return null;
      if (!Array.isArray(arr)) {
        throw new Error(`${fieldName} must be an array`);
      }
      const numbers = arr.map(n => {
        const num = Number(n);
        if (isNaN(num) || num <= 0) {
          throw new Error(`${fieldName} must contain only positive numbers`);
        }
        return num;
      });
      return numbers;
    };

    // Check if slug exists
    const existingCategory = await DonationCategory.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        error: 'Slug already exists'
      });
    }

    const category = new DonationCategory({
      title,
      subtitle,
      video,
      description, // Preserve line breaks
      slug,
      expenseCategory,
      thumbnail,
      daily: validateNumberArray(req.body.daily, 'daily'),
      monthly: validateNumberArray(req.body.monthly, 'monthly'),
      amount: validateNumberArray(req.body.amount, 'amount'),
      formTitle,
      formDescription
    });

    await category.save();

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get All Donation Categories
router.get('/', async (req, res) => {
  try {
    const categories = await DonationCategory.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get Donation Category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await DonationCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Donation category not found'
      });
    }
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get Donation Category by Slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const category = await DonationCategory.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Donation category not found'
      });
    }
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update Donation Category
router.put('/:id', async (req, res) => {
  try {
    const category = await DonationCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Donation category not found'
      });
    }
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Delete Donation Category
router.delete('/:id', async (req, res) => {
  try {
    const category = await DonationCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Donation category not found'
      });
    }
    res.json({
      success: true,
      message: 'Donation category deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
```

---

## Summary

This specification provides:
- ✅ Complete database schema for multiple database types
- ✅ Full CRUD API endpoints
- ✅ Request/response formats
- ✅ Validation rules
- ✅ Error handling guidelines
- ✅ Implementation examples

**Key Requirements:**
- Description field must preserve line breaks and newlines
- All required fields must be validated
- Slug must be unique and URL-friendly
- At least one of daily, monthly, or amount must be provided
- Number arrays must contain only positive numbers
- Thumbnail is a single image URL
- Video is a URL (any valid video link)
- Form title and description are required


# Volunteer Application API Documentation

This document describes the API structure for the Volunteer Application system.

## Base URL
```
POST /api/v1/volunteers
GET /api/v1/volunteers
PATCH /api/v1/volunteers/:id/status
DELETE /api/v1/volunteers/:id
```

## Data Model

### VolunteerApplication Schema

```typescript
{
  _id: string;                    // Auto-generated ID
  // Personal Information
  name: string;                   // Required
  fatherName: string;             // Required
  mobileNumber: string;           // Required
  mobileCountryCode: string;      // Required (default: "+880")
  email: string;                  // Required, must be valid email
  
  // Professional Information
  currentProfession: string;      // Required
  organizationName: string;       // Required
  workplaceAddress: string;       // Required
  
  // Current Address
  currentDivision: string;        // Required
  currentDistrict: string;        // Required
  currentUpazila: string;         // Required
  currentUnion: string;           // Required
  currentFullAddress: string;     // Required
  
  // Permanent Address
  permanentDivision: string;      // Required
  permanentDistrict: string;      // Required
  permanentUpazila: string;       // Required
  permanentUnion: string;         // Required
  permanentFullAddress: string;   // Required
  
  // Overseas (Optional)
  overseasCountry?: string;       // Optional
  overseasAddress?: string;       // Optional
  
  // Social Media
  facebookId?: string;            // Required if fbNotUsed is false
  linkedinId?: string;            // Optional
  whatsappNumber?: string;        // Optional
  whatsappCountryCode?: string;   // Optional (default: "+880")
  telegramNumber?: string;        // Optional
  telegramCountryCode?: string;   // Optional (default: "+880")
  fbNotUsed: boolean;             // Required (default: false)
  
  // Educational Qualification
  educationMedium: string;        // Required
  educationLevel: string;         // Required
  currentClassYear: string;       // Required
  departmentDegree?: string;      // Optional
  lastInstitutionName: string;    // Required
  
  // Previous Volunteer Experience
  wasVolunteer: boolean;          // Required (default: false)
  previousProjectName?: string;   // Required if wasVolunteer is true
  previousProjectLocation?: string; // Required if wasVolunteer is true
  previousBatch?: string;         // Required if wasVolunteer is true (format: YYYY)
  previousBeneficiariesCount?: number; // Required if wasVolunteer is true
  
  // Profile Image
  profileImage?: string;          // Optional, file path/URL after upload
  
  // Status
  status: 'pending' | 'approved' | 'rejected'; // Required (default: 'pending')
  
  // Timestamps
  createdAt: string;              // Auto-generated ISO date string
  updatedAt: string;              // Auto-generated ISO date string
}
```

## API Endpoints

### 1. Create Volunteer Application

**Endpoint:** `POST /api/v1/volunteers`

**Description:** Creates a new volunteer application. The status will be set to 'pending' by default.

**Content-Type:** `multipart/form-data` (automatically set by browser when using FormData)

**Request Body (FormData):**

All fields from the schema above, with the following notes:
- **`profileImage`** - Must be sent as a **File object** (not base64, not URL, not string). The backend will receive this as a file upload that can be processed using multer, formidable, or similar file upload middleware.
- Boolean fields (`fbNotUsed`, `wasVolunteer`) should be sent as strings: "true" or "false"
- `previousBeneficiariesCount` should be sent as a string (will be parsed to number)

**Important:** When `profileImage` is included, it must be a File object. The frontend sends it using `FormData.append("profileImage", fileObject)`, and the backend receives it as a file that can be saved to disk or cloud storage.

**Response:**
```json
{
  "success": true,
  "data": {
    // VolunteerApplication object
  },
  "message": "Volunteer application created successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message here"
}
```

**Validation Rules:**
- All required fields must be present
- Email must be valid format
- If `fbNotUsed` is false, `facebookId` is required
- If `wasVolunteer` is true, all previous volunteer fields are required
- `profileImage` must be:
  - File type: JPEG, JPG, PNG, HEIC, or HEIF
  - Max size: 3 MB

---

### 2. Get Volunteer Applications (with pagination and filters)

**Endpoint:** `GET /api/v1/volunteers`

**Description:** Retrieves a paginated list of volunteer applications with optional filtering.

**Authentication:** Required (Bearer token)

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10)
- `status` (string, optional): Filter by status - 'pending', 'approved', or 'rejected'
- `searchTerm` (string, optional): Search by name, email, or mobile number

**Example Request:**
```
GET /api/v1/volunteers?page=1&limit=10&status=pending&searchTerm=john
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      // VolunteerApplication objects
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

---

### 3. Update Volunteer Application Status

**Endpoint:** `PATCH /api/v1/volunteers/:id/status`

**Description:** Updates the status of a volunteer application.

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "status": "approved"  // or "pending" or "rejected"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    // Updated VolunteerApplication object
  },
  "message": "Status updated successfully"
}
```

---

### 4. Delete Volunteer Application

**Endpoint:** `DELETE /api/v1/volunteers/:id`

**Description:** Deletes a volunteer application.

**Authentication:** Required (Bearer token)

**Response:**
```json
{
  "success": true,
  "message": "Volunteer application deleted successfully"
}
```

---

## Conditional Field Logic

### Facebook ID Field
- If `fbNotUsed` is `false`, `facebookId` is **required**
- If `fbNotUsed` is `true`, `facebookId` should be `null` or not sent

### Previous Volunteer Experience Fields
- If `wasVolunteer` is `true`, the following fields are **required**:
  - `previousProjectName`
  - `previousProjectLocation`
  - `previousBatch`
  - `previousBeneficiariesCount`
- If `wasVolunteer` is `false`, these fields should be `null` or not sent

## File Upload

The `profileImage` field is sent as a **File object** in the FormData:

### Frontend Implementation
```javascript
const formData = new FormData();
formData.append("profileImage", fileObject); // fileObject is a File instance from <input type="file">
// ... other fields
fetch('/api/v1/volunteers', {
  method: 'POST',
  body: formData, // Don't set Content-Type header - browser sets it automatically
});
```

### Backend Implementation
The backend will receive `profileImage` as a file upload (not JSON, not base64). Use file upload middleware like:
- **Node.js/Express:** `multer`, `formidable`, or `busboy`
- **NestJS:** `@nestjs/platform-express` with `FileInterceptor`
- **Other frameworks:** Use appropriate multipart/form-data parser

**File Requirements:**
- **Allowed formats:** JPEG, JPG, PNG, HEIC, HEIF
- **Max file size:** 3 MB (3 * 1024 * 1024 bytes)
- **Field name:** `profileImage`

**Backend Processing Steps:**
1. Receive the file from the multipart/form-data request
2. Validate file type (MIME type or extension)
3. Validate file size (max 3 MB)
4. Generate a unique filename (to avoid conflicts)
5. Store the file (local filesystem, AWS S3, Cloudinary, etc.)
6. Save the file path/URL in the database `profileImage` field

**Example Backend Code (Express with Multer):**
```javascript
const multer = require('multer');
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

app.post('/api/v1/volunteers', upload.single('profileImage'), (req, res) => {
  // req.file contains the uploaded file information
  // req.body contains other form fields
  const profileImagePath = req.file ? req.file.path : null;
  // ... save to database
});
```

## Status Flow

1. **pending** - Default status when application is created
2. **approved** - Admin approves the application
3. **rejected** - Admin rejects the application

## Example Request (FormData)

When creating a volunteer application, the request should be sent as `multipart/form-data`:

**Frontend JavaScript/TypeScript:**
```javascript
const formData = new FormData();
formData.append("name", "John Doe");
formData.append("fatherName", "Jane Doe");
formData.append("mobileNumber", "01712345678");
formData.append("mobileCountryCode", "+880");
formData.append("email", "john@example.com");
formData.append("currentProfession", "Engineer");
formData.append("organizationName", "ABC Company");
formData.append("workplaceAddress", "123 Main St, Dhaka");
formData.append("currentDivision", "Dhaka");
formData.append("currentDistrict", "Dhaka");
formData.append("currentUpazila", "Dhanmondi");
formData.append("currentUnion", "Union 1");
formData.append("currentFullAddress", "123 Main Street, Dhanmondi, Dhaka");
formData.append("permanentDivision", "Dhaka");
formData.append("permanentDistrict", "Dhaka");
formData.append("permanentUpazila", "Dhanmondi");
formData.append("permanentUnion", "Union 1");
formData.append("permanentFullAddress", "123 Main Street, Dhanmondi, Dhaka");
formData.append("fbNotUsed", "false");
formData.append("facebookId", "https://facebook.com/johndoe");
formData.append("educationMedium", "English");
formData.append("educationLevel", "Bachelor");
formData.append("currentClassYear", "Final Year");
formData.append("lastInstitutionName", "University of Dhaka");
formData.append("wasVolunteer", "false");

// IMPORTANT: profileImage is a File object, not a string
const fileInput = document.querySelector('input[type="file"]');
if (fileInput.files[0]) {
  formData.append("profileImage", fileInput.files[0]); // File object
}

fetch('/api/v1/volunteers', {
  method: 'POST',
  body: formData, // Browser automatically sets Content-Type: multipart/form-data with boundary
});
```

**What the Backend Receives:**
- All text fields as strings in `req.body` (or parsed form fields)
- `profileImage` as a **file object** accessible via file upload middleware (e.g., `req.file` in multer)

## Error Handling

All endpoints should return appropriate HTTP status codes:
- `200` - Success
- `201` - Created (for POST)
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": {
    // Optional: field-specific errors
    "email": "Invalid email format",
    "mobileNumber": "Mobile number is required"
  }
}
```


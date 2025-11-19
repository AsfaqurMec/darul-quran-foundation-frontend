# Member Application Backend API Specifications

This document describes the backend API endpoints required for the member application feature.

## Base URL
```
/api/v1/members
```

## Authentication
All endpoints should support optional Bearer token authentication (for logged-in users). Public submissions should also be allowed without authentication.

---

## 1. Initiate Payment (Online Payment)

**Endpoint:** `POST /api/v1/members/initiate-payment`

**Description:** Creates a payment session with SSLCommerz and returns the gateway URL for redirect.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <token> (optional)
```

**Request Body:**
```json
{
  "type": "lifetime" | "donor",
  "amount": 100000,
  "name": "আহমেদ",
  "fatherName": "করিম",
  "gender": "male" | "female",
  "mobile": "01712345678",
  "isOverseas": false,
  "email": "ahmed@example.com",  // optional, required if isOverseas is true
  "district": "ব্যবসায়ী",  // Actually occupation field
  "reference": "রেফারেন্স",  // optional
  "address": "ঢাকা, বাংলাদেশ",
  "successUrl": "https://yourdomain.com/payment/member-success",
  "failUrl": "https://yourdomain.com/payment/member-failed",
  "cancelUrl": "https://yourdomain.com/payment/member-failed"
}
```

**Response (Success):**
```json
{
  "success": true,
  "gatewayUrl": "https://epay-gw.sslcommerz.com/7f544326fb90457967604075e1f5018db83da538",
  "message": "Payment session created successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Error message here"
}
```

**Backend Implementation Notes:**
1. Store the form data temporarily (in database, Redis, or session) associated with the payment session ID
2. Initiate SSLCommerz payment session with the amount
3. Use the SSLCommerz transaction ID or session ID to link back to the form data
4. Return the gateway URL from SSLCommerz response
5. The SSLCommerz callback/redirect will come back to `successUrl` or `failUrl` with transaction details

**SSLCommerz Integration:**
- Use SSLCommerz API to create payment session
- Required SSLCommerz fields:
  - `store_id`: Your SSLCommerz store ID
  - `store_passwd`: Your SSLCommerz store password
  - `total_amount`: Amount in BDT
  - `currency`: "BDT"
  - `tran_id`: Unique transaction ID (generate UUID or unique ID)
  - `success_url`: Callback URL for success
  - `fail_url`: Callback URL for failure
  - `cancel_url`: Callback URL for cancellation
  - `cus_name`: Customer name
  - `cus_email`: Customer email (if available)
  - `cus_phone`: Customer mobile
  - `cus_add1`: Customer address
  - `product_category`: "member_application"
  - `product_name`: "Lifetime Member" or "Donor Member"
  - `product_profile`: "general"

---

## 2. Complete Payment (After Online Payment Success)

**Endpoint:** `POST /api/v1/members/complete-payment`

**Description:** Called after successful SSLCommerz payment. Retrieves the stored form data and creates the member application record.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <token> (optional)
```

**Request Body:**
```json
{
  "transactionId": "7f544326fb90457967604075e1f5018db83da538",
  "status": "VALID",
  "amount": "100000",
  "currency": "BDT",
  "bankTxnId": "123456789",
  "valId": "1906041125201",
  "storeAmount": "100000",
  "cardType": "VISA",
  // ... other SSLCommerz callback parameters
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "member_application_id",
    "type": "lifetime",
    "status": "pending_approval",
    "transactionId": "7f544326fb90457967604075e1f5018db83da538"
  },
  "message": "Member application submitted successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Transaction not found or already processed"
}
```

**Backend Implementation Notes:**
1. Verify the transaction with SSLCommerz using `val_id` (validation ID)
2. Retrieve the stored form data using the transaction ID
3. Create member application record in database with:
   - All form fields
   - Payment method: "online"
   - Transaction ID from SSLCommerz
   - Payment status: "completed"
   - Application status: "pending_approval"
4. Store SSLCommerz transaction details for record keeping
5. Return success response

**SSLCommerz Validation:**
- Use SSLCommerz validation API to verify payment
- Required validation parameters:
  - `val_id`: Validation ID from callback
  - `store_id`: Your SSLCommerz store ID
  - `store_passwd`: Your SSLCommerz store password

---

## 3. Submit Application (Bank Transfer/Deposit)

**Endpoint:** `POST /api/v1/members/apply`

**Description:** Directly submits member application for bank transfer or bank deposit payment methods (with file upload).

**Request Headers:**
```
Content-Type: multipart/form-data
Authorization: Bearer <token> (optional)
```

**Request Body (FormData):**
```
type: "lifetime" | "donor"
amount: 100000
name: "আহমেদ"
fatherName: "করিম"
gender: "male" | "female"
mobile: "01712345678"
isOverseas: false
email: "ahmed@example.com"  // optional, required if isOverseas is true
district: "ব্যবসায়ী"  // Actually occupation field
reference: "রেফারেন্স"  // optional
address: "ঢাকা, বাংলাদেশ"
paymentMethod: "bank_transfer" | "bank_deposit"
transactionId: "TRX123456"  // optional, required for bank_transfer
paymentDocument: <File>  // required for bank_transfer and bank_deposit (PDF or Image)
```

**File Requirements:**
- Field name: `paymentDocument`
- Accepted types: PDF, JPG, JPEG, PNG
- Max file size: 5MB (configurable)

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "member_application_id",
    "type": "lifetime",
    "status": "pending_approval",
    "paymentMethod": "bank_transfer"
  },
  "message": "Application submitted successfully"
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Validation error or file upload error"
}
```

**Backend Implementation Notes:**
1. Validate all required fields
2. Validate file type and size
3. Upload file to storage (local filesystem, S3, or cloud storage)
4. Store file path/URL in database
5. Create member application record with:
   - All form fields
   - Payment method: "bank_transfer" or "bank_deposit"
   - Transaction ID (if provided for bank_transfer)
   - Payment document file path
   - Payment status: "pending_verification"
   - Application status: "pending_approval"
6. Return success response with application ID

---

## Database Schema Suggestions

### Member Application Table
```sql
CREATE TABLE member_applications (
  id VARCHAR(36) PRIMARY KEY,
  type ENUM('lifetime', 'donor') NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  name VARCHAR(255) NOT NULL,
  father_name VARCHAR(255) NOT NULL,
  gender ENUM('male', 'female') NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  is_overseas BOOLEAN DEFAULT FALSE,
  email VARCHAR(255),
  occupation VARCHAR(255) NOT NULL,  -- stored as 'district' in form
  reference VARCHAR(255),
  address TEXT NOT NULL,
  payment_method ENUM('online', 'bank_transfer', 'bank_deposit') NOT NULL,
  transaction_id VARCHAR(255),  -- SSLCommerz transaction ID or bank transaction ID
  payment_document_url VARCHAR(500),  -- File path/URL for bank transfers/deposits
  payment_status ENUM('pending', 'completed', 'pending_verification', 'failed') DEFAULT 'pending',
  application_status ENUM('pending_approval', 'approved', 'rejected') DEFAULT 'pending_approval',
  sslcommerz_val_id VARCHAR(255),  -- SSLCommerz validation ID
  sslcommerz_data JSON,  -- Store additional SSLCommerz response data
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_transaction_id (transaction_id),
  INDEX idx_payment_status (payment_status),
  INDEX idx_application_status (application_status),
  INDEX idx_created_at (created_at)
);
```

---

## Validation Rules

### For All Payment Methods:
- `type`: Required, must be "lifetime" or "donor"
- `amount`: Required, minimum 100000 for lifetime, 50000 for donor
- `name`: Required, non-empty string
- `fatherName`: Required, non-empty string
- `gender`: Required, must be "male" or "female"
- `mobile`: Required, valid Bangladeshi mobile number format
- `district`: Required (actually occupation field)
- `address`: Required, non-empty string

### For Overseas Members:
- `email`: Required if `isOverseas` is true

### For Bank Transfer:
- `transactionId`: Required
- `paymentDocument`: Required (PDF or Image, max 5MB)

### For Bank Deposit:
- `paymentDocument`: Required (PDF or Image, max 5MB)

---

## Error Handling

All endpoints should return appropriate HTTP status codes:
- `200`: Success
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (if authentication required)
- `500`: Internal Server Error

Error response format:
```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": {
    // Optional: Field-specific errors for validation
    "fieldName": "Error message for this field"
  }
}
```

---

## Testing

### Test Cases:

1. **Online Payment Flow:**
   - Test successful payment initiation
   - Test payment success callback
   - Test payment failure callback
   - Test duplicate transaction handling

2. **Bank Transfer Flow:**
   - Test with valid transaction ID and file
   - Test without transaction ID (should fail)
   - Test without file (should fail)
   - Test with invalid file type (should fail)

3. **Bank Deposit Flow:**
   - Test with valid file
   - Test without file (should fail)
   - Test with invalid file type (should fail)

4. **Validation:**
   - Test all required fields
   - Test amount minimums
   - Test email requirement for overseas members
   - Test file size limits

---

## Security Considerations

1. **File Upload Security:**
   - Validate file types (whitelist only PDF, JPG, JPEG, PNG)
   - Validate file size (max 5MB)
   - Scan files for malware (optional but recommended)
   - Store files outside web root or use signed URLs
   - Rename uploaded files to prevent path traversal

2. **SSLCommerz Integration:**
   - Verify SSLCommerz callbacks using validation API
   - Never trust client-side payment status alone
   - Store SSLCommerz credentials securely (environment variables)
   - Use HTTPS for all callbacks

3. **Data Protection:**
   - Encrypt sensitive data (if required by regulations)
   - Implement rate limiting for API endpoints
   - Log all transactions for audit trail
   - Implement CSRF protection

---

## Environment Variables

```env
# SSLCommerz Configuration
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_store_password
SSLCOMMERZ_IS_LIVE=true  # or false for sandbox

# File Upload Configuration
MAX_FILE_SIZE=5242880  # 5MB in bytes
ALLOWED_FILE_TYPES=pdf,jpg,jpeg,png
UPLOAD_STORAGE_PATH=/uploads/member-applications  # or S3 bucket path

# Database
DATABASE_URL=your_database_url
```

---

## 4. Get Member Applications (List with Filters)

**Endpoint:** `GET /api/v1/members`

**Description:** Retrieves all member applications with pagination, search, and filters.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <token> (required for admin access)
```

**Query Parameters:**
- `page` (optional, number): Page number (default: 1)
- `limit` (optional, number): Items per page (default: 10)
- `status` (optional, string): Filter by application status - `pending_approval`, `approved`, `rejected`
- `paymentStatus` (optional, string): Filter by payment status - `pending`, `completed`, `pending_verification`, `failed`
- `type` (optional, string): Filter by member type - `lifetime`, `donor`
- `searchTerm` (optional, string): Search by name, email, mobile, or transaction ID

**Example Request:**
```
GET /api/v1/members?page=1&limit=10&status=approved&paymentStatus=completed&type=lifetime&searchTerm=Ahmed
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "member_application_id_1",
      "type": "lifetime",
      "amount": 100000,
      "name": "আহমেদ",
      "fatherName": "করিম",
      "gender": "male",
      "mobile": "01712345678",
      "isOverseas": false,
      "email": "ahmed@example.com",
      "district": "ব্যবসায়ী",
      "reference": "রেফারেন্স",
      "address": "ঢাকা, বাংলাদেশ",
      "paymentMethod": "online",
      "transactionId": "7f544326fb90457967604075e1f5018db83da538",
      "paymentDocument": null,
      "paymentStatus": "completed",
      "applicationStatus": "approved",
      "sslcommerzValId": "1906041125201",
      "sslcommerzData": {
        "bank_tran_id": "123456789",
        "card_type": "VISA",
        "store_amount": "100000",
        "currency": "BDT"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-16T14:20:00.000Z"
    },
    {
      "_id": "member_application_id_2",
      "type": "donor",
      "amount": 50000,
      "name": "ফাতিমা",
      "fatherName": "রহমান",
      "gender": "female",
      "mobile": "01987654321",
      "isOverseas": true,
      "email": "fatima@example.com",
      "district": "শিক্ষক",
      "reference": null,
      "address": "সিলেট, বাংলাদেশ",
      "paymentMethod": "bank_transfer",
      "transactionId": "TRX123456",
      "paymentDocument": "/uploads/member-applications/payment_123456.pdf",
      "paymentStatus": "pending_verification",
      "applicationStatus": "pending_approval",
      "sslcommerzValId": null,
      "sslcommerzData": null,
      "createdAt": "2024-01-16T08:15:00.000Z",
      "updatedAt": "2024-01-16T08:15:00.000Z"
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

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Unauthorized. Authentication required."
}
```

**Response (Error - 500):**
```json
{
  "success": false,
  "message": "Failed to fetch member applications"
}
```

**Backend Implementation Notes:**
1. **Authentication**: This endpoint should require admin authentication (Bearer token)
2. **Pagination**: Implement pagination using `page` and `limit` parameters
3. **Filtering**:
   - Filter by `applicationStatus` if provided (pending_approval, approved, rejected)
   - Filter by `paymentStatus` if provided (pending, completed, pending_verification, failed)
   - Filter by `type` if provided (lifetime, donor)
4. **Search**: Search across multiple fields:
   - Name (case-insensitive partial match)
   - Email (case-insensitive partial match)
   - Mobile (exact or partial match)
   - Transaction ID (exact or partial match)
5. **Sorting**: Default sort by `createdAt` descending (newest first)
6. **Response Format**:
   - Return array of member applications in `data` field
   - Include pagination metadata in `pagination` field
   - Calculate total pages: `totalPages = Math.ceil(totalItems / itemsPerPage)`

**SQL Query Example (PostgreSQL):**
```sql
SELECT * FROM member_applications
WHERE 
  ($1::text IS NULL OR application_status = $1::text) -- status filter
  AND ($2::text IS NULL OR payment_status = $2::text) -- paymentStatus filter
  AND ($3::text IS NULL OR type = $3::text) -- type filter
  AND (
    $4::text IS NULL OR -- searchTerm filter
    name ILIKE '%' || $4 || '%' OR
    email ILIKE '%' || $4 || '%' OR
    mobile LIKE '%' || $4 || '%' OR
    transaction_id LIKE '%' || $4 || '%'
  )
ORDER BY created_at DESC
LIMIT $5 -- limit
OFFSET $6; -- (page - 1) * limit
```

**MongoDB Query Example:**
```javascript
const query = {};

// Apply filters
if (status) query.applicationStatus = status;
if (paymentStatus) query.paymentStatus = paymentStatus;
if (type) query.type = type;

// Apply search
if (searchTerm) {
  query.$or = [
    { name: { $regex: searchTerm, $options: 'i' } },
    { email: { $regex: searchTerm, $options: 'i' } },
    { mobile: { $regex: searchTerm, $options: 'i' } },
    { transactionId: { $regex: searchTerm, $options: 'i' } }
  ];
}

const skip = (page - 1) * limit;
const applications = await MemberApplication.find(query)
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);

const totalItems = await MemberApplication.countDocuments(query);
const totalPages = Math.ceil(totalItems / limit);
```

---

## 5. Get Single Member Application

**Endpoint:** `GET /api/v1/members/:id`

**Description:** Retrieves a single member application by ID.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <token> (required)
```

**URL Parameters:**
- `id` (required, string): Member application ID

**Example Request:**
```
GET /api/v1/members/507f1f77bcf86cd799439011
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "type": "lifetime",
    "amount": 100000,
    "name": "আহমেদ",
    "fatherName": "করিম",
    "gender": "male",
    "mobile": "01712345678",
    "isOverseas": false,
    "email": "ahmed@example.com",
    "district": "ব্যবসায়ী",
    "reference": "রেফারেন্স",
    "address": "ঢাকা, বাংলাদেশ",
    "paymentMethod": "online",
    "transactionId": "7f544326fb90457967604075e1f5018db83da538",
    "paymentDocument": null,
    "paymentStatus": "completed",
    "applicationStatus": "approved",
    "sslcommerzValId": "1906041125201",
    "sslcommerzData": {
      "bank_tran_id": "123456789",
      "card_type": "VISA",
      "store_amount": "100000",
      "currency": "BDT"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-16T14:20:00.000Z"
  }
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "Member application not found"
}
```

**Backend Implementation Notes:**
1. Validate the ID format
2. Find the application by ID
3. Return 404 if not found
4. Return full application data if found

---

## 6. Update Member Application Status

**Endpoint:** `PATCH /api/v1/members/:id/status`

**Description:** Updates the application status of a member application.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <token> (required)
```

**URL Parameters:**
- `id` (required, string): Member application ID

**Request Body:**
```json
{
  "status": "approved"  // or "pending_approval" or "rejected"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "applicationStatus": "approved",
    "updatedAt": "2024-01-16T14:30:00.000Z"
    // ... other fields
  },
  "message": "Application status updated successfully"
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "Member application not found"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Invalid status. Must be one of: pending_approval, approved, rejected"
}
```

**Backend Implementation Notes:**
1. Validate the status value (must be: `pending_approval`, `approved`, or `rejected`)
2. Find the application by ID
3. Update the `applicationStatus` field
4. Update the `updatedAt` timestamp
5. Optionally, send notification to the applicant when status changes
6. Return the updated application data

**SQL Update Example:**
```sql
UPDATE member_applications
SET 
  application_status = $1,
  updated_at = CURRENT_TIMESTAMP
WHERE id = $2
RETURNING *;
```

**MongoDB Update Example:**
```javascript
const updatedApplication = await MemberApplication.findByIdAndUpdate(
  id,
  {
    applicationStatus: status,
    updatedAt: new Date()
  },
  { new: true }
);
```

---

## 7. Delete Member Application

**Endpoint:** `DELETE /api/v1/members/:id`

**Description:** Deletes a member application by ID.

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <token> (required)
```

**URL Parameters:**
- `id` (required, string): Member application ID

**Example Request:**
```
DELETE /api/v1/members/507f1f77bcf86cd799439011
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Member application deleted successfully"
}
```

**Response (Error - 404):**
```json
{
  "success": false,
  "message": "Member application not found"
}
```

**Response (Error - 403):**
```json
{
  "success": false,
  "message": "Cannot delete approved applications. Please reject instead."
}
```

**Backend Implementation Notes:**
1. **Validation**: 
   - Check if application exists
   - Optionally, prevent deletion of approved applications (recommended to reject instead)
2. **File Cleanup**: 
   - If `paymentDocument` exists, delete the file from storage
   - Clean up any associated files or records
3. **Database Deletion**: 
   - Delete the application record from database
   - Optionally, log the deletion for audit trail
4. **Soft Delete (Alternative)**: 
   - Instead of hard delete, you might want to implement soft delete:
   - Add `deletedAt` timestamp field
   - Set `deletedAt` instead of actually deleting
   - Filter out soft-deleted records in GET requests

**SQL Delete Example:**
```sql
-- Hard delete
DELETE FROM member_applications WHERE id = $1;

-- Soft delete (recommended)
UPDATE member_applications
SET deleted_at = CURRENT_TIMESTAMP
WHERE id = $1;
```

**MongoDB Delete Example:**
```javascript
// Hard delete
const result = await MemberApplication.findByIdAndDelete(id);

// Soft delete (recommended)
const result = await MemberApplication.findByIdAndUpdate(
  id,
  { deletedAt: new Date() },
  { new: true }
);
```

**File Cleanup Example (Node.js):**
```javascript
// Before deleting application, delete associated files
if (application.paymentDocument) {
  const filePath = path.join(uploadPath, application.paymentDocument);
  try {
    await fs.unlink(filePath); // Delete file from filesystem
  } catch (error) {
    console.error('Error deleting file:', error);
    // Continue with application deletion even if file deletion fails
  }
}

// Delete from S3 (if using AWS S3)
if (application.paymentDocument) {
  try {
    await s3.deleteObject({
      Bucket: bucketName,
      Key: application.paymentDocument
    }).promise();
  } catch (error) {
    console.error('Error deleting file from S3:', error);
  }
}
```

---

## Additional Notes

1. The frontend expects the backend to handle payment verification and data persistence
2. For online payments, the backend should store form data temporarily until payment is confirmed
3. Consider implementing a cleanup job to remove unprocessed payment sessions after a certain period (e.g., 24 hours)
4. Implement notification system (email/SMS) to notify admins when new applications are submitted
5. Consider implementing admin dashboard endpoints to view and manage applications
6. **Soft Delete**: Consider implementing soft delete instead of hard delete for audit purposes
7. **File Management**: Ensure proper file cleanup when deleting applications with payment documents
8. **Permissions**: All GET/DELETE/UPDATE endpoints should require admin authentication
9. **Rate Limiting**: Consider implementing rate limiting for API endpoints
10. **Caching**: For GET endpoints, consider implementing caching for better performance

---

## Example SSLCommerz Integration (Node.js/PHP Reference)

### PHP Example (for reference):
```php
// Initiate Payment
$post_data = array(
    'store_id' => 'your_store_id',
    'store_passwd' => 'your_store_password',
    'total_amount' => $amount,
    'currency' => 'BDT',
    'tran_id' => uniqid(),
    'success_url' => $successUrl,
    'fail_url' => $failUrl,
    'cancel_url' => $cancelUrl,
    'cus_name' => $name,
    'cus_email' => $email,
    'cus_phone' => $mobile,
    'cus_add1' => $address,
    'product_category' => 'member_application',
    'product_name' => $type === 'lifetime' ? 'Lifetime Member' : 'Donor Member',
    'product_profile' => 'general'
);

$response = file_get_contents('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', false, stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/x-www-form-urlencoded',
        'content' => http_build_query($post_data)
    ]
]));

$response = json_decode($response, true);
$gatewayUrl = $response['GatewayPageURL'];
```

### Validation Example:
```php
// Validate Payment
$validation_data = array(
    'val_id' => $valId,
    'store_id' => 'your_store_id',
    'store_passwd' => 'your_store_password'
);

$validation_response = file_get_contents('https://sandbox.sslcommerz.com/gwprocess/v4/validationserverAPI.php', false, stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/x-www-form-urlencoded',
        'content' => http_build_query($validation_data)
    ]
]));

$validation_result = json_decode($validation_response, true);
```

---

## Support

For questions or clarifications, please contact the frontend development team or refer to SSLCommerz official documentation.


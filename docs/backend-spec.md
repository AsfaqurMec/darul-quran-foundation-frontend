# Dashboard Backend API Specification

This document outlines the endpoints, payloads, and data models required by the dashboard UI for managing activities, blogs, notices, and gallery items. Provide these routes in the backend so the frontend Redux flows can call them directly.

---

## Conventions

- **Base URL**: `${config.api.baseUrl}` (defaults to `http://localhost:5000/api/v1`).
- **Authentication**: All routes require a valid bearer token. Expect `Authorization: Bearer <token>`.
- **Content Type**: Accept and return JSON (`application/json`). For file uploads, accept multipart form when noted.
- **Response Envelope**: Use `{ success: boolean, message?: string, data?: T }` consistently.
- **IDs**: Use string IDs (UUID / Mongo ObjectId). All resources expose `id` in responses.
- **Pagination**: When returning large collections, support `?page&limit` (optional). Frontend currently fetches full lists, but pagination support is recommended.

---

## Activities

### Data Model

```json
{
  "id": "act_123",
  "title": "string",
  "tag": "string",
  "description": "string",
  "image": "string",        // URL
  "thumbnail": "string",   // URL
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

### Endpoints

| Method | Path                     | Description             |
| ------ | ------------------------ | ----------------------- |
| GET    | `/activities`            | List all activities     |
| GET    | `/activities/:id`        | Get single activity     |
| POST   | `/activities`            | Create new activity     |
| PUT    | `/activities/:id`        | Update existing         |
| DELETE | `/activities/:id`        | Delete activity         |

### Create / Update Payload

```json
{
  "title": "string",
  "tag": "string",
  "description": "string",
  "image": "string",      // URL returned by media service
  "thumbnail": "string"   // URL
}
```

Return the created/updated record in `data`.

---

## Blogs

### Data Model

```
{
  "id": "blog_123",
  "title": "string",
  "excerpt": "string",
  "date": "YYYY-MM-DD",
  "thumbnail": "string",
  "readTime": "string",      // e.g. "5 min"
  "images": ["string"],      // additional images
  "fullContent": "string",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

### Create / Update Payload

```
{
  "title": "string",
  "excerpt": "string",
  "date": "YYYY-MM-DD",
  "thumbnail": "string",
  "readTime": "string",
  "images": ["string"],
  "fullContent": "string"
}
```

---

## Notices

### Data Model

```
{
  "id": "notice_123",
  "title": "string",
  "subTitle": "string",
  "date": "YYYY-MM-DD",
  "category": "string",
  "fullContent": "string",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

### Create / Update Payload

```
{
  "title": "string",
  "subTitle": "string",
  "date": "YYYY-MM-DD",
  "category": "string",
  "fullContent": "string"
}
```

---

## Gallery Items

### Data Model

```
{
  "id": "gallery_123",
  "title": "string",
  "media": "string",        // URL to image/video
  "category": "string",
  "type": "image" | "video",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

### Create / Update Payload

```
{
  "title": "string",
  "media": "string",
  "category": "string",
  "type": "image" | "video"
}
```

- `category` should be one of: `Flood`, `Food Distribution`, `Self Reliance`, `Qurbani`, `Winter Relief`.
- When `type` is `image`, expect the client to upload a file via `multipart/form-data`; when `type` is `video`, the client will send a URL string.

---

## Common Error Format

When a request fails, return a non-2xx status and a payload like:

```json
{
  "success": false,
  "message": "Human-readable error message"
}
```

Frontend shows these messages directly in toasts.

---

## Optional Enhancements

- Add pagination to list endpoints via `?page=1&limit=10`. Return `{ data, pagination }` structure:

  ```json
  {
    "success": true,
    "data": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25,
      "itemsPerPage": 10
    }
  }
  ```

- Support search filters with query params (e.g., `?category=Education`).
- Audit fields (`createdBy`, `updatedBy`) if you need to track authorship.

---

Provide these routes so the dashboard pages can perform CRUD operations through the axios client.

- For create/update, when sending image fields (`thumbnail`, `images`, gallery `media` when `type=image`, activity `image`/`thumbnail`) the frontend submits `multipart/form-data` with the files attached.

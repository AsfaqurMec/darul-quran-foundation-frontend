# Origin Middleware Fix Guide

## Problem
Your backend `originMiddleware` is blocking API requests because it's checking the `Origin` header, which contains the **frontend's origin** (where the page is loaded from), not the API's origin.

## Current Backend Middleware Issue

Your middleware currently allows:
- `https://api.darulquranfoundation.org` ❌ (This is the API itself, not the frontend)
- `http://localhost:3000` ✅ (Frontend local)
- `https://localhost:3000` ✅ (Frontend local HTTPS)

## The Fix

You need to update your backend middleware to include the **actual frontend production URL**. Here's the corrected middleware:

```typescript
export const originMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const allowedOrigins = [
    // Frontend origins (where the browser page is loaded from)
    'http://localhost:3000',
    'https://localhost:3000',
    'https://darulquranfoundation.org', // Add your production frontend URL
    'https://www.darulquranfoundation.org', // Add if you use www subdomain
    // API origins (if you need to allow direct API access)
    'https://api.darulquranfoundation.org',
  ];

  // Get origin from Origin header or extract from Referer header
  let origin: string | null = req.headers.origin || null;
  
  if (!origin && req.headers.referer) {
    try {
      origin = new URL(req.headers.referer).origin;
    } catch {
      // Invalid referer URL, ignore
    }
  }

  // If no origin is present, reject the request
  if (!origin) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      'Origin header is required'
    );
  }

  // Check if origin is in allowed list
  if (!allowedOrigins.includes(origin)) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      `Access denied: Origin not allowed. Received: ${origin}`
    );
  }

  next();
};
```

## Alternative: Environment-Based Configuration

For better flexibility, use environment variables:

```typescript
export const originMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get allowed origins from environment or use defaults
  const allowedOrigins = [
    'http://localhost:3000',
    'https://localhost:3000',
    ...(process.env.ALLOWED_ORIGINS?.split(',') || []),
    'https://api.darulquranfoundation.org',
  ];

  let origin: string | null = req.headers.origin || null;
  
  if (!origin && req.headers.referer) {
    try {
      origin = new URL(req.headers.referer).origin;
    } catch {
      // Invalid referer URL, ignore
    }
  }

  if (!origin) {
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      'Origin header is required'
    );
  }

  if (!allowedOrigins.includes(origin)) {
    console.error(`Blocked origin: ${origin}. Allowed: ${allowedOrigins.join(', ')}`);
    throw new ApiError(
      HTTP_STATUS.FORBIDDEN,
      `Access denied: Origin not allowed. Received: ${origin}`
    );
  }

  next();
};
```

Then in your `.env` file:
```
ALLOWED_ORIGINS=https://darulquranfoundation.org,https://www.darulquranfoundation.org
```

## How to Find Your Frontend Origin

1. **Check your browser's Network tab** when making a request
2. Look at the `Origin` header in the request
3. That's the value you need to add to `allowedOrigins`

## Testing

After updating the backend:
1. Check browser console for any 403 errors
2. Verify the `Origin` header in Network tab matches an allowed origin
3. The frontend should now receive data successfully

## Server-Side Requests (Next.js)

**Important:** If you're using Next.js Server Components (like `app/programs/page.tsx`), the requests are made from the server, not the browser. The frontend code has been updated to automatically add the `Origin` and `Referer` headers for server-side requests using the `NEXT_PUBLIC_APP_URL` environment variable.

Make sure your `.env` file includes:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000  # For development
# or
NEXT_PUBLIC_APP_URL=https://darulquranfoundation.org  # For production
```

The backend middleware should allow this origin in the `allowedOrigins` array.

## Note

The frontend code has been updated to:
1. Better handle and log 403 errors with detailed debugging information
2. Automatically add Origin/Referer headers for server-side requests
3. Provide clearer error messages in the console if the origin is still blocked


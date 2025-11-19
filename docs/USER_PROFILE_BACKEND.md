# User Profile, Donations, and Password Flows - Backend API Spec

This document defines the backend endpoints, data models, and middleware needed to support:
- User profile page (fetch current user info)
- User donations list (tabular history)
- Change password
- Forgot/reset password

It matches the current frontend integration (authorization header format and routes).

---

## Tech assumptions
- Any Node.js backend (Express.js examples below).
- JWT auth using a shared `JWT_SECRET`.
- A database (MongoDB, Postgres, etc.). Examples assume Mongoose-like models.
- Email sender configured for sending password reset links.

---

## Auth model
- Frontend sends token in `Authorization` header as a raw token (no Bearer prefix) to match current FE.
  - If you prefer `Bearer <token>`, switch FE headers accordingly.
- JWT payload should include at least: `{ sub: string, role?: string, iat, exp }`
  - `sub` is the user id.

---

## Data models

### User
Fields you should have:
```ts
type User = {
  _id: string;
  fullName: string;
  email: string;           // unique
  phone: string;
  role: string;            // 'user' | 'admin' | ...
  companyName?: string;
  fullAddress?: string;
  images: string[];
  passwordHash: string;
  totalDonate?: number;    // optionally denormalized
  createdAt: string;
  updatedAt: string;
};
```

### Donation
```ts
type Donation = {
  _id: string;
  userId: string;            // refs User._id
  amount: number;
  method?: string;           // 'bkash' | 'card' | 'cash' | ...
  reference?: string;
  status?: 'SUCCESS' | 'PENDING' | 'FAILED';
  createdAt: string;
  updatedAt: string;
};
```

---

## Endpoints
Base prefix: `/api/v1`

### Auth
- POST `/auth/login`
  - Body: `{ identifier: string, password: string }` (identifier = email or phone)
  - Response: `{ success, message, data: { accessToken } }`

- POST `/auth/change-password` [auth required]
  - Body: `{ currentPassword: string, newPassword: string }`
  - Response: `{ success, message }`

- POST `/auth/forgot-password`
  - Body: `{ email: string }`
  - Response: `{ success, message }` (do not reveal whether user exists)

- POST `/auth/reset-password`
  - Body: `{ token: string, newPassword: string }`
  - Response: `{ success, message }`

### Users
- GET `/users/me` [auth required]
  - Response: `{ success, data: UserPublic }` (exclude `passwordHash`)

### Donations
- GET `/donations/my` [auth required]
  - Response: `{ success, data: Donation[] }` (sorted by `createdAt` desc)

---

## Auth middleware (Express)
```ts
import jwt from 'jsonwebtoken';

export function authGuard(req, res, next) {
  const token = req.headers.authorization; // FE sends raw token
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub, role: payload.role };
    return next();
  } catch {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}
```

If you want standard Bearer tokens:
```ts
const header = req.headers.authorization || '';
const token = header.startsWith('Bearer ') ? header.slice(7) : null;
```
Update FE to send `Authorization: Bearer <token>`.

---

## Controllers (Express)

### Auth
```ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from './models/User';

export async function login(req, res) {
  const { identifier, password } = req.body;
  const user = await UserModel.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
  if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ success: false, message: 'Invalid credentials' });

  const accessToken = jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return res.json({ success: true, message: 'Login successful', data: { accessToken } });
}

export async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const user = await UserModel.findById(req.user.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  const ok = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!ok) return res.status(400).json({ success: false, message: 'Current password incorrect' });

  user.passwordHash = await bcrypt.hash(newPassword, 10);
  await user.save();
  return res.json({ success: true, message: 'Password changed' });
}

// Minimal placeholder: integrate with your email provider
export async function forgotPassword(req, res) {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    const token = jwt.sign({ sub: user._id.toString(), kind: 'reset' }, process.env.JWT_SECRET, { expiresIn: '15m' });
    // sendEmail(user.email, `${process.env.APP_URL}/reset-password?token=${token}`);
  }
  return res.json({ success: true, message: 'If an account exists, a reset link was sent' });
}

export async function resetPassword(req, res) {
  const { token, newPassword } = req.body;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.kind !== 'reset') throw new Error('Invalid reset token');
    const user = await UserModel.findById(payload.sub);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    return res.json({ success: true, message: 'Password reset successful' });
  } catch {
    return res.status(400).json({ success: false, message: 'Invalid or expired token' });
  }
}
```

### Users
```ts
import { UserModel } from './models/User';

export async function getMe(req, res) {
  const user = await UserModel.findById(req.user.id).select('-passwordHash');
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  return res.json({ success: true, data: user });
}
```

### Donations
```ts
import { DonationModel } from './models/Donation';

export async function getMyDonations(req, res) {
  const list = await DonationModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
  return res.json({ success: true, data: list });
}
```

---

## Routes (Express)
```ts
import { Router } from 'express';
import { authGuard } from './middlewares/authGuard';
import { login, changePassword, forgotPassword, resetPassword } from './controllers/auth';
import { getMe } from './controllers/users';
import { getMyDonations } from './controllers/donations';

const router = Router();

// Auth
router.post('/auth/login', login);
router.post('/auth/forgot-password', forgotPassword);
router.post('/auth/reset-password', resetPassword);
router.post('/auth/change-password', authGuard, changePassword);

// Users
router.get('/users/me', authGuard, getMe);

// Donations
router.get('/donations/my', authGuard, getMyDonations);

export default router;
```

---

## Environment variables
```
JWT_SECRET=your_jwt_secret
APP_URL=https://your-frontend.app
DATABASE_URL=...
EMAIL_SERVICE=...
EMAIL_FROM=...
```

---

## Notes and options
- If you prefer Bearer tokens, update FE to send `Authorization: Bearer <token>` and adjust the middleware parsing.
- Consider adding refresh tokens if needed for long sessions.
- Consider rate-limiting forgot/reset endpoints.
- Optionally compute `totalDonate` as an aggregate from `Donation` or denormalize into `User` after every successful donation.



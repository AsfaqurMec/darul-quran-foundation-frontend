import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { z } from 'zod';

const bodySchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }

  const { username, password } = parsed.data;
  const expectedUser = process.env.AUTH_USER || 'admin';
  const expectedPass = process.env.AUTH_PASS || 'admin123';

  if (username !== expectedUser || password !== expectedPass) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-me');
  const token = await new SignJWT({ sub: username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secret);

  const res = NextResponse.json({ ok: true });
  res.cookies.set('dq_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  return res;
}



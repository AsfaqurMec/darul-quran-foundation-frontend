'use client';

import { useState, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { z } from 'zod';
import Button from '@/components/ui/Button';

const schema = z.object({
  email: z.string().min(1, 'Email or mobile is required'),
});

export default function LoginForm(): JSX.Element {
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get('next') || '/dashboard';
  const [form, setForm] = useState({ email: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.errors[0]?.message ?? 'Invalid input');
      return;
    }
    setLoading(true);
    try {
      // For now, just proceed to next step
      // In production, you would validate the email/mobile here
      router.push(next);
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand mb-2">
          আপনার অ্যাকাউন্টে লগইন করুন।
        </h1>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      {/* Email/Mobile Input */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          মোবাইল/ইমেইল <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="text"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="মোবাইল নম্বর / ইমেইল লিখুন"
          autoComplete="email"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-gray-700 placeholder-gray-400"
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        variant="primary"
        className="w-full py-3 text-lg font-semibold flex items-center justify-center gap-2"
      >
        {loading ? 'লোড হচ্ছে...' : (
          <>
            পরবর্তী ধাপ
            <span className="text-xl">→</span>
          </>
        )}
      </Button>
    </form>
  );
}



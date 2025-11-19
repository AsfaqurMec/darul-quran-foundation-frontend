'use client';

import React, { useState } from 'react';
import Container from '@/components/layout/Container';
import { api } from '@/config';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function ResetPasswordPage(): JSX.Element {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get('token') || '';

	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage(null);
		setError(null);

		if (!token) {
			setError('Invalid or missing reset token.');
			return;
		}
		if (!newPassword || !confirmPassword) {
			setError('Please fill in all fields.');
			return;
		}
		if (newPassword !== confirmPassword) {
			setError('New password and confirmation do not match.');
			return;
		}

		setLoading(true);
		try {
			const res = await fetch(`${api.baseUrl}/auth/reset-password`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token, newPassword }),
			});
			const data = await res.json().catch(() => ({}));
			if (!res.ok || data?.success === false) {
				throw new Error(data?.message || 'Failed to reset password');
			}
			setMessage('Password reset successful. Redirecting to login...');
			setTimeout(() => {
				router.push('/login');
				router.refresh();
			}, 900);
		} catch (err: any) {
			setError(err?.message || 'Failed to reset password');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="py-10">
			<Container>
				<h1 className="text-2xl font-semibold mb-6">Reset Password</h1>
				<form onSubmit={onSubmit} className="max-w-lg rounded-xl border border-gray-200 bg-white p-6 space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">New Password</label>
						<div className="relative">
							<input
								type={showNew ? 'text' : 'password'}
								className="w-full rounded-md border border-gray-300 px-3 py-2 pr-12"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
							/>
							<button
								type="button"
								onClick={() => setShowNew((v) => !v)}
								className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800"
								aria-label={showNew ? 'Hide password' : 'Show password'}
							>
								{showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
							</button>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Confirm New Password</label>
						<div className="relative">
							<input
								type={showConfirm ? 'text' : 'password'}
								className="w-full rounded-md border border-gray-300 px-3 py-2 pr-12"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							<button
								type="button"
								onClick={() => setShowConfirm((v) => !v)}
								className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800"
								aria-label={showConfirm ? 'Hide password' : 'Show password'}
							>
								{showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
							</button>
						</div>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="rounded-lg bg-brand hover:bg-brand-dark text-white px-4 py-2 font-semibold transition-all"
					>
						{loading ? 'Resetting...' : 'Reset Password'}
					</button>
					{message && <p className="text-green-700 text-sm">{message}</p>}
					{error && <p className="text-red-600 text-sm">{error}</p>}
				</form>
			</Container>
		</div>
	);
}



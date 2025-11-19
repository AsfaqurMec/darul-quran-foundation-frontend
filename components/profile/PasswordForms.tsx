import React, { useState } from 'react';
import { ChangePassword } from '@/services/ChangePassword';
import { app } from '@/config';
import { getClientToken, removeClientToken } from '@/lib/tokenUtils';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

type Mode = 'change' | 'forgot';

export default function PasswordForms({ mode }: { mode: Mode }): JSX.Element {
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [form, setForm] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
		email: '',
	});
	const router = useRouter();
	const [showCurrent, setShowCurrent] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
	};

	const submitChangePassword = async () => {
		setLoading(true);
		setMessage(null);
		setError(null);
		try {
			if (form.newPassword !== form.confirmPassword) {
				setError('New password and confirmation do not match.');
				return;
			}
			const res = await ChangePassword({
				currentPassword: form.currentPassword,
				newPassword: form.newPassword,
			});
			if ((res as any)?.error) {
				setError((res as any).error);
			} else {
				setMessage('Password updated successfully. You will be logged out.');
				try {
					await fetch('/api/logout', { method: 'POST' });
				} catch {}
				removeClientToken();
				try {
					window.dispatchEvent(new CustomEvent('auth-change'));
				} catch {}
				setTimeout(() => {
					router.push('/login');
					router.refresh();
				}, 700);
			}
		} catch {
			setError('Failed to update password.');
		} finally {
			setLoading(false);
		}
	};

	const submitForgot = async () => {
		setLoading(true);
		setMessage(null);
		setError(null);
		try {
			const token = getClientToken();
			const appUrl =
				typeof window !== 'undefined'
					? (process.env.NEXT_PUBLIC_APP_URL || window.location.origin)
					: process.env.NEXT_PUBLIC_APP_URL;
			await fetch(`${app.url}/auth/forgot-password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...(token ? { Authorization: token } : {}),
				},
				body: JSON.stringify({
					email: form.email,
					callbackUrl: `${appUrl}/reset-password`,
				}),
			});
			setMessage('If an account exists, a reset link has been sent to your email.');
		} catch {
			setError('Failed to request password reset.');
		} finally {
			setLoading(false);
		}
	};

	if (mode === 'change') {
		return (
			<div className="max-w-lg rounded-xl border border-gray-200 bg-white p-6">
				<h2 className="text-lg font-semibold mb-4">Update Password</h2>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Current Password</label>
						<div className="relative">
							<input
								name="currentPassword"
								type={showCurrent ? 'text' : 'password'}
								className="w-full rounded-md border border-gray-300 px-3 py-2 pr-12"
								value={form.currentPassword}
								onChange={onChange}
							/>
							<button
								type="button"
								onClick={() => setShowCurrent((v) => !v)}
								className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800"
								aria-label={showCurrent ? 'Hide password' : 'Show password'}
							>
								{showCurrent ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
							</button>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">New Password</label>
						<div className="relative">
							<input
								name="newPassword"
								type={showNew ? 'text' : 'password'}
								className="w-full rounded-md border border-gray-300 px-3 py-2 pr-12"
								value={form.newPassword}
								onChange={onChange}
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
								name="confirmPassword"
								type={showConfirm ? 'text' : 'password'}
								className="w-full rounded-md border border-gray-300 px-3 py-2 pr-12"
								value={form.confirmPassword}
								onChange={onChange}
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
						disabled={loading}
						onClick={submitChangePassword}
						className="rounded-lg bg-brand hover:bg-brand-dark text-white px-4 py-2 font-semibold transition-all"
					>
						{loading ? 'Updating...' : 'Update Password'}
					</button>
					{message && <p className="text-green-700 text-sm">{message}</p>}
					{error && <p className="text-red-600 text-sm">{error}</p>}
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-lg rounded-xl border border-gray-200 bg-white p-6">
			<h2 className="text-lg font-semibold mb-4">Forgot Password</h2>
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1">Email</label>
					<input
						name="email"
						type="email"
						className="w-full rounded-md border border-gray-300 px-3 py-2"
						value={form.email}
						onChange={onChange}
					/>
				</div>
				<button
					disabled={loading || !form.email}
					onClick={submitForgot}
					className="rounded-lg bg-brand hover:bg-brand-dark text-white px-4 py-2 font-semibold transition-all"
				>
					{loading ? 'Submitting...' : 'Send Reset Link'}
				</button>
				{message && <p className="text-green-700 text-sm">{message}</p>}
				{error && <p className="text-red-600 text-sm">{error}</p>}
			</div>
		</div>
	);
}



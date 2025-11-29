'use client';

import React, { useState } from 'react';
import Container from '../../components/layout/Container';
import { app, api } from '../../config';

export default function ForgotPasswordPage(): JSX.Element {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage(null);
		setError(null);
		try {
			const appUrl = app.url;
           // console.log(appUrl);
			await fetch(`${api.baseUrl}/auth/forgot-password`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, callbackUrl: `${appUrl}/reset-password` }),
			});
			setMessage('If an account exists, a reset link has been sent to your email.');
		} catch {
			setError('Failed to request password reset.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="py-10">
			<Container>
				<h1 className="text-2xl font-semibold mb-6">Forgot Password</h1>
				<form onSubmit={onSubmit} className="max-w-lg rounded-xl border border-gray-200 bg-white p-6 space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Email</label>
						<input
							type="email"
							required
							className="w-full rounded-md border border-gray-300 px-3 py-2"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						disabled={loading || !email}
						className="rounded-lg bg-brand hover:bg-brand-dark text-white px-4 py-2 font-semibold transition-all"
					>
						{loading ? 'Submitting...' : 'Send Reset Link'}
					</button>
					{message && <p className="text-green-700 text-sm">{message}</p>}
					{error && <p className="text-red-600 text-sm">{error}</p>}
				</form>
			</Container>
		</div>
	);
}



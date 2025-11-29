'use client';

import React, { useState } from 'react';
import { ChangePassword } from '../../services/ChangePassword';
import { app } from '../../config';
import { getClientToken, removeClientToken } from '../../lib/tokenUtils';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useI18n } from '../../components/i18n/LanguageProvider';

type Mode = 'change' | 'forgot';

export default function PasswordForms({ mode }: { mode: Mode }): JSX.Element {
	const { t } = useI18n();
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
				setError(t('passwordsDoNotMatch'));
				return;
			}
			const res = await ChangePassword({
				currentPassword: form.currentPassword,
				newPassword: form.newPassword,
			});
			if ((res as any)?.error) {
				setError((res as any).error);
			} else {
				setMessage(t('passwordUpdated'));
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
			setError(t('failedToUpdatePassword'));
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
			setMessage(t('resetLinkSent'));
		} catch {
			setError(t('failedToRequestPasswordReset'));
		} finally {
			setLoading(false);
		}
	};

	if (mode === 'change') {
		return (
			<div className="max-w-lg rounded-xl border border-gray-200 bg-white p-6">
				<h2 className="text-lg font-semibold mb-4">{t('updatePassword')}</h2>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">{t('currentPassword')}</label>
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
								aria-label={showCurrent ? t('hidePassword') : t('showPassword')}
							>
								{showCurrent ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
							</button>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">{t('newPassword')}</label>
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
								aria-label={showNew ? t('hidePassword') : t('showPassword')}
							>
								{showNew ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
							</button>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">{t('confirmNewPassword')}</label>
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
								aria-label={showConfirm ? t('hidePassword') : t('showPassword')}
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
						{loading ? t('updating') : t('updatePassword')}
					</button>
					{message && <p className="text-green-700 text-sm">{message}</p>}
					{error && <p className="text-red-600 text-sm">{error}</p>}
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-lg rounded-xl border border-gray-200 bg-white p-6">
			<h2 className="text-lg font-semibold mb-4">{t('forgotPassword')}</h2>
			<div className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1">{t('email')}</label>
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
					{loading ? t('submitting') : t('sendResetLink')}
				</button>
				{message && <p className="text-green-700 text-sm">{message}</p>}
				{error && <p className="text-red-600 text-sm">{error}</p>}
			</div>
		</div>
	);
}



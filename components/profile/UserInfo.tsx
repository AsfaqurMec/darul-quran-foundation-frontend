'use client';

import React from 'react';
import type { User } from '../../services/Users';
import { useI18n } from '../../components/i18n/LanguageProvider';
import type { UpdateUserRequest } from '../../services/Users';

interface UserInfoProps {
	user: User;
	formData: {
		fullName: string;
		email: string;
		phone: string;
		companyName?: string;
		fullAddress?: string;
	};
	onChange: (field: string, value: string) => void;
	loading?: boolean;
}

export default function UserInfo({ 
	user, 
	formData, 
	onChange, 
	loading = false 
}: UserInfoProps): React.ReactElement {
	const { t, lang } = useI18n();
	const locale = lang === 'bn' ? 'bn-BD' : lang === 'ar' ? 'ar-SA' : 'en-US';

	return (
		<div className="grid gap-6 md:grid-cols-2">
			<div className="rounded-xl border border-gray-200 bg-white p-6">
				<h2 className="text-lg font-semibold mb-4">{t('basicInformation')}</h2>
				<div className="space-y-4 text-sm">
					<div>
						<label className="block font-medium text-gray-600 mb-1">{t('fullName')}</label>
						<input
							type="text"
							value={formData.fullName}
							onChange={(e) => onChange('fullName', e.target.value)}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
							disabled={loading}
						/>
					</div>
					<div>
						<label className="block font-medium text-gray-600 mb-1">{t('email')}</label>
						<input
							type="email"
							value={formData.email}
							onChange={(e) => onChange('email', e.target.value)}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
							disabled={loading}
						/>
					</div>
					<div>
						<label className="block font-medium text-gray-600 mb-1">{t('phone')}</label>
						<input
							type="tel"
							value={formData.phone}
							onChange={(e) => onChange('phone', e.target.value)}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
							disabled={loading}
						/>
					</div>
					{user.role && (
						<div>
							<label className="block font-medium text-gray-600 mb-1">{t('role')}</label>
							<p className="text-gray-900">{user.role}</p>
						</div>
					)}
				</div>
			</div>
			<div className="rounded-xl border border-gray-200 bg-white p-6">
				<h2 className="text-lg font-semibold mb-4">{t('additional')}</h2>
				<div className="space-y-4 text-sm">
					{/* <div>
						<label className="block font-medium text-gray-600 mb-1">{t('company')}</label>
						<input
							type="text"
							value={formData.companyName || ''}
							onChange={(e) => onChange('companyName', e.target.value)}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
							disabled={loading}
						/>
					</div>
					<div>
						<label className="block font-medium text-gray-600 mb-1">{t('address')}</label>
						<textarea
							value={formData.fullAddress || ''}
							onChange={(e) => onChange('fullAddress', e.target.value)}
							className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand min-h-[80px]"
							disabled={loading}
						/>
					</div> */}
					{typeof user.totalDonate !== 'undefined' && (
						<div>
							<label className="block font-medium text-gray-600 mb-1">{t('totalDonated')}</label>
							<p className="text-gray-900">{user.totalDonate}</p>
						</div>
					)}
					<div>
						<label className="block font-medium text-gray-600 mb-1">{t('memberSince')}</label>
						<p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString(locale)}</p>
					</div>
				</div>
			</div>
		</div>
	);
}



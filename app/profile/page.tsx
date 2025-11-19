'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Container from '@/components/layout/Container';
import { getClientToken } from '@/lib/tokenUtils';
import { getCurrentUserProfile } from '@/services/Users/me';
import { getMyDonations } from '@/services/donations';
import type { User } from '@/services/Users';
import UserInfo from '@/components/profile/UserInfo';
import DonationsTable from '@/components/profile/DonationsTable';
import PasswordForms from '@/components/profile/PasswordForms';

type TabKey = 'info' | 'donations' | 'password';

export default function ProfilePage(): JSX.Element {
	const [active, setActive] = useState<TabKey>('info');
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [donations, setDonations] = useState<any[]>([]);
	const [donationsLoading, setDonationsLoading] = useState<boolean>(false);

	const isAuthed = useMemo(() => !!getClientToken(), []);

	useEffect(() => {
		let mounted = true;
		if (!isAuthed) {
			setLoading(false);
			setError('You need to login to view your profile.');
			return;
		}
		(async () => {
			try {
				const res = await getCurrentUserProfile();
				if (!mounted) return;
				if (res.success && res.data) {
					setUser(res.data);
				} else {
					setError(res.message || 'Failed to load profile.');
				}
			} catch (e) {
				setError('Failed to load profile.');
			} finally {
				if (mounted) setLoading(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, [isAuthed]);

	useEffect(() => {
		let mounted = true;
		if (active !== 'donations' || !isAuthed) return;
		setDonationsLoading(true);
		(async () => {
			try {
				const res = await getMyDonations();
				if (!mounted) return;
				if (res.success) {
					setDonations(res.data || []);
				}
			} finally {
				if (mounted) setDonationsLoading(false);
			}
		})();
		return () => {
			mounted = false;
		};
	}, [active, isAuthed]);

	return (
		<div className="py-10">
			<Container>
				<h1 className="text-2xl font-semibold mb-6">My Profile</h1>

				<div className="mb-6 overflow-x-auto">
					<div className="inline-flex rounded-lg border border-gray-200 bg-white">
						<button
							className={`px-4 py-2 text-sm rounded-l-lg ${active === 'info' ? 'bg-brand text-white' : 'hover:bg-gray-50'}`}
							onClick={() => setActive('info')}
						>
							Info
						</button>
						<button
							className={`px-4 py-2 text-sm ${active === 'donations' ? 'bg-brand text-white' : 'hover:bg-gray-50'}`}
							onClick={() => setActive('donations')}
						>
							Donations
						</button>
						<button
							className={`px-4 py-2 text-sm ${active === 'password' ? 'bg-brand text-white' : 'hover:bg-gray-50'}`}
							onClick={() => setActive('password')}
						>
							Update Password
						</button>
						
					</div>
				</div>

				{loading ? (
					<p>Loading...</p>
				) : error ? (
					<div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
				) : (
					<>
						{active === 'info' && user && <UserInfo user={user} />}
						{active === 'donations' && (
							<DonationsTable loading={donationsLoading} donations={donations} />
						)}
						{active === 'password' && <PasswordForms mode="change" />}
					</>
				)}
			</Container>
		</div>
	);
}



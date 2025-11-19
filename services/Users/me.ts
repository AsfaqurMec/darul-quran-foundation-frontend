import { api } from '@/config';
import { getClientToken } from '@/lib/tokenUtils';
import type { User } from '@/services/Users';

export async function getCurrentUserProfile(): Promise<{
	success: boolean;
	data?: User;
	message?: string;
}> {
	try {
		const token = getClientToken();
		if (!token) {
			return { success: false, message: 'Not authenticated' };
		}
		const res = await fetch(`${api.baseUrl}/users/me`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			cache: 'no-store',
		});
		const data = await res.json();
		if (!res.ok) {
			return { success: false, message: data?.message || 'Failed to fetch profile' };
		}
		return { success: true, data: data?.data || data };
	} catch (e) {
		return { success: false, message: 'Failed to fetch profile' };
	}
}



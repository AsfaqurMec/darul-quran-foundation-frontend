import { api } from '../../config';
import { getClientToken } from '../../lib/tokenUtils';
import type { User, UpdateUserRequest } from '../../services/Users';

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

export async function updateMe(
	updateData: UpdateUserRequest
): Promise<{ success: boolean; message: string; data?: User }> {
	try {
		const token = getClientToken();
		if (!token) {
			return { success: false, message: 'No access token found' };
		}

		const response = await fetch(`${api.baseUrl}/users/me`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(updateData),
		});

		const data = await response.json();

		if (!response.ok) {
			return {
				success: false,
				message: data.message || 'Failed to update user',
			};
		}

		return {
			success: true,
			message: data.message || 'User updated successfully',
			data: data.data || data,
		};
	} catch (error) {
		console.error('Error updating user:', error);
		return { success: false, message: 'Failed to update user' };
	}
}



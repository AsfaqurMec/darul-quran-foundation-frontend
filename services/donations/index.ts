import { api } from '@/config';
import { getClientToken } from '@/lib/tokenUtils';

export async function getMyDonations(): Promise<{
	success: boolean;
	data?: any[];
	message?: string;
}> {
	try {
		const token = getClientToken();
		if (!token) {
			return { success: false, message: 'Not authenticated' };
		}
		// Read language from client cookies only (avoid server-only imports)
		const clientLang =
			typeof window !== 'undefined'
				? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
				: undefined;
		const res = await fetch(`${api.baseUrl}/donations/my`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
				...(clientLang ? { 'Accept-Language': decodeURIComponent(clientLang) } : {}),
			},
			cache: 'no-store',
		});
		const data = await res.json();
		if (!res.ok) {
			return { success: false, message: data?.message || 'Failed to fetch donations' };
		}
		return { success: true, data: data?.data || data };
	} catch (e) {
		return { success: false, message: 'Failed to fetch donations' };
	}
}

import apiClient from '@/lib/apiClient';

export interface Donation {
  id?: string;
  purpose: string;
  contact: string;
  amount: number;
  status?: 'pending' | 'completed' | 'failed';
  createdAt?: string;
  updatedAt?: string;
}

export type DonationInput = {
  purpose: string;
  contact: string;
  amount: number;
};

export interface DonationResponse<T = Donation | Donation[]> {
  success: boolean;
  data?: T;
  message?: string;
}

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string } & T) => {
  if ('success' in response) {
    return response as DonationResponse<T>;
  }
  return { success: true, data: response } satisfies DonationResponse<T>;
};

export const createDonation = async (donationData: DonationInput): Promise<DonationResponse<Donation>> => {
  const { data } = await apiClient.post('/donations', donationData);
  return unwrap<Donation>(data);
};

export const getAllDonations = async (): Promise<DonationResponse<Donation[]>> => {
  const { data } = await apiClient.get('/donations');
  return unwrap<Donation[]>(data);
};

export const getDonationById = async (id: string): Promise<DonationResponse<Donation>> => {
  const { data } = await apiClient.get(`/donations/${id}`);
  return unwrap<Donation>(data);
};


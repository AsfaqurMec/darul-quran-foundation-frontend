import { api } from '../../config';
import { getClientToken } from '../../lib/tokenUtils';

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
  tran_id?: string;
  purpose: string;
  contact: string;
  amount: number;
  status?: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  gatewayData?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

export type DonationInput = {
  purpose: string;
  contact: string;
  amount: number;
  transactionId?: string;
  gatewayData?: Record<string, unknown>;
};

export interface DonationResponse<T = Donation | Donation[]> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: {
    page: number;
    totalPages: number;
    total: number;
    limit: number;
  };
  totalDonationAmount?: number;
}

export interface GetAllDonationsParams {
  page?: number;
  limit?: number;
  tran_id?: string;
  purpose?: string;
  contact?: string;
  startDate?: string;
  endDate?: string;
}

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string; pagination?: any; totalDonationAmount?: number } & T) => {
  if ('success' in response) {
    return response as unknown as DonationResponse<T>;
  }
  return { success: true, data: response, pagination: { page: 1, totalPages: 1, total: 0, limit: 10 }, totalDonationAmount: 0 } satisfies DonationResponse<T>;
};

export const createDonation = async (donationData: DonationInput): Promise<DonationResponse<Donation>> => {
  const { data } = await apiClient.post('/donations', donationData);
  return unwrap<Donation>(data);
};

export const getAllDonations = async (params?: GetAllDonationsParams): Promise<DonationResponse<Donation[]>> => {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.tran_id) queryParams.append('tran_id', params.tran_id);
  if (params?.purpose) queryParams.append('purpose', params.purpose);
  if (params?.contact) queryParams.append('contact', params.contact);
  if (params?.startDate) queryParams.append('startDate', params.startDate);
  if (params?.endDate) queryParams.append('endDate', params.endDate);
  
  const queryString = queryParams.toString();
  const url = queryString ? `/donations?${queryString}` : '/donations';
  
  const { data } = await apiClient.get(url);
  return unwrap<Donation[]>(data);
};

export const getDonationById = async (id: string): Promise<DonationResponse<Donation>> => {
  const { data } = await apiClient.get(`/donations/${id}`);
  return unwrap<Donation>(data);
};


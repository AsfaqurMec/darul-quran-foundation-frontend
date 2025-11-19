import apiClient from '@/lib/apiClient';
import { buildRequestPayload } from '@/lib/formData';

export interface DonationCategory {
  id?: string;
  title: string;
  subtitle: string;
  video: string;
  description: string;
  slug: string;
  expenseCategory: string[];
  thumbnail: string;
  daily?: number[] | null;
  monthly?: number[] | null;
  amount?: number[] | null;
  formTitle: string;
  formDescription: string;
  createdAt?: string;
  updatedAt?: string;
}

export type DonationCategoryInput = {
  title: string;
  subtitle: string;
  video: string;
  description: string;
  slug: string;
  expenseCategory: string[];
  thumbnail: string | File;
  daily?: number[] | null;
  monthly?: number[] | null;
  amount?: number[] | null;
  formTitle: string;
  formDescription: string;
};

export interface DonationCategoryResponse<T = DonationCategory | DonationCategory[]> {
  success: boolean;
  data?: T;
  message?: string;
}

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string } & T) => {
  if ('success' in response) {
    return response as DonationCategoryResponse<T>;
  }
  return { success: true, data: response } satisfies DonationCategoryResponse<T>;
};

export const getAllDonationCategories = async (): Promise<DonationCategoryResponse<DonationCategory[]>> => {
  // On server, add Accept-Language header from cookie for localized content
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const { data } = await apiClient.get('/donation-categories', {
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  return unwrap<DonationCategory[]>(data);
};

export const getDonationCategoryById = async (id: string): Promise<DonationCategoryResponse<DonationCategory>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const { data } = await apiClient.get(`/donation-categories/${id}`, {
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  return unwrap<DonationCategory>(data);
};

export const getDonationCategoryBySlug = async (slug: string): Promise<DonationCategoryResponse<DonationCategory>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const { data } = await apiClient.get(`/donation-categories/${slug}`, {
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  return unwrap<DonationCategory>(data);
};

export const createDonationCategory = async (categoryData: DonationCategoryInput): Promise<DonationCategoryResponse<DonationCategory>> => {
  const { body, headers } = buildRequestPayload({ ...categoryData });
  const { data } = await apiClient.post('/donation-categories', body, headers ? { headers } : undefined);
  return unwrap<DonationCategory>(data);
};

export const updateDonationCategory = async (
  id: string,
  categoryData: Partial<DonationCategoryInput>
): Promise<DonationCategoryResponse<DonationCategory>> => {
  const { body, headers } = buildRequestPayload({ ...categoryData });
  const { data } = await apiClient.put(`/donation-categories/${id}`, body, headers ? { headers } : undefined);
  return unwrap<DonationCategory>(data);
};

export const deleteDonationCategory = async (id: string): Promise<DonationCategoryResponse<null>> => {
  const { data } = await apiClient.delete(`/donation-categories/${id}`);
  if (data?.success !== undefined) return data;
  return { success: true, data: null, message: 'Donation category deleted' };
};


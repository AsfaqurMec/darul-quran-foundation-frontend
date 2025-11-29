import apiClient from '../../lib/apiClient';
import { buildRequestPayload } from '../../lib/formData';
import type { DonationCategory, DonationCategoryInput, DonationCategoryResponse } from './index';

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string } & T) => {
  if ('success' in response) {
    return response as DonationCategoryResponse<T>;
  }
  return { success: true, data: response } satisfies DonationCategoryResponse<T>;
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


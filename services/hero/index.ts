import { api } from '@/config';
import apiClient from '../../lib/apiClient';
import { buildRequestPayload } from '../../lib/formData';
import { ensurePagination } from '../../lib/pagination';
import { PaginationInfo } from '../../types/pagination';

export interface HeroImage {
  id?: string;
  image: string;
  title?: string;
  description?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type HeroImageInput = {
  image: string | File;
  title?: string;
  description?: string;
  order?: number;
  isActive?: boolean;
};

export interface HeroImageResponse<T = HeroImage | HeroImage[]> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: PaginationInfo;
}

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string; pagination?: PaginationInfo } & T) => {
  if ('success' in response) {
    return response as HeroImageResponse<T>;
  }
  return { success: true, data: response } satisfies HeroImageResponse<T>;
};

type HeroQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  isActive?: boolean;
};

const FIXED_TOKEN = "f3a1d9c6b87e4f209ad4c0c8c1f5e92e3b6a7c4de2af41b0c8f5a6d2c917eb3a"

export const getAllHeroImagesPublic = async (): Promise<HeroImageResponse<HeroImage[]>> => {
  try {
    const response = await fetch(`${api.baseUrl}/hero-images`, { method: "GET", headers: { Authorization: FIXED_TOKEN } });
    return await response.json();
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return { success: true, data: [] };
  }
};

export const getHeroImageByIdPublic = async (id: string): Promise<HeroImageResponse<HeroImage>> => {
  try {
    const response = await fetch(`${api.baseUrl}/hero-images/${id}`, { method: "GET", headers: { Authorization: FIXED_TOKEN } });
  return await response.json();
  } catch (error) {
    console.error('Error fetching hero image by id:', error);
    return { success: true, data: undefined as unknown as HeroImage };
  }
};

export const getActiveHeroImagesPublic = async (): Promise<HeroImageResponse<HeroImage[]>> => {
  try {
    const response = await fetch(`${api.baseUrl}/hero-images?isActive=true`, { method: "GET", headers: { Authorization: FIXED_TOKEN } });
    return await response.json();
  } catch (error) {
    console.error('Error fetching active hero images:', error);
    return { success: true, data: [] };
    }
};

export const getAllHeroImages = async (params?: HeroQueryParams): Promise<HeroImageResponse<HeroImage[]>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const query: Record<string, string | number | boolean> = {};
  if (params?.page) query.page = params.page;
  if (params?.limit) query.limit = params.limit;
  if (params?.searchTerm) query.searchTerm = params.searchTerm;
  if (typeof params?.isActive === 'boolean') query.isActive = params.isActive;

  const { data } = await apiClient.get('/hero-images/admin', {
    params: Object.keys(query).length ? query : undefined,
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  const base = unwrap<HeroImage[]>(data);
  const dataArray = Array.isArray(base.data) ? base.data : base.data ? [base.data] : [];
  return {
    ...base,
    data: dataArray,
    pagination: ensurePagination(
      data.pagination ?? base.pagination,
      dataArray.length,
      params?.page,
      params?.limit
    ),
  };
};

export const getHeroImageById = async (id: string): Promise<HeroImageResponse<HeroImage>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const { data } = await apiClient.get(`/hero-images/admin/${id}`, {
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  return unwrap<HeroImage>(data);
};

export const getActiveHeroImages = async (): Promise<HeroImageResponse<HeroImage[]>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const { data } = await apiClient.get('/hero-images/admin?isActive=true', {
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  return unwrap<HeroImage[]>(data);
};

// Alias for consistency
export const getAllActiveHeroImages = getActiveHeroImages;

export const createHeroImage = async (heroImageData: HeroImageInput): Promise<HeroImageResponse<HeroImage>> => {
  const { body, headers } = buildRequestPayload({ ...heroImageData });
  const { data } = await apiClient.post('/hero-images', body, headers ? { headers } : undefined);
  return unwrap<HeroImage>(data);
};

export const updateHeroImage = async (
  id: string,
  heroImageData: Partial<HeroImageInput>
): Promise<HeroImageResponse<HeroImage>> => {
  // Omit image on PUT when it wasn't updated (still a string URL) or empty
  const payload: Record<string, unknown> = { ...heroImageData };
  const image = payload.image as unknown;
  const isStringImage = typeof image === 'string';
  const isEmptyImage = image === '' || image === undefined || image === null;

  if (isEmptyImage || isStringImage) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete (payload as Record<string, unknown>).image;
  }

  const { body, headers } = buildRequestPayload(payload);
  const { data } = await apiClient.put(`/hero-images/${id}`, body, headers ? { headers } : undefined);
  return unwrap<HeroImage>(data);
};

export const deleteHeroImage = async (id: string): Promise<HeroImageResponse<null>> => {
  const { data } = await apiClient.delete(`/hero-images/${id}`);
  if (data?.success !== undefined) return data;
  return { success: true, data: null, message: 'Hero image deleted' };
};


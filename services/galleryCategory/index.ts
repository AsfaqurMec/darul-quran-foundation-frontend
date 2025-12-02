import apiClient from '@/lib/apiClient';
import { PaginationInfo } from '@/types/pagination';

export interface GalleryCategory {
  id?: string;
  _id?: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryCategoryInput {
  title: string;
}

export interface GalleryCategoryResponse<T = GalleryCategory | GalleryCategory[]> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: PaginationInfo;
}

const unwrap = <T,>(response: unknown): GalleryCategoryResponse<T> => {
  if (
    response &&
    typeof response === 'object' &&
    'success' in response &&
    typeof (response as { success: unknown }).success === 'boolean'
  ) {
    return response as GalleryCategoryResponse<T>;
  }
  return { success: true, data: response as T };
};

type GalleryCategoryQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
};

export const getAllGalleryCategories = async (
  params?: GalleryCategoryQueryParams
): Promise<GalleryCategoryResponse<GalleryCategory[]>> => {
  const query: Record<string, string | number> = {};
  if (params?.page) query.page = params.page;
  if (params?.limit) query.limit = params.limit;
  if (params?.searchTerm) query.searchTerm = params.searchTerm;

  const { data } = await apiClient.get('/gallery-category', {
    params: Object.keys(query).length ? query : undefined,
  });

  const base = unwrap<GalleryCategory[]>(data);
  const dataArray = Array.isArray(base.data) ? base.data : base.data ? [base.data] : [];

  return {
    ...base,
    data: dataArray,
    pagination: data.pagination ?? base.pagination,
  };
};

export const getGalleryCategoryById = async (id: string): Promise<GalleryCategoryResponse<GalleryCategory>> => {
  const { data } = await apiClient.get(`/gallery-category/${id}`);
  return unwrap<GalleryCategory>(data);
};

export const createGalleryCategory = async (
  categoryData: GalleryCategoryInput
): Promise<GalleryCategoryResponse<GalleryCategory>> => {
  const { data } = await apiClient.post('/gallery-category', categoryData);
  return unwrap<GalleryCategory>(data);
};

export const updateGalleryCategory = async (
  id: string,
  categoryData: Partial<GalleryCategoryInput>
): Promise<GalleryCategoryResponse<GalleryCategory>> => {
  const { data } = await apiClient.put(`/gallery-category/${id}`, categoryData);
  return unwrap<GalleryCategory>(data);
};

export const deleteGalleryCategory = async (id: string): Promise<GalleryCategoryResponse<null>> => {
  const { data } = await apiClient.delete(`/gallery-category/${id}`);
  if (data?.success !== undefined) return data;
  return { success: true, data: null, message: 'Gallery category deleted' };
};


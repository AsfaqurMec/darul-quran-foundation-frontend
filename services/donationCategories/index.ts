import { api } from '../../config';
import { ensurePagination } from '../../lib/pagination';
import { PaginationInfo } from '../../types/pagination';

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
  pagination?: PaginationInfo;
}

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string; pagination?: PaginationInfo } & T) => {
  if ('success' in response) {
    return response as DonationCategoryResponse<T>;
  }
  return { success: true, data: response } satisfies DonationCategoryResponse<T>;
};

type DonationCategoryQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
};

export const getAllDonationCategories = async (
  params?: DonationCategoryQueryParams
): Promise<DonationCategoryResponse<DonationCategory[]>> => {
  try {
    const lang = typeof window !== 'undefined'
      ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
      : undefined;
    const commonHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
    };
    const query = new URLSearchParams();
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.searchTerm) query.set('searchTerm', params.searchTerm);

    const queryString = query.toString();
    const res = await fetch(
      `${api.baseUrl}/donation-categories${queryString ? `?${queryString}` : ''}`,
      { headers: commonHeaders }
    );

    if (!res.ok) {
      if (res.status === 404) return { success: true, data: [] };
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const json = await res.json();
    const base = unwrap<DonationCategory[]>(json);
    const dataArray = Array.isArray(base.data) ? base.data : base.data ? [base.data] : [];
    return {
      ...base,
      data: dataArray,
      pagination: ensurePagination(
        json.pagination ?? base.pagination,
        dataArray.length,
        params?.page,
        params?.limit
      ),
    };
  } catch (e) {
    console.error('Error fetching donation categories:', e);
    return {
      success: true,
      data: [],
      pagination: ensurePagination(undefined, 0, params?.page, params?.limit),
    };
  }
};

export const getDonationCategoryById = async (id: string): Promise<DonationCategoryResponse<DonationCategory>> => {
  try {
    const lang = typeof window !== 'undefined'
      ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
      : undefined;
    const commonHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
    };
    const res = await fetch(`${api.baseUrl}/donation-categories/${id}`, { headers: commonHeaders });

    if (!res.ok) {
      if (res.status === 404) return { success: true, data: undefined as unknown as DonationCategory };
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const json = await res.json();
    return unwrap<DonationCategory>(json);
  } catch (e) {
    console.error('Error fetching donation category by id:', e);
    return { success: true, data: undefined as unknown as DonationCategory };
  }
};

export const getDonationCategoryBySlug = async (slug: string): Promise<DonationCategoryResponse<DonationCategory>> => {
  try {
    const lang = typeof window !== 'undefined'
      ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
      : undefined;
    const commonHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
    };
    const res = await fetch(`${api.baseUrl}/donation-categories/${slug}`, { headers: commonHeaders });

    if (!res.ok) {
      if (res.status === 404) return { success: true, data: undefined as unknown as DonationCategory };
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const json = await res.json();
    return unwrap<DonationCategory>(json);
  } catch (e) {
    console.error('Error fetching donation category by slug:', e);
    return { success: true, data: undefined as unknown as DonationCategory };
  }
};


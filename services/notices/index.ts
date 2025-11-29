import apiClient from '../../lib/apiClient';
import { ensurePagination } from '../../lib/pagination';
import { PaginationInfo } from '../../types/pagination';

export interface Notice {
  id?: string;
  title: string;
  subTitle: string;
  date: string;
  category: string;
  fullContent: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NoticeResponse<T = Notice | Notice[]> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: PaginationInfo;
}

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string; pagination?: PaginationInfo } & T) => {
  if ('success' in response) {
    return response as NoticeResponse<T>;
  }
  return { success: true, data: response } satisfies NoticeResponse<T>;
};

type NoticeQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  category?: string;
};

export const getAllNotices = async (params?: NoticeQueryParams): Promise<NoticeResponse<Notice[]>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const query: Record<string, string | number> = {};
  if (params?.page) query.page = params.page;
  if (params?.limit) query.limit = params.limit;
  if (params?.searchTerm) query.searchTerm = params.searchTerm;
  if (params?.category) query.category = params.category;

  const { data } = await apiClient.get('/notices', {
    params: Object.keys(query).length ? query : undefined,
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  const base = unwrap<Notice[]>(data);
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

export const getNoticeById = async (id: string): Promise<NoticeResponse<Notice>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const { data } = await apiClient.get(`/notices/${id}`, {
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  return unwrap<Notice>(data);
};

export const createNotice = async (noticeData: Omit<Notice, 'id'>): Promise<NoticeResponse<Notice>> => {
  const { data } = await apiClient.post('/notices', noticeData);
  return unwrap<Notice>(data);
};

export const updateNotice = async (id: string, noticeData: Partial<Notice>): Promise<NoticeResponse<Notice>> => {
  const { data } = await apiClient.put(`/notices/${id}`, noticeData);
  return unwrap<Notice>(data);
};

export const deleteNotice = async (id: string): Promise<NoticeResponse<null>> => {
  const { data } = await apiClient.delete(`/notices/${id}`);
  if (data?.success !== undefined) return data;
  return { success: true, data: null, message: 'Notice deleted' };
};


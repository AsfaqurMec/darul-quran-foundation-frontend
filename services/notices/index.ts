import apiClient from '@/lib/apiClient';

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
}

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string } & T) => {
  if ('success' in response) {
    return response as NoticeResponse<T>;
  }
  return { success: true, data: response } satisfies NoticeResponse<T>;
};

export const getAllNotices = async (): Promise<NoticeResponse<Notice[]>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const { data } = await apiClient.get('/notices', {
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  return unwrap<Notice[]>(data);
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


// import apiClient from '../../lib/apiClient';
// import { ensurePagination } from '../../lib/pagination';
// import { PaginationInfo } from '../../types/pagination';
// import { app, api } from '../../config';

// export interface Notice {
//   id?: string;
//   title: string;
//   subTitle: string;
//   date: string;
//   category: string;
//   fullContent: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface NoticeResponse<T = Notice | Notice[]> {
//   success: boolean;
//   data?: T;
//   message?: string;
//   pagination?: PaginationInfo;
// }

// const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string; pagination?: PaginationInfo } & T) => {
//   if ('success' in response) {
//     return response as NoticeResponse<T>;
//   }
//   return { success: true, data: response } satisfies NoticeResponse<T>;
// };

// type NoticeQueryParams = {
//   page?: number;
//   limit?: number;
//   searchTerm?: string;
//   category?: string;
// };

// export const getAllNotices = async (params?: NoticeQueryParams): Promise<NoticeResponse<Notice[]>> => {
//   try {
//     const lang = typeof window !== 'undefined'
//       ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
//       : undefined;
    
//     // Determine the origin for server-side requests
//     const isServerSide = typeof window === 'undefined';
//     const origin = isServerSide 
//       ? (process.env.NEXT_PUBLIC_APP_URL || app.url || 'http://localhost:3000' || 'https://darulquranfoundation.org')
//       : undefined;
    
//     const query: Record<string, string | number> = {};
//     if (params?.page) query.page = params.page;
//     if (params?.limit) query.limit = params.limit;
//     if (params?.searchTerm) query.searchTerm = params.searchTerm;
//     if (params?.category) query.category = params.category;

//     const headers: Record<string, string> = {};
//     if (lang) headers['Accept-Language'] = decodeURIComponent(lang);
//     // Add Origin and Referer headers for server-side requests
//     if (isServerSide && origin) {
//       headers['Origin'] = origin;
//       headers['Referer'] = `${origin}/`;
//     }

//     const { data } = await apiClient.get('/notices', {
//       params: Object.keys(query).length ? query : undefined,
//       headers: Object.keys(headers).length ? headers : undefined,
//     });
//     const base = unwrap<Notice[]>(data);
//     const dataArray = Array.isArray(base.data) ? base.data : base.data ? [base.data] : [];
//     return {
//       ...base,
//       data: dataArray,
//       pagination: ensurePagination(
//         data.pagination ?? base.pagination,
//         dataArray.length,
//         params?.page,
//         params?.limit
//       ),
//     };
//   } catch (e: any) {
//     // Handle 403 Forbidden (likely origin validation issue)
//     if (e?.response?.status === 403) {
//       const errorMessage = e?.response?.data?.message || e?.message || 'Access denied: Origin not allowed';
//       const frontendOrigin = typeof window !== 'undefined' 
//         ? window.location.origin 
//         : 'server-side';
      
//       console.error('❌ Origin validation failed (getAllNotices)');
//       console.error('Status:', e.response?.status);
//       console.error('Error Message:', errorMessage);
//       console.error('Frontend Origin:', frontendOrigin);
//       console.error('API URL:', `${api.baseUrl}/notices`);
      
//       return {
//         success: false,
//         data: [],
//         message: errorMessage,
//         pagination: ensurePagination(undefined, 0, params?.page, params?.limit),
//       };
//     }
    
//     console.error('Error fetching notices:', e);
//     return {
//       success: true,
//       data: [],
//       pagination: ensurePagination(undefined, 0, params?.page, params?.limit),
//     };
//   }
// };

// export const getNoticeById = async (id: string): Promise<NoticeResponse<Notice>> => {
//   try {
//     const lang = typeof window !== 'undefined'
//       ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
//       : undefined;
    
//     // Determine the origin for server-side requests
//     const isServerSide = typeof window === 'undefined';
//     const origin = isServerSide 
//       ? (process.env.NEXT_PUBLIC_APP_URL || app.url || 'http://localhost:3000')
//       : undefined;
    
//     const headers: Record<string, string> = {};
//     if (lang) headers['Accept-Language'] = decodeURIComponent(lang);
//     // Add Origin and Referer headers for server-side requests
//     if (isServerSide && origin) {
//       headers['Origin'] = origin;
//       headers['Referer'] = `${origin}/`;
//     }

//     const { data } = await apiClient.get(`/notices/${id}`, {
//       headers: Object.keys(headers).length ? headers : undefined,
//     });
//     return unwrap<Notice>(data);
//   } catch (e: any) {
//     // Handle 403 Forbidden (likely origin validation issue)
//     if (e?.response?.status === 403) {
//       const errorMessage = e?.response?.data?.message || e?.message || 'Access denied: Origin not allowed';
//       const frontendOrigin = typeof window !== 'undefined' 
//         ? window.location.origin 
//         : 'server-side';
      
//       console.error('❌ Origin validation failed (getNoticeById)');
//       console.error('Status:', e.response?.status);
//       console.error('Error Message:', errorMessage);
//       console.error('Frontend Origin:', frontendOrigin);
//       console.error('API URL:', `${api.baseUrl}/notices/${id}`);
      
//       return {
//         success: false,
//         data: undefined as unknown as Notice,
//         message: errorMessage,
//       };
//     }
    
//     console.error('Error fetching notice by id:', e);
//     return { success: true, data: undefined as unknown as Notice };
//   }
// };

// export const createNotice = async (noticeData: Omit<Notice, 'id'>): Promise<NoticeResponse<Notice>> => {
//   const { data } = await apiClient.post('/notices', noticeData);
//   return unwrap<Notice>(data);
// };

// export const updateNotice = async (id: string, noticeData: Partial<Notice>): Promise<NoticeResponse<Notice>> => {
//   const { data } = await apiClient.put(`/notices/${id}`, noticeData);
//   return unwrap<Notice>(data);
// };

// export const deleteNotice = async (id: string): Promise<NoticeResponse<null>> => {
//   const { data } = await apiClient.delete(`/notices/${id}`);
//   if (data?.success !== undefined) return data;
//   return { success: true, data: null, message: 'Notice deleted' };
// };
// "use server";
import { api } from '@/config';
import apiClient from '../../lib/apiClient';
import { ensurePagination } from '../../lib/pagination';
import { PaginationInfo } from '../../types/pagination';
// import { cookies } from 'next/headers';

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



// Fixed token for API requests
const FIXED_TOKEN = "f3a1d9c6b87e4f209ad4c0c8c1f5e92e3b6a7c4de2af41b0c8f5a6d2c917eb3a"
export const getAllNoticesPublic = async () => {
  try {
   // const cookieStore = await cookies();
   // const lang = cookieStore.get('lang')?.value;
    const token = FIXED_TOKEN;
    
    const response = await fetch(`${api.baseUrl}/notices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // ...(lang ? { "Accept-Language": lang } : {}),
        Authorization: token,
      },
      next: {
        tags: ["notices"],
      },
    });

    if (!response.ok) {
      // If endpoint unavailable, serve fallback static data
      if (response.status === 404) {
        return { success: true, data: [] };
      }
      throw new Error(`Request failed with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fblog get:", error);
    return { success: true, data: [] };
  }
};

export const getNoticeByIdPublic = async (id: string): Promise<NoticeResponse<Notice>> => {
  try {
    const token = FIXED_TOKEN;
    const response = await fetch(`${api.baseUrl}/notices/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["notices"],
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching notice by id:", error);
    return { success: true, data: undefined as unknown as Notice };
  }
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

  const { data } = await apiClient.get('/notices/admin', {
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
  const { data } = await apiClient.get(`/notices/admin/${id}`, {
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
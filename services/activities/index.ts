// import { api } from '../../config';
// import { ensurePagination } from '../../lib/pagination';
// import { PaginationInfo } from '../../types/pagination';

// export interface Activity {
//   id?: string;
//   title: string;
//   tag: string;
//   description: string;
//   image: string;
//   thumbnail: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export type ActivityInput = {
//   title: string;
//   tag: string;
//   description: string;
//   image: string | File;
//   thumbnail: string | File;
// };

// export interface ActivityResponse<T = Activity | Activity[]> {
//   success: boolean;
//   data?: T;
//   message?: string;
//   pagination?: PaginationInfo;
// }

// const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string; pagination?: PaginationInfo } & T) => {
//   if ('success' in response) {
//     return response as ActivityResponse<T>;
//   }
//   return { success: true, data: response } satisfies ActivityResponse<T>;
// };

// type ActivityQueryParams = {
//   page?: number;
//   limit?: number;
//   searchTerm?: string;
//   tag?: string;
// };

// export const getAllActivities = async (
//   params?: ActivityQueryParams
// ): Promise<ActivityResponse<Activity[]>> => {
//   try {
//     const lang = typeof window !== 'undefined'
//       ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
//       : undefined;
//     const commonHeaders: HeadersInit = {
//       'Content-Type': 'application/json',
//       ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
//     };

//     const query = new URLSearchParams();
//     if (params?.page) query.set('page', String(params.page));
//     if (params?.limit) query.set('limit', String(params.limit));
//     if (params?.searchTerm) query.set('searchTerm', params.searchTerm);
//     if (params?.tag) query.set('tag', params.tag);

//     const queryString = query.toString();
//     const url = `${api.baseUrl}/activities${queryString ? `?${queryString}` : ''}`;
//     const res = await fetch(url, { headers: commonHeaders });

//     if (!res.ok) {
//       if (res.status === 404) return { success: true, data: [] };
//       throw new Error(`Request failed with status: ${res.status}`);
//     }
//     const json = await res.json();
//     const base = unwrap<Activity[]>(json);
//     const dataArray = Array.isArray(base.data) ? base.data : base.data ? [base.data] : [];
//     return {
//       ...base,
//       data: dataArray,
//       pagination: ensurePagination(
//         json.pagination ?? base.pagination,
//         dataArray.length,
//         params?.page,
//         params?.limit
//       ),
//     };
//   } catch (e) {
//     console.error('Error fetching activities:', e);
//     return {
//       success: true,
//       data: [],
//       pagination: ensurePagination(undefined, 0, params?.page, params?.limit),
//     };
//   }
// };

// export const getActivityById = async (id: string): Promise<ActivityResponse<Activity>> => {
//   try {
//     const lang = typeof window !== 'undefined'
//       ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
//       : undefined;
//     const commonHeaders: HeadersInit = {
//       'Content-Type': 'application/json',
//       ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
//     };
//     let res = await fetch(`${api.baseUrl}/programs/${id}`, { headers: commonHeaders });

//     if (res.status === 401 || res.status === 403) {
//       const fallbacks = [`/activities/${id}`, `/activities/public/${id}`, `/public/activities/${id}`, `/public/programs/${id}`];
//       for (const p of fallbacks) {
//         const alt = await fetch(`${api.baseUrl}${p}`, { headers: commonHeaders });
//         if (alt.ok) {
//           const json = await alt.json();
//           return unwrap<Activity>(json);
//         }
//       }
//     }

//     if (!res.ok) {
//       if (res.status === 404) return { success: true, data: undefined as unknown as Activity };
//       throw new Error(`Request failed with status: ${res.status}`);
//     }
//     const json = await res.json();
//     return unwrap<Activity>(json);
//   } catch (e) {
//     console.error('Error fetching activity by id:', e);
//     return { success: true, data: undefined as unknown as Activity };
//   }
// };

import { api } from '../../config';
import { ensurePagination } from '../../lib/pagination';
import { PaginationInfo } from '../../types/pagination';

export interface Activity {
  id?: string;
  title: string;
  tag: string;
  description: string;
  image: string;
  thumbnail: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ActivityInput = {
  title: string;
  tag: string;
  description: string;
  image: string | File;
  thumbnail: string | File;
};

export interface ActivityResponse<T = Activity | Activity[]> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: PaginationInfo;
}

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string; pagination?: PaginationInfo } & T) => {
  if ('success' in response) {
    return response as ActivityResponse<T>;
  }
  return { success: true, data: response } satisfies ActivityResponse<T>;
};

type ActivityQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  tag?: string;
};

export const getAllActivities = async (
  params?: ActivityQueryParams
): Promise<ActivityResponse<Activity[]>> => {
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
    if (params?.tag) query.set('tag', params.tag);

    const queryString = query.toString();
    const url = `${api.baseUrl}/activities${queryString ? `?${queryString}` : ''}`;
    const res = await fetch(url, { headers: commonHeaders });

    if (!res.ok) {
      if (res.status === 404) return { success: true, data: [] };
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const json = await res.json();
    const base = unwrap<Activity[]>(json);
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
    console.error('Error fetching activities:', e);
    return {
      success: true,
      data: [],
      pagination: ensurePagination(undefined, 0, params?.page, params?.limit),
    };
  }
};

export const getActivityById = async (id: string): Promise<ActivityResponse<Activity>> => {
  try {
    const lang = typeof window !== 'undefined'
      ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
      : undefined;
    const commonHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
    };
    let res = await fetch(`${api.baseUrl}/programs/${id}`, { headers: commonHeaders });

    if (res.status === 401 || res.status === 403) {
      const fallbacks = [`/activities/${id}`, `/activities/public/${id}`, `/public/activities/${id}`, `/public/programs/${id}`];
      for (const p of fallbacks) {
        const alt = await fetch(`${api.baseUrl}${p}`, { headers: commonHeaders });
        if (alt.ok) {
          const json = await alt.json();
          return unwrap<Activity>(json);
        }
      }
    }

    if (!res.ok) {
      if (res.status === 404) return { success: true, data: undefined as unknown as Activity };
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const json = await res.json();
    return unwrap<Activity>(json);
  } catch (e) {
    console.error('Error fetching activity by id:', e);
    return { success: true, data: undefined as unknown as Activity };
  }
};



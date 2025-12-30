// import { api, app } from '../../config';
// import { ensurePagination } from '../../lib/pagination';
// import { PaginationInfo } from '../../types/pagination';

// export interface DonationCategory {
//   id?: string;
//   title: string;
//   subtitle: string;
//   video: string;
//   description: string;
//   slug: string;
//   expenseCategory: string[];
//   thumbnail: string;
//   daily?: number[] | null;
//   monthly?: number[] | null;
//   amount?: number[] | null;
//   formTitle: string;
//   formDescription: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export type DonationCategoryInput = {
//   title: string;
//   subtitle: string;
//   video: string;
//   description: string;
//   slug: string;
//   expenseCategory: string[];
//   thumbnail: string | File;
//   daily?: number[] | null;
//   monthly?: number[] | null;
//   amount?: number[] | null;
//   formTitle: string;
//   formDescription: string;
// };

// export interface DonationCategoryResponse<T = DonationCategory | DonationCategory[]> {
//   success: boolean;
//   data?: T;
//   message?: string;
//   pagination?: PaginationInfo;
// }

// const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string; pagination?: PaginationInfo } & T) => {
//   if ('success' in response) {
//     return response as DonationCategoryResponse<T>;
//   }
//   return { success: true, data: response } satisfies DonationCategoryResponse<T>;
// };

// type DonationCategoryQueryParams = {
//   page?: number;
//   limit?: number;
//   searchTerm?: string;
// };

// export const getAllDonationCategories = async (
//   params?: DonationCategoryQueryParams
// ): Promise<DonationCategoryResponse<DonationCategory[]>> => {
//   try {
//     const lang = typeof window !== 'undefined'
//       ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
//       : undefined;
    
//     // Determine the origin for the request
//     const isServerSide = typeof window === 'undefined';
//     const origin = isServerSide 
//       ? (process.env.NEXT_PUBLIC_APP_URL || app.url || 'http://localhost:3000')
//       : undefined;
    
//     const commonHeaders: HeadersInit = {
//       'Content-Type': 'application/json',
//       ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
//       // Add Origin and Referer headers for server-side requests
//       ...(isServerSide && origin ? { 
//         'Origin': origin,
//         'Referer': `${origin}/`,
//       } : {}),
//     };
    
//     const query = new URLSearchParams();
//     if (params?.page) query.set('page', String(params.page));
//     if (params?.limit) query.set('limit', String(params.limit));
//     if (params?.searchTerm) query.set('searchTerm', params.searchTerm);

//     const queryString = query.toString();
//     const url = `${api.baseUrl}/donation-categories${queryString ? `?${queryString}` : ''}`;
//     const res = await fetch(url, { headers: commonHeaders });

//     if (!res.ok) {
//       if (res.status === 404) return { success: true, data: [] };
      
//       // Handle 403 Forbidden (likely origin validation issue)
//       if (res.status === 403) {
//         let errorText = '';
//         let errorMessage = 'Access denied: Origin not allowed';
        
//         try {
//           const clonedRes = res.clone();
//           errorText = await clonedRes.text();
          
//           if (errorText) {
//             try {
//               const errorJson = JSON.parse(errorText);
//               errorMessage = errorJson.message || errorJson.error || errorMessage;
//             } catch {
//               errorMessage = errorText || errorMessage;
//             }
//           }
//         } catch (parseError) {
//           console.warn('Could not parse error response:', parseError);
//         }
        
//         const frontendOrigin = typeof window !== 'undefined' 
//           ? window.location.origin 
//           : 'server-side';
        
//         console.error('❌ Origin validation failed (getAllDonationCategories)');
//         console.error('Status:', res.status);
//         console.error('Error Message:', errorMessage);
//         console.error('Frontend Origin:', frontendOrigin);
//         console.error('API URL:', url);
        
//         return {
//           success: false,
//           data: [],
//           message: errorMessage,
//           pagination: ensurePagination(undefined, 0, params?.page, params?.limit),
//         };
//       }
      
//       // Handle other error statuses
//       let errorMessage = `Request failed with status: ${res.status}`;
//       try {
//         const clonedRes = res.clone();
//         const errorText = await clonedRes.text();
//         if (errorText) {
//           try {
//             const errorJson = JSON.parse(errorText);
//             errorMessage = errorJson.message || errorJson.error || errorMessage;
//           } catch {
//             errorMessage = errorText || errorMessage;
//           }
//         }
//       } catch {
//         // Ignore parsing errors
//       }
      
//       throw new Error(errorMessage);
//     }
//     const json = await res.json();
//     const base = unwrap<DonationCategory[]>(json);
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
//     console.error('Error fetching donation categories:', e);
//     return {
//       success: true,
//       data: [],
//       pagination: ensurePagination(undefined, 0, params?.page, params?.limit),
//     };
//   }
// };

// export const getDonationCategoryById = async (id: string): Promise<DonationCategoryResponse<DonationCategory>> => {
//   try {
//     const lang = typeof window !== 'undefined'
//       ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
//       : undefined;
    
//     // Determine the origin for the request
//     const isServerSide = typeof window === 'undefined';
//     const origin = isServerSide 
//       ? (process.env.NEXT_PUBLIC_APP_URL || app.url || 'http://localhost:3000')
//       : undefined;
    
//     const commonHeaders: HeadersInit = {
//       'Content-Type': 'application/json',
//       ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
//       // Add Origin and Referer headers for server-side requests
//       ...(isServerSide && origin ? { 
//         'Origin': origin,
//         'Referer': `${origin}/`,
//       } : {}),
//     };
    
//     const url = `${api.baseUrl}/donation-categories/${id}`;
//     const res = await fetch(url, { headers: commonHeaders });

//     if (!res.ok) {
//       if (res.status === 404) return { success: true, data: undefined as unknown as DonationCategory };
      
//       // Handle 403 Forbidden (likely origin validation issue)
//       if (res.status === 403) {
//         let errorText = '';
//         let errorMessage = 'Access denied: Origin not allowed';
        
//         try {
//           const clonedRes = res.clone();
//           errorText = await clonedRes.text();
          
//           if (errorText) {
//             try {
//               const errorJson = JSON.parse(errorText);
//               errorMessage = errorJson.message || errorJson.error || errorMessage;
//             } catch {
//               errorMessage = errorText || errorMessage;
//             }
//           }
//         } catch (parseError) {
//           console.warn('Could not parse error response:', parseError);
//         }
        
//         const frontendOrigin = typeof window !== 'undefined' 
//           ? window.location.origin 
//           : 'server-side';
        
//         console.error('❌ Origin validation failed (getDonationCategoryById)');
//         console.error('Status:', res.status);
//         console.error('Error Message:', errorMessage);
//         console.error('Frontend Origin:', frontendOrigin);
//         console.error('API URL:', url);
        
//         return {
//           success: false,
//           data: undefined as unknown as DonationCategory,
//           message: errorMessage,
//         };
//       }
      
//       // Handle other error statuses
//       let errorMessage = `Request failed with status: ${res.status}`;
//       try {
//         const clonedRes = res.clone();
//         const errorText = await clonedRes.text();
//         if (errorText) {
//           try {
//             const errorJson = JSON.parse(errorText);
//             errorMessage = errorJson.message || errorJson.error || errorMessage;
//           } catch {
//             errorMessage = errorText || errorMessage;
//           }
//         }
//       } catch {
//         // Ignore parsing errors
//       }
      
//       throw new Error(errorMessage);
//     }
//     const json = await res.json();
//     return unwrap<DonationCategory>(json);
//   } catch (e) {
//     console.error('Error fetching donation category by id:', e);
//     return { success: true, data: undefined as unknown as DonationCategory };
//   }
// };

// export const getDonationCategoryBySlug = async (slug: string): Promise<DonationCategoryResponse<DonationCategory>> => {
//   try {
//     const lang = typeof window !== 'undefined'
//       ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
//       : undefined;
    
//     // Determine the origin for the request
//     const isServerSide = typeof window === 'undefined';
//     const origin = isServerSide 
//       ? (process.env.NEXT_PUBLIC_APP_URL || app.url || 'http://localhost:3000')
//       : undefined;
    
//     const commonHeaders: HeadersInit = {
//       'Content-Type': 'application/json',
//       ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
//       // Add Origin and Referer headers for server-side requests
//       ...(isServerSide && origin ? { 
//         'Origin': origin,
//         'Referer': `${origin}/`,
//       } : {}),
//     };
    
//     const url = `${api.baseUrl}/donation-categories/${slug}`;
//     const res = await fetch(url, { headers: commonHeaders });

//     if (!res.ok) {
//       if (res.status === 404) return { success: true, data: undefined as unknown as DonationCategory };
      
//       // Handle 403 Forbidden (likely origin validation issue)
//       if (res.status === 403) {
//         let errorText = '';
//         let errorMessage = 'Access denied: Origin not allowed';
        
//         try {
//           const clonedRes = res.clone();
//           errorText = await clonedRes.text();
          
//           if (errorText) {
//             try {
//               const errorJson = JSON.parse(errorText);
//               errorMessage = errorJson.message || errorJson.error || errorMessage;
//             } catch {
//               errorMessage = errorText || errorMessage;
//             }
//           }
//         } catch (parseError) {
//           console.warn('Could not parse error response:', parseError);
//         }
        
//         const frontendOrigin = typeof window !== 'undefined' 
//           ? window.location.origin 
//           : 'server-side';
        
//         console.error('❌ Origin validation failed (getDonationCategoryBySlug)');
//         console.error('Status:', res.status);
//         console.error('Error Message:', errorMessage);
//         console.error('Frontend Origin:', frontendOrigin);
//         console.error('API URL:', url);
        
//         return {
//           success: false,
//           data: undefined as unknown as DonationCategory,
//           message: errorMessage,
//         };
//       }
      
//       // Handle other error statuses
//       let errorMessage = `Request failed with status: ${res.status}`;
//       try {
//         const clonedRes = res.clone();
//         const errorText = await clonedRes.text();
//         if (errorText) {
//           try {
//             const errorJson = JSON.parse(errorText);
//             errorMessage = errorJson.message || errorJson.error || errorMessage;
//           } catch {
//             errorMessage = errorText || errorMessage;
//           }
//         }
//       } catch {
//         // Ignore parsing errors
//       }
      
//       throw new Error(errorMessage);
//     }
//     const json = await res.json();
//     return unwrap<DonationCategory>(json);
//   } catch (e) {
//     console.error('Error fetching donation category by slug:', e);
//     return { success: true, data: undefined as unknown as DonationCategory };
//   }
// };

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

const FIXED_TOKEN = "f3a1d9c6b87e4f209ad4c0c8c1f5e92e3b6a7c4de2af41b0c8f5a6d2c917eb3a"
export const getAllDonationCategoriesPublic = async (): Promise<DonationCategoryResponse<DonationCategory[]>> => {
  try {
    const response = await fetch(`${api.baseUrl}/donation-categories`, { method: "GET", headers: { Authorization: FIXED_TOKEN } });
    return await response.json();
  } catch (error) {
    console.error('Error fetching donation categories:', error);
    return { success: true, data: [] };
  }
};

export const getDonationCategoryByIdPublic = async (id: string): Promise<DonationCategoryResponse<DonationCategory>> => {
  try {
    const response = await fetch(`${api.baseUrl}/donation-categories/${id}`, { method: "GET", headers: { Authorization: FIXED_TOKEN } });
    return await response.json();
  } catch (error) {
    console.error('Error fetching donation category by id:', error);
    return { success: true, data: undefined as unknown as DonationCategory };
  }
};

export const getDonationCategoryBySlugPublic = async (slug: string): Promise<DonationCategoryResponse<DonationCategory>> => {
  try {
    const response = await fetch(`${api.baseUrl}/donation-categories/${slug}`, { method: "GET", headers: { Authorization: FIXED_TOKEN } });
    return await response.json();
  } catch (error) {
    console.error('Error fetching donation category by slug:', error);
    return { success: true, data: undefined as unknown as DonationCategory };
  }
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
      `${api.baseUrl}/donation-categories/admin${queryString ? `?${queryString}` : ''}`,
      { headers: { ...commonHeaders, Authorization: FIXED_TOKEN } }
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
    const res = await fetch(`${api.baseUrl}/donation-categories/admin/${id}`, { headers: { ...commonHeaders, Authorization: FIXED_TOKEN } });

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
    const res = await fetch(`${api.baseUrl}/donation-categories/admin/${slug}`, { headers: { ...commonHeaders, Authorization: FIXED_TOKEN } });

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

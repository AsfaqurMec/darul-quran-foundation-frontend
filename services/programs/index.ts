// import apiClient from '@/lib/apiClient';
// import { buildRequestPayload } from '@/lib/formData';
// import { api } from '@/config';

// export interface Program {
//   id?: string;
//   title: string;
//   tag: string;
//   description: string;
//   image: string;
//   thumbnail: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export type ProgramInput = {
//   title: string;
//   tag: string;
//   description: string;
//   image: string | File;
//   thumbnail: string | File;
// };

// export interface ProgramResponse<T = Program | Program[]> {
//   success: boolean;
//   data?: T;
//   message?: string;
// }

// const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string } & T) => {
//   if ('success' in response) {
//     return response as ProgramResponse<T>;
//   }
//   return { success: true, data: response } satisfies ProgramResponse<T>;
// };

// export const getAllPrograms = async (): Promise<ProgramResponse<Program[]>> => {
//   try {
//     let res = await fetch(`${api.baseUrl}/programs`, { headers: { 'Content-Type': 'application/json' } });

//     if (res.status === 401 || res.status === 403) {
//       const fallbacks = ['/programs', '/programs/public', '/public/programs'];
//       for (const p of fallbacks) {
//         const alt = await fetch(`${api.baseUrl}${p}`, { headers: { 'Content-Type': 'application/json' } });
//         if (alt.ok) {
//           const json = await alt.json();
//           return unwrap<Program[]>(json);
//         }
//       }
//     }

//     if (!res.ok) {
//       if (res.status === 404) return { success: true, data: [] };
//       throw new Error(`Request failed with status: ${res.status}`);
//     }
//     const json = await res.json();
//     return unwrap<Program[]>(json);
//   } catch (e) {
//     console.error('Error fetching programs:', e);
//     return { success: true, data: [] };
//   }
// };

// export const getProgramById = async (id: string): Promise<ProgramResponse<Program>> => {
//   try {
//     let res = await fetch(`${api.baseUrl}/programs/${id}`, { headers: { 'Content-Type': 'application/json' } });

//     if (res.status === 401 || res.status === 403) {
//       const fallbacks = [`/programs/${id}`, `/programs/public/${id}`, `/public/programs/${id}`];
//       for (const p of fallbacks) {
//         const alt = await fetch(`${api.baseUrl}${p}`, { headers: { 'Content-Type': 'application/json' } });
//         if (alt.ok) {
//           const json = await alt.json();
//           return unwrap<Program>(json);
//         }
//       }
//     }

//     if (!res.ok) {
//       if (res.status === 404) return { success: true, data: undefined as unknown as Program };
//       throw new Error(`Request failed with status: ${res.status}`);
//     }
//     const json = await res.json();
//     return unwrap<Program>(json);
//   } catch (e) {
//     console.error('Error fetching program by id:', e);
//     return { success: true, data: undefined as unknown as Program };
//   }
// };

// export const createProgram = async (programData: ProgramInput): Promise<ProgramResponse<Program>> => {
//   const { body, headers } = buildRequestPayload({ ...programData });
//   const { data } = await apiClient.post('/programs', body, headers ? { headers } : undefined);
//   return unwrap<Program>(data);
// };

// export const updateProgram = async (
//   id: string,
//   programData: Partial<ProgramInput>
// ): Promise<ProgramResponse<Program>> => {
//   const { body, headers } = buildRequestPayload({ ...programData });
//   const { data } = await apiClient.put(`/programs/${id}`, body, headers ? { headers } : undefined);
//   return unwrap<Program>(data);
// };

// export const deleteProgram = async (id: string): Promise<ProgramResponse<null>> => {
//   const { data } = await apiClient.delete(`/programs/${id}`);
//   if (data?.success !== undefined) return data;
//   return { success: true, data: null, message: 'Program deleted' };
// };

// import { api, app } from '../../config';
// import { ensurePagination } from '../../lib/pagination';
// import { Program, ProgramInput, ProgramResponse } from '../../types/program';

// const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string; pagination?: ProgramResponse['pagination'] } & T) => {
//   if ('success' in response) {
//     return response as ProgramResponse<T>;
//   }
//   return { success: true, data: response } satisfies ProgramResponse<T>;
// };

// type ProgramQueryParams = {
//   page?: number;
//   limit?: number;
//   searchTerm?: string;
// };

// export const getAllPrograms = async (params?: ProgramQueryParams): Promise<ProgramResponse<Program[]>> => {
//   try {
//     const lang = typeof window !== 'undefined'
//       ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
//       : undefined;
    
//     // Determine the origin for the request
//     // For server-side requests, use the app URL from config
//     // For client-side requests, the browser will automatically set the Origin header
//     const isServerSide = typeof window === 'undefined';
//     const origin = isServerSide 
//       ? (process.env.NEXT_PUBLIC_APP_URL || app.url || 'http://localhost:3000')
//       : undefined;
    
//     const commonHeaders: HeadersInit = {
//       'Content-Type': 'application/json',
//       ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
//       // Add Origin and Referer headers for server-side requests
//       // The backend middleware checks both Origin and Referer headers
//       ...(isServerSide && origin ? { 
//         'Origin': origin,
//         'Referer': `${origin}/`,
//       } : {}),
//     };
    
//     const query = new URLSearchParams();
//     if (params?.page) query.set('page', String(params.page));
//     if (params?.limit) query.set('limit', String(params.limit));
//     if (params?.searchTerm) query.set('searchTerm', params.searchTerm);

//     const url = `${api.baseUrl}/programs${query.toString() ? `?${query.toString()}` : ''}`;
//     const res = await fetch(url, { headers: commonHeaders });

//     if (!res.ok) {
//       if (res.status === 404) return { success: true, data: [] };
      
//       // Handle 403 Forbidden (likely origin validation issue)
//       if (res.status === 403) {
//         let errorText = '';
//         let errorMessage = 'Access denied: Origin not allowed';
        
//         try {
//           // Clone the response to read it without consuming the original
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
        
//         // Get frontend origin for debugging
//         const frontendOrigin = typeof window !== 'undefined' 
//           ? window.location.origin 
//           : 'server-side';
        
//         // Log detailed error information
//         console.error('❌ Origin validation failed');
//         console.error('Status:', res.status);
//         console.error('Status Text:', res.statusText);
//         console.error('Error Message:', errorMessage);
//         console.error('Frontend Origin:', frontendOrigin);
//         console.error('API URL:', url);
//         console.error('Request Headers:', Object.fromEntries(Object.entries(commonHeaders)));
//         console.error('Response Headers:', Object.fromEntries(res.headers.entries()));
        
//         // Return empty data instead of throwing to prevent UI crashes
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
//     const base = unwrap<Program[]>(json);
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
//     console.error('Error fetching programs:', e);
//     return {
//       success: true,
//       data: [],
//       pagination: ensurePagination(undefined, 0, params?.page, params?.limit),
//     };
//   }
// };

// export const getProgramById = async (id: string): Promise<ProgramResponse<Program>> => {
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
    
//     const url = `${api.baseUrl}/programs/${id}`;
//     const res = await fetch(url, { headers: commonHeaders });

//     if (!res.ok) {
//       if (res.status === 404) return { success: true, data: undefined as unknown as Program };
      
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
        
//         console.error('❌ Origin validation failed (getProgramById)');
//         console.error('Status:', res.status);
//         console.error('Error Message:', errorMessage);
//         console.error('Frontend Origin:', frontendOrigin);
//         console.error('API URL:', url);
        
//         return {
//           success: false,
//           data: undefined as unknown as Program,
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
//     return unwrap<Program>(json);
//   } catch (e) {
//     console.error('Error fetching program by id:', e);
//     return { success: true, data: undefined as unknown as Program };
//   }
// };

// export const getProgramBySlug = async (slug: string): Promise<ProgramResponse<Program>> => {
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
    
//     const url = `${api.baseUrl}/programs/slug/${slug}`;
//     const res = await fetch(url, { headers: commonHeaders });

//     if (!res.ok) {
//       if (res.status === 404) return { success: true, data: undefined as unknown as Program };
      
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
        
//         console.error('❌ Origin validation failed (getProgramBySlug)');
//         console.error('Status:', res.status);
//         console.error('Error Message:', errorMessage);
//         console.error('Frontend Origin:', frontendOrigin);
//         console.error('API URL:', url);
        
//         return {
//           success: false,
//           data: undefined as unknown as Program,
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
//     return unwrap<Program>(json);
//   } catch (e) {
//     console.error('Error fetching program by slug:', e);
//     return { success: true, data: undefined as unknown as Program };
//   }
// };

import { api } from '../../config';
import { ensurePagination } from '../../lib/pagination';
import { Program, ProgramInput, ProgramResponse } from '../../types/program';

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string; pagination?: ProgramResponse['pagination'] } & T) => {
  if ('success' in response) {
    return response as ProgramResponse<T>;
  }
  return { success: true, data: response } satisfies ProgramResponse<T>;
};

type ProgramQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
};

export const getAllPrograms = async (params?: ProgramQueryParams): Promise<ProgramResponse<Program[]>> => {
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

    const res = await fetch(
      `${api.baseUrl}/programs${query.toString() ? `?${query.toString()}` : ''}`,
      { headers: commonHeaders }
    );

    if (!res.ok) {
      if (res.status === 404) return { success: true, data: [] };
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const json = await res.json();
    const base = unwrap<Program[]>(json);
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
    console.error('Error fetching programs:', e);
    return {
      success: true,
      data: [],
      pagination: ensurePagination(undefined, 0, params?.page, params?.limit),
    };
  }
};

export const getProgramById = async (id: string): Promise<ProgramResponse<Program>> => {
  try {
    const lang = typeof window !== 'undefined'
      ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
      : undefined;
    const commonHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
    };
    const res = await fetch(`${api.baseUrl}/programs/${id}`, { headers: commonHeaders });

    if (!res.ok) {
      if (res.status === 404) return { success: true, data: undefined as unknown as Program };
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const json = await res.json();
    return unwrap<Program>(json);
  } catch (e) {
    console.error('Error fetching program by id:', e);
    return { success: true, data: undefined as unknown as Program };
  }
};

export const getProgramBySlug = async (slug: string): Promise<ProgramResponse<Program>> => {
  try {
    const lang = typeof window !== 'undefined'
      ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
      : undefined;
    const commonHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
    };
    const res = await fetch(`${api.baseUrl}/programs/slug/${slug}`, { headers: commonHeaders });

    if (!res.ok) {
      if (res.status === 404) return { success: true, data: undefined as unknown as Program };
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const json = await res.json();
    return unwrap<Program>(json);
  } catch (e) {
    console.error('Error fetching program by slug:', e);
    return { success: true, data: undefined as unknown as Program };
  }
};

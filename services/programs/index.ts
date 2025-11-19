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

import apiClient from '@/lib/apiClient';
import { buildRequestPayload } from '@/lib/formData';
import { Program, ProgramInput, ProgramResponse } from '@/types/program';

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string } & T) => {
  if ('success' in response) {
    return response as ProgramResponse<T>;
  }
  return { success: true, data: response } satisfies ProgramResponse<T>;
};

export const getAllPrograms = async (): Promise<ProgramResponse<Program[]>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const { data } = await apiClient.get('/programs', {
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  return unwrap<Program[]>(data);
};

export const getProgramById = async (id: string): Promise<ProgramResponse<Program>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const { data } = await apiClient.get(`/programs/${id}`, {
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  return unwrap<Program>(data);
};

export const getProgramBySlug = async (slug: string): Promise<ProgramResponse<Program>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const { data } = await apiClient.get(`/programs/slug/${slug}`, {
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  return unwrap<Program>(data);
};

export const createProgram = async (programData: ProgramInput): Promise<ProgramResponse<Program>> => {
  const { body, headers } = buildRequestPayload({ ...programData });
  const { data } = await apiClient.post('/programs', body, headers ? { headers } : undefined);
  return unwrap<Program>(data);
};

export const updateProgram = async (
  id: string,
  programData: Partial<ProgramInput>
): Promise<ProgramResponse<Program>> => {
  // Mirror blog PUT behavior:
  // - Omit unchanged thumbnail (string/empty)
  // - Split media array into existing (string URLs) and new File uploads
  const payload: Record<string, unknown> = { ...programData };

  const isFile = (v: unknown): v is File => typeof File !== 'undefined' && v instanceof File;

  // Thumbnail
  const thumb = payload.thumbnail as unknown;
  const thumbIsString = typeof thumb === 'string';
  const thumbIsFile = isFile(thumb);
  const thumbIsEmpty = thumb === '' || thumb === undefined || thumb === null;
  if (thumbIsEmpty || thumbIsString) {
    delete (payload as Record<string, unknown>).thumbnail;
  }

  // Media
  const mediaArray = Array.isArray(payload.media) ? (payload.media as Array<string | File>) : [];
  const existingMedia = mediaArray.filter((m): m is string => typeof m === 'string' && m !== '');
  const newMediaFiles = mediaArray.filter((m): m is File => isFile(m));

  const mustUseFormData = thumbIsFile || newMediaFiles.length > 0;

  if (!mustUseFormData) {
    // JSON branch: send keep list as both media and existingMedia for backend compatibility
    const jsonPayload: Record<string, unknown> = { ...payload };
    if (jsonPayload.media !== undefined) {
      jsonPayload.media = existingMedia;
      (jsonPayload as any).existingMedia = existingMedia;
    }
    const { data } = await apiClient.put(`/programs/${id}`, jsonPayload);
    return unwrap<Program>(data);
  }

  // FormData branch
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'media' || key === 'thumbnail') return;
    if (value === undefined || value === null) return;
    formData.append(key, String(value));
  });

  if (thumbIsFile) {
    formData.append('thumbnail', thumb);
  }

  // Existing media to keep
  formData.append('existingMedia', JSON.stringify(existingMedia));

  // New media files
  newMediaFiles.forEach((file) => {
    formData.append('media', file);
  });

  const { data } = await apiClient.put(`/programs/${id}`, formData);
  return unwrap<Program>(data);
};

export const deleteProgram = async (id: string): Promise<ProgramResponse<null>> => {
  const { data } = await apiClient.delete(`/programs/${id}`);
  if (data?.success !== undefined) return data;
  return { success: true, data: null, message: 'Program deleted' };
};


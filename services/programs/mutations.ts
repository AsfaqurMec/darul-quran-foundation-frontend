import apiClient from '../../lib/apiClient';
import { buildRequestPayload } from '../../lib/formData';
import type { Program, ProgramInput, ProgramResponse } from '../../types/program';

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string } & T) => {
  if ('success' in response) {
    return response as ProgramResponse<T>;
  }
  return { success: true, data: response } satisfies ProgramResponse<T>;
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


import apiClient from '@/lib/apiClient';
import { buildRequestPayload } from '@/lib/formData';

export interface HeroImage {
  id?: string;
  image: string;
  title?: string;
  description?: string;
  order?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type HeroImageInput = {
  image: string | File;
  title?: string;
  description?: string;
  order?: number;
  isActive?: boolean;
};

export interface HeroImageResponse<T = HeroImage | HeroImage[]> {
  success: boolean;
  data?: T;
  message?: string;
}

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string } & T) => {
  if ('success' in response) {
    return response as HeroImageResponse<T>;
  }
  return { success: true, data: response } satisfies HeroImageResponse<T>;
};

export const getAllHeroImages = async (): Promise<HeroImageResponse<HeroImage[]>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const { data } = await apiClient.get('/hero-images', {
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  return unwrap<HeroImage[]>(data);
};

export const getHeroImageById = async (id: string): Promise<HeroImageResponse<HeroImage>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const { data } = await apiClient.get(`/hero-images/${id}`, {
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  return unwrap<HeroImage>(data);
};

export const getActiveHeroImages = async (): Promise<HeroImageResponse<HeroImage[]>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;
  const { data } = await apiClient.get('/hero-images?isActive=true', {
    headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
  });
  return unwrap<HeroImage[]>(data);
};

// Alias for consistency
export const getAllActiveHeroImages = getActiveHeroImages;

export const createHeroImage = async (heroImageData: HeroImageInput): Promise<HeroImageResponse<HeroImage>> => {
  const { body, headers } = buildRequestPayload({ ...heroImageData });
  const { data } = await apiClient.post('/hero-images', body, headers ? { headers } : undefined);
  return unwrap<HeroImage>(data);
};

export const updateHeroImage = async (
  id: string,
  heroImageData: Partial<HeroImageInput>
): Promise<HeroImageResponse<HeroImage>> => {
  // Omit image on PUT when it wasn't updated (still a string URL) or empty
  const payload: Record<string, unknown> = { ...heroImageData };
  const image = payload.image as unknown;
  const isStringImage = typeof image === 'string';
  const isEmptyImage = image === '' || image === undefined || image === null;

  if (isEmptyImage || isStringImage) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete (payload as Record<string, unknown>).image;
  }

  const { body, headers } = buildRequestPayload(payload);
  const { data } = await apiClient.put(`/hero-images/${id}`, body, headers ? { headers } : undefined);
  return unwrap<HeroImage>(data);
};

export const deleteHeroImage = async (id: string): Promise<HeroImageResponse<null>> => {
  const { data } = await apiClient.delete(`/hero-images/${id}`);
  if (data?.success !== undefined) return data;
  return { success: true, data: null, message: 'Hero image deleted' };
};


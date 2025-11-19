import apiClient from '@/lib/apiClient';
import { buildRequestPayload } from '@/lib/formData';
import { api } from '@/config';

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
}

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string } & T) => {
  if ('success' in response) {
    return response as ActivityResponse<T>;
  }
  return { success: true, data: response } satisfies ActivityResponse<T>;
};

export const getAllActivities = async (): Promise<ActivityResponse<Activity[]>> => {
  try {
    const lang = typeof window !== 'undefined'
      ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
      : undefined;
    const commonHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
    };
    // Try public, token-less route first
    let res = await fetch(`${api.baseUrl}/programs`, { headers: commonHeaders });

    if (res.status === 401 || res.status === 403) {
      // Fallbacks for different deployments
      const fallbacks = ['/activities', '/activities/public', '/public/activities', '/public/programs'];
      for (const p of fallbacks) {
        const alt = await fetch(`${api.baseUrl}${p}`, { headers: commonHeaders });
        if (alt.ok) {
          const json = await alt.json();
          return unwrap<Activity[]>(json);
        }
      }
    }

    if (!res.ok) {
      if (res.status === 404) return { success: true, data: [] };
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const json = await res.json();
    return unwrap<Activity[]>(json);
  } catch (e) {
    console.error('Error fetching activities:', e);
    return { success: true, data: [] };
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

export const createActivity = async (activityData: ActivityInput): Promise<ActivityResponse<Activity>> => {
  const { body, headers } = buildRequestPayload({ ...activityData });
  const { data } = await apiClient.post('/activities', body, headers ? { headers } : undefined);
  return unwrap<Activity>(data);
};

export const updateActivity = async (
  id: string,
  activityData: Partial<ActivityInput>
): Promise<ActivityResponse<Activity>> => {
  const { body, headers } = buildRequestPayload({ ...activityData });
  const { data } = await apiClient.put(`/activities/${id}`, body, headers ? { headers } : undefined);
  return unwrap<Activity>(data);
};

export const deleteActivity = async (id: string): Promise<ActivityResponse<null>> => {
  const { data } = await apiClient.delete(`/activities/${id}`);
  if (data?.success !== undefined) return data;
  return { success: true, data: null, message: 'Activity deleted' };
};


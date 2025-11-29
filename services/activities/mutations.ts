import apiClient from '../../lib/apiClient';
import { buildRequestPayload } from '../../lib/formData';
import type { Activity, ActivityInput, ActivityResponse } from './index';

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string } & T) => {
  if ('success' in response) {
    return response as ActivityResponse<T>;
  }
  return { success: true, data: response } satisfies ActivityResponse<T>;
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



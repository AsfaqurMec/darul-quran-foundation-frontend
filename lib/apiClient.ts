import axios from 'axios';
import { config } from '../config';
import { getClientToken } from './tokenUtils';

const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
});

apiClient.interceptors.request.use((request) => {
  const token = getClientToken();
  if (token) {
    request.headers = request.headers ?? {};
    request.headers.Authorization = `Bearer ${token}`;
  }

  // Ensure correct Content-Type handling:
  // - If sending FormData, let the browser/axios set the multipart boundary automatically
  // - Otherwise, default to application/json for requests with plain objects
  const hasBody =
    typeof request.data !== 'undefined' && request.method && ['post', 'put', 'patch'].includes(request.method.toLowerCase());

  if (hasBody) {
    const isFormData = typeof FormData !== 'undefined' && request.data instanceof FormData;
    request.headers = request.headers ?? {};
    if (isFormData) {
      // Delete any preset content-type so axios can set the correct multipart boundary
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete (request.headers as Record<string, unknown>)['Content-Type'];
    } else {
      // For JSON bodies, set the content-type if not already provided explicitly
      if (!request.headers['Content-Type']) {
        request.headers['Content-Type'] = 'application/json';
      }
    }
  }

  return request;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message = error.response.data?.message ?? error.message;
      return Promise.reject(new Error(message));
    }
    if (error.request) {
      return Promise.reject(new Error('No response received from server'));
    }
    return Promise.reject(error);
  }
);

export default apiClient;

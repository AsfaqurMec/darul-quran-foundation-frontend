import { config } from '../config';

export const getImageUrl = (url: string | undefined | null): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')) {
    return url;
  }
  // Extract filename from path like /uploads/img3-1763046602096-956768525.png
  if (url.startsWith('/uploads/')) {
    const filename = url.replace('/uploads/', '');
    return `/api/uploads/${filename}`;
  }
  if (url.startsWith('uploads/')) {
    return `/api/uploads/${url.replace('uploads/', '')}`;
  }
  // If it's just a filename, assume it's in uploads
  if (url.includes('/') === false && url.includes('.')) {
    return `/api/uploads/${url}`;
  }
  // Fallback to full API URL
  if (url.startsWith('/')) {
    return `${config.api.baseUrl}${url}`;
  }
  return `${config.api.baseUrl}/${url}`;
};


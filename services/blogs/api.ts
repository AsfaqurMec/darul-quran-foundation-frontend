import apiClient from '@/lib/apiClient';
import { buildRequestPayload } from '@/lib/formData';

export interface Blog {
  id?: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnail: string;
  readTime: string;
  images: string[];
  fullContent: string;
  createdAt?: string;
  updatedAt?: string;
}

export type BlogInput = {
  title: string;
  excerpt: string;
  date: string;
  thumbnail: string | File;
  readTime?: string;
  images: (string | File)[];
  fullContent: string;
};

export interface BlogResponse<T = Blog | Blog[]> {
  success: boolean;
  data?: T;
  message?: string;
}

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string } & T) => {
  if ('success' in response) {
    return response as BlogResponse<T>;
  }
  return { success: true, data: response } satisfies BlogResponse<T>;
};

export const getAllBlogs = async (): Promise<BlogResponse<Blog[]>> => {
  const { data } = await apiClient.get('/blogs');
  return unwrap<Blog[]>(data);
};

export const getBlogById = async (id: string): Promise<BlogResponse<Blog>> => {
  const { data } = await apiClient.get(`/blogs/${id}`);
  return unwrap<Blog>(data);
};

export const createBlog = async (blogData: BlogInput): Promise<BlogResponse<Blog>> => {
  const { body, headers } = buildRequestPayload({ ...blogData });
  const { data } = await apiClient.post('/blogs', body, headers ? { headers } : undefined);
  return unwrap<Blog>(data);
};

export const updateBlog = async (
  id: string,
  blogData: Partial<BlogInput>
): Promise<BlogResponse<Blog>> => {
  // Prepare payload to omit unchanged thumbnail and split images into existing/new
  const payload: Record<string, unknown> = { ...blogData };

  const isFile = (v: unknown): v is File => typeof File !== 'undefined' && v instanceof File;

  // Thumbnail handling: remove if unchanged (string URL) or empty
  const thumb = payload.thumbnail as unknown;
  const thumbIsString = typeof thumb === 'string';
  const thumbIsFile = isFile(thumb);
  const thumbIsEmpty = thumb === '' || thumb === undefined || thumb === null;
  if (thumbIsEmpty || thumbIsString) {
    delete (payload as Record<string, unknown>).thumbnail;
  }

  // Images handling: split existing string URLs and new File uploads
  const imagesArray = Array.isArray(payload.images) ? (payload.images as Array<string | File>) : [];
  const existingImages = imagesArray.filter((i): i is string => typeof i === 'string' && i !== '');
  const newImageFiles = imagesArray.filter((i): i is File => isFile(i));

  const mustUseFormData = thumbIsFile || newImageFiles.length > 0;

  if (!mustUseFormData) {
    // JSON branch: send keep list as both images and existingImages for backend compatibility
    const jsonPayload: Record<string, unknown> = { ...payload };
    if (jsonPayload.images !== undefined) {
      jsonPayload.images = existingImages;
      (jsonPayload as any).existingImages = existingImages;
    }
    const { data } = await apiClient.put(`/blogs/${id}`, jsonPayload);
    return unwrap<Blog>(data);
  }

  // FormData branch: send existing images separately and attach new files
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'images' || key === 'thumbnail') return;
    if (value === undefined || value === null) return;
    formData.append(key, String(value));
  });

  if (thumbIsFile) {
    formData.append('thumbnail', thumb);
  }

  // Existing images to keep
  formData.append('existingImages', JSON.stringify(existingImages));

  // New image files
  newImageFiles.forEach((file) => {
    formData.append('images', file);
  });

  const { data } = await apiClient.put(`/blogs/${id}`, formData);
  return unwrap<Blog>(data);
};

export const deleteBlog = async (id: string): Promise<BlogResponse<null>> => {
  const { data } = await apiClient.delete(`/blogs/${id}`);
  if (data?.success !== undefined) return data;
  return { success: true, data: null, message: 'Blog deleted' };
};


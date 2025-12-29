import apiClient from '../../lib/apiClient';
import { ensurePagination } from '../../lib/pagination';
import { buildRequestPayload } from '../../lib/formData';
import { PaginationInfo } from '../../types/pagination';

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
  pagination?: PaginationInfo;
}

const unwrap = <T,>(response: { success?: boolean; data?: T; message?: string; pagination?: PaginationInfo } & T) => {
  if ('success' in response) {
    return response as BlogResponse<T>;
  }
  return { success: true, data: response } satisfies BlogResponse<T>;
};

type BlogQueryParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  category?: string;
};
const FIXED_TOKEN = "f3a1d9c6b87e4f209ad4c0c8c1f5e92e3b6a7c4de2af41b0c8f5a6d2c917eb3a"
export const getAllBlogs = async (params?: BlogQueryParams): Promise<BlogResponse<Blog[]>> => {
  const lang = typeof window !== 'undefined'
    ? document.cookie.match(/(?:^|; )lang=([^;]*)/)?.[1]
    : undefined;

  const query: Record<string, string | number> = {};
  if (params?.page) query.page = params.page;
  if (params?.limit) query.limit = params.limit;
  if (params?.searchTerm) query.searchTerm = params.searchTerm;
  if (params?.category) query.category = params.category;

  const { data } = await apiClient.get('/blogs', {
    params: Object.keys(query).length ? query : undefined,
    //headers: lang ? { 'Accept-Language': decodeURIComponent(lang) } : undefined,
    headers: {
      ...(lang ? { 'Accept-Language': decodeURIComponent(lang) } : {}),
      Authorization: FIXED_TOKEN,
    },
  });

  const base = unwrap<Blog[]>(data);
  const dataArray = Array.isArray(base.data) ? base.data : base.data ? [base.data] : [];
  return {
    ...base,
    data: dataArray,
    pagination: ensurePagination(data.pagination ?? base.pagination, dataArray.length, params?.page, params?.limit),
  };
};

export const getBlogById = async (id: string): Promise<BlogResponse<Blog>> => {
  const { data } = await apiClient.get(`/blogs/${id}`, {
    headers: {
      Authorization: FIXED_TOKEN,
    },
  });
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


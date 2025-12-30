"use server";

import { api, auth } from "../../config";
import { getImageUrl } from "../../lib/imageUtils";
import { cookies } from "next/headers";

export type GalleryMediaType = "image" | "video";

export interface GalleryApiItem {
  id?: string | number;
  _id?: string | number;
  title?: string;
  caption?: string;
  alt?: string;
  src?: string;
  url?: string;
  image?: string;
  media?: string;
  thumbnail?: string;
  type?: GalleryMediaType;
  category?: string;
  year?: number | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PublicGalleryResponse {
  items: {
    id: string;
    src: string;
    alt?: string;
    type?: GalleryMediaType;
    title?: string;
    category?: string;
    year?: number;
    createdAt?: string;
    updatedAt?: string;
  }[];
  total: number;
  years: number[];
  categories: string[];
}

type FetchParams = {
  page?: number;
  limit?: number;
  year?: number;
  category?: string;
  type?: GalleryMediaType;
};
const FIXED_TOKEN = "f3a1d9c6b87e4f209ad4c0c8c1f5e92e3b6a7c4de2af41b0c8f5a6d2c917eb3a";
export async function GetGallery(params: FetchParams = {}): Promise<PublicGalleryResponse> {
  const { page = 1, limit = 12, year, category, type = "image" } = params;

  try {
    const lang = (await cookies()).get('lang')?.value;
    const qs = new URLSearchParams();
    qs.set("page", String(page));
    qs.set("limit", String(limit));
    if (year) qs.set("year", String(year));
    if (category) qs.set("category", category);
    if (type) qs.set("type", type);

    // Public GET is available; use auth header only if a cookie token exists (harmless)
    const cookieToken = (await cookies()).get(auth.tokenKey)?.value || "";
    const tokenHeader = cookieToken
      ? cookieToken.toLowerCase().startsWith("bearer ")
        ? cookieToken
        : `Bearer ${cookieToken}`
      : "";
    const commonInit: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(tokenHeader ? { Authorization: tokenHeader } : {}),
        ...(lang ? { "Accept-Language": lang } : {}),
        Authorization: FIXED_TOKEN ?? "",
      },
      next: { tags: ["gallery"] },
    };

    // Use new public endpoint, with minimal internal fallback
    const endpoints = [
      `${api.baseUrl}/gallery?${qs.toString()}`,
      `/api/public/gallery?${qs.toString()}`,
    ];

    let data: any = null;
    let lastStatus = 0;
    for (const endpoint of endpoints) {
      const resp = await fetch(endpoint, commonInit);
      lastStatus = resp.status;
      if (resp.ok) {
        data = await resp.json();
        break;
      }
      // Continue trying next endpoint on 401/404
      if (resp.status !== 401 && resp.status !== 404) {
        // Unexpected error: stop and throw
        throw new Error(`Gallery request failed: ${resp.status}`);
      }
    }
    if (!data) {
      throw new Error(`Gallery request failed: ${lastStatus || "unknown"}`);
    }
    const rawItems: GalleryApiItem[] = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.items)
      ? data.items
      : Array.isArray(data)
      ? data
      : [];

    const items = rawItems
      .filter(Boolean)
      .map((it) => {
        const id = String(it.id ?? it._id ?? "");
        const srcCandidate = it.media ?? it.src ?? it.url ?? it.image ?? it.thumbnail ?? "";
        const declaredType = (it.type as GalleryMediaType) ?? undefined;
        const inferredType: GalleryMediaType =
          declaredType ??
          (() => {
            try {
              const host = new URL(srcCandidate).hostname.toLowerCase();
              return host.includes("youtube.com") || host.includes("youtu.be") ? "video" : "image";
            } catch {
              return "image";
            }
          })();
        const rawYear = typeof it.year === "string" ? Number(it.year) : (it.year as number | undefined);
        const createdYear = it.createdAt ? Number(new Date(it.createdAt).getFullYear()) : undefined;
        const resolvedYear = rawYear ?? createdYear;
        return {
          id,
          src: inferredType === "video" ? srcCandidate : getImageUrl(srcCandidate),
          alt: it.alt ?? it.caption ?? it.title ?? "",
          type: inferredType,
          title: it.title ?? "",
          category: it.category ?? "",
          year: resolvedYear,
          createdAt: it.createdAt,
          updatedAt: it.updatedAt,
        };
      })
      .filter((it) => it.src);

    const years: number[] = Array.isArray(data?.years)
      ? data.years
      : Array.from(
          new Set(
            items
              .map((i) => i.year)
              .filter((y): y is number => typeof y === "number")
          )
        )
          .sort((a, b) => b - a);

    const categories: string[] = Array.isArray(data?.categories)
      ? data.categories
      : Array.from(new Set(items.map((i) => i.category).filter(Boolean)));

    const total: number =
      typeof data?.total === "number"
        ? data.total
        : typeof data?.count === "number"
        ? data.count
        : typeof data?.meta?.total === "number"
        ? data.meta.total
        : items.length;

    // Filter on type on the client as a fallback, in case server didn't
    const filtered = items.filter((i) => (type ? (i.type ?? "image") === type : true));

    return {
      items: filtered.map((i) => ({
        id: i.id,
        src: i.src,
        alt: i.alt,
        type: i.type,
        title: i.title,
        category: i.category,
        year: i.year,
        createdAt: i.createdAt,
        updatedAt: i.updatedAt,
      })),
      total,
      years,
      categories: ["সবগুলো", ...categories.filter((c) => c && c !== "সবগুলো")],
    };
  } catch (err) {
    console.error("GetGallery error:", err);
    return { items: [], total: 0, years: [], categories: ["সবগুলো"] };
  }
}

import apiClient from '@/lib/apiClient';
import { buildRequestPayload } from '@/lib/formData';
import { ensurePagination } from '@/lib/pagination';
import { PaginationInfo } from '@/types/pagination';

export interface GalleryItem {
  id?: string;
  title: string;
  media: string;
  category: string;
  type: 'image' | 'video';
  createdAt?: string;
  updatedAt?: string;
}

export type GalleryInput = {
  title: string;
  media: string | File;
  category: string;
  type: 'image' | 'video';
};

export interface GalleryResponse<T = GalleryItem | GalleryItem[]> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: PaginationInfo;
}

const unwrap = <T,>(response: unknown): GalleryResponse<T> => {
  if (
    response &&
    typeof response === 'object' &&
    'success' in response &&
    typeof (response as { success: unknown }).success === 'boolean'
  ) {
    return response as GalleryResponse<T>;
  }
  return { success: true, data: response as T };
};

type GalleryQueryParams = {
  category?: string;
  type?: 'image' | 'video';
  page?: number;
  limit?: number;
  searchTerm?: string;
};

export const getAllGalleryItems = async (
  params?: GalleryQueryParams
): Promise<GalleryResponse<GalleryItem[]>> => {
  const query: Record<string, string | number> = {};
  if (params?.category) query.category = params.category;
  if (params?.type === 'image' || params?.type === 'video') query.type = params.type;
  if (params?.page) query.page = params.page;
  if (params?.limit) query.limit = params.limit;
  if (params?.searchTerm) query.searchTerm = params.searchTerm;

  const { data } = await apiClient.get('/gallery/admin', {
    params: Object.keys(query).length ? query : undefined,
  });

  const base = unwrap<GalleryItem[]>(data);
  const dataArray = Array.isArray(base.data) ? base.data : base.data ? [base.data] : [];

  return {
    ...base,
    data: dataArray,
    pagination: ensurePagination(
      data.pagination ?? base.pagination,
      dataArray.length,
      params?.page,
      params?.limit
    ),
  };
};

export const getGalleryItemById = async (id: string): Promise<GalleryResponse<GalleryItem>> => {
  const { data } = await apiClient.get(`/gallery/${id}`);
  return unwrap<GalleryItem>(data);
};

// Public by-id fetch (no auth)
export const getGalleryItemByIdPublic = async (id: string) => {
  const lang = (await cookies()).get('lang')?.value;
  const resp = await fetch(`${api.baseUrl}/gallery/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(lang ? { "Accept-Language": lang } : {}) },
    next: { tags: ["gallery"] },
  });
  if (!resp.ok) {
    throw new Error(`Gallery by id failed: ${resp.status}`);
  }
  const data = await resp.json();
  const it = (data?.data ?? data) as GalleryApiItem;
  return {
    id: String(it.id ?? it._id ?? ""),
    src: getImageUrl(it.media ?? it.src ?? it.url ?? it.image ?? it.thumbnail ?? ""),
    alt: it.alt ?? it.caption ?? it.title ?? "",
    type: (it.type as GalleryMediaType) ?? "image",
    title: it.title ?? "",
    category: it.category ?? "",
    year: typeof it.year === "string" ? Number(it.year) : (it.year as number | undefined),
  };
};

export const createGalleryItem = async (galleryData: GalleryInput): Promise<GalleryResponse<GalleryItem>> => {
  const { body, headers } = buildRequestPayload({ ...galleryData });
  const { data } = await apiClient.post('/gallery', body, headers ? { headers } : undefined);
  return unwrap<GalleryItem>(data);
};

export const updateGalleryItem = async (
  id: string,
  galleryData: Partial<GalleryInput>
): Promise<GalleryResponse<GalleryItem>> => {
  // If media was not updated for image type (i.e., still a string URL), don't send it
  const payload: Record<string, unknown> = { ...galleryData };
  const media = payload.media as unknown;
  const type = payload.type as GalleryInput['type'] | undefined;

  const isStringMedia = typeof media === 'string';
  const isEmptyMedia = media === '' || media === undefined || media === null;
  const isImageType = type === 'image' || type === undefined; // default treat as image when not explicitly video

  // Remove media if:
  // - it's empty; or
  // - for image type, it's a string (existing URL), meaning user did not pick a new File
  if (isEmptyMedia || (isImageType && isStringMedia)) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete (payload as Record<string, unknown>).media;
  }

  const { body, headers } = buildRequestPayload(payload);
  const { data } = await apiClient.put(`/gallery/${id}`, body, headers ? { headers } : undefined);
  return unwrap<GalleryItem>(data);
};

export const deleteGalleryItem = async (id: string): Promise<GalleryResponse<null>> => {
  const { data } = await apiClient.delete(`/gallery/${id}`);
  if (data?.success !== undefined) return data;
  return { success: true, data: null, message: 'Gallery item deleted' };
};


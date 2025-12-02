"use server";

import { api, auth } from '../../config';
import { cookies } from 'next/headers';
import type { GalleryCategory } from './index';

// Public server-side function for fetching categories (no auth required)
export async function GetGalleryCategories(): Promise<GalleryCategory[]> {
  try {
    const lang = (await cookies()).get('lang')?.value;
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
      },
      next: { tags: ["gallery-category"] },
    };

    // Try public endpoint first, then fallback
    const endpoints = [
      `${api.baseUrl}/gallery-category`,
      `/api/public/gallery-category`,
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
        throw new Error(`Gallery category request failed: ${resp.status}`);
      }
    }
    
    if (!data) {
      throw new Error(`Gallery category request failed: ${lastStatus || "unknown"}`);
    }

    const rawCategories: GalleryCategory[] = Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data)
      ? data
      : [];

    return rawCategories.map((cat) => ({
      id: String(cat.id ?? cat._id ?? ""),
      title: cat.title ?? "",
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt,
    }));
  } catch (err) {
    console.error("GetGalleryCategories error:", err);
    return [];
  }
}


"use server";

import { NextRequest } from "next/server";
import { api } from "@/config";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const qs = url.searchParams.toString();

  const serviceToken =
    process.env.GALLERY_SERVICE_TOKEN ||
    process.env.NEXT_PUBLIC_PUBLIC_TOKEN ||
    "";
  const tokenHeader =
    serviceToken && serviceToken.toLowerCase().startsWith("bearer ")
      ? serviceToken
      : serviceToken
      ? `Bearer ${serviceToken}`
      : "";

  try {
    const upstream = await fetch(`${api.baseUrl}/gallery?${qs}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(tokenHeader ? { Authorization: tokenHeader } : {}),
      },
      // Don't cache in dev; users may change items frequently
      next: { revalidate: 0, tags: ["gallery"] },
    });

    const data = await upstream.json().catch(() => ({}));
    return new Response(JSON.stringify(data), {
      status: upstream.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, message: "Upstream error" }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }
}



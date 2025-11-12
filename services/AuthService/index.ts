"use client";

import { FieldValues } from "react-hook-form";
import { api } from "@/config";

export interface AuthResponse<TData = unknown> {
  success: boolean;
  message: string;
  data?: TData;
}

export interface LoginResponseData {
  accessToken?: string;
  refreshToken?: string;
  [key: string]: unknown;
}

type BackendLoginResponse = {
  success?: boolean;
  status?: string;
  message?: string;
  data?: LoginResponseData;
};

export async function loginUser(
  data: FieldValues,
): Promise<AuthResponse<LoginResponseData>> {
  try {
    const response = await fetch(`${api.baseUrl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as BackendLoginResponse;

    const isSuccessful =
      typeof result?.success === "boolean"
        ? result.success
        : result?.status === "success";

    return {
      success: Boolean(isSuccessful),
      message:
        result?.message ||
        (isSuccessful ? "Login successful" : "Login failed"),
      data: result?.data,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Network error. Please try again.",
    };
  }
}


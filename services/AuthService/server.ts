"use server";

import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { api } from "../../config";
import { JWTPayload } from "jose";

export const registerUser = async (data: unknown) => {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) {
    throw new Error("Access token not found");
  }
  try {
    const res = await fetch(`${api.baseUrl}/users/create-ResearchMembars`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    return Promise.reject(error);
  }
};

export async function loginUser(data: FieldValues) {
  try {
    const response = await fetch(`${api.baseUrl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (res.success) {
      (await cookies()).set("accessToken", res.data.accessToken);
      revalidateTag("loginuser");
      return {
        success: true,
        message: res.message || "Login successful",
        data: res.data,
      };
    }

    return { success: false, message: res.message || "Login failed" };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Network error. Please try again." };
  }
}

export const getCurrentUser = async () => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    const decodedData = await jwtDecode(accessToken);

    if (!decodedData || typeof decodedData !== "object") {
      return null;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedData.exp && decodedData.exp < currentTime) {
      (await cookies()).delete("accessToken");
      return null;
    }

    return decodedData as JWTPayload;
  } catch (error) {
    console.error("Error decoding token:", error);
    try {
      (await cookies()).delete("accessToken");
    } catch (e) {
      console.error("Error removing invalid token:", e);
    }
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
  revalidateTag("loginuser");
};

export const getNewToken = async () => {
  try {
    const res = await fetch(`${api.baseUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("__next_hmr_refresh_hash__")!
          .value,
      },
    });

    return res.json();
  } catch (error) {
    return Promise.reject(error);
  }
};


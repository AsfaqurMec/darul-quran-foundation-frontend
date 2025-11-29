"use server";

import { cookies } from "next/headers";
import { api } from "../../config";

export const ChangePassword = async (data: any) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("Access token not found");
    }

    const res = await fetch(`${api.baseUrl}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`, // Added Bearer if required
      },
      body: JSON.stringify(data), // Properly stringifying data
    });

    if (!res.ok) {
      throw new Error(`Failed to change password: ${res.statusText}`);
    }

    return await res.json();
  } catch (error: any) {
    return { error: error.message }; // Returning error object instead of throwing
  }
};

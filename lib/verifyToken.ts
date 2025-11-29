"use server";


///import { getNewToken } from "@/services/AuthService";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);

    return decoded.exp * 1000 < Date.now();
  } catch (err: any) {
    console.error(err);
    return true;
  }
};

export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies();

  const tokenCookie = cookieStore.get("accessToken");

  if (!tokenCookie?.value) {
    throw new Error("Access token not found");
  }

  const token = tokenCookie.value;

  if (await isTokenExpired(token)) {
    cookieStore.delete("accessToken");
    throw new Error("Access token expired");
  }

  return token;
};
import { getCurrentUser } from "@/services/AuthService/server";
import { getClientToken } from "@/lib/tokenUtils";

export interface Company {
  _id: string;
  name: string;
  status: string;
  createdAt: string;
  id: string;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Search companies by term
export const searchCompanies = async (
  searchTerm: string = ""
): Promise<{ success: boolean; data?: Company[]; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      console.warn("User not authenticated via getCurrentUser");
      // Don't throw error, just return empty result
      return { success: false, message: "User not authenticated" };
    }

    const token = getClientToken();
    console.log("Retrieved token from localStorage:", token);
    console.log("Token type:", typeof token);
    console.log("Token length:", token?.length);

    if (!token) {
      console.error("No token found in localStorage");
      console.log("localStorage contents:", Object.keys(localStorage));
      // Don't throw error, just return empty result
      return { success: false, message: "No access token found" };
    }

    const response = await fetch(
      `${API_BASE_URL}/company/search${
        searchTerm ? `?searchTerm=${searchTerm}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to search companies");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error searching companies:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to search companies",
    };
  }
};

// Get all companies
export const getAllCompanies = async (): Promise<{
  success: boolean;
  data?: Company[];
  message?: string;
}> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const token = getClientToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${API_BASE_URL}/company`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch companies");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error fetching companies:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch companies",
    };
  }
};

// Create new company
export const createCompany = async (
  name: string
): Promise<{
  success: boolean;
  data?: Company;
  message?: string;
}> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, message: "User not authenticated" };
    }

    const token = getClientToken();
    if (!token) {
      return { success: false, message: "No access token found" };
    }

    const response = await fetch(`${API_BASE_URL}/company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create company");
    }

    return {
      success: true,
      message: "Company created successfully",
      data: data.data || data,
    };
  } catch (error) {
    console.error("Error creating company:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create company",
    };
  }
};

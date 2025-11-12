import { getClientToken } from "@/lib/tokenUtils";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface User {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  companyName: string;
  fullAddress: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  company: string;
  fullAddress: string;
  images: string[];
}

export interface CreateUserResponse {
  success: boolean;
  message: string;
  data?: User;
}

// Get all users
export const getAllUsers = async (): Promise<{
  success: boolean;
  data?: User[];
  message?: string;
}> => {
  try {
    const token = getClientToken();
    if (!token) {
      return { success: false, message: "No access token found" };
    }

    const response = await fetch(`${API_BASE_URL}/users/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to fetch users",
      };
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error fetching all users:", error);
    return { success: false, message: "Failed to fetch users" };
  }
};

// Promote user role to admin
export const promoteRole = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getClientToken();
    if (!token) {
      return { success: false, message: "No access token found" };
    }

    const response = await fetch(`${API_BASE_URL}/users/userToadmin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to promote user",
      };
    }

    return {
      success: true,
      message: data.message || "Role updated successfully",
    };
  } catch (error) {
    console.error("Error changing role:", error);
    return { success: false, message: "Failed to change role" };
  }
};

// Create new user
export const createUser = async (
  userData: CreateUserRequest
): Promise<CreateUserResponse> => {
  try {
    console.log("createUser called with data:", userData);

    const token = getClientToken();
    console.log("Token retrieved:", token ? "Token exists" : "No token found");

    if (!token) {
      return { success: false, message: "No access token found" };
    }

    console.log("Making API request to:", `${API_BASE_URL}/users`);
    console.log("Request body:", JSON.stringify(userData));

    const response = await fetch(`${API_BASE_URL}/users/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log("API response:", data);

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to create user",
      };
    }

    return {
      success: true,
      message: "User created successfully",
      data: data.data || data,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: "Failed to create user" };
  }
};

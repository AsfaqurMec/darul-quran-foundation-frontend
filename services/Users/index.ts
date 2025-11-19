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
  role?: string;
  totalDonate?: number;
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

export interface CreateAdminRequest {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserRequest {
  fullName?: string;
  email?: string;
  role?: string;
  phone?: string;
  companyName?: string;
  fullAddress?: string;
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

// Create admin user
export const createAdminUser = async (
  adminData: CreateAdminRequest
): Promise<CreateUserResponse> => {
  try {
    const token = getClientToken();
    if (!token) {
      return { success: false, message: "No access token found" };
    }

    const response = await fetch(`${API_BASE_URL}/users/create-admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(adminData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to create admin user",
      };
    }

    return {
      success: true,
      message: "Admin user created successfully",
      data: data.data || data,
    };
  } catch (error) {
    console.error("Error creating admin user:", error);
    return { success: false, message: "Failed to create admin user" };
  }
};

// Get all users with pagination, search, and filters
export const getAllUsersPaginated = async (params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  role?: string;
}): Promise<{
  success: boolean;
  data?: User[];
  message?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}> => {
  try {
    const token = getClientToken();
    if (!token) {
      return { success: false, message: "No access token found" };
    }

    // Build query parameters
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);
    if (params?.role) queryParams.append("role", params.role);

    const queryString = queryParams.toString();
    const apiUrl = `${API_BASE_URL}/users${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(apiUrl, {
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

    return {
      success: true,
      data: data.data || data.users || data,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, message: "Failed to fetch users" };
  }
};

// Delete user
export const deleteUser = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getClientToken();
    if (!token) {
      return { success: false, message: "No access token found" };
    }

    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to delete user",
      };
    }

    return {
      success: true,
      message: data.message || "User deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: "Failed to delete user" };
  }
};

// Update user
export const updateUser = async (
  id: string,
  updateData: UpdateUserRequest
): Promise<{ success: boolean; message: string; data?: User }> => {
  try {
    const token = getClientToken();
    if (!token) {
      return { success: false, message: "No access token found" };
    }

    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Failed to update user",
      };
    }

    return {
      success: true,
      message: data.message || "User updated successfully",
      data: data.data || data,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: "Failed to update user" };
  }
};

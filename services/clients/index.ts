import config from "../../config";
import { getCurrentUser } from "../../services/AuthService/server";
import { getClientToken } from "../../lib/tokenUtils";
export interface Client {
  _id: string;
  fullName: string;
  nid: string;
  phoneNumber: string;
  district: string;
  fullAddress: string;
  photo: string;
  createdAt: string;
}

export interface CreateClientData {
  fullName: string;
  nid: string;
  phoneNumber: string;
  district: string;
  fullAddress: string;
  photo: File | null;
}

// Get all clients created by the logged-in user
export const getAllClients = async (params?: {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
}): Promise<{
  success: boolean;
  data?: Client[];
  message?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Extract user ID from the user object (following app convention)
    const userId = (user as any).sub || (user as any).id;
    if (!userId) {
      throw new Error("User ID not found");
    }

    const token = getClientToken();
    if (!token) {
      throw new Error("No access token found");
    }

    // Build query parameters
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);
    if (params?.sort) queryParams.append("sort", params.sort);

    const queryString = queryParams.toString();
    const apiUrl = `${config.api.baseUrl}/client/created-by/${userId}${
      queryString ? `?${queryString}` : ""
    }`;

  //    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

  //  console.log("Response status:", response.status);
    const data = await response.json();
   // console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch clients");
    }

    return {
      success: true,
      data: data.data || data.clients || data,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Error fetching clients:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch clients",
    };
  }
};

// Create a new client
export const createClient = async (
  clientData: CreateClientData
): Promise<{ success: boolean; data?: Client; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const token = getClientToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const formData = new FormData();
    formData.append("fullName", clientData.fullName);
    formData.append("nid", clientData.nid);
    formData.append("phoneNumber", clientData.phoneNumber);
    formData.append("district", clientData.district);
    formData.append("fullAddress", clientData.fullAddress);

    if (clientData.photo) {
      formData.append("photo", clientData.photo);
    }

  //  console.log("the creted data", formData);
    const response = await fetch(`${config.api.baseUrl}/client/create-client`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create client");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error creating client:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create client",
    };
  }
};

// Search clients by NID
export const searchClientsByNid = async (
  nid: string
): Promise<{ success: boolean; data?: Client[]; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const token = getClientToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${config.api.baseUrl}/client/search?nid=${encodeURIComponent(nid)}`,
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
      throw new Error(data.message || "Failed to search clients");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error searching clients:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to search clients",
    };
  }
};

// Delete a client
export const deleteClient = async (
  clientId: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const token = getClientToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${config.api.baseUrl}/client/${clientId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete client");
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting client:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete client",
    };
  }
};

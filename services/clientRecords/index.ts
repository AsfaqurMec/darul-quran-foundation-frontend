import { getCurrentUser } from "../../services/AuthService/server";
import { api } from "../../config";
import { getClientToken } from "../../lib/tokenUtils";

export interface ClientRecord {
  _id: string;
  clientId: string;
  disDate: string;
  amount: string;
  age: string;
  endingDate: string;
  bod: string;
  eod: string;
  note: string;
  noteStatus: "pending" | "completed" | "cancelled";
  installment: string;
  company: string;
  createdAt: string;
}

export interface CreateClientRecordData {
  client: string;
  disDate: string;
  amount: number;
  endingDate: string;
  bod: number;
  eod: number;
  note: string;
  installment: number;
  company: string;
}



// Get all records for a specific client
export const getClientRecords = async (
  clientId: string
): Promise<{ success: boolean; data?: ClientRecord[]; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const token = getClientToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api.baseUrl}/client/nid/${clientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch client records");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error fetching client records:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch client records",
    };
  }
};

// Get records by client ID
export const getRecordsByClientId = async (
  clientId: string
): Promise<{ success: boolean; data?: ClientRecord[]; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const token = getClientToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${api.baseUrl}/clients-record/client/${clientId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch client records");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error fetching client records:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch client records",
    };
  }
};

// Get records by client NID and user ID
export const getRecordsByClientNidAndUser = async (
clientNid: string): Promise<{ success: boolean; data?: ClientRecord[]; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Extract user ID from the user object
    const userId = (user as any).sub || (user as any).id;
    if (!userId) {
      throw new Error("User ID not found");
    }

    const token = getClientToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${api.baseUrl}/clients-record/by-client-nid/${clientNid}/user/${userId}`,
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
      throw new Error(data.message || "Failed to fetch client records");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error fetching client records:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch client records",
    };
  }
};

// Create a new client record
export const createClientRecord = async (
  recordData: CreateClientRecordData
): Promise<{ success: boolean; data?: ClientRecord; message?: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    const token = getClientToken();
    if (!token) {
      throw new Error("No access token found");
    }

  //  console.log("Creating client record with data:", recordData);

    const response = await fetch(`${api.baseUrl}/clients-record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recordData),
    });

  //  console.log("Response status:", response.status);
    const data = await response.json();
   // console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to create client record");
    }

    return { 
      success: true, 
      data: data.data || data,
      message: data.message || "Client record created successfully"
    };
  } catch (error) {
    console.error("Error creating client record:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create client record",
    };
  }
};

// Delete a client record
export const deleteClientRecord = async (
  recordId: string
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

    const response = await fetch(`${api.baseUrl}/client-records/${recordId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete client record");
    }

    return { success: true, message: data.message || "Client record deleted successfully" };
  } catch (error) {
    console.error("Error deleting client record:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete client record",
    };
  }
};

// Get all companies
export const getAllCompanies = async (): Promise<{
  success: boolean;
  data?: { _id: string; name: string }[];
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

    const response = await fetch(`${api.baseUrl}/companies`, {
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

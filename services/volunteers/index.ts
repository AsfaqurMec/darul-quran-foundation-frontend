import config from "@/config";
import { getClientToken } from "@/lib/tokenUtils";

export interface VolunteerApplication {
  _id: string;
  // Personal Information
  name: string;
  fatherName: string;
  mobileNumber: string;
  mobileCountryCode: string;
  email: string;
  
  // Professional Information
  currentProfession: string;
  organizationName: string;
  workplaceAddress: string;
  
  // Current Address
  currentDivision: string;
  currentDistrict: string;
  currentUpazila: string;
  currentUnion: string;
  currentFullAddress: string;
  
  // Permanent Address
  permanentDivision: string;
  permanentDistrict: string;
  permanentUpazila: string;
  permanentUnion: string;
  permanentFullAddress: string;
  
  // Overseas (if applicable)
  overseasCountry?: string;
  overseasAddress?: string;
  
  // Social Media
  facebookId?: string;
  linkedinId?: string;
  whatsappNumber?: string;
  whatsappCountryCode?: string;
  telegramNumber?: string;
  telegramCountryCode?: string;
  fbNotUsed: boolean;
  
  // Educational Qualification
  educationMedium: string;
  educationLevel: string;
  currentClassYear: string;
  departmentDegree?: string;
  lastInstitutionName: string;
  
  // Previous Volunteer Experience
  wasVolunteer: boolean;
  previousProjectName?: string;
  previousProjectLocation?: string;
  previousBatch?: string;
  previousBeneficiariesCount?: number;
  
  // Profile Image
  profileImage?: string;
  
  // Status
  status: 'pending' | 'approved' | 'rejected';
  
  createdAt: string;
  updatedAt: string;
}

export interface CreateVolunteerApplicationData {
  // Personal Information
  name: string;
  fatherName: string;
  mobileNumber: string;
  mobileCountryCode: string;
  email: string;
  
  // Professional Information
  currentProfession: string;
  organizationName: string;
  workplaceAddress: string;
  
  // Current Address
  currentDivision: string;
  currentDistrict: string;
  currentUpazila: string;
  currentUnion: string;
  currentFullAddress: string;
  
  // Permanent Address
  permanentDivision: string;
  permanentDistrict: string;
  permanentUpazila: string;
  permanentUnion: string;
  permanentFullAddress: string;
  
  // Overseas (if applicable)
  overseasCountry?: string;
  overseasAddress?: string;
  
  // Social Media
  facebookId?: string;
  linkedinId?: string;
  whatsappNumber?: string;
  whatsappCountryCode?: string;
  telegramNumber?: string;
  telegramCountryCode?: string;
  fbNotUsed: boolean;
  
  // Educational Qualification
  educationMedium: string;
  educationLevel: string;
  currentClassYear: string;
  departmentDegree?: string;
  lastInstitutionName: string;
  
  // Previous Volunteer Experience
  wasVolunteer: boolean;
  previousProjectName?: string;
  previousProjectLocation?: string;
  previousBatch?: string;
  previousBeneficiariesCount?: number;
  
  // Profile Image
  profileImage?: File | null;
}

// Create a new volunteer application
export const createVolunteerApplication = async (
  applicationData: CreateVolunteerApplicationData
): Promise<{ success: boolean; data?: VolunteerApplication; message?: string }> => {
  try {
    const formData = new FormData();
    
    // Personal Information
    formData.append("name", applicationData.name);
    formData.append("fatherName", applicationData.fatherName);
    formData.append("mobileNumber", applicationData.mobileNumber);
    formData.append("mobileCountryCode", applicationData.mobileCountryCode);
    formData.append("email", applicationData.email);
    
    // Professional Information
    formData.append("currentProfession", applicationData.currentProfession);
    formData.append("organizationName", applicationData.organizationName);
    formData.append("workplaceAddress", applicationData.workplaceAddress);
    
    // Current Address
    formData.append("currentDivision", applicationData.currentDivision);
    formData.append("currentDistrict", applicationData.currentDistrict);
    formData.append("currentUpazila", applicationData.currentUpazila);
    formData.append("currentUnion", applicationData.currentUnion);
    formData.append("currentFullAddress", applicationData.currentFullAddress);
    
    // Permanent Address
    formData.append("permanentDivision", applicationData.permanentDivision);
    formData.append("permanentDistrict", applicationData.permanentDistrict);
    formData.append("permanentUpazila", applicationData.permanentUpazila);
    formData.append("permanentUnion", applicationData.permanentUnion);
    formData.append("permanentFullAddress", applicationData.permanentFullAddress);
    
    // Overseas (if applicable)
    if (applicationData.overseasCountry) {
      formData.append("overseasCountry", applicationData.overseasCountry);
    }
    if (applicationData.overseasAddress) {
      formData.append("overseasAddress", applicationData.overseasAddress);
    }
    
    // Social Media
    formData.append("fbNotUsed", String(applicationData.fbNotUsed));
    if (applicationData.facebookId) {
      formData.append("facebookId", applicationData.facebookId);
    }
    if (applicationData.linkedinId) {
      formData.append("linkedinId", applicationData.linkedinId);
    }
    if (applicationData.whatsappNumber) {
      formData.append("whatsappNumber", applicationData.whatsappNumber);
      formData.append("whatsappCountryCode", applicationData.whatsappCountryCode || "+880");
    }
    if (applicationData.telegramNumber) {
      formData.append("telegramNumber", applicationData.telegramNumber);
      formData.append("telegramCountryCode", applicationData.telegramCountryCode || "+880");
    }
    
    // Educational Qualification
    formData.append("educationMedium", applicationData.educationMedium);
    formData.append("educationLevel", applicationData.educationLevel);
    formData.append("currentClassYear", applicationData.currentClassYear);
    if (applicationData.departmentDegree) {
      formData.append("departmentDegree", applicationData.departmentDegree);
    }
    formData.append("lastInstitutionName", applicationData.lastInstitutionName);
    
    // Previous Volunteer Experience
    formData.append("wasVolunteer", String(applicationData.wasVolunteer));
    if (applicationData.wasVolunteer) {
      if (applicationData.previousProjectName) {
        formData.append("previousProjectName", applicationData.previousProjectName);
      }
      if (applicationData.previousProjectLocation) {
        formData.append("previousProjectLocation", applicationData.previousProjectLocation);
      }
      if (applicationData.previousBatch) {
        formData.append("previousBatch", applicationData.previousBatch);
      }
      if (applicationData.previousBeneficiariesCount) {
        formData.append("previousBeneficiariesCount", String(applicationData.previousBeneficiariesCount));
      }
    }
    
    // Profile Image
    if (applicationData.profileImage) {
      formData.append("profileImage", applicationData.profileImage);
    }
    
    const response = await fetch(`${config.api.baseUrl}/volunteers`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit volunteer application");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error creating volunteer application:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to submit volunteer application",
    };
  }
};

// Get all volunteer applications with pagination and filters
export const getVolunteerApplications = async (params?: {
  page?: number;
  limit?: number;
  status?: 'pending' | 'approved' | 'rejected';
  searchTerm?: string;
}): Promise<{
  success: boolean;
  data?: VolunteerApplication[];
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
      throw new Error("No access token found");
    }

    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append("page", String(params.page));
    if (params?.limit) queryParams.append("limit", String(params.limit));
    if (params?.status) queryParams.append("status", params.status);
    if (params?.searchTerm) queryParams.append("searchTerm", params.searchTerm);

    const response = await fetch(
      `${config.api.baseUrl}/volunteers?${queryParams.toString()}`,
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
      throw new Error(data.message || "Failed to fetch volunteer applications");
    }

    return {
      success: true,
      data: data.data || data.items || [],
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Error fetching volunteer applications:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch volunteer applications",
    };
  }
};

// Update volunteer application status
export const updateVolunteerApplicationStatus = async (
  id: string,
  status: 'pending' | 'approved' | 'rejected'
): Promise<{ success: boolean; data?: VolunteerApplication; message?: string }> => {
  try {
    const token = getClientToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${config.api.baseUrl}/volunteers/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update volunteer application status");
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error updating volunteer application status:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update volunteer application status",
    };
  }
};

// Delete volunteer application
export const deleteVolunteerApplication = async (
  id: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const token = getClientToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await fetch(`${config.api.baseUrl}/volunteers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete volunteer application");
    }

    return { success: true, message: data.message || "Volunteer application deleted successfully" };
  } catch (error) {
    console.error("Error deleting volunteer application:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete volunteer application",
    };
  }
};


import { config } from '@/config';
import { getClientToken } from '@/lib/tokenUtils';

export interface MemberApplication {
  _id: string;
  type: 'lifetime' | 'donor';
  amount: number;
  name: string;
  fatherName: string;
  gender: 'male' | 'female';
  mobile: string;
  isOverseas: boolean;
  email?: string;
  district: string; // Actually occupation field
  reference?: string;
  address: string;
  paymentMethod: 'online' | 'bank_transfer' | 'bank_deposit';
  transactionId?: string;
  paymentDocument?: string; // File path/URL
  paymentStatus: 'pending' | 'completed' | 'pending_verification' | 'failed';
  applicationStatus: 'pending_approval' | 'approved' | 'rejected';
  sslcommerzValId?: string;
  sslcommerzData?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface MemberApplicationData {
  type: 'lifetime' | 'donor';
  amount: number;
  name: string;
  fatherName: string;
  gender: 'male' | 'female';
  mobile: string;
  isOverseas: boolean;
  email?: string;
  district: string; // Actually occupation field
  reference?: string;
  address: string;
  paymentMethod: 'online' | 'bank_transfer' | 'bank_deposit';
  transactionId?: string;
  paymentDocument?: File | null;
}

export interface MemberApplicationResponse {
  success: boolean;
  data?: any;
  message?: string;
}

/**
 * Submit member application with bank transfer or deposit (with file upload)
 */
export async function submitMemberApplication(
  data: MemberApplicationData
): Promise<MemberApplicationResponse> {
  try {
    const token = getClientToken();
    
    // For bank transfer/deposit, we need to send FormData
    const formData = new FormData();
    
    formData.append('type', data.type);
    formData.append('amount', data.amount.toString());
    formData.append('name', data.name);
    formData.append('fatherName', data.fatherName);
    formData.append('gender', data.gender);
    formData.append('mobile', data.mobile);
    formData.append('isOverseas', data.isOverseas.toString());
    if (data.email) {
      formData.append('email', data.email);
    }
    formData.append('district', data.district); // Actually occupation
    if (data.reference) {
      formData.append('reference', data.reference);
    }
    formData.append('address', data.address);
    formData.append('paymentMethod', data.paymentMethod);
    
    if (data.transactionId) {
      formData.append('transactionId', data.transactionId);
    }
    
    if (data.paymentDocument) {
      formData.append('paymentDocument', data.paymentDocument);
    }

    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${config.api.baseUrl}/members/apply`, {
      method: 'POST',
      headers,
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Failed to submit application',
      };
    }

    return {
      success: true,
      data: result.data || result,
      message: result.message || 'Application submitted successfully',
    };
  } catch (error) {
    console.error('Error submitting member application:', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to submit application',
    };
  }
}

/**
 * Initiate SSLCommerz payment for member application
 */
export interface InitiateMemberPaymentPayload {
  type: 'lifetime' | 'donor';
  amount: number;
  name: string;
  fatherName: string;
  gender: 'male' | 'female';
  mobile: string;
  isOverseas: boolean;
  email?: string;
  district: string; // Actually occupation
  reference?: string;
  address: string;
  successUrl?: string;
  failUrl?: string;
  cancelUrl?: string;
}

export interface InitiateMemberPaymentResponse {
  success: boolean;
  gatewayUrl?: string;
  message?: string;
}

export async function initiateMemberPayment(
  payload: InitiateMemberPaymentPayload
): Promise<InitiateMemberPaymentResponse> {
  try {
    const token = getClientToken();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${config.api.baseUrl}/members/initiate-payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to initiate payment',
      };
    }

    // Try different response shapes
    const gatewayUrl =
      data?.GatewayPageURL ??
      data?.data?.GatewayPageURL ??
      data?.gatewayUrl ??
      data?.data?.gatewayUrl;

    if (gatewayUrl) {
      return { success: true, gatewayUrl };
    }

    return {
      success: false,
      message: data.message || 'Gateway URL not received',
    };
  } catch (error) {
    console.error('Error initiating member payment:', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to initiate payment',
    };
  }
}

/**
 * Submit member application after successful online payment
 */
export interface SubmitMemberAfterPaymentData {
  transactionId: string;
  // SSLCommerz transaction details
  [key: string]: any;
}

export async function submitMemberAfterPayment(
  data: SubmitMemberAfterPaymentData
): Promise<MemberApplicationResponse> {
  try {
    const token = getClientToken();
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${config.api.baseUrl}/members/complete-payment`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Failed to complete application',
      };
    }

    return {
      success: true,
      data: result.data || result,
      message: result.message || 'Application completed successfully',
    };
  } catch (error) {
    console.error('Error completing member application:', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to complete application',
    };
  }
}

/**
 * Get all member applications with pagination and filters
 */
export const getMemberApplications = async (params?: {
  page?: number;
  limit?: number;
  status?: 'pending_approval' | 'approved' | 'rejected';
  paymentStatus?: 'pending' | 'completed' | 'pending_verification' | 'failed';
  type?: 'lifetime' | 'donor';
  searchTerm?: string;
}): Promise<{
  success: boolean;
  data?: MemberApplication[];
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
      throw new Error('No access token found');
    }

    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));
    if (params?.status) queryParams.append('status', params.status);
    if (params?.paymentStatus) queryParams.append('paymentStatus', params.paymentStatus);
    if (params?.type) queryParams.append('type', params.type);
    if (params?.searchTerm) queryParams.append('searchTerm', params.searchTerm);

    const response = await fetch(
      `${config.api.baseUrl}/members?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch member applications');
    }

    return {
      success: true,
      data: data.data || data.items || [],
      pagination: data.pagination,
    };
  } catch (error) {
    console.error('Error fetching member applications:', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to fetch member applications',
    };
  }
};

/**
 * Update member application status
 */
export const updateMemberApplicationStatus = async (
  id: string,
  status: 'pending_approval' | 'approved' | 'rejected'
): Promise<{ success: boolean; data?: MemberApplication; message?: string }> => {
  try {
    const token = getClientToken();
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${config.api.baseUrl}/members/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update member application status');
    }

    return { success: true, data: data.data || data };
  } catch (error) {
    console.error('Error updating member application status:', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to update member application status',
    };
  }
};

/**
 * Delete member application
 */
export const deleteMemberApplication = async (
  id: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const token = getClientToken();
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${config.api.baseUrl}/members/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete member application');
    }

    return { success: true, message: data.message || 'Member application deleted successfully' };
  } catch (error) {
    console.error('Error deleting member application:', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Failed to delete member application',
    };
  }
};


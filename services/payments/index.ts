import apiClient from '../../lib/apiClient';

export interface InitiatePaymentPayload {
  purpose: string;
  contact: string;
  amount: number;
  successUrl?: string;
  failUrl?: string;
  cancelUrl?: string;
}

export interface InitiatePaymentResponse {
  success: boolean;
  gatewayUrl?: string;
  message?: string;
}

/**
 * Initiates an SSLCommerz payment session on the backend and returns the gateway URL.
 * The backend should handle persisting donation data after a successful payment (via success/IPN).
 */
export async function initiateSslCommerzPayment(
  payload: InitiatePaymentPayload,
): Promise<InitiatePaymentResponse> {
  try {
    const { data } = await apiClient.post('/payments/sslcommerz/init', payload);
    // Try a few common shapes that backends return
    const gatewayUrl =
      data?.GatewayPageURL ??
      data?.data?.GatewayPageURL ??
      data?.gatewayUrl ??
      data?.data?.gatewayUrl;
    if (gatewayUrl) {
      return { success: true, gatewayUrl };
    }
    return { success: false, message: data?.message || 'Gateway URL not received' };
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : 'Failed to initiate SSLCommerz payment';
    return { success: false, message };
  }
}



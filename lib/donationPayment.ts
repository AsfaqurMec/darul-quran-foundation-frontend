export const DONATION_PAYMENT_STORAGE_KEY = 'dq:pendingDonation';
export const SSL_COMMERZ_REDIRECT_URL =
  'https://pay.sslcommerz.com/fc465790f2d4b448918839f798ccd6823911bd98';

export type DonationCachePayload = {
  purpose?: string;
  contact?: string;
  amount?: number;
  purposeLabel?: string;
  behalf?: string;
  name?: string;
};

export const storeDonationPayload = (payload: DonationCachePayload): void => {
  try {
    if (typeof window === 'undefined' || !window.sessionStorage) return;
    window.sessionStorage.setItem(DONATION_PAYMENT_STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Unable to store donation payload', error);
  }
};

export const readDonationPayload = (): DonationCachePayload | null => {
  try {
    if (typeof window === 'undefined' || !window.sessionStorage) return null;
    const cached = window.sessionStorage.getItem(DONATION_PAYMENT_STORAGE_KEY);
    return cached ? (JSON.parse(cached) as DonationCachePayload) : null;
  } catch (error) {
    console.warn('Unable to read donation payload', error);
    return null;
  }
};

export const clearDonationPayload = (): void => {
  try {
    if (typeof window === 'undefined' || !window.sessionStorage) return;
    window.sessionStorage.removeItem(DONATION_PAYMENT_STORAGE_KEY);
  } catch (error) {
    console.warn('Unable to clear donation payload', error);
  }
};

export const VALID_SSL_STATUSES = new Set(['VALID', 'VALIDATED', 'SUCCESS']);



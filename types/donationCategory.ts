export interface DonationCategory {
  id?: string;
  title: string;
  subtitle: string;
  video: string;
  description: string;
  slug: string;
  expenseCategory: string[];
  thumbnail: string;
  daily?: number[] | null;
  monthly?: number[] | null;
  amount?: number[] | null;
  formTitle: string;
  formDescription: string;
  createdAt?: string;
  updatedAt?: string;
}

export type DonationCategoryInput = {
  title: string;
  subtitle: string;
  video: string;
  description: string;
  slug: string;
  expenseCategory: string[];
  thumbnail: string | File;
  daily?: number[] | null;
  monthly?: number[] | null;
  amount?: number[] | null;
  formTitle: string;
  formDescription: string;
};

export interface DonationCategoryResponse<T = DonationCategory | DonationCategory[]> {
  success: boolean;
  data?: T;
  message?: string;
}


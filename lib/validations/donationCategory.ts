import { z } from 'zod';

// Helper function to generate URL-friendly slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// URL validation
const urlSchema = z.string().url('Must be a valid URL');

// Slug validation
const slugSchema = z
  .string()
  .min(1, 'Slug is required')
  .max(255, 'Slug must be less than 255 characters')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly (lowercase, hyphens only)');

// Number array validation
const numberArraySchema = z.array(z.number().positive('Amount must be positive')).optional().nullable();

// Create DonationCategory Schema
export const createDonationCategorySchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters'),
  subtitle: z
    .string()
    .min(1, 'Subtitle is required')
    .max(255, 'Subtitle must be less than 255 characters'),
  video: urlSchema,
  description: z.string().min(1, 'Description is required'),
  slug: slugSchema,
  expenseCategory: z.array(z.string().min(1)).min(1, 'At least one expense category is required'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  daily: numberArraySchema,
  monthly: numberArraySchema,
  amount: numberArraySchema,
  formTitle: z.string().min(1, 'Form Title is required'),
  formDescription: z.string().min(1, 'Form Description is required'),
}).refine(
  (data) => {
    // At least one of daily, monthly, or amount should be provided
    const hasDaily = data.daily && data.daily.length > 0;
    const hasMonthly = data.monthly && data.monthly.length > 0;
    const hasAmount = data.amount && data.amount.length > 0;
    return hasDaily || hasMonthly || hasAmount;
  },
  {
    message: 'At least one of daily, monthly, or amount must be provided',
  }
);

// Update DonationCategory Schema (all fields optional)
// `.partial()` only exists directly on ZodObject, so unwrap/refactor:
export const updateDonationCategorySchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters').optional(),
  subtitle: z.string().min(1, 'Subtitle is required').max(255, 'Subtitle must be less than 255 characters').optional(),
  video: z.string().url('Must be a valid URL').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  slug: z.string().min(1, 'Slug is required').max(255, 'Slug must be less than 255 characters').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly (lowercase, hyphens only)').optional(),
  expenseCategory: z.array(z.string().min(1)).min(1, 'At least one expense category is required').optional(),
  thumbnail: z.string().min(1, 'Thumbnail is required').optional(),
  daily: z.array(z.number().positive('Amount must be positive')).optional().nullable(),
  monthly: z.array(z.number().positive('Amount must be positive')).optional().nullable(),
  amount: z.array(z.number().positive('Amount must be positive')).optional().nullable(),
  formTitle: z.string().min(1, 'Form Title is required').optional(),
  formDescription: z.string().min(1, 'Form Description is required').optional(),
}).refine(
  (data) => {
    // Only run if any donation fields are present (for partial update)
    if (
      data.daily === undefined &&
      data.monthly === undefined &&
      data.amount === undefined
    ) {
      return true; // no donation fields = valid (updating other fields)
    }
    const hasDaily = Array.isArray(data.daily) && data.daily.length > 0;
    const hasMonthly = Array.isArray(data.monthly) && data.monthly.length > 0;
    const hasAmount = Array.isArray(data.amount) && data.amount.length > 0;
    return hasDaily || hasMonthly || hasAmount;
  },
  {
    message: 'At least one of daily, monthly, or amount must be provided if updating donation amounts',
  }
);

export type CreateDonationCategoryInput = z.infer<typeof createDonationCategorySchema>;
export type UpdateDonationCategoryInput = z.infer<typeof updateDonationCategorySchema>;


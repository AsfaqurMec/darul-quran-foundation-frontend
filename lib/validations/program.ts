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

// Create Program Schema
export const createProgramSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters'),
  subtitle: z
    .string()
    .min(1, 'Subtitle is required')
    .max(255, 'Subtitle must be less than 255 characters'),
  thumbnail: z.string().min(1, 'Thumbnail is required'),
  video: urlSchema,
  description: z.string().min(1, 'Description is required'),
  media: z
    .array(z.string())
    .min(1, 'At least one media image is required'),
  slug: slugSchema,
  area: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  beneficiary: z.array(z.string()).optional().default([]),
  expenseCategory: z.array(z.string()).optional().default([]),
  projectGoalsAndObjectives: z.array(z.string()).optional().default([]),
  activities: z.array(z.string()).optional().default([]),
});

// Update Program Schema (all fields optional)
export const updateProgramSchema = createProgramSchema.partial();

export type CreateProgramInput = z.infer<typeof createProgramSchema>;
export type UpdateProgramInput = z.infer<typeof updateProgramSchema>;


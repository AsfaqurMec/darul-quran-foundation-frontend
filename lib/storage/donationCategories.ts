import { DonationCategory, DonationCategoryInput } from '@/types/donationCategory';
import { generateSlug } from '@/lib/validations/donationCategory';

// In-memory storage (replace with database in production)
class DonationCategoryStorage {
  private categories: Map<string, DonationCategory> = new Map();
  private slugIndex: Map<string, string> = new Map(); // slug -> id mapping

  async create(input: DonationCategoryInput): Promise<DonationCategory> {
    // Check if slug already exists
    if (this.slugIndex.has(input.slug)) {
      throw new Error('Slug already exists');
    }

    const now = new Date().toISOString();
    const id = `doncat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const category: DonationCategory = {
      id,
      title: input.title,
      subtitle: input.subtitle,
      thumbnail: typeof input.thumbnail === 'string' ? input.thumbnail : '',
      video: input.video,
      description: input.description, // Preserve line breaks
      slug: input.slug,
      expenseCategory: input.expenseCategory,
      daily: input.daily ?? null,
      monthly: input.monthly ?? null,
      amount: input.amount ?? null,
      formTitle: input.formTitle,
      formDescription: input.formDescription,
      createdAt: now,
      updatedAt: now,
    };

    this.categories.set(id, category);
    this.slugIndex.set(input.slug, id);

    return category;
  }

  async findById(id: string): Promise<DonationCategory | null> {
    return this.categories.get(id) || null;
  }

  async findBySlug(slug: string): Promise<DonationCategory | null> {
    const id = this.slugIndex.get(slug);
    if (!id) return null;
    return this.categories.get(id) || null;
  }

  async findAll(): Promise<DonationCategory[]> {
    return Array.from(this.categories.values());
  }

  async update(id: string, input: Partial<DonationCategoryInput>): Promise<DonationCategory | null> {
    const existing = this.categories.get(id);
    if (!existing) return null;

    // Check slug uniqueness if slug is being updated
    if (input.slug && input.slug !== existing.slug) {
      if (this.slugIndex.has(input.slug)) {
        throw new Error('Slug already exists');
      }
      // Remove old slug from index
      this.slugIndex.delete(existing.slug);
      // Add new slug to index
      this.slugIndex.set(input.slug, id);
    }

    const updated: DonationCategory = {
      ...existing,
      ...(input.title && { title: input.title }),
      ...(input.subtitle && { subtitle: input.subtitle }),
      ...(input.thumbnail && { thumbnail: typeof input.thumbnail === 'string' ? input.thumbnail : existing.thumbnail }),
      ...(input.video && { video: input.video }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.slug && { slug: input.slug }),
      ...(input.expenseCategory !== undefined && { expenseCategory: input.expenseCategory }),
      ...(input.daily !== undefined && { daily: input.daily }),
      ...(input.monthly !== undefined && { monthly: input.monthly }),
      ...(input.amount !== undefined && { amount: input.amount }),
      ...(input.formTitle !== undefined && { formTitle: input.formTitle }),
      ...(input.formDescription !== undefined && { formDescription: input.formDescription }),
      updatedAt: new Date().toISOString(),
    };

    this.categories.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const category = this.categories.get(id);
    if (!category) return false;

    this.categories.delete(id);
    this.slugIndex.delete(category.slug);
    return true;
  }

  async exists(slug: string, excludeId?: string): Promise<boolean> {
    const id = this.slugIndex.get(slug);
    if (!id) return false;
    if (excludeId && id === excludeId) return false;
    return true;
  }
}

// Singleton instance
export const donationCategoryStorage = new DonationCategoryStorage();


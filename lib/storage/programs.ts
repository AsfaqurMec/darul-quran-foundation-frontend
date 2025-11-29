import { Program, ProgramInput } from '../../types/program';
import { generateSlug } from '../../lib/validations/program';

// In-memory storage (replace with database in production)
class ProgramStorage {
  private programs: Map<string, Program> = new Map();
  private slugIndex: Map<string, string> = new Map(); // slug -> id mapping

  async create(input: ProgramInput): Promise<Program> {
    // Check if slug already exists
    if (this.slugIndex.has(input.slug)) {
      throw new Error('Slug already exists');
    }

    const now = new Date().toISOString();
    const id = `prog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const program: Program = {
      id,
      tag: input.tag,
      image: input.image,
      title: input.title,
      subtitle: input.subtitle,
      thumbnail: typeof input.thumbnail === 'string' ? input.thumbnail : '',
      video: input.video,
      description: input.description, // Preserve line breaks
      media: input.media.map(m => typeof m === 'string' ? m : ''),
      slug: input.slug,
      area: input.area ?? null,
      duration: input.duration ?? null,
      beneficiary: input.beneficiary || [],
      expenseCategory: input.expenseCategory || [],
      projectGoalsAndObjectives: input.projectGoalsAndObjectives || [],
      activities: input.activities || [],
      createdAt: now,
      updatedAt: now,
    };

    this.programs.set(id, program);
    this.slugIndex.set(input.slug, id);

    return program;
  }

  async findById(id: string): Promise<Program | null> {
    return this.programs.get(id) || null;
  }

  async findBySlug(slug: string): Promise<Program | null> {
    const id = this.slugIndex.get(slug);
    if (!id) return null;
    return this.programs.get(id) || null;
  }

  async findAll(): Promise<Program[]> {
    return Array.from(this.programs.values());
  }

  async update(id: string, input: Partial<ProgramInput>): Promise<Program | null> {
    const existing = this.programs.get(id);
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

    const updated: Program = {
      ...existing,
      ...(input.title && { title: input.title }),
      ...(input.subtitle && { subtitle: input.subtitle }),
      ...(input.thumbnail && { thumbnail: typeof input.thumbnail === 'string' ? input.thumbnail : existing.thumbnail }),
      ...(input.video && { video: input.video }),
      ...(input.description !== undefined && { description: input.description }),
      ...(input.media && { media: input.media.map(m => typeof m === 'string' ? m : '') }),
      ...(input.slug && { slug: input.slug }),
      ...(input.area !== undefined && { area: input.area }),
      ...(input.duration !== undefined && { duration: input.duration }),
      ...(input.beneficiary !== undefined && { beneficiary: input.beneficiary }),
      ...(input.expenseCategory !== undefined && { expenseCategory: input.expenseCategory }),
      ...(input.projectGoalsAndObjectives !== undefined && { projectGoalsAndObjectives: input.projectGoalsAndObjectives }),
      ...(input.activities !== undefined && { activities: input.activities }),
      updatedAt: new Date().toISOString(),
    };

    this.programs.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const program = this.programs.get(id);
    if (!program) return false;

    this.programs.delete(id);
    this.slugIndex.delete(program.slug);
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
export const programStorage = new ProgramStorage();


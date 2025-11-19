export interface Program {
  id?: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  video: string;
  description: string;
  media: string[];
  slug: string;
  area?: string | null;
  duration?: string | null;
  beneficiary?: string[];
  expenseCategory?: string[];
  projectGoalsAndObjectives?: string[];
  activities?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export type ProgramInput = {
  title: string;
  subtitle: string;
  thumbnail: string | File;
  video: string;
  description: string;
  media: (string | File)[];
  slug: string;
  area?: string | null;
  duration?: string | null;
  beneficiary?: string[];
  expenseCategory?: string[];
  projectGoalsAndObjectives?: string[];
  activities?: string[];
};

export interface ProgramResponse<T = Program | Program[]> {
  success: boolean;
  data?: T;
  message?: string;
}


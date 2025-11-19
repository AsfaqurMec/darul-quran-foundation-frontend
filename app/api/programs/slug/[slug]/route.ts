import { NextRequest, NextResponse } from 'next/server';
import { programStorage } from '@/lib/storage/programs';
import { ProgramResponse, Program } from '@/types/program';

// GET /api/programs/slug/[slug] - Get program by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const program = await programStorage.findBySlug(slug);

    if (!program) {
      return NextResponse.json(
        {
          success: false,
          error: 'Program not found',
        },
        { status: 404 }
      );
    }

    const response: ProgramResponse<Program> = {
      success: true,
      data: program,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching program by slug:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch program',
      },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from 'next/server';
import { programStorage } from '../../../../lib/storage/programs';
import { updateProgramSchema } from '../../../../lib/validations/program';
import { ProgramResponse, Program } from '../../../../types/program';

// GET /api/programs/[id] - Get program by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const program = await programStorage.findById(id);

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
    console.error('Error fetching program:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch program',
      },
      { status: 500 }
    );
  }
}

// Helper to convert File to base64 data URL
async function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// PUT /api/programs/[id] - Update program
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contentType = request.headers.get('content-type') || '';
    let body: any;

    // Handle FormData
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      body = {};

      // Extract all form fields
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          // Convert file to data URL
          const dataUrl = await fileToDataURL(value);
          if (key === 'thumbnail') {
            body[key] = dataUrl;
          } else if (key === 'media') {
            // Handle multiple media files
            if (!body.media) body.media = [];
            body.media.push(dataUrl);
          } else {
            body[key] = dataUrl;
          }
        } else {
          const stringValue = value.toString();
          
          // Handle array fields that might be JSON strings
          if (key === 'beneficiary' || key === 'expenseCategory' || 
              key === 'projectGoalsAndObjectives' || key === 'activities') {
            // Skip if already processed (FormData can have duplicate keys)
            if (body[key] && Array.isArray(body[key])) continue;
            
            try {
              // Try to parse as JSON first
              const parsed = JSON.parse(stringValue);
              body[key] = Array.isArray(parsed) ? parsed : (parsed ? [parsed] : []);
            } catch {
              // If not JSON, treat as empty array or single item
              body[key] = stringValue ? [stringValue] : [];
            }
          } else if (key === 'media') {
            // Handle media as array (non-file values)
            if (!body.media) body.media = [];
            if (stringValue) {
              try {
                const parsed = JSON.parse(stringValue);
                if (Array.isArray(parsed)) {
                  body.media = [...body.media, ...parsed];
                } else {
                  body.media.push(parsed);
                }
              } catch {
                body.media.push(stringValue);
              }
            }
          } else {
            // Regular fields - only update if value is provided
            if (stringValue === 'null' || stringValue === '') {
              body[key] = null;
            } else if (stringValue !== null && stringValue !== undefined) {
              body[key] = stringValue;
            }
          }
        }
      }
    } else {
      // Handle JSON
      body = await request.json();
    }

    // Ensure array fields are arrays (fallback for update)
    const arrayFields = ['beneficiary', 'expenseCategory', 'projectGoalsAndObjectives', 'activities'];
    arrayFields.forEach(field => {
      if (body[field] !== undefined && !Array.isArray(body[field])) {
        if (typeof body[field] === 'string') {
          try {
            body[field] = JSON.parse(body[field]);
          } catch {
            body[field] = body[field] ? [body[field]] : [];
          }
        } else {
          body[field] = [];
        }
      }
    });

    // Check if program exists
    const existing = await programStorage.findById(id);
    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'Program not found',
        },
        { status: 404 }
      );
    }

    // Validate input
    const validatedData = updateProgramSchema.parse(body);

    // Check slug uniqueness if slug is being updated
    if (validatedData.slug && validatedData.slug !== existing.slug) {
      const slugExists = await programStorage.exists(validatedData.slug, id);
      if (slugExists) {
        return NextResponse.json(
          {
            success: false,
            error: 'Validation failed',
            message: 'Slug already exists',
          },
          { status: 400 }
        );
      }
    }

    // Update program
    const program = await programStorage.update(id, validatedData as any);

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
      message: 'Program updated successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating program:', error);

    if (error instanceof Error && (error as any).name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          message: (error as any).errors.map((e: any) => e.message).join(', '),
        },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === 'Slug already exists') {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          message: 'Slug already exists',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update program',
      },
      { status: 500 }
    );
  }
}

// DELETE /api/programs/[id] - Delete program
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await programStorage.delete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          error: 'Program not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Program deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete program',
      },
      { status: 500 }
    );
  }
}


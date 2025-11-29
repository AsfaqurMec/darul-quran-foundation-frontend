import { NextRequest, NextResponse } from 'next/server';
import { programStorage } from '../../../lib/storage/programs';
import { createProgramSchema } from '../../../lib/validations/program';
import { ProgramResponse, Program } from '../../../types/program';

// GET /api/programs - Get all programs
export async function GET(request: NextRequest) {
  try {
    const programs = await programStorage.findAll();

    const response: ProgramResponse<Program[]> = {
      success: true,
      data: programs,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch programs',
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

// POST /api/programs - Create a new program
export async function POST(request: NextRequest) {
  try {
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
            // Regular fields
            // Handle null/empty strings
            if (stringValue === 'null' || stringValue === '') {
              body[key] = null;
            } else {
              body[key] = stringValue;
            }
          }
        }
      }
    } else {
      // Handle JSON
      body = await request.json();
    }

    // Ensure array fields are arrays (fallback)
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
      } else if (body[field] === undefined) {
        body[field] = [];
      }
    });

    // Validate input
    const validatedData = createProgramSchema.parse(body);

    // Check if slug already exists
    const slugExists = await programStorage.exists(validatedData.slug);
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

    // Create program
    const program = await programStorage.create(validatedData as any);

    const response: ProgramResponse<Program> = {
      success: true,
      data: program,
      message: 'Program created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);

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
        error: 'Failed to create program',
      },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { fetchDoctors } from '@/services/api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

    // Validate cron secret
    if (!authHeader || authHeader !== expectedAuth) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Invalid or missing CRON_SECRET',
          timestamp: new Date().toISOString()
        },
        { status: 401 }
      );
    }

    // Fetch fresh data to ensure cache is warmed up
    const response = await fetchDoctors(1, 100);
    const totalDoctors = response?.pagination?.totalAvailable || 0;

    // Revalidate cache tags
    await Promise.all([
      // @ts-expect-error - Next.js 16 type definition issue
      revalidateTag('doctors-list'),
      // @ts-expect-error - Next.js 16 type definition issue
      revalidateTag('doctors-detail')
    ]);

    // Return success response
    return NextResponse.json({
      success: true,
      revalidated: true,
      totalDoctors,
      timestamp: new Date().toISOString(),
      message: `Successfully revalidated ${totalDoctors} doctors cache`,
      tags: ['doctors-list', 'doctors-detail']
    });

  } catch (error) {
    console.error('Cron revalidation error:', error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Failed to revalidate doctors cache',
        timestamp: new Date().toISOString(),
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Handle POST requests as well (some cron services use POST)
export async function POST(request: NextRequest) {
  return GET(request);
}
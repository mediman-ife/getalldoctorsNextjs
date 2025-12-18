import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { fetchDoctors, getAllDoctorsForStaticParams } from '@/services/api';
import { googleIndexingService } from '@/services/googleIndexing';

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
    const doctors = response?.data || [];

    // Revalidate cache tags
    await Promise.all([
      // @ts-expect-error - Next.js 16 type definition issue
      revalidateTag('doctors-list'),
      // @ts-expect-error - Next.js 16 type definition issue
      revalidateTag('doctors-detail')
    ]);

    // Auto-request Google indexing for all doctor profiles
    let indexingResults = { successes: 0, failures: 0, indexed: false };

    // Fetch ALL doctors for indexing, not just the first page
    const allDoctorsForIndexing = await getAllDoctorsForStaticParams();

    // Only index if we have doctors and indexing is configured
    if (allDoctorsForIndexing.length > 0) {
      try {
        // Build URLs for all doctor profiles
        const doctorUrls = allDoctorsForIndexing.map((doc: any) => `https://doctors.mediman.life/${doc._id}`);

        // Add main pages
        const allUrls = [
          'https://doctors.mediman.life/',
          'https://doctors.mediman.life/doctors',
          ...doctorUrls
        ];

        // Request indexing (this is async and won't block response)
        const result = await googleIndexingService.batchRequestIndexing(allUrls);
        indexingResults = {
          successes: result.successes,
          failures: result.failures,
          indexed: true
        };

        console.log(`✅ Google Indexing: ${result.successes} URLs indexed, ${result.failures} failed`);
      } catch (indexError) {
        console.error('Google Indexing error (non-blocking):', indexError);
        indexingResults.indexed = false;
      }
    }

    // Return success response
    return NextResponse.json({
      success: true,
      revalidated: true,
      totalDoctors,
      timestamp: new Date().toISOString(),
      message: `Successfully revalidated ${totalDoctors} doctors cache`,
      tags: ['doctors-list', 'doctors-detail'],
      googleIndexing: indexingResults
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
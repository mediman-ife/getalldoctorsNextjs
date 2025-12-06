import { NextRequest, NextResponse } from 'next/server';
import { googleIndexingService } from '@/services/googleIndexing';

export const dynamic = 'force-dynamic';

/**
 * API endpoint to manually request Google indexing for specific URLs
 * This can be called when new doctors are added
 * 
 * POST /api/google-index
 * Body: { urls: string[] } or { doctorId: string }
 */
export async function POST(request: NextRequest) {
    try {
        // Validate cron secret for security
        const authHeader = request.headers.get('authorization');
        const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;

        if (!authHeader || authHeader !== expectedAuth) {
            return NextResponse.json(
                { error: 'Unauthorized', message: 'Invalid or missing authorization' },
                { status: 401 }
            );
        }

        const body = await request.json();

        // Option 1: Index specific doctor by ID
        if (body.doctorId) {
            const result = await googleIndexingService.indexDoctorProfile(body.doctorId);
            return NextResponse.json({
                success: result.success,
                message: result.message,
                url: `https://doctors.mediman.life/${body.doctorId}`,
                timestamp: new Date().toISOString()
            });
        }

        // Option 2: Index specific URLs
        if (body.urls && Array.isArray(body.urls)) {
            const result = await googleIndexingService.batchRequestIndexing(body.urls);
            return NextResponse.json({
                success: true,
                successes: result.successes,
                failures: result.failures,
                results: result.results,
                timestamp: new Date().toISOString()
            });
        }

        // Option 3: Index main pages only
        if (body.indexMainPages) {
            const result = await googleIndexingService.indexMainPages();
            return NextResponse.json({
                success: true,
                successes: result.successes,
                failures: result.failures,
                timestamp: new Date().toISOString()
            });
        }

        return NextResponse.json(
            { error: 'Bad Request', message: 'Provide doctorId, urls array, or indexMainPages flag' },
            { status: 400 }
        );

    } catch (error) {
        console.error('Google indexing API error:', error);
        return NextResponse.json(
            {
                error: 'Internal Server Error',
                message: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
}

// GET endpoint for status check
export async function GET() {
    return NextResponse.json({
        status: 'Google Indexing API endpoint active',
        endpoints: {
            indexDoctor: 'POST { doctorId: "string" }',
            indexUrls: 'POST { urls: ["url1", "url2"] }',
            indexMainPages: 'POST { indexMainPages: true }'
        },
        timestamp: new Date().toISOString()
    });
}

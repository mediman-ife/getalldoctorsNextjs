import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const token = request.headers.get('x-revalidate-token');

    if (token !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    try {
        await revalidateTag('doctors-list');
        await revalidateTag('doctors-detail');

        return NextResponse.json({
            revalidated: true,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error revalidating', error: String(error) },
            { status: 500 }
        );
    }
}

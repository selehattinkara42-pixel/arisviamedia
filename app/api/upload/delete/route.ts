import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL gerekli' }, { status: 400 });
        }

        // Only delete if it's a Vercel Blob URL
        if (url.includes('blob.vercel-storage.com')) {
            await del(url);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ success: true, message: 'Not a blob URL, skipped' });
    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({ error: 'Silme başarısız' }, { status: 500 });
    }
}

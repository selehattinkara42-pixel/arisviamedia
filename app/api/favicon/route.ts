
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const settings = await prisma.siteSettings.findFirst();

        if (!settings || !settings.favicon) {
            // Favicon yoksa 404 dön veya varsayılan bir şey yapma (Next.js default favicon.ico devreye girer)
            return new NextResponse(null, { status: 404 });
        }

        const faviconData = settings.favicon;

        // Check if it is a Base64 string
        if (faviconData.startsWith('data:')) {
            const parts = faviconData.split(',');
            const mime = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
            const base64 = parts[1];
            const buffer = Buffer.from(base64, 'base64');

            return new NextResponse(buffer, {
                headers: {
                    'Content-Type': mime,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                },
            });
        }

        // If it's a regular URL (should not happen with new system but for backward compatibility)
        return NextResponse.redirect(faviconData);

    } catch (error) {
        console.error("Favicon fetch error:", error);
        return new NextResponse(null, { status: 500 });
    }
}

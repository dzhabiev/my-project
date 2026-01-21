import { NextRequest, NextResponse } from 'next/server';
import { getStickerUrl } from '../store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stickerId = searchParams.get('id');

    if (!stickerId) {
      return NextResponse.json(
        { error: 'Sticker ID required' },
        { status: 400 }
      );
    }

    // Get the sticker URL (doesn't require payment for preview)
    const stickerUrl = getStickerUrl(stickerId, false);

    if (!stickerUrl) {
      return NextResponse.json(
        { error: 'Sticker not found or expired' },
        { status: 404 }
      );
    }

    // Fetch the image from FAL
    const imageResponse = await fetch(stickerUrl);
    
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch sticker image');
    }

    // Return the image directly as a proxy
    // Browser will blur it via CSS, but we're not exposing the real URL
    const imageBuffer = await imageResponse.arrayBuffer();
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error fetching sticker preview:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sticker' },
      { status: 500 }
    );
  }
}

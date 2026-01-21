import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl || !imageUrl.startsWith('https://v3b.fal.media/')) {
      return NextResponse.json(
        { error: 'Invalid or missing image URL' },
        { status: 400 }
      );
    }

    // Fetch the image from FAL
    const imageResponse = await fetch(imageUrl);
    
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch image');
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': imageResponse.headers.get('Content-Type') || 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

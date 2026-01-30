import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stickerId = searchParams.get('id');

    if (!stickerId) {
      return NextResponse.json(
        { error: 'Missing sticker ID' },
        { status: 400 }
      );
    }

    // Get sticker from database
    const supabase = await createClient();
    const { data: sticker, error } = await supabase
      .from('user_stickers')
      .select('image_url, is_unlocked')
      .eq('id', stickerId)
      .single();

    if (error || !sticker) {
      return NextResponse.json(
        { error: 'Sticker not found' },
        { status: 404 }
      );
    }

    // Validate image URL
    if (!sticker.image_url || !sticker.image_url.startsWith('https://v3b.fal.media/')) {
      return NextResponse.json(
        { error: 'Invalid image URL' },
        { status: 400 }
      );
    }

    // Fetch the image from FAL
    const imageResponse = await fetch(sticker.image_url);
    
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch image');
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    
    // If sticker is locked, we could add watermark here
    // For now, just return the image
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': imageResponse.headers.get('Content-Type') || 'image/png',
        'Cache-Control': sticker.is_unlocked ? 'public, max-age=31536000, immutable' : 'private, no-cache',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

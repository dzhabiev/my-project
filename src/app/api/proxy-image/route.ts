import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import sharp from 'sharp';

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

    const supabase = await createClient();
    
    // Get current user (optional)
    const { data: { user } } = await supabase.auth.getUser();

    // Get sticker from database
    const { data: sticker, error } = await supabase
      .from('user_stickers')
      .select('image_url, is_unlocked, user_id')
      .eq('id', stickerId)
      .single();

    if (error || !sticker) {
      return NextResponse.json(
        { error: 'Sticker not found' },
        { status: 404 }
      );
    }

    // Check if user is super admin
    let isSuperAdmin = false;
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_super_admin')
        .eq('id', user.id)
        .maybeSingle();
      
      isSuperAdmin = profile?.is_super_admin === true;
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
    
    // If sticker is locked and user is not super admin, apply blur and watermark
    if (!sticker.is_unlocked && !isSuperAdmin) {
      const blurredImage = await sharp(Buffer.from(imageBuffer))
        .blur(20) // Strong blur
        .composite([{
          input: Buffer.from(`
            <svg width="512" height="512">
              <style>
                .watermark { 
                  fill: rgba(255,255,255,0.7); 
                  font-size: 48px; 
                  font-weight: bold;
                  font-family: Arial;
                }
              </style>
              <rect width="512" height="512" fill="rgba(0,0,0,0.3)"/>
              <text x="50%" y="45%" text-anchor="middle" class="watermark">🔒 LOCKED</text>
              <text x="50%" y="55%" text-anchor="middle" class="watermark" style="font-size: 24px;">Pay to Unlock</text>
            </svg>
          `),
          gravity: 'center'
        }])
        .png()
        .toBuffer();

      return new NextResponse(blurredImage, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      });
    }
    
    // Return full quality for unlocked or super admin
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': imageResponse.headers.get('Content-Type') || 'image/png',
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}

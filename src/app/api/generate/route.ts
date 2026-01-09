import { NextRequest, NextResponse } from 'next/server';
import * as fal from '@fal-ai/serverless-client';

// Configure FAL with the API key from environment variables
fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    console.log('Checking FAL_KEY:', process.env.FAL_KEY ? 'Key exists' : 'Key missing');
    console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('FAL')));

    if (!process.env.FAL_KEY) {
      return NextResponse.json(
        { error: 'FAL_KEY not configured' },
        { status: 500 }
      );
    }

    console.log('Starting sticker generation...');

    // Use Nano Banana Pro Edit model with exact Playground settings
    console.log('Using Nano Banana Pro Edit model with hardcoded prompt...');
    const result: any = await fal.subscribe('fal-ai/nano-banana-pro/edit', {
      input: {
        image_urls: [image],
        prompt: 'Professional high-quality vector sticker, modern 2D cartoon avatar style. Subject: The person from the uploaded photo. Transformation rules: Redraw the person\'s face in a clean, stylized digital art style with smooth shading and bold outlines. Keep key identifying features (glasses, beard shape, hairstyle) but simplify them into artistic shapes. Aesthetic: Vibrant flat colors, thick expressive lines, 3D-effect die-cut sticker with a thick white border and subtle drop shadow. Background: Solid neutral light gray or transparent. Quality: Masterpiece, clean vector lines, no photographic textures, 8k resolution, trending on ArtStation',
        image_strength: 0.5,
        guidance_scale: 10,
      },
      logs: true,
      onQueueUpdate: (update) => {
        console.log('Queue update:', update.status);
      },
    });
    console.log('Nano Banana Pro Edit generation succeeded');

    console.log('Generation complete:', result);

    // Return the generated image URL from Nano Banana Pro
    const generatedImageUrl = result.image?.url || result.images?.[0]?.url;

    if (generatedImageUrl) {
      return NextResponse.json({
        image: generatedImageUrl,
      });
    } else {
      console.error('No image found in result:', result);
      throw new Error('No image in response');
    }
  } catch (error) {
    console.error('Error generating sticker:', error);
    console.error('Full error object:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      {
        error: 'Failed to generate sticker',
        details: error instanceof Error ? error.message : 'Unknown error',
        fullError: error
      },
      { status: 500 }
    );
  }
}

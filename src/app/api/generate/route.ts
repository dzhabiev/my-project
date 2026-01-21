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

    // Use Nano Banana Pro Edit model with refined prompt for people and objects
    console.log('Using Nano Banana Pro Edit model with detailed hardcoded prompt...');
    const result: any = await fal.subscribe('fal-ai/nano-banana-pro/edit', {
      input: {
        image_urls: [image],
        prompt: 'Professional high-quality vector sticker, modern 2D cartoon avatar style. Subject: The main entity (person or object) from the uploaded photo. Composition & Positioning Rules: For Human Subjects: The person should be aesthetically cropped to a head-and-shoulders or bust shot, centered perfectly within the sticker\'s canvas with balanced surrounding space, as demonstrated in the first reference image. The original photo\'s background should be completely removed. For Non-Human Objects (e.g., cars, items): The object must be redrawn in its exact original pose, angle, and overall composition from the input photo, without any repositioning or re-imagining its stance. It should fill the sticker canvas appropriately while maintaining its original aspect ratio, replicating the detail and precise positioning from the fourth reference image (BMW). Transformation & Style Rules (for Persons): Redraw the person\'s face in a clean, stylized digital art style, utilizing smooth shading, vibrant flat colors, and bold, expressive outlines. Crucially, preserve and stylize all key identifying facial features (head shape, distinctive hairstyle, eyebrows, lips, nose, eyes, glasses if present, and facial contours) into artistic vector shapes, ensuring a strong, recognizable resemblance to the original person, similar to the detailed artistic quality of the red-haired person in the second reference image. Avoid all photographic textures; aim for a pure, crisp vector illustration. Transformation & Style Rules (for Non-Human Objects): Redraw the object in a clean, stylized vector art style. All defining details, logos, text (e.g., license plate text), and specific features must be accurately maintained and translated into crisp vector shapes with clean lines and solid colors, reflecting the original appearance with stylistic enhancement. Aesthetic & Finish: A thick, three-dimensional (3D-effect) die-cut sticker, featuring a prominent and uniform bold white border around the entire redrawn subject. Include a subtle, realistic drop shadow to enhance the sticker\'s depth. Background: Solid neutral light gray or completely transparent. Quality: Masterpiece quality, impeccably clean vector lines, high detail, 8k resolution, trending on ArtStation.',
        image_strength: 0.5,
        guidance_scale: 10,
      },
      logs: true,
      onQueueUpdate: (update: any) => {
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

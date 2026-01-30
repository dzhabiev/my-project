import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { stickerId } = await request.json();

    if (!stickerId) {
      return NextResponse.json({ error: 'Sticker ID required' }, { status: 400 });
    }

    // Check if sticker exists and is a guest sticker (user_id IS NULL)
    const { data: sticker, error: fetchError } = await supabase
      .from('user_stickers')
      .select('*')
      .eq('id', stickerId)
      .is('user_id', null)
      .maybeSingle();

    if (fetchError || !sticker) {
      return NextResponse.json({ error: 'Sticker not found or already claimed' }, { status: 404 });
    }

    // Claim the sticker by updating user_id
    const { error: updateError } = await supabase
      .from('user_stickers')
      .update({ user_id: user.id })
      .eq('id', stickerId)
      .is('user_id', null);

    if (updateError) {
      console.error('Error claiming sticker:', updateError);
      return NextResponse.json({ error: 'Failed to claim sticker' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error claiming sticker:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

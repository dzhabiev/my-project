import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);

    // Verify signature
    const signature = request.headers.get('x-cryptocloud-signature');
    
    if (process.env.CRYPTOCLOUD_SECRET && signature) {
      const hmac = createHmac('sha256', process.env.CRYPTOCLOUD_SECRET);
      hmac.update(rawBody);
      const expectedSignature = hmac.digest('hex');
      
      if (signature !== expectedSignature) {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 403 }
        );
      }
    }
    
    // Handle payment status
    const { status, invoice_id, order_id } = body;

    if (status === 'success' || status === 'paid') {
      // order_id format: "sticker_{stickerId}"
      if (order_id && order_id.startsWith('sticker_')) {
        const stickerId = order_id.replace('sticker_', '');
        
        try {
          const supabase = await createClient();
          
          // Unlock the sticker
          const { error: updateError } = await supabase
            .from('user_stickers')
            .update({ is_unlocked: true })
            .eq('id', stickerId);

          if (updateError) {
            return NextResponse.json(
              { error: 'Failed to unlock sticker' },
              { status: 500 }
            );
          }
        } catch (dbError) {
          return NextResponse.json(
            { error: 'Database error' },
            { status: 500 }
          );
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);
    
    console.log('CryptoCloud webhook received:', body);

    // Verify signature
    const signature = request.headers.get('x-cryptocloud-signature');
    
    if (process.env.CRYPTOCLOUD_SECRET && signature) {
      const hmac = createHmac('sha256', process.env.CRYPTOCLOUD_SECRET);
      hmac.update(rawBody);
      const expectedSignature = hmac.digest('hex');
      
      if (signature !== expectedSignature) {
        console.error('⚠️ Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 403 }
        );
      }
      console.log('✅ Webhook signature verified');
    }
    
    // Handle payment status
    const { status, invoice_id, order_id } = body;

    if (status === 'success' || status === 'paid') {
      console.log('✅ Payment successful for order:', order_id);
      
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
            console.error('Failed to unlock sticker:', updateError);
          } else {
            console.log(`✅ Sticker ${stickerId} unlocked successfully`);
          }
        } catch (dbError) {
          console.error('Database error:', dbError);
        }
      }
      
      console.log(`Payment ${invoice_id} completed for order ${order_id}`);
    } else if (status === 'failed' || status === 'expired' || status === 'canceled') {
      console.log('❌ Payment failed/expired/canceled for order:', order_id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);
    
    console.log('Payment webhook received:', body);

    // Verify signature
    const signature = request.headers.get('x-nowpayments-sig');
    
    if (process.env.NOWPAYMENTS_IPN_SECRET && signature) {
      const hmac = createHmac('sha512', process.env.NOWPAYMENTS_IPN_SECRET);
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
    const { payment_status, order_id, payment_id } = body;

    if (payment_status === 'finished' || payment_status === 'confirmed') {
      console.log('✅ Payment successful for order:', order_id);
      
      // Here you would:
      // 1. Mark sticker as paid in database
      // 2. Send email with download link
      // 3. Store in user's account if they're logged in
      
      // For now, we'll just log it
      console.log(`Payment ${payment_id} completed for order ${order_id}`);
    } else if (payment_status === 'failed' || payment_status === 'expired') {
      console.log('❌ Payment failed/expired for order:', order_id);
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

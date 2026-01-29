import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { stickerId, stickerUrl, amount = 3.00 } = await request.json();

    if (!stickerUrl || !stickerId) {
      return NextResponse.json(
        { error: 'Sticker ID and URL required' },
        { status: 400 }
      );
    }

    if (!process.env.NOWPAYMENTS_API_KEY) {
      return NextResponse.json(
        { error: 'NOWPayments API key not configured' },
        { status: 500 }
      );
    }

    const orderId = `sticker_${stickerId}`;
    
    // Create invoice with NOWPayments (supports both card and crypto)
    const response = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NOWPAYMENTS_API_KEY,
      },
      body: JSON.stringify({
        price_amount: amount,
        price_currency: 'usd',
        order_id: orderId,
        order_description: 'AI Generated Sticker - Unlock Access',
        ipn_callback_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}?payment=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}?payment=cancelled`,
      }),
    });

    const data = await response.json();

    console.log('NOWPayments response status:', response.status);
    console.log('NOWPayments response data:', data);

    if (!response.ok) {
      console.error('NOWPayments error:', {
        status: response.status,
        statusText: response.statusText,
        data: data
      });
      return NextResponse.json(
        { 
          error: 'Failed to create payment', 
          details: data,
          status: response.status,
          statusText: response.statusText
        },
        { status: response.status }
      );
    }

    // Store payment info temporarily (in production use database)
    // For now, we'll use the order_id to track
    
    return NextResponse.json({
      paymentId: data.payment_id,
      paymentUrl: data.invoice_url || `https://nowpayments.io/payment/?iid=${data.payment_id}`,
      orderId: orderId,
      payAmount: data.pay_amount,
      payCurrency: data.pay_currency,
      payAddress: data.pay_address,
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      {
        error: 'Failed to create payment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

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

    if (!process.env.CRYPTOCLOUD_API_KEY || !process.env.CRYPTOCLOUD_SHOP_ID) {
      return NextResponse.json(
        { error: 'CryptoCloud API credentials not configured' },
        { status: 500 }
      );
    }

    const orderId = `sticker_${stickerId}`;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.customstickerpack.com';
    
    // Create invoice with CryptoCloud
    const response = await fetch('https://api.cryptocloud.plus/v2/invoice/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${process.env.CRYPTOCLOUD_API_KEY}`,
      },
      body: JSON.stringify({
        shop_id: process.env.CRYPTOCLOUD_SHOP_ID,
        amount: amount,
        currency: 'USD',
        order_id: orderId,
        success_url: `${baseUrl}?payment=success`,
        fail_url: `${baseUrl}?payment=failed`,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.status !== 'success') {
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
      paymentId: data.result.uuid,
      paymentUrl: data.result.link,
      orderId: orderId,
      amount: amount,
      currency: 'USD',
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to create payment',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

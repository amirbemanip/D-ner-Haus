import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { membershipCode, name } = await request.json();

    if (!membershipCode) {
      return NextResponse.json({ error: 'Membership code is required' }, { status: 400 });
    }

    // Use environment variable for the API key with provided fallback
    const apiKey = process.env.WALLETWALLET_API_KEY || 'ww_live_12edf7cd29beb42dcad8ff5596a07adf';

    const response = await fetch('https://api.walletwallet.dev/api/pkpass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        barcodeValue: membershipCode,
        barcodeFormat: 'QR',
        title: `Dönerhaus - ${name || 'VIP'}`,
        colorPreset: 'dark',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('WalletWallet API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate Apple Wallet pass', details: errorData },
        { status: response.status }
      );
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': `attachment; filename="donerhaus-${membershipCode}.pkpass"`,
      },
    });
  } catch (error: any) {
    console.error('Wallet API handler error:', error);
    return NextResponse.json({ error: 'Internal server error', message: error.message }, { status: 500 });
  }
}

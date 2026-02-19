import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const name = searchParams.get('name');

  if (!code) {
    return NextResponse.json({ error: 'Code is required' }, { status: 400 });
  }

  try {
    const response = await fetch('https://api.walletwallet.dev/api/pkpass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WALLETWALLET_API_KEY || 'ww_live_12edf7cd29beb42dcad8ff5596a07adf'}`,
      },
      body: JSON.stringify({
        barcodeValue: code,
        barcodeFormat: 'QR',
        title: 'Dönerhaus Elite',
        colorPreset: 'dark',
        label1: 'Member',
        value1: name || 'Elite Guest',
        label2: 'ID',
        value2: code,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WalletWallet API error:', errorText);
      return NextResponse.json({ error: 'Failed to generate wallet pass' }, { status: 500 });
    }

    const buffer = await response.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.apple.pkpass',
        'Content-Disposition': `attachment; filename="donerhaus-${code}.pkpass"`,
      },
    });
  } catch (error: any) {
    console.error('Wallet error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

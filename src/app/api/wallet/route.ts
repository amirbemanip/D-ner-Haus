import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const membershipCode = searchParams.get('code');
  const name = searchParams.get('name');

  return handleWalletRequest(membershipCode, name);
}

export async function POST(request: Request) {
  try {
    const { membershipCode, name } = await request.json();
    return handleWalletRequest(membershipCode, name);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

async function handleWalletRequest(membershipCode: string | null, name: string | null) {
  try {
    if (!membershipCode) {
      return NextResponse.json({ error: 'Membership code is required' }, { status: 400 });
    }

    // Use environment variable for the API key
    const apiKey = process.env.WALLETWALLET_API_KEY;

    console.log(`Generating wallet pass for: ${membershipCode} (${name})`);

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

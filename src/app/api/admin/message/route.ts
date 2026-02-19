import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (typeof (prisma as any).setGlobalMessage === 'function') {
        await (prisma as any).setGlobalMessage(message);
    }
    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
    try {
        let message = "";
        if (typeof (prisma as any).getGlobalMessage === 'function') {
            message = await (prisma as any).getGlobalMessage();
        }
        return NextResponse.json({ message });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

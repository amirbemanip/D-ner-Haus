import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const phone = searchParams.get('phone')
  const code = searchParams.get('code')

  try {
    const broadcasts = await prisma.broadcast.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    // Filter broadcasts based on target
    const filtered = broadcasts.filter(b => {
      if (b.target === 'ALL') return true;
      if (phone && b.target === 'PHONE' && b.targetValue === phone) return true;
      if (code && b.target === 'CODE' && b.targetValue === code) return true;
      return false;
    });

    return NextResponse.json(filtered)
  } catch (error: any) {
    return NextResponse.json([], { status: 500 })
  }
}

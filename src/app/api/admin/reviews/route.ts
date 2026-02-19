import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const pendingReviews = await prisma.customer.findMany({
      where: { googleReviewStatus: 'PENDING' }
    })
    return NextResponse.json(pendingReviews)
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}

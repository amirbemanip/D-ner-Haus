import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { customerId, action } = await request.json()

    if (action === 'approve') {
      const customer = await prisma.customer.findUnique({ where: { id: customerId } })
      if (!customer) return NextResponse.json({ error: 'Not found' }, { status: 404 })

      await prisma.customer.update({
        where: { id: customerId },
        data: {
          googleReviewStatus: 'APPROVED',
          coupons: { increment: 1 }
        }
      })
    } else {
      await prisma.customer.update({
        where: { id: customerId },
        data: { googleReviewStatus: 'NONE' }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}

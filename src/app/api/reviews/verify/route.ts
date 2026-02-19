import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { membershipCode } = await request.json()

    if (!membershipCode) {
      return NextResponse.json({ error: 'Code ist erforderlich' }, { status: 400 })
    }

    const customer = await prisma.customer.findUnique({
      where: { membershipCode }
    })

    if (!customer) {
      return NextResponse.json({ error: 'Kunde nicht gefunden' }, { status: 404 })
    }

    if (customer.googleReviewStatus !== 'NONE') {
      return NextResponse.json({ error: 'Bereits eingereicht oder genehmigt' }, { status: 400 })
    }

    const updated = await prisma.customer.update({
      where: { membershipCode },
      data: { googleReviewStatus: 'PENDING' }
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    return NextResponse.json({ error: 'Fehler' }, { status: 500 })
  }
}

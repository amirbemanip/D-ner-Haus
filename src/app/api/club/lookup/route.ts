import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { name, membershipCode } = await request.json()

    if (!name || !membershipCode) {
      return NextResponse.json({ error: 'Name und Code sind erforderlich' }, { status: 400 })
    }

    const customer = await prisma.customer.findUnique({
      where: { membershipCode }
    })

    if (!customer || customer.name.toLowerCase() !== name.toLowerCase()) {
      return NextResponse.json({ error: 'Mitglied nicht gefunden oder Name stimmt nicht überein' }, { status: 404 })
    }

    return NextResponse.json(customer)
  } catch (error: any) {
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 })
  }
}

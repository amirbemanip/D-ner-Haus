import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { name, phone } = await request.json()

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name und Telefonnummer sind erforderlich' }, { status: 400 })
    }

    // Check if customer already exists
    const existing = await prisma.customer.findUnique({
      where: { phone }
    })

    if (existing) {
      return NextResponse.json({
        error: 'Telefonnummer bereits registriert',
        membershipCode: existing.membershipCode
      }, { status: 400 })
    }

    // Generate membership code (simple 6-digit)
    let membershipCode = ''
    let isUnique = false
    let attempts = 0
    while (!isUnique && attempts < 10) {
      membershipCode = Math.floor(100000 + Math.random() * 900000).toString()
      const codeCheck = await prisma.customer.findUnique({
        where: { membershipCode }
      })
      if (!codeCheck) isUnique = true
      attempts++
    }

    if (!isUnique) {
      return NextResponse.json({ error: 'Mitgliedschaftscode konnte nicht generiert werden' }, { status: 500 })
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        phone,
        membershipCode,
      }
    })

    return NextResponse.json(customer)
  } catch (error: any) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: error.message || 'Interner Serverfehler' }, { status: 500 })
  }
}

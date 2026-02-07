import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params

    // Search by membership code first, then by phone if not found
    let customer = await prisma.customer.findUnique({
      where: { membershipCode: code }
    })

    if (!customer) {
      customer = await prisma.customer.findFirst({
        where: { phone: code }
      })
    }

    if (!customer) {
      return NextResponse.json({ error: 'Kunde nicht gefunden' }, { status: 404 })
    }

    return NextResponse.json(customer)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Interner Serverfehler' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params
    const body = await request.json()
    const { action } = body // 'add_purchase', 'redeem_doner', 'redeem_fries'

    const customer = await prisma.customer.findUnique({
      where: { membershipCode: code }
    })

    if (!customer) {
      return NextResponse.json({ error: 'Kunde nicht gefunden' }, { status: 404 })
    }

    let updateData: any = {}

    if (action === 'add_purchase') {
      updateData.coupons = customer.coupons + 1
    } else if (action === 'redeem_doner') {
      if (customer.coupons < 10) {
        return NextResponse.json({ error: 'Nicht genügend Stempel' }, { status: 400 })
      }
      updateData.coupons = customer.coupons - 10
    } else if (action === 'redeem_fries') {
      if (customer.receivedFirstGift) {
        return NextResponse.json({ error: 'Willkommensgeschenk bereits erhalten' }, { status: 400 })
      }
      updateData.receivedFirstGift = true
    } else {
      return NextResponse.json({ error: 'Ungültige Aktion' }, { status: 400 })
    }

    const updatedCustomer = await prisma.customer.update({
      where: { membershipCode: code },
      data: updateData
    })

    return NextResponse.json(updatedCustomer)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Interner Serverfehler' }, { status: 500 })
  }
}

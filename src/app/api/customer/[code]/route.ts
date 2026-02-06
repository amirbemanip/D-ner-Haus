import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params
    const customer = await prisma.customer.findUnique({
      where: { membershipCode: code }
    })

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    return NextResponse.json(customer)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
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
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    let updateData: any = {}

    if (action === 'add_purchase') {
      updateData.coupons = customer.coupons + 1
    } else if (action === 'redeem_doner') {
      if (customer.coupons < 10) {
        return NextResponse.json({ error: 'Not enough coupons' }, { status: 400 })
      }
      updateData.coupons = customer.coupons - 10
    } else if (action === 'redeem_fries') {
      if (customer.receivedFirstGift) {
        return NextResponse.json({ error: 'First gift already received' }, { status: 400 })
      }
      updateData.receivedFirstGift = true
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    const updatedCustomer = await prisma.customer.update({
      where: { membershipCode: code },
      data: updateData
    })

    return NextResponse.json(updatedCustomer)
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { title, content, target, targetValue } = await request.json()
    const broadcast = await prisma.broadcast.create({
      data: {
        title,
        content,
        target: target || 'ALL',
        targetValue
      }
    })
    return NextResponse.json(broadcast)
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    await prisma.broadcast.deleteMany({})
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}

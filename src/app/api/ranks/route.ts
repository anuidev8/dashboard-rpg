import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Set the route as dynamic
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const ranks = await prisma.rank.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(ranks)
  } catch (error) {
    console.error('Error fetching ranks:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
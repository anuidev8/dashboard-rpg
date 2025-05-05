import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Marcar la ruta como dinámica
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const rank = searchParams.get('rank')

    const challenges = await prisma.challenge.findMany({
      where: rank ? {
        rankName: rank
      } : undefined,
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json(challenges)
  } catch (error) {
    console.error('Error fetching challenges:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}


import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const MOCK_USER_ID = 'test-user-1'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { challengeId, evidence } = await request.json()

    const submission = await prisma.challengeSubmission.create({
      data: {
        challengeId,
        userId: MOCK_USER_ID,
        evidence,
        status: 'PENDING'
      }
    })

    return NextResponse.json(submission)
  } catch (error) {
    console.error('Error submitting challenge:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

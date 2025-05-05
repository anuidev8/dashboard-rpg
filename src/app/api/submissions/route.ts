import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { emitSubmissionEvent } from '@/lib/events'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const userId = searchParams.get('userId')

    const submissions = await prisma.challengeSubmission.findMany({
      where: {
        status: status || undefined,
        userId: userId || undefined
      },
      include: {
        user: {
          select: {
            name: true
          }
        },
        challenge: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(submissions)
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { challengeId, evidence, userId, evidenceType } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }

    const submission = await prisma.challengeSubmission.create({
      data: {
        challengeId,
        userId,
        evidence,
        evidenceType: evidenceType || 'TEXT',
        status: 'PENDING'
      },
      include: {
        challenge: true,
        user: {
          select: {
            name: true
          }
        }
      }
    })

    // Emit event for the reviewers
    emitSubmissionEvent(submission);

    return NextResponse.json(submission)
  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
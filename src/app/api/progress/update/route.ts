import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

const MOCK_USER_ID = 'test-user-1'

// Definir tipos
type RankProgressData = {
  rank: string;
  completedChallenges: string[];
  currentChallenge: string | null;
  progress: number;
}

type RankProgressMap = {
  [key: string]: RankProgressData;
}

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { rankName, challengeName, completed } = await request.json()

    // Obtener el progreso actual
    const progress = await prisma.progress.findUnique({
      where: {
        userId: MOCK_USER_ID
      }
    })

    if (!progress) {
      return NextResponse.json({ error: 'Progress not found' }, { status: 404 })
    }

    // Convertir y clonar el rankProgress actual
    const rankProgress = {
      ...(progress.rankProgress as unknown as RankProgressMap)
    }

    // Actualizar el progreso del rango específico
    if (completed) {
      if (!rankProgress[rankName].completedChallenges.includes(challengeName)) {
        rankProgress[rankName].completedChallenges.push(challengeName)
      }
    } else {
      rankProgress[rankName].completedChallenges = 
        rankProgress[rankName].completedChallenges.filter(c => c !== challengeName)
    }

    // Calcular el nuevo progreso
    const totalChallenges = await prisma.challenge.count({
      where: { rankName }
    })

    rankProgress[rankName].progress = Math.round(
      (rankProgress[rankName].completedChallenges.length / totalChallenges) * 100
    )

    // Actualizar en la base de datos
    const updatedProgress = await prisma.progress.update({
      where: {
        userId: MOCK_USER_ID
      },
      data: {
        rankProgress: rankProgress as any
      }
    })

    return NextResponse.json(updatedProgress)
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

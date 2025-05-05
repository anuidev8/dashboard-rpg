import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'


// Definir tipos más específicos
type RankProgressData = {
  rank: string;
  completedChallenges: string[];
  currentChallenge: string | null;
  progress: number;
  icon?: string | null;
  video?: string | null;
  title?: string | null;
  description?: string | null;
  isUltimate?: boolean;
}

type RankProgressMap = {
  [key: string]: RankProgressData;
}

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // 1. Get user progress
    const progress = await prisma.progress.findUnique({
      where: {
        userId: userId
      }
    });

    if (!progress) {
      return NextResponse.json({ error: 'Progress not found' }, { status: 404 });
    }

    // 2. Get all ranks to add their details to the response
    const ranks = await prisma.rank.findMany();
    
    // 3. Get user's challenge submissions
    const challengeSubmissions = await prisma.challengeSubmission.findMany({
      where: {
        userId: userId
      },
      include: {
        challenge: true
      }
    });

    // 4. Create an enriched response with rank details
    const rankProgress = progress.rankProgress as unknown as RankProgressMap;
    const enrichedRankProgress = { ...rankProgress };
    
    // Add rank details to each rank in the progress
    for (const rank of ranks) {
      // Initialize rank in progress if it doesn't exist (for newly added ranks)
      if (!enrichedRankProgress[rank.name]) {
        enrichedRankProgress[rank.name] = {
          rank: rank.name,
          completedChallenges: [],
          currentChallenge: null,
          progress: 0
        };
      }
      
      // Add rank details
      enrichedRankProgress[rank.name] = {
        ...enrichedRankProgress[rank.name],
        icon: rank.icon,
        video: rank.video,
        title: rank.title,
        description: rank.description,
        isUltimate: rank.isUltimate
      };
    }

    // Return the enriched response
    return NextResponse.json({
      ...progress,
      rankProgress: enrichedRankProgress,
      challengeSubmissions
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, rankName, challengeName, status } = await request.json();

    // Validación de entrada
    if (!userId || !rankName || !challengeName || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      );
    }

    // Get all available ranks to ensure we have complete data
    const allRanks = await prisma.rank.findMany({
      select: { name: true }
    });
    
    // Obtener el progreso actual
    const currentProgress = await prisma.progress.findUnique({
      where: { userId: userId }
    });

    if (!currentProgress) {
      return NextResponse.json(
        { error: 'Progress not found' }, 
        { status: 404 }
      );
    }

    // Convertir el JSON actual a nuestro tipo
    const currentRankProgress = currentProgress.rankProgress as unknown as RankProgressMap;

    // Crear una copia del progreso actual
    const updatedRankProgress: RankProgressMap = {
      ...currentRankProgress
    };

    // Ensure all ranks exist in the progress object
    allRanks.forEach(rank => {
      if (!updatedRankProgress[rank.name]) {
        updatedRankProgress[rank.name] = {
          rank: rank.name,
          completedChallenges: [],
          currentChallenge: null,
          progress: 0
        };
      }
    });

    // Inicializar el rango si no existe
    if (!updatedRankProgress[rankName]) {
      updatedRankProgress[rankName] = {
        rank: rankName,
        completedChallenges: [],
        currentChallenge: null,
        progress: 0
      };
    }

    if (status === 'COMPLETED') {
      const challenges = updatedRankProgress[rankName].completedChallenges;
      if (!challenges.includes(challengeName)) {
        challenges.push(challengeName);

        // Actualizar el progreso
        const totalChallenges = await prisma.challenge.count({
          where: { rankName }
        });

        updatedRankProgress[rankName].progress = Math.round(
          (challenges.length / totalChallenges) * 100
        );
      }
    }

    // Actualizar en la base de datos usando el tipo correcto de Prisma
    const updatedProgress = await prisma.progress.update({
      where: { userId: userId },
      data: {
        rankProgress: updatedRankProgress as RankProgressMap
      }
    });

    return NextResponse.json(updatedProgress);
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
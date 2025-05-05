import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

// Definir tipos para el progreso
type RankProgressData = {
  progress: number;
  completedChallenges: string[];
  currentChallenge: string | null;
  rank: string;
}

type RankProgressMap = {
  [key: string]: RankProgressData;
}

export const dynamic = 'force-dynamic'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status, feedback } = await request.json();
    const submissionId = params.id;

    const submission = await prisma.challengeSubmission.findUnique({
      where: {
        id: submissionId,
      },
      include: {
        challenge: true,
        user: {
          include: {
            progress: true
          }
        }
      }
    });

    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    const updatedSubmission = await prisma.challengeSubmission.update({
      where: {
        id: submissionId,
      },
      data: {
        status,
        feedback,
        reviewedAt: new Date(),
      },
    });

    if (status === 'APPROVED' && submission.user.progress) {
      const rankProgress = submission.user.progress.rankProgress as unknown as RankProgressMap;
      const rankName = submission.challenge.rankName;
      const challengeXp = submission.challenge.xp || 0;

      // Ensure the rank exists in rankProgress
      if (!rankProgress[rankName]) {
        // If the rank doesn't exist (maybe it was added after user registration),
        // initialize it with default values
        rankProgress[rankName] = {
          progress: 0,
          completedChallenges: [],
          currentChallenge: null,
          rank: rankName
        };
      }

      // Calculate current total XP
      let totalExperience = submission.user.progress.experience || 0;
      
              // Add the challenge to completed challenges if not already present
      if (!rankProgress[rankName].completedChallenges.includes(submission.challenge.name)) {
        rankProgress[rankName].completedChallenges.push(submission.challenge.name);

        // Add XP from this challenge
        totalExperience += challengeXp;

        // Get the total number of challenges for this rank
        const totalChallenges = await prisma.challenge.count({
          where: { rankName }
        });

        // Calculate progress percentage
        if (totalChallenges > 0) {
          rankProgress[rankName].progress = Math.round(
            (rankProgress[rankName].completedChallenges.length / totalChallenges) * 100
          );
        }

        // Determine if user should rank up - get ranks dynamically from database
        let currentRank = submission.user.progress.currentRank;
        
        // Get all ranks from the database to build the hierarchy dynamically
        const allRanks = await prisma.rank.findMany({
          orderBy: {
            id: 'asc' // Assuming ranks were created in order of progression
          },
          select: {
            name: true
          }
        });
        
        // Extract rank names to create the hierarchy
        const rankHierarchy = allRanks.map(rank => rank.name);
        
        // If progress for current rank is 100%, consider ranking up
        if (rankProgress[currentRank]?.progress === 100) {
          const currentRankIndex = rankHierarchy.indexOf(currentRank);
          // If there's a next rank available
          if (currentRankIndex < rankHierarchy.length - 1) {
            const nextRank = rankHierarchy[currentRankIndex + 1];
            // Only rank up if they've completed at least one challenge in the next rank
            if (rankProgress[nextRank]?.completedChallenges?.length > 0) {
              currentRank = nextRank;
            }
          }
        }

        // Update progress in the database
        await prisma.progress.update({
          where: { userId: submission.user.id },
          data: {
            rankProgress: rankProgress as any,
            experience: totalExperience,
            currentRank: currentRank
          }
        });
      }
    }

    return NextResponse.json(updatedSubmission);
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
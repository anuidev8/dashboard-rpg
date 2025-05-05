import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Get all users with their progress and approved challenge submissions
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        progress: {
          select: {
            currentRank: true,
            experience: true,
            rankProgress: true
          }
        },
        submissions: {
          where: {
            status: 'APPROVED'
          },
          select: {
            id: true,
            challenge: {
              select: {
                xp: true,
                name: true,
                rankName: true
              }
            }
          }
        }
      }
    });

    // Get all ranks to access their data
    const ranks = await prisma.rank.findMany();
    
    // Create a map for quick rank reference
    const rankMap = ranks.reduce((map, rank) => {
      map[rank.name] = rank;
      return map;
    }, {} as Record<string, any>);

    // Default avatars if none are defined in the database
    const defaultAvatars: Record<string, string> = {
      'Aprendiz': '🧩',
      'Jinete': '🐎',
      'Alfil': '🧙‍♂️',
      'Torre': '🏰',
      'Reina': '👸',
      'Rey': '👑',
      'default': '👤'
    };

    // Calculate total XP for each user based on completed challenges
    const leaderboardData = users.map(user => {
      // Calculate total XP from approved submissions
      const totalXP = user.submissions.reduce((sum, submission) => 
        sum + (submission.challenge.xp || 0), 0);
      
      // Determine highest rank with progress
      const highestRank = user.progress?.currentRank || 'Aprendiz';
      
      // Get avatar based on rank - check for custom avatars in database first
      const avatar = 
        (rankMap[highestRank] && rankMap[highestRank].avatar) || // Use avatar from DB if available
        defaultAvatars[highestRank] || // Fall back to our mapping
        defaultAvatars.default; // Use default if rank not found

      return {
        name: user.name,
        score: totalXP,
        rank: highestRank,
        avatar: avatar
      };
    });

    // Sort by score in descending order
    const sortedLeaderboard = leaderboardData.sort((a, b) => b.score - a.score);

    return NextResponse.json(sortedLeaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * API route to register or retrieve users from Keycloak auth data
 * Uses email as the primary identifier (id field)
 */
export async function POST(request: Request) {
  try {
    // Get user data from Keycloak auth
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if user already exists by email (as id)
    let user = await prisma.user.findUnique({
      where: { id: email },
      include: { progress: true }
    });
    
    // If user doesn't exist, create a new one using email as id
    if (!user) {
      // Fetch all ranks from the database
      const ranks = await prisma.rank.findMany();
      
      // Create dynamic rankProgress object based on available ranks
      const rankProgress: Record<string, any> = {};
      
      // Initialize progress for each rank
      ranks.forEach(rank => {
        rankProgress[rank.name] = {
          rank: rank.name,
          completedChallenges: [],
          currentChallenge: null,
          progress: 0
        };
      });

      user = await prisma.user.create({
        data: {
          id: email, // Use email as the primary ID
          name: name || email, // Use provided name or email as name
          email: email,
          progress: {
            create: {
              currentRank: 'Aprendiz', // Default starting rank
              experience: 0,
              rankProgress: rankProgress
            }
          }
        },
        include: {
          progress: true
        }
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve user data by email
// GET endpoint to retrieve user data by email
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Look up user directly by email as ID
    const user = await prisma.user.findUnique({
      where: { id: email },
      include: {
        progress: true,
        submissions: {
          include: {
            challenge: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
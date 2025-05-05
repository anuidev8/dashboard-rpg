import { Challenge } from '@prisma/client'

export interface ChallengeSubmission {
  id: string
  challengeId: string
  userId: string
  evidence: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  feedback?: string | null
  createdAt: Date
  reviewedAt?: Date | null
  challenge: Challenge
  user: {
    name: string
  }
}

export interface Rank {
  name: string
  icon: string
  video?: string
  title: string
  description: string
  challenges: string[]
  isUltimate: boolean
  avatar?:string;
}

export interface Progress {
  currentRank: string
  experience: number
  rankProgress: RankProgressMap
  updatedAt?: Date
}

export interface RankProgressData {
  rank: string
  completedChallenges: string[]
  currentChallenge: string | null
  progress: number
}

export interface RankProgressMap {
  [key: string]: RankProgressData
}

export interface LeaderboardEntry {
  name: string
  score: number
  rank: string
  avatar: string
}

export interface ReviewRequest extends ChallengeSubmission {
  id: string
}

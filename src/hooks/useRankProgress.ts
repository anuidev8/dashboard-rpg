import { useState, useEffect, useCallback } from 'react';
import { Rank } from '@prisma/client';
import { useSession } from 'next-auth/react';


interface Progress {
  currentRank: string;
  experience: number;
  rankProgress: {
    [key: string]: {
      rank: string;
      completedChallenges: string[];
      currentChallenge: string | null;
      progress: number;
    };
  };
}

interface UseRankProgressProps {
  ranks: Rank[];
  selectedRank: Rank;
  setSelectedRank: (rank: Rank) => void;
}

export function useRankProgress({ ranks, setSelectedRank }: UseRankProgressProps) {
  const { data: user } = useSession();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(`/api/progress?userId=${user?.user?.email}`);
      if (!response.ok) throw new Error('Failed to fetch progress');
      const data = await response.json();
      setProgress(data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.user?.email]);

  useEffect(() => {
    fetchProgress();
  }, [user?.user?.email]);

  const getBlurLevel = useCallback((progress: number): string => {
    if (progress >= 90) return '';
    if (progress >= 80) return 'blur-sm';
    if (progress >= 60) return 'blur';
    if (progress >= 40) return 'blur-md';
    if (progress >= 20) return 'blur-lg';
    if (progress >= 10) return 'blur-xl';
    return 'blur-3xl';
  }, []);

  const isRankLocked = useCallback((rankName: string): boolean => {
    if (!progress) return true;
    
    const rankIndex = ranks.findIndex(r => r.name === rankName);
    if (rankIndex === 0) return false;
    
    const previousRank = ranks[rankIndex - 1];
    return (progress.rankProgress[previousRank.name]?.progress || 0) < 100;
  }, [progress, ranks]);

  const getChallengeName = useCallback((rankName: string): string => {
    const rankData = progress?.rankProgress[rankName];
    if (!rankData) return 'No iniciado';
    
    if (rankData.currentChallenge) {
      return rankData.currentChallenge;
    }
    
    if (rankData.completedChallenges && rankData.completedChallenges.length > 0) {
      return `Completado: ${rankData.completedChallenges[rankData.completedChallenges.length - 1]}`;
    }
    
    return 'No iniciado';
  }, [progress]);

  return {
    progress,
    loading,
    user,
    getBlurLevel,
    isRankLocked,
    getChallengeName,
    setSelectedRank,
    fetchProgress
  };
}

export function getBlurLevel(progress: number): string {
  if (progress >= 100) return '';
  if (progress >= 90) return 'blur-sm';
  if (progress >= 80) return 'blur';
  if (progress >= 70) return 'blur-md';
  if (progress >= 60) return 'blur-lg';
  if (progress >= 50) return 'blur-xl';
  if (progress >= 30) return 'blur-2xl';
  return 'blur-3xl';
}

export function useRankProgressData(selectedRank: Rank, ranks: Rank[], setSelectedRank: (rank: Rank) => void) {
  const { progress, getBlurLevel, fetchProgress } = useRankProgress({ ranks, selectedRank, setSelectedRank });
  const rankProgress = progress?.rankProgress?.[selectedRank.name]?.progress || 0;
  const blurLevel = getBlurLevel(rankProgress);

  return {
    rankProgress,
    blurLevel,
    isComplete: rankProgress >= 100,
    isAlmostComplete: rankProgress >= 90,
    isInProgress: rankProgress > 0 && rankProgress < 100,
    fetchProgress
  };
} 
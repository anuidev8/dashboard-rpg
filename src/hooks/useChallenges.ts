import { useState, useEffect, useCallback } from 'react';
import { ChallengeSubmission } from '@/types';
import { Rank, Challenge } from '@prisma/client';
import { useSubmissionContext } from '@/contexts/SubmissionContext';
import { useSession } from 'next-auth/react';

interface UseChallengesProps {
  selectedRank?: Rank;
  onChallengeSelect?: (challenge: Challenge) => void;
}

// Helper function to convert ChallengeSubmission to Submission
const convertToSubmission = (sub: ChallengeSubmission) => {
  return {
    id: sub.id,
    challengeId: sub.challengeId,
    userId: sub.userId,
    status: sub.status,
    feedback: sub.feedback || undefined,
    createdAt: sub.createdAt,
    updatedAt: sub.reviewedAt || new Date()
  };
};

export function useChallenges({ selectedRank, onChallengeSelect }: UseChallengesProps) {
  const { data: session } = useSession();
  const { setSubmissions, refetchChallenges, setRefetchChallenges, state } = useSubmissionContext();
  const [submissions, setSubmissionsState] = useState<ChallengeSubmission[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenges = useCallback(async () => {
    try {
      const response = await fetch(`/api/challenges?rank=${selectedRank?.name}`);
      if (!response.ok) throw new Error('Failed to fetch challenges');
      const data = await response.json();
      setChallenges(data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
      setError('Error al cargar los desafíos');
    } finally {
      setLoading(false);
    }
  }, [selectedRank?.name]);

  // Update the context's refetchChallenges function
  useEffect(() => {
    if(refetchChallenges){
      const fetchData = async () => {
        await fetchChallenges();
        setRefetchChallenges(false);
      };
      
      fetchData();
    }
  }, [ refetchChallenges, ]);

  const fetchSubmissions = useCallback(async () => {
    if (!session?.user) return;

    try {
      const response = await fetch(`/api/submissions?userId=${session.user.email}`);
      if (!response.ok) throw new Error("Failed to fetch submissions");
      const data = await response.json();
      
      // Update local state with ChallengeSubmission data
      setSubmissionsState(data);
      
      // Convert and update the SubmissionContext
      const convertedSubmissions = data.map(convertToSubmission);
      
      // Update context with the new submissions
      setSubmissions(convertedSubmissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setError("Error al cargar las submissions");
    }
  }, [session?.user, setSubmissions]);

  // Fetch challenges when selected rank changes
  useEffect(() => {
   if(selectedRank){
    fetchChallenges();
   }
  }, [selectedRank]);

  // Fetch submissions when challenges are loaded
  useEffect(() => {
    if (challenges.length > 0) {
      fetchSubmissions();
    }
  }, [challenges,]);

  // Fetch submissions when a notification is received
  useEffect(() => {
    if (state.refreshLeaderboard) {
      fetchSubmissions();
    }
  }, [state.refreshLeaderboard, fetchSubmissions]);

  const getChallengeStatus = useCallback((challenge: Challenge) => {
    const submission = submissions.find(
      (s) => s.challengeId === challenge.id
    );
    if (!submission) return "NOT_STARTED";
    return submission.status;
  }, [submissions]);

  const handleSubmitChallenge = useCallback((challenge: Challenge) => {
    setSubmitting(challenge.id);

    if (onChallengeSelect) {
      onChallengeSelect(challenge);
    }
  }, [onChallengeSelect]);

  return {
    challenges,
    submissions,
    loading,
    submitting,
    error,
    getChallengeStatus,
    handleSubmitChallenge,
    refetchChallenges: fetchChallenges
  };
} 
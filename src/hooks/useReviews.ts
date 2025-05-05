import { useState, useEffect, useCallback, useRef } from 'react';
import { ReviewRequest, ReviewStatus } from '@/types/review';

export function useReviews() {
  const [reviews, setReviews] = useState<ReviewRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentFilterRef = useRef<ReviewStatus | undefined>(undefined);

  useEffect(() => {
    audioRef.current = new Audio('/notification.mp3');
  }, []);

  const fetchReviews = useCallback(async (status?: ReviewStatus) => {
    try {
      currentFilterRef.current = status;
      const url = status ? `/api/submissions?status=${status}` : '/api/submissions';
      const response = await fetch(url);
      const data = await response.json();
      setReviews(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las revisiones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let eventSource: EventSource | null = null;
    let retryCount = 0;
    const maxRetries = 5;

    const connectSSE = () => {
      if (retryCount >= maxRetries) {
        console.error('Max reconnection attempts reached');
        return;
      }

      eventSource = new EventSource('/api/submissions/events');
      
      eventSource.onmessage = (event) => {
        if (event.data === 'heartbeat') return;
        
        try {
          const newSubmission = JSON.parse(event.data);
          
          setReviews(prev => {
            if (!currentFilterRef.current || newSubmission.status === currentFilterRef.current) {
              const exists = prev.some(review => review.id === newSubmission.id);
              if (!exists) {
                audioRef.current?.play().catch(console.error);
                return [newSubmission, ...prev];
              }
            }
            return prev;
          });
          
        } catch (err) {
          console.error('Error parsing submission:', err);
        }
      };

      eventSource.onerror = () => {
        eventSource?.close();
        retryCount++;
        setTimeout(connectSSE, 5000);
      };
    };

    fetchReviews(currentFilterRef.current);
    connectSSE();

    return () => {
      eventSource?.close();
    };
  }, [fetchReviews]);

  const updateReview = async (id: string, status: 'APPROVED' | 'REJECTED', feedback: string) => {
    try {
      const response = await fetch(`/api/submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, feedback })
      });

      if (!response.ok) throw new Error('Error updating review');

      const updatedReview = await response.json();
      
      setReviews(prev => 
        prev.map(review => 
          review.id === id ? updatedReview : review
        )
      );

      return true;
    } catch (error) {
      console.error('Error updating review:', error);
      return false;
    }
  };

  return { reviews, loading, error, fetchReviews, updateReview };
} 
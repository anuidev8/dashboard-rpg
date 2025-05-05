'use client';

import { useEffect} from 'react';
import { ReviewRequest, ReviewStatus } from '@/types/review';
import { useReviews } from '@/hooks/useReviews';


interface ReviewListProps {
  onSelectReview: (review: ReviewRequest | null, currentFilter: ReviewStatus | 'all') => void;
  selectedReviewId?: string;
  refreshTrigger: number;
  currentFilter: ReviewStatus | 'all';
}

export function ReviewList({ onSelectReview, selectedReviewId, refreshTrigger, currentFilter }: ReviewListProps) {
  const { reviews, loading, error, fetchReviews } = useReviews();


  useEffect(() => {
    fetchReviews(currentFilter === 'all' ? undefined : currentFilter);
  }, [refreshTrigger, currentFilter]);

  const handleFilterChange = async (newFilter: ReviewStatus | 'all') => {
    onSelectReview(null, newFilter);
    await fetchReviews(newFilter === 'all' ? undefined : newFilter);
  };

  if (loading) return <div className="p-4 text-gray-300">Cargando...</div>;
  if (error) return <div className="p-4 text-red-400">{error}</div>;

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-100">Revisiones</h2>
      
      </div>

      <div className="flex gap-2 mb-6 bg-gray-800 p-2 rounded-lg">
        <button
          onClick={() => handleFilterChange('all')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            currentFilter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => handleFilterChange('PENDING')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            currentFilter === 'PENDING' 
              ? 'bg-yellow-600 text-white' 
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          Pendientes
        </button>
        <button
          onClick={() => handleFilterChange('APPROVED')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            currentFilter === 'APPROVED' 
              ? 'bg-green-600 text-white' 
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          Aprobados
        </button>
        <button
          onClick={() => handleFilterChange('REJECTED')}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            currentFilter === 'REJECTED' 
              ? 'bg-red-600 text-white' 
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          Rechazados
        </button>
      </div>

      <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {reviews.map(review => (
          <div
            key={review.id}
            onClick={() => onSelectReview(review, currentFilter)}
            className={`p-6 rounded-lg cursor-pointer transition-all transform hover:scale-[1.02] ${
              selectedReviewId === review.id 
                ? 'bg-blue-600 shadow-lg' 
                : 'bg-gray-800 hover:bg-gray-750'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-gray-100">{review.challenge.name}</h3>
              <span className={`text-xs px-3 py-1 rounded-full ${
                review.status === 'PENDING' ? 'bg-yellow-600 text-yellow-100' :
                review.status === 'APPROVED' ? 'bg-green-600 text-green-100' : 
                'bg-red-600 text-red-100'
              }`}>
                {review.status === 'PENDING' ? 'Pendiente' :
                 review.status === 'APPROVED' ? 'Aprobado' : 'Rechazado'}
              </span>
            </div>
            <p className="text-sm text-gray-300 mb-2">{review.userName}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{new Date(review.submissionDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>{review.challenge.rankName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
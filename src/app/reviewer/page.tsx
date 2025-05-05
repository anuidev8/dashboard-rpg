'use client';

import { useState } from 'react';
import { ReviewRequest, ReviewStatus } from '@/types/review';
import { ReviewList } from '@/components/reviewer/ReviewList';
import { ReviewDetail } from '@/components/reviewer/ReviewDetail';
import { Header } from '@/components/ui/common/Header';

export default function ReviewerPage() {
  const [selectedReview, setSelectedReview] = useState<ReviewRequest | null>(null);
  const [currentFilter, setCurrentFilter] = useState<ReviewStatus | 'all'>('PENDING');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSelectReview = (review: ReviewRequest | null, filter: ReviewStatus | 'all') => {
    setSelectedReview(review);
    setCurrentFilter(filter);
  };

  const handleReviewComplete = () => {
    setSelectedReview(null);
    setRefreshTrigger(prev => prev + 1); // Forzar actualización de la lista
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white relative background-pattern">
      <Header />

      <div className="container mx-auto px-4 py-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <ReviewList 
              onSelectReview={handleSelectReview}
              selectedReviewId={selectedReview?.id}
              refreshTrigger={refreshTrigger}
              currentFilter={currentFilter}
            />
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            {selectedReview ? (
              <ReviewDetail 
                review={selectedReview}
                currentFilter={currentFilter}
                onReviewComplete={handleReviewComplete}
              />
            ) : (
              <div className="text-gray-400 text-center p-6">
                Selecciona una revisión para ver los detalles
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 
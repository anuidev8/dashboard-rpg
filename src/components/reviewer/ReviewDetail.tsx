'use client';

import { useState } from 'react';
import { ReviewRequest, ReviewStatus } from '@/types/review';
import { useReviews } from '@/hooks/useReviews';

interface ReviewDetailProps {
  review: ReviewRequest;
  currentFilter: ReviewStatus | 'all';
  onReviewComplete: () => void;
}

export function ReviewDetail({ review, currentFilter, onReviewComplete }: ReviewDetailProps) {
  const [feedback, setFeedback] = useState(review.feedback || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateReview, fetchReviews } = useReviews();

  const handleReview = async (action: 'APPROVED' | 'REJECTED') => {
    if (!feedback && action === 'REJECTED') {
      alert('Por favor, proporciona feedback para rechazar la solicitud');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await updateReview(review.id, action, feedback);
      if (success) {
        await fetchReviews(currentFilter === 'all' ? undefined : currentFilter);
        alert(`Revisión ${action === 'APPROVED' ? 'aprobada' : 'rechazada'} con éxito`);
        onReviewComplete();
      }
    } catch (error) {
      console.error('Error al procesar la revisión:', error);
      alert('Error al procesar la revisión');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{review.challenge.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-bold mb-2">Detalles del Desafío</h3>
          <p className="text-gray-300">{review.challenge.description}</p>
          <div className="mt-4">
            <h4 className="font-bold mb-2">Evidencia del Usuario</h4>
            <p className="text-gray-300">{review.evidence}</p>
          </div>
        </div>
        
        <div>
          <h3 className="font-bold mb-2">Información del Usuario</h3>
          <p className="text-gray-300">{review.userName}</p>
          <p className="text-gray-400 text-sm">
            Enviado el: {new Date(review.submissionDate).toLocaleDateString()}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Rango: {review.challenge.rankName}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-bold mb-2">
          Feedback
        </label>
        <textarea
          className="w-full bg-gray-700 rounded-lg p-3 min-h-[120px]"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Escribe tu feedback aquí..."
          disabled={isSubmitting}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => handleReview('APPROVED')}
          disabled={isSubmitting}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex-1 disabled:opacity-50"
        >
          Aprobar
        </button>
        <button
          onClick={() => handleReview('REJECTED')}
          disabled={isSubmitting}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg flex-1 disabled:opacity-50"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
} 
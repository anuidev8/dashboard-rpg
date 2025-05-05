import { Challenge } from '@prisma/client';
import { MedievalSharp } from 'next/font/google';

const medievalSharp = MedievalSharp({ weight: '400', subsets: ['latin'] });

interface ChallengeCardProps {
  challenge: Challenge;
  status: string;
  submitting: string | null;
  onSubmit: (challenge: Challenge) => void;
}

export function ChallengeCard({ challenge, status, submitting, onSubmit }: ChallengeCardProps) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 h-full flex flex-col">
      <h3 className={`${medievalSharp.className} text-lg text-yellow-400 mb-2`}>
        {challenge.name}
      </h3>
      <p className="text-gray-300 text-sm mb-4 flex-grow">
        {challenge.description}
      </p>
      <div className="mt-auto">
        {status === 'NOT_STARTED' ? (
          <button
            onClick={() => onSubmit(challenge)}
            disabled={submitting === challenge.id}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting === challenge.id ? 'Enviando...' : 'Completar Reto'}
          </button>
        ) : status === 'REJECTED' ? (
          <>
            <button
              onClick={() => onSubmit(challenge)}
              disabled={submitting === challenge.id}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting === challenge.id ? 'Enviando...' : 'Intentar completar'}
            </button>
            <p className="text-xs text-red-400 mt-1 text-center">Reto rechazado</p>
          </>
        ) : status === 'PENDING' ? (
          <div className="text-center py-2 px-4 rounded bg-gray-700">
            <span className="text-yellow-400">⏳ Pendiente de revisión</span>
          </div>
        ) : (
          <div className="text-center py-2 px-4 rounded bg-green-700">
            <span className="text-white">✅ Completado</span>
          </div>
        )}
      </div>
    </div>
  );
} 
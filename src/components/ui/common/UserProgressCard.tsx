'use client'
import { MedievalSharp } from 'next/font/google'
const medievalSharp = MedievalSharp({ weight: '400', subsets: ['latin'] })

interface UserProgressCardProps {
  progress: {
    currentRank: string;
    totalPoints: number;
    progressPercentage: number;
  }
}

export function UserProgressCard({ progress }: UserProgressCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg mt-4">
      <h2 className={`${medievalSharp.className} text-xl md:text-2xl mb-4 text-yellow-400`}>
        Tu Progreso
      </h2>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center">
          <span className="text-3xl mr-2">🏅</span>
          <div>
            <p className={`${medievalSharp.className}`}>{progress.currentRank}</p>
            <p className="text-sm text-gray-300">Puntaje Total: {progress.totalPoints}</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm">Progreso al siguiente rango</span>
          <span className="text-sm font-bold">{progress.progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress.progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

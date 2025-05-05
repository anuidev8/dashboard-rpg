'use client'
import { useEffect, useRef } from 'react'
import { MedievalSharp } from 'next/font/google'

const medievalSharp = MedievalSharp({ weight: '400', subsets: ['latin'] })

interface Challenge {
  name: string;
  insignia: string;
  description: string;
  difficulty: string;
  xp: number;
}

interface SelectedChallengeCardProps {
  selectedChallenge: Challenge
}

export function SelectedChallenge({ selectedChallenge}: SelectedChallengeCardProps) {

  return (
    <div className="relative w-full h-full">
     
    </div>
  )
}

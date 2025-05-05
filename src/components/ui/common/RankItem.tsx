"use client"

import Image from "next/image"
import { MedievalSharp } from "next/font/google"
import type { Rank } from "@prisma/client"


const medievalSharp = MedievalSharp({ weight: "400", subsets: ["latin"] })

interface RankItemProps {
  rank: Rank
  rankProgress: number
  isLocked: boolean
  isSelected: boolean
  challengeName: string
  blurLevel: string
  onClick: () => void
}

export function RankItem({
  rank,
  rankProgress,
  isLocked,
  isSelected,
  challengeName,
  blurLevel,
  onClick,
}: RankItemProps) {
  return (
    <div
      className={`
        mb-4 cursor-pointer h-[calc(100vh-30rem)] md:h-[320px] relative p-2 py-4 rounded overflow-hidden transition-all duration-300
        ${isSelected ? "ring-2 ring-yellow-400" : ""}
        ${isLocked ? "opacity-80 cursor-not-allowed" : ""}
        border-2 border-yellow-500 clip-octagon shadow-[inset_0_5px_3px_rgba(0,0,0,0.8)]
      `}
      onClick={onClick}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <div className="w-full h-full">
          <Image
            src={rank.icon || "/placeholder.svg"}
            alt={rank.name}
            fill
            className={`object-cover transition-all duration-300 ${blurLevel}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            data-atropos-offset="0"
          />
          {/* Gradient overlay - more visible at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-yellow-500/20 via-black/40 to-transparent"></div>
        </div>
      </div>

      {/* Lock icon for locked ranks */}
      {isLocked && (
    <div className="absolute inset-0 flex items-center justify-center z-10 shadow-xl">
    <div className="rounded-lg overflow-hidden shadow-lg shadow-black/50">
      <Image
        src="/images/obj/silver-shield.svg"
        alt="Locked"
        width={60}
        height={60}
        className="object-contain"
      />
    </div>
  </div>
      )}

      {/* Title and description area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 w-full z-10">
        <div className="flex flex-col items-center rounded-lg p-1  w-full">
          <span className={`${medievalSharp.className} text-yellow-400 text-base mb-1`}>{rank.title}</span>
          <span className="text-sm text-gray-200 mb-3">{isLocked ? "Bloqueado" : challengeName}</span>

         {/* Progress bar container */}
         <div className="w-full bg-gray-800/80 rounded-full h-4 p-0.5 border border-yellow-600/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
            {/* Progress bar */}
            <div
              className={`h-full rounded-full transition-all duration-300 relative overflow-hidden ${
                isLocked ? "bg-gray-600" : "bg-gradient-to-r from-green-600 to-green-400"
              }`}
              style={{ width: `${rankProgress}%` }}
            >
              {/* Progress shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              {/* Inner shadow for depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-1/2"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>

          {/* Progress percentage */}
          <div className="w-full flex justify-between mt-1 text-xs text-yellow-300">
            <span>{rankProgress}%</span>
            {rankProgress === 100 && <span>✅ Completed</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

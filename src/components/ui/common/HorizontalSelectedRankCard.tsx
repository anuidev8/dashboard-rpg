"use client"

import { MedievalSharp } from "next/font/google"
import Image from "next/image"
import { useSubmissionContext } from "@/contexts/SubmissionContext"
import { useRankProgress } from "@/hooks/useRankProgress"
import { GoldenBorderClip } from "./containers/golden-border"
import { useMemo } from "react"

const medievalSharp = MedievalSharp({ weight: "400", subsets: ["latin"] })

export function HorizontalSelectedRankCard() {
  const { selectedRank, ranks } = useSubmissionContext()
  const { progress,getBlurLevel } = useRankProgress({
    ranks,
    selectedRank: selectedRank || ranks[0],
    setSelectedRank: () => {},
  })

  const rankProgress = progress?.rankProgress[selectedRank?.name || ""]?.progress || 0
  const isComplete = rankProgress >= 100
  const isAlmostComplete = rankProgress >= 90
  const isInProgress = rankProgress > 0
  const shouldShowTimer = rankProgress < 50
  const blurLevel = useMemo(() => getBlurLevel(rankProgress), [rankProgress])
  if (!selectedRank) return null

  return (
    <GoldenBorderClip borderWidth={2} className="w-full mt-6" hideOnMobile={true}>
      <div className="relative w-full bg-gradient-to-r from-black/80 via-yellow-500/20 to-black/80 rounded-xl p-3 flex items-center gap-4">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/obj/paper-texture.png"
            alt="Background"
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* Rank Image */}
        <div className="relative w-16 h-16 shrink-0">
          <Image
            src={selectedRank.icon}
            alt={selectedRank.name}
            fill
            className={`object-cover rounded-lg ${blurLevel}`}
          />
           {shouldShowTimer && (
                <div className="w-16 h-16 rounded-lg bg-[white]/40 flex  blur-sm">
                </div>
              )}
        </div>  
       

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`${medievalSharp.className} text-lg text-[#C9A356] truncate`}>
            {selectedRank.title}
          </h3>
          
          {/* Progress bar */}
          <div className="mt-2 w-full">
            <div className="w-full bg-gray-800/50 rounded-full h-2 border border-[#C9A356]/30 relative overflow-hidden">
              {/* Glowing effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A356]/10 to-transparent animate-pulse"></div>
              
              {/* Progress indicator */}
              <div
                className={`h-full rounded-full transition-all duration-300 relative ${
                  isComplete ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  isAlmostComplete ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  isInProgress ? 'bg-gradient-to-r from-blue-800 to-blue-400' :
                  'bg-gradient-to-r from-gray-500 to-gray-700'
                }`}
                style={{ width: `${rankProgress}%` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
              </div>
            </div>
            
            {/* Progress text */}
            <p className={`${medievalSharp.className} text-xs text-[#C9A356] mt-1`}>
              {rankProgress}%
            </p>
          </div>
        </div>
      </div>
    </GoldenBorderClip>
  )
} 
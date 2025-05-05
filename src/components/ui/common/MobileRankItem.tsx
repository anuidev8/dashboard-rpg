import { MedievalSharp } from "next/font/google"
import Image from "next/image"
import { GoldenBorderClip } from "./containers/golden-border"
import { Rank } from "@prisma/client"
import { ChevronRightIcon } from "@heroicons/react/24/solid"

const medievalSharp = MedievalSharp({ weight: "400", subsets: ["latin"] })

interface MobileRankItemProps {
  rank: Rank
  rankProgress: number
  isLocked: boolean
  isSelected?: boolean
  challengeName: string
  blurLevel: string
  onClick?: () => void
}

export function MobileRankItem({ 
  rank, 
  rankProgress,
  isLocked,
  isSelected, 
  challengeName,
  blurLevel,
  onClick 
}: MobileRankItemProps) {
  const isComplete = rankProgress >= 100
  const isAlmostComplete = rankProgress >= 90
  const isInProgress = rankProgress > 0
  const shouldShowTimer = rankProgress < 50

  return (
    <div 
      onClick={onClick}
      className={`w-full transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${isSelected ? 'scale-[1.02] ring-2 ring-[#C9A356]/50 rounded-xl' : ''}`}
    >
      <GoldenBorderClip borderWidth={2} className="w-full" hideOnMobile={true}>
        <div className={`relative w-full bg-gradient-to-r from-black/80 via-yellow-500/20 to-black/80 rounded-xl p-3 flex items-center gap-4 ${isLocked ? 'opacity-50' : ''}`}>
          {/* Background Image */}
          {isLocked && (
            <div className="relative shrink-0">
              <div className="rounded-lg overflow-hidden shadow-lg shadow-black/50">
                <Image
                  src="/images/obj/silver-shield.svg"
                  alt="Locked"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
          )}
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/obj/paper-texture.png"
              alt="Background"
              fill
              className="object-cover rounded-xl"
            />
          </div>

          {/* Rank Image */}
          {!isLocked && 
            <div className="relative w-16 h-16 shrink-0">
              <Image
                src={rank.icon}
                alt={rank.name}
                fill
                className={`object-cover rounded-lg ${blurLevel}`}
              />
              {shouldShowTimer && (
                <div className="w-16 h-16 rounded-lg bg-[white]/40 flex items-center justify-center blur-sm">
                </div>
              )}
            </div>
          }

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`${medievalSharp.className} text-lg text-[#C9A356] truncate`}>
              {rank.title}
            </h3>
            
            {/* Challenge Name */}
            <p className={`${medievalSharp.className} text-sm text-[#C9A356]/80 truncate mb-2`}>
              {challengeName}
            </p>
            
            {/* Progress bar */}
            <div className="w-full">
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

          {/* Click indicator */}
          {!isLocked && (
            <div className="shrink-0 flex items-center">
              <ChevronRightIcon className="w-5 h-5 text-[#C9A356] animate-bounce-x" />
            </div>
          )}
        </div>
      </GoldenBorderClip>
    </div>
  )
} 
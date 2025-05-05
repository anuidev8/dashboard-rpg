"use client"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface MedievalFuturisticLoaderProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showText?: boolean
  loadingText?: string
  unlockAnimation?: boolean
  unlockDuration?: number
}

export const MedievalFuturisticLoader = ({
  size = "md",
  className,
  showText = true,
  loadingText = "Loading",
  unlockAnimation = true,
  unlockDuration = 3000,
}: MedievalFuturisticLoaderProps) => {
  const [dots, setDots] = useState("")
  const [unlocked, setUnlocked] = useState(false)
  const [unlockProgress, setUnlockProgress] = useState(0)

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""))
    }, 500)

    return () => clearInterval(dotsInterval)
  }, [])

  useEffect(() => {
    if (!unlockAnimation) return

    let animationFrame: number
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const totalDuration = unlockDuration * 1.5 // Total cycle duration (unlock + pause + reset)
      const cycleTime = elapsed % totalDuration

      // Calculate progress based on where we are in the cycle
      let progress = 0

      if (cycleTime < unlockDuration) {
        // Unlocking phase (0 to 1)
        progress = Math.min(cycleTime / unlockDuration, 1)
        setUnlocked(progress >= 1)
      } else if (cycleTime < unlockDuration * 1.2) {
        // Pause while unlocked
        progress = 1
        setUnlocked(true)
      } else {
        // Closing phase (1 to 0)
        const resetDuration = unlockDuration * 0.3
        const resetTime = cycleTime - unlockDuration * 1.2
        progress = Math.max(1 - resetTime / resetDuration, 0)
        setUnlocked(progress >= 1)
      }

      setUnlockProgress(progress)
      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [unlockAnimation, unlockDuration])

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40",
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  }

  // Calculate shield parts position based on unlock progress
  const leftShieldTransform = unlockProgress > 0 ? `translateX(-${unlockProgress * 10}px)` : "translateX(0)"
  const rightShieldTransform = unlockProgress > 0 ? `translateX(${unlockProgress * 10}px)` : "translateX(0)"
  const shieldOpacity = unlocked ? 0.9 : 0.7
  const glowIntensity = unlocked ? 8 : 3

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Outer Ring - Static */}
        <div className="absolute inset-0 rounded-full border-4 border-[#8B7D3A] opacity-30"></div>

    

        {/* Inner Circle - Pulsing */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F9DF74] to-[#B8860B] opacity-20 animate-pulse"></div>

        {/* Center Emblem */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-1/2 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation={glowIntensity} result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={unlocked ? "#FFD700" : "#D4AF37"} />
                  <stop offset="50%" stopColor={unlocked ? "#FFEC8B" : "#F9DF74"} />
                  <stop offset="100%" stopColor={unlocked ? "#DAA520" : "#B8860B"} />
                </linearGradient>
              </defs>

              {/* Shield Base - Left Half */}
              <path
                d="M50 10 L25 25 L25 60 C25 75 35 85 50 90 Z"
                fill="url(#shieldGradient)"
                filter="url(#glow)"
                className="animate-pulse-slow"
                style={{
                  transform: leftShieldTransform,
                  opacity: shieldOpacity,
                  transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                }}
              />

              {/* Shield Base - Right Half */}
              <path
                d="M50 10 L75 25 L75 60 C75 75 65 85 50 90 Z"
                fill="url(#shieldGradient)"
                filter="url(#glow)"
                className="animate-pulse-slow"
                style={{
                  transform: rightShieldTransform,
                  opacity: shieldOpacity,
                  transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                }}
              />

              {/* Lock Mechanism */}
              <circle
                cx="50"
                cy="45"
                r={unlocked ? 8 : 5}
                fill={unlocked ? "#FFEC8B" : "#D4AF37"}
                filter="url(#glow)"
                style={{ transition: "r 0.3s ease-in-out, fill 0.3s ease-in-out" }}
              />

              {/* Lock Keyhole */}
              {!unlocked && (
                <path
                  d="M50 42 L50 48 M48 45 A2 2 0 0 0 52 45"
                  stroke="#333"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                />
              )}

              {/* Sword */}
              <path
                d="M50 20 L50 70 M40 30 L60 30"
                stroke="#F9DF74"
                strokeWidth="3"
                strokeLinecap="round"
                filter="url(#glow)"
                style={{
                  opacity: unlocked ? 1 : 0.7,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />

              {/* Futuristic Circuit Lines */}
              <path
                d="M35 45 L45 45 L45 55 L55 55 L55 45 L65 45"
                stroke="#F9DF74"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                className="animate-pulse-slow"
                style={{
                  opacity: unlocked ? 1 : 0.7,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />
              <path
                d="M35 65 L45 65 L45 60 L55 60 L55 65 L65 65"
                stroke="#F9DF74"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                className="animate-pulse-slow"
                style={{
                  opacity: unlocked ? 1 : 0.7,
                  transition: "opacity 0.3s ease-in-out",
                }}
              />

              {/* Energy Beams when unlocked */}
              {unlocked && (
                <>
                  <path
                    d="M50 45 L30 25 M50 45 L70 25 M50 45 L30 65 M50 45 L70 65"
                    stroke="#FFEC8B"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                    opacity="0.8"
                    filter="url(#glow)"
                  />
                  <circle
                    cx="50"
                    cy="45"
                    r="12"
                    fill="none"
                    stroke="#FFEC8B"
                    strokeWidth="1"
                    opacity="0.8"
                    filter="url(#glow)"
                  />
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Rotating Runes */}
        <div className="absolute inset-0 animate-spin-reverse-slow">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 50 50)`}>
                <text
                  x="50"
                  y="15"
                  fontSize="6"
                  fill={unlocked ? "#FFEC8B" : "#F9DF74"}
                  textAnchor="middle"
                  filter="url(#glow)"
                  className="font-medieval"
                  style={{ transition: "fill 0.3s ease-in-out" }}
                >
                  {["⚔", "✧", "⚜", "⚝", "✦", "⚔", "✧", "⚜"][i]}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {showText && (
        <div className={cn("mt-4 text-center font-medieval text-[#D4AF37]", textSizeClasses[size])}>
          <span className="tracking-wider">
            {unlocked ? "Unlocked" : loadingText}
            {!unlocked && dots}
          </span>
        </div>
      )}
    </div>
  )
}

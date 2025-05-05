'use client'

import { useState, useRef, useEffect } from "react"
import { ScrollText } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChallengeRulesDisplayProps {
  rules: string
}

export default function ChallengeRulesDisplay({ rules }: ChallengeRulesDisplayProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [paperHeight, setPaperHeight] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // Number of paper strips
  const stripCount = 8

  useEffect(() => {
    if (contentRef.current) {
      setPaperHeight(contentRef.current.scrollHeight)
    }
  }, [rules])

  // Generate random torn path for each strip
  const generateTornPath = (index: number, isTop: boolean) => {
    const width = 100
    const segments = 10
    const segmentWidth = width / segments
    const roughness = 1.5

    let path = `M 0,${isTop ? 0 : 1} `

    for (let i = 0; i <= segments; i++) {
      const x = i * segmentWidth
      const yVariation = Math.random() * roughness
      const y = isTop ? yVariation : 1 - yVariation
      path += `L ${x},${y} `
    }

    path += `L ${width},${isTop ? 0 : 1} L ${width},${isTop ? -0.5 : 1.5} L 0,${isTop ? -0.5 : 1.5} Z`

    return path
  }

  const stripHeights = Array.from({ length: stripCount }, (_, i) => {
    const baseHeight = 100 / stripCount
    const variation = baseHeight * 0.2
    return baseHeight + (Math.random() * variation - variation / 2)
  })

  const totalHeight = stripHeights.reduce((sum, height) => sum + height, 0)
  const normalizedHeights = stripHeights.map((height) => (height / totalHeight) * 100)

  const cumulativeHeights = normalizedHeights.reduce(
    (acc, height, i) => {
      acc.push((acc[i] || 0) + height)
      return acc
    },
    [0],
  )

  return (
    <div className="relative">
      {/* Scroll header */}
      <div
        className="relative z-10 flex items-center gap-3 bg-[#8B7500] rounded-t-lg p-3 cursor-pointer shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ScrollText className="h-5 w-5 text-[#D4AF37]" />
        <h2 className="text-base font-serif text-[#D4AF37]">Reglas del Desafío</h2>
        <div className="ml-auto text-[#D4AF37] text-sm font-serif">
          {isOpen ? "Cerrar" : "Ver Reglas"}
        </div>
      </div>

      {/* Paper content container */}
      <div
        className={cn(
          "relative overflow-hidden transition-all duration-700 ease-in-out rounded-b-lg shadow-lg",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        style={{
          height: isOpen ? paperHeight + 40 : 0,
          transformOrigin: "top center",
          backgroundImage: "url('/images/obj/paper-texture.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* SVG Paper Strips */}
        <div className="absolute inset-0 w-full h-full opacity-50">
          {Array.from({ length: stripCount }).map((_, index) => {
            const startPercent = cumulativeHeights[index]
            const heightPercent = normalizedHeights[index]
            const delay = index * 0.1

            return (
              <div
                key={index}
                className="absolute w-full"
                style={{
                  top: `${startPercent}%`,
                  height: `${heightPercent}%`,
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 1"
                  preserveAspectRatio="none"
                  className="absolute top-0 left-0 w-full"
                >
                  {index > 0 && <path d={generateTornPath(index, true)} fill="#f5e7cb" className="drop-shadow-sm" />}
                </svg>

                <div
                  className={cn(
                    "w-full h-full bg-[#f5e7cb] transition-transform duration-1000 ease-in-out",
                    isOpen ? "translate-y-0" : "-translate-y-full",
                  )}
                  style={{
                    transitionDelay: `${delay}s`,
                    backgroundImage:
                      'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" opacity="0.1"><rect width="100" height="100" fill="%23d4b483" opacity="0.2"/><circle cx="20" cy="30" r="10" fill="%23c19a6b" opacity="0.1"/><circle cx="70" cy="60" r="15" fill="%23d4b483" opacity="0.1"/></svg>\')',
                  }}
                ></div>

                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 1"
                  preserveAspectRatio="none"
                  className="absolute bottom-0 left-0 w-full"
                >
                  {index < stripCount - 1 && (
                    <path
                      d={generateTornPath(index, false)}
                      fill="#f5e7cb"
                      className="drop-shadow-sm"
                      style={{
                        transform: "translateY(-1px)",
                      }}
                    />
                  )}
                </svg>
              </div>
            )
          })}
        </div>

        {/* Paper content */}
        <div
          ref={contentRef}
          className={cn(
            "relative z-10 p-4 pt-6 font-serif text-amber-950 leading-relaxed opacity-0 transition-opacity duration-500",
            isOpen && "opacity-100",
          )}
          style={{
            transitionDelay: `${stripCount * 0.1 + 0.2}s`,
          }}
        >
          {rules}

          {/* Decorative elements */}
          <div className="flex justify-center mt-4 pb-2">
            <div className="w-16 h-1 bg-[#8B7500]/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Shadow effect */}
      <div
        className={cn(
          "absolute left-0 right-0 h-4 bg-gradient-to-b from-black/20 to-transparent transition-all duration-700",
          isOpen ? "opacity-100" : "opacity-0",
        )}
        style={{
          bottom: "-4px",
          zIndex: -1,
        }}
      ></div>
    </div>
  )
} 
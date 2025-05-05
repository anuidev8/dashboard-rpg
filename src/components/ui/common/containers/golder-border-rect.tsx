import type React from "react"
import type { ReactNode } from "react"
import "@/styles/golden-border-rect.css"

export interface GoldenBorderRectProps {
  children: ReactNode
  className?: string
  width?: string | number
  animationDuration?: number
  borderWidth?: number
  cornerSize?: number
}

export const GoldenBorderRectClip: React.FC<GoldenBorderRectProps> = ({
  children,
  className = "",
  width = "100%",
  animationDuration = 3,
  borderWidth = 2,
  cornerSize = 15,
}) => {
  return (
    <div
      className={`golden-border-rect-container h-full ${className}`}
      style={
        {
          width,
          "--animation-duration": `${animationDuration}s`,
          "--border-width": `${borderWidth}px`,
          "--corner-size": `${cornerSize}px`,
        } as React.CSSProperties
      }
    >
      {/* Border layer with clip-path */}
      <div className="golden-border-rect-layer"></div>

      {/* Content layer */}
      <div className="golden-content-rect bg-[#1A1A1D] h-full shadow-[inset_0_8px_3px_rgba(0,0,0,0.8)]">{children}</div>
    </div>
  )
}

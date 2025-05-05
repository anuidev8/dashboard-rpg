import type React from "react"
import type { ReactNode } from "react"
import "@/styles/golden-border.css"

export interface GoldenBorderProps {
  children: ReactNode
  className?: string
  width?: string | number
  animationDuration?: number
  borderWidth?: number
  cornerSize?: number
  hideOnMobile?: boolean
}

export const GoldenBorderClip: React.FC<GoldenBorderProps> = ({
  children,
  className = "",
  width = "100%",
  animationDuration = 3,
  borderWidth = 2,
  cornerSize = 15,
  hideOnMobile = false,
}) => {
  if (hideOnMobile) {
    return (
      <>
        {/* Mobile version without border */}
        <div className={`md:hidden ${className}`} style={{ width } as React.CSSProperties}>
          {children}
        </div>
        
        {/* Desktop version with border */}
        <div className={`hidden md:block golden-border-clip-container ${className}`}
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
          <div className="golden-border-clip-layer"></div>

          {/* Content layer */}
          <div className="golden-content-clip bg-[#1A1A1D] h-full shadow-[inset_0_8px_3px_rgba(0,0,0,0.8)]" >{children}</div>
        </div>
      </>
    )
  }

  return (
    <div
      className={`golden-border-clip-container ${className}`}
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
      <div className="golden-border-clip-layer"></div>

      {/* Content layer */}
      <div className="golden-content-clip bg-[#1A1A1D] h-full shadow-[inset_0_8px_3px_rgba(0,0,0,0.8)]" >{children}</div>
    </div>
  )
}

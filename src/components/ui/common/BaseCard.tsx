import { ReactNode } from 'react';
import { MedievalSharp } from "next/font/google";

const medievalSharp = MedievalSharp({ weight: "400", subsets: ["latin"] });

interface BaseCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  gradientOverlay?: boolean;
  backgroundImage?: string;
  borderColor?: string;
  shadowStyle?: string;
}

export function BaseCard({
  title,
  children,
  className = "",
  gradientOverlay = true,
  backgroundImage,
  borderColor = "yellow-500",
  shadowStyle = "shadow-[inset_0_5px_3px_rgba(0,0,0,0.8)]"
}: BaseCardProps) {
  return (
    <div className={`relative rounded-lg p-4 min-h-[220px] flex flex-col border-2 border-${borderColor} ${shadowStyle} overflow-hidden bg-gray-800/50 ${className}`}>
      {/* Gradient overlay */}
      {gradientOverlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-yellow-500/20 via-black/40 to-transparent -z-10"></div>
      )}
      
      {/* Background image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 -z-20"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      )}
      
      {/* Title */}
      {title && (
        <h3 className={`${medievalSharp.className} text-base text-yellow-400 mb-2 relative z-10`}>
          {title}
        </h3>
      )}
      
      {/* Content */}
      <div className="relative z-10 flex-grow">
        {children}
      </div>
    </div>
  );
} 
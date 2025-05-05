'use client'

import { useState } from 'react';
import { Info } from 'lucide-react';
import { MedievalSharp } from "next/font/google";

const medievalSharp = MedievalSharp({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface ChallengeRulesTooltipProps {
  rules: string;
  className?: string;
}

export function ChallengeRulesTooltip({ rules, className = '' }: ChallengeRulesTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  if (!rules) return null;

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        className="text-[#D4AF37] hover:text-[#F4CF47] transition-colors duration-200 focus:outline-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        aria-label="Ver reglas del desafío"
      >
        <Info className="h-5 w-5" />
      </button>
      
      {isVisible && (
        <div 
          className="absolute z-50 w-64 md:w-80 p-4 mt-2 bg-[#121212] border border-[#8B7500]/40 rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.15)]"
          style={{
            backgroundImage: "url('/images/obj/paper-texture-dark.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
          
          {/* Gold corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#8B7500]"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#8B7500]"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#8B7500]"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#8B7500]"></div>
          
          <div className="relative z-10">
            <h3 className={`${medievalSharp.className} text-[#D4AF37] text-lg mb-2`}>Reglas del Desafío</h3>
            <div className="text-gray-300 text-sm space-y-2">
              {rules.split('\n').map((rule, index) => (
                <p key={index}>{rule}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
'use client';

import { MedievalSharp } from 'next/font/google';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

const medievalSharp = MedievalSharp({ weight: '400', subsets: ['latin'] });

interface CustomToastProps {
  message: string;
  type: 'submission' | 'approved' | 'rejected';
}

export function CustomToast({ message, type }: CustomToastProps) {
  return (
    <div 
      className="relative overflow-hidden rounded-lg border"
      style={{ 
        backgroundImage: "url('/images/obj/paper-texture.png')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
      }}
    >
      {/* Animated border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A356]/30 to-transparent animate-shimmer"></div>
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#C9A356]/60"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#C9A356]/60"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#C9A356]/60"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#C9A356]/60"></div>

      <div className={`
        p-4 flex items-start gap-3 relative z-10
        ${type === 'approved' ? 'border-green-500/30' : 
          type === 'rejected' ? 'border-red-500/30' : 
          'border-[#C9A356]/30'}
      `}>
        <div className="shrink-0">
          {type === 'approved' ? (
            <CheckCircle className="text-green-400 h-5 w-5" />
          ) : type === 'rejected' ? (
            <AlertCircle className="text-red-400 h-5 w-5" />
          ) : (
            <Clock className="text-[#C9A356] h-5 w-5" />
          )}
        </div>

        <div className="flex-1">
          <p className={`${medievalSharp.className} text-sm text-white`}>
            {message}
          </p>
        </div>
      </div>

      {/* Glowing effect at the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#C9A356]/50 to-transparent"></div>
    </div>
  );
} 
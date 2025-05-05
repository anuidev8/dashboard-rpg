'use client';

import { useSession } from '@/providers/session-provider';
import { MedievalSharp } from 'next/font/google';
import { useEffect, useState } from 'react';

const medievalSharp = MedievalSharp({ weight: '400', subsets: ['latin'] });

export function UserXPCircle() {
  const { user } = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  
  // Show the component after a short delay for a nice entrance effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Simulate XP and level (in a real app, this would come from the user data)
  useEffect(() => {
    // For demo purposes, we'll use a fixed XP value
    // In a real app, this would come from user.progress.experience
    const userXp = user?.progress?.experience || 0;
    setXp(userXp);
    
    // Calculate level based on XP (simple formula: level = 1 + floor(xp/100))
    setLevel(1 + Math.floor(userXp / 100));
  }, [user]);

  return (
    <div 
      className={`fixed left-6 hidden md:block bottom-6  z-50 transition-all duration-500 transform ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
      }`}
    >
      {/* Medieval and futuristic styled circle */}
      <div className="relative w-32 h-32 rounded-full bg-gray-900/80 backdrop-blur-sm border-2 border-[#C9A356]/50 shadow-lg overflow-hidden"
           style={{ backgroundImage: "url('/images/obj/paper-texture.png')", backgroundSize: 'cover',backgroundBlendMode: 'overlay',backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        {/* Outer decorative ring */}
        <div className="absolute -inset-1 rounded-full border border-[#C9A356]/30 animate-pulse"></div>
        
        {/* Inner decorative ring */}
        <div className="absolute inset-2 rounded-full border border-[#C9A356]/20"></div>
        
        {/* Glowing effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#C9A356]/5 to-transparent animate-pulse"></div>
        
        {/* XP Circle progress */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="rgba(201, 163, 86, 0.1)" 
              strokeWidth="5"
            />
            
            {/* Progress circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth="5"
              strokeDasharray={`${(xp % 100) * 2.83} 283`}
              strokeDashoffset="70.75"
              transform="rotate(-90 50 50)"
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9A356" />
                <stop offset="100%" stopColor="#8B6E3A" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          {/* Level */}
          <div className={`${medievalSharp.className} text-2xl text-[#C9A356] font-bold`}>
            {level}
          </div>
          
          {/* XP text */}
          <div className="text-xs text-gray-400">
            {xp} XP
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#C9A356]/50 to-transparent"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#C9A356]/50 to-transparent"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-gradient-to-b from-transparent via-[#C9A356]/50 to-transparent"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-gradient-to-b from-transparent via-[#C9A356]/50 to-transparent"></div>
      </div>
    </div>
  );
} 
'use client';


import { redirect, } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { MedievalSharp } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const medievalSharp = MedievalSharp({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function LandingPage() {

  const { status } = useSession();
  

  if (status === 'authenticated') {
  return redirect("/dashboard")
  }
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 opacity-90"></div>
        <Image
          src="/images/obj/tower.svg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className={`${medievalSharp.className} text-4xl md:text-6xl text-[#C9A356] mb-6 gold-glow`}>
            Academia del Estratega
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-8">
            Embárcate en un viaje de aprendizaje gamificado donde cada desafío te acerca a la maestría.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
          
              <Link 
                href="/dashboard" 
                className="relative group overflow-hidden bg-gradient-to-r from-[#C9A356] to-[#8B6E3A] text-gray-900 font-bold py-3 px-8 rounded-md transition-all duration-300 flex items-center justify-center border-2 border-[#C9A356]/50 shadow-[0_0_15px_rgba(201,163,86,0.3)] hover:shadow-[0_0_25px_rgba(201,163,86,0.5)]"
              >
                <span className="relative z-10">Ir a la Plataforma</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 relative z-10" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-[#E5B86B] to-[#C9A356] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C9A356]"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C9A356]"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C9A356]"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C9A356]"></div>
              </Link>
           
          </div>
        </div>

        {/* Features section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="relative group overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-[#C9A356]/30 rounded-lg p-6 backdrop-blur-sm shadow-[0_0_15px_rgba(201,163,86,0.1)] hover:shadow-[0_0_25px_rgba(201,163,86,0.2)] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A356]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C9A356]/50"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C9A356]/50"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C9A356]/50"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C9A356]/50"></div>
            <div className="relative z-10">
              <div className="text-[#C9A356] text-3xl mb-4">🏆</div>
              <h3 className={`${medievalSharp.className} text-[#C9A356] text-xl mb-2`}>Desafíos</h3>
              <p className="text-gray-300">Completa desafíos para ganar experiencia y avanzar en tu rango.</p>
            </div>
          </div>
          
          <div className="relative group overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-[#C9A356]/30 rounded-lg p-6 backdrop-blur-sm shadow-[0_0_15px_rgba(201,163,86,0.1)] hover:shadow-[0_0_25px_rgba(201,163,86,0.2)] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A356]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C9A356]/50"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C9A356]/50"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C9A356]/50"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C9A356]/50"></div>
            <div className="relative z-10">
              <div className="text-[#C9A356] text-3xl mb-4">📊</div>
              <h3 className={`${medievalSharp.className} text-[#C9A356] text-xl mb-2`}>Progreso</h3>
              <p className="text-gray-300">Sigue tu progreso y compite con otros en el tablero de clasificación.</p>
            </div>
          </div>
          
          <div className="relative group overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-[#C9A356]/30 rounded-lg p-6 backdrop-blur-sm shadow-[0_0_15px_rgba(201,163,86,0.1)] hover:shadow-[0_0_25px_rgba(201,163,86,0.2)] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A356]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#C9A356]/50"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#C9A356]/50"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#C9A356]/50"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#C9A356]/50"></div>
            <div className="relative z-10">
              <div className="text-[#C9A356] text-3xl mb-4">🎮</div>
              <h3 className={`${medievalSharp.className} text-[#C9A356] text-xl mb-2`}>Gamificación</h3>
              <p className="text-gray-300">Aprende de manera divertida con elementos de juego y recompensas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
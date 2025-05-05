'use client'

import { useState } from "react"
import { MedievalSharp } from "next/font/google"
import { cn } from "@/lib/utils"

const medievalSharp = MedievalSharp({ weight: "400", subsets: ["latin"] })

export default function EvidenceTypeGuide() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className={cn(
        "absolute left-0  top-12 md:top-0 z-50",
        "bg-[#1A1A1D]/95 backdrop-blur-sm",
        "border-2 border-[#C9A356] rounded-lg p-3",
        "shadow-[0_0_15px_rgba(201,163,86,0.2)]",
        "transition-all duration-300",
        " w-full",
        "md:left-[0] md:top-10",
        "sm:left-0 sm:top-[100%] sm:mt-2",
        "xs:left-0 xs:top-[100%] xs:mt-2",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      )}
      style={{
        backgroundImage: "url('/images/obj/paper-texture.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Content */}
      <div className="relative z-10">
        <h3 className={`${medievalSharp.className} text-[#C9A356] text-base mb-2`}>
          Tipos de Evidencia
        </h3>
        
        <div className="space-y-1 text-gray-200 text-sm">
          <p className="flex items-center gap-1.5">
            <span className="text-lg">📝</span>
            <span>Texto: Explicación detallada</span>
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-lg">🖼️</span>
            <span>Imágenes: JPG, PNG, GIF</span>
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-lg">🎥</span>
            <span>Video: MP4</span>
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-lg">📄</span>
            <span>Documento: PDF, DOC</span>
          </p>
        </div>

        <p className="mt-2 text-gray-300 text-xs">
          Arrastra archivos o haz clic para seleccionarlos.
        </p>

        {/* Comenzar button */}
        <button
          onClick={() => setIsOpen(false)}
          className="mt-2 w-full bg-[#C9A356] text-[#1A1A1D] font-bold py-1.5 px-3 rounded-lg hover:bg-[#D4AF37] transition-colors text-sm"
        >
          Comenzar
        </button>
      </div>
    </div>
  )
} 
'use client'

import type React from "react"
import Image from "next/image"
import { MedievalSharp } from "next/font/google"
import { Button } from "@/components/ui/button"
import { useChallengeSubmission } from "@/hooks/useChallengeSubmission"
import { FileUploadArea } from "./FileUploadArea"
import { useSubmissionContext } from "@/contexts/SubmissionContext"
import { FileText, Image as ImageIcon, File as FileIcon, VideoIcon } from "lucide-react"
import { useMemo } from "react"

import ChallengeRulesDisplay from "./ChallengeRulesDisplay"
import EvidenceTypeGuide from "./EvidenceTypeGuide"

const medievalSharp = MedievalSharp({ weight: "400", subsets: ["latin"] })

export default function ChallengeSubmissionModal() {
  const { selectedChallenge, setModalOpen, setSelectedChallenge, addNotification, selectedRank } = useSubmissionContext();

  const {
    submitting,
    files,
    textEvidence,
    linkEvidence,
    dragActive,
    evidenceType,
    alert,
    setTextEvidence,
    setLinkEvidence,
    handleDrag,
    handleDrop,
    handleFiles,
    removeFile,
    handleSubmit,
    setEvidenceType,
    setAlert
  } = useChallengeSubmission({
    challengeId: selectedChallenge?.id || '',
    onSubmitSuccess: () => {
      // Add notification for successful submission
      if (selectedChallenge) {
        addNotification({
          type: 'submission',
          message: `Tu reto "${selectedChallenge.name}" ha sido enviado para revisión`,
          challengeId: selectedChallenge.id,
          id: '', // Will be set by context
          timestamp: '', // Will be set by context
          read: false
        });
      }
      
      // Close modal and reset state
      setModalOpen(false);
      setSelectedChallenge(null);
    },
    onClose: () => {
      setModalOpen(false);
      setSelectedChallenge(null);
    }
  });

  // Memoize the blur level calculation
  const getBlurLevel = useMemo(() => {
    return (progress: number): string => {
      if (progress >= 90) return '';
      if (progress >= 80) return 'blur-sm';
      if (progress >= 60) return 'blur';
      if (progress >= 40) return 'blur-md';
      if (progress >= 20) return 'blur-lg';
      if (progress >= 10) return 'blur-xl';
      return 'blur-3xl';
    };
  }, []);

  if (!selectedChallenge || !selectedRank) return null;

  // Handlers for evidence type buttons
  const handleTextClick = () => {
    setEvidenceType('TEXT');
    setLinkEvidence('');
  };

  const handleVideoClick = () => {
    setEvidenceType('VIDEO');
    setTextEvidence('');
    
  };

  const handleImageClick = () => {
    setEvidenceType('IMAGE');
  };

  const handleFileClick = () => {
    setEvidenceType('FILE');
  };

  return (
    <div className="relative w-full overflow-hidden h-[90vh]">
      {/* Evidence Type Guide */}
    

      {/* Alert message */}
      {alert && (
        <div className={`absolute top-0 left-0 right-0 p-4 z-50 ${
          alert.type === 'error' ? 'bg-red-500/90' : 'bg-green-500/90'
        }`}>
          <div className="flex items-center justify-between">
            <p className="text-white">{alert.message}</p>
            <button 
              onClick={() => setAlert(null)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Modal container with border effect */}
      <div 
        className="bg-[#121212] border border-[#8B7500]/40 rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.15)] overflow-hidden relative"
        style={{
          backgroundImage: "url('/images/obj/paper-texture-dark.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => {
            setModalOpen(false);
            setSelectedChallenge(null);
          }}
          className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Background overlay for better readability */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Gold corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#8B7500] z-10"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#8B7500] z-10"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#8B7500] z-10"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#8B7500] z-10"></div>

        <div className="p-4 md:p-8 relative z-10">
          {/* Header */}
          <div className="mb-2">
            <h3 className="text-gray-400 text-base md:text-lg">Desafío de {selectedRank.name || 'aprendiz'}</h3>
          </div>

          {/* Title with gold accent border */}
          <div className="relative mb-4 md:mb-6">
            <div className="relative z-10 bg-[#121212] inline-block pr-4 md:pr-8 py-1">
              <div className="flex items-center gap-2">
                <h2 className={`${medievalSharp.className} text-[#D4AF37] text-xl md:text-3xl`}>{selectedChallenge.name}</h2>
              </div>
            </div>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#8B7500]/40 -z-0"></div>
            <div className="absolute top-1/2 right-0 w-[20px] h-[20px] border border-[#8B7500]/40 transform rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#121212]"></div>
          </div>

          {/* Challenge rules display */}
          {selectedChallenge.rules && (
            <div className="mb-4">
              <ChallengeRulesDisplay rules={selectedChallenge.rules} />
            </div>
          )}

          <div className="grid md:grid-cols-[1fr_300px] gap-4 md:gap-6">
            <div  className="space-y-4 md:space-y-6">
              {/* Challenge description */}
              <div className="text-gray-300 space-y-2 text-sm md:text-base">
                {selectedChallenge.description.includes(',') ? (
                  <>
                    <p>{selectedChallenge.description.split(",")[0]},</p>
                    <p className="font-semibold text-white">{selectedChallenge.description.split(",")[1]}</p>
                    <p>{selectedChallenge.description.split(",").slice(2).join(",")}</p>
                  </>
                ) : (
                  <p>{selectedChallenge.description}</p>
                )}
              </div>

              {/* Evidence type selector */}
              <div id="evidence-type-section" className="flex flex-wrap gap-2 mb-3 md:mb-4 relative">
                <EvidenceTypeGuide />
                <button
                  onClick={handleTextClick}
                  className={`px-2 md:px-3 py-1.5 md:py-2 rounded-lg flex items-center gap-1.5 md:gap-2 text-sm md:text-base ${
                    evidenceType === 'TEXT' 
                      ? 'bg-[#8B7500] text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <FileText className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>Texto</span>
                </button>
                <button
                  onClick={handleImageClick}
                  className={`px-2 md:px-3 py-1.5 md:py-2 rounded-lg flex items-center gap-1.5 md:gap-2 text-sm md:text-base ${
                    evidenceType === 'IMAGE' 
                      ? 'bg-[#8B7500] text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <ImageIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>Imágenes</span>
                </button>
                <button
                  onClick={handleVideoClick}
                  className={`px-2 md:px-3 py-1.5 md:py-2 rounded-lg flex items-center gap-1.5 md:gap-2 text-sm md:text-base ${
                    evidenceType === 'VIDEO' 
                      ? 'bg-[#8B7500] text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <VideoIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>Video</span>
                </button>
                <button
                  onClick={handleFileClick}
                  className={`px-2 md:px-3 py-1.5 md:py-2 rounded-lg flex items-center gap-1.5 md:gap-2 text-sm md:text-base ${
                    evidenceType === 'FILE' 
                      ? 'bg-[#8B7500] text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <FileIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>Documento</span>
                </button>
             
              </div>

              {/* File upload area - show only for FILE, IMAGE, or VIDEO types */}
              {(evidenceType === 'FILE' || evidenceType === 'IMAGE' || evidenceType === 'VIDEO') && (
                <FileUploadArea
                  dragActive={dragActive}
                  onDrag={handleDrag}
                  onDrop={handleDrop}
                  onFileChange={(e) => e.target.files && handleFiles(e.target.files)}
                  files={files}
                  onRemoveFile={removeFile}
                  acceptType={
                    evidenceType === 'IMAGE' ? 'image/*' : 
                    evidenceType === 'VIDEO' ? 'video/*' : 
                    undefined
                  }
                  title={
                    evidenceType === 'IMAGE' ? 'Arrastra tus imágenes aquí' : 
                    evidenceType === 'VIDEO' ? 'Arrastra tus videos aquí' :
                    'Arrastra tus archivos aquí'
                  }
                  description={
                    evidenceType === 'IMAGE' ? 'Soporta JPG, PNG, GIF, etc.' : 
                    evidenceType === 'VIDEO' ? 'Soporta MP4, etc.' :
                    'Soporta PDF, DOC,, etc.'
                  }
                />
              )}

              {/* Text evidence textarea - show only if TEXT type */}
              {evidenceType === 'TEXT' && (
                <div className="mb-4">
                  <textarea
                    className="w-full bg-gray-800/50 rounded-lg p-3 border border-gray-700 text-gray-200 min-h-[120px]"
                    placeholder="Describe cómo completaste este reto... (Puedes pegar enlaces, explicaciones o cualquier evidencia textual)"
                    value={textEvidence}
                    onChange={(e) => setTextEvidence(e.target.value)}
                  />
                </div>
              )}

              {/* Link evidence input - show only if LINK type */}
              {evidenceType === 'LINK' && (
                <div className="mb-4">
                  <input
                    type="url"
                    className="w-full bg-gray-800/50 rounded-lg p-3 border border-gray-700 text-gray-200"
                    placeholder="Pega el enlace a tu evidencia (URL)"
                    value={linkEvidence || ''}
                    onChange={(e) => setLinkEvidence(e.target.value)}
                  />
                  <p className="text-gray-400 text-xs mt-1">Ejemplos: URL de TikTok, Instagram, Google Drive, etc.</p>
                </div>
              )}

              <div className="pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={
                    submitting === selectedChallenge.id || 
                    (evidenceType === 'TEXT' && !textEvidence.trim()) ||
                    (evidenceType === 'LINK' && !linkEvidence) ||
                    ((evidenceType === 'FILE' || evidenceType === 'IMAGE' || evidenceType === 'VIDEO') && files.length === 0)
                  }
                  className="bg-gradient-to-r from-[#8B7500] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#8B7500] text-black font-bold px-6 py-2 rounded shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all duration-300"
                >
                  {submitting === selectedChallenge.id ? "Enviando..." : "Enviar para revisión"}
                </Button>
              </div>
            </div>

            {/* Rank icon - mobile optimized height */}
            <div className="relative h-[200px] md:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-orange-600/20 z-10"></div>
              <Image
                src={selectedRank.icon}
                alt={selectedRank.name}
                fill
                className={`object-contain object-right-bottom z-0 ${getBlurLevel(50)}`}
              />
              {/* Fire effect overlay */}
              <div className="absolute bottom-0 right-0 w-full h-2/3 bg-gradient-to-t from-orange-600/30 to-transparent mix-blend-screen z-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
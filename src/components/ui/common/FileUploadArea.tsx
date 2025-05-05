'use client'

import { useRef } from 'react'
import { MedievalSharp } from "next/font/google"
import { Upload, X, FileText, Film, ImageIcon } from "lucide-react"

const medievalSharp = MedievalSharp({ weight: "400", subsets: ["latin"] })

interface FileWithPreview extends File {
  preview?: string
  id: string
}

interface FileUploadAreaProps {
  dragActive: boolean
  onDrag: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  files: FileWithPreview[]
  onRemoveFile: (id: string) => void
  acceptType?: string
  title?: string
  description?: string
}

export function FileUploadArea({
  dragActive,
  onDrag,
  onDrop,
  onFileChange,
  files,
  onRemoveFile,
  acceptType,
  title = 'Arrastra tus archivos aquí',
  description = 'Soporta imágenes, videos y documentos'
}: FileUploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileIcon = (file: FileWithPreview) => {
    if (!file?.type) return <FileText className="h-5 w-5 text-gray-400" /> // Default icon for unknown files
  
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-5 w-5 text-blue-400" />
    } else if (file.type.startsWith("video/")) {
      return <Film className="h-5 w-5 text-red-400" />
    } else {
      return <FileText className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="space-y-4">
      <h3 className={`${medievalSharp.className} text-[#D4AF37] text-xl`}>
        Sube tus pruebas de batalla:
      </h3>

      {/* File upload area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center
          ${dragActive ? "border-[#D4AF37] bg-[#8B7500]/10" : "border-gray-700 hover:border-gray-500"} 
          transition-all duration-300 cursor-pointer
        `}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          ref={fileInputRef} 
          type="file" 
          multiple 
          accept={acceptType}
          onChange={onFileChange} 
          className="hidden" 
        />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-16 h-16 rounded-full bg-[#8B7500]/20 flex items-center justify-center mb-2">
            <Upload className="h-8 w-8 text-[#D4AF37]" />
          </div>
          <p className={`${medievalSharp.className} text-[#D4AF37]`}>
            {title}
          </p>
          <p className="text-gray-400 text-sm">o haz clic para seleccionar</p>
          <p className="text-gray-500 text-xs mt-2">
            {description}
          </p>
        </div>
      </div>

      {/* File preview area */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2 max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#8B7500] scrollbar-track-gray-800">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between bg-gray-800/50 rounded-md p-3 border border-gray-700"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(file)}
                <div className="truncate max-w-[200px]">
                  <p className="text-sm text-gray-200 truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFile(file.id);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
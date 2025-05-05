'use client';

import { useState, useCallback } from 'react';

import { useSubmissionContext } from '../contexts/SubmissionContext';
import { useSession } from 'next-auth/react';

interface FileWithPreview extends File {
  preview?: string;
  id: string;
  size: number;
}

export function useChallengeSubmission({
  challengeId,
  onSubmitSuccess,
  onClose
}: {
  challengeId: string;
  onSubmitSuccess?: () => void;
  onClose?: () => void;
}) {

  const { addNotification, addSubmission } = useSubmissionContext();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [textEvidence, setTextEvidence] = useState('');
  const [linkEvidence, setLinkEvidence] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [evidenceType, setEvidenceType] = useState<'TEXT' | 'LINK' | 'IMAGE' | 'FILE' | 'VIDEO'>('TEXT');
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ message: string; type: 'error' | 'success' } | null>(null);
  const { data:sessionData } = useSession();

  const user = sessionData?.user;

  const handleSubmit = useCallback(async () => {
    if (!challengeId || !user) return;
    let  isChallengeSubmit = false;
    // Validation for different evidence types
    if (evidenceType === 'TEXT' && !textEvidence.trim()) {
      setAlert({ message: 'Por favor, proporciona una descripción como evidencia', type: 'error' });
      return;
    }
    if (evidenceType === 'LINK' && !linkEvidence.trim()) {
      setAlert({ message: 'Por favor, proporciona un enlace como evidencia', type: 'error' });
      return;
    }
    if ((evidenceType === 'FILE' || evidenceType === 'IMAGE') && files.length === 0) {
      setAlert({ message: 'Por favor, sube algún archivo como evidencia', type: 'error' });
      return;
    }

    setSubmitting(challengeId);
    
    try {
      // Prepare evidence based on type
      let evidence = '';
      let fileMetadata = null;

      switch (evidenceType) {
        case 'TEXT':
          evidence = textEvidence;
          break;
        case 'LINK':
          evidence = linkEvidence;
          break;
        case 'FILE':
        case 'IMAGE':
          fileMetadata = files.map(file => ({
            name: file.name,
            size: file.size,
            type: file.type,
          }));
          evidence = files.map(file => `${file.name} (${(file.size / 1024).toFixed(1)} KB)`).join('\n');
          break;
      }

      // Generate a submission ID
      const submissionId = Math.random().toString(36).substring(2, 9);
   
      // Send request to the API
       const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId,
          evidence,
          evidenceType,
          fileMetadata,
          userId: user.email
        }),
      });

      if (!response.ok) throw new Error("Failed to submit challenge");

      const data = await response.json(); 
      isChallengeSubmit = true;
      // Create FormData object
      const formData = new FormData();
      formData.append('challengeId', challengeId);
      formData.append('submissionsId', data.id || submissionId);
      

// Append evidence based on type
if (evidenceType === 'FILE' || evidenceType === 'IMAGE' || evidenceType === 'VIDEO') {
  // Append files to FormData
  if (files.length > 0) {
    // The file should be a proper File object with our added properties
    const fileToUpload = files[0];
    
    formData.append('file', fileToUpload);
    formData.append('Upload file', fileToUpload);
  }
} else {
  formData.append('evidence', evidence || '');
}
      
      formData.append('evidenceType', evidenceType);
      if (user?.email) {
        formData.append('userId', user.email);
      }
      
      // Send to the webhook endpoint
       const webhookResponse = await fetch("https://primary-production-01a1.up.railway.app/webhook/submit-evidence", {
        method: "POST",
        body: formData,
      }); 

       if (!webhookResponse.ok) {
        addNotification({
          type: 'rejected',
          message: 'Tu reto esta siendo revisado por el equipo de la plataforma',
          challengeId,
          id: data.id || submissionId,
          timestamp: '', // Will be set by context
          read: false
        });
      } 

      // Add submission to context
       addSubmission({
        id: data.id || submissionId,
        challengeId,
        status: 'SUBMITTED',
        timestamp: Date.now(),
      }); 

      // Add notification
      addNotification({
        type: 'submission',
        message: 'Tu reto ha sido enviado para revisión',
        challengeId,
        id: '', // Will be set by context
        timestamp: '', // Will be set by context
        read: false
      });

      // Reset form and close
      setFiles([]);
      setTextEvidence('');
      setLinkEvidence('');
      setEvidenceType('TEXT');
      
      if (onSubmitSuccess) onSubmitSuccess();
      if (onClose) onClose();
    } catch (error) {
      console.error('Error submitting challenge:', error);
      if (onClose && isChallengeSubmit) onClose();
      addNotification({
        type: 'rejected',
        message: isChallengeSubmit ? 'Tu reto esta siendo revisado por el equipo de la plataforma' :  'Error al enviar el reto para revisión',
        challengeId,
        id: '',
        timestamp: '', // Will be set by context
        read: false
      });
    } finally {
      setSubmitting(null);
    }
  }, [challengeId, user, evidenceType, textEvidence, linkEvidence, files, onSubmitSuccess, onClose, addSubmission, addNotification]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const validateFileType = (file: File, currentEvidenceType: string): { isValid: boolean; message: string } => {
    const fileType = file.type;
    
    switch (currentEvidenceType) {
      case 'IMAGE':
        if (!fileType.startsWith('image/')) {
          return {
            isValid: false,
            message: 'Solo se permiten archivos de imagen (JPG, PNG, GIF, etc.)'
          };
        }
        break;
        
      case 'VIDEO':
        if (!fileType.startsWith('video/')) {
          return {
            isValid: false,
            message: 'Solo se permiten archivos de video (MP4, etc.)'
          };
        }
        break;
        
      case 'FILE':
        if (fileType.startsWith('image/') || fileType.startsWith('video/')) {
          return {
            isValid: false,
            message: 'No se permiten archivos de imagen o video en esta sección'
          };
        }
        break;
    }
    
    return { isValid: true, message: '' };
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const minSizeMB = 10;
      const minSizeBytes = minSizeMB * 1024 * 1024;

      if (file.size > minSizeBytes) {
        setAlert({ message: `El archivo debe ser menor a ${minSizeMB}MB`, type: 'error' });
        return;
      }

      const { isValid, message } = validateFileType(file, evidenceType);
      if (!isValid) {
        setAlert({ message, type: 'error' });
        return;
      }

      handleFiles(e.dataTransfer.files);
    }
  }, [evidenceType]);

  const handleFiles = useCallback((fileList: FileList) => {
    if (fileList.length > 1) {
      setAlert({ message: 'Solo se permite subir un archivo a la vez', type: 'error' });
      return;
    }

    const file = fileList[0];
    const minSizeMB = 10;
    const minSizeBytes = minSizeMB * 1024 * 1024; // Convert MB to bytes

    if (file.size > minSizeBytes) {
      setAlert({ message: `El archivo debe ser menor a ${minSizeMB}MB`, type: 'error' });
      return;
    }

    // Validate file type based on evidence type
    const { isValid, message } = validateFileType(file, evidenceType);
    if (!isValid) {
      setAlert({ message, type: 'error' });
      return;
    }
    
    const newFiles = Array.from(fileList).map(file => {
      const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined;
      return Object.assign(file, {
        preview,
        id: Math.random().toString(36).substring(2, 9)
      });
    });
    setFiles(newFiles);
    setAlert(null); // Clear any previous alerts
  }, [evidenceType]);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  }, []);

  return {
    files,
    textEvidence,
    linkEvidence,
    dragActive,
    evidenceType,
    submitting,
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
  };
}
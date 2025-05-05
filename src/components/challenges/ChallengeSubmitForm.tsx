'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { Input } from '../ui/input';


interface ChallengeSubmitProps {
  challengeId: string;
  challengeName: string;
  onSuccess?: () => void;
}

export function ChallengeSubmitForm({ challengeId, challengeName, onSuccess }: ChallengeSubmitProps) {
  const [evidence, setEvidence] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!evidence.trim()) {
      setError('Por favor, proporciona evidencia de la finalización del desafío');
      return;
    }

    if (!session?.user) {
      setError('Debes iniciar sesión para enviar un desafío');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          challengeId,
          evidence,
          userId: session.user.email // Use the user ID from the session
        }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el desafío');
      }

      setEvidence('');
      if (onSuccess) onSuccess();
      
      // Show success message
      alert('¡Desafío enviado con éxito! Será revisado pronto.');
      
    } catch (err) {
      console.error('Error submitting challenge:', err);
      setError('Ha ocurrido un error al enviar el desafío. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-lg text-white">Enviar Evidencia para &quot;{challengeName}&quot;</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="evidence" className="block text-sm font-medium text-gray-300 mb-2">
                Evidencia de Finalización
              </label>
              <Input
                id="evidence"
                placeholder="Describe cómo completaste este desafío y proporciona enlaces o detalles relevantes..."
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white h-32"
                disabled={isSubmitting}
              />
            </div>
            {error && (
              <div className="text-red-400 text-sm mt-2">{error}</div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Evidencia'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
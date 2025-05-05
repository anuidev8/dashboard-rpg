import { useEffect, useRef, useState } from 'react';
import Atropos from 'atropos';
import 'atropos/css';

interface UseAtroposEffectProps {
  onEnter?: () => void;
  onLeave?: () => void;
}

export function useAtroposEffect({ onEnter, onLeave }: UseAtroposEffectProps = {}) {
  const atroposRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (atroposRef.current) {
      const atroposInstance = Atropos({
        el: atroposRef.current,
        activeOffset: 40,
        shadowScale: 1.05,
        rotateXMax: 25,
        rotateYMax: 15,
        highlight: true,
        onEnter: () => {
          setIsHovered(true);
          onEnter?.();
        },
        onLeave: () => {
          setIsHovered(false);
          onLeave?.();
        }
      });

      return () => {
        atroposInstance.destroy();
      };
    }
  }, [onEnter, onLeave]);

  return { atroposRef, isHovered };
} 
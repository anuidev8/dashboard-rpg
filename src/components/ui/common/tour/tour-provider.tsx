"use client"
import { createContext, useContext, useState } from "react";

interface TourStep {
  selector: string;
  content: string;
}

interface TourContextValue {
  currentStep: number | null;
  step: TourStep | null;
  startTour: () => void;
  nextStep: () => void;
  endTour: () => void;
}

const steps: TourStep[] = [
  { selector: "#welcome-card", content: "Aquí podrás ver todos los rangos disponibles y tu progreso en cada uno." },
  { selector: "#stats-card", content: "Aquí puedes ver tu posición y la de otros aprendices en el ranking." },
  { selector: "#challenges-section", content: "Completa estos desafíos para subir de rango y demostrar tus habilidades." },
  { selector: "#restart-tour", content: "Puedes reiniciar este tour en cualquier momento haciendo clic aquí." },
];

const TourContext = createContext<TourContextValue | null>(null);

export const TourProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<number | null>(null);

  const startTour = () => setCurrentStep(0);
  
  const nextStep = () => {
    setCurrentStep((current) => {
      if (current === null) return null;
      return current + 1 < steps.length ? current + 1 : null;
    });
  };

  const endTour = () => setCurrentStep(null);

  return (
    <TourContext.Provider 
      value={{ 
        currentStep, 
        step: currentStep !== null ? steps[currentStep] : null,
        startTour, 
        nextStep, 
        endTour 
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useCustomTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useCustomTour must be used within a TourProvider");
  }
  return context;
};

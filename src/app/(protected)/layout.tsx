import { GameProvider } from "@/components/ui/common/GameContext";
import { TourProvider } from "@/components/ui/common/tour/tour-provider";
import { SubmissionProvider } from "@/contexts/SubmissionContext";


import { Toaster } from "sonner";



export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
      <SubmissionProvider>
        <GameProvider>
        <TourProvider>
            {children}
            </TourProvider>
        
          
          <Toaster position="top-right" richColors />
        </GameProvider>
      </SubmissionProvider>
   
 
   
  );
}

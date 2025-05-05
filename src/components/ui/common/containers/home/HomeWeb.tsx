// components/client/home.tsx
"use client";

import { useEffect, useState } from "react";
import { useSubmissionContext } from "@/contexts/SubmissionContext";
import { LeaderboardCard } from "@/components/ui/common/LeaderboardCard";
import { ChallengesList } from "@/components/ui/common/ChallengesList";
import { SelectedRankCard } from "@/components/ui/common/SelectedRankCard";
import { RanksCard } from "@/components/ui/common/RanksCard";
import ChallengeSubmissionModal from "@/components/ui/common/ChallengeSubmissionModal";
import { UserProfileBox } from "@/components/ui/common/UserProfileBox";
import { MobileTabs } from "@/components/ui/common/MobileTabs";
import { MedievalSharp } from "next/font/google";
import { useSession } from "next-auth/react";
import Joyride, { CallBackProps} from 'react-joyride';
import { MedievalFuturisticLoader } from "@/components/ui/loader";
import { Rank } from "@prisma/client";
import { joyrideStyles } from '@/styles/joyrideStyles';
import { homeTourSteps } from "@/lib/steps";
import { ChallengeSubmissionLayout } from "../../ChallengeSubmissionLayout";


const medievalSharp = MedievalSharp({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});



// Custom hook to detect screen size
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

export function HomeComponentWeb({ ranks }: { ranks: Rank[] }) {
  const { data, status } = useSession();
  const { selectedRank, setSelectedRank, setRanks, modalOpen} = useSubmissionContext();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [runTour, setRunTour] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);


 
  


  
 
  useEffect(() => {
    setRanks(ranks);
    setSelectedRank(ranks[0]);
  }, [ranks]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLayoutReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (isDesktop && isLayoutReady && !localStorage.getItem('tour-guided')) {
      setRunTour(true);
      setTourStepIndex(0);
    }
  }, [isLayoutReady,isDesktop]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, type } = data;
    
    if (type === 'tour:end' || action === 'skip') {
      setRunTour(false);
      localStorage.setItem('tour-guided', 'true');
    } else if (type === 'step:after' && action === 'next') {
      setTourStepIndex(index + 1);
    }
  };

  if (status === "loading" || !selectedRank || !data) {
    return <LoadingState />;
  }

  return (
    <div className="container mx-auto px-4 py-6 w-full h-full">
      {/* Botón para iniciar el tour */}
  
      {/* Title and Mobile User Profile */}
      <div className="flex items-center justify-between md:justify-center md:mb-[4rem] relative z-[55]">
        <h1 className={`${medievalSharp.className} text-center text-2xl md:text-5xl text-[#C9A356] gold-glow`}>
          Academia del estratega  
        </h1>
        <div className="block md:hidden">
          <UserProfileBox isMobile={true} />
        </div>
      </div>
      
      {/* Mobile Tabs Navigation */}
      {!isDesktop && ranks.length > 0 && (
        <MobileTabs selectedRank={selectedRank} />
      )}
      
      {/* Desktop Layout */}
      <div className="grid grid-cols-12 gap-6 pb-10 relative z-[50]">
        <div 
          id="welcome-card"
          className="col-span-5 h-[500px] relative z-[52]"
        >
          <RanksCard />
        </div>
        
        <div 
          className="second-element col-span-3 h-[500px] relative z-[51]"
        >
          <SelectedRankCard />
        </div>
        
        <div 
          id="leaderboard-card"
          className="col-span-4 h-[500px] relative z-[52]"
        >
          <LeaderboardCard />
        </div>
      </div>
      <ChallengeSubmissionModal />
      {/* Challenges List Section */}
      {isDesktop && ranks.length > 0 &&  (
        <div 
          id="challenges-section"
          className="hidden md:block mt-8 md:mt-10 relative z-[51]"
        >
          <ChallengesList selectedRank={selectedRank} />
        </div>
      )}

      {/* Modal and User Profile */}
      {modalOpen && <ChallengeSubmissionLayout />}
  
      
      <div 
        id="reto-card"
        className="hidden md:block relative z-[53]"
      >
        <UserProfileBox />
      </div>

      {/* Componente Joyride */}
      <Joyride
        steps={ homeTourSteps}
        run={runTour}
        stepIndex={tourStepIndex}
        callback={handleJoyrideCallback}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        locale={{
          back: 'Atrás',
          close: 'Cerrar',
          last: 'Finalizar',
          next: 'Siguiente',
          skip: 'Saltar Tour',
        }}
        styles={joyrideStyles}
      />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="w-full px-4 py-6 flex items-center justify-center relative w-full flex flex-col md:p-2 overflow-hidden bg-[#1A1A1D] min-h-screen relative z-20">
      <MedievalFuturisticLoader size="xl" className="w-full max-w-[400px] md:max-w-[500px]" />
    </div>
  );
}
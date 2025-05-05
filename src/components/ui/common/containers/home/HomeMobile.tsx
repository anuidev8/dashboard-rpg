// components/client/home.tsx
"use client";

import { useEffect, useState } from "react";
import { useSubmissionContext } from "@/contexts/SubmissionContext";
import { LeaderboardCard } from "@/components/ui/common/LeaderboardCard";
import { ChallengesList } from "@/components/ui/common/ChallengesList";
import { SelectedRankCard } from "@/components/ui/common/SelectedRankCard";
import { RanksCard } from "@/components/ui/common/RanksCard";
import { UserProfileBox } from "@/components/ui/common/UserProfileBox";
import { MedievalSharp } from "next/font/google";
import { useSession } from "next-auth/react";
import Joyride, { CallBackProps } from "react-joyride";
import { MedievalFuturisticLoader } from "@/components/ui/loader";
import { StylizedTitle } from "@/components/ui/stylized-title";
import { HorizontalSelectedRankCard } from "../../HorizontalSelectedRankCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rank } from "@prisma/client";
import { joyrideStyles } from "@/styles/joyrideStyles";
import {  MobileTourSteps } from "@/lib/steps";
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

export  function HomeComponentMobile({ ranks }: { ranks: Rank[] }) {
  const { data, status } = useSession();
  const { selectedRank, setSelectedRank, setRanks, modalOpen, } =
    useSubmissionContext();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [runTour, setRunTour] = useState(false);
  const [tourStepIndex, setTourStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("ranks");

 
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
    if (isLayoutReady && !localStorage.getItem('tour-guided')) {
      setRunTour(true);
      setTourStepIndex(0);
    }
  }, [isLayoutReady]);

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

  const getTitleByTab = () => {
    switch (activeTab) {
      case "ranks":
        return "Tablero de Poder";
      case "leaderboard":
        return "Leaderboard";
      case "challenges":
        return `Desafíos de ${selectedRank.name}`;
      default:
        return "Tablero de Poder";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 w-full h-full">
   

      {/* Title and Mobile User Profile */}
      <div id="finish-tour"  className="flex items-center justify-between md:justify-center md:mb-[4rem] relative z-[55]">
        <h1
          className={`${medievalSharp.className} text-center text-2xl md:text-5xl text-[#C9A356] gold-glow`}
        >
          Academia del estratega
        </h1>
        <div id="welcome-cardd" className="block md:hidden ">
          <UserProfileBox isMobile={true} />
        </div>
      </div>

      {/* Mobile Tabs Navigation */}
      {!isDesktop && ranks.length > 0 && (
        <>
          {/* Mobile Content Area */}
          <div className="md:hidden pb-16">
            {/* Vertical SelectedRankCard - only shown in ranks tab */}
            {activeTab === "ranks" && (
              <div id="second-element" className="h-full px-4 ">
                <StylizedTitle title={"Tu Poder actual"} />
                <div className="h-[380px]">
                  <SelectedRankCard />
                </div>
              </div>
            )}

            {/* Horizontal SelectedRankCard - shown in other tabs */}
            {activeTab !== "ranks" && (
              <div className="px-4 mb-4 animate-slideDown">
                <HorizontalSelectedRankCard />
              </div>
            )}

            <div className="md:hidden mb-2">
              <StylizedTitle title={getTitleByTab()} />
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsContent value="ranks" className="mt-4 h-auto">
                <div id="leaderboard-cardd">
                  <RanksCard />
                </div>
              </TabsContent>

              <TabsContent
                value="leaderboard"
                className="mt-10 h-[calc(100vh-16rem)]"
              >
                <div id="leader-cardd">
                  <LeaderboardCard />
                </div>
              </TabsContent>

              <TabsContent  value="ranks" className="mt-4 h-auto ">
                <div id="user-board">
                <StylizedTitle title={`  Desafíos de ${selectedRank.name}`} />
                <ChallengesList selectedRank={selectedRank} />
                </div>
               
              </TabsContent>
            </Tabs>
          </div>

          {/* Fixed Bottom Navigation */}
          <div
        
            className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-stone-900/95 border-t border-amber-700/30"
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="flex justify-center w-full">
                <TabsTrigger
                  value="ranks"
                  className="data-[state=active]:bg-amber-900/40 data-[state=active]:text-amber-400 text-gray-400 py-3"
                >
                  Tablero de Poder
                </TabsTrigger>
                <TabsTrigger
                  value="leaderboard"
                  className="data-[state=active]:bg-amber-900/40 data-[state=active]:text-amber-400 text-gray-400 py-3"
                >
                  Leaderboard
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </>
      )}

      {/* Modal and User Profile */}
      {modalOpen && <ChallengeSubmissionLayout />}

      {/* Componente Joyride */}
      <Joyride
        steps={MobileTourSteps}
        run={runTour}
        stepIndex={tourStepIndex}
        callback={handleJoyrideCallback}
        continuous={true}
        scrollToFirstStep={true}
        showProgress={true}
        hideCloseButton={true}
        styles={joyrideStyles}
        locale={{
          back: "Atrás",
          close: "Cerrar",
          last: "Finalizar",
          next: "Siguiente",
          skip: "Saltar Tour",
        }}
      />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="w-full px-4 py-6 flex items-center justify-center relative w-full flex flex-col md:p-2 overflow-hidden bg-[#1A1A1D] min-h-screen relative z-20">
      <MedievalFuturisticLoader
        size="xl"
        className="w-full max-w-[400px] md:max-w-[500px]"
      />
    </div>
  );
}

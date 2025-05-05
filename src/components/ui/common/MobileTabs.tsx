"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { RanksCard } from "./RanksCard"
import { LeaderboardCard } from "./LeaderboardCard"
import { ChallengesList } from "./ChallengesList"
import { Rank } from "@prisma/client"
import { StylizedTitle } from "../stylized-title"
import { SelectedRankCard } from "./SelectedRankCard"
import { HorizontalSelectedRankCard } from "./HorizontalSelectedRankCard"

interface MobileTabsProps {
  selectedRank: Rank
}

export function MobileTabs({ selectedRank }: MobileTabsProps) {
  const [activeTab, setActiveTab] = useState("ranks")

  const getTitleByTab = () => {
    switch (activeTab) {
      case "ranks":
        return "Tablero de Poder"
      case "leaderboard":
        return "Leaderboard"
      case "challenges":
        return `Desafíos de ${selectedRank.name}`
      default:
        return "Tablero de Poder"
    }
  }

  return (
    <>
      {/* Mobile Content Area */}
      <div className="md:hidden pb-16">
        {/* Vertical SelectedRankCard - only shown in ranks tab */}
        {activeTab === "ranks" && (
          <div className="h-full px-4">
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="ranks" className="mt-4 h-auto">
        
            <RanksCard />

            
          </TabsContent>
          
          <TabsContent value="leaderboard" className="mt-10 h-[calc(100vh-16rem)]">
            <LeaderboardCard />
          </TabsContent>
          
          <TabsContent value="ranks" className="mt-4 h-auto">
          <StylizedTitle title={`  Desafíos de ${selectedRank.name}`} />
            <ChallengesList selectedRank={selectedRank} />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Fixed Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-stone-900/95 border-t border-amber-700/30">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
  )
} 
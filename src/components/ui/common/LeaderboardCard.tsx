"use client"
import { useEffect, useState } from "react"
import { MedievalSharp } from "next/font/google"

import { GoldenBorderClip } from "./containers/golden-border"
import { Trophy, Crown, Shield } from "lucide-react"
import Image from "next/image"
import { StylizedTitle } from "../stylized-title"
import { SkeletonLoader } from "./SkeletonLoader"
import { useSession } from "next-auth/react"
import { useSubmissionContext } from "@/contexts/SubmissionContext"

const medievalSharp = MedievalSharp({ weight: "400", subsets: ["latin"] })

interface LeaderboardPlayer {
  name: string
  score: number
  rank: string
  avatar: string
}

export function LeaderboardCard() {
  const { data:sessionData } = useSession();
  const { state, resetRefreshLeaderboard } = useSubmissionContext();
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  const user = sessionData?.user;
  
  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/leaderboard")
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard data")
      }
      const data = await response.json()
      setLeaderboard(data)
    } catch (error) {
      console.error("Error fetching leaderboard:", error)
      setError("Failed to load leaderboard data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  // Refetch leaderboard when refreshLeaderboard flag changes
  useEffect(() => {
    if (state.refreshLeaderboard) {
      fetchLeaderboard();
      resetRefreshLeaderboard();
    }
  }, [state.refreshLeaderboard]);

  // Get rank icon based on position
  const getRankIcon = (position: number) => {
    if (position === 0) return <Crown className="h-5 w-5 text-yellow-400" />
    if (position === 1) return <Trophy className="h-5 w-5 text-gray-300" />
    if (position === 2) return <Trophy className="h-5 w-5 text-amber-600" />
    return <Shield className="h-5 w-5 text-gray-500" />
  }

  if (loading) {
    return (
      <GoldenBorderClip borderWidth={2} className="h-full">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-yellow-500/20 via-black/40 to-transparent z-20 w-full h-full top-0 left-0"></div>
      <Image src="/images/obj/square-medieval-bg.png" alt="Leaderboard" className="w-full h-full absolute top-0 left- z-10" width={100} height={100} />
      <div className="bg-gradient-to-b flex justify-center flex-col relative from-gray-900/90 to-gray-800/90 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-auto transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] mb-4 md:mb-0 md:h-full">
        <StylizedTitle title="Leaderboard" />
        <div className="relative z-20 p-8  flex justify-center items-center w-full opacity-50">
          <SkeletonLoader variant="leaderboard" className="w-full h-full" />
        </div>
      </div>
    </GoldenBorderClip>
    )
  }

  if (error) {
    return (
      <div className="bg-gradient-to-b from-gray-900/90 to-gray-800/90 rounded-lg p-4 md:p-6 shadow-[0_0_15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-auto transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] mb-4 md:mb-0 md:h-[calc(50vh-6rem)] border border-yellow-900/30">
        <h2
          className={`${medievalSharp.className} text-xl md:text-2xl mb-4 text-yellow-400 text-center text-shadow-sm`}
        >
          Leaderboard
        </h2>
        <div className="flex justify-center items-center h-32">
          <p className="text-red-400 bg-red-900/20 px-4 py-2 rounded-lg border border-red-900/30 shadow-inner">
            {error}
          </p>
        </div>
      </div>
    )
  }

  return (
    <GoldenBorderClip borderWidth={2} className="h-full" hideOnMobile>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-yellow-500/20 via-black/40 to-transparent z-20 w-full h-full top-0 left-0"></div>
      <Image src="/images/obj/square-medieval-bg.png" alt="Leaderboard" className="w-full h-full absolute top-0 left- z-10" width={100} height={100} />
      <div
        className="bg-gradient-to-b flex justify-center md:justify-start flex-col relative from-gray-900/90 to-gray-800/90 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]  transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)]  flex flex-col gap-2 scrollbar-thin scrollbar-thumb-gray-700/50 scrollbar-track-gray-800/50 overflow-y-auto max-h-[60vh] md:max-h-[500px]"
      >
        <div className="md:block hidden">overflow-y-auto max-h-[60vh] md:max-h-[60vh]
          <StylizedTitle title="Leaderboard" />
        </div>

        {leaderboard.length === 0 ? (
          <div className="flex justify-center items-center md:items-start md:justify-start h-32">
            <p className="text-center py-4 text-gray-400 bg-gray-800/50 px-6 rounded-lg border border-gray-700/50 shadow-inner">
              No hay jugadores en el leaderboard todavía
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center md:items-start md:justify-start w-full px-[1.6rem] md:px-[2rem] relative z-20">
            <ul className="space-y-3 w-full mt-10 md:mt-0">
              {leaderboard.map((player, index) => {
                // Check if this player is the current user
                const isCurrentUser = user && player.name === user.name

                return (
                  <li
                    key={index}
                    style={{
                      backgroundImage: "url('/images/obj/paper-texture.png')",
                      backgroundSize: "100%",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundBlendMode: "overlay",
                    }}
                    className={`
                      relative flex items-center justify-between p-3 rounded-lg transition-all shadow-[inset_0_5px_8px_rgba(0,0,0,0.4)] h-[80px] duration-200
                      ${
                        isCurrentUser
                          ? "bg-gradient-to-r from-yellow-900/30 to-gray-800/80 border-l-2 border-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.2)]"
                          : "bg-gradient-to-r from-gray-800/80 to-gray-900/80 hover:from-gray-700/50 hover:to-gray-800/50"
                      }
                      border-2 border-gray-700/50 
                    `}
                  >
                   {/* Enhanced Position indicator */}
                   <div className="absolute -left-3 -top-3">
                        {index < 3 && (
                          <div
                            className={`
                            flex items-center justify-center w-8 h-8 rounded-full 
                            ${
                              index === 0
                                ? "bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 text-black"
                                : index === 1
                                  ? "bg-gradient-to-b from-gray-100 via-gray-300 to-gray-500 text-black"
                                  : "bg-gradient-to-b from-amber-400 via-amber-600 to-amber-800 text-black"
                            }
                            shadow-[0_2px_4px_rgba(0,0,0,0.5),inset_0_1px_3px_rgba(255,255,255,0.5)]
                            border-2 ${
                              index === 0 ? "border-yellow-600" : index === 1 ? "border-gray-400" : "border-amber-700"
                            }
                            font-bold text-sm
                          `}
                            style={{
                              textShadow: "0 1px 1px rgba(0,0,0,0.3)",
                              boxShadow:
                                "0 2px 4px rgba(0,0,0,0.5), inset 0 1px 3px rgba(255,255,255,0.5), inset 0 -2px 3px rgba(0,0,0,0.2)",
                            }}
                          >
                            {index + 1}
                          </div>
                        )}
                      </div>

                    <div  className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 mr-3 bg-gray-800/80 rounded-full shadow-inner border border-gray-700/50">
                        <span className="text-2xl">{player.avatar}</span>
                      </div>
                      <div>
                        <span
                          className={`${medievalSharp.className} block text-base ${isCurrentUser ? "t" : "text-gray-200"}`}
                        >
                      {index > 2 && `${index + 1}.`} {player.name.length > 12 ? player.name.substring(0, 12) + "…" : player.name}

                        </span>
                        <span className="text-xs  flex items-center gap-1">
                          {getRankIcon(index)}
                          {player.rank}
                        </span>
                      </div>
                    </div>

                    <span className="font-bold text-sm bg-gradient-to-b from-gray-700 to-gray-800 px-4 py-1.5 rounded-full border border-gray-600/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-gray-200">
                      {player.score} <span className="text-yellow-400">XP</span>
                    </span>
                  </li>
                )
              })}
              <div className="h-[80px] w-full"></div>
            </ul>
          </div>
        )}
      </div>
    </GoldenBorderClip>
  )
}

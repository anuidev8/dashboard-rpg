"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { MedievalSharp } from "next/font/google";
import Image from "next/image";

import { useRankProgressData } from "@/hooks/useRankProgress";
import { useAtroposEffect } from "@/hooks/useAtroposEffect";
import { useSubmissionContext } from "@/contexts/SubmissionContext";
import { GoldenBorderClip } from "./containers/golden-border";
import { SkeletonLoader } from "./SkeletonLoader";

const medievalSharp = MedievalSharp({ weight: "400", subsets: ["latin"] });

export function SelectedRankCard() {
  const { selectedRank, ranks, setSelectedRank ,refetchChallenges,setRefetchChallenges} = useSubmissionContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [key, setKey] = useState(0);

  const {
    rankProgress,
    blurLevel,
    isComplete,
    isAlmostComplete,
    isInProgress,
    fetchProgress
  } = useRankProgressData(selectedRank || ranks[0], ranks, setSelectedRank);

  useEffect(() => {
    if (refetchChallenges) {
      fetchProgress();
      setRefetchChallenges(false);
    }
  }, [refetchChallenges]);

  const handleVideoPlay = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
      } catch (err) {
        console.error("Error playing video:", err);
      }
    }
  }, []);

  const handleVideoPause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  useEffect(() => {
    setKey((prev) => prev + 1);
    handleVideoPause();
  }, [selectedRank, handleVideoPause]);

  const { atroposRef, isHovered } = useAtroposEffect({
    onEnter: handleVideoPlay,
    onLeave: handleVideoPause,
  });

  if (!selectedRank) return <SkeletonLoader variant="card" />;

  return (
    <GoldenBorderClip borderWidth={2} className="h-full">
      {rankProgress < 90 && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-yellow-500/20 via-black/40 to-transparent z-10 w-full h-full top-0 left-0 opacity-70"></div>
      )}
      {rankProgress < 90 && (
        <div className=" w-[190px] md:w-full absolute top-[10%] md:top-[14%] left-[50%] h-[150px] -translate-x-[50%] z-20">
          <Image
            src="/images/obj/block.svg"
            alt="Leaderboardd"
            fill
            className="object-contain"
            priority // if this is above-the-fold
          />
        </div>
      )}
      <div className="relative w-full h-full">
        <div
          ref={atroposRef}
          className="atropos w-full h-full"
          style={{ perspective: "1000px" }}
        >
          <div className="atropos-scale w-full h-full">
            <div className="atropos-rotate w-full h-full">
              <div className="atropos-inner w-full h-full rounded-xl shadow-lg overflow-hidden relative">
                {/* Media container (image/video) */}
                <div className="absolute inset-0">
                  <div className="relative w-full h-full">
                    {selectedRank.video ? (
                      <>
                        {/* Image fallback with blur */}
                        <div
                          className={`transition-all duration-300 ${
                            isHovered ? "opacity-0" : "opacity-100"
                          }`}
                        >
                          <Image
                            src={selectedRank.icon}
                            alt={selectedRank.title}
                            fill
                            className={`object-cover transition-all duration-300 ${blurLevel}`}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                            data-atropos-offset="0"
                          />
                        </div>
                        {/* Video with blur */}
                        <video
                          key={`${selectedRank.name}-${key}`}
                          ref={videoRef}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
                            isHovered ? "opacity-100" : "opacity-0"
                          } ${blurLevel}`}
                          loop
                          muted
                          playsInline
                          data-atropos-offset="0"
                        >
                          <source src={selectedRank.video} type="video/mp4" />
                        </video>
                      </>
                    ) : (
                      <Image
                        src={selectedRank.icon}
                        alt={selectedRank.title}
                        fill
                        className={`object-cover transition-all duration-300 ${blurLevel}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                        data-atropos-offset="0"
                      />
                    )}
                  </div>
                </div>

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                  data-atropos-offset="2"
                />

                {/* Content with progress indicator */}
                <div className="relative flex flex-col justify-center  pt-[8rem] h-full p-6 text-white">
                  <h2
                    className={`${medievalSharp.className} text-3xl text-center mb-2`}
                    data-atropos-offset="8"
                  >
                    {selectedRank.title}
                  </h2>
                  <p
                    className="text-center text-sm mb-4 max-w-prose mx-auto"
                    data-atropos-offset="5"
                  >
                    {selectedRank.description}
                  </p>
                  <div
                    className="w-full grid grid-cols-2 gap-2 text-xs"
                    data-atropos-offset="3"
                  ></div>
                  {/* Progress bar */}
                  <div className="mt-4 w-full" data-atropos-offset="2">
                    <div className="w-full bg-gray-800/50 rounded-full h-3 border border-[#C9A356]/30 relative overflow-hidden">
                      {/* Glowing effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C9A356]/10 to-transparent animate-pulse"></div>

                      {/* Progress indicator */}
                      <div
                        className={`h-full rounded-full transition-all duration-300 relative ${
                          isComplete
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : isAlmostComplete
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                            : isInProgress
                            ? "bg-gradient-to-r from-blue-800 to-blue-400"
                            : "bg-gradient-to-r from-gray-500 to-gray-700"
                        }`}
                        style={{ width: `${rankProgress}%` }}
                      >
                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                      </div>

                      {/* Medieval decorative elements */}
                      <div className="absolute left-0 top-0 h-full w-1 bg-[#C9A356]/50"></div>
                      <div className="absolute right-0 top-0 h-full w-1 bg-[#C9A356]/50"></div>
                    </div>

                    {/* Progress text with medieval font */}
                    <div className="flex justify-between items-center mt-2">
                      <p
                        className={`${medievalSharp.className} text-xs text-[#C9A356]`}
                      >
                        Progreso
                      </p>
                      <p
                        className={`${medievalSharp.className} text-xs text-[#C9A356]`}
                      >
                        {rankProgress}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedRank.isUltimate && (
          <div className="absolute inset-0 rounded-xl pointer-events-none">
            <div className="absolute inset-0 bg-yellow-500/20 animate-pulse rounded-xl" />
          </div>
        )}
      </div>
    </GoldenBorderClip>
  );
}

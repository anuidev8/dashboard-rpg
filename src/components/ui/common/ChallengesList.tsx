"use client";
import { useState, useCallback, useEffect,} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Challenge, Rank } from "@prisma/client";
import { MedievalSharp } from "next/font/google";
import { useSubmissionContext } from "@/contexts/SubmissionContext";
import { useChallenges } from "@/hooks/useChallenges";
import { SkeletonLoader } from "./SkeletonLoader";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { GoldenBorderRectClip } from "./containers/golder-border-rect";
import Image from "next/image";
import { StylizedTitle } from "../stylized-title";



const medievalSharp = MedievalSharp({ weight: "400", subsets: ["latin"] });

interface ChallengesListProps {
  selectedRank: Rank;
}

interface ChallengeCardProps {
  challenge: Challenge;
  status: string;
  submitting: string | null;
  onSubmit: (challenge: Challenge) => void;
}

function ChallengeCard({
  challenge,
  status,
  submitting,
  onSubmit,
}: ChallengeCardProps) {
  return (
    <div className="relative rounded-lg p-4 min-h-[220px] flex flex-col border-2 border-yellow-500 shadow-[inset_0_5px_3px_rgba(0,0,0,0.8)] overflow-hidden bg-gray-800/50">
      {/* Gradient overlay similar to RankItem */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-yellow-500/20 via-black/40 to-transparent -z-10"></div>

      <h3
        className={`${medievalSharp.className} text-base text-yellow-400 mb-2 relative z-10`}
      >
        {challenge.name}
      </h3>
      <p className="text-gray-300 text-sm mb-4 flex-grow relative z-10">
        {challenge.description}
      </p>
      <div className="mt-auto relative z-10">
        {status === "NOT_STARTED" ? (
          <button
            onClick={() => onSubmit(challenge)}
            disabled={submitting === challenge.id}
            className="w-full text-sm bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-gray-900 font-bold py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-yellow-600/50 shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)]"
          >
            {submitting === challenge.id ? "En revisión" : "Completar Reto"}
          </button>
        ) : status === "REJECTED" ? (
          <>
            <button
              onClick={() => onSubmit(challenge)}
            
              className="w-full text-sm bg-gradient-to-b from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50  border border-red-600/50 shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)]"
            >
             intentar completar
            </button>
            <p className="text-xs text-red-400 mt-1 text-center">
              Reto rechazado
            </p>
          </>
        ) : status === "PENDING" ? (
          <div className="text-center  px-4 flex justify-center items-center rounded bg-gradient-to-b from-gray-600 to-gray-800 border border-yellow-600/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
             <Image
              src="/images/icons/icon-pending.svg"
              alt="check"
              width={40}
              height={40}
            />
            <span className="text-yellow-400 flex items-center justify-center text-sm">
           En revisión
            </span>
          </div>
        ) : (
          <div className="text-center  px-4 rounded bg-gradient-to-b flex justify-center items-center from-green-600 to-green-800 border border-green-500/30 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
             <Image
              src="/images/icons/icon-check.svg"
              alt="check"
              width={40}
              height={40}
            />
            <span className="text-white flex items-center text-sm justify-center">
              Completado
            </span>
           
          </div>
        )}
      </div>
    </div>
  );
}

export function ChallengesList({ selectedRank }: ChallengesListProps) {
  const { 
    setSelectedChallenge, 
    setModalOpen,
    modalOpen
  } = useSubmissionContext();

  const [submitting, setSubmitting] = useState<string | null>(null);
  // Use the useChallenges hook to manage challenges and submissions
  const { 
    challenges, 
    loading, 
    error, 
    getChallengeStatus,
    refetchChallenges
  } = useChallenges({ 
    selectedRank,
    onChallengeSelect: () => {}
  });

  // Reset submitting state and refetch challenges when modal closes
  useEffect(() => {
    if (!modalOpen) {
      setSubmitting(null); // Reset submitting state
      refetchChallenges(); // Only refetch if user actually submitted something
    }
  }, [modalOpen]);

  // Handle opening the modal for challenge submission
  const handleSubmitChallenge = useCallback((challenge: Challenge) => {
    if (getChallengeStatus(challenge) === "PENDING") {
      // If already pending, don't allow new submission
      return;
    }
    setSelectedChallenge(challenge);
    setModalOpen(true);
    setSubmitting(challenge.id);
  }, [getChallengeStatus]);

  if (loading)
    return (
      <div className="rounded-t-[20px] relative z-20 p-4 md:p-6 h-[310px]">
        <Image
          src="/images/obj/red_bar.png"
          alt="paper-texture"
          width={50}
          height={100}
          className="h-full absolute top-0 -left-[20px] z-20 hidden md:block"
        />
        <Image
          src="/images/obj/blue_bar.png"
          alt="paper-texture"
          width={50}
          height={100}
          className="h-full absolute top-0 -right-[20px] z-20 hidden md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-yellow-500/20 to-transparent rounded-t-[20px] pointer-events-none z-20"></div>
        <GoldenBorderRectClip
          borderWidth={4}
          className="w-full h-full absolute top-0 z-10 left-0 hidden md:block"
        >
          <div
            style={{
              backgroundImage: "url('/images/obj/paper-texture-dark.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full h-full absolute top-0 left-0"
          ></div>
        </GoldenBorderRectClip>
    
        <StylizedTitle title={`Desafíos de ${selectedRank.name}`} />
        <div className="relative z-40 pt-1">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 3 },
            }}
            className="mt-4 relative z-20 h-full"
          >
            {[1, 2, 3].map((index) => (
              <SwiperSlide key={index}>
                <SkeletonLoader variant="challenge" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="bg-gradient-to-b from-gray-800/90 to-gray-900/90 rounded-lg p-4 md:p-6 shadow-[0_0_15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] border-2 border-yellow-500/30">
        <p className="text-red-400 text-center">{error}</p>
      </div>
    );

  return (
  
    <div className="rounded-t-[20px] relative z-20 p-0 md:p-6 h-[310px]">
      
     
      <Image
        src="/images/obj/red_bar.png"
        alt="paper-texture"
        width={50}
        height={100}
        className="h-full absolute top-0 -left-[20px] z-20 hidden md:block"
      />
      <Image
        src="/images/obj/blue_bar.png"
        alt="paper-texture"
        width={50}
        height={100}
        className="h-full absolute top-0 -right-[20px] z-20 hidden md:block"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-yellow-500/20 to-transparent  rounded-t-[20px] pointer-events-none  z-20"></div>
      <GoldenBorderRectClip
        borderWidth={4}
        className="w-full h-full absolute top-0 z-10 left-0 hidden md:block"
      >
        <div
          style={{
            backgroundImage: "url('/images/obj/paper-texture-dark.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full h-full absolute top-0 left-0"
        ></div>
      </GoldenBorderRectClip>
      <div className="md:block hidden">
      <StylizedTitle title={`  Desafíos de ${selectedRank.name}`} />
     </div>
   
      <div className="relative z-40 pt-1 h-full">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
          }}
          className="mt-4 relative z-20 h-full"
        >
          {challenges.map((challenge) => (
            <SwiperSlide key={challenge.id}>
              <ChallengeCard
                challenge={challenge}
                status={getChallengeStatus(challenge)}
                submitting={submitting}
                onSubmit={handleSubmitChallenge}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      

    </div>
  
 
  );
}

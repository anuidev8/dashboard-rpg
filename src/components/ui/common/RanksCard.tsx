'use client'
import { MedievalSharp } from 'next/font/google'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect} from 'react';

import { useRankProgress } from '@/hooks/useRankProgress'
import { RankItem } from './RankItem'
import { MobileRankItem } from './MobileRankItem'
import { useSubmissionContext } from '@/contexts/SubmissionContext'
import { SkeletonLoader } from './SkeletonLoader'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { GoldenBorderClip } from './containers/golden-border';
import { StylizedTitle } from '../stylized-title';
import Image from 'next/image';

const medievalSharp = MedievalSharp({ weight: '400', subsets: ['latin'] })

export function RanksCard() {
  const { ranks, selectedRank, setSelectedRank,refetchChallenges,setRefetchChallenges } = useSubmissionContext();

  
  const {
    progress,
    loading,
    user,
    getBlurLevel,
    isRankLocked,
    getChallengeName,
    fetchProgress
  } = useRankProgress({ 
    ranks, 
    selectedRank: selectedRank || ranks[0], 
    setSelectedRank 
  });

  useEffect(() => {
    if (refetchChallenges) {
      fetchProgress();
      setRefetchChallenges(false);
    }
  }, [refetchChallenges]);

  if (!user) {
    return (
      <div className="rounded-lg p-4 md:p-6 shadow-lg">
        <h2 className={`${medievalSharp.className} text-2xl text-yellow-400 mb-6`}>
          Tablero de Poder
        </h2>
        <p className="text-center">Inicia sesión para ver tu progreso</p>
      </div>
    );
  }

  if (loading) {
    return (
      <>
        {/* Desktop Loading View */}
        <div className="hidden md:block h-full">
          <GoldenBorderClip borderWidth={2} className="h-full">
            <div className="rounded-lg h-full relative p-5 bg-gradient-to-t from-black/80 via-yellow-500/20 via-black/40 to-transparent shadow-lg">
              <Image 
                src="/images/obj/square-medieval-bg.png" 
                alt="Leaderboard" 
                className="w-full h-full absolute top-0 left-0 z-10 opacity-40" 
                width={100} 
                height={100} 
              />
              <StylizedTitle title="Tablero de Poder" />
              <div className="relative z-20 mt-4">
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 2 },
                  }}
                  className="mt-4"
                >
                  {[1, 2, 3].map((index) => (
                    <SwiperSlide key={index}>
                      <SkeletonLoader variant="rank" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </GoldenBorderClip>
        </div>

        {/* Mobile Loading View */}
        <div className="block md:hidden">
          <div className="relative z-20 w-full h-full">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={1.1}
              navigation
              pagination={{ clickable: true }}
              className="px-4 py-2 h-full"
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
              }}
            >
              {[1, 2, 3].map((index) => (
                <SwiperSlide key={index}>
                  <SkeletonLoader variant="rank" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block h-full" >
        <GoldenBorderClip borderWidth={2} className="h-full">
          <div className="rounded-lg h-full relative p-5 bg-gradient-to-t from-black/80 via-yellow-500/20 via-black/40 to-transparent shadow-lg h-full">
            <Image 
              src="/images/obj/square-medieval-bg.png" 
              alt="Leaderboard" 
              className="w-full h-full absolute top-0 left-0 z-10 opacity-40" 
              width={100} 
              height={100}  
            />  
            <StylizedTitle title="Tablero de Poder" />
            <div  className="relative z-20 h-full">
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 2 },
                }}
                className="mt-4 h-[370px]"
              >
                {ranks.map((rank) => {
                  const rankProgress = progress?.rankProgress[rank.name]?.progress || 0;
                  const isLocked = isRankLocked(rank.name);
                  const blurLevel = getBlurLevel(rankProgress);
                  const challengeName = getChallengeName(rank.name);

                  return (
                    <SwiperSlide key={rank.name}>
                      <div className="bg-[url('/images/obj/paper-texture.png')] bg-cover bg-center rounded-xl">
                        <RankItem
                          rank={rank}
                          rankProgress={rankProgress}
                          isLocked={isLocked}
                          isSelected={selectedRank?.name === rank.name}
                          challengeName={challengeName}
                          blurLevel={blurLevel}
                          onClick={() => !isLocked && setSelectedRank(rank)}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </GoldenBorderClip>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="relative z-20 w-full h-full">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.1}
            navigation
            pagination={{ clickable: true }}
            className="px-4 py-2 h-full"
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
            }}
          >
            {ranks.map((rank) => {
              const rankProgress = progress?.rankProgress[rank.name]?.progress || 0;
              const isLocked = isRankLocked(rank.name);
              const blurLevel = getBlurLevel(rankProgress);
              const challengeName = getChallengeName(rank.name);
              
            

              return (
                <SwiperSlide key={rank.name}>
                  <MobileRankItem
                    rank={rank}
                    rankProgress={rankProgress}
                    isLocked={isLocked}
                    isSelected={selectedRank?.name === rank.name}
                    challengeName={challengeName}
                    blurLevel={blurLevel}
                    onClick={() => !isLocked && setSelectedRank(rank)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
}

import { MainContainer } from "@/components/ui/common/containers/main-container";
import HomeComponent from "@/components/ui/common/containers/Home";
import { Suspense} from "react";
import { MedievalFuturisticLoader } from "@/components/ui/loader";
import { prisma } from "@/lib/prisma";

function LoadingState() {
  return (
 
    <div className=" w-full px-4 py-6 flex items-center justify-center relative w-full flex flex-col md:p-2 overflow-hidden bg-[#1A1A1D] min-h-screen relative z-20">
    <MedievalFuturisticLoader size="xl" className="w-full max-w-[400px] md:max-w-[500px]" />
  </div>
  
  );
}
export default async function Home() {
  const ranks = await prisma.rank.findMany({
    orderBy: {
      name: 'asc'
    }
  });


  return (
    <MainContainer>
       <Suspense fallback={<LoadingState />}>

      <HomeComponent ranks={ranks} />

      </Suspense>
    
    </MainContainer>
  );
}

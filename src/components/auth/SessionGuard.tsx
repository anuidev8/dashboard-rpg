"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

import { MedievalFuturisticLoader } from "../ui/loader";
function LoadingState() {
  return (
 
    <div className=" w-full px-4 py-6 flex items-center justify-center relative w-full flex flex-col md:p-2 overflow-hidden bg-[#1A1A1D] min-h-screen relative z-20">
        <MedievalFuturisticLoader size="xl" className="w-full max-w-[400px] md:max-w-[500px]" />
      </div>
  
  );
}
export default function SessionGuard({ children }: { children: ReactNode }) {
  const { data,status } = useSession();
  useEffect(() => {
    if (data?.error === "RefreshAccessTokenError") {
      signIn("keycloak");
    }
  }, [data]);

  useEffect(() => {
    if (data?.error === "UserNotFoundOrInactive") {
      signOut();
    }
  }, [data]);
  if (status === "loading") {
    return <LoadingState />
  }



  return <>{children}</>;
}

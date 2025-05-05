"use client";

import type { ReactNode } from "react";
import Image from "next/image";

interface MainContainerProps {
  children: ReactNode;
}

export function MainContainer({ children }: MainContainerProps) {
  return (
    <div className="relative w-full flex flex-col md:p-2 overflow-hidden bg-[#1A1A1D] min-h-screen">
{/*       <GoldenBorderClip borderWidth={4} className="h-auto" hideOnMobile={true}> */}
        {/* Background texture image */}
        <div className="absolute inset-0 z-10 opacity-20 pointer-events-none select-none">
          <Image
            src="/images/obj/paper-texture-dark.jpeg"
            alt="Paper texture background"
            fill
            className="object-cover"
            quality={70}
            priority
          />
        </div>

        {/* Page content */}
        <div className="relative z-20">
          {children}
        </div>
  {/*     </GoldenBorderClip> */}
    </div>
  );
}

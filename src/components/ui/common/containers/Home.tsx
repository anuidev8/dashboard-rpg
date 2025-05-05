// components/client/home.tsx
"use client";



import { Rank } from "@prisma/client";
import { HomeComponentMobile } from "./home/HomeMobile";
import { HomeComponentWeb } from "./home/HomeWeb";


export default function Home({ ranks }: { ranks: Rank[] }) {
  


  return (
    <div>
      <div className="hidden md:block">
        <HomeComponentWeb ranks={ranks} />
      </div>
      <div className="block md:hidden">
        <HomeComponentMobile ranks={ranks} />
      </div>
    </div>

  );
}


import { MedievalSharp } from "next/font/google";
const medievalSharp = MedievalSharp({ weight: "400", subsets: ["latin"] });

export const StylizedTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full flex items-center justify-center my-1 text-center relative z-20 px-6">
      <div className="h-px bg-[#D5B981] w-1/6 md:w-1/4"></div>
      <div className="relative mx-4">
        {/* This is the main title with the texture applied using background-clip */}
        <h2 
          className={`
            ${medievalSharp.className} 
             text-[1.2rem]  
            mb-6 
            relative 
            z-20 
            mb-4 
            text-center 
            pt-5
            bg-clip-text 
            text-transparent
          `}
          style={{
            backgroundImage: "url('/images/obj/paper-texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {title}
        </h2>
        
        {/* This creates a subtle shadow/outline effect to improve readability */}
        <h2 
          className={`
            ${medievalSharp.className} 
            text-[1.2rem] 
            text-white/10
            absolute 
            top-0 
            left-0 
            right-0 
            mb-6 
            z-10 
            mb-4 
            text-center 
            pt-5
          `}
          style={{
            textShadow: "0 4px 1px rgba(0,0,0,0.5)"
          }}
        >
          {title}
        </h2>
      </div>
      <div className="h-px bg-[#D5B981] w-1/6 md:w-1/4"></div>
    </div>
  );
}
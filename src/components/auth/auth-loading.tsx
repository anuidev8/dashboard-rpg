import { MedievalFuturisticLoader } from "@/components/ui/loader";

export function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-full max-w-[400px] md:max-w-[500px] mx-auto">
          <MedievalFuturisticLoader size="xl" className="w-full" />
        </div>
        <h2 className="text-xl font-semibold text-amber-500 mt-4">Preparando tu aventura...</h2>
        <p className="text-gray-400 mt-2">Cargando Academia del Estratega</p>
      </div>
    </div>
  );
}
  
  
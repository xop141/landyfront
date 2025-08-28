"use client";
import Orb from "@/components/reactBits/Orb/Orb";
import TrueFocus from "@/components/reactBits/TrueFocus/TrueFocus";
import { Button } from "@/components/ui/button";
import { MapPin, Telescope } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCafe } from "@/context/CafeContext"; 

export default function Home() {
  const router = useRouter();
  const { cafes } = useCafe(); 

  const explore = () => router.push("/explore");
  const map = () => router.push("/map");

  return (
    <div className="w-screen h-screen h-screen relative flex flex-col justify-center items-center">
      <div className="absolute inset-0">
        <Orb hoverIntensity={2.2} rotateOnHover={true} hue={266} forceHoverState={false} />
      </div>

      <div className="flex flex-row">
        <TrueFocus
          sentence="True Focus"
          manualMode={false}
          blurAmount={5}
          borderColor="#3201F4"
          animationDuration={2}
          pauseBetweenAnimations={1}
        />
      </div>


      <div className="absolute bottom-0 py-[100px] flex gap-2 text-[#E0E0FF]">
        <Button
          className="border border-[#3201F4] bg-transparent backdrop-blur-xl"
          onClick={explore}
        >
          Explore <Telescope />
        </Button>
        <Button
          className="border border-[#3201F4] bg-transparent backdrop-blur-xl"
          onClick={map}
        >
          Map <MapPin />
        </Button>
      </div>
    </div>
  );
}

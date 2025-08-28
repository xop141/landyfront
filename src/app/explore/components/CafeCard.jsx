import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { AirVent } from "lucide-react";
import { CircleStar } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const CafeCard = ({ cafe }) => {
  return (
    <Carousel className="border rounded-xl border-[#3201F4] relative overflow-hidden">
      <CarouselContent>
        {cafe.images.map((img, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src={img}
                alt={`Cafe image ${index + 1}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 400px"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <h1 className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-xl px-8 py-2 font-bold text-white text-center shadow-md">
        {cafe.name}
      </h1>
      <div className="absolute top-2 left-2 rounded-xl p-2 bg-white/20 backdrop-blur-sm flex items-center gap-2 ">
        <div className="bg-green-300 rounded-full w-[10px] h-[10px]" />
        <p className="font-large">15</p>
      </div>
      <div className="absolute top-0 flex gap-2 top-2  right-2 ">
        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-xl ">
          <AirVent />
        </div>

        <Tooltip>
          <TooltipTrigger className="bg-white/20 p-2 rounded-xl backdrop-blur-xl">
            {cafe.offer && <CircleStar className="text-yellow-400" />}
         
          </TooltipTrigger>
          <TooltipContent>{cafe.offer}</TooltipContent>
        </Tooltip>
      </div>
    </Carousel>
  );
};

export default CafeCard;

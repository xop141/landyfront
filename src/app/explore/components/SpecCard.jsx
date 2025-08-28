"use client";
import React from "react";
import useSWR from "swr";
import { Cpu, Gpu, Monitor, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const fetcher = (url) => fetch(url).then((res) => res.json());

const SpecCard = ({ cafe,cafeId }) => {
  const router = useRouter();
 
  
  
  const orderPage = () => router.push(`/partner/${cafeId}`);

  // const { data, error, isLoading } = useSWR(
  //   cafeId ? `https://landyfront.vercel.app/getSpec?id=${cafeId}` : null,
  //   fetcher
  // );

  // if (isLoading) return <div className="p-4">Loading specs...</div>;
  // if (error) return <div className="p-4 text-red-500">Failed to load specs</div>;
  // if (!data?.pcs?.length) return <div className="p-4">No specs found</div>;

  return (
    <div className="flex flex-col gap-4 p-4 bg-white/10 backdrop-blur-md rounded-lg">
      {cafe.map((pc) => (
        <div
          key={pc._id}
          className="p-3 border rounded bg-white/20 flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">{pc.name}</h2>
            <span className="text-sm font-medium">
              ₮{pc.pricePerHour.toLocaleString()} / hr
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>{pc.cpu}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gpu className="w-4 h-4" />
              <span>{pc.gpu}</span>
            </div>
            <div className="flex items-center gap-2">
              <Headset className="w-4 h-4" />
              <span>{pc.ram}</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              <span>{pc.monitor}</span>
            </div>
          </div>
        </div>
      ))}
      <Button
        className="bg-transparent border"
        onClick={orderPage}
      >
        Order
      </Button>
    </div>
  );
};

export default SpecCard;

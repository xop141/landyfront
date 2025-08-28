"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CafeCard from "./CafeCard";
import SpecCard from "./SpecCard";
import SearchBar from "./SearchBar";
import { Funnel } from "lucide-react";
import Filters from "./Filters";
import Loader from "./Loader";
import { useCafe } from "@/context/CafeContext";
import AnimatedList from "@/components/reactBits/AnimatedList/AnimatedList";
const CafeList = () => {
  const { cafes, isLoading, error } = useCafe();

  if (error) return <div>❌ Failed to load</div>;
  if (isLoading) return <Loader />;
console.log(cafes);


  return (
    <div>
      {/* Search + Filter */}
      <div className="flex gap-5 items-start py-5 ">
        <SearchBar cafes={cafes} />
        <Dialog>
          <DialogTrigger>
            <div className="bg-white/50 p-2 rounded-xl">
              <Funnel />
            </div>
          </DialogTrigger>
          <DialogContent className="bg-white/20 backdrop-blur-xl">
            <DialogTitle />
            <Filters />
          </DialogContent>
        </Dialog>
      </div>

    
      <div className="flex flex-col gap-5">
        {cafes.map((cafe) => (
          <Dialog key={cafe._id}>
            <DialogTrigger>
              <CafeCard cafe={cafe} />
            </DialogTrigger>
            <DialogContent className="bg-transparent backdrop-blur-xl">
              <DialogTitle />
              <SpecCard cafe={cafe.pcs} cafeId={cafe._id} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
      {/* <AnimatedList
items={cafes}
      showGradients={true}
  enableArrowNavigation={true}
  displayScrollbar={true}
      
      /> */}
    </div>
  );
};

export default CafeList;

import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const Loader = () => {
  return (
    <div className='flex flex-col gap-5 py-2' >
      {Array.from({length:5}).map((loader,index)=>(
        <Skeleton key={index} className="h-[150px] w-full rounded-xl"/>
      ))}
    </div>
  )
}

export default Loader

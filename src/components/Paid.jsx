import React from 'react'

const Paid = () => {
  return (
        <div
      className="relative flex flex-col items-center justify-center w-full h-72 p-4 text-center text-gray-100 font-play text-sm overflow-hidden rounded-xl"
      style={{
        backgroundImage:
          "url('https://distribution.faceit-cdn.net/images/aad2a3ac-aab1-42f8-afef-1488f70426d7.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        rowGap: "16px",
      }}
    >
      <h2 className="text-lg font-semibold">some ad</h2>
      <p className="text-sm">early bird</p>
     
    </div>

  )
}

export default Paid

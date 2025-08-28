"use client"
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
const SearchBar = ({ cafes }) => {
  const router = useRouter()
  const [query, setQuery] = useState("");


  const filteredCafes = useMemo(() => {
    if (!query) return [];
    return cafes.filter((cafe) =>
      cafe.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, cafes]);
const jump = (id) =>{
router.push(`/partner/${id}`)
}
  return (
    <div className="w-full flex flex-col gap-4 items-center">
 
      <div className="border border-white/20 rounded-full px-4 py-2 w-full max-w-md bg-white/10 backdrop-blur-lg flex items-center gap-2">
        <Search className="text-gray-300" />
        <input
          type="text"
          placeholder="Search cafes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none text-white placeholder-gray-300 w-full"
        />
      </div>


      {query && (
        <div className="w-full max-w-md flex flex-col gap-2">
          {filteredCafes.length === 0 ? (
            <p className="text-gray-400 text-sm">No results found</p>
          ) : (
            filteredCafes.map((cafe) => (
              <div
                key={cafe._id}
                className="p-3 bg-white/10 rounded-lg flex justify-between"
                onClick={()=>jump(cafe._id)}
              >
                <span className="text-white">{cafe.name}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

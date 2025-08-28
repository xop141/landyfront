"use client";
import { createContext, useContext } from "react";
import useSWR from "swr";

const CafeContext = createContext(null);

const fetcher = (url) => fetch(url).then((res) => res.json());

export const CafeProvider = ({ children }) => {
  const { data: cafes, error, isLoading } = useSWR(
    "https://landybackend.onrender.com/getCafe",
    fetcher,
    {
      revalidateOnFocus: false, // don’t refetch when switching tabs
      revalidateIfStale: false, // no refetch when changing pages
      revalidateOnReconnect: false, // no refetch on reconnect
    }
  );

  return (
    <CafeContext.Provider value={{ cafes, error, isLoading }}>
      {children}
    </CafeContext.Provider>
  );
};

// Hook to use cafes anywhere
export const useCafe = () => useContext(CafeContext);

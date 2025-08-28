import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import axios from "axios";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const url = "https://landybackend.onrender.com"
export const getLocation = async () => {
  try {
    const response = await axios.post(`${url}/getLocation`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching locations:", error);
    return []; 
  }
};
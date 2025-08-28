"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { getLocation } from "@/lib/utils";
const Page = () => {
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [cafes, setCafes] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchCafes = async () => {
      const data = await getLocation();
      setCafes(data);
      console.log("Fetched cafes:", data);
    };
    fetchCafes();
  }, []);

  // Initialize map
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.NEXT_PUBLIC_MAP_API}`,
      center: [106.9057, 47.9064], 
      zoom: 13,
    });

    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
  }, []);

  useEffect(() => {
    if (!map.current) return;

    cafes.forEach((cafe) => {
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
        `<span class="text-blue-600 cursor-pointer">${cafe.name}</span>`
      );

      const marker = new maplibregl.Marker()
        .setLngLat([cafe.location.lng, cafe.location.lat])
        .setPopup(popup)
        .addTo(map.current);

      popup.on("open", () => {
        const el = popup.getElement().querySelector("span");
        if (el) {
          el.addEventListener("click", () => router.push(`/partner/${cafe._id}`));
        }
      });
    });
  }, [cafes, router]);

  return <div ref={mapContainer} className="w-screen h-screen" />;
};

export default Page;

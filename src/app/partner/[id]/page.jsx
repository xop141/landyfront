"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [pcs, setPcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // auto-load pcs when component mounts
  useEffect(() => {
    const fetchPCs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          "https://landybackend.onrender.com/pc/member"
        );

        const dataArray = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        setPcs(dataArray);
      } catch (err) {
        console.error("Error fetching members:", err.response?.data || err.message);
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPCs();
  }, []);

  const getStatusColor = (pc) => {
    if (!pc.pc_enabled) return "bg-gray-700"; // disabled
    return pc.pc_in_using ? "bg-red-600" : "bg-green-600";
  };

  // group by area name
  const grouped = pcs.reduce((acc, pc) => {
    if (!acc[pc.pc_area_name]) acc[pc.pc_area_name] = [];
    acc[pc.pc_area_name].push(pc);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-6">
      {loading && (
        <p className="text-center text-gray-400 animate-pulse">Loading PCs...</p>
      )}
      {error && <p className="text-center text-red-400">⚠️ {error}</p>}

      <div className="space-y-10 max-w-6xl mx-auto">
        {Object.entries(grouped).map(([areaName, pcsInArea]) => (
          <div
            key={areaName}
            className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-4"
          >
            <h2 className="text-lg font-semibold mb-3 text-gray-200 border-b border-gray-800 pb-1">
              {areaName}
            </h2>

            <div className="relative h-[300px] w-full bg-gray-800 rounded-xl overflow-hidden">
              {pcsInArea.map((pc) => (
                <div
                  key={pc.pc_mac}
                  title={`Name: ${pc.pc_name}\nIP: ${pc.pc_ip}\nStatus: ${
                    !pc.pc_enabled
                      ? "Disabled"
                      : pc.pc_in_using
                      ? "In Use"
                      : "Available"
                  }`}
                  className={`absolute flex flex-col items-center justify-center w-16 h-16 rounded-lg text-white font-medium shadow-md cursor-pointer transition-transform duration-200 ${getStatusColor(
                    pc
                  )} hover:scale-105`}
                  style={{
                    top: `${pc.pc_box_top}px`,
                    left: `${pc.pc_box_left}px`,
                  }}
                >
                  <span className="text-sm">{pc.pc_name}</span>
                  <span className="text-[10px] opacity-80">
                    {!pc.pc_enabled
                      ? "Disabled"
                      : pc.pc_in_using
                      ? "In Use"
                      : "Free"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!loading && pcs.length === 0 && !error && (
        <p className="text-gray-500 mt-10 text-center text-sm italic">
          No PCs found.
        </p>
      )}
    </div>
  );
};

export default Page;

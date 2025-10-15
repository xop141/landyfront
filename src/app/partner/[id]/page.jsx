"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [pcs, setPcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load PCs automatically
  useEffect(() => {
    const fetchPCs = async () => {
      try {
        const response = await axios.post(
          "https://landybackend.onrender.com/pc/member"
        );
        const dataArray = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];
        setPcs(dataArray);
      } catch (err) {
        setError(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPCs();
  }, []);

  const getStatusColor = (pc) => {
    if (!pc.pc_enabled) return "bg-gray-700"; // Disabled
    return pc.pc_in_using ? "bg-red-600" : "bg-green-600";
  };

  // Group PCs by area name
  const grouped = pcs.reduce((acc, pc) => {
    if (!acc[pc.pc_area_name]) acc[pc.pc_area_name] = [];
    acc[pc.pc_area_name].push(pc);
    return acc;
  }, {});

  // Separate VIP PCs if area name or other logic matches
  const vipPCs = pcs.filter((pc) =>
    pc.pc_area_name?.toLowerCase().includes("vip")
  );
  const normalAreas = Object.entries(grouped).filter(
    ([areaName]) => !areaName.toLowerCase().includes("vip")
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-4 md:p-10">
      {loading && (
        <p className="text-center text-gray-400 animate-pulse">Loading PCs...</p>
      )}
      {error && (
        <p className="text-center text-red-400 font-medium">
          ⚠️ Error: {error}
        </p>
      )}

      {!loading && (
        <div className="max-w-7xl mx-auto space-y-12">
          {/* VIP Section */}
          {vipPCs.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-yellow-400 tracking-wide">
                ⭐ VIP ZONE
              </h2>
              <div className="relative overflow-x-auto rounded-2xl border border-yellow-600 p-3 bg-gradient-to-r from-yellow-950/40 to-gray-900 shadow-[0_0_20px_rgba(255,215,0,0.2)]">
                <div className="flex gap-3 min-w-max">
                  {vipPCs.map((pc) => (
                    <div
                      key={pc.pc_mac}
                      title={`${pc.pc_name} - ${pc.pc_ip}`}
                      className={`flex flex-col items-center justify-center w-24 h-24 rounded-lg shadow-md text-sm font-semibold transition-all ${getStatusColor(
                        pc
                      )} hover:scale-105`}
                    >
                      <span>{pc.pc_name}</span>
                      <span className="text-xs opacity-80">
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
            </div>
          )}

          {/* Regular Areas */}
          {normalAreas.map(([areaName, pcsInArea]) => (
            <div
              key={areaName}
              className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-5"
            >
              <h2 className="text-lg font-semibold mb-3 text-gray-300 border-b border-gray-700 pb-1">
                {areaName}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {pcsInArea.map((pc) => (
                  <div
                    key={pc.pc_mac}
                    title={`${pc.pc_name} - ${pc.pc_ip}`}
                    className={`flex flex-col items-center justify-center rounded-lg h-24 shadow-md text-sm font-semibold ${getStatusColor(
                      pc
                    )} hover:scale-105 transition-transform duration-150`}
                  >
                    <span>{pc.pc_name}</span>
                    <span className="text-xs opacity-80">
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

          {pcs.length === 0 && !error && (
            <p className="text-center text-gray-500 italic">
              No PCs found in database.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;

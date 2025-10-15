"use client";
import React, { useState } from "react";
import axios from "axios";

const Page = () => {
  const [pcs, setPcs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const test = async () => {
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
      console.log(dataArray);
    } catch (err) {
      console.error("Error fetching members:", err.response?.data || err.message);
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (pc) => {
    if (!pc.pc_enabled) return "bg-gray-400";
    return pc.pc_in_using ? "bg-red-500" : "bg-green-500";
  };

  // group by area name
  const grouped = pcs.reduce((acc, pc) => {
    if (!acc[pc.pc_area_name]) acc[pc.pc_area_name] = [];
    acc[pc.pc_area_name].push(pc);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          💻 PC Map Overview
        </h1>

        <button
          onClick={test}
          disabled={loading}
          className={`px-6 py-2 rounded-lg text-white font-semibold shadow-md transition-all duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {loading ? "Loading..." : "Load PCs"}
        </button>

        {error && (
          <p className="text-red-600 mt-4 font-medium">⚠️ {error}</p>
        )}
      </div>

      {/* Map layout */}
      <div className="mt-8 space-y-12 max-w-6xl mx-auto">
        {Object.entries(grouped).map(([areaName, pcsInArea]) => (
          <div
            key={areaName}
            className="relative bg-white rounded-2xl shadow-md p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              {areaName}
            </h2>

            <div className="relative h-[300px] w-full bg-gray-100 rounded-xl overflow-hidden">
              {pcsInArea.map((pc) => (
                <div
                  key={pc.pc_mac}
                  title={`IP: ${pc.pc_ip}\nStatus: ${
                    pc.pc_in_using ? "In Use" : "Available"
                  }`}
                  className={`absolute flex flex-col items-center justify-center w-16 h-16 rounded-lg text-white font-medium shadow-md cursor-pointer transition-all duration-200 ${getStatusColor(
                    pc
                  )} hover:scale-105`}
                  style={{
                    top: `${pc.pc_box_top}px`,
                    left: `${pc.pc_box_left}px`,
                  }}
                >
                  <span className="text-sm">{pc.pc_name}</span>
                  <span className="text-[10px] opacity-80">
                    {pc.pc_in_using ? "In Use" : "Free"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {pcs.length === 0 && !loading && !error && (
        <p className="text-gray-500 mt-8 text-center text-sm italic">
          No data yet. Click “Load PCs” to fetch info.
        </p>
      )}
    </div>
  );
};

export default Page;

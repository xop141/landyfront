"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [pcs, setPcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto-load PCs
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

  // Group PCs by area (room)
  const grouped = pcs.reduce((acc, pc) => {
    if (!acc[pc.pc_area_name]) acc[pc.pc_area_name] = [];
    acc[pc.pc_area_name].push(pc);
    return acc;
  }, {});

  // Separate VIP rooms
  const vipRooms = Object.entries(grouped).filter(([areaName]) =>
    areaName.toLowerCase().includes("vip")
  );
  const normalRooms = Object.entries(grouped).filter(
    ([areaName]) => !areaName.toLowerCase().includes("vip")
  );

  const Room = ({ name, pcsInRoom, vip }) => (
    <div
      className={`p-5 rounded-2xl shadow-lg ${
        vip
          ? "bg-yellow-950 border border-yellow-600"
          : "bg-gray-900 border border-gray-800"
      }`}
    >
      <h2
        className={`text-lg font-semibold mb-4 ${
          vip ? "text-yellow-400" : "text-gray-200"
        }`}
      >
        {vip ? `⭐ VIP ${name}` : name}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {pcsInRoom.map((pc) => (
          <div
            key={pc.pc_mac}
            title={`Name: ${pc.pc_name}\nIP: ${pc.pc_ip}\nStatus: ${
              !pc.pc_enabled
                ? "Disabled"
                : pc.pc_in_using
                ? "In Use"
                : "Free"
            }`}
            className={`flex flex-col items-center justify-center h-24 rounded-lg shadow-md text-sm font-semibold transition-transform duration-150 ${
              getStatusColor(pc)
            } hover:scale-105`}
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
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 md:p-10 space-y-10">
      {loading && (
        <p className="text-center text-gray-400 animate-pulse">Loading PCs...</p>
      )}
      {error && (
        <p className="text-center text-red-400 font-medium">⚠️ {error}</p>
      )}

      {!loading && !error && (
        <>
          {/* VIP Rooms */}
          {vipRooms.map(([roomName, pcsInRoom]) => (
            <Room key={roomName} name={roomName} pcsInRoom={pcsInRoom} vip />
          ))}

          {/* Normal Rooms */}
          {normalRooms.map(([roomName, pcsInRoom]) => (
            <Room key={roomName} name={roomName} pcsInRoom={pcsInRoom} />
          ))}

          {pcs.length === 0 && (
            <p className="text-center text-gray-500 italic">
              No PCs found.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Page;

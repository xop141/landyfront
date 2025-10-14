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

  return (
    <div className="p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded"
        onClick={test}
      >
        Load PCs
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {pcs.map((pc) => (
          <div
            key={pc.pc_mac}
            className={`p-2 rounded shadow text-white text-center ${getStatusColor(pc)}`}
            title={`IP: ${pc.pc_ip}\nArea: ${pc.pc_area_name}`}
          >
            <p className="font-bold text-sm">{pc.pc_name}</p>
            <p className="text-xs">
              {pc.pc_in_using ? "In Use" : "Available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

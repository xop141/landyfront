"use client";
import React, { useState } from "react";
import axios from "axios";

const Page = () => {
  const [pcs, setPcs] = useState([]); // state to store PCs
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(null); // error state

  const test = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://landybackend.onrender.com/pc/member"
      );
      setPcs(response.data); // store data in state
    } catch (err) {
      console.error("Error fetching members:", err.response?.data || err.message);
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        className="bg-green-300 px-[20px] py-[10px] mb-4"
        onClick={test}
      >
        Load PCs
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pcs.map((pc) => (
          <div
            key={pc.pc_mac} // mac is unique
            className="border p-4 rounded shadow"
          >
            <h3 className="font-bold text-lg">{pc.pc_name}</h3>
            <p>Area: {pc.pc_area_name}</p>
            <p>IP: {pc.pc_ip}</p>
            <p>Status: {pc.pc_in_using ? "In Use" : "Available"}</p>
            <p>Enabled: {pc.pc_enabled ? "Yes" : "No"}</p>
            <p>Comment: {pc.pc_comment || "None"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

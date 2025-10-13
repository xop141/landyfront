"use client";
import React from "react";
import axios from "axios";

const Page = () => {
  const test = async () => {
    try {
      const response = await axios.post("https://landybackend.onrender.com/pc/member");
      console.log("Data from backend:", response.data);
    } catch (err) {
      console.error("Error fetching members:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <button
        className="bg-green-300 px-[20px] py-[10px]"
        onClick={test}
      >
        sad
      </button>
    </div>
  );
};

export default Page;

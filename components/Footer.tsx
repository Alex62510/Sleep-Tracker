"use client";

import React, { useEffect, useState } from "react";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours === 0 ? 12 : hours;
      const h = hours.toString().padStart(2, "0");

      setCurrentTime(`${h}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="z-10 fixed bottom-0 left-0 w-full ml-22 group-hover:ml-64 bg-gray-900 text-white py-6 px-6 text-center transition-all duration-300 border-t-2 border-blue-500 flex justify-around items-center gap-1">
      <span className="bg-gradient-to-r from-[#1173d4] via-white to-[#1173d4] bg-clip-text text-transparent animate-gradient-logo">
        © 2025 SleepTracker. Все права защищены.
      </span>
      <span className="bg-gradient-to-r from-[#1173d4] via-white to-[#1173d4] bg-clip-text text-transparent animate-gradient-logo">
        {currentTime}
      </span>
    </div>
  );
};

export default Footer;

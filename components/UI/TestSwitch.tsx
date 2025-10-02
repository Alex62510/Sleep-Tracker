"use client";

import { useState } from "react";

export default function TestSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <label className="inline-flex items-center cursor-pointer">
      {/* Скрытый input, управляет состоянием */}
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
        className="sr-only peer"
      />
      {/* Трек */}
      <div className="relative w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-[#1173d4] transition-colors">
        {/* Кружок */}
        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></span>
      </div>
    </label>
  );
}

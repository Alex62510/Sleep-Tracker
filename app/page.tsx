import AddSleepEntry from "@/components/AddSleepEntry";
import React from "react";
import FloatingZBackground from "@/components/FloatingZBackground/FloatingZBackground";

export default function Home() {
  return (
    <main className="relative bg-gray-800 min-h-screen text-white ml-22 group-hover:ml-64 pb-16 overflow-hidden">
      <FloatingZBackground />
      <div className="relative z-10">
        <AddSleepEntry />
      </div>
    </main>
  );
}

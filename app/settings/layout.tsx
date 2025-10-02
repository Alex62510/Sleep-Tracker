"use client";
import React from "react";
import FloatingZBackground from "@/components/FloatingZBackground/FloatingZBackground";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden min-h-screen dark:bg-gray-900 bg-gray-800 text-white">
      <FloatingZBackground />

      <section className="relative z-10 ml-22 group-hover:ml-64 pb-16">
        {children}
      </section>
    </div>
  );
}

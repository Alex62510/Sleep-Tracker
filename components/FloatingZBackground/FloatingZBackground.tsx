"use client";
import React, { useState, useEffect } from "react";

export default function FloatingZBackground() {
  const [lettersData, setLettersData] = useState<
      Array<{
        key: number;
        size: string;
        rotate: number;
        left: number;
        delay: number;
        duration: number;
        direction: "up" | "down";
      }>
  >([]);

  useEffect(() => {
    const zCount = 50;
    const sizes = ["text-2xl", "text-3xl", "text-4xl", "text-5xl", "text-6xl"];
    const rotations = [-15, -10, -5, 0, 5, 10, 15];

    const data = Array.from({ length: zCount }, (_, i) => ({
      key: i,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      rotate: rotations[Math.floor(Math.random() * rotations.length)],
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 8,
      direction: "up" as "up",
    }));

    setLettersData(data);
  }, []);

  if (!lettersData.length) return null;

  return (
      <>
        <div className="absolute inset-0 pointer-events-none">
          {lettersData.map(({ key, size, rotate, left, delay, duration, direction }) => (
              <span
                  key={key}
                  className={`absolute ${size} text-white/30 animate-rise-parallax`}
                  style={{
                    left: `${left}%`,
                    bottom: "-10%",
                    transform: `rotate(${rotate}deg)`,
                    animationDelay: `${delay}s`,
                    animationDuration: `${duration}s`,
                    ["--direction" as any]: direction, // TS больше не ругается
                  } as React.CSSProperties}
              >
            Z
          </span>
          ))}
        </div>

        <style jsx>{`
          @keyframes rise-parallax {
            0% {
              transform: translateY(0) translateX(0) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.3;
            }
            40% {
              transform: translateY(-40vh) translateX(5px) rotate(10deg);
              opacity: 0.6;
            }
            70% {
              transform: translateY(-70vh) translateX(-5px) rotate(-10deg);
              opacity: 0.4;
            }
            100% {
              transform: translateY(-120vh) translateX(0) rotate(20deg);
              opacity: 0;
            }
          }
          .animate-rise-parallax {
            animation-name: rise-parallax;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
          }
        `}</style>
      </>
  );
}

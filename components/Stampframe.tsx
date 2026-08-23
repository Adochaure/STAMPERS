"use client";

import React, { useId } from "react";

interface PostageStampProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export default function Stampframe({
  children,
  width = "400px",
  height = "400px",
  className = "",
}: PostageStampProps) {
  const id = useId().replace(/:/g, "");

  const maskId = `stamp-mask-${id}`;

  const numericWidth = 400;
  const numericHeight = 400;

  const spacing = 24;
  const holeRadius = 7;

  const holes: { cx: number; cy: number }[] = [];

  // Top + bottom
  for (let x = 12; x <= numericWidth - 12; x += spacing) {
    holes.push({ cx: x, cy: 0 });
    holes.push({ cx: x, cy: numericHeight });
  }

  // Left + right
  for (let y = 12; y <= numericHeight - 12; y += spacing) {
    holes.push({ cx: 0, cy: y });
    holes.push({ cx: numericWidth, cy: y });
  }

  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height,
      }}
    >
      {/* STAMP FRAME */}
      <svg
        viewBox={`0 0 ${numericWidth} ${numericHeight}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <mask id={maskId}>
            {/* White = visible */}
            <rect
              width={numericWidth}
              height={numericHeight}
              fill="white"
            />

            {/* Black = holes */}
            {holes.map((hole, index) => (
              <circle
                key={index}
                cx={hole.cx}
                cy={hole.cy}
                r={holeRadius}
                fill="black"
              />
            ))}
          </mask>
        </defs>

        {/* Frame background */}
        <rect
          width={numericWidth}
          height={numericHeight}
          fill="rgba(222, 205, 162)"
          mask={`url(#${maskId})`}
        />

        {/* Optional border */}
        <rect
          x="8"
          y="8"
          width={numericWidth - 16}
          height={numericHeight - 16}
          fill="none"
          stroke="black"
          strokeWidth="0"
          mask={`url(#${maskId})`}
        />
      </svg>

      {/* YOUR CONTENT */}
      <div className="absolute inset-0 z-10 overflow-hidden p-8">
        {children}
      </div>
    </div>
  );
}
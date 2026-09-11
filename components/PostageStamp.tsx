"use client";

import React, { useEffect, useId, useRef, useState } from "react";

interface PostageStampProps {
  image: string;
  title?: string;
  value?: string;
  width?: number | string;
  height?: number | string;
  imageFit?: "cover" | "contain" | "center";
  imagePosition?: string;
  titleAlign?: "left" | "center" | "right";
  alt?: string;
  className?: string;
  stroke1?: string;
  stroke2?: string;
  parallax?: boolean;
}

export default function PostageStamp({
  image,
  title = "Éire",
  value = "75",
  width = 400,
  height = 400,
  imageFit = "cover",
  imagePosition = "center",
  titleAlign = "left",
  stroke1 = "rgba(0,0,0,0.3)",
  stroke2 = "rgba(0,0,0,0.3)",
  alt = "Postage stamp",
  className = "",
  parallax = false,
}: PostageStampProps) {
  const stampRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const numericWidth = typeof width === "number" ? width : 400;
  const numericHeight = typeof height === "number" ? height : 400;

  useEffect(() => {
    if (!parallax) return;

    const update = () => {
      if (!stampRef.current) return;

      const rect = stampRef.current.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const stampCenter = rect.top + rect.height / 2;

      setOffset((stampCenter - center) * -0.25);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, [parallax]);

  const spacing = 24;
  const holeRadius = 7;
  const holes: { cx: number; cy: number }[] = [];

  for (let x = 12; x <= numericWidth - 12; x += spacing) {
    holes.push({ cx: x, cy: 0 });
    holes.push({ cx: x, cy: numericHeight });
  }

  for (let y = 12; y <= numericHeight - 12; y += spacing) {
    holes.push({ cx: 0, cy: y });
    holes.push({ cx: numericWidth, cy: y });
  }

  const id = useId().replace(/:/g, "");
  const maskId = `stamp-mask-${id}`;
  const gradientId = `stamp-gradient-${id}`;

  const preserveAspectRatio =
    imageFit === "cover" ? "xMidYMid slice" : "xMidYMid meet";

  const responsiveStyle: React.CSSProperties = {
    width,
    position: "relative",
    aspectRatio: `${numericWidth / numericHeight}`,
  };

  if (height !== "auto") responsiveStyle.height = height;

  const titleX =
    titleAlign === "left"
      ? numericWidth * 0.07
      : titleAlign === "center"
        ? numericWidth * 0.5
        : numericWidth * 0.93;

  const titleAnchor =
    titleAlign === "left"
      ? "start"
      : titleAlign === "center"
        ? "middle"
        : "end";

  return (
    <div
      ref={stampRef}
      className={`postage-stamp ${className} doto-variable`}
      style={responsiveStyle}
    >
      <svg
        viewBox={`0 0 ${numericWidth} ${numericHeight}`}
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        role="img"
        aria-label={alt}
        style={{ display: "block", overflow: "visible" }}
      >
        <defs>
          <mask id={maskId}>
            <rect
              width={numericWidth}
              height={numericHeight}
              fill="white"
            />

            {holes.map((hole, i) => (
              <circle
                key={i}
                cx={hole.cx}
                cy={hole.cy}
                r={holeRadius}
                fill="black"
              />
            ))}
          </mask>

          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="rgba(0,0,0,0.03)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
          </linearGradient>
        </defs>

        {/* IMAGE */}
        <image
          href={image}
          x={parallax ? -numericWidth * 0.05 : 0}
          y={
            parallax
              ? -numericHeight * 0.15 + offset
              : 0
          }
          width={parallax ? numericWidth * 1.1 : numericWidth}
          height={parallax ? numericHeight * 1.3 : numericHeight}
          preserveAspectRatio={preserveAspectRatio}
          mask={`url(#${maskId})`}
        />

        {/* OVERLAY */}
        <rect
          width={numericWidth}
          height={numericHeight}
          fill={`url(#${gradientId})`}
          mask={`url(#${maskId})`}
          pointerEvents="none"
        />

        {/* TITLE */}
        <text
          x={titleX}
          y={numericHeight * 0.12}
          textAnchor={titleAnchor}
          fill={stroke1}
          fontSize={numericWidth * 0.085}
          fontWeight="600"
          style={{
            paintOrder: "stroke",
            stroke: stroke1,
            strokeWidth: 1,
          }}
        >
          {title}
        </text>

        {/* VALUE */}
        <text
          x={numericWidth * 0.93}
          y={numericHeight * 0.93}
          textAnchor="end"
          fill={stroke2}
          fontSize={numericWidth * 0.075}
          fontWeight="900"
          style={{
            paintOrder: "stroke",
            stroke: stroke2,
            strokeWidth: 1,
          }}
        >
          {value}
        </text>
      </svg>
    </div>
  );
}
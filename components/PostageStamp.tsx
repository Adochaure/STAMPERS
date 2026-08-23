"use client";

import React, { useId } from "react";

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
}: PostageStampProps) {
  const numericWidth =
    typeof width === "number" ? width : 400;

  const numericHeight =
    typeof height === "number" ? height : 400;

  const spacing = 24;
  const holeRadius = 7;

  const holes: { cx: number; cy: number }[] = [];

  // Top + bottom perforations
  for (let x = 12; x <= numericWidth - 12; x += spacing) {
    holes.push({
      cx: x,
      cy: 0,
    });

    holes.push({
      cx: x,
      cy: numericHeight,
    });
  }

  // Left + right perforations
  for (let y = 12; y <= numericHeight - 12; y += spacing) {
    holes.push({
      cx: 0,
      cy: y,
    });

    holes.push({
      cx: numericWidth,
      cy: y,
    });
  }

  const id = useId();

  const cleanId = id.replace(/:/g, "");

  const maskId = `stamp-mask-${cleanId}`;
  const gradientId = `stamp-gradient-${cleanId}`;

  const preserveAspectRatio =
    imageFit === "cover"
      ? "xMidYMid slice"
      : "xMidYMid meet";

  const aspectRatio = numericWidth / numericHeight;

  const responsiveStyle: React.CSSProperties = {
    width,
    position: "relative",
    aspectRatio: `${aspectRatio}`,
  };

  if (height !== "auto") {
    responsiveStyle.height = height;
  }

  // =========================
  // TITLE ALIGNMENT
  // =========================

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
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        <defs>
          {/* =========================
              STAMP MASK
          ========================== */}

          <mask id={maskId}>
            <rect
              x="0"
              y="0"
              width={numericWidth}
              height={numericHeight}
              fill="white"
            />

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

          {/* =========================
              GRADIENT
          ========================== */}

          <linearGradient
            id={gradientId}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="rgba(0,0,0,0.03)"
            />

            <stop
              offset="100%"
              stopColor="rgba(0,0,0,0.15)"
            />
          </linearGradient>
        </defs>

        {/* =========================
            IMAGE
        ========================== */}

        {imageFit === "center" ? (
          <>
            <rect
              x="0"
              y="0"
              width={numericWidth}
              height={numericHeight}
              fill="white"
              mask={`url(#${maskId})`}
            />

            <image
              href={image}
              x={numericWidth * 0.12}
              y={numericHeight * 0.12}
              width={numericWidth * 0.76}
              height={numericHeight * 0.76}
              preserveAspectRatio="xMidYMid meet"
              mask={`url(#${maskId})`}
            />
          </>
        ) : (
          <image
            href={image}
            x="0"
            y="0"
            width={numericWidth}
            height={numericHeight}
            preserveAspectRatio={preserveAspectRatio}
            mask={`url(#${maskId})`}
          />
        )}

        {/* =========================
            DARK OVERLAY
        ========================== */}

        <rect
          x="0"
          y="0"
          width={numericWidth}
          height={numericHeight}
          fill={`url(#${gradientId})`}
          mask={`url(#${maskId})`}
          pointerEvents="none"
        />

        {/* =========================
            TITLE
        ========================== */}

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

        {/* =========================
            VALUE
        ========================== */}

        <text
          x={numericWidth * 0.93}
          y={numericHeight * 0.93}
          textAnchor="end"
          fill= {stroke2}
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
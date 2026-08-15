"use client";

import React, { useId } from "react";

interface PostageStampProps {
  image: string;
  title?: string;
  value?: string;

  // Responsive size
  width?: number | string;
  height?: number | string;

  // Image controls
  imageFit?: "cover" | "contain" | "center";
  imagePosition?: string;

  alt?: string;
  className?: string;
}

export default function PostageStamp({
  image,
  title = "Éire",
  value = "75",

  width = 400,
  height = 400,

  imageFit = "cover",
  imagePosition = "center",

  alt = "Postage stamp",
  className = "",
}: PostageStampProps) {
  /*
   * These are used only as the SVG's internal coordinate system.
   * The actual component can scale responsively with CSS.
   */
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

  /*
   * Generate unique IDs.
   * This prevents multiple stamps on the same page
   * from sharing the same SVG mask/gradient.
   */
  const id = useId();

  const maskId = `stamp-mask-${id.replace(/:/g, "")}`;
  const gradientId = `stamp-gradient-${id.replace(/:/g, "")}`;

  /*
   * SVG image behavior
   */
  const preserveAspectRatio =
    imageFit === "cover"
      ? "xMidYMid slice"
      : "xMidYMid meet";

  /*
   * If width is responsive, the height automatically
   * follows the original aspect ratio.
   *
   * If height is explicitly supplied, we use it.
   */
  const aspectRatio = numericWidth / numericHeight;

  const responsiveStyle: React.CSSProperties = {
    width,
    position: "relative",
    aspectRatio: `${aspectRatio}`,
  };

  /*
   * Only apply explicit height when the user gives a
   * non-auto height.
   */
  if (height !== "auto") {
    responsiveStyle.height = height;
  }

  return (
    <div
      className={`postage-stamp ${className}`}
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
            {/* Stamp body */}
            <rect
              x="0"
              y="0"
              width={numericWidth}
              height={numericHeight}
              fill="white"
            />

            {/* Perforation holes */}
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
              GRADIENT OVERLAY
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
            {/* White stamp background */}
            <rect
              x="0"
              y="0"
              width={numericWidth}
              height={numericHeight}
              fill="white"
              mask={`url(#${maskId})`}
            />

            {/* Centered image */}
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
          x={numericWidth * 0.07}
          y={numericHeight * 0.12}
          fill="white"
          fontSize={numericWidth * 0.085}
          fontWeight="600"
          style={{
            fontFamily: "Georgia, serif",
            paintOrder: "stroke",
            stroke: "rgba(0,0,0,0.3)",
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
          fill="white"
          fontSize={numericWidth * 0.075}
          fontWeight="600"
          style={{
            fontFamily: "Georgia, serif",
            paintOrder: "stroke",
            stroke: "rgba(0,0,0,0.3)",
            strokeWidth: 1,
          }}
        >
          {value}
        </text>
      </svg>
    </div>
  );
}
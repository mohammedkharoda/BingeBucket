"use client";
import { motion, animate } from "framer-motion";
import { useEffect, useState, useId } from "react";

interface CircularProgressProps {
  value: number; // 0–100
  size?: number;
  strokeWidth?: number;
  showValueLabel?: boolean;
  classNames?: {
    svg?: string;
    indicator?: string;
    value?: string;
  };
}

const CircularProgress = ({
  value,
  size = 52,
  strokeWidth = 4,
  showValueLabel = false,
  classNames = {},
}: CircularProgressProps) => {
  const uid = useId().replace(/:/g, "");
  const progress = Math.min(Math.max(value, 0), 100);

  // Count-up
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const ctrl = animate(0, progress, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });

    return ctrl.stop;
  }, [progress]);

  const scoreColor =
    progress > 70 ? "#6EE7B7" : progress >= 40 ? "#FBBF24" : "#FDA4AF";

  // Full-circle geometry — starts at the top (rotated -90°)
  const pad = strokeWidth * 2;           // padding so glow never clips
  const vbSize = size + pad * 2;         // expanded viewBox
  const cx = vbSize / 2;
  const cy = vbSize / 2;
  const r  = size / 2 - strokeWidth / 2; // radius inside padding
  const circumference = 2 * Math.PI * r;

  // Tip dot: at `progress`% around the circle (angle from top, clockwise)
  const tipAngle = (progress / 100) * 2 * Math.PI - Math.PI / 2;
  const tipX = cx + r * Math.cos(tipAngle);
  const tipY = cy + r * Math.sin(tipAngle);

  const fontSize = Math.max(size * 0.24, 9);

  return (
    <div
      className={classNames.svg ?? ""}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
      }}
    >
      <svg
        height={size}
        viewBox={`0 0 ${vbSize} ${vbSize}`}
        width={size}
        style={{ display: "block" }}   /* no overflow: visible */
      >
        <defs>
          <filter height="180%" id={`glow-${uid}`} width="180%" x="-40%" y="-40%">
            <feGaussianBlur result="blur" stdDeviation="2" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter height="260%" id={`dot-glow-${uid}`} width="260%" x="-80%" y="-80%">
            <feGaussianBlur result="blur" stdDeviation="2.5" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dashed track ring */}
        <circle
          cx={cx}
          cy={cy}
          fill="none"
          r={r}
          stroke="rgba(255,255,255,0.10)"
          strokeDasharray={`${circumference / 24} ${circumference / 24}`}
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${cx} ${cy})`}
        />

        {/* Animated progress arc */}
        <motion.circle
          animate={{ strokeDashoffset: circumference * (1 - progress / 100) }}
          cx={cx}
          cy={cy}
          fill="none"
          filter={`url(#glow-${uid})`}
          initial={{ strokeDashoffset: circumference }}
          r={r}
          stroke={scoreColor}
          strokeDasharray={circumference}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          transform={`rotate(-90 ${cx} ${cy})`}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />

        {/* Tip dot */}
        {progress > 1 && (
          <motion.circle
            animate={{ opacity: 1, scale: 1 }}
            cx={tipX}
            cy={tipY}
            fill={scoreColor}
            filter={`url(#dot-glow-${uid})`}
            initial={{ opacity: 0, scale: 0 }}
            r={strokeWidth * 0.9}
            transition={{ delay: 1.2, duration: 0.35, ease: "backOut" }}
          />
        )}

        {/* Centre label */}
        {showValueLabel && (
          <text
            className={classNames.value ?? "text-off-white"}
            dominantBaseline="middle"
            fill="currentColor"
            fontFamily="inherit"
            fontSize={fontSize}
            fontWeight="800"
            textAnchor="middle"
            x={cx}
            y={cy + fontSize * 0.38}
          >
            {display}
          </text>
        )}
      </svg>
    </div>
  );
};

export default CircularProgress;

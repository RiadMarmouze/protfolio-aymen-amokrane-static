import React from "react";

/**
 * StatusIndicator
 * - A tiny, configurable availability dot with an optional pulsing ring.
 * - Uses Tailwind's `animate-pulse-ring` (ensure keyframes defined in tailwind.config).
 */
export interface StatusIndicatorProps {
  /** If true, show the pulsing ring (i.e., user is available) */
  available?: boolean;
  /** Solid inner dot color (any valid CSS color) */
  dotColor?: string;
  /** Pulse ring color (any valid CSS color) */
  ringColor?: string;
  /** Pulse ring opacity (0..1) */
  ringOpacity?: number;
  /** Inner dot diameter in px */
  dotSize?: number;
  /** Overall indicator (ring) diameter in px */
  ringSize?: number;
  /** Extra classes for the outer wrapper */
  className?: string;
  /** Accessible label override */
  ariaLabel?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  available = true,
  dotColor = "#000000", // black by default
  ringColor = "#000000", // black by default
  ringOpacity = 0.25,
  dotSize = 10, // px
  ringSize = 20, // px
  className = "",
  ariaLabel,
}) => {
  const containerStyle: React.CSSProperties = {
    width: ringSize,
    height: ringSize,
  };

  const dotStyle: React.CSSProperties = {
    width: dotSize,
    height: dotSize,
    backgroundColor: dotColor,
  };

  const ringStyle: React.CSSProperties = {
    // Use radial-gradient with a color stop to keep the halo crisp.
    // Opacity applied on the element so any color works (hex, rgb, hsl, currentColor, etc.).
    background: `radial-gradient(circle, ${ringColor} 28%, transparent 65%)`,
    opacity: available ? ringOpacity : 0,
  };

  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={containerStyle}
      role="img"
      aria-label={ariaLabel ?? (available ? "Available" : "Unavailable")}
    >
      {/* Pulse ring (shown only when available) */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 rounded-full ${
          available ? "animate-pulse-ring" : ""
        }`}
        style={ringStyle}
      />
      {/* Solid dot */}
      <span
        aria-hidden="true"
        className="relative rounded-full"
        style={dotStyle}
      />
    </span>
  );
};

export default StatusIndicator;

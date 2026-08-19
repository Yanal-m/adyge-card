import React from 'react';

interface CircassianEmblemProps {
  className?: string;
  size?: number;
  color?: 'gold' | 'green' | 'dark-green' | 'white' | string;
  showStars?: boolean;
}

export const CircassianEmblem: React.FC<CircassianEmblemProps> = ({
  className = '',
  size = 64,
  color = 'gold',
  showStars = true,
}) => {
  const fillColor = color === 'gold' 
    ? '#B99A52' 
    : color === 'green' 
      ? '#174A3A'
      : color === 'dark-green'
        ? '#0D3026'
        : color === 'white' 
          ? '#FFFFFF' 
          : color;

  return (
    <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-label="Circassian Emblem"
      >
        {/* 12 Stars in an elegant arc representing the 12 Circassian tribes */}
        {showStars && (
          <g fill={fillColor}>
            {/* Top row / Arc of 12 stars */}
            {/* Top 3 center horizontal */}
            <path d="M50 8 L51.5 12.5 L56 12.5 L52.5 15 L54 19.5 L50 17 L46 19.5 L47.5 15 L44 12.5 L48.5 12.5 Z" transform="scale(0.85) translate(8.8, 0)" />
            <path d="M50 8 L51.5 12.5 L56 12.5 L52.5 15 L54 19.5 L50 17 L46 19.5 L47.5 15 L44 12.5 L48.5 12.5 Z" transform="scale(0.8) translate(-9, 4)" />
            <path d="M50 8 L51.5 12.5 L56 12.5 L52.5 15 L54 19.5 L50 17 L46 19.5 L47.5 15 L44 12.5 L48.5 12.5 Z" transform="scale(0.8) translate(28, 4)" />

            {/* Arc sides (3 left, 3 right, and lower pair) */}
            <path d="M50 8 L51.5 12.5 L56 12.5 L52.5 15 L54 19.5 L50 17 L46 19.5 L47.5 15 L44 12.5 L48.5 12.5 Z" transform="scale(0.75) translate(-26, 12)" />
            <path d="M50 8 L51.5 12.5 L56 12.5 L52.5 15 L54 19.5 L50 17 L46 19.5 L47.5 15 L44 12.5 L48.5 12.5 Z" transform="scale(0.75) translate(47, 12)" />

            <path d="M50 8 L51.5 12.5 L56 12.5 L52.5 15 L54 19.5 L50 17 L46 19.5 L47.5 15 L44 12.5 L48.5 12.5 Z" transform="scale(0.7) translate(-42, 24)" />
            <path d="M50 8 L51.5 12.5 L56 12.5 L52.5 15 L54 19.5 L50 17 L46 19.5 L47.5 15 L44 12.5 L48.5 12.5 Z" transform="scale(0.7) translate(66, 24)" />

            <path d="M50 8 L51.5 12.5 L56 12.5 L52.5 15 L54 19.5 L50 17 L46 19.5 L47.5 15 L44 12.5 L48.5 12.5 Z" transform="scale(0.65) translate(-56, 38)" />
            <path d="M50 8 L51.5 12.5 L56 12.5 L52.5 15 L54 19.5 L50 17 L46 19.5 L47.5 15 L44 12.5 L48.5 12.5 Z" transform="scale(0.65) translate(84, 38)" />

            <path d="M50 8 L51.5 12.5 L56 12.5 L52.5 15 L54 19.5 L50 17 L46 19.5 L47.5 15 L44 12.5 L48.5 12.5 Z" transform="scale(0.6) translate(-68, 56)" />
            <path d="M50 8 L51.5 12.5 L56 12.5 L52.5 15 L54 19.5 L50 17 L46 19.5 L47.5 15 L44 12.5 L48.5 12.5 Z" transform="scale(0.6) translate(101, 56)" />
            
            {/* Center inner star */}
            <path d="M50 8 L51.5 12.5 L56 12.5 L52.5 15 L54 19.5 L50 17 L46 19.5 L47.5 15 L44 12.5 L48.5 12.5 Z" transform="scale(0.65) translate(14, 25)" />
          </g>
        )}

        {/* 3 Crossed Arrows pointing upwards (Traditional Circassian symbol of defense, peace, and brotherhood) */}
        <g stroke={fillColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Center vertical arrow */}
          <line x1="50" y1="30" x2="50" y2="86" />
          {/* Arrowhead center */}
          <path d="M43 38 L50 28 L57 38" fill="none" strokeWidth="2.8" />
          {/* Center fletching */}
          <path d="M44 82 L50 86 L56 82" fill="none" strokeWidth="2.2" />

          {/* Left diagonal arrow */}
          <line x1="28" y1="34" x2="72" y2="82" />
          {/* Arrowhead left */}
          <path d="M23 41 L27 33 L36 38" fill="none" strokeWidth="2.8" />
          {/* Left fletching */}
          <path d="M66 84 L72 82 L70 76" fill="none" strokeWidth="2.2" />

          {/* Right diagonal arrow */}
          <line x1="72" y1="34" x2="28" y2="82" />
          {/* Arrowhead right */}
          <path d="M64 38 L73 33 L77 41" fill="none" strokeWidth="2.8" />
          {/* Right fletching */}
          <path d="M30 76 L28 82 L34 84" fill="none" strokeWidth="2.2" />
        </g>

        {/* Center tying ring / bind motif */}
        <ellipse cx="50" cy="58" rx="4" ry="4" fill={fillColor} />
      </svg>
    </div>
  );
};

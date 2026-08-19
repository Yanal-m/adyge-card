import React from 'react';

interface CulturalDividerProps {
  className?: string;
  variant?: 'gold' | 'green' | 'subtle';
  children?: React.ReactNode;
}

export const CulturalDivider: React.FC<CulturalDividerProps> = ({
  className = '',
  variant = 'gold',
  children,
}) => {
  const strokeColor = variant === 'gold' ? '#B99A52' : variant === 'green' ? '#174A3A' : '#D9DED8';

  return (
    <div className={`flex items-center justify-center gap-4 my-2 ${className}`}>
      {/* Left ornament wing */}
      <div className="flex items-center gap-1.5 opacity-80">
        <div className="h-[1px] w-8 sm:w-16" style={{ backgroundColor: strokeColor }} />
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 1 L16 9 L9 17 L2 9 Z" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <circle cx="9" cy="9" r="2" fill={strokeColor} />
        </svg>
      </div>

      {children && (
        <div className="text-center font-serif-heading font-semibold text-lg sm:text-xl tracking-tight text-[#17211D]">
          {children}
        </div>
      )}

      {/* Right ornament wing */}
      <div className="flex items-center gap-1.5 opacity-80">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 1 L16 9 L9 17 L2 9 Z" stroke={strokeColor} strokeWidth="1.2" fill="none" />
          <circle cx="9" cy="9" r="2" fill={strokeColor} />
        </svg>
        <div className="h-[1px] w-8 sm:w-16" style={{ backgroundColor: strokeColor }} />
      </div>
    </div>
  );
};

export const CulturalBorderRibbon: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#B99A52',
}) => {
  return (
    <div className={`w-full overflow-hidden h-3 opacity-50 ${className}`} aria-hidden="true">
      <svg width="100%" height="12" viewBox="0 0 1200 12" preserveAspectRatio="repeat-x" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="circassian-ribbon" width="40" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 6 L10 0 L20 6 L10 12 Z" stroke={color} strokeWidth="0.8" fill="none" />
          <circle cx="10" cy="6" r="1" fill={color} />
          <path d="M20 6 L30 0 L40 6 L30 12 Z" stroke={color} strokeWidth="0.8" fill="none" />
          <circle cx="30" cy="6" r="1" fill={color} />
        </pattern>
        <rect width="100%" height="12" fill="url(#circassian-ribbon)" />
      </svg>
    </div>
  );
};

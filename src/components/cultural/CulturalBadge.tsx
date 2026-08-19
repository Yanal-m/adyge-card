import React from 'react';
import { CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { CircassianEmblem } from './CircassianEmblem';

interface CulturalBadgeProps {
  type: 'circassian-owned' | 'verified' | 'featured';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CulturalBadge: React.FC<CulturalBadgeProps> = ({
  type,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs sm:text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-sm sm:text-base px-3.5 py-1.5 gap-2',
  }[size];

  if (type === 'circassian-owned') {
    return (
      <span
        className={`inline-flex items-center font-medium bg-[#F6F2E9] border border-[#B99A52]/70 text-[#174A3A] rounded-md shadow-xs ${sizeClasses} ${className}`}
      >
        <CircassianEmblem size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} showStars={false} color="green" />
        <span>Circassian Owned</span>
      </span>
    );
  }

  if (type === 'verified') {
    return (
      <span
        className={`inline-flex items-center font-medium bg-[#FFFDF9] border border-[#D9DED8] text-[#17211D] rounded-md shadow-xs ${sizeClasses} ${className}`}
      >
        <CheckCircle2 className="text-[#B99A52] shrink-0" size={size === 'sm' ? 13 : size === 'md' ? 15 : 17} />
        <span>Verified Business</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-medium bg-[#174A3A] text-[#FFFDF9] rounded-md shadow-xs ${sizeClasses} ${className}`}
    >
      <Star className="text-[#B99A52] fill-[#B99A52] shrink-0" size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} />
      <span>Featured</span>
    </span>
  );
};

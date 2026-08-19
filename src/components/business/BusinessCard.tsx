import React from 'react';
import { Business } from '../../types';
import { useApp } from '../../context/AppContext';
import { MapPin, ArrowRight, Bookmark, Star, CheckCircle2, Shield } from 'lucide-react';
import { CircassianEmblem } from '../cultural/CircassianEmblem';

interface BusinessCardProps {
  business: Business;
  compact?: boolean;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, compact = false }) => {
  const { openBusinessDetail, toggleSaveBusiness, isBusinessSaved } = useApp();
  const saved = isBusinessSaved(business.id);

  return (
    <article
      id={`business-card-${business.id}`}
      className="group bg-[#FFFDF9] rounded-2xl border border-[#D9DED8] overflow-hidden hover:border-[#B99A52] transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
    >
      {/* Cover Image & Category Badge */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#E8EDE7]">
        <img
          src={business.coverUrl}
          alt={business.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Category Label Chip */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#0D3026]/90 backdrop-blur-xs text-[#FFFDF9] border border-[#B99A52]/40 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider">
            {business.categoryName}
          </span>
        </div>

        {/* Save Bookmark Button */}
        <button
          id={`save-btn-${business.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveBusiness(business.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            saved 
              ? 'bg-[#174A3A] text-[#B99A52] shadow-md scale-105' 
              : 'bg-[#0D3026]/60 text-white/80 hover:text-white hover:bg-[#0D3026]/90'
          }`}
          title={saved ? 'Remove from saved' : 'Save business card'}
          aria-label={saved ? 'Remove from saved' : 'Save business card'}
        >
          <Bookmark size={16} className={saved ? 'fill-current' : ''} />
        </button>

        {/* Overlapping Round Logo */}
        <div className="absolute -bottom-4 left-4 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#0D3026] border-2 border-[#B99A52] p-1 shadow-md flex items-center justify-center overflow-hidden">
          {business.logoUrl ? (
            <img 
              src={business.logoUrl} 
              alt={`${business.name} logo`} 
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <CircassianEmblem size={24} color="gold" showStars={false} />
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="pt-6 p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => openBusinessDetail(business.slug)}
              className="font-serif-heading font-bold text-lg sm:text-xl text-[#17211D] group-hover:text-[#174A3A] transition-colors cursor-pointer line-clamp-1"
            >
              {business.name}
            </h3>

            {business.isVerified && (
              <span title="Verified Circassian Business">
                <CheckCircle2 size={16} className="text-[#B99A52] shrink-0 mt-1" />
              </span>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#68736D] mt-1 mb-2.5">
            <MapPin size={13} className="text-[#174A3A] shrink-0" />
            <span className="truncate">{business.city}, {business.country}</span>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#68736D] line-clamp-2 leading-relaxed mb-4">
            {business.description}
          </p>
        </div>

        {/* Footer Row & CTA */}
        <div className="pt-3 border-t border-[#D9DED8]/60 flex items-center justify-end">
          <button
            id={`view-biz-btn-${business.id}`}
            onClick={() => openBusinessDetail(business.slug)}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#174A3A] hover:text-[#286B52] group/cta cursor-pointer"
          >
            <span>View Business</span>
            <ArrowRight size={14} className="group-hover/cta:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </article>
  );
};

import React from 'react';
import { useApp } from '../../context/AppContext';
import { BusinessCard } from '../business/BusinessCard';
import { CulturalDivider } from '../cultural/CulturalDivider';
import { Bookmark, ArrowRight, Store } from 'lucide-react';

export const SavedBusinessesView: React.FC = () => {
  const { businesses, currentUser, setViewMode } = useApp();

  const savedBusinesses = businesses.filter(b => currentUser.savedBusinessIds.includes(b.id));

  return (
    <div className="bg-[#F6F2E9] min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-3xl mx-auto">
          <CulturalDivider variant="gold">
            <h1 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[#17211D] px-4">
              Saved Digital Business Cards
            </h1>
          </CulturalDivider>
          <p className="text-sm sm:text-base text-[#68736D] mt-2">
            Your personal digital collection of Circassian-owned businesses and preferred service providers.
          </p>
        </div>

        {savedBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedBusinesses.map(business => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#D9DED8] p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#F6F2E9] border border-[#D9DED8] flex items-center justify-center mx-auto text-[#174A3A]">
              <Bookmark size={32} />
            </div>
            <h3 className="font-serif-heading font-bold text-xl text-[#17211D]">
              No saved business cards yet
            </h3>
            <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed">
              Explore the Circassian Business Directory and click the bookmark icon on any business card to save it here for quick offline reference.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setViewMode('businesses')}
                className="bg-[#174A3A] hover:bg-[#286B52] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>Browse Directory</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

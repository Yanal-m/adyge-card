import React from 'react';
import { useApp } from '../../context/AppContext';
import { CulturalDivider } from '../cultural/CulturalDivider';
import { BusinessCard } from '../business/BusinessCard';
import { ArrowRight } from 'lucide-react';

export const FeaturedBusinesses: React.FC = () => {
  const { businesses, setViewMode, setSelectedCategorySlug } = useApp();

  const featured = businesses.filter(b => b.isFeatured || b.status === 'published').slice(0, 4);

  const handleViewAll = () => {
    setSelectedCategorySlug(null);
    setViewMode('businesses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="featured-businesses-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="w-full sm:w-auto text-center sm:text-left">
          <CulturalDivider variant="gold">
            <span className="font-serif-heading text-2xl sm:text-3xl text-[#17211D] px-4 font-bold">
              Featured Businesses
            </span>
          </CulturalDivider>
        </div>

        <button
          onClick={handleViewAll}
          className="text-sm font-semibold text-[#174A3A] hover:text-[#286B52] flex items-center gap-1.5 hover:underline cursor-pointer"
        >
          <span>View All</span>
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Grid of 4 Signature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>

    </section>
  );
};

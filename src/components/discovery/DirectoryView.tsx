import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { BusinessCard } from '../business/BusinessCard';
import { CulturalDivider } from '../cultural/CulturalDivider';
import { CircassianEmblem } from '../cultural/CircassianEmblem';
import { 
  Search, 
  Filter, 
  MapPin, 
  CheckCircle2, 
  SlidersHorizontal, 
  X, 
  Plus,
  Store,
  Grid,
  List
} from 'lucide-react';

export const DirectoryView: React.FC = () => {
  const { 
    businesses, 
    categories, 
    searchQuery, 
    setSearchQuery, 
    selectedCategorySlug, 
    setSelectedCategorySlug,
    selectedCountry,
    setSelectedCountry,
    verifiedOnly,
    setVerifiedOnly,
    circassianOwnedOnly,
    setCircassianOwnedOnly,
    setIsAddBusinessModalOpen
  } = useApp();

  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'name' | 'newest'>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Extract unique countries from data
  const availableCountries = useMemo(() => {
    const set = new Set<string>();
    businesses.forEach(b => {
      if (b.country) set.add(b.country);
    });
    return Array.from(set).sort();
  }, [businesses]);

  // Filtered and sorted business list
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      // Status check
      if (b.status === 'rejected' || b.status === 'draft') return false;

      // Category filter
      if (selectedCategorySlug && selectedCategorySlug !== 'businesses' && selectedCategorySlug !== 'cat-all') {
        const cat = categories.find(c => c.slug === selectedCategorySlug || c.id === selectedCategorySlug);
        if (cat) {
          const matchCat = b.categoryId === cat.id || 
            b.categoryName.toLowerCase().includes(cat.name.toLowerCase()) || 
            (selectedCategorySlug === 'crafts' && b.categoryName.toLowerCase().includes('craft')) ||
            (selectedCategorySlug === 'services' && b.services.length > 0) ||
            (selectedCategorySlug === 'products' && b.products.length > 0) ||
            (selectedCategorySlug === 'restaurants' && (b.categoryName.toLowerCase().includes('restaurant') || b.categoryName.toLowerCase().includes('food')));
          if (!matchCat) return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = 
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.categoryName.toLowerCase().includes(q) ||
          b.city.toLowerCase().includes(q) ||
          b.country.toLowerCase().includes(q) ||
          b.services.some(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) ||
          b.products.some(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
        if (!match) return false;
      }

      // Country filter
      if (selectedCountry && b.country !== selectedCountry) {
        return false;
      }

      // Verified filter
      if (verifiedOnly && !b.isVerified) {
        return false;
      }

      // Circassian owned filter
      if (circassianOwnedOnly && !b.isCircassianOwned) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      // Default: featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.viewsCount - a.viewsCount;
    });
  }, [businesses, selectedCategorySlug, searchQuery, selectedCountry, verifiedOnly, circassianOwnedOnly, sortBy, categories]);

  const activeFiltersCount = (selectedCategorySlug ? 1 : 0) + (selectedCountry ? 1 : 0) + (verifiedOnly ? 1 : 0) + (circassianOwnedOnly ? 1 : 0) + (searchQuery ? 1 : 0);

  const handleClearAllFilters = () => {
    setSelectedCategorySlug(null);
    setSelectedCountry(null);
    setSearchQuery('');
    setVerifiedOnly(false);
    setCircassianOwnedOnly(false);
  };

  return (
    <div className="bg-[#F6F2E9] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <CulturalDivider variant="gold">
            <h1 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[#17211D] px-4">
              Circassian Business Directory
            </h1>
          </CulturalDivider>
          <p className="text-sm sm:text-base text-[#68736D] mt-2">
            Discover and support Circassian-owned companies, artisan studios, restaurants, and professionals worldwide.
          </p>
        </div>

        {/* Search & Filter Control Bar */}
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#D9DED8] p-4 sm:p-5 shadow-xs mb-8 space-y-4">
          
          {/* Main Search Input Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#174A3A]" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by business name, skill, craft, product, city..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F6F2E9] border border-[#D9DED8] rounded-xl text-sm text-[#17211D] placeholder-[#68736D] focus:outline-none focus:border-[#174A3A]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68736D] hover:text-[#17211D]"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Country Selector */}
            <div className="w-full md:w-56">
              <select
                value={selectedCountry || ''}
                onChange={(e) => setSelectedCountry(e.target.value || null)}
                className="w-full py-2.5 px-3 bg-[#F6F2E9] border border-[#D9DED8] rounded-xl text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
              >
                <option value="">All Countries / Global</option>
                {availableCountries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Sort Selector */}
            <div className="w-full md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full py-2.5 px-3 bg-[#F6F2E9] border border-[#D9DED8] rounded-xl text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name (A-Z)</option>
                <option value="newest">Recently Added</option>
              </select>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            <button
              onClick={() => setSelectedCategorySlug(null)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                !selectedCategorySlug
                  ? 'bg-[#174A3A] text-white'
                  : 'bg-[#F6F2E9] text-[#17211D] hover:bg-[#E8EDE7]'
              }`}
            >
              All Categories
            </button>

            {categories.map((cat) => {
              if (cat.slug === 'more') return null;
              const isSelected = selectedCategorySlug === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategorySlug(isSelected ? null : cat.slug)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#174A3A] text-white'
                      : 'bg-[#F6F2E9] text-[#17211D] hover:bg-[#E8EDE7]'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Filter Toggles Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#D9DED8]/60 text-xs">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-[#17211D]">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-[#174A3A] focus:ring-[#174A3A] w-4 h-4"
                />
                <span>Verified Businesses Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium text-[#17211D]">
                <input
                  type="checkbox"
                  checked={circassianOwnedOnly}
                  onChange={(e) => setCircassianOwnedOnly(e.target.checked)}
                  className="rounded text-[#174A3A] focus:ring-[#174A3A] w-4 h-4"
                />
                <span>Circassian Owned Only</span>
              </label>
            </div>

            {activeFiltersCount > 0 && (
              <button
                onClick={handleClearAllFilters}
                className="text-xs text-[#174A3A] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <X size={13} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-[#68736D]">
            Showing <span className="text-[#17211D] font-bold">{filteredBusinesses.length}</span> Circassian business{filteredBusinesses.length === 1 ? '' : 'es'}
          </p>

          <button
            onClick={() => setIsAddBusinessModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#174A3A] hover:bg-[#286B52] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Business</span>
          </button>
        </div>

        {/* Business Cards Grid */}
        {filteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : (
          /* Empty State matching guidelines */
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#D9DED8] p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#F6F2E9] border border-[#D9DED8] flex items-center justify-center mx-auto text-[#174A3A]">
              <Store size={32} />
            </div>
            <h3 className="font-serif-heading font-bold text-xl text-[#17211D]">
              No businesses found matching your criteria
            </h3>
            <p className="text-xs sm:text-sm text-[#68736D] leading-relaxed">
              Be the first to add a Circassian business to this category or location.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleClearAllFilters}
                className="bg-[#F6F2E9] text-[#17211D] border border-[#D9DED8] px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#E8EDE7]"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setIsAddBusinessModalOpen(true)}
                className="bg-[#174A3A] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#286B52]"
              >
                + Add a Business
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

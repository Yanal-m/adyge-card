import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Building2, Layers, Globe, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { searchQuery, setSearchQuery, setViewMode } = useApp();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setViewMode('businesses');
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  return (
    <section 
      id="hero-section"
      className="relative bg-[#0D3026] text-white pt-16 pb-24 sm:pt-20 sm:pb-32 overflow-hidden border-b border-[#174A3A]"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/hero-image.jpg" 
          alt="Circassian Heritage" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#071A14]/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071A14]/90 via-[#0D3026]/75 to-transparent max-w-5xl" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0D3026] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-6">
          
          {/* Main Display Headline */}
          <h1 className="font-serif-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
            Discover <br />
            <span className="text-[#B99A52]">Circassian</span> <br />
            Businesses
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/85 font-normal max-w-xl leading-relaxed">
            Connecting Circassian people, supporting businesses, and building a stronger community worldwide.
          </p>

          {/* Prominent Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="pt-2 max-w-2xl"
          >
            <div className="bg-[#FFFDF9] p-2 rounded-2xl shadow-2xl border border-[#D9DED8] flex items-center gap-2">
              <div className="pl-3 text-[#174A3A]">
                <Search size={20} />
              </div>
              <input
                id="search-input-field"
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search businesses, services, products, locations..."
                className="flex-1 bg-transparent px-2 py-2 text-sm sm:text-base text-[#17211D] placeholder-[#68736D] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#174A3A] hover:bg-[#286B52] text-white px-5 sm:px-7 py-3 rounded-xl text-sm sm:text-base font-semibold shadow-md transition-all shrink-0 cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          {/* Community Statistics Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-[#174A3A]/80 max-w-2xl">
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#174A3A]/60 text-[#B99A52]">
                <Building2 size={20} />
              </div>
              <div>
                <p className="font-bold text-lg sm:text-xl text-white font-serif-heading">500+</p>
                <p className="text-xs text-white/70">Businesses</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#174A3A]/60 text-[#B99A52]">
                <Layers size={20} />
              </div>
              <div>
                <p className="font-bold text-lg sm:text-xl text-white font-serif-heading">100+</p>
                <p className="text-xs text-white/70">Categories</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#174A3A]/60 text-[#B99A52]">
                <Globe size={20} />
              </div>
              <div>
                <p className="font-bold text-lg sm:text-xl text-white font-serif-heading">50+</p>
                <p className="text-xs text-white/70">Countries</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#174A3A]/60 text-[#B99A52]">
                <Users size={20} />
              </div>
              <div>
                <p className="font-bold text-lg sm:text-xl text-white font-serif-heading">10K+</p>
                <p className="text-xs text-white/70">Connections</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

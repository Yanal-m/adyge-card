import React from 'react';
import { useApp } from '../../context/AppContext';
import { CulturalDivider } from '../cultural/CulturalDivider';
import { CircassianEmblem } from '../cultural/CircassianEmblem';
import { Globe, Users, Heart, Sparkles, Plus, ArrowRight } from 'lucide-react';

export const CommunityView: React.FC = () => {
  const { setIsAddBusinessModalOpen, setViewMode } = useApp();

  const diasporaHubs = [
    { city: 'Istanbul', country: 'Türkiye', count: '140+ Businesses', desc: 'Largest urban Circassian community with active restaurants, cultural centers, and architecture studios.' },
    { city: 'Nalchik', country: 'Kabardino-Balkaria', count: '95+ Artisans', desc: 'Heart of traditional Caucasian silver filigree, national costumes, and culinary traditions.' },
    { city: 'Maykop', country: 'Republic of Adygea', count: '60+ Enterprises', desc: 'Center of Circassian cheese making, gold galloon embroidery, and academic heritage research.' },
    { city: 'Amman', country: 'Jordan', count: '45+ Ventures', desc: 'Historic diaspora community leading in travel, engineering, governance, and traditional hospitality.' },
    { city: 'Paterson / NJ', country: 'United States', count: '30+ Businesses', desc: 'Dynamic North American diaspora with bakeries, consulting firms, and cultural festivals.' },
    { city: 'Kfar Kama', country: 'Israel', count: '25+ Studios', desc: 'Renowned Circassian heritage village preserving authentic language, textiles, and museum craft.' },
  ];

  return (
    <div className="bg-[#F6F2E9] min-h-screen py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <CulturalDivider variant="gold">
            <h1 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[#17211D] px-4">
              A Stronger Community Starts with Connection
            </h1>
          </CulturalDivider>
          <p className="text-sm sm:text-base text-[#68736D] mt-3 leading-relaxed">
            Discover the people, businesses, skills, and products that connect Circassians around the world. Preserving our heritage through modern commerce and collaboration.
          </p>
        </div>

        {/* Global Diaspora Hubs Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#D9DED8] pb-3">
            <h2 className="font-serif-heading font-bold text-xl sm:text-2xl text-[#17211D]">
              Global Diaspora Hubs
            </h2>
            <span className="text-xs text-[#68736D] font-semibold">50+ Countries Represented</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {diasporaHubs.map((hub) => (
              <div
                key={hub.city}
                className="bg-[#FFFDF9] rounded-2xl border border-[#D9DED8] p-6 hover:border-[#B99A52] transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif-heading font-bold text-xl text-[#17211D]">
                      {hub.city}
                    </h3>
                    <span className="text-xs font-semibold text-[#174A3A] bg-[#F6F2E9] px-2.5 py-0.5 rounded-full border border-[#D9DED8]">
                      {hub.country}
                    </span>
                  </div>
                  <p className="text-xs text-[#68736D] leading-relaxed mb-4">
                    {hub.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D9DED8]/60 flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#B99A52]">{hub.count}</span>
                  <button
                    onClick={() => {
                      setViewMode('businesses');
                    }}
                    className="text-[#174A3A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore Hub</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Empowerment Call to Action */}
        <div className="bg-[#0D3026] text-white rounded-3xl border border-[#174A3A] p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-10 circassian-bg-pattern pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <CircassianEmblem size={64} color="gold" className="mx-auto mb-2" />
            <h2 className="font-serif-heading font-bold text-2xl sm:text-3xl text-white">
              Support Circassian Entrepreneurs & Artisans
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Whether you are an architect in Istanbul, a silversmith in Nalchik, or a tech founder in London, your craft enriches our global community.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsAddBusinessModalOpen(true)}
                className="bg-[#B99A52] hover:bg-[#B99A52]/90 text-[#0D3026] font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer hover:scale-105"
              >
                + Add Your Business
              </button>
              <button
                onClick={() => setViewMode('businesses')}
                className="bg-[#174A3A] hover:bg-[#286B52] text-white border border-[#B99A52]/40 font-semibold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer"
              >
                Explore Directory
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

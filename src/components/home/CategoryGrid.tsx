import React from 'react';
import { useApp } from '../../context/AppContext';
import { CulturalDivider } from '../cultural/CulturalDivider';
import { 
  Store, 
  Briefcase, 
  ShoppingBag, 
  GraduationCap, 
  UtensilsCrossed, 
  Palette, 
  Scissors, 
  MoreHorizontal,
  Building,
  Hammer
} from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { categories, setSelectedCategorySlug, setViewMode } = useApp();

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Store': return <Store size={22} className="text-[#174A3A]" />;
      case 'Briefcase': return <Briefcase size={22} className="text-[#174A3A]" />;
      case 'ShoppingBag': return <ShoppingBag size={22} className="text-[#174A3A]" />;
      case 'GraduationCap': return <GraduationCap size={22} className="text-[#174A3A]" />;
      case 'UtensilsCrossed': return <UtensilsCrossed size={22} className="text-[#174A3A]" />;
      case 'Palette': return <Palette size={22} className="text-[#174A3A]" />;
      case 'Scissors': return <Scissors size={22} className="text-[#174A3A]" />;
      case 'MoreHorizontal': return <MoreHorizontal size={22} className="text-[#174A3A]" />;
      default: return <Building size={22} className="text-[#174A3A]" />;
    }
  };

  const handleCategoryClick = (slug: string) => {
    setSelectedCategorySlug(slug === 'more' ? null : slug);
    setViewMode('businesses');
    window.scrollTo({ top: 450, behavior: 'smooth' });
  };

  return (
    <section id="categories-section" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header with Cultural Divider */}
      <div className="mb-10 text-center">
        <CulturalDivider variant="gold">
          <span className="font-serif-heading text-2xl sm:text-3xl text-[#17211D] px-4 font-bold">
            Browse Categories
          </span>
        </CulturalDivider>
      </div>

      {/* Categories Grid (8 cards matching screenshot) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`category-btn-${cat.slug}`}
            onClick={() => handleCategoryClick(cat.slug)}
            className="group bg-[#FFFDF9] hover:bg-[#F6F2E9] border border-[#D9DED8] hover:border-[#B99A52] rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer min-h-[140px]"
          >
            <div className="w-12 h-12 rounded-xl bg-[#F6F2E9] group-hover:bg-[#FFFDF9] border border-[#D9DED8] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              {getCategoryIcon(cat.icon)}
            </div>

            <div>
              <h3 className="font-serif-heading font-bold text-sm sm:text-base text-[#17211D] group-hover:text-[#174A3A] transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-[#68736D] mt-0.5 leading-tight">
                {cat.description}
              </p>
            </div>
          </button>
        ))}
      </div>

    </section>
  );
};

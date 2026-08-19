import React from 'react';
import { useApp } from '../../context/AppContext';
import { CulturalBorderRibbon } from '../cultural/CulturalDivider';
import { Facebook, Instagram, Twitter, Send, Globe, Heart } from 'lucide-react';
import { ViewMode } from '../../types';

export const Footer: React.FC = () => {
  const { setViewMode, setSelectedCategorySlug, setIsAddBusinessModalOpen } = useApp();

  const handleLinkClick = (mode: ViewMode, categorySlug?: string) => {
    if (categorySlug) {
      setSelectedCategorySlug(categorySlug);
    } else {
      setSelectedCategorySlug(null);
    }
    setViewMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#0D3026] text-white border-t border-[#174A3A] relative overflow-hidden">
      
      {/* Top Subtle Circassian Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none circassian-bg-pattern" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand & Culture Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div>
                <img
                  src="/logo-symbol.png"
                  alt="Adyge Card Logo"
                  className="w-[60px] h-[60px] object-contain"
                />
              </div>
              <div>
                <span className="font-serif-heading font-bold text-2xl tracking-wider text-white">
                  ADYGE CARD
                </span>
                <span className="block text-[11px] font-medium tracking-[0.2em] text-[#B99A52] uppercase">
                  Circassian Business Network
                </span>
              </div>
            </div>

            <p className="text-white/80 text-sm max-w-sm leading-relaxed">
              Connecting Circassians. Supporting businesses. Preserving our culture worldwide.
            </p>

            <p className="text-xs text-[#B99A52] font-medium">
              Discover. Connect. Support.
            </p>

            <div className="pt-2">
              <button
                id="footer-add-business-btn"
                onClick={() => setIsAddBusinessModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#174A3A] hover:bg-[#286B52] text-white border border-[#B99A52] px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
              >
                <span>+ Add Your Business to Directory</span>
              </button>
            </div>
          </div>

          {/* Explore Column */}
          <div className="space-y-3">
            <h4 className="font-serif-heading font-semibold text-base text-[#B99A52] tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <button 
                  onClick={() => handleLinkClick('businesses')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Businesses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('services', 'services')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('products', 'products')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Products
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('people', 'professionals')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  People & Experts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('businesses')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Categories
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className="font-serif-heading font-semibold text-base text-[#B99A52] tracking-wide">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-white/75">
              <li>
                <button 
                  onClick={() => handleLinkClick('about')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('about')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsAddBusinessModalOpen(true)} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  For Businesses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('community')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Community Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Community Column */}
          <div className="space-y-3">
            <h4 className="font-serif-heading font-semibold text-base text-[#B99A52] tracking-wide">
              Join Our Community
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Stay updated with the latest Circassian businesses, crafts, and global community initiatives.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#174A3A] border border-[#B99A52]/40 hover:border-[#B99A52] flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={14} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#174A3A] border border-[#B99A52]/40 hover:border-[#B99A52] flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#174A3A] border border-[#B99A52]/40 hover:border-[#B99A52] flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-110"
                aria-label="Twitter / X"
              >
                <Twitter size={14} />
              </a>
              <a 
                href="https://telegram.org" 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-[#174A3A] border border-[#B99A52]/40 hover:border-[#B99A52] flex items-center justify-center text-white/80 hover:text-white transition-all hover:scale-110"
                aria-label="Telegram"
              >
                <Send size={13} />
              </a>
            </div>

            <div className="pt-2 text-xs text-white/60 space-y-1">
              <p>Email: contact@adygecard.com</p>
              <p>Global Circassian Diaspora Network</p>
            </div>
          </div>

        </div>

        {/* Decorative Divider */}
        <div className="mt-12 mb-8 pt-6 border-t border-[#174A3A]/80">
          <CulturalBorderRibbon color="#B99A52" />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© {new Date().getFullYear()} Adyge Card. All rights reserved. Preserving our heritage through modern commerce.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleLinkClick('about')}>Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleLinkClick('about')}>Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => handleLinkClick('about')}>Community Guidelines</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

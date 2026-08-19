import React from 'react';
import { CulturalDivider } from '../cultural/CulturalDivider';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Heart, Globe, Sparkles, Plus } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { setIsAddBusinessModalOpen } = useApp();

  return (
    <div className="bg-[#F6F2E9] min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <CulturalDivider variant="gold">
            <h1 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[#17211D] px-4">
              About Adyge Card
            </h1>
          </CulturalDivider>
          <p className="text-base text-[#68736D] font-serif-heading italic">
            Discover. Connect. Support.
          </p>
        </div>

        {/* Narrative Card */}
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#D9DED8] p-8 sm:p-12 space-y-8 shadow-xs">
          
          <div className="flex items-center gap-4 border-b border-[#D9DED8] pb-6">
            <div>
              <img
                src="/logo-symbol.png"
                alt="Adyge Card Logo"
                className="w-[60px] h-[60px] object-contain"
              />
            </div>
            <div>
              <h2 className="font-serif-heading font-bold text-2xl text-[#17211D]">
                Our Purpose & Mission
              </h2>
              <p className="text-xs text-[#68736D]">
                Global Circassian Business Network
              </p>
            </div>
          </div>

          <div className="prose text-[#17211D]/90 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              <strong>Adyge Card</strong> is a global digital business network created for the Circassian (Adyghe) community worldwide. Our mission is to bridge geographical distances across the global diaspora, enabling Circassians to discover each other, support community-owned businesses, and preserve our rich cultural identity through sustainable modern commerce.
            </p>
            
            <p>
              For centuries, the Circassian people have maintained deep traditions of craftsmanship, honor (Adyghe Khabze), hospitality, and mutual assistance. Today, Circassians live across dozens of countries—from the ancestral Caucasus homeland (Adygea, Kabardino-Balkaria, Karachay-Cherkessia) to vibrant diaspora communities in Türkiye, Jordan, the United States, Germany, Israel, and across Europe and the Middle East.
            </p>

            <h3 className="font-serif-heading font-bold text-xl text-[#174A3A] pt-4">
              The 12 Stars & 3 Crossed Arrows
            </h3>
            <p>
              Our brand emblem is inspired by the historic national Circassian symbol: twelve golden stars representing the twelve historical tribes of Circassia, and three crossed arrows symbolizing defense, brotherhood, and peaceful unity.
            </p>

            <h3 className="font-serif-heading font-bold text-xl text-[#174A3A] pt-4">
              Digital Business Cards for Modern Commerce
            </h3>
            <p>
              Every business registered on Adyge Card receives a dedicated digital business card equipped with instant sharing, QR codes, vCard export, and direct inquiry capabilities. We make it effortless for customers to find authentic services, traditional foods, silver jewelry, architecture, and professional expertise.
            </p>
          </div>

          <div className="pt-6 border-t border-[#D9DED8] flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-serif-heading font-bold text-base text-[#17211D]">Are you a Circassian entrepreneur?</p>
              <p className="text-xs text-[#68736D]">List your business for free and connect with our global network.</p>
            </div>
            <button
              onClick={() => setIsAddBusinessModalOpen(true)}
              className="bg-[#174A3A] hover:bg-[#286B52] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-sm cursor-pointer transition-colors"
            >
              + Register Your Business
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};


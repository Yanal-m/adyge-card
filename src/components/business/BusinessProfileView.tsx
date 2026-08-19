import React, { useState } from 'react';
import { Business } from '../../types';
import { useApp } from '../../context/AppContext';
import { CircassianEmblem } from '../cultural/CircassianEmblem';
import { CulturalBadge } from '../cultural/CulturalBadge';
import { GalleryLightbox } from './GalleryLightbox';
import { 
  ArrowLeft, 
  MapPin, 
  Share2, 
  Bookmark, 
  Phone, 
  Mail, 
  Globe, 
  Clock, 
  CheckCircle2, 
  Star, 
  Building2, 
  Home, 
  Box, 
  Workflow, 
  Sparkles, 
  ExternalLink,
  Instagram,
  Facebook,
  Linkedin,
  MessageSquare,
  Plus,
  Send,
  Calendar,
  UtensilsCrossed,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface BusinessProfileViewProps {
  business: Business;
  onBack: () => void;
}

export const BusinessProfileView: React.FC<BusinessProfileViewProps> = ({ business, onBack }) => {
  const { 
    toggleSaveBusiness, 
    isBusinessSaved, 
    setActiveShareBusiness, 
    setIsAddBusinessModalOpen,
    addReview,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'products' | 'gallery' | 'reviews' | 'contact'>('about');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [isContactFormSubmitted, setIsContactFormSubmitted] = useState(false);

  // Review state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewLocation, setReviewLocation] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  // Inquiry message state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const saved = isBusinessSaved(business.id);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) {
      showToast('Please fill in your name and review');
      return;
    }
    addReview(business.id, {
      authorName: reviewAuthor,
      authorLocation: reviewLocation || 'Circassian Community',
      rating: reviewRating,
      comment: reviewComment,
    });
    setIsReviewFormOpen(false);
    setReviewAuthor('');
    setReviewComment('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      showToast('Please fill in all contact fields');
      return;
    }
    setIsContactFormSubmitted(true);
    showToast('Your message has been sent to the business owner!');
    setTimeout(() => {
      setIsContactFormSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 4000);
  };

  const getServiceIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 size={24} className="text-[#174A3A]" />;
      case 'Home': return <Home size={24} className="text-[#174A3A]" />;
      case 'Box': return <Box size={24} className="text-[#174A3A]" />;
      case 'Workflow': return <Workflow size={24} className="text-[#174A3A]" />;
      default: return <Sparkles size={24} className="text-[#174A3A]" />;
    }
  };

  return (
    <div className="bg-[#F6F2E9] min-h-screen pb-20">
      
      {/* Top Floating Control Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="flex items-center justify-between py-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-semibold text-[#17211D] hover:text-[#174A3A] bg-white/80 hover:bg-white px-3.5 py-2 rounded-xl border border-[#D9DED8] transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Directory</span>
          </button>

          <div className="flex items-center gap-2">
            {business.socialLinks.instagram && (
              <a
                href={business.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#D9DED8] hover:border-[#B99A52] flex items-center justify-center text-[#174A3A] transition-all shadow-xs"
                title="Instagram"
              >
                <Instagram size={16} />
              </a>
            )}
            {business.website && (
              <a
                href={business.website}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-[#D9DED8] hover:border-[#B99A52] flex items-center justify-center text-[#174A3A] transition-all shadow-xs"
                title="Visit Website"
              >
                <Globe size={16} />
              </a>
            )}
            <button
              onClick={() => setActiveShareBusiness(business)}
              className="w-9 h-9 rounded-full bg-white border border-[#D9DED8] hover:border-[#B99A52] flex items-center justify-center text-[#174A3A] transition-all shadow-xs cursor-pointer"
              title="Share Card"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Business Profile Card Canvas */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-4">
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#D9DED8] shadow-md overflow-hidden">
          
          {/* Hero Cover Image Stage */}
          <div className="relative h-64 sm:h-80 md:h-96 w-full bg-[#0D3026] overflow-hidden">
            <img
              src={business.coverUrl}
              alt={business.name}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          {/* Business Identity & Action Bar */}
          <div className="px-6 sm:px-10 pb-6 relative">
            
            {/* Header with Overlapping Logo and Clean Content Separation */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
              
              <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                {/* Logo Box with Negative Margin to overlap cover only */}
                <div className="-mt-14 sm:-mt-20 relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-[#0D3026] border-4 border-[#FFFDF9] shadow-xl p-2 flex items-center justify-center overflow-hidden shrink-0">
                  {business.logoUrl ? (
                    <img 
                      src={business.logoUrl} 
                      alt={business.name} 
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <CircassianEmblem size={48} color="gold" showStars={false} />
                  )}
                </div>

                {/* Text Info sitting cleanly in white card area */}
                <div className="pt-2 sm:pt-4 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-serif-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#17211D] leading-tight">
                      {business.name}
                    </h1>
                    {business.isVerified && (
                      <span title="Verified Circassian Business" className="inline-flex items-center">
                        <CheckCircle2 className="text-[#B99A52] fill-[#B99A52]/20" size={22} />
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm sm:text-base text-[#68736D] font-medium">
                    {business.tagline || business.categoryName}
                  </p>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-[#68736D]">
                    <MapPin size={15} className="text-[#174A3A] shrink-0" />
                    <span>{business.address ? `${business.address}, ` : ''}{business.city}, {business.country}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2 lg:pt-0 shrink-0">
                <button
                  id="profile-share-btn"
                  onClick={() => setActiveShareBusiness(business)}
                  className="flex items-center gap-2 bg-[#174A3A] hover:bg-[#286B52] text-white border border-[#B99A52]/60 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Share2 size={16} className="text-[#B99A52]" />
                  <span>Share Business Card</span>
                </button>

                <button
                  id="profile-save-btn"
                  onClick={() => toggleSaveBusiness(business.id)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                    saved 
                      ? 'bg-[#174A3A] text-[#B99A52] border-[#174A3A]' 
                      : 'bg-[#FFFDF9] hover:bg-[#F6F2E9] text-[#17211D] border-[#D9DED8]'
                  }`}
                >
                  <Bookmark size={16} className={saved ? 'fill-current' : ''} />
                  <span>{saved ? 'Saved' : 'Save'}</span>
                </button>
              </div>

            </div>

            {/* Profile Navigation Tabs */}
            <div className="border-b border-[#D9DED8] mt-8">
              <nav className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
                {[
                  { id: 'about', label: 'About' },
                  { id: 'services', label: `Services (${business.services.length})` },
                  { id: 'products', label: `Products (${business.products.length})` },
                  { id: 'gallery', label: `Gallery (${business.gallery.length})` },
                  { id: 'reviews', label: `Reviews (${business.reviews.length})` },
                  { id: 'contact', label: 'Contact' },
                ].map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`pb-3.5 text-sm sm:text-base font-medium transition-all relative whitespace-nowrap cursor-pointer ${
                        isActive 
                          ? 'text-[#174A3A] font-bold' 
                          : 'text-[#68736D] hover:text-[#17211D]'
                      }`}
                    >
                      {tab.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#174A3A] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Contents */}
            <div className="py-8">
              
              {/* TAB 1: ABOUT */}
              {activeTab === 'about' && (
                <div className="space-y-12">
                  
                  {/* Two-Column About & Contact Card */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left: About text & Badges */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h2 className="font-serif-heading font-bold text-xl sm:text-2xl text-[#17211D] mb-3">
                          About Us
                        </h2>
                        <p className="text-[#17211D]/85 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                          {business.description}
                        </p>
                      </div>

                      {/* Circassian Owned & Verified Badges */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {business.isCircassianOwned && (
                          <div className="flex items-center gap-2 bg-[#F6F2E9] border border-[#B99A52] text-[#174A3A] px-3.5 py-2 rounded-xl text-sm font-semibold">
                            <CircassianEmblem size={18} showStars={false} color="green" />
                            <span>Circassian Owned</span>
                          </div>
                        )}
                        {business.isVerified && (
                          <div className="flex items-center gap-2 bg-[#FFFDF9] border border-[#D9DED8] text-[#17211D] px-3.5 py-2 rounded-xl text-sm font-semibold">
                            <CheckCircle2 size={18} className="text-[#B99A52]" />
                            <span>Verified Business</span>
                          </div>
                        )}
                        {business.establishedYear && (
                          <div className="flex items-center gap-2 bg-[#FFFDF9] border border-[#D9DED8] text-[#68736D] px-3.5 py-2 rounded-xl text-sm font-medium">
                            <Calendar size={16} />
                            <span>Established {business.establishedYear}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Contact Information Sidebar */}
                    <div className="bg-[#F6F2E9] border border-[#D9DED8] rounded-2xl p-6 space-y-4">
                      <h3 className="font-serif-heading font-bold text-lg text-[#17211D] border-b border-[#D9DED8]/60 pb-2">
                        Contact Details
                      </h3>

                      <div className="space-y-3 text-sm text-[#17211D]">
                        {business.phone && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white border border-[#D9DED8] flex items-center justify-center text-[#174A3A] shrink-0">
                              <Phone size={15} />
                            </div>
                            <a href={`tel:${business.phone}`} className="hover:text-[#174A3A] font-medium font-mono text-xs sm:text-sm">
                              {business.phone}
                            </a>
                          </div>
                        )}

                        {business.email && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white border border-[#D9DED8] flex items-center justify-center text-[#174A3A] shrink-0">
                              <Mail size={15} />
                            </div>
                            <a href={`mailto:${business.email}`} className="hover:text-[#174A3A] font-medium truncate">
                              {business.email}
                            </a>
                          </div>
                        )}

                        {business.website && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white border border-[#D9DED8] flex items-center justify-center text-[#174A3A] shrink-0">
                              <Globe size={15} />
                            </div>
                            <a href={business.website} target="_blank" rel="noreferrer" className="hover:text-[#174A3A] font-medium truncate">
                              {business.website.replace('https://', '')}
                            </a>
                          </div>
                        )}

                        {business.openingHours && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white border border-[#D9DED8] flex items-center justify-center text-[#174A3A] shrink-0">
                              <Clock size={15} />
                            </div>
                            <span className="font-medium text-xs sm:text-sm">{business.openingHours}</span>
                          </div>
                        )}
                      </div>

                      {/* Social Media Link Pills */}
                      <div className="pt-3 border-t border-[#D9DED8]/60 flex items-center gap-2">
                        {business.socialLinks.instagram && (
                          <a
                            href={business.socialLinks.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-white border border-[#D9DED8] hover:border-[#B99A52] text-[#174A3A] transition-colors"
                            aria-label="Instagram"
                          >
                            <Instagram size={16} />
                          </a>
                        )}
                        {business.socialLinks.facebook && (
                          <a
                            href={business.socialLinks.facebook}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-white border border-[#D9DED8] hover:border-[#B99A52] text-[#174A3A] transition-colors"
                            aria-label="Facebook"
                          >
                            <Facebook size={16} />
                          </a>
                        )}
                        {business.socialLinks.linkedin && (
                          <a
                            href={business.socialLinks.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-white border border-[#D9DED8] hover:border-[#B99A52] text-[#174A3A] transition-colors"
                            aria-label="LinkedIn"
                          >
                            <Linkedin size={16} />
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => setActiveTab('contact')}
                        className="w-full mt-2 bg-[#174A3A] hover:bg-[#286B52] text-white py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <MessageSquare size={15} className="text-[#B99A52]" />
                        <span>Send Direct Message</span>
                      </button>
                    </div>

                  </div>

                  {/* Services Preview Grid in About tab */}
                  {business.services.length > 0 && (
                    <div className="space-y-4 pt-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-serif-heading font-bold text-xl sm:text-2xl text-[#17211D]">
                          Our Services
                        </h2>
                        <button
                          onClick={() => setActiveTab('services')}
                          className="text-xs sm:text-sm font-semibold text-[#174A3A] hover:underline cursor-pointer"
                        >
                          View All
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {business.services.map((srv) => (
                          <div
                            key={srv.id}
                            className="bg-[#F6F2E9] border border-[#D9DED8] rounded-2xl p-5 hover:border-[#B99A52] transition-all flex flex-col items-center text-center justify-between"
                          >
                            <div className="w-12 h-12 rounded-xl bg-white border border-[#D9DED8] flex items-center justify-center mb-3">
                              {getServiceIcon(srv.iconName)}
                            </div>
                            <div>
                              <h3 className="font-serif-heading font-bold text-base text-[#17211D] mb-1">
                                {srv.name}
                              </h3>
                              <p className="text-xs text-[#68736D] leading-relaxed">
                                {srv.description}
                              </p>
                            </div>
                            {srv.price && (
                              <span className="mt-3 text-xs font-semibold text-[#174A3A] bg-white px-2.5 py-1 rounded-md border border-[#D9DED8]">
                                {srv.price}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gallery Preview Grid in About tab */}
                  {business.gallery.length > 0 && (
                    <div className="space-y-4 pt-4">
                      <div className="flex items-center justify-between">
                        <h2 className="font-serif-heading font-bold text-xl sm:text-2xl text-[#17211D]">
                          Gallery
                        </h2>
                        <button
                          onClick={() => setActiveTab('gallery')}
                          className="text-xs sm:text-sm font-semibold text-[#174A3A] hover:underline cursor-pointer"
                        >
                          View All ({business.gallery.length})
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        {business.gallery.slice(0, 4).map((img, idx) => (
                          <div
                            key={img.id}
                            onClick={() => setLightboxIndex(idx)}
                            className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-[#0D3026] cursor-pointer border border-[#D9DED8]"
                          >
                            <img
                              src={img.imageUrl}
                              alt={img.caption || 'Business gallery'}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* TAB 2: SERVICES */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif-heading font-bold text-2xl text-[#17211D]">
                      Services Offered
                    </h2>
                    <p className="text-sm text-[#68736D]">
                      Explore specialized professional services provided by {business.name}.
                    </p>
                  </div>

                  {business.services.length === 0 ? (
                    <div className="text-center py-12 bg-[#F6F2E9] rounded-2xl border border-[#D9DED8]">
                      <p className="text-sm text-[#68736D]">No services listed yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {business.services.map((srv) => (
                        <div
                          key={srv.id}
                          className="bg-[#F6F2E9] border border-[#D9DED8] rounded-2xl p-6 hover:border-[#B99A52] transition-all flex flex-col justify-between"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white border border-[#D9DED8] flex items-center justify-center shrink-0">
                              {getServiceIcon(srv.iconName)}
                            </div>
                            <div>
                              <h3 className="font-serif-heading font-bold text-lg text-[#17211D]">
                                {srv.name}
                              </h3>
                              <p className="text-sm text-[#68736D] mt-1 leading-relaxed">
                                {srv.description}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-[#D9DED8]/60 flex items-center justify-between">
                            <span className="text-sm font-bold text-[#174A3A]">
                              {srv.price || 'Contact for price'}
                            </span>
                            <button
                              onClick={() => {
                                setContactMessage(`Hello, I would like to inquire about your service: ${srv.name}.`);
                                setActiveTab('contact');
                              }}
                              className="text-xs font-semibold text-[#174A3A] hover:text-[#286B52] bg-white px-3 py-1.5 rounded-lg border border-[#D9DED8] cursor-pointer"
                            >
                              Inquire Service
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: PRODUCTS */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif-heading font-bold text-2xl text-[#17211D]">
                      Products & Crafts
                    </h2>
                    <p className="text-sm text-[#68736D]">
                      Handmade and authentic products created by {business.name}.
                    </p>
                  </div>

                  {business.products.length === 0 ? (
                    <div className="text-center py-12 bg-[#F6F2E9] rounded-2xl border border-[#D9DED8]">
                      <p className="text-sm text-[#68736D]">No products listed at this time.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {business.products.map((prod) => (
                        <div
                          key={prod.id}
                          className="bg-[#F6F2E9] border border-[#D9DED8] rounded-2xl overflow-hidden hover:border-[#B99A52] transition-all flex flex-col justify-between"
                        >
                          <div className="h-48 bg-[#E8EDE7] overflow-hidden">
                            <img
                              src={prod.imageUrl}
                              alt={prod.name}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <h3 className="font-serif-heading font-bold text-base text-[#17211D] mb-1">
                                {prod.name}
                              </h3>
                              <p className="text-xs text-[#68736D] line-clamp-2 leading-relaxed mb-3">
                                {prod.description}
                              </p>
                            </div>

                            <div className="pt-3 border-t border-[#D9DED8]/60 flex items-center justify-between">
                              <span className="font-bold text-base text-[#174A3A]">
                                ${prod.price} {prod.currency}
                              </span>

                              <button
                                onClick={() => {
                                  setContactMessage(`Hello, I would like to order or learn more about: ${prod.name} ($${prod.price}).`);
                                  setActiveTab('contact');
                                }}
                                className="bg-[#174A3A] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#286B52] cursor-pointer"
                              >
                                Order / Inquire
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: GALLERY */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-serif-heading font-bold text-2xl text-[#17211D]">
                      Photo Gallery
                    </h2>
                    <p className="text-sm text-[#68736D]">
                      Visual showcase of spaces, craftsmanship, and projects.
                    </p>
                  </div>

                  {business.gallery.length === 0 ? (
                    <div className="text-center py-12 bg-[#F6F2E9] rounded-2xl border border-[#D9DED8]">
                      <p className="text-sm text-[#68736D]">No gallery photos uploaded yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {business.gallery.map((img, idx) => (
                        <div
                          key={img.id}
                          onClick={() => setLightboxIndex(idx)}
                          className="group relative aspect-4/3 rounded-2xl overflow-hidden bg-[#0D3026] cursor-pointer border border-[#D9DED8] shadow-xs"
                        >
                          <img
                            src={img.imageUrl}
                            alt={img.caption || 'Gallery photo'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                            <p className="text-xs text-white font-medium">{img.caption}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: REVIEWS */}
              {activeTab === 'reviews' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif-heading font-bold text-2xl text-[#17211D]">
                        Community Reviews
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center text-[#B99A52]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className="fill-current" />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-[#17211D]">{business.rating}</span>
                        <span className="text-xs text-[#68736D]">({business.reviews.length} reviews)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                      className="bg-[#174A3A] hover:bg-[#286B52] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                      {isReviewFormOpen ? 'Cancel' : '+ Write a Review'}
                    </button>
                  </div>

                  {/* Review submission form */}
                  {isReviewFormOpen && (
                    <form onSubmit={handleReviewSubmit} className="bg-[#F6F2E9] border border-[#D9DED8] rounded-2xl p-6 space-y-4">
                      <h3 className="font-serif-heading font-bold text-base text-[#17211D]">
                        Share your feedback for {business.name}
                      </h3>

                      <div>
                        <label className="block text-xs font-semibold text-[#17211D] mb-1">Rating</label>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewRating(star)}
                              className="p-1 cursor-pointer"
                            >
                              <Star
                                size={22}
                                className={star <= reviewRating ? 'text-[#B99A52] fill-[#B99A52]' : 'text-[#D9DED8]'}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#17211D] mb-1">Your Name</label>
                          <input
                            type="text"
                            required
                            value={reviewAuthor}
                            onChange={(e) => setReviewAuthor(e.target.value)}
                            placeholder="e.g. Aslan Kardanov"
                            className="w-full bg-white border border-[#D9DED8] rounded-lg px-3 py-2 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#17211D] mb-1">City / Country</label>
                          <input
                            type="text"
                            value={reviewLocation}
                            onChange={(e) => setReviewLocation(e.target.value)}
                            placeholder="e.g. Istanbul, Türkiye"
                            className="w-full bg-white border border-[#D9DED8] rounded-lg px-3 py-2 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#17211D] mb-1">Your Experience / Feedback</label>
                        <textarea
                          required
                          rows={3}
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="Tell the Circassian community about the quality, service, and experience..."
                          className="w-full bg-white border border-[#D9DED8] rounded-lg px-3 py-2 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                        />
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="bg-[#174A3A] hover:bg-[#286B52] text-white px-5 py-2 rounded-xl text-sm font-semibold cursor-pointer"
                        >
                          Submit Review
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {business.reviews.map((rev) => (
                      <div key={rev.id} className="bg-[#F6F2E9] border border-[#D9DED8] rounded-2xl p-5 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-serif-heading font-bold text-base text-[#17211D]">{rev.authorName}</p>
                            <p className="text-xs text-[#68736D]">{rev.authorLocation} • {rev.date}</p>
                          </div>
                          <div className="flex items-center text-[#B99A52]">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} size={14} className="fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-[#17211D]/85 leading-relaxed pt-1">
                          "{rev.comment}"
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 6: CONTACT */}
              {activeTab === 'contact' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="text-center">
                    <h2 className="font-serif-heading font-bold text-2xl text-[#17211D]">
                      Connect with {business.name}
                    </h2>
                    <p className="text-sm text-[#68736D] mt-1">
                      Send a message, request a quote, or ask a question directly.
                    </p>
                  </div>

                  {isContactFormSubmitted ? (
                    <div className="bg-[#F6F2E9] border border-[#B99A52] rounded-2xl p-8 text-center space-y-3">
                      <div className="w-12 h-12 bg-[#174A3A] text-[#B99A52] rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 size={24} />
                      </div>
                      <h3 className="font-serif-heading font-bold text-lg text-[#17211D]">Message Received!</h3>
                      <p className="text-xs text-[#68736D]">
                        Thank you for reaching out to {business.name}. The owner will reply to your email shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="bg-[#F6F2E9] border border-[#D9DED8] rounded-2xl p-6 sm:p-8 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#17211D] mb-1">Your Full Name</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="e.g. Dana Hatukay"
                          className="w-full bg-white border border-[#D9DED8] rounded-lg px-3 py-2 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#17211D] mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="your.email@example.com"
                          className="w-full bg-white border border-[#D9DED8] rounded-lg px-3 py-2 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#17211D] mb-1">Your Message or Inquiry</label>
                        <textarea
                          required
                          rows={4}
                          value={contactMessage}
                          onChange={(e) => setContactMessage(e.target.value)}
                          placeholder="Describe your project, question, or order..."
                          className="w-full bg-white border border-[#D9DED8] rounded-lg px-3 py-2 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#174A3A] hover:bg-[#286B52] text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                      >
                        <Send size={16} className="text-[#B99A52]" />
                        <span>Send Message</span>
                      </button>
                    </form>
                  )}

                </div>
              )}

            </div>

          </div>

        </div>

        {/* Are you a business owner? Call To Action Banner */}
        <section className="mt-12 bg-[#0D3026] text-white rounded-3xl border border-[#174A3A] p-8 sm:p-10 relative overflow-hidden shadow-lg">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="/cta-adiga.jpg"
              alt="Circassian Community"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#071A14]/75 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071A14]/95 via-[#0D3026]/80 to-[#071A14]/70" />
          </div>

          <div className="relative z-10 max-w-xl space-y-3">
            <h2 className="font-serif-heading font-bold text-2xl sm:text-3xl text-white">
              Are you a business owner?
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              Join our network and connect with thousands of Circassian people worldwide. Share your services, products, and story.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsAddBusinessModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#B99A52] hover:bg-[#D4B76A] text-[#0D3026] font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md hover:scale-105 cursor-pointer"
              >
                <Plus size={18} />
                <span>Add Your Business</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Lightbox for full gallery view */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          images={business.gallery}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

    </div>
  );
};

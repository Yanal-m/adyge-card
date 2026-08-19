import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CulturalDivider } from '../cultural/CulturalDivider';
import { CircassianEmblem } from '../cultural/CircassianEmblem';
import { 
  Building2, 
  Eye, 
  Share2, 
  Star, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  ExternalLink,
  Layers,
  Sparkles,
  Phone,
  Mail,
  Globe
} from 'lucide-react';

export const OwnerDashboard: React.FC = () => {
  const { 
    businesses, 
    currentUser, 
    openBusinessDetail, 
    setIsAddBusinessModalOpen, 
    setActiveShareBusiness,
    updateBusiness,
    showToast
  } = useApp();

  const myBusinesses = businesses.filter(b => currentUser.ownedBusinessIds.includes(b.id) || b.ownerId === currentUser.id);
  const activeBusiness = myBusinesses[0] || businesses[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'products' | 'settings'>('overview');

  return (
    <div className="bg-[#F6F2E9] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#174A3A] bg-[#FFFDF9] px-2.5 py-0.5 rounded border border-[#D9DED8]">
                Owner Portal
              </span>
            </div>
            <h1 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[#17211D] mt-1">
              Business Management Dashboard
            </h1>
            <p className="text-sm text-[#68736D]">
              Manage your digital business cards, services, products, and community interactions.
            </p>
          </div>

          <button
            onClick={() => setIsAddBusinessModalOpen(true)}
            className="flex items-center gap-2 bg-[#174A3A] hover:bg-[#286B52] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm cursor-pointer transition-colors"
          >
            <Plus size={16} className="text-[#B99A52]" />
            <span>+ Add Another Business</span>
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#D9DED8] p-1.5 flex gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Analytics' },
            { id: 'services', label: `Manage Services (${activeBusiness?.services.length || 0})` },
            { id: 'products', label: `Manage Products (${activeBusiness?.products.length || 0})` },
            { id: 'settings', label: 'Business Settings' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#174A3A] text-white'
                  : 'text-[#68736D] hover:bg-[#F6F2E9] hover:text-[#17211D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && activeBusiness && (
          <div className="space-y-8">
            
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#FFFDF9] border border-[#D9DED8] rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between text-[#68736D] text-xs font-semibold mb-2">
                  <span>Profile Card Views</span>
                  <Eye size={16} className="text-[#174A3A]" />
                </div>
                <p className="font-serif-heading font-bold text-2xl text-[#17211D]">
                  {activeBusiness.viewsCount.toLocaleString()}
                </p>
                <p className="text-[11px] text-[#B99A52] font-medium mt-1">+14% this month</p>
              </div>

              <div className="bg-[#FFFDF9] border border-[#D9DED8] rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between text-[#68736D] text-xs font-semibold mb-2">
                  <span>Rating & Reviews</span>
                  <Star size={16} className="text-[#B99A52]" />
                </div>
                <p className="font-serif-heading font-bold text-2xl text-[#17211D]">
                  {activeBusiness.rating} / 5.0
                </p>
                <p className="text-[11px] text-[#68736D] mt-1">{activeBusiness.reviews.length} community reviews</p>
              </div>

              <div className="bg-[#FFFDF9] border border-[#D9DED8] rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between text-[#68736D] text-xs font-semibold mb-2">
                  <span>Verification Status</span>
                  <CheckCircle2 size={16} className="text-[#B99A52]" />
                </div>
                <p className="font-serif-heading font-bold text-lg text-[#17211D]">
                  {activeBusiness.isVerified ? 'Verified Circassian' : 'Pending Verification'}
                </p>
                <p className="text-[11px] text-[#68736D] mt-1">Official badge active</p>
              </div>

              <div className="bg-[#FFFDF9] border border-[#D9DED8] rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between text-[#68736D] text-xs font-semibold mb-2">
                  <span>Profile Completeness</span>
                  <Sparkles size={16} className="text-[#174A3A]" />
                </div>
                <p className="font-serif-heading font-bold text-2xl text-[#174A3A]">
                  95% Complete
                </p>
                <p className="text-[11px] text-[#286B52] font-medium mt-1">Ready for global sharing</p>
              </div>
            </div>

            {/* Active Business Summary Card */}
            <div className="bg-[#FFFDF9] border border-[#D9DED8] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-[#0D3026] border-2 border-[#B99A52] p-1 overflow-hidden shrink-0">
                  <img src={activeBusiness.logoUrl} alt="" className="w-full h-full object-cover rounded-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif-heading font-bold text-xl sm:text-2xl text-[#17211D]">
                      {activeBusiness.name}
                    </h2>
                    {activeBusiness.isVerified && <CheckCircle2 size={18} className="text-[#B99A52]" />}
                  </div>
                  <p className="text-xs sm:text-sm text-[#68736D]">{activeBusiness.categoryName} • {activeBusiness.city}, {activeBusiness.country}</p>
                  <p className="text-xs text-[#174A3A] font-medium mt-1">Status: Published on Adyge Card Directory</p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => openBusinessDetail(activeBusiness.slug)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#F6F2E9] hover:bg-[#D9DED8]/60 text-[#17211D] border border-[#D9DED8] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  <ExternalLink size={15} />
                  <span>View Public Profile</span>
                </button>

                <button
                  onClick={() => setActiveShareBusiness(activeBusiness)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#174A3A] hover:bg-[#286B52] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  <Share2 size={15} className="text-[#B99A52]" />
                  <span>Share QR & Card</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: SERVICES MANAGEMENT */}
        {activeTab === 'services' && activeBusiness && (
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#D9DED8] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#D9DED8] pb-4">
              <div>
                <h2 className="font-serif-heading font-bold text-xl text-[#17211D]">
                  Services Offered
                </h2>
                <p className="text-xs text-[#68736D]">
                  Keep your client service pricing and descriptions up to date.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {activeBusiness.services.map((srv) => (
                <div key={srv.id} className="p-4 bg-[#F6F2E9] rounded-xl border border-[#D9DED8] flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-[#17211D]">{srv.name}</h4>
                    <p className="text-xs text-[#68736D]">{srv.description}</p>
                    <span className="text-xs font-bold text-[#174A3A] mt-1 inline-block">{srv.price}</span>
                  </div>
                  <button
                    onClick={() => {
                      const filtered = activeBusiness.services.filter(s => s.id !== srv.id);
                      updateBusiness(activeBusiness.id, { services: filtered });
                    }}
                    className="text-[#68736D] hover:text-red-600 p-2 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && activeBusiness && (
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#D9DED8] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-[#D9DED8] pb-4">
              <h2 className="font-serif-heading font-bold text-xl text-[#17211D]">
                Product Catalog
              </h2>
              <p className="text-xs text-[#68736D]">
                Showcase handmade goods, merchandise, and specialty items for the community.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeBusiness.products.map((prd) => (
                <div key={prd.id} className="p-4 bg-[#F6F2E9] rounded-xl border border-[#D9DED8] flex items-center gap-4 justify-between">
                  <div className="flex items-center gap-3">
                    <img src={prd.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-semibold text-sm text-[#17211D]">{prd.name}</h4>
                      <p className="text-xs text-[#174A3A] font-bold">${prd.price} {prd.currency}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const filtered = activeBusiness.products.filter(p => p.id !== prd.id);
                      updateBusiness(activeBusiness.id, { products: filtered });
                    }}
                    className="text-[#68736D] hover:text-red-600 p-2 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SETTINGS */}
        {activeTab === 'settings' && activeBusiness && (
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#D9DED8] p-6 sm:p-8 space-y-6 shadow-xs max-w-2xl">
            <h2 className="font-serif-heading font-bold text-xl text-[#17211D] border-b border-[#D9DED8] pb-3">
              Quick Contact Settings
            </h2>

            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-[#17211D] mb-1">Phone Number</label>
                <input
                  type="text"
                  defaultValue={activeBusiness.phone}
                  onChange={(e) => updateBusiness(activeBusiness.id, { phone: e.target.value })}
                  className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2 text-sm text-[#17211D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17211D] mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue={activeBusiness.email}
                  onChange={(e) => updateBusiness(activeBusiness.id, { email: e.target.value })}
                  className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2 text-sm text-[#17211D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17211D] mb-1">Website URL</label>
                <input
                  type="url"
                  defaultValue={activeBusiness.website}
                  onChange={(e) => updateBusiness(activeBusiness.id, { website: e.target.value })}
                  className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2 text-sm text-[#17211D]"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

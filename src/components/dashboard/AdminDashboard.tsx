import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CulturalDivider } from '../cultural/CulturalDivider';
import { CircassianEmblem } from '../cultural/CircassianEmblem';
import { 
  ShieldCheck, 
  Check, 
  X, 
  Star, 
  Trash2, 
  Search, 
  CheckCircle2, 
  ExternalLink,
  Users,
  Building,
  Flag,
  Sparkles
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    businesses, 
    categories, 
    toggleVerifyBusiness, 
    toggleFeatureBusiness, 
    deleteBusiness,
    approveBusiness,
    rejectBusiness,
    openBusinessDetail
  } = useApp();

  const [filterText, setFilterText] = useState('');

  const filtered = businesses.filter(b => 
    b.name.toLowerCase().includes(filterText.toLowerCase()) ||
    b.categoryName.toLowerCase().includes(filterText.toLowerCase()) ||
    b.country.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="bg-[#F6F2E9] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B99A52] bg-[#0D3026] px-2.5 py-0.5 rounded border border-[#B99A52]/40">
                Administration & Moderation
              </span>
            </div>
            <h1 className="font-serif-heading font-bold text-3xl sm:text-4xl text-[#17211D] mt-1">
              Network Moderation Console
            </h1>
            <p className="text-sm text-[#68736D]">
              Approve businesses, assign Circassian verification badges, feature artisans, and manage listings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold bg-[#FFFDF9] border border-[#D9DED8] px-3 py-1.5 rounded-lg text-[#17211D]">
              {businesses.length} Total Directory Records
            </span>
          </div>
        </div>

        {/* Search Moderation Filter */}
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#D9DED8] p-4 flex items-center gap-3 shadow-xs">
          <Search size={18} className="text-[#174A3A]" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter businesses by name, category, or country..."
            className="flex-1 bg-transparent text-sm text-[#17211D] focus:outline-none"
          />
        </div>

        {/* Businesses Moderation Table */}
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#D9DED8] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F6F2E9] border-b border-[#D9DED8] text-xs font-bold text-[#68736D] uppercase tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6">Business</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4 text-center">Circassian Owned</th>
                  <th className="py-3.5 px-4 text-center">Verified</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9DED8]/60 text-sm">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F6F2E9]/50 transition-colors">
                    
                    {/* Business Name & Logo */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0D3026] border border-[#B99A52] p-0.5 overflow-hidden shrink-0">
                          <img src={b.logoUrl} alt="" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div>
                          <p 
                            onClick={() => openBusinessDetail(b.slug)}
                            className="font-serif-heading font-bold text-sm text-[#17211D] hover:text-[#174A3A] cursor-pointer"
                          >
                            {b.name}
                          </p>
                          <p className="text-[11px] text-[#68736D] truncate max-w-xs">{b.email || b.phone}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 text-xs font-semibold text-[#174A3A]">
                      {b.categoryName}
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4 text-xs text-[#68736D]">
                      {b.city}, {b.country}
                    </td>

                    {/* Circassian Owned Badge Status */}
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                        b.isCircassianOwned 
                          ? 'bg-[#F6F2E9] text-[#174A3A] border border-[#B99A52]' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {b.isCircassianOwned ? 'Yes' : 'No'}
                      </span>
                    </td>

                    {/* Verification Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => toggleVerifyBusiness(b.id)}
                        className={`p-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1 ${
                          b.isVerified 
                            ? 'bg-[#FFFDF9] border-[#B99A52] text-[#B99A52]' 
                            : 'bg-[#FFFDF9] border-[#D9DED8] text-gray-400 hover:text-[#17211D]'
                        }`}
                        title="Toggle verification"
                      >
                        <CheckCircle2 size={15} className={b.isVerified ? 'fill-[#B99A52]/20' : ''} />
                        <span>{b.isVerified ? 'Verified' : 'Unverified'}</span>
                      </button>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => toggleFeatureBusiness(b.id)}
                        className={`p-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer inline-flex items-center gap-1 ${
                          b.isFeatured 
                            ? 'bg-[#174A3A] border-[#174A3A] text-[#B99A52]' 
                            : 'bg-[#FFFDF9] border-[#D9DED8] text-gray-400 hover:text-[#17211D]'
                        }`}
                        title="Toggle featured status"
                      >
                        <Star size={14} className={b.isFeatured ? 'fill-current' : ''} />
                        <span>{b.isFeatured ? 'Featured' : 'Standard'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => openBusinessDetail(b.slug)}
                        className="p-1.5 text-[#174A3A] hover:bg-[#F6F2E9] rounded-lg transition-colors cursor-pointer inline-block"
                        title="View profile"
                      >
                        <ExternalLink size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${b.name}?`)) {
                            deleteBusiness(b.id);
                          }
                        }}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer inline-block"
                        title="Delete business"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

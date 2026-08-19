import React, { useState } from 'react';
import { Business } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Copy, Check, Share2, Download, QrCode, Phone, Mail, Globe, MapPin } from 'lucide-react';
import { CircassianEmblem } from '../cultural/CircassianEmblem';

interface ShareModalProps {
  business: Business | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ business, onClose }) => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!business) return null;

  const currentUrl = `${window.location.origin}/#business/${business.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    showToast('Direct link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${business.name} — Adyge Card`,
          text: `Check out ${business.name} (${business.categoryName}) on the Circassian Business Network.`,
          url: currentUrl,
        });
      } catch (err) {
        console.log('Share dismissed', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadVCard = () => {
    const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${business.name}
ORG:${business.name} (Adyge Card)
TITLE:${business.categoryName}
TEL;TYPE=WORK,VOICE:${business.phone}
EMAIL;TYPE=PREF,INTERNET:${business.email}
URL:${business.website}
ADR;TYPE=WORK:;;${business.address};${business.city};;${business.country}
NOTE:${business.description} - Verified Circassian Business
END:VCARD`;

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${business.slug}-business-card.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Digital vCard contact card downloaded!');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF9] rounded-2xl max-w-md w-full border border-[#D9DED8] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Forest Green Gradient */}
        <div className="bg-gradient-to-r from-[#0D3026] to-[#174A3A] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#0D3026] border border-[#B99A52] p-1 flex items-center justify-center overflow-hidden shrink-0">
              {business.logoUrl ? (
                <img src={business.logoUrl} alt={business.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <CircassianEmblem size={24} color="gold" showStars={false} />
              )}
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#B99A52] uppercase tracking-wider block">
                Digital Business Card
              </span>
              <h3 className="font-serif-heading font-bold text-lg text-white leading-tight">
                {business.name}
              </h3>
              <p className="text-xs text-white/80">{business.categoryName} • {business.city}, {business.country}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Visual QR Code Card */}
          <div className="bg-[#F6F2E9] border border-[#D9DED8] rounded-xl p-5 text-center flex flex-col items-center">
            <div className="bg-white p-3 rounded-lg border border-[#D9DED8] shadow-xs inline-block mb-3">
              {/* Clean Vector SVG simulated high-res QR code */}
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="140" height="140" fill="white" />
                {/* QR Marker Top-Left */}
                <rect x="10" y="10" width="35" height="35" rx="4" fill="#0D3026" />
                <rect x="15" y="15" width="25" height="25" rx="2" fill="white" />
                <rect x="20" y="20" width="15" height="15" rx="1" fill="#174A3A" />

                {/* QR Marker Top-Right */}
                <rect x="95" y="10" width="35" height="35" rx="4" fill="#0D3026" />
                <rect x="100" y="15" width="25" height="25" rx="2" fill="white" />
                <rect x="105" y="20" width="15" height="15" rx="1" fill="#174A3A" />

                {/* QR Marker Bottom-Left */}
                <rect x="10" y="95" width="35" height="35" rx="4" fill="#0D3026" />
                <rect x="15" y="100" width="25" height="25" rx="2" fill="white" />
                <rect x="20" y="105" width="15" height="15" rx="1" fill="#174A3A" />

                {/* Data Grid Pattern */}
                <rect x="52" y="12" width="6" height="6" fill="#0D3026" />
                <rect x="64" y="12" width="6" height="6" fill="#174A3A" />
                <rect x="76" y="12" width="6" height="6" fill="#0D3026" />
                <rect x="52" y="24" width="12" height="6" fill="#174A3A" />
                <rect x="70" y="24" width="6" height="6" fill="#0D3026" />
                <rect x="82" y="24" width="6" height="6" fill="#174A3A" />

                <rect x="12" y="52" width="6" height="6" fill="#0D3026" />
                <rect x="24" y="52" width="12" height="6" fill="#174A3A" />
                <rect x="42" y="52" width="6" height="6" fill="#0D3026" />
                <rect x="54" y="52" width="18" height="6" fill="#174A3A" />
                <rect x="80" y="52" width="12" height="6" fill="#0D3026" />
                <rect x="100" y="52" width="6" height="6" fill="#174A3A" />
                <rect x="114" y="52" width="14" height="6" fill="#0D3026" />

                {/* Center Circassian Star Motif */}
                <circle cx="70" cy="70" r="14" fill="#0D3026" stroke="#B99A52" strokeWidth="2" />
                <circle cx="70" cy="70" r="4" fill="#B99A52" />

                <rect x="12" y="70" width="18" height="6" fill="#174A3A" />
                <rect x="36" y="70" width="6" height="6" fill="#0D3026" />
                <rect x="94" y="70" width="12" height="6" fill="#174A3A" />
                <rect x="114" y="70" width="14" height="6" fill="#0D3026" />

                <rect x="52" y="95" width="12" height="6" fill="#0D3026" />
                <rect x="72" y="95" width="18" height="6" fill="#174A3A" />
                <rect x="100" y="95" width="6" height="6" fill="#0D3026" />
                <rect x="114" y="95" width="14" height="6" fill="#174A3A" />

                <rect x="52" y="110" width="6" height="18" fill="#174A3A" />
                <rect x="68" y="110" width="12" height="6" fill="#0D3026" />
                <rect x="90" y="110" width="6" height="18" fill="#174A3A" />
                <rect x="106" y="110" width="14" height="6" fill="#0D3026" />
                <rect x="126" y="110" width="6" height="18" fill="#174A3A" />
              </svg>
            </div>
            <p className="text-xs text-[#68736D]">
              Scan to open digital business card instantly on smartphone
            </p>
          </div>

          {/* Direct Link Copy */}
          <div>
            <label className="block text-xs font-semibold text-[#17211D] mb-1.5">
              Business Card Link:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 bg-[#F6F2E9] border border-[#D9DED8] rounded-lg px-3 py-2 text-xs text-[#17211D] font-mono select-all focus:outline-none focus:border-[#174A3A]"
              />
              <button
                onClick={handleCopyLink}
                className="bg-[#174A3A] hover:bg-[#286B52] text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleDownloadVCard}
              className="w-full flex items-center justify-center gap-2 bg-[#FFFDF9] hover:bg-[#F6F2E9] text-[#174A3A] border border-[#B99A52] px-3 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
            >
              <Download size={15} className="text-[#B99A52]" />
              <span>Save Contact (.vcf)</span>
            </button>

            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 bg-[#174A3A] hover:bg-[#286B52] text-white px-3 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
            >
              <Share2 size={15} className="text-[#B99A52]" />
              <span>Share Profile</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { GalleryImage } from '../../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryLightboxProps {
  images: GalleryImage[];
  initialIndex?: number;
  onClose: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  images,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between text-white z-10">
        <span className="text-xs sm:text-sm text-white/80 font-medium">
          Photo {currentIndex + 1} of {images.length}
        </span>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
          aria-label="Close Lightbox"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Image Stage */}
      <div 
        className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.imageUrl}
          alt={currentImage.caption || 'Gallery image'}
          className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0D3026]/80 hover:bg-[#174A3A] text-[#B99A52] border border-[#B99A52]/40 transition-all shadow-lg cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0D3026]/80 hover:bg-[#174A3A] text-[#B99A52] border border-[#B99A52]/40 transition-all shadow-lg cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Caption & Thumbnails */}
      <div className="w-full max-w-2xl text-center pb-2 z-10">
        {currentImage.caption && (
          <p className="text-sm text-white font-medium mb-3">
            {currentImage.caption}
          </p>
        )}

        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  idx === currentIndex 
                    ? 'border-[#B99A52] scale-110 shadow-md' 
                    : 'border-white/20 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

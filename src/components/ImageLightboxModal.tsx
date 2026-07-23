import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ImageLightboxModalProps {
  imageUrl: string | null;
  title?: string;
  itemId?: string;
  additionalImages?: string[];
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  imageUrl,
  title,
  itemId,
  additionalImages = [],
  onClose,
}) => {
  const { t } = useApp();

  // Disable background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Combine main image + additional images into single array (up to 5 total)
  const allImages = [imageUrl, ...additionalImages].filter(
    (url): url is string => typeof url === 'string' && url.trim().length > 0
  );

  const [activeIndex, setActiveIndex] = useState(0);

  if (allImages.length === 0) return null;

  const currentImage = allImages[activeIndex] || allImages[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full bg-white dark:bg-[#1C1715] border border-stone-200 dark:border-stone-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Lightbox Header - Light Professional Style */}
        <div className="bg-white dark:bg-[#1C1715] text-stone-900 dark:text-stone-100 px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex-shrink-0">
              <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="truncate">
              <h3 className="font-serif text-sm sm:text-base font-bold truncate text-stone-900 dark:text-stone-100">
                {title || t('Full Garment & Fabric Preview', 'সম্পূর্ণ পোশাক ও কাপড়ের প্রিভিউ')}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                {itemId && (
                  <span className="text-[11px] font-mono font-bold text-stone-500 dark:text-stone-400">
                    ID: {itemId}
                  </span>
                )}
                {allImages.length > 1 && (
                  <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-2.5 py-0.5 rounded-full border border-stone-200 dark:border-stone-700">
                    {activeIndex + 1} / {allImages.length} {t('Photos', 'ছবি')}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition active:scale-95 flex-shrink-0 cursor-pointer"
            title={t('Close Image View', 'বন্ধ করুন')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image Viewport with Nav Controls - Soft Clean Light Canvas */}
        <div className="relative flex-1 bg-[#FAF8F5] dark:bg-[#120E0C] p-3 sm:p-6 flex items-center justify-center overflow-hidden min-h-[300px] max-h-[66vh]">
          <img
            key={currentImage}
            src={currentImage}
            alt={title || 'Full Preview'}
            className="max-w-full max-h-[62vh] object-contain rounded-xl shadow-lg border border-stone-200/60 dark:border-stone-800 transition-all duration-300"
          />

          {/* Prev/Next Overlay Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 dark:bg-stone-800/90 hover:bg-white dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 shadow-md border border-stone-200 dark:border-stone-700 active:scale-90 transition cursor-pointer z-10"
                title={t('Previous photo', 'পূর্ববর্তী ছবি')}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-white/90 dark:bg-stone-800/90 hover:bg-white dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 shadow-md border border-stone-200 dark:border-stone-700 active:scale-90 transition cursor-pointer z-10"
                title={t('Next photo', 'পরবর্তী ছবি')}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Row (Up to 5 images) */}
        {allImages.length > 1 && (
          <div className="bg-white dark:bg-[#181412] p-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto">
            <span className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-stone-500 dark:text-stone-400 pr-1 flex-shrink-0">
              <Images className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" />
              <span>{t('Gallery:', 'ছবিসমুহ:')}</span>
            </span>
            {allImages.map((imgUrl, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0 cursor-pointer ${
                  activeIndex === idx
                    ? 'border-stone-900 dark:border-stone-100 scale-105 shadow-md ring-2 ring-stone-900/10 dark:ring-stone-100/20'
                    : 'border-stone-200 dark:border-stone-700 opacity-60 hover:opacity-100 hover:border-stone-400'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Thumb ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Footer Info Bar */}
        <div className="bg-stone-50 dark:bg-[#1C1715] px-4 sm:px-6 py-3 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
          <p className="text-stone-500 dark:text-stone-400 text-[11px] sm:text-xs">
            {t(
              'Click any photo above or use arrows to view all angles.',
              'বিভিন্ন এঙ্গেলের সব ছবি দেখতে উপরের ছবিতে ক্লিক করুন।'
            )}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 font-bold text-xs transition cursor-pointer"
            >
              {t('Close', 'বন্ধ করুন')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

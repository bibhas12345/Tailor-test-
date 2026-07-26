import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { formatFabricPrice } from '../types';
import { ShoppingBag, Layers, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const HomeTwoCardsSection: React.FC = () => {
  const { homepageSettings, products, fabrics, setActiveTab, t } = useApp();

  // 1. Ready-Made Product Slider Items (First product from each navigation category)
  const productItems = useMemo(() => {
    const categories: { key: string; badgeEn: string; badgeBn: string; finder: (p: typeof products[0]) => boolean }[] = [
      {
        key: 'nighty',
        badgeEn: 'Ready Made • Nighty',
        badgeBn: 'রেডিমেড • নাইটি',
        finder: (p) => p.category === 'nighty',
      },
      {
        key: 'kurti',
        badgeEn: 'Ready Made • Kurti',
        badgeBn: 'রেডিমেড • কুর্তি',
        finder: (p) => p.category === 'kurti',
      },
      {
        key: 'traditional',
        badgeEn: 'Ready Made • Traditional',
        badgeBn: 'রেডিমেড • ট্র্যাডিশনাল',
        finder: (p) => p.category === 'traditional',
      },
      {
        key: 'bedsheet',
        badgeEn: 'Ready Made • Bed Sheet',
        badgeBn: 'রেডিমেড • বেড শিট',
        finder: (p) => p.category === 'bedsheet',
      },
      {
        key: 'others',
        badgeEn: 'Ready Made • Others',
        badgeBn: 'রেডিমেড • অন্যান্য',
        finder: (p) =>
          p.category === 'others' ||
          !['nighty', 'kurti', 'traditional', 'bedsheet'].includes(p.category),
      },
    ];

    const items: {
      id: string;
      badgeEn: string;
      badgeBn: string;
      image: string;
      titleEn: string;
      titleBn: string;
      descEn: string;
      descBn: string;
      price: number;
    }[] = [];

    for (const cat of categories) {
      const foundProd = products.find(cat.finder);
      if (foundProd) {
        items.push({
          id: foundProd.id,
          badgeEn: cat.badgeEn,
          badgeBn: cat.badgeBn,
          image: foundProd.image,
          titleEn: foundProd.title,
          titleBn: foundProd.bengaliTitle || foundProd.title,
          descEn: foundProd.description || '',
          descBn: foundProd.bengaliDescription || foundProd.description || '',
          price: foundProd.price,
        });
      }
    }

    if (items.length > 0 && items.length < 4) {
      const baseItems = [...items];
      let dupIndex = 1;
      while (items.length < 4) {
        for (const b of baseItems) {
          items.push({ ...b, id: `${b.id}-dup-${dupIndex++}` });
          if (items.length >= 4) break;
        }
      }
    }

    return items;
  }, [products]);

  // 2. Fabric Slider Items (First 4 items from actual fabric catalog)
  const fabricItems = useMemo(() => {
    const rawFabrics = (fabrics || []).slice(0, 4).map((f) => ({
      id: f.id,
      badgeEn: `Pure Fabric • ${f.origin || 'Bengal'}`,
      badgeBn: `থান কাপড় • ${f.bengaliName || f.name}`,
      image: f.textureImage,
      titleEn: f.name,
      titleBn: f.bengaliName || f.name,
      descEn: f.description || '',
      descBn: f.bengaliDescription || f.description || '',
      pricePerMeter: f.pricePerMeter,
    }));

    if (rawFabrics.length > 0 && rawFabrics.length < 4) {
      const items = [...rawFabrics];
      let dupIndex = 1;
      while (items.length < 4) {
        for (const f of rawFabrics) {
          items.push({ ...f, id: `${f.id}-dup-${dupIndex++}` });
          if (items.length >= 4) break;
        }
      }
      return items;
    }

    return rawFabrics;
  }, [fabrics]);

  // Active indices for both sliders
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeFabricIndex, setActiveFabricIndex] = useState(0);

  // Hover states to pause auto-scroll when user is interacting
  const [isHoveredProd, setIsHoveredProd] = useState(false);
  const [isHoveredFab, setIsHoveredFab] = useState(false);

  // Touch start coordinates for mobile swipe manual control
  const [touchStartProd, setTouchStartProd] = useState<number | null>(null);
  const [touchStartFab, setTouchStartFab] = useState<number | null>(null);

  // Auto scroll Product Slider every 4s unless hovered
  useEffect(() => {
    if (isHoveredProd) return;
    const timer = setInterval(() => {
      setActiveProductIndex((prev) => (prev + 1) % productItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [productItems.length, isHoveredProd]);

  // Auto scroll Fabric Slider every 4.5s unless hovered
  useEffect(() => {
    if (isHoveredFab) return;
    const timer = setInterval(() => {
      setActiveFabricIndex((prev) => (prev + 1) % fabricItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [fabricItems.length, isHoveredFab]);

  // Swipe handlers for Product Slider
  const handleTouchStartProd = (e: React.TouchEvent) => setTouchStartProd(e.touches[0].clientX);
  const handleTouchEndProd = (e: React.TouchEvent) => {
    if (touchStartProd === null) return;
    const diff = touchStartProd - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) setActiveProductIndex((prev) => (prev + 1) % productItems.length);
      else setActiveProductIndex((prev) => (prev - 1 + productItems.length) % productItems.length);
    }
    setTouchStartProd(null);
  };

  // Swipe handlers for Fabric Slider
  const handleTouchStartFab = (e: React.TouchEvent) => setTouchStartFab(e.touches[0].clientX);
  const handleTouchEndFab = (e: React.TouchEvent) => {
    if (touchStartFab === null) return;
    const diff = touchStartFab - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 35) {
      if (diff > 0) setActiveFabricIndex((prev) => (prev + 1) % fabricItems.length);
      else setActiveFabricIndex((prev) => (prev - 1 + fabricItems.length) % fabricItems.length);
    }
    setTouchStartFab(null);
  };

  // Position helper (-1: Left, 0: Center, 1: Right)
  const getOffset = (index: number, activeIndex: number, total: number) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="bg-[#faf5ed] dark:bg-[#160a0c] transition-colors py-12 sm:py-16 space-y-16 sm:space-y-20 overflow-hidden">
      
      {/* ========================================================
          SECTION 1: READY MADE PRODUCTS SLIDER
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-3 sm:mb-4 space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-200/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 text-xs font-bold">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t('Our New Arrivals • Ready Made', 'আমাদের নতুন আগমনী • রেডিমেড কালেকশন')}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2C221E] dark:text-[#f8ebd7]">
            {t('Ready-Made Apparel & Dresses', 'রেডিমেড ড্রেস ও পোশাক')}
          </h2>
          <p className="text-xs sm:text-sm text-[#5c3e34] dark:text-[#d4bebd]">
            {t(
              'Browse through our new arrivals of nighties, kurtis, traditional wear, and bed sheets.',
              'নাইটি, কুর্তি, ট্র্যাডিশনাল ব্লাউজ এবং বেড শিটের নতুন কালেকশন দেখুন।'
            )}
          </p>
        </div>

        {/* Product Carousel Container (Supports Hover Pause & Touch Swipe) */}
        <div
          onMouseEnter={() => setIsHoveredProd(true)}
          onMouseLeave={() => setIsHoveredProd(false)}
          onTouchStart={handleTouchStartProd}
          onTouchEnd={handleTouchEndProd}
          className="relative max-w-5xl mx-auto min-h-[380px] sm:min-h-[410px] flex items-center justify-center py-2 select-none"
        >
          
          {/* Nav Arrow Buttons (Clean White Tone) */}
          <button
            onClick={() =>
              setActiveProductIndex((prev) => (prev - 1 + productItems.length) % productItems.length)
            }
            className="absolute left-1 sm:left-2 z-30 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-stone-800 dark:bg-stone-800/90 dark:hover:bg-stone-800 dark:text-white shadow-lg backdrop-blur-xs transition active:scale-95 cursor-pointer border-0"
            title={t('Previous Slide', 'পূর্ববর্তী স্লাইড')}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={() =>
              setActiveProductIndex((prev) => (prev + 1) % productItems.length)
            }
            className="absolute right-1 sm:right-2 z-30 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-stone-800 dark:bg-stone-800/90 dark:hover:bg-stone-800 dark:text-white shadow-lg backdrop-blur-xs transition active:scale-95 cursor-pointer border-0"
            title={t('Next Slide', 'পরবর্তী স্লাইড')}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Product Cards Row */}
          <div className="w-full flex items-center justify-center relative h-[360px] sm:h-[390px]">
            {productItems.map((item, index) => {
              const offset = getOffset(index, activeProductIndex, productItems.length);
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              if (!isCenter && !isLeft && !isRight) return null;

              let posClass = '';
              if (isCenter) {
                posClass =
                  'z-20 scale-100 opacity-100 shadow-2xl border-stone-300 dark:border-stone-700 translate-x-0 cursor-default';
              } else if (isLeft) {
                posClass =
                  'z-10 scale-90 sm:scale-95 opacity-65 blur-[1px] -translate-x-[70%] sm:-translate-x-[60%] lg:-translate-x-[55%] cursor-pointer hover:opacity-90 hover:blur-none transition-all';
              } else if (isRight) {
                posClass =
                  'z-10 scale-90 sm:scale-95 opacity-65 blur-[1px] translate-x-[70%] sm:translate-x-[60%] lg:translate-x-[55%] cursor-pointer hover:opacity-90 hover:blur-none transition-all';
              }

              return (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => {
                    if (!isCenter) setActiveProductIndex(index);
                  }}
                  className={`absolute w-[270px] sm:w-[320px] md:w-[340px] transition-all duration-500 ease-out rounded-2xl overflow-hidden bg-white dark:bg-[#201814] border border-[#E2D8CC] dark:border-[#382E28] flex flex-col justify-between ${posClass}`}
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-stone-900">
                    <img
                      src={item.image}
                      alt={t(item.titleEn, item.titleBn)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Tag */}
                    <div className="absolute top-3 left-3 bg-[#2C221E]/90 text-[#F5EFE8] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-xs border border-[#524037]">
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                      <span>{t(item.badgeEn, item.badgeBn)}</span>
                    </div>

                    {/* Price tag (Clean White / Neutral Tone) */}
                    <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 px-2.5 py-1 rounded-md text-xs font-extrabold shadow-sm backdrop-blur-xs">
                      ₹{item.price}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center space-y-1.5">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C221E] dark:text-[#F5EFE8] line-clamp-1">
                      {t(item.titleEn, item.titleBn)}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#6E5D53] dark:text-[#C5B8AC] leading-relaxed line-clamp-2">
                      {t(item.descEn, item.descBn)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 mt-2 sm:mt-4">
          {productItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveProductIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeProductIndex
                  ? 'w-8 bg-stone-800 dark:bg-white'
                  : 'w-2.5 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
              }`}
              title={`Product Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Professional Text Button below Product Slider */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={() => setActiveTab('products')}
            className="group inline-flex items-center gap-2.5 px-3 py-1.5 bg-transparent text-[#801921] hover:text-[#5a1017] dark:text-[#E8D1C5] dark:hover:text-amber-100 font-extrabold text-sm sm:text-base tracking-wide transition-all duration-200 cursor-pointer border-0 hover:underline underline-offset-4"
          >
            <span>
              {t(
                homepageSettings.productSliderButtonText || homepageSettings.sliderButtonText || 'Explore All Products',
                homepageSettings.bengaliProductSliderButtonText || homepageSettings.bengaliSliderButtonText || 'সব রেডিমেড কালেকশন দেখুন'
              )}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-[#801921] dark:text-[#E8D1C5]" />
          </button>
        </div>

      </section>

      {/* ========================================================
          SECTION 2: PURE FABRIC & CUSTOM STITCHING SLIDER
         ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-[#E8DDD0] dark:border-[#2D1E22]">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-3 sm:mb-4 space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-200/80 dark:bg-stone-800/80 text-stone-800 dark:text-stone-200 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>{t('Our New Fabric Arrivals', 'আমাদের নতুন থান কাপড় কালেকশন')}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2C221E] dark:text-[#f8ebd7]">
            {t('Pure Fabric & Custom Tailoring', 'পিওর থান কাপড় ও কাস্টম সেলাই')}
          </h2>
          <p className="text-xs sm:text-sm text-[#5c3e34] dark:text-[#d4bebd]">
            {t(
              'Select premium Murshidabad Silk, Khadi Cotton, Benarasi Brocade & Jamdani fabrics for custom tailored outfits.',
              'পিওর সিল্ক, খাদি সূতি ও জামদানী থান কাপড় বেছে নিন কাস্টম পাঞ্জাবি, ব্লাউজ ও ড্রেস সেলাইয়ের জন্য।'
            )}
          </p>
        </div>

        {/* Fabric Carousel Container (Supports Hover Pause & Touch Swipe) */}
        <div
          onMouseEnter={() => setIsHoveredFab(true)}
          onMouseLeave={() => setIsHoveredFab(false)}
          onTouchStart={handleTouchStartFab}
          onTouchEnd={handleTouchEndFab}
          className="relative max-w-5xl mx-auto min-h-[380px] sm:min-h-[410px] flex items-center justify-center py-2 select-none"
        >
          
          {/* Nav Arrow Buttons (Clean White Tone) */}
          <button
            onClick={() =>
              setActiveFabricIndex((prev) => (prev - 1 + fabricItems.length) % fabricItems.length)
            }
            className="absolute left-1 sm:left-2 z-30 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-stone-800 dark:bg-stone-800/90 dark:hover:bg-stone-800 dark:text-white shadow-lg backdrop-blur-xs transition active:scale-95 cursor-pointer border-0"
            title={t('Previous Fabric', 'পূর্ববর্তী থান কাপড়')}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={() =>
              setActiveFabricIndex((prev) => (prev + 1) % fabricItems.length)
            }
            className="absolute right-1 sm:right-2 z-30 p-2.5 sm:p-3 rounded-full bg-white/90 hover:bg-white text-stone-800 dark:bg-stone-800/90 dark:hover:bg-stone-800 dark:text-white shadow-lg backdrop-blur-xs transition active:scale-95 cursor-pointer border-0"
            title={t('Next Fabric', 'পরবর্তী থান কাপড়')}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Fabric Cards Row */}
          <div className="w-full flex items-center justify-center relative h-[360px] sm:h-[390px]">
            {fabricItems.map((item, index) => {
              const offset = getOffset(index, activeFabricIndex, fabricItems.length);
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              if (!isCenter && !isLeft && !isRight) return null;

              let posClass = '';
              if (isCenter) {
                posClass =
                  'z-20 scale-100 opacity-100 shadow-2xl border-stone-300 dark:border-stone-700 translate-x-0 cursor-default';
              } else if (isLeft) {
                posClass =
                  'z-10 scale-90 sm:scale-95 opacity-65 blur-[1px] -translate-x-[70%] sm:-translate-x-[60%] lg:-translate-x-[55%] cursor-pointer hover:opacity-90 hover:blur-none transition-all';
              } else if (isRight) {
                posClass =
                  'z-10 scale-90 sm:scale-95 opacity-65 blur-[1px] translate-x-[70%] sm:translate-x-[60%] lg:translate-x-[55%] cursor-pointer hover:opacity-90 hover:blur-none transition-all';
              }

              return (
                <div
                  key={`${item.id}-${index}`}
                  onClick={() => {
                    if (!isCenter) setActiveFabricIndex(index);
                  }}
                  className={`absolute w-[270px] sm:w-[320px] md:w-[340px] transition-all duration-500 ease-out rounded-2xl overflow-hidden bg-white dark:bg-[#201814] border border-[#E2D8CC] dark:border-[#382E28] flex flex-col justify-between ${posClass}`}
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-56 overflow-hidden bg-stone-900">
                    <img
                      src={item.image}
                      alt={t(item.titleEn, item.titleBn)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Tag */}
                    <div className="absolute top-3 left-3 bg-[#2C221E]/90 text-[#F5EFE8] px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-xs border border-[#524037]">
                      <Layers className="w-3.5 h-3.5 text-amber-300" />
                      <span>{t(item.badgeEn, item.badgeBn)}</span>
                    </div>

                    {/* Price per meter tag (Clean White / Neutral Tone) */}
                    <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 px-2.5 py-1 rounded-md text-xs font-extrabold shadow-sm backdrop-blur-xs">
                      {String(item.pricePerMeter || '').includes('/')
                        ? formatFabricPrice(item.pricePerMeter)
                        : `${formatFabricPrice(item.pricePerMeter)}/${t('meter', 'মিটার')}`}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-center space-y-1.5">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-[#2C221E] dark:text-[#F5EFE8] line-clamp-1">
                      {t(item.titleEn, item.titleBn)}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#6E5D53] dark:text-[#C5B8AC] leading-relaxed line-clamp-2">
                      {t(item.descEn, item.descBn)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 mt-2 sm:mt-4">
          {fabricItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFabricIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeFabricIndex
                  ? 'w-8 bg-stone-800 dark:bg-white'
                  : 'w-2.5 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400'
              }`}
              title={`Fabric Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Professional Text Button below Fabric Slider */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={() => setActiveTab('fabrics')}
            className="group inline-flex items-center gap-2.5 px-3 py-1.5 bg-transparent text-[#801921] hover:text-[#5a1017] dark:text-[#E8D1C5] dark:hover:text-amber-100 font-extrabold text-sm sm:text-base tracking-wide transition-all duration-200 cursor-pointer border-0 hover:underline underline-offset-4"
          >
            <span>
              {t(
                homepageSettings.fabricSliderButtonText || 'Explore All Fabrics',
                homepageSettings.bengaliFabricSliderButtonText || 'সব থান কাপড় ক্যাটালগ দেখুন'
              )}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-[#801921] dark:text-[#E8D1C5]" />
          </button>
        </div>

      </section>

    </div>
  );
};


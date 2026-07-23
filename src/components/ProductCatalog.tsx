import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SHOP_WHATSAPP_NUMBER } from '../data/mockData';
import { Product } from '../types';
import {
  ShoppingBag,
  Search,
  PhoneCall,
  CalendarCheck,
  XCircle,
  ZoomIn,
} from 'lucide-react';

export const ProductCatalog: React.FC = () => {
  const { products, t } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', labelEn: 'All Collection', labelBn: 'সকল সংগ্রহ' },
    { id: 'nighty', labelEn: 'Nighty', labelBn: 'নাইটি' },
    { id: 'kurti', labelEn: 'Kurti', labelBn: 'কুর্তি' },
    { id: 'traditional', labelEn: 'Traditional', labelBn: 'ট্র্যাডিশনাল' },
    { id: 'bedsheet', labelEn: 'Bed Sheet', labelBn: 'বেড শিট' },
    { id: 'others', labelEn: 'Others', labelBn: 'অন্যান্য' },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.bengaliTitle.includes(searchQuery) ||
      product.fabric.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-12 bg-[#FAF5EE] dark:bg-[#180D0F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EFE7DC] dark:bg-[#251D18] text-[#3D2E28] dark:text-[#E8DDD0] text-xs font-bold border border-[#D8C7B5] dark:border-[#42342C]">
            <ShoppingBag className="w-3.5 h-3.5 text-[#524037] dark:text-[#C5B8AC]" />
            <span>{t('Pal Tailors Ready-Made Collection', 'পাল টেলরস রেডিমেড কালেকশন')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2C221E] dark:text-[#F5EFE8]">
            {t('Ready-To-Wear & Customizable Dresses', 'তৈরি পোশাক ও ইনস্ট্যান্ট বুকিং')}
          </h2>
          <p className="text-sm text-[#6E5D53] dark:text-[#C5B8AC]">
            {t(
              'Select any outfit to book directly or customize with your text instructions over WhatsApp.',
              'যেকোনো পোশাক সহজে বুকিং করুন এবং প্রয়োজনীয় সাইজ বা নোট লিখে সরাসরি অর্ডার করুন।'
            )}
          </p>
        </div>

        {/* Filters & Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-[#EFE7DC]/90 dark:bg-[#221A17] p-4 rounded-2xl border border-[#D8C7B5] dark:border-[#382E28] shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? 'bg-[#3D2E28] text-white shadow-md dark:bg-[#F3EDE2] dark:text-[#2C221E]'
                    : 'bg-[#FFFDF9] dark:bg-[#2A221E] text-[#2C221E] dark:text-[#E8DDD0] hover:bg-[#EFE7DC] dark:hover:bg-[#332A25] border border-[#D8C7B5]/60 dark:border-[#42342C]'
                }`}
              >
                {t(cat.labelEn, cat.labelBn)}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder={t('Search Panjabi, Blouse, Fabric...', 'পাঞ্জাবী, ব্লাউজ খুঁজুন...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#D8C7B5] dark:border-[#382E28] bg-[#FFFDF9] dark:bg-[#161210] text-[#2C221E] dark:text-[#F5EFE8] focus:outline-none focus:ring-2 focus:ring-[#3D2E28]"
            />
          </div>

        </div>

        {/* Product Grid - 2 columns on mobile */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-[#FFFDF9]/60 dark:bg-[#221216]/60 rounded-2xl border border-dashed border-[#E5D8C8] dark:border-[#3D1B22]">
            <p className="text-sm font-semibold text-[#63483E] dark:text-[#D8C3B8]">
              {t('No dresses found matching your search.', 'আপনার অনুসন্ধানের সাথে মিল রেখে কোনো পোশাক পাওয়া যায়নি।')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { openProductBooking, openImageZoom, t } = useApp();
  const isSoldOut = !!product.isSoldOut;

  const handleQuickWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSoldOut) return;
    const message = encodeURIComponent(
      `Hello Pal Tailors! I want to book the ready-made item: *${product.title}* (ID: ${product.id}, Price: ₹${product.price}).`
    );
    window.open(`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div
      className={`group rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isSoldOut
          ? 'bg-stone-100/90 dark:bg-stone-900/70 border-stone-300 dark:border-stone-700 opacity-80'
          : 'bg-[#FFFDF9] dark:bg-[#221216] border-[#E5D8C8] dark:border-[#3D1B22] hover:shadow-xl hover:border-[#801921]/40'
      }`}
    >
      
      {/* Product Image & Badges - Fitted 3:4 Aspect Ratio with Object Top */}
      <div
        onClick={() => openImageZoom(product.image, product.title, product.id, product.additionalImages)}
        className="relative aspect-[3/4] overflow-hidden bg-[#F3E9DD] dark:bg-[#180D0F] cursor-pointer group/img"
        title={t('Click image to view gallery & full size', 'ছবি দেখতে ক্লিক করুন')}
      >
        <img
          key={product.image}
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover object-top transition-transform duration-500 ${
            isSoldOut ? 'grayscale contrast-90 brightness-95 opacity-85' : 'group-hover/img:scale-105'
          }`}
        />

        {/* SOLD OUT Overlay Banner - Crisp & Grayish without Blur */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-stone-900/15 flex items-center justify-center p-3 pointer-events-none z-10">
            <span className="px-3.5 py-1.5 rounded-lg bg-stone-900/90 text-stone-100 font-extrabold text-xs uppercase tracking-widest border border-stone-600 shadow-xl flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-amber-400" />
              <span>{t('SOLD OUT', 'আউট অব স্টক')}</span>
            </span>
          </div>
        )}
        
        {/* Unique Product ID Badge - Warm Professional Tone */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#FFFDF9]/95 dark:bg-[#2A221E]/95 backdrop-blur-md text-[#522917] dark:text-[#E8D3C3] font-mono text-[10px] font-bold tracking-wider border border-[#E0D0C0] dark:border-[#4A3B32] shadow-sm z-10">
          ID: {product.id}
        </div>

        {/* Multiple Photos Badge - Warm Professional Tone */}
        {product.additionalImages && product.additionalImages.filter(Boolean).length > 0 && (
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#FFFDF9]/95 dark:bg-[#2A221E]/95 backdrop-blur-md text-[#522917] dark:text-[#E8D3C3] text-[10px] font-bold flex items-center gap-1 shadow-sm border border-[#E0D0C0] dark:border-[#4A3B32] z-10">
            <span>+{product.additionalImages.filter(Boolean).length + 1} {t('photos', 'ছবি')}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
        
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-start justify-between gap-1.5 sm:gap-2">
            <div>
              <h3
                className={`font-serif text-sm sm:text-lg font-bold leading-tight transition ${
                  isSoldOut
                    ? 'text-stone-500 dark:text-stone-400 line-through'
                    : 'text-[#2C221E] dark:text-[#F5EFE8] group-hover:text-[#524037] dark:group-hover:text-[#E8DDD0]'
                }`}
              >
                {t(product.title, product.bengaliTitle)}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#6E5D53] dark:text-[#C5B8AC] font-bold">
                {t(`Fabric: ${product.fabric}`, `কাপড়: ${product.fabric}`)}
              </p>
            </div>
            
            <div className="text-right flex-shrink-0">
              <span
                className={`text-base sm:text-xl font-extrabold ${
                  isSoldOut ? 'text-stone-400 line-through' : 'text-[#2C221E] dark:text-[#F5EFE8]'
                }`}
              >
                ₹{product.price}
              </span>
              {product.originalPrice && !isSoldOut && (
                <p className="text-[10px] sm:text-xs text-stone-400 line-through">₹{product.originalPrice}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 sm:pt-3 border-t border-[#E2D8CC] dark:border-[#382E28] flex items-center gap-1.5 sm:gap-2">
          {isSoldOut ? (
            <button
              disabled
              className="w-full py-2 px-2 sm:py-2.5 sm:px-3 rounded-xl bg-stone-300 dark:bg-stone-800 text-stone-500 dark:text-stone-400 font-bold text-[10px] sm:text-xs cursor-not-allowed flex items-center justify-center gap-1"
            >
              <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400" />
              <span>{t('Sold Out', 'স্টকে নেই')}</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => openProductBooking(product)}
                className="flex-1 py-2 px-2 sm:py-2.5 sm:px-3 rounded-xl bg-[#3D2E28] hover:bg-[#2A1E1A] dark:bg-[#F3EDE2] dark:hover:bg-white text-white dark:text-[#2C221E] font-bold text-[10px] sm:text-xs shadow-md shadow-[#3D2E28]/10 flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E8DDD0] dark:text-[#2C221E] flex-shrink-0" />
                <span className="truncate">{t('Book / Customise', 'বুক বা কাস্টমাইজ')}</span>
              </button>

              <button
                onClick={handleQuickWhatsApp}
                title={t('Quick Order via WhatsApp', 'সরাসরি হোয়াটসঅ্যাপে বার্তা')}
                className="p-2 sm:p-2.5 rounded-xl bg-[#FFFDF9] dark:bg-[#221A17] hover:bg-[#F2ECE4] dark:hover:bg-[#2D221D] text-[#3D2E28] dark:text-[#E8DDD0] border border-[#D8C7B5] dark:border-[#42342C] transition active:scale-95 shadow-xs flex-shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </>
          )}
        </div>

      </div>

    </div>
  );
};

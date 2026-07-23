import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SHOP_WHATSAPP_NUMBER } from '../data/mockData';
import { Fabric } from '../types';
import {
  Layers,
  PhoneCall,
  Info,
  CalendarCheck,
  XCircle,
  ZoomIn,
} from 'lucide-react';

export const FabricCatalog: React.FC = () => {
  const { fabrics, t } = useApp();

  return (
    <section className="py-12 bg-[#FAF5EE] dark:bg-[#180D0F] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EFE7DC] dark:bg-[#251D18] text-[#3D2E28] dark:text-[#E8DDD0] text-xs font-bold border border-[#D8C7B5] dark:border-[#42342C]">
            <Layers className="w-3.5 h-3.5 text-[#524037] dark:text-[#C5B8AC]" />
            <span>{t('Pure Handloom & Pure Fabrics', 'খাঁটি হ্যান্ডলুম ক্যাটালগ')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2C221E] dark:text-[#F5EFE8]">
            {t('Pure Fabric Catalog & Custom Clothes Stitching', 'পিওর ফ্যাব্রিক ক্যাটালগ ও কাস্টম পোশাক সেলাই')}
          </h2>

          {/* Small Note */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EFE7DC] dark:bg-[#251D18] text-[#3D2E28] dark:text-[#E8DDD0] text-xs sm:text-sm font-bold border border-[#D8C7B5] dark:border-[#42342C] shadow-xs max-w-md mx-auto">
            <Info className="w-4 h-4 text-[#801921] dark:text-amber-400 flex-shrink-0" />
            <span>{t('Note: You can buy the only fabric also', 'বিশেষ দ্রষ্টব্য: আপনি শুধু থান কাপড়ও কিনতে পারেন')}</span>
          </div>
        </div>

        {/* Fabric Cards Grid - 2 columns on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {fabrics.map((fabric) => (
            <FabricCard key={fabric.id} fabric={fabric} />
          ))}
        </div>

      </div>
    </section>
  );
};

const FabricCard: React.FC<{ fabric: Fabric }> = ({ fabric }) => {
  const { openFabricBooking, openImageZoom, t } = useApp();
  const [selectedColor, setSelectedColor] = useState(fabric.colors[0] || 'Default');
  const isSoldOut = !!fabric.isSoldOut;

  const handleCustomOrder = () => {
    if (isSoldOut) return;
    openFabricBooking(fabric);
  };

  const handleDirectWhatsApp = () => {
    if (isSoldOut) return;
    const text = encodeURIComponent(
      `Hello Pal Tailors! I am interested in getting custom clothes made from your fabric: *${fabric.name}* (ID: ${fabric.id}, ${fabric.bengaliName}). Color choice: ${selectedColor}.`
    );
    window.open(`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isSoldOut
          ? 'bg-stone-100/90 dark:bg-stone-900/70 border-stone-300 dark:border-stone-700 opacity-80'
          : 'bg-[#FFFDF9] dark:bg-[#221216] border-[#E5D8C8] dark:border-[#3D1B22] hover:shadow-xl hover:border-[#801921]/40'
      }`}
    >
      
      {/* Texture Image Header */}
      <div
        onClick={() => openImageZoom(fabric.textureImage, fabric.name, fabric.id, fabric.additionalImages)}
        className="relative aspect-[3/4] overflow-hidden bg-[#F3E9DD] dark:bg-[#180D0F] cursor-pointer group/img"
        title={t('Click image to view gallery & full size', 'ছবি দেখতে ক্লিক করুন')}
      >
        <img
          key={fabric.textureImage}
          src={fabric.textureImage}
          alt={fabric.name}
          className={`w-full h-full object-cover object-center transition-transform duration-500 ${
            isSoldOut ? 'grayscale contrast-90 brightness-95 opacity-85' : 'group-hover/img:scale-105'
          }`}
        />

        {/* Sold Out Overlay - Crisp & Grayish without Blur */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-stone-900/15 flex items-center justify-center p-3 pointer-events-none z-10">
            <span className="px-3.5 py-1.5 rounded-lg bg-stone-900/90 text-stone-100 font-extrabold text-xs uppercase tracking-widest border border-stone-600 shadow-xl flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-amber-400" />
              <span>{t('SOLD OUT', 'আউট অব স্টক')}</span>
            </span>
          </div>
        )}

        {/* Unique Fabric ID Badge - Warm Professional Tone */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#FFFDF9]/95 dark:bg-[#2A221E]/95 backdrop-blur-md text-[#522917] dark:text-[#E8D3C3] font-mono text-[10px] font-bold tracking-wider border border-[#E0D0C0] dark:border-[#4A3B32] shadow-sm z-10">
          ID: {fabric.id}
        </div>

        {/* Multiple Photos Badge - Warm Professional Tone */}
        {fabric.additionalImages && fabric.additionalImages.filter(Boolean).length > 0 && (
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#FFFDF9]/95 dark:bg-[#2A221E]/95 backdrop-blur-md text-[#522917] dark:text-[#E8D3C3] text-[10px] font-bold flex items-center gap-1 shadow-sm border border-[#E0D0C0] dark:border-[#4A3B32] z-10">
            <span>+{fabric.additionalImages.filter(Boolean).length + 1} {t('photos', 'ছবি')}</span>
          </div>
        )}
      </div>

      {/* Body Details */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
        
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3
                className={`font-serif text-sm sm:text-lg font-bold leading-tight ${
                  isSoldOut
                    ? 'text-stone-500 dark:text-stone-400 line-through'
                    : 'text-[#2C221E] dark:text-[#F5EFE8]'
                }`}
              >
                {t(fabric.name, fabric.bengaliName)}
              </h3>
              <p className="text-[11px] sm:text-xs font-bold text-[#6E5D53] dark:text-[#C5B8AC]">
                {t(`Fabric: ${fabric.material}`, `কাপড়: ${fabric.material}`)}
              </p>
            </div>
            
            {/* Price Badge */}
            <span className="px-2.5 py-1 rounded-lg bg-[#EFE7DC] dark:bg-[#2A1E1A] text-[#801921] dark:text-amber-300 font-extrabold text-xs sm:text-sm whitespace-nowrap border border-[#D8C7B5] dark:border-[#4A202A] flex-shrink-0">
              ₹{fabric.pricePerMeter || 500}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 sm:pt-3 border-t border-[#E2D8CC] dark:border-[#382E28] flex items-center gap-1.5 sm:gap-2">
          {isSoldOut ? (
            <button
              disabled
              className="w-full py-2 px-2 sm:py-2.5 sm:px-3 rounded-xl bg-stone-300 dark:bg-stone-800 text-stone-500 dark:text-stone-400 font-bold text-[10px] sm:text-xs cursor-not-allowed flex items-center justify-center gap-1"
            >
              <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400 flex-shrink-0" />
              <span>{t('Sold Out', 'স্টকে নেই')}</span>
            </button>
          ) : (
            <>
              <button
                onClick={handleCustomOrder}
                className="flex-1 min-w-0 py-2 px-1.5 sm:py-2.5 sm:px-3 rounded-xl bg-[#3D2E28] hover:bg-[#2A1E1A] dark:bg-[#F3EDE2] dark:hover:bg-white text-white dark:text-[#2C221E] font-bold text-[10px] sm:text-xs shadow-md shadow-[#3D2E28]/10 flex items-center justify-center gap-1 sm:gap-1.5 transition active:scale-95 cursor-pointer"
              >
                <CalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E8DDD0] dark:text-[#2C221E] flex-shrink-0" />
                <span className="truncate whitespace-nowrap">{t('Book / Customise', 'বুক বা কাস্টমাইজ')}</span>
              </button>

              <button
                onClick={handleDirectWhatsApp}
                title={t('Order Fabric via WhatsApp', 'হোয়াটসঅ্যাপে বুকিং')}
                className="p-2 sm:p-2.5 rounded-xl bg-[#FFFDF9] dark:bg-[#221A17] hover:bg-[#F2ECE4] dark:hover:bg-[#2D221D] text-[#3D2E28] dark:text-[#E8DDD0] border border-[#D8C7B5] dark:border-[#42342C] transition active:scale-95 shadow-xs flex-shrink-0 flex items-center justify-center cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              </button>
            </>
          )}
        </div>

      </div>

    </div>
  );
};

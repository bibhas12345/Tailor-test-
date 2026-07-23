import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, MessageCircle, MapPin, Sparkles, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { homepageSettings, t } = useApp();

  const handleCall = () => {
    const rawPhone = homepageSettings.phone.replace(/[^0-9+]/g, '');
    window.location.href = `tel:${rawPhone || '8116957329'}`;
  };

  const handleChat = () => {
    const rawWa = (homepageSettings.whatsapp || homepageSettings.phone).replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      'Hello Pal Tailors! I would like to inquire about stitching / ordering clothes.'
    );
    window.open(`https://wa.me/${rawWa || '918116957329'}?text=${message}`, '_blank');
  };

  return (
    <section className="bg-[#FAF6F0] dark:bg-[#180C0F] text-[#2C1719] dark:text-[#F7EBE8] border-b border-[#E8DCCF] dark:border-[#2D1418] py-6 sm:py-10 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Main Hero Card with Dark Overlay and Embedded Text */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-[#D8C7B5] dark:border-[#382E28] shadow-2xl bg-[#1A1210] group">
          {/* Background Image */}
          <img
            src={homepageSettings.heroImage}
            alt={homepageSettings.title}
            className="w-full h-80 sm:h-[400px] md:h-[450px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          
          {/* Dark Overlay for High Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/65 to-stone-950/40" />

          {/* Top Visit Invitation Badge */}
          <div className="absolute top-4 left-4 z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/85 text-[#E8DDD0] border border-[#524037] text-xs font-semibold backdrop-blur-md shadow-md">
              <span>{t('Please visit us for the best experience', 'সেরা সেলাই অভিজ্ঞতার জন্য আমাদের শোরুমে আসুন')}</span>
            </div>
          </div>

          {/* Center / Bottom Embedded Hero Text */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8 md:p-10 text-center flex flex-col items-center justify-end space-y-2 sm:space-y-3">
            
            {/* Title / Main Header inside photo */}
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-lg leading-tight max-w-3xl">
              {t(homepageSettings.imageTagline, homepageSettings.bengaliImageTagline)}
            </h1>

            {/* Sub-description inside photo */}
            <p className="text-xs sm:text-sm md:text-base text-amber-100/90 font-medium leading-relaxed max-w-2xl drop-shadow-md">
              {t(homepageSettings.tagline, homepageSettings.bengaliTagline)}
            </p>

          </div>
        </div>

        {/* Side-by-Side Call Us & Chat Us Buttons under Photo */}
        <div className="max-w-2xl mx-auto grid grid-cols-2 gap-3 sm:gap-4 pt-1">
          <button
            onClick={handleCall}
            className="w-full py-3.5 px-3 sm:px-6 rounded-xl bg-[#3D2E28] hover:bg-[#2A1E1A] dark:bg-[#F3EDE2] dark:hover:bg-white text-white dark:text-[#2C221E] font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8DDD0] dark:text-[#2C221E] flex-shrink-0" />
            <span className="truncate">{t('Call Us', 'কল করুন')}</span>
          </button>

          <button
            onClick={handleChat}
            className="w-full py-3.5 px-3 sm:px-6 rounded-xl bg-[#FFFDF9] dark:bg-[#221A17] hover:bg-[#F2ECE4] dark:hover:bg-[#2D221D] text-[#3D2E28] dark:text-[#E8DDD0] font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition border border-[#D8C7B5] dark:border-[#42342C] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#3D2E28] dark:text-[#E8DDD0] flex-shrink-0" />
            <span className="truncate">{t('Chat Us (WhatsApp)', 'হোয়াটসঅ্যাপ চ্যাট')}</span>
          </button>
        </div>

        {/* Address & Location Banner */}
        <div className="pt-2 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EFE7DC] dark:bg-[#221A17] border border-[#D8C7B5] dark:border-[#42342C] text-[#2C221E] dark:text-[#E8DDD0] text-xs sm:text-sm text-center font-medium shadow-xs">
            <MapPin className="w-4 h-4 text-[#524037] dark:text-[#C5B8AC] flex-shrink-0" />
            <span>{homepageSettings.address}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

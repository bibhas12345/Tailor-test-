import React from 'react';
import { useApp } from '../context/AppContext';
import { Scissors, PhoneCall, MapPin, Heart, CalendarCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { homepageSettings, setActiveTab, t } = useApp();

  const rawPhone = homepageSettings.phone;
  const rawWa = homepageSettings.whatsapp.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#2A1E1A] dark:bg-[#140D0B] text-[#F5EFE8] border-t border-[#3D2E28] pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#3D2E28] text-[#E8DDD0] flex items-center justify-center border border-[#524037]">
                <Scissors className="w-5 h-5 rotate-45 text-[#E8DDD0]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                {t(homepageSettings.title, homepageSettings.bengaliTitle)}
              </span>
            </div>
            <p className="text-xs text-[#C5B8AC] leading-relaxed">
              {t(homepageSettings.tagline, homepageSettings.bengaliTagline)}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              {t('Quick Navigation', 'দ্রুত লিংক')}
            </h4>
            <ul className="space-y-2 text-xs text-[#C5B8AC]">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-[#E8DDD0] transition cursor-pointer">
                  {t('Home', 'হোম')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('products')} className="hover:text-[#E8DDD0] transition cursor-pointer">
                  {t('Ready-Made Collection', 'রেডিমেড পোশাক')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('fabrics')} className="hover:text-[#E8DDD0] transition cursor-pointer">
                  {t('Pure Fabric Catalog', 'ফ্যাব্রিক ক্যাটালগ')}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('contact')} className="hover:text-[#E8DDD0] transition cursor-pointer">
                  {t('Shop & Contact', 'যোগাযোগ ও ঠিকানা')}
                </button>
              </li>
            </ul>
          </div>

          {/* Custom Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              {t('Custom Services', 'আমাদের সেবাসমূহ')}
            </h4>
            <ul className="space-y-2 text-xs text-[#C5B8AC]">
              <li>• {t('Nighty & Kurti Stitching', 'নাইটি ও কুর্তি কাস্টম সেলাই')}</li>
              <li>• {t('Traditional Wear & Saree Blouse', 'ট্র্যাডিশনাল পোশাক ও ব্লাউজ')}</li>
              <li>• {t('Bed Sheets & Home Textiles', 'বেড শিট ও ডেকোর সেলাই')}</li>
              <li>• {t('Bespoke Fitting & Doorstep Visit', 'ডোরস্টেপ মাপ ও নিখুঁত ফিটিং')}</li>
            </ul>
          </div>

          {/* Direct WhatsApp Box */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              {t('Contact & Booking', 'বুকিং ও যোগাযোগ')}
            </h4>
            <div className="text-xs text-[#C5B8AC] space-y-1">
              <p className="flex items-center gap-1.5 font-bold text-white">
                <PhoneCall className="w-4 h-4 text-[#E8DDD0]" />
                <span>{t('WhatsApp & Direct Booking', 'হোয়াটসঅ্যাপ ও সরাসরি বুকিং')}</span>
              </p>
              <p className="flex items-start gap-1.5 pt-1">
                <MapPin className="w-4 h-4 text-[#E8DDD0] flex-shrink-0 mt-0.5" />
                <span>{homepageSettings.address}</span>
              </p>
            </div>
            <a
              href={`https://wa.me/${rawWa || '918116957329'}?text=${encodeURIComponent(
                'Hello Pal Tailors! I would like to make an inquiry.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFFDF9] dark:bg-[#F3EDE2] hover:bg-[#F2ECE4] text-[#3D2E28] font-bold text-xs shadow-md transition cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#3D2E28]" />
              <span>{t('Instant WhatsApp Chat', 'সরাসরি হোয়াটসঅ্যাপ করুন')}</span>
            </a>
          </div>

        </div>

        {/* Bottom copyright & Craft info */}
        <div className="pt-6 border-t border-[#3D2E28] flex flex-col sm:flex-row items-center justify-between text-xs text-[#C5B8AC] gap-3">
          <p>
            © 1984 - 2026 {homepageSettings.title}. {t('All Rights Reserved.', 'সর্বস্বত্ব সংরক্ষিত।')}
          </p>

          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1">
              <span>{t('Crafted with', 'ঐতিহ্যের সযাত্নে তৈরি')}</span>
              <Heart className="w-3.5 h-3.5 text-[#E8DDD0] fill-[#E8DDD0] inline" />
              <span>{t('in Bankura, West Bengal', 'বাঁকুড়া, পশ্চিমবঙ্গ')}</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};


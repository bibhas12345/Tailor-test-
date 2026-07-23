import React from 'react';
import { useApp } from '../context/AppContext';
import {
  SHOP_DISPLAY_PHONE,
  SHOP_WHATSAPP_NUMBER,
  SHOP_LOCATION,
} from '../data/mockData';
import {
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  CheckCircle2,
  Scissors,
  ShieldCheck,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { homepageSettings, t } = useApp();

  const defaultCraftPhotos = [
    {
      id: '1',
      title: 'Blouse Stitching',
      bengaliTitle: 'ব্লাউজ সেলাই',
      subtitle: 'Custom neck & fit',
      bengaliSubtitle: 'কাস্টম ডিজাইন ও ফিটিং',
      imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '2',
      title: 'Making Clothes',
      bengaliTitle: 'পোশাক তৈরি',
      subtitle: 'Kurti, Nighty & Dresses',
      bengaliSubtitle: 'কুর্তি, নাইটি ও ড্রেস',
      imageUrl: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '3',
      title: 'Side Stitching',
      bengaliTitle: 'সাইড সেলাই',
      subtitle: 'Seam finish & alteration',
      bengaliSubtitle: 'পারফেক্ট সাইড ফিটিং',
      imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const craftPhotos = (homepageSettings.craftPhotos && homepageSettings.craftPhotos.length > 0)
    ? homepageSettings.craftPhotos
    : defaultCraftPhotos;

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent(
      'Hello Pal Tailors! I want to visit your shop or inquire about dress stitching.'
    );
    window.open(`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <section className="py-12 bg-[#FAF6F0] dark:bg-[#181210] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EFE7DC] dark:bg-[#251D18] text-[#3D2E28] dark:text-[#E8DDD0] text-xs font-bold border border-[#D8C7B5] dark:border-[#42342C]">
            <MapPin className="w-3.5 h-3.5 text-[#524037] dark:text-[#C5B8AC]" />
            <span>{t('Shop Location & Contact', 'যোগাযোগ ও দোকানের ঠিকানা')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2C221E] dark:text-[#F5EFE8]">
            {t('Visit Pal Tailors or Message Us Directly', 'পাল টেলরসে আসুন অথবা সরাসরি হোয়াটসঅ্যাপ করুন')}
          </h2>
          <p className="text-sm text-[#6E5D53] dark:text-[#C5B8AC]">
            {t(
              'Located at Matgoda (main road), Raipur, Bankura. Send us your dress idea on WhatsApp or drop by for custom fittings.',
              'ম্যাটগোডা (মেন রোড), রায়পুর, বাঁকুড়ায় আমাদের শোরুম ও কাস্টম দরজিালয়। যেকোনো সময় হোয়াটসঅ্যাপে যোগাযোগ করুন।'
            )}
          </p>
        </div>

        {/* Tailoring Craft Demo Photos Grid - 3 items in a single row */}
        <div className="max-w-4xl mx-auto mb-10 grid grid-cols-3 gap-3 sm:gap-5">
          {craftPhotos.map((photo) => (
            <div key={photo.id} className="group relative rounded-xl overflow-hidden bg-[#EFE7DC] dark:bg-[#221714] border border-[#D8C7B5] dark:border-[#382E28] shadow-sm hover:shadow-md transition">
              <div className="aspect-square sm:aspect-4/3 overflow-hidden bg-stone-200">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-2.5 text-center bg-[#FAF6F0] dark:bg-[#1D1412] border-t border-[#D8C7B5] dark:border-[#382E28]">
                <span className="font-bold text-xs sm:text-sm text-[#2C221E] dark:text-[#E8DDD0] block truncate">
                  {t(photo.title, photo.bengaliTitle)}
                </span>
                <span className="text-[10px] sm:text-xs text-[#6E5D53] dark:text-[#C5B8AC] block truncate">
                  {t(photo.subtitle, photo.bengaliSubtitle)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Shop Details Card - Warm Deep Bridge Tone */}
          <div className="bg-[#3D2E28] text-[#F5EFE8] p-6 sm:p-8 rounded-2xl shadow-xl border border-[#524037] flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#2A1E1A] text-[#E8DDD0] flex items-center justify-center border border-[#524037] shadow-xs flex-shrink-0">
                  <Scissors className="w-6 h-6 rotate-45 text-[#E8DDD0]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold tracking-tight">
                    {t('Pal Tailors', 'পাল টেলরস')}
                  </h3>
                  <p className="text-xs text-[#C5B8AC]">
                    {t('Master Tailoring House • Estd. 1984', 'ঐতিহ্যবাহী কাস্টম দরজিালয় • স্থাপিত ১৯৮৪')}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#524037] text-xs sm:text-sm text-[#F5EFE8]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E8DDD0] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#E8DDD0]">{t('Address:', 'ঠিকানা:')}</span>
                    <span>{SHOP_LOCATION}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#E8DDD0] flex-shrink-0" />
                  <div>
                    <span className="font-bold block text-[#E8DDD0]">{t('Mobile & WhatsApp:', 'ফোন ও হোয়াটসঅ্যাপ:')}</span>
                    <a
                      href={`tel:${SHOP_DISPLAY_PHONE.replace(/\s+/g, '')}`}
                      className="font-bold text-sm text-white underline underline-offset-2"
                    >
                      {t('Connect via Call / WhatsApp', 'কল ও হোয়াটসঅ্যাপে যোগাযোগ করুন')}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#E8DDD0] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-[#E8DDD0]">{t('Shop Opening Hours:', 'দোকান খোলা থাকার সময়:')}</span>
                    <span>{t('Monday - Saturday: 10:00 AM - 9:00 PM', 'সোম - শনি: সকাল ১০টা - রাত ৯টা')}</span>
                    <br />
                    <span>{t('Sunday: 11:00 AM - 6:00 PM', 'রবিবার: সকাল ১১টা - সন্ধ্যা ৬টা')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Call CTA */}
            <div className="pt-4 border-t border-[#524037]">
              <button
                onClick={handleWhatsAppChat}
                className="w-full py-3.5 px-6 rounded-xl bg-[#FFFDF9] dark:bg-[#F3EDE2] hover:bg-[#F2ECE4] text-[#3D2E28] font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-[#3D2E28]" />
                <span>{t('Chat Directly on WhatsApp', 'হোয়াটসঅ্যাপে চ্যাট করুন')}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Layers, ArrowRight } from 'lucide-react';

export const HomeTwoCardsSection: React.FC = () => {
  const { homepageSettings, setActiveTab, t } = useApp();

  const productImg = homepageSettings.frontProductImage || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80';
  const fabricImg = homepageSettings.frontFabricImage || 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80';

  return (
    <section className="py-12 sm:py-16 bg-[#faf5ed] dark:bg-[#160a0c] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#42151a] dark:text-[#f8ebd7]">
            {t('Explore Our Offerings', 'আমাদের কালেকশন ও সার্ভিস')}
          </h2>
          <p className="text-xs sm:text-sm text-[#5c3e34] dark:text-[#d4bebd]">
            {t(
              'Select ready-to-wear attire or choose pure fabrics to tailor custom clothing.',
              'রেডিমেড পোশাক দেখুন অথবা পছন্দসই কাপড়ে কাস্টম ড্রেস তৈরি করান।'
            )}
          </p>
        </div>

        {/* 2 Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Card 1: Ready Made Products */}
          <div className="group rounded-2xl overflow-hidden bg-white dark:bg-[#201814] border border-[#E2D8CC] dark:border-[#382E28] shadow-md hover:shadow-2xl transition duration-300 flex flex-col">
            <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-100">
              <img
                src={productImg}
                alt="Ready Made Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-[#2C221E]/90 text-[#F5EFE8] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs border border-[#524037]">
                <ShoppingBag className="w-3.5 h-3.5 text-[#E8DDD0]" />
                <span>{t('Ready Made', 'রেডিমেড কালেকশন')}</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#2C221E] dark:text-[#F5EFE8]">
                  {t('Ready Collection', 'তৈরি পোশাক ও কালেকশন')}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E5D53] dark:text-[#C5B8AC] leading-relaxed">
                  {t(
                    'Explore Nighty, Kurti, Traditional Wear, Bed Sheets, and custom textile collections ready for instant order.',
                    'নাইটি, কুর্তি, ট্র্যাডিশনাল পোশাক, বেড শিট এবং অন্যান্য কালেকশন দেখে পছন্দ করুন।'
                  )}
                </p>
              </div>

              <button
                onClick={() => setActiveTab('products')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#801921] hover:text-[#a0202a] dark:text-[#E88C96] dark:hover:text-[#f2a7b0] transition-colors group/btn cursor-pointer self-start py-1"
              >
                <span>{t('Explore More', 'আরও দেখুন')}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 2: Fabric Collection */}
          <div className="group rounded-2xl overflow-hidden bg-white dark:bg-[#201814] border border-[#E2D8CC] dark:border-[#382E28] shadow-md hover:shadow-2xl transition duration-300 flex flex-col">
            <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-100">
              <img
                src={fabricImg}
                alt="Fabric Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 bg-[#2C221E]/90 text-[#F5EFE8] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 backdrop-blur-xs border border-[#524037]">
                <Layers className="w-3.5 h-3.5 text-[#E8DDD0]" />
                <span>{t('Pure Fabric & Custom Stitching', 'ফ্যাব্রিক ও কাস্টম সেলাই')}</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-[#2C221E] dark:text-[#F5EFE8]">
                  {t('Fabric Catalog & Custom Dress', 'ফ্যাব্রিক ক্যাটালগ ও সেলাই')}
                </h3>
                <p className="text-xs sm:text-sm text-[#6E5D53] dark:text-[#C5B8AC] leading-relaxed">
                  {t(
                    'Choose from pure Murshidabad Silk, Khadi Cotton, or Alpine Cotton to stitch custom clothing or purchase fabric directly.',
                    'আমাদের থেকে সেরা পিওর থান কাপড় পছন্দ করুন — কাস্টম পোশাক সেলাই বা সরাসরি থান কাপড় ক্রয়ের সুবিধা।'
                  )}
                </p>
              </div>

              <button
                onClick={() => setActiveTab('fabrics')}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#801921] hover:text-[#a0202a] dark:text-[#E88C96] dark:hover:text-[#f2a7b0] transition-colors group/btn cursor-pointer self-start py-1"
              >
                <span>{t('Explore More', 'আরও দেখুন')}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

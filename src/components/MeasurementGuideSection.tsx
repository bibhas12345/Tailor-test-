import React from 'react';
import { useApp } from '../context/AppContext';
import { Ruler, MapPin, CheckCircle, Scissors, PhoneCall, HelpCircle } from 'lucide-react';
import { SHOP_WHATSAPP_NUMBER } from '../data/mockData';

export const MeasurementGuideSection: React.FC = () => {
  const { openCustomGarmentBooking, t } = useApp();

  const handleDoorstepRequest = () => {
    openCustomGarmentBooking({
      id: 'doorstep_req',
      name: 'Doorstep Measurement Visit Request',
      bengaliName: 'ডোরস্টেপ কারিগর সেলাই ও মাপের অনুরোধ',
      category: 'men',
      baseStitchingCharge: 0,
      estimatedDays: 3,
      defaultMetersNeeded: 1,
      necklineOptions: [],
      sleeveOptions: [],
      embroideryOptions: [],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    });
  };

  const guides = [
    {
      title: 'Bengali Panjabi & Kurta Measurement',
      bengaliTitle: 'পাঞ্জাবী ও কুর্তার সঠিক মাপ',
      steps: [
        'Chest (ছাতি): Measure around the fullest part of chest keeping 1 finger under tape.',
        'Length (ঝুল): From shoulder top near collar down to knees (usually 40" - 44").',
        'Shoulder (কাঁধ): From outer edge of left shoulder bone straight to right shoulder bone.',
        'Sleeve (হাতা): From shoulder point down to wrist bone.',
      ],
    },
    {
      title: 'Saree Blouse & Designer Top Measurement',
      bengaliTitle: 'শাড়ির ব্লাউজের নিখুঁত মাপ',
      steps: [
        'Bust / Upper Chest: Around fullest bust line with standard undergarments.',
        'Underbust / Blouse Length: Around waistline where blouse ends (usually 13" - 15").',
        'Armhole (বগলের বেড়): Circular measurement around shoulder-arm joint.',
        'Front & Back Neck Depth: Diagonal length from shoulder seam to desired neck depth.',
      ],
    },
    {
      title: 'Formal Suit & Sherwani Measurement',
      bengaliTitle: 'ফরমাল স্যুট ও শেরওয়ানির মাপ',
      steps: [
        'Chest & Waist: Natural waistline and full chest with relaxed breathing.',
        'Inseam & Trouser Length: From crotch seam down to shoe ankle level.',
        'Neck Band (পটি কলার): Collar size measurement around base of neck.',
      ],
    },
  ];

  return (
    <section className="py-12 bg-[#FAF6F0] dark:bg-[#181210] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE7DC] dark:bg-[#251D18] text-[#3D2E28] dark:text-[#E8DDD0] text-xs font-bold border border-[#D8C7B5] dark:border-[#42342C]">
            <Ruler className="w-3.5 h-3.5 text-[#524037] dark:text-[#C5B8AC]" />
            <span>{t('Precision Tailoring Fits', 'সঠিক মাপের সহায়িকা')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2C221E] dark:text-[#F5EFE8]">
            {t('How To Take Accurate Dress Measurements', 'কীভাবে সঠিক মাপ নেবেন বা দিবেন')}
          </h2>
          <p className="text-sm text-[#6E5D53] dark:text-[#C5B8AC]">
            {t(
              'Follow our simple guide or request our master tailor to visit your doorstep for physical measurement!',
              'আমাদের সহজ নির্দেশিকা দেখে নিন অথবা আমাদের দরজি মাস্টারকে আপনার বাড়িতে মাপ নেওয়ার জন্য বুক করুন।'
            )}
          </p>
        </div>

        {/* Doorstep Feature Callout Banner */}
        <div className="mb-10 bg-[#3D2E28] text-[#F5EFE8] p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#524037]">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded bg-[#2A1E1A] text-[#E8DDD0]">
              {t('SPECIAL DOORSTEP SERVICE', 'ডোরস্টেপ সার্ভিস')}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              {t('Doorstep Master Tailor Measurement', 'হোম ভিজিট ও ডোরস্টেপ দরজি সার্ভিস')}
            </h3>
            <p className="text-xs text-[#C5B8AC] max-w-xl">
              {t(
                'Don’t have a measuring tape? Our experienced karigar will visit your residence, bring fabric samples, take measurements, and deliver your finished outfit!',
                'আপনার কাছে ফিতা নেই? আমাদের অভিজ্ঞ কারিগর কাপড়ের স্যাম্পল সহ আপনার বাড়ি গিয়ে নিখুঁত মাপ নিয়ে আসবে এবং তৈরি ড্রেস পৌঁছে দেবে।'
              )}
            </p>
          </div>

          <button
            onClick={handleDoorstepRequest}
            className="px-6 py-3.5 rounded-xl bg-[#FFFDF9] dark:bg-[#F3EDE2] hover:bg-[#F2ECE4] text-[#3D2E28] font-bold text-xs shadow-lg flex items-center gap-2 whitespace-nowrap transition active:scale-95 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#3D2E28]" />
            <span>{t('Book Doorstep Karigar Visit', 'ডোরস্টেপ কারিগর বুক করুন')}</span>
          </button>
        </div>

        {/* Guides Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((g, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#201814] p-6 rounded-2xl border border-[#E2D8CC] dark:border-[#382E28] shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFE7DC] dark:bg-[#251D18] text-[#3D2E28] dark:text-[#E8DDD0] flex items-center justify-center font-bold text-base border border-[#D8C7B5] dark:border-[#42342C]">
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#2C221E] dark:text-[#F5EFE8] text-base">
                    {t(g.title, g.bengaliTitle)}
                  </h3>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-[#6E5D53] dark:text-[#C5B8AC]">
                {g.steps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#524037] dark:text-[#C5B8AC] flex-shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, Heart } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const { t } = useApp();

  return (
    <section className="py-12 bg-[#FAF6F0] dark:bg-[#181210] transition-colors border-t border-[#E2D8CC] dark:border-[#382E28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EFE7DC] dark:bg-[#251D18] text-[#3D2E28] dark:text-[#E8DDD0] text-xs font-bold border border-[#D8C7B5] dark:border-[#42342C]">
            <Heart className="w-3.5 h-3.5 text-[#524037] fill-[#524037] dark:text-[#C5B8AC] dark:fill-[#C5B8AC]" />
            <span>{t('Client Love & Word of Mouth', 'গ্রাহকদের শুভকামনা ও মতামত')}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2C221E] dark:text-[#F5EFE8]">
            {t('What Our Valued Clients Say', 'পাল টেলরস সম্পর্কে আমাদের প্রিয় গ্রাহকদের কথা')}
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white dark:bg-[#201814] p-6 rounded-2xl border border-[#E2D8CC] dark:border-[#382E28] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#524037]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#3D2E28] text-[#3D2E28] dark:fill-[#E8DDD0] dark:text-[#E8DDD0]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#D8C7B5] dark:text-[#42342C]" />
                </div>

                <p className="text-xs text-[#6E5D53] dark:text-[#C5B8AC] leading-relaxed italic">
                  "{t(rev.comment, rev.comment)}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#EFE7DC] dark:border-[#382E28]">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#D8C7B5]"
                />
                <div>
                  <h4 className="font-bold text-xs text-[#2C221E] dark:text-[#F5EFE8]">
                    {rev.name}
                  </h4>
                  <p className="text-[10px] text-[#8C7A6B] dark:text-[#A8988B]">
                    {rev.location} • {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

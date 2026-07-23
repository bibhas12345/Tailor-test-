import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GARMENT_OPTIONS, FABRICS_DATA, SHOP_WHATSAPP_NUMBER } from '../data/mockData';
import { GarmentOption, Fabric } from '../types';
import {
  Sparkles,
  Scissors,
  CheckCircle2,
  Layers,
  Ruler,
  Send,
  HelpCircle,
  PhoneCall,
} from 'lucide-react';

export const CustomSuitBuilder: React.FC = () => {
  const { openCustomGarmentBooking, t } = useApp();

  const [selectedGarment, setSelectedGarment] = useState<GarmentOption>(GARMENT_OPTIONS[0]);
  const [selectedFabric, setSelectedFabric] = useState<Fabric>(FABRICS_DATA[0]);
  const [fabricMeters, setFabricMeters] = useState<number>(GARMENT_OPTIONS[0].defaultMetersNeeded);
  
  const [selectedNeckline, setSelectedNeckline] = useState<string>(
    GARMENT_OPTIONS[0].necklineOptions[0] || ''
  );
  const [selectedSleeve, setSelectedSleeve] = useState<string>(
    GARMENT_OPTIONS[0].sleeveOptions[0] || ''
  );
  const [selectedEmbroideryId, setSelectedEmbroideryId] = useState<string>(
    GARMENT_OPTIONS[0].embroideryOptions[0]?.id || 'emb_none'
  );

  const handleGarmentChange = (garment: GarmentOption) => {
    setSelectedGarment(garment);
    setFabricMeters(garment.defaultMetersNeeded);
    if (garment.necklineOptions.length > 0) setSelectedNeckline(garment.necklineOptions[0]);
    if (garment.sleeveOptions.length > 0) setSelectedSleeve(garment.sleeveOptions[0]);
    if (garment.embroideryOptions.length > 0) setSelectedEmbroideryId(garment.embroideryOptions[0].id);
  };

  // Pricing calculations
  const fabricCost = selectedFabric.pricePerMeter * fabricMeters;
  const stitchingLabor = selectedGarment.baseStitchingCharge;
  const selectedEmb = selectedGarment.embroideryOptions.find((e) => e.id === selectedEmbroideryId);
  const embroideryCost = selectedEmb ? selectedEmb.price : 0;
  const totalEstimatedCost = fabricCost + stitchingLabor + embroideryCost;

  const handleLaunchBookingModal = () => {
    openCustomGarmentBooking(selectedGarment, selectedFabric);
  };

  return (
    <section className="py-12 bg-[#FAF6F0] dark:bg-[#181210] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE7DC] dark:bg-[#251D18] text-[#3D2E28] dark:text-[#E8DDD0] text-xs font-bold border border-[#D8C7B5] dark:border-[#42342C]">
            <Sparkles className="w-3.5 h-3.5 text-[#524037] dark:text-[#C5B8AC]" />
            <span>{t('Pal Tailors Custom Studio', 'পাল টেলরস কাস্টম স্টুডিও')}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2C221E] dark:text-[#F5EFE8]">
            {t('Interactive Bespoke Dress Maker', 'ইন্টারেক্টিভ কাস্টম ড্রেস বিল্ডার')}
          </h2>
          <p className="text-sm text-[#6E5D53] dark:text-[#C5B8AC]">
            {t(
              'Select dress type, fabric material, neck cuts, sleeves, and traditional Bengali embroidery to estimate cost and book over WhatsApp!',
              'পোশাকের ধরন, কাপড়, কলার বা গলার কাটিং, হাতা এবং এমব্রয়ডারি নির্বাচন করুন। সঙ্গে সঙ্গে আনুমানিক খরচ দেখুন ও অর্ডার করুন।'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Customization Controls */}
          <div className="lg:col-span-8 space-y-8 bg-white dark:bg-[#201814] p-6 rounded-2xl border border-[#E2D8CC] dark:border-[#382E28] shadow-md">
            
            {/* Step 1: Select Garment Category */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#3D2E28] dark:text-[#E8DDD0] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3D2E28] text-white dark:bg-[#F3EDE2] dark:text-[#2C221E] text-xs flex items-center justify-center font-bold">1</span>
                <span>{t('Choose Dress Type', 'পোশাকের ধরন নির্বাচন করুন')}</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {GARMENT_OPTIONS.map((garment) => {
                  const isSelected = selectedGarment.id === garment.id;
                  return (
                    <button
                      key={garment.id}
                      type="button"
                      onClick={() => handleGarmentChange(garment)}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'border-[#3D2E28] bg-[#EFE7DC] dark:bg-[#2F241F] ring-2 ring-[#3D2E28]'
                          : 'border-[#D8C7B5] dark:border-[#382E28] hover:bg-[#FAF6F0] dark:hover:bg-[#251D18]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={garment.image}
                          alt={garment.name}
                          className="w-10 h-10 rounded-lg object-cover border border-[#D8C7B5]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-[#2C221E] dark:text-[#F5EFE8] truncate">
                            {t(garment.name, garment.bengaliName)}
                          </p>
                          <p className="text-[10px] text-[#6E5D53] dark:text-[#C5B8AC] font-semibold">
                            {t(`Stitching: ₹${garment.baseStitchingCharge}`, `সেলাই চার্জ: ₹${garment.baseStitchingCharge}`)}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Fabric Material */}
            <div className="space-y-3 pt-6 border-t border-[#E2D8CC] dark:border-[#382E28]">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#3D2E28] dark:text-[#E8DDD0] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#3D2E28] text-white dark:bg-[#F3EDE2] dark:text-[#2C221E] text-xs flex items-center justify-center font-bold">2</span>
                  <span>{t('Choose Fabric Material', 'কাপড় নির্বাচন করুন')}</span>
                </h3>
                
                {/* Meters counter */}
                <div className="flex items-center gap-2 text-xs font-bold text-[#2C221E] dark:text-[#F5EFE8] bg-[#EFE7DC] dark:bg-[#2A221E] px-3 py-1 rounded-lg border border-[#D8C7B5] dark:border-[#42342C]">
                  <span>{t('Meters Needed:', 'মিটার:')}</span>
                  <button
                    onClick={() => setFabricMeters(Math.max(1, fabricMeters - 0.5))}
                    className="w-5 h-5 rounded bg-white dark:bg-[#161210] flex items-center justify-center text-xs font-bold border border-[#D8C7B5]"
                  >
                    -
                  </button>
                  <span>{fabricMeters}m</span>
                  <button
                    onClick={() => setFabricMeters(fabricMeters + 0.5)}
                    className="w-5 h-5 rounded bg-white dark:bg-[#161210] flex items-center justify-center text-xs font-bold border border-[#D8C7B5]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {FABRICS_DATA.map((fab) => {
                  const isSelected = selectedFabric.id === fab.id;
                  return (
                    <button
                      key={fab.id}
                      type="button"
                      onClick={() => setSelectedFabric(fab)}
                      className={`p-3 rounded-xl border text-left transition ${
                        isSelected
                          ? 'border-[#3D2E28] bg-[#EFE7DC] dark:bg-[#2F241F] ring-2 ring-[#3D2E28]'
                          : 'border-[#D8C7B5] dark:border-[#382E28] hover:bg-[#FAF6F0] dark:hover:bg-[#251D18]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <img
                          src={fab.textureImage}
                          alt={fab.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#D8C7B5]"
                        />
                        <p className="font-bold text-xs text-[#2C221E] dark:text-[#F5EFE8] truncate">
                          {t(fab.name, fab.bengaliName)}
                        </p>
                      </div>
                      <p className="text-[10px] text-[#6E5D53] dark:text-[#C5B8AC]">
                        ₹{fab.pricePerMeter} • {fab.material}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Neckline & Sleeve Cut */}
            <div className="space-y-3 pt-6 border-t border-[#E2D8CC] dark:border-[#382E28]">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#3D2E28] dark:text-[#E8DDD0] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3D2E28] text-white dark:bg-[#F3EDE2] dark:text-[#2C221E] text-xs flex items-center justify-center font-bold">3</span>
                <span>{t('Neckline & Sleeve Cuts', 'গলা ও হাতার ডিজাইন')}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedGarment.necklineOptions.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-[#2C221E] dark:text-[#F5EFE8] mb-1.5">
                      {t('Neckline Style:', 'গলার কাটিং / কলার:')}
                    </label>
                    <div className="space-y-1.5">
                      {selectedGarment.necklineOptions.map((neck) => (
                        <button
                          key={neck}
                          type="button"
                          onClick={() => setSelectedNeckline(neck)}
                          className={`w-full p-2.5 rounded-lg text-xs text-left font-medium transition flex items-center justify-between ${
                            selectedNeckline === neck
                              ? 'bg-[#3D2E28] text-white dark:bg-[#F3EDE2] dark:text-[#2C221E] font-bold'
                              : 'bg-[#EFE7DC]/60 dark:bg-[#251D18] text-[#2C221E] dark:text-[#E8DDD0]'
                          }`}
                        >
                          <span>{neck}</span>
                          {selectedNeckline === neck && <CheckCircle2 className="w-4 h-4 text-[#E8DDD0] dark:text-[#2C221E]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedGarment.sleeveOptions.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold text-[#2C221E] dark:text-[#F5EFE8] mb-1.5">
                      {t('Sleeve Cut:', 'হাতার ডিজাইন:')}
                    </label>
                    <div className="space-y-1.5">
                      {selectedGarment.sleeveOptions.map((sleeve) => (
                        <button
                          key={sleeve}
                          type="button"
                          onClick={() => setSelectedSleeve(sleeve)}
                          className={`w-full p-2.5 rounded-lg text-xs text-left font-medium transition flex items-center justify-between ${
                            selectedSleeve === sleeve
                              ? 'bg-[#3D2E28] text-white dark:bg-[#F3EDE2] dark:text-[#2C221E] font-bold'
                              : 'bg-[#EFE7DC]/60 dark:bg-[#251D18] text-[#2C221E] dark:text-[#E8DDD0]'
                          }`}
                        >
                          <span>{sleeve}</span>
                          {selectedSleeve === sleeve && <CheckCircle2 className="w-4 h-4 text-[#E8DDD0] dark:text-[#2C221E]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Embroidery Work */}
            {selectedGarment.embroideryOptions.length > 0 && (
              <div className="space-y-3 pt-6 border-t border-[#E2D8CC] dark:border-[#382E28]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#3D2E28] dark:text-[#E8DDD0] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#3D2E28] text-white dark:bg-[#F3EDE2] dark:text-[#2C221E] text-xs flex items-center justify-center font-bold">4</span>
                  <span>{t('Hand Embroidery & Accent Motif', 'এমব্রয়ডারি ও বিশেষ কাজ')}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedGarment.embroideryOptions.map((emb) => (
                    <button
                      key={emb.id}
                      type="button"
                      onClick={() => setSelectedEmbroideryId(emb.id)}
                      className={`p-3 rounded-xl border text-xs text-left font-medium transition flex items-center justify-between ${
                        selectedEmbroideryId === emb.id
                          ? 'border-[#3D2E28] bg-[#3D2E28] text-white dark:bg-[#F3EDE2] dark:text-[#2C221E] font-bold'
                          : 'border-[#D8C7B5] dark:border-[#382E28] bg-[#EFE7DC]/60 dark:bg-[#251D18] text-[#2C221E] dark:text-[#E8DDD0]'
                      }`}
                    >
                      <span>{emb.name}</span>
                      {selectedEmbroideryId === emb.id && <CheckCircle2 className="w-4 h-4 text-[#E8DDD0] dark:text-[#2C221E]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Dynamic Price Summary Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-[#3D2E28] text-[#F5EFE8] rounded-2xl p-6 shadow-xl border border-[#524037] space-y-5">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#524037]">
                <div className="flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-[#E8DDD0] rotate-45" />
                  <h4 className="font-serif text-lg font-bold">
                    {t('Custom Spec Preview', 'কাস্টম অর্ডার প্রিভিউ')}
                  </h4>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#2A1E1A] text-[#E8DDD0]">
                  {t('PAL TAILORS', 'পাল টেলরস')}
                </span>
              </div>

              <div className="relative aspect-16/9 rounded-xl overflow-hidden border border-[#524037]">
                <img
                  src={selectedGarment.image}
                  alt={selectedGarment.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent p-3 flex items-end">
                  <p className="font-serif font-bold text-sm text-white">
                    {t(selectedGarment.name, selectedGarment.bengaliName)}
                  </p>
                </div>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-2 text-xs text-[#C5B8AC]">
                <div className="flex justify-between py-1 border-b border-[#524037]">
                  <span className="text-[#E8DDD0]">{t('Fabric Chosen:', 'মনোনীত কাপড়:')}</span>
                  <span className="font-semibold text-white">{selectedFabric.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#524037]">
                  <span className="text-[#E8DDD0]">{t('Fabric Length:', 'কাপড়ের পরিমাণ:')}</span>
                  <span className="font-semibold text-white">{fabricMeters} Meters</span>
                </div>
                {selectedNeckline && (
                  <div className="flex justify-between py-1 border-b border-[#524037]">
                    <span className="text-[#E8DDD0]">{t('Neck Style:', 'গলার স্টাইল:')}</span>
                    <span className="font-semibold text-white">{selectedNeckline}</span>
                  </div>
                )}
                {selectedSleeve && (
                  <div className="flex justify-between py-1 border-b border-[#524037]">
                    <span className="text-[#E8DDD0]">{t('Sleeve Style:', 'হাতার স্টাইল:')}</span>
                    <span className="font-semibold text-white">{selectedSleeve}</span>
                  </div>
                )}
                {selectedEmb && (
                  <div className="flex justify-between py-1 border-b border-[#524037]">
                    <span className="text-[#E8DDD0]">{t('Embroidery:', 'এমব্রয়ডারি:')}</span>
                    <span className="font-semibold text-white">{selectedEmb.name}</span>
                  </div>
                )}
              </div>

              {/* Price Calculation Box */}
              <div className="p-4 rounded-xl bg-[#2A1E1A] border border-[#524037] space-y-2 text-xs">
                <div className="flex justify-between text-[#C5B8AC]">
                  <span>{t('Fabric Cost:', 'কাপড়ের দাম:')}</span>
                  <span>₹{fabricCost}</span>
                </div>
                <div className="flex justify-between text-[#C5B8AC]">
                  <span>{t('Tailor Stitching Charge:', 'দরজি মজুরি:')}</span>
                  <span>₹{stitchingLabor}</span>
                </div>
                {embroideryCost > 0 && (
                  <div className="flex justify-between text-[#C5B8AC]">
                    <span>{t('Embroidery Addition:', 'এমব্রয়ডারি খরচ:')}</span>
                    <span>₹{embroideryCost}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#524037] flex justify-between font-extrabold text-base text-[#F5EFE8]">
                  <span>{t('Estimated Total:', 'মোট আনুমানিক খরচ:')}</span>
                  <span>₹{totalEstimatedCost}</span>
                </div>
              </div>

              {/* Launch Booking Modal Button */}
              <button
                onClick={handleLaunchBookingModal}
                className="w-full py-3.5 px-4 rounded-xl bg-[#FFFDF9] dark:bg-[#F3EDE2] hover:bg-[#F2ECE4] text-[#3D2E28] font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4 text-[#3D2E28]" />
                <span>
                  {t('Proceed to Book via WhatsApp', 'হোয়াটসঅ্যাপে অর্ডার নিশ্চিত করুন')}
                </span>
              </button>

              <p className="text-[11px] text-[#C5B8AC] text-center">
                {t(
                  'After clicking, enter your name, phone & custom details to send to 8116957329',
                  'ক্লিক করে আপনার নাম, নম্বর ও অন্যান্য বিবরণ হোয়াটসঅ্যাপে ৮১১৬৯৫৭৩২৯ এ পাঠান'
                )}
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

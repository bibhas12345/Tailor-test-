import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SHOP_WHATSAPP_NUMBER, SHOP_DISPLAY_PHONE } from '../data/mockData';
import {
  X,
  Send,
  Phone,
  PhoneCall,
  User,
  FileText,
  Scissors,
  ShieldCheck,
  Store,
  ZoomIn,
  CheckCircle2,
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    bookingType,
    selectedProduct,
    selectedFabric,
    selectedGarment,
    openImageZoom,
    t,
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [comments, setComments] = useState('');
  
  // Specific for Fabric Stitching request
  const [garmentCategory, setGarmentCategory] = useState<string>('Nighty');
  const [otherGarmentText, setOtherGarmentText] = useState('');

  // Selected Booking Mode: 'book' | 'stitching' | 'measurement'
  const [bookingMode, setBookingMode] = useState<'book' | 'stitching' | 'measurement'>('book');

  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (isBookingModalOpen) {
      document.body.style.overflow = 'hidden';
      setFormError('');
      setCustomerName('');
      setCustomerPhone('');
      setComments('book | ');
      setGarmentCategory('Nighty');
      setOtherGarmentText('');
      setBookingMode('book');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isBookingModalOpen]);

  if (!isBookingModalOpen) return null;

  let title = '';
  let bengaliTitle = '';
  let previewImage = '';
  let itemId = '';

  if (bookingType === 'ready_made' && selectedProduct) {
    title = selectedProduct.title;
    bengaliTitle = selectedProduct.bengaliTitle;
    previewImage = selectedProduct.image;
    itemId = selectedProduct.id;
  } else if ((bookingType === 'custom_fabric' || bookingType === 'custom_dress') && selectedFabric) {
    title = selectedFabric.name;
    bengaliTitle = selectedFabric.bengaliName;
    previewImage = selectedFabric.textureImage;
    itemId = selectedFabric.id;
  } else if (selectedGarment) {
    title = `Custom Stitching: ${selectedGarment.name}`;
    bengaliTitle = `কাস্টম সেলাই: ${selectedGarment.bengaliName}`;
    previewImage = selectedGarment.image;
    itemId = selectedGarment.id;
  } else {
    title = 'Custom Tailoring Booking';
    bengaliTitle = 'কাস্টম সেলাই বুকিং';
    itemId = 'CUSTOM-01';
  }

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setFormError(t('Please enter your name', 'দয়া করে আপনার নাম দিন'));
      return;
    }

    if (!customerPhone.trim() || customerPhone.length < 10) {
      setFormError(
        t('Please enter a valid 10-digit mobile number', 'দয়া করে ১০ অঙ্কের ফোন নম্বর দিন')
      );
      return;
    }

    setFormError('');

    let message = `✂️ *${t('PAL TAILORS - BOOKING REQUEST', 'PAL TAILORS (পাল টেলরস) - BOOKING REQUEST')}* ✂️\n`;
    message += `───────────────────────\n`;
    message += `👤 *Customer Name:* ${customerName.trim()}\n`;
    message += `📞 *Phone:* ${customerPhone.trim()}\n`;
    message += `🏷️ *Booking Mode:* ${bookingMode.toUpperCase()}\n`;
    message += `───────────────────────\n`;

    if (bookingType === 'ready_made' && selectedProduct) {
      message += `🛍️ *Product:* ${selectedProduct.title} (₹${selectedProduct.price})\n`;
      message += `🆔 *Product ID:* ${selectedProduct.id}\n`;
    } else {
      const finalGarment = garmentCategory === 'Others' && otherGarmentText.trim()
        ? `Others (${otherGarmentText.trim()})`
        : garmentCategory;

      message += `👗 *Choice:* ${finalGarment}\n`;
      if (selectedFabric) {
        message += `🧵 *Selected Fabric:* ${selectedFabric.name} (${selectedFabric.bengaliName})\n`;
        message += `🆔 *Fabric ID:* ${selectedFabric.id}\n`;
        if (selectedFabric.pricePerMeter) {
          message += `💰 *Price:* ₹${selectedFabric.pricePerMeter}/meter\n`;
        }
      }
    }

    if (comments.trim()) {
      message += `───────────────────────\n`;
      message += `📝 *Notes & Custom Instructions:*\n"${comments.trim()}"\n`;
    }

    message += `───────────────────────\n`;
    message += `📍 *Note:* Customer will visit shop for fitting & collection.\n`;
    message += `⚡ *Sent via Pal Tailors Website*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    closeBookingModal();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-2 sm:p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FAF6F0] dark:bg-[#1F1714] border border-[#D8C7B5] dark:border-[#382E28] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header - Warm Bridge Tone */}
        <div className="bg-[#3D2E28] dark:bg-[#161210] text-[#F5EFE8] p-3.5 sm:p-4 flex items-center justify-between border-b border-[#524037] flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#2A1E1A] dark:bg-[#251D18] text-[#E8DDD0] flex items-center justify-center border border-[#524037] shadow-xs flex-shrink-0">
              <Scissors className="w-4 h-4 sm:w-5 sm:h-5 rotate-45 text-[#E8DDD0]" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold">
                {bookingType === 'ready_made'
                  ? t('Book / Customise Product', 'পণ্য বুকিং ও কাস্টমাইজ')
                  : t('Book Custom Clothes Stitching', 'পোশাক সেলাইয়ের জন্য বুকিং')}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#C5B8AC]">
                {t('Pal Tailors • Direct Shop Booking', 'পাল টেলরস • সরাসরি শপ বুকিং')}
              </p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="p-1.5 rounded-lg text-[#C5B8AC] hover:text-white hover:bg-[#524037] transition cursor-pointer"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Item Preview Banner with Clickable Image Popup */}
        <div className="p-3 sm:p-4 bg-[#EFE7DC] dark:bg-[#251D18] border-b border-[#D8C7B5] dark:border-[#382E28] flex items-center gap-3 flex-shrink-0">
          {previewImage && (
            <div
              onClick={() => openImageZoom(previewImage, t(title, bengaliTitle), itemId)}
              className="relative group cursor-pointer flex-shrink-0"
              title={t('Click to enlarge image', 'বড় ছবি দেখতে ক্লিক করুন')}
            >
              <img
                src={previewImage}
                alt={title}
                className="w-14 h-16 sm:w-16 sm:h-20 rounded-xl object-cover border-2 border-[#3D2E28]/30 dark:border-[#E8DDD0]/30 shadow-xs group-hover:scale-105 transition"
              />
              <div className="absolute inset-0 bg-black/30 rounded-xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          )}
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-[#3D2E28] text-amber-300 font-mono text-[11px] font-extrabold shadow-2xs">
                ID: {itemId}
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-[#D8C7B5] dark:border-[#42342C] bg-white dark:bg-[#161210] text-[#3D2E28] dark:text-[#E8DDD0]">
                {bookingType === 'ready_made' ? t('Ready-Made', 'রেডিমেড') : t('Pure Fabric', 'ফ্যাব্রিক')}
              </span>
            </div>

            <h4 className="font-serif font-bold text-[#2C221E] dark:text-[#F5EFE8] text-xs sm:text-sm line-clamp-1">
              {t(title, bengaliTitle)}
            </h4>

            {selectedProduct && (
              <p className="text-xs font-extrabold text-[#801921] dark:text-amber-300">
                Price: ₹{selectedProduct.price}
              </p>
            )}
            {selectedFabric && (
              <p className="text-xs font-extrabold text-[#801921] dark:text-amber-300">
                Fabric Rate: ₹{selectedFabric.pricePerMeter || 500}/meter
              </p>
            )}
          </div>
        </div>

        {/* Form - Scrollable Container */}
        <form onSubmit={handleSendWhatsApp} className="p-3.5 sm:p-4 space-y-3.5 overflow-y-auto flex-1">
          
          {/* Shop Visit Notice */}
          <div className="p-3 bg-amber-500/10 dark:bg-amber-500/10 rounded-xl border border-amber-600/20 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#3D2E28] dark:text-amber-200">
              <Store className="w-4 h-4 text-amber-800 dark:text-amber-400 flex-shrink-0" />
              <span>{t('Booking & Shop Fitting Notice', 'বুকিং ও শপ ভিজিট সংক্রান্ত তথ্য')}</span>
            </div>
            <p className="leading-relaxed text-[#6E5D53] dark:text-[#C5B8AC] text-[11px]">
              {t(
                'We accept online bookings! Please visit our Pal Tailors shop for customizing, measurement, and collecting your ready-to-wear outfit.',
                'আমরা অনলাইন বুকিং গ্রহণ করি! পোশাকের পরিমাপ, কাস্টমাইজেশন ও আপনার ড্রেস কালেকশনের জন্য আমাদের শপে ভিজিট করুন।'
              )}
            </p>
          </div>

          {formError && (
            <div className="p-3 bg-rose-100 text-rose-800 border border-rose-300 rounded-xl text-xs font-bold">
              {formError}
            </div>
          )}

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-bold text-[#2C221E] dark:text-[#F5EFE8] mb-1">
              {t('Your Full Name *', 'আপনার নাম *')}
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                required
                placeholder={t('Enter your full name', 'আপনার পুরো নাম লিখুন')}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D8C7B5] dark:border-[#382E28] bg-white dark:bg-[#161210] text-[#2C221E] dark:text-[#F5EFE8] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#3D2E28]"
              />
            </div>
          </div>

          {/* Customer Phone */}
          <div>
            <label className="block text-xs font-bold text-[#2C221E] dark:text-[#F5EFE8] mb-1">
              {t('Phone / WhatsApp Number *', 'ফোন / হোয়াটসঅ্যাপ নম্বর *')}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="tel"
                required
                placeholder={t('10-digit mobile number', '১০ অঙ্কের ফোন নম্বর')}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D8C7B5] dark:border-[#382E28] bg-white dark:bg-[#161210] text-[#2C221E] dark:text-[#F5EFE8] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#3D2E28]"
              />
            </div>
          </div>

          {/* Booking Purpose Options */}
          <div>
            <label className="block text-xs font-bold text-[#2C221E] dark:text-[#F5EFE8] mb-1.5">
              {t('Booking Type *', 'বুকিংয়ের ধরন নির্বাচন করুন *')}
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[
                { id: 'book', labelEn: 'Book & Reserve', labelBn: 'রিজার্ভ রাখুন' },
                { id: 'stitching', labelEn: 'Custom Stitching', labelBn: 'কাস্টম সেলাই' },
                { id: 'measurement', labelEn: 'Measurement Visit', labelBn: 'মাপের জন্য ভিজিট' },
              ].map((mode) => (
                <button
                  type="button"
                  key={mode.id}
                  onClick={() => setBookingMode(mode.id as any)}
                  className={`p-2 rounded-xl border text-center font-bold text-[11px] transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    bookingMode === mode.id
                      ? 'border-[#3D2E28] bg-[#3D2E28] text-white dark:bg-[#F3EDE2] dark:text-[#2C221E] shadow-xs'
                      : 'border-[#D8C7B5] dark:border-[#42342C] bg-white dark:bg-[#161210] text-[#2C221E] dark:text-[#E8DDD0]'
                  }`}
                >
                  {bookingMode === mode.id && <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 dark:text-[#3D2E28]" />}
                  <span>{t(mode.labelEn, mode.labelBn)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Garment Choice for Fabric Stitching / Purchase */}
          {bookingType !== 'ready_made' && (
            <div className="p-3 bg-[#EFE7DC]/80 dark:bg-[#251D18] rounded-xl border border-[#D8C7B5] dark:border-[#382E28] space-y-2">
              <label className="block text-xs font-bold text-[#2C221E] dark:text-[#F5EFE8]">
                {t('Dress / Stitching Category *', 'পোশাকের ধরন নির্বাচন করুন *')}
              </label>
              
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { id: 'Nighty', labelEn: 'Nighty', labelBn: 'নাইটি' },
                  { id: 'Kurti', labelEn: 'Kurti / Salwar', labelBn: 'কুর্তি / সালোয়ার' },
                  { id: 'Traditional', labelEn: 'Traditional / Blouse', labelBn: 'ট্র্যাডিশনাল / ব্লাউজ' },
                  { id: 'Only Fabric', labelEn: 'Buy Fabric Only', labelBn: 'শুধু থান কাপড়' },
                  { id: 'Others', labelEn: 'Others', labelBn: 'অন্যান্য' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setGarmentCategory(item.id)}
                    className={`p-1.5 rounded-lg border text-left font-bold text-[11px] transition cursor-pointer ${
                      garmentCategory === item.id
                        ? 'border-[#3D2E28] bg-[#3D2E28] text-white dark:bg-[#F3EDE2] dark:text-[#2C221E]'
                        : 'border-[#D8C7B5] dark:border-[#42342C] bg-white dark:bg-[#161210] text-[#2C221E] dark:text-[#E8DDD0]'
                    }`}
                  >
                    {t(item.labelEn, item.labelBn)}
                  </button>
                ))}
              </div>

              {garmentCategory === 'Others' && (
                <input
                  type="text"
                  placeholder={t('Specify garment type...', 'পোশাকের নাম লিখুন...')}
                  value={otherGarmentText}
                  onChange={(e) => setOtherGarmentText(e.target.value)}
                  className="w-full mt-2 px-3 py-1.5 rounded-lg border border-[#D8C7B5] dark:border-[#382E28] bg-white dark:bg-[#161210] text-xs font-medium text-[#2C221E] dark:text-[#F5EFE8]"
                />
              )}
            </div>
          )}

          {/* Notes / Measurements Input */}
          <div>
            <label className="block text-xs font-bold text-[#2C221E] dark:text-[#F5EFE8] mb-1">
              {t('Additional Instructions / Measurements', 'অন্যান্য নির্দেশ বা মাপের তথ্য')}
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <textarea
                rows={3}
                placeholder={t(
                  'e.g., book | Size 38 / M, length 40 inch, neck design details...',
                  'যেমন: book | সাইজ ৩৮ / এম, ঝুল ৪০ ইঞ্চি, বিশেষ গলার সেলাই কাটিং...'
                )}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D8C7B5] dark:border-[#382E28] bg-white dark:bg-[#161210] text-[#2C221E] dark:text-[#F5EFE8] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#3D2E28]"
              />
            </div>
          </div>

          {/* Action Buttons: WhatsApp & Direct Call */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="submit"
              className="w-full py-3 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>{t('Book via WhatsApp', 'হোয়াটসঅ্যাপে বুক করুন')}</span>
            </button>

            <a
              href={`tel:+${SHOP_WHATSAPP_NUMBER}`}
              className="w-full py-3 px-3 rounded-xl bg-[#3D2E28] hover:bg-[#2A1E1A] dark:bg-[#F3EDE2] dark:hover:bg-white text-white dark:text-[#2C221E] font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t('Call Shop', 'সরাসরি ফোন করুন')}</span>
            </a>
          </div>

          <p className="text-[11px] text-stone-500 dark:text-stone-400 text-center flex items-center justify-center gap-1 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#524037] dark:text-[#C5B8AC]" />
            <span>{t('Direct WhatsApp booking & shop call with Pal Tailors', 'পাল টেলরস শপের সাথে সরাসরি হোয়াটসঅ্যাপ বুকিং ও ফোন কল')}</span>
          </p>

        </form>

      </div>
    </div>
  );
};

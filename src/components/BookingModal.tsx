import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SHOP_WHATSAPP_NUMBER } from '../data/mockData';
import {
  X,
  Send,
  Phone,
  User,
  FileText,
  Scissors,
  ShieldCheck,
  Store,
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    bookingType,
    selectedProduct,
    selectedFabric,
    selectedGarment,
    t,
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [comments, setComments] = useState('');
  
  // Specific for Fabric Stitching request
  const [garmentCategory, setGarmentCategory] = useState<string>('Nighty');
  const [otherGarmentText, setOtherGarmentText] = useState('');

  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (isBookingModalOpen) {
      document.body.style.overflow = 'hidden';
      setFormError('');
      setCustomerName('');
      setCustomerPhone('');
      setComments('');
      setGarmentCategory('Nighty');
      setOtherGarmentText('');
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

  if (bookingType === 'ready_made' && selectedProduct) {
    title = selectedProduct.title;
    bengaliTitle = selectedProduct.bengaliTitle;
    previewImage = selectedProduct.image;
  } else if ((bookingType === 'custom_fabric' || bookingType === 'custom_dress') && selectedFabric) {
    title = `Order / Stitch with: ${selectedFabric.name}`;
    bengaliTitle = `কাপড় নির্বাচন: ${selectedFabric.bengaliName}`;
    previewImage = selectedFabric.textureImage;
  } else if (selectedGarment) {
    title = `Custom Stitching: ${selectedGarment.name}`;
    bengaliTitle = `কাস্টম সেলাই: ${selectedGarment.bengaliName}`;
    previewImage = selectedGarment.image;
  } else {
    title = 'Custom Tailoring Booking';
    bengaliTitle = 'কাস্টম সেলাই বুকিং';
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
    message += `👤 *Name:* ${customerName.trim()}\n`;
    message += `📞 *Phone:* ${customerPhone.trim()}\n`;
    message += `───────────────────────\n`;

    if (bookingType === 'ready_made' && selectedProduct) {
      message += `🛍️ *Ready-Made Product:* ${selectedProduct.title} (₹${selectedProduct.price})\n`;
      message += `🏷️ *Unique Product ID:* ${selectedProduct.id}\n`;
    } else {
      const finalGarment = garmentCategory === 'Others' && otherGarmentText.trim()
        ? `Others (${otherGarmentText.trim()})`
        : garmentCategory;

      message += `👗 *Choice:* ${finalGarment}\n`;
      if (selectedFabric) {
        message += `🧵 *Selected Pure Fabric:* ${selectedFabric.name} (${selectedFabric.bengaliName})\n`;
        message += `🏷️ *Unique Fabric ID:* ${selectedFabric.id}\n`;
        if (selectedFabric.pricePerMeter) {
          message += `💰 *Fabric Price:* ₹${selectedFabric.pricePerMeter}\n`;
        }
      }
    }

    if (comments.trim()) {
      message += `───────────────────────\n`;
      message += `📝 *Comments / Customization / Size:*\n"${comments.trim()}"\n`;
    }

    message += `───────────────────────\n`;
    message += `⚡ *Sent via Pal Tailors Website*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    closeBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FAF6F0] dark:bg-[#1F1714] border border-[#D8C7B5] dark:border-[#382E28] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header - Warm Bridge Tone */}
        <div className="bg-[#3D2E28] dark:bg-[#161210] text-[#F5EFE8] p-3.5 sm:p-5 flex items-center justify-between border-b border-[#524037] flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#2A1E1A] dark:bg-[#251D18] text-[#E8DDD0] flex items-center justify-center border border-[#524037] shadow-xs flex-shrink-0">
              <Scissors className="w-4 h-4 sm:w-5 sm:h-5 rotate-45 text-[#E8DDD0]" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold">
                {bookingType === 'ready_made'
                  ? t('Book or Customise Product', 'পণ্য বুকিং ও কাস্টমাইজ')
                  : t('Book Custom Clothes Stitching', 'পোশাক সেলাইয়ের জন্য বুকিং')}
              </h3>
              <p className="text-[11px] sm:text-xs text-[#C5B8AC]">
                {t('Pal Tailors • Direct WhatsApp Order', 'পাল টেলরস • সরাসরি হোয়াটসঅ্যাপে পাঠান')}
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

        {/* Item Preview Banner */}
        <div className="p-3 sm:p-4 bg-[#EFE7DC] dark:bg-[#251D18] border-b border-[#D8C7B5] dark:border-[#382E28] flex items-center gap-3 flex-shrink-0">
          {previewImage && (
            <img
              src={previewImage}
              alt={title}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-[#D8C7B5] dark:border-[#42342C] flex-shrink-0"
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-serif font-bold text-[#2C221E] dark:text-[#F5EFE8] text-xs sm:text-sm truncate">
                {t(title, bengaliTitle)}
              </h4>
              {selectedProduct && (
                <span className="px-2 py-0.5 rounded bg-[#3D2E28] text-[#F5EFE8] font-mono text-[10px] font-extrabold shadow-2xs">
                  ID: {selectedProduct.id}
                </span>
              )}
              {selectedFabric && !selectedProduct && (
                <span className="px-2 py-0.5 rounded bg-[#3D2E28] text-[#F5EFE8] font-mono text-[10px] font-extrabold shadow-2xs">
                  ID: {selectedFabric.id}
                </span>
              )}
            </div>
            {selectedFabric && (
              <p className="text-xs text-[#801921] dark:text-amber-300 font-extrabold mt-0.5">
                {t('Fabric Price:', 'কাপড়ের দাম:')} ₹{selectedFabric.pricePerMeter || 500}
              </p>
            )}
            {bookingType !== 'ready_made' && (
              <p className="text-[11px] sm:text-xs text-[#524037] dark:text-[#C5B8AC] font-bold mt-0.5">
                {t('Custom Stitching Service Available', 'যেকোনো পোশাকে সেলাই করার সুবিধা')}
              </p>
            )}
            {bookingType === 'ready_made' && selectedProduct && (
              <p className="text-xs text-[#2C221E] dark:text-[#F5EFE8] font-extrabold mt-0.5">
                ₹{selectedProduct.price}
              </p>
            )}
          </div>
        </div>

        {/* Form - Scrollable Container */}
        <form onSubmit={handleSendWhatsApp} className="p-3.5 sm:p-5 space-y-3.5 overflow-y-auto flex-1">
          
          {/* Booking & Customization Notice Banner */}
          <div className="p-3 bg-[#EFE7DC] dark:bg-[#251D18] rounded-xl border border-[#D8C7B5] dark:border-[#382E28] text-xs text-[#2C221E] dark:text-[#E8DDD0] space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#3D2E28] dark:text-[#F5EFE8]">
              <Store className="w-4 h-4 text-[#801921] dark:text-amber-400 flex-shrink-0" />
              <span>{t('Store & Booking Notice', 'স্টোর ও বুকিং সংক্রান্ত তথ্য')}</span>
            </div>
            <p className="leading-relaxed text-[#6E5D53] dark:text-[#C5B8AC]">
              {t(
                'For booking, please write "book" along with your size or custom instructions in the box below!',
                'বুকিং করার জন্য, নিচের বক্সে "book" এবং আপনার সাইজ বা বিশেষ কাস্টম নির্দেশনা লিখুন!'
              )}
            </p>
          </div>

          {formError && (
            <div className="p-3 bg-stone-200 text-stone-800 border border-stone-300 rounded-xl text-xs font-bold">
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
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D8C7B5] dark:border-[#382E28] bg-white dark:bg-[#161210] text-[#2C221E] dark:text-[#F5EFE8] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#3D2E28]"
              />
            </div>
          </div>

          {/* Customer Phone */}
          <div>
            <label className="block text-xs font-bold text-[#2C221E] dark:text-[#F5EFE8] mb-1">
              {t('Phone Number *', 'ফোন / হোয়াটসঅ্যাপ নম্বর *')}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="tel"
                required
                placeholder={t('10-digit mobile number', '১০ অঙ্কের ফোন নম্বর')}
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D8C7B5] dark:border-[#382E28] bg-white dark:bg-[#161210] text-[#2C221E] dark:text-[#F5EFE8] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#3D2E28]"
              />
            </div>
          </div>

          {/* Garment Choice for Fabric Stitching / Purchase */}
          {bookingType !== 'ready_made' && (
            <div className="p-3.5 bg-[#EFE7DC]/80 dark:bg-[#251D18] rounded-xl border border-[#D8C7B5] dark:border-[#382E28] space-y-2">
              <label className="block text-xs font-bold text-[#2C221E] dark:text-[#F5EFE8]">
                {t('Available Options: Select dress or fabric only *', 'পছন্দসই অপশন নির্বাচন করুন: পোশাক সেলাই বা শুধু থান কাপড় *')}
              </label>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
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
                    className={`p-2 rounded-lg border text-left font-bold transition ${
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
                  placeholder={t('Specify option / dress name (e.g. Bed Sheet, Lehenga...)', 'বিবরণ লিখুন (যেমন: বেড শিট, লেহেঙ্গা...)')}
                  value={otherGarmentText}
                  onChange={(e) => setOtherGarmentText(e.target.value)}
                  className="w-full mt-2 p-2 rounded-lg border border-[#D8C7B5] text-xs bg-white dark:bg-[#161210] text-[#2C221E] dark:text-[#F5EFE8]"
                />
              )}
            </div>
          )}

          {/* Comments / Size / Custom Instructions Text Area */}
          <div>
            <label className="block text-xs font-bold text-[#2C221E] dark:text-[#F5EFE8] mb-1">
              {t('Comments, Size & Custom Instructions', 'মন্তব্য, সাইজ ও মাপের নির্দেশিকা')}
            </label>
            <p className="text-[11px] font-semibold text-[#801921] dark:text-amber-400 mb-1.5 flex items-center gap-1">
              <span>•</span>
              <span>{t('For booking, type "book" here along with your size or custom requests', 'বুকিং এর জন্য এখানে "book" এবং আপনার সাইজ বা কাস্টম অনুরোধ লিখুন')}</span>
            </p>
            <div className="relative">
              <FileText className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
              <textarea
                rows={3}
                placeholder={t(
                  'e.g., book | Size 38 / M, length 40 inch, or any custom instructions...',
                  'যেমন: book | সাইজ ৩৮ / এম, ৪০ ইঞ্চি ঝুল, বা অন্য কোনো কাস্টম নির্দেশ...'
                )}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D8C7B5] dark:border-[#382E28] bg-white dark:bg-[#161210] text-[#2C221E] dark:text-[#F5EFE8] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#3D2E28]"
              />
            </div>
          </div>

          {/* Send via WhatsApp Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#3D2E28] hover:bg-[#2A1E1A] dark:bg-[#F3EDE2] dark:hover:bg-white text-white dark:text-[#2C221E] font-bold text-xs shadow-lg flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#E8DDD0] dark:text-[#2C221E]" />
              <span>{t('Send via WhatsApp', 'হোয়াটসঅ্যাপে পাঠান')}</span>
            </button>
          </div>

          <p className="text-[11px] text-stone-500 dark:text-stone-400 text-center flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#524037] dark:text-[#C5B8AC]" />
            <span>{t('Direct WhatsApp booking with Pal Tailors', 'পাল টেলরস শপের সাথে সরাসরি হোয়াটসঅ্যাপ বুকিং')}</span>
          </p>

        </form>

      </div>
    </div>
  );
};

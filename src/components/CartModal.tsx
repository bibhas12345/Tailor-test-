import React from 'react';
import { useApp } from '../context/AppContext';
import { SHOP_WHATSAPP_NUMBER } from '../data/mockData';
import {
  ShoppingBag,
  X,
  Trash2,
  CalendarCheck,
  MessageCircle,
  ArrowRight,
  Layers,
  Sparkles,
  MapPin,
  Store,
  ZoomIn,
} from 'lucide-react';

export const CartModal: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    isCartOpen,
    closeCart,
    openProductBooking,
    openFabricBooking,
    openImageZoom,
    setActiveTab,
    t,
  } = useApp();

  if (!isCartOpen) return null;

  // Calculate estimated total price
  const estimatedTotal = cartItems.reduce((acc, curr) => {
    if (curr.itemType === 'product' && curr.product) {
      return acc + (Number(curr.product.price) || 0);
    }
    if (curr.itemType === 'fabric' && curr.fabric) {
      return acc + (Number(curr.fabric.pricePerMeter) || 0);
    }
    return acc;
  }, 0);

  const handleBookAllWhatsApp = () => {
    if (cartItems.length === 0) return;

    let itemListText = '';
    cartItems.forEach((ci, idx) => {
      if (ci.itemType === 'product' && ci.product) {
        itemListText += `\n${idx + 1}. *[Ready-Made]* ${ci.product.title} (ID: *${ci.product.id}*) - ₹${ci.product.price}`;
      } else if (ci.itemType === 'fabric' && ci.fabric) {
        itemListText += `\n${idx + 1}. *[Fabric]* ${ci.fabric.name} (ID: *${ci.fabric.id}*) - ₹${ci.fabric.pricePerMeter || 500}/meter`;
      }
    });

    const fullMessage = encodeURIComponent(
      `Hello Pal Tailors! 👋\nI want to book the following *${cartItems.length} item(s)* from my cart:${itemListText}\n\n*Total Items:* ${cartItems.length}\n*Estimated Subtotal:* ₹${estimatedTotal}\n\nPlease confirm availability and guide me on stitching/customization details!`
    );

    window.open(`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${fullMessage}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#FAF6F0] dark:bg-[#161012] text-[#2C221E] dark:text-[#F5EFE8] h-full shadow-2xl flex flex-col z-10 border-l border-[#E2D8CC] dark:border-[#382E28] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2D8CC] dark:border-[#382E28] flex items-center justify-between bg-[#EFE7DC]/80 dark:bg-[#22181B]/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#3D2E28] text-white dark:bg-[#F3EDE2] dark:text-[#2C221E] flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-extrabold leading-tight">
                {t('Your Order Cart', 'আপনার অর্ডার কার্ট')}
              </h2>
              <p className="text-xs text-[#6E5D53] dark:text-[#C5B8AC] font-medium">
                {t(`${cartItems.length} item(s) selected`, `${cartItems.length} টি আইটেম নির্বাচন করা হয়েছে`)}
              </p>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white hover:bg-[#E2D6C6] dark:hover:bg-[#2D221D] transition active:scale-95 cursor-pointer"
            title={t('Close Cart', 'বন্ধ করুন')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Shop Visit & Booking Notice Banner */}
        <div className="mx-4 mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-600/20 dark:bg-amber-500/10 dark:border-amber-500/20 flex items-start gap-2.5 text-xs">
          <Store className="w-4 h-4 text-amber-800 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-[#3D2E28] dark:text-amber-200 leading-snug">
              {t(
                'We will accept your booking! Please visit our shop for customizing and fitting your ready-to-wear outfits.',
                'আমরা আপনার বুকিং গ্রহণ করব! কাস্টমাইজেশন ও আপনার পছন্দের পারফেক্ট পোশাক ফিটিংসের জন্য শপে ভিজিট করুন।'
              )}
            </p>
            <p className="text-[11px] text-[#6E5D53] dark:text-[#C5B8AC]">
              {t(
                'Pal Tailors, Matgoda ( jhargram main road), Raipur, Bankura 722134.',
                'পাল টেইলার্স, মাতগোদা (ঝাড়গ্রাম মেইন রোড), রায়পুর, বাঁকুড়া ৭২২১৩৪।'
              )}
            </p>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#EFE7DC] dark:bg-[#251B1E] border border-[#D8C7B5] dark:border-[#382E28] flex items-center justify-center text-stone-400">
                <ShoppingBag className="w-8 h-8 text-[#524037] dark:text-[#C5B8AC]" />
              </div>
              <div className="space-y-1.5 max-w-xs">
                <h3 className="font-serif text-base font-bold text-[#2C221E] dark:text-[#F5EFE8]">
                  {t('Your Cart is Empty', 'আপনার কার্ট খালি আছে')}
                </h3>
                <p className="text-xs text-[#6E5D53] dark:text-[#C5B8AC]">
                  {t(
                    'Browse our ready-made dresses or pure handloom fabrics and add items to book together.',
                    'আমাদের তৈরি পোশাক বা খাঁটি হ্যান্ডলুম ফ্যাব্রিক সংগ্রহ দেখে কার্টে যোগ করুন।'
                  )}
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full max-w-xs pt-2">
                <button
                  onClick={() => {
                    setActiveTab('products');
                    closeCart();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#3D2E28] text-white dark:bg-[#F3EDE2] dark:text-[#2C221E] text-xs font-bold flex items-center justify-center gap-2 hover:opacity-95 transition shadow-xs cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t('Explore Ready-Made', 'রেডিমেড পোশাক দেখুন')}</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('fabrics');
                    closeCart();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#EFE7DC] dark:bg-[#281F22] text-[#3D2E28] dark:text-[#E8DDD0] text-xs font-bold border border-[#D8C7B5] dark:border-[#382E28] flex items-center justify-center gap-2 hover:bg-[#E2D6C6] dark:hover:bg-[#332A2D] transition cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>{t('Explore Pure Fabrics', 'ফ্যাব্রিক ক্যাটালগ দেখুন')}</span>
                </button>
              </div>
            </div>
          ) : (
            cartItems.map((cartItem) => {
              const isProduct = cartItem.itemType === 'product' && cartItem.product;
              const isFabric = cartItem.itemType === 'fabric' && cartItem.fabric;
              if (!isProduct && !isFabric) return null;

              const title = isProduct
                ? t(cartItem.product!.title, cartItem.product!.bengaliTitle)
                : t(cartItem.fabric!.name, cartItem.fabric!.bengaliName);

              const image = isProduct ? cartItem.product!.image : cartItem.fabric!.textureImage;
              const itemId = isProduct ? cartItem.product!.id : cartItem.fabric!.id;
              const priceDisplay = isProduct
                ? `₹${cartItem.product!.price}`
                : `₹${cartItem.fabric!.pricePerMeter || 500}/m`;

              return (
                <div
                  key={cartItem.cartId}
                  className="p-3 rounded-2xl bg-[#FFFDF9] dark:bg-[#22181B] border border-[#E2D8CC] dark:border-[#382E28] shadow-xs flex items-center gap-3 group transition hover:border-[#3D2E28]/40"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => openImageZoom(image, title, itemId)}
                    className="relative group cursor-pointer flex-shrink-0"
                    title={t('Click to enlarge image', 'বড় ছবি দেখতে ক্লিক করুন')}
                  >
                    <img
                      src={image}
                      alt={title}
                      className="w-16 h-20 object-cover object-top rounded-xl bg-stone-200 dark:bg-stone-800 flex-shrink-0 border border-[#E2D8CC] dark:border-[#382E28] group-hover:scale-105 transition"
                    />
                    <div className="absolute inset-0 bg-black/30 rounded-xl opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide border ${
                          isProduct
                            ? 'bg-[#EFE7DC] text-[#3D2E28] border-[#D8C7B5] dark:bg-[#2D211A] dark:text-[#E8DDD0] dark:border-[#42342C]'
                            : 'bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60'
                        }`}
                      >
                        {isProduct ? t('Ready-Made', 'রেডিমেড') : t('Pure Fabric', 'ফ্যাব্রিক')}
                      </span>
                      <span className="text-[10px] font-mono text-[#6E5D53] dark:text-[#C5B8AC] font-bold">
                        ID: {itemId}
                      </span>
                    </div>

                    <h4 className="font-serif text-xs sm:text-sm font-bold text-[#2C221E] dark:text-[#F5EFE8] truncate">
                      {title}
                    </h4>

                    <p className="text-xs font-extrabold text-[#801921] dark:text-amber-300">
                      {priceDisplay}
                    </p>

                    {/* Actions for individual item */}
                    <div className="pt-1 flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (isProduct) {
                            openProductBooking(cartItem.product!);
                          } else {
                            openFabricBooking(cartItem.fabric!);
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#3D2E28] hover:bg-[#2A1E1A] dark:bg-[#F3EDE2] dark:hover:bg-white text-white dark:text-[#2C221E] font-bold text-[10px] flex items-center gap-1 transition active:scale-95 cursor-pointer shadow-2xs"
                      >
                        <CalendarCheck className="w-3 h-3" />
                        <span>{t('Book / Customise', 'বুক বা কাস্টমাইজ')}</span>
                      </button>

                      <button
                        onClick={() => removeFromCart(cartItem.cartId)}
                        title={t('Remove from Cart', 'কার্ট থেকে মুছুন')}
                        className="p-1 rounded-lg text-rose-600 hover:text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E2D8CC] dark:border-[#382E28] bg-[#EFE7DC]/90 dark:bg-[#22181B]/90 backdrop-blur-md space-y-3">
            
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-[#6E5D53] dark:text-[#C5B8AC] font-semibold">
                {t('Estimated Total:', 'আনুমানিক মোট মূল্য:')}
              </span>
              <span className="font-serif font-extrabold text-base sm:text-lg text-[#2C221E] dark:text-[#F5EFE8]">
                ₹{estimatedTotal}
              </span>
            </div>

            {/* Book All via WhatsApp */}
            <button
              onClick={handleBookAllWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{t('Book All via WhatsApp', 'সবগুলো হোয়াটসঅ্যাপে বুক করুন')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-stone-500 dark:text-stone-400">
                {t('Instant response on WhatsApp', 'হোয়াটসঅ্যাপে সাথে সাথে রেসপন্স')}
              </span>
              <button
                onClick={clearCart}
                className="text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-400 font-bold underline cursor-pointer"
              >
                {t('Clear Cart', 'কার্ট খালি করুন')}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

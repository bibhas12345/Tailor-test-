import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scissors,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  ShoppingBag,
  Layers,
  MapPin,
  CalendarCheck,
  Lock,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, theme, toggleTheme, activeTab, setActiveTab, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelBn: 'হোম', icon: Scissors },
    { id: 'products', labelEn: 'Ready-Made', labelBn: 'রেডিমেড', icon: ShoppingBag },
    { id: 'fabrics', labelEn: 'Fabrics', labelBn: 'ফ্যাব্রিক', icon: Layers },
    { id: 'contact', labelEn: 'Contact', labelBn: 'যোগাযোগ', icon: MapPin },
  ] as const;

  const handleNavClick = (tabId: typeof navItems[number]['id']) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF8F5]/95 dark:bg-[#161210]/95 border-b border-[#E2D8CC] dark:border-[#382E28] transition-colors duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Name */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0 min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#3D2E28] text-[#F3EDE2] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform border border-[#524037] flex-shrink-0">
              <Scissors className="w-4 h-4 sm:w-5 sm:h-5 rotate-45 text-[#E8DDD0]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-serif text-lg sm:text-2xl font-extrabold tracking-tight text-[#2C221E] dark:text-[#F5EFE8] block truncate leading-tight">
                {t('Pal Tailors', 'পাল টেলরস')}
              </span>
            </div>
          </div>

          {/* Desktop Nav Buttons in Warm Bridge Accent Tone */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isHighlight = 'isHighlight' in item && item.isHighlight;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#3D2E28] text-white shadow-sm dark:bg-[#F3EDE2] dark:text-[#2C221E]'
                      : isHighlight
                      ? 'bg-[#EFE7DC] dark:bg-[#28201C] text-[#3D2E28] dark:text-[#E8DDD0] hover:bg-[#E2D6C6] dark:hover:bg-[#332A25] border border-[#D8C7B5] dark:border-[#42342C]'
                      : 'text-[#2C221E] dark:text-[#E8DDD0] hover:bg-[#EFE7DC]/80 dark:hover:bg-[#221A17]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? 'text-[#E8DDD0] dark:text-[#2C221E]'
                        : isHighlight
                        ? 'text-[#3D2E28] dark:text-[#E8DDD0]'
                        : 'text-[#524037] dark:text-[#C5B8AC]'
                    }`}
                  />
                  <span>{t(item.labelEn, item.labelBn)}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Section: Toggles (Language, Theme) & Mobile Menu */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              title={t('Switch Language', 'ভাষা পরিবর্তন')}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-[#D8C7B5] dark:border-[#42342C] bg-[#EFE7DC] dark:bg-[#221A17] text-[#2C221E] dark:text-[#E8DDD0] text-xs font-semibold hover:bg-[#E2D6C6] dark:hover:bg-[#2D221D] transition active:scale-95"
            >
              <Globe className="w-3.5 h-3.5 text-[#524037] dark:text-[#C5B8AC]" />
              <span className="flex items-center gap-1 text-[11px]">
                <span className={language === 'en' ? 'text-[#2C221E] dark:text-[#F5EFE8] font-extrabold' : 'text-stone-400'}>
                  EN
                </span>
                <span className="text-stone-300 dark:text-stone-600">|</span>
                <span className={language === 'bn' ? 'text-[#2C221E] dark:text-[#F5EFE8] font-extrabold' : 'text-stone-400'}>
                  বাংলা
                </span>
              </span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              title={t('Toggle Theme', 'থিম পরিবর্তন')}
              className="p-2 rounded-xl border border-[#D8C7B5] dark:border-[#42342C] bg-[#EFE7DC] dark:bg-[#221A17] text-[#3D2E28] dark:text-[#E8DDD0] hover:bg-[#E2D6C6] dark:hover:bg-[#2D221D] transition active:scale-95"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#E8DDD0]" />
              ) : (
                <Moon className="w-4 h-4 text-[#3D2E28]" />
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-[#D8C7B5] dark:border-[#42342C] bg-[#EFE7DC] dark:bg-[#221A17] text-[#2C221E] dark:text-[#E8DDD0]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2D8CC] dark:border-[#382E28] bg-[#FAF8F5] dark:bg-[#161210] px-4 pt-3 pb-6 shadow-xl">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? 'bg-[#3D2E28] text-white dark:bg-[#F3EDE2] dark:text-[#2C221E]'
                      : 'text-[#2C221E] dark:text-[#E8DDD0] hover:bg-[#EFE7DC] dark:hover:bg-[#221A17]'
                  }`}
                >
                  <Icon className="w-5 h-5 text-[#524037] dark:text-[#C5B8AC]" />
                  <span>{t(item.labelEn, item.labelBn)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

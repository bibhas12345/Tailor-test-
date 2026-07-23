import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HomeTwoCardsSection } from './components/HomeTwoCardsSection';
import { ProductCatalog } from './components/ProductCatalog';
import { FabricCatalog } from './components/FabricCatalog';
import { ContactSection } from './components/ContactSection';
import { AdminPanel } from './components/AdminPanel';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { SHOP_WHATSAPP_NUMBER } from './data/mockData';
import { PhoneCall } from 'lucide-react';

const AppContent: React.FC = () => {
  const { activeTab, t } = useApp();

  const handleFloatingWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Pal Tailors! I want to inquire about custom dress stitching or ready-made products.'
    );
    window.open(`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] dark:bg-[#140a0c] text-[#2c1719] dark:text-[#f7ebe8] flex flex-col font-sans selection:bg-[#801921] selection:text-white transition-colors duration-300">
      
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area Based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection />
            <HomeTwoCardsSection />
            <ContactSection />
          </>
        )}

        {activeTab === 'products' && (
          <div className="animate-in fade-in duration-300">
            <ProductCatalog />
          </div>
        )}

        {activeTab === 'fabrics' && (
          <div className="animate-in fade-in duration-300">
            <FabricCatalog />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="animate-in fade-in duration-300">
            <ContactSection />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="animate-in fade-in duration-300">
            <AdminPanel />
          </div>
        )}
      </main>

      {/* Booking & Customization Modal */}
      <BookingModal />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Fabric, GarmentOption, HomepageSettings } from '../types';
import { PRODUCTS_DATA, FABRICS_DATA, DEFAULT_HOMEPAGE_SETTINGS } from '../data/mockData';
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc, writeBatch } from 'firebase/firestore';
import { ImageLightboxModal } from '../components/ImageLightboxModal';

export type Language = 'en' | 'bn';
export type Theme = 'light' | 'dark';
export type ActiveTab = 'home' | 'products' | 'fabrics' | 'contact' | 'admin';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Homepage Settings
  homepageSettings: HomepageSettings;
  updateHomepageSettings: (settings: HomepageSettings) => Promise<void>;

  // Products & Fabrics catalog state
  products: Product[];
  fabrics: Fabric[];
  updateProduct: (updated: Product) => Promise<void>;
  addProduct: (newProd: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  toggleProductSoldOut: (id: string) => Promise<void>;

  updateFabric: (updated: Fabric) => Promise<void>;
  addFabric: (newFab: Fabric) => Promise<void>;
  deleteFabric: (id: string) => Promise<void>;
  toggleFabricSoldOut: (id: string) => Promise<void>;
  resetCatalogToDefaults: () => Promise<void>;

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminLogin: (id: string, pass: string) => boolean;
  adminLogout: () => void;

  // Booking Modal State
  isBookingModalOpen: boolean;
  bookingType: 'ready_made' | 'custom_fabric' | 'custom_dress' | 'general' | null;
  selectedProduct: Product | null;
  selectedFabric: Fabric | null;
  selectedGarment: GarmentOption | null;

  openProductBooking: (product: Product) => void;
  openFabricBooking: (fabric: Fabric) => void;
  openCustomGarmentBooking: (garment: GarmentOption, fabric?: Fabric) => void;
  openGeneralBooking: () => void;
  closeBookingModal: () => void;
  
  // Image Zoom Lightbox
  lightboxImage: { url: string; title?: string; itemId?: string; additionalImages?: string[] } | null;
  openImageZoom: (url: string, title?: string, itemId?: string, additionalImages?: string[]) => void;
  closeImageZoom: () => void;

  // Translation Helper
  t: (enText: string, bnText: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('pal_tailors_lang');
    return (saved as Language) || 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('pal_tailors_theme');
    return (saved as Theme) || 'light';
  });

  // Helper to map route path / hash to ActiveTab
  const getTabFromUrl = (): ActiveTab => {
    const hash = window.location.hash.toLowerCase();
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();

    if (hash === '#admin' || path.endsWith('/admin') || search.includes('admin=true')) return 'admin';
    if (hash === '#products' || path.endsWith('/products') || hash === '#book' || path.endsWith('/book')) return 'products';
    if (hash === '#fabrics' || path.endsWith('/fabrics')) return 'fabrics';
    if (hash === '#contact' || path.endsWith('/contact')) return 'contact';
    return 'home';
  };

  const [activeTab, setActiveTabState] = useState<ActiveTab>(getTabFromUrl);

  // Scroll to top whenever active tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // Sync state on back/forward browser navigation or direct URL editing
  useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromUrl();
      setActiveTabState(tab);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const setActiveTab = (tab: ActiveTab) => {
    if (tab === activeTab) return;
    setActiveTabState(tab);

    const targetHash = tab === 'home' ? '#home' : `#${tab}`;
    if (window.location.hash !== targetHash) {
      try {
        window.history.pushState({ tab }, '', targetHash);
      } catch (e) {
        window.location.hash = targetHash;
      }
    }
  };

  // Admin Login State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('pal_tailors_admin_auth') === 'true';
  });

  // Realtime Products, Fabrics and Homepage Settings from Firestore
  const [homepageSettings, setHomepageSettings] = useState<HomepageSettings>(() => {
    try {
      const saved = localStorage.getItem('pal_tailors_homepage_settings');
      if (saved) {
        return { ...DEFAULT_HOMEPAGE_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_HOMEPAGE_SETTINGS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('pal_tailors_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS_DATA;
  });

  const [fabrics, setFabrics] = useState<Fabric[]>(() => {
    try {
      const saved = localStorage.getItem('pal_tailors_fabrics');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return FABRICS_DATA;
  });

  // Subscribe to Homepage Settings in Firestore
  useEffect(() => {
    const settingsDocRef = doc(db, 'settings', 'homepage');
    const unsubscribe = onSnapshot(settingsDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = { ...DEFAULT_HOMEPAGE_SETTINGS, ...docSnap.data() } as HomepageSettings;
        setHomepageSettings(data);
        try {
          localStorage.setItem('pal_tailors_homepage_settings', JSON.stringify(data));
        } catch (e) {}
      } else {
        setDoc(settingsDocRef, DEFAULT_HOMEPAGE_SETTINGS).catch((err) =>
          console.error('Error seeding homepage settings:', err)
        );
      }
    }, (error) => {
      console.error('Firestore homepage settings subscription error:', error);
    });

    return () => unsubscribe();
  }, []);

  const updateHomepageSettings = async (updated: HomepageSettings) => {
    setHomepageSettings(updated);
    try {
      localStorage.setItem('pal_tailors_homepage_settings', JSON.stringify(updated));
    } catch (e) {}
    await setDoc(doc(db, 'settings', 'homepage'), updated, { merge: true });
  };

// Helper to strip undefined values so Firestore setDoc / updateDoc never fail
function sanitizeFirestoreData<T extends Record<string, any>>(obj: T): Record<string, any> {
  const clean: Record<string, any> = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined) {
      if (Array.isArray(obj[key])) {
        clean[key] = obj[key].map((item: any) =>
          item !== null && typeof item === 'object' ? sanitizeFirestoreData(item) : item
        );
      } else if (obj[key] !== null && typeof obj[key] === 'object') {
        clean[key] = sanitizeFirestoreData(obj[key]);
      } else {
        clean[key] = obj[key];
      }
    }
  });
  return clean;
}

  // Subscribe to Products collection in Firestore
  useEffect(() => {
    const productsRef = collection(db, 'products');
    const unsubscribe = onSnapshot(productsRef, (snapshot) => {
      if (!snapshot.empty) {
        const items: Product[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ ...docSnap.data(), id: docSnap.id } as Product);
        });
        items.sort((a, b) => (Number(a.displayOrder) || 9999) - (Number(b.displayOrder) || 9999));
        setProducts(items);
        try {
          localStorage.setItem('pal_tailors_products', JSON.stringify(items));
        } catch (e) {}
      } else {
        // Seed initial products to Firestore
        PRODUCTS_DATA.forEach((prod) => {
          const cleanProd = sanitizeFirestoreData(prod);
          setDoc(doc(db, 'products', prod.id), cleanProd).catch((err) =>
            console.error('Error seeding product:', err)
          );
        });
        setProducts(PRODUCTS_DATA);
      }
    }, (error) => {
      console.error('Firestore products subscription error:', error);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to Fabrics collection in Firestore
  useEffect(() => {
    const fabricsRef = collection(db, 'fabrics');
    const unsubscribe = onSnapshot(fabricsRef, (snapshot) => {
      if (!snapshot.empty) {
        const items: Fabric[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ ...docSnap.data(), id: docSnap.id } as Fabric);
        });
        items.sort((a, b) => (Number(a.displayOrder) || 9999) - (Number(b.displayOrder) || 9999));
        setFabrics(items);
        try {
          localStorage.setItem('pal_tailors_fabrics', JSON.stringify(items));
        } catch (e) {}
      } else {
        // Seed initial fabrics to Firestore
        FABRICS_DATA.forEach((fab) => {
          const cleanFab = sanitizeFirestoreData(fab);
          setDoc(doc(db, 'fabrics', fab.id), cleanFab).catch((err) =>
            console.error('Error seeding fabric:', err)
          );
        });
        setFabrics(FABRICS_DATA);
      }
    }, (error) => {
      console.error('Firestore fabrics subscription error:', error);
    });

    return () => unsubscribe();
  }, []);

  // Admin Auth
  const adminLogin = (id: string, pass: string): boolean => {
    if (id.trim() === 'test' && pass.trim() === '1234') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('pal_tailors_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('pal_tailors_admin_auth');
  };

  // Product CRUD via Firestore
  const updateProduct = async (updated: Product) => {
    const clean = sanitizeFirestoreData(updated);
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === updated.id);
      const next = exists ? prev.map((p) => (p.id === updated.id ? updated : p)) : [updated, ...prev];
      return next.sort((a, b) => (Number(a.displayOrder) || 9999) - (Number(b.displayOrder) || 9999));
    });
    await setDoc(doc(db, 'products', updated.id), clean, { merge: true });
  };

  const addProduct = async (newProd: Product) => {
    const clean = sanitizeFirestoreData(newProd);
    setProducts((prev) => {
      const filtered = prev.filter((p) => p.id !== newProd.id);
      const next = [newProd, ...filtered];
      return next.sort((a, b) => (Number(a.displayOrder) || 9999) - (Number(b.displayOrder) || 9999));
    });
    await setDoc(doc(db, 'products', newProd.id), clean);
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    await deleteDoc(doc(db, 'products', id));
  };

  const toggleProductSoldOut = async (id: string) => {
    const prod = products.find((p) => p.id === id);
    if (!prod) return;
    const nextIsSoldOut = !prod.isSoldOut;
    const updatedFields = {
      isSoldOut: nextIsSoldOut,
      inStock: !nextIsSoldOut,
    };
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    await updateDoc(doc(db, 'products', id), updatedFields);
  };

  // Fabric CRUD via Firestore
  const updateFabric = async (updated: Fabric) => {
    const clean = sanitizeFirestoreData(updated);
    setFabrics((prev) => {
      const exists = prev.some((f) => f.id === updated.id);
      const next = exists ? prev.map((f) => (f.id === updated.id ? updated : f)) : [updated, ...prev];
      return next.sort((a, b) => (Number(a.displayOrder) || 9999) - (Number(b.displayOrder) || 9999));
    });
    await setDoc(doc(db, 'fabrics', updated.id), clean, { merge: true });
  };

  const addFabric = async (newFab: Fabric) => {
    const clean = sanitizeFirestoreData(newFab);
    setFabrics((prev) => {
      const filtered = prev.filter((f) => f.id !== newFab.id);
      const next = [newFab, ...filtered];
      return next.sort((a, b) => (Number(a.displayOrder) || 9999) - (Number(b.displayOrder) || 9999));
    });
    await setDoc(doc(db, 'fabrics', newFab.id), clean);
  };

  const deleteFabric = async (id: string) => {
    setFabrics((prev) => prev.filter((f) => f.id !== id));
    await deleteDoc(doc(db, 'fabrics', id));
  };

  const toggleFabricSoldOut = async (id: string) => {
    const fab = fabrics.find((f) => f.id === id);
    if (!fab) return;
    const nextIsSoldOut = !fab.isSoldOut;
    const updatedFields = {
      isSoldOut: nextIsSoldOut,
      inStock: !nextIsSoldOut,
    };
    setFabrics((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updatedFields } : f))
    );
    await updateDoc(doc(db, 'fabrics', id), updatedFields);
  };

  const resetCatalogToDefaults = async () => {
    setProducts(PRODUCTS_DATA);
    setFabrics(FABRICS_DATA);
    try {
      const batch = writeBatch(db);
      PRODUCTS_DATA.forEach((p) => {
        batch.set(doc(db, 'products', p.id), p);
      });
      FABRICS_DATA.forEach((f) => {
        batch.set(doc(db, 'fabrics', f.id), f);
      });
      await batch.commit();
    } catch (err) {
      console.error('Failed to reset catalog in Firestore:', err);
    }
  };

  // Booking Modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'ready_made' | 'custom_fabric' | 'custom_dress' | 'general' | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(null);
  const [selectedGarment, setSelectedGarment] = useState<GarmentOption | null>(null);

  // Sync theme to root element html tag
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('pal_tailors_theme', theme);
  }, [theme]);

  // Sync language to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('pal_tailors_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const setTheme = (th: Theme) => {
    setThemeState(th);
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const openProductBooking = (product: Product) => {
    setSelectedProduct(product);
    setSelectedFabric(null);
    setSelectedGarment(null);
    setBookingType('ready_made');
    window.history.pushState({ modal: 'booking' }, '');
    setIsBookingModalOpen(true);
  };

  const openFabricBooking = (fabric: Fabric) => {
    setSelectedFabric(fabric);
    setSelectedProduct(null);
    setSelectedGarment(null);
    setBookingType('custom_fabric');
    window.history.pushState({ modal: 'booking' }, '');
    setIsBookingModalOpen(true);
  };

  const openCustomGarmentBooking = (garment: GarmentOption, fabric?: Fabric) => {
    setSelectedGarment(garment);
    if (fabric) setSelectedFabric(fabric);
    setSelectedProduct(null);
    setBookingType('custom_dress');
    window.history.pushState({ modal: 'booking' }, '');
    setIsBookingModalOpen(true);
  };

  const openGeneralBooking = () => {
    setSelectedProduct(null);
    setSelectedFabric(null);
    setSelectedGarment(null);
    setBookingType('general');
    window.history.pushState({ modal: 'booking' }, '');
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    if (window.history.state && window.history.state.modal === 'booking') {
      window.history.back();
    }
  };

  // Image Lightbox
  const [lightboxImage, setLightboxImage] = useState<{
    url: string;
    title?: string;
    itemId?: string;
    additionalImages?: string[];
  } | null>(null);

  const openImageZoom = (url: string, title?: string, itemId?: string, additionalImages?: string[]) => {
    if (!url) return;
    window.history.pushState({ modal: 'lightbox' }, '');
    setLightboxImage({ url, title, itemId, additionalImages });
  };

  const closeImageZoom = () => {
    setLightboxImage(null);
    if (window.history.state && window.history.state.modal === 'lightbox') {
      window.history.back();
    }
  };

  // Listen to mobile phone hardware back button / browser popstate to close open popups
  useEffect(() => {
    const handlePopState = () => {
      if (lightboxImage) {
        setLightboxImage(null);
      } else if (isBookingModalOpen) {
        setIsBookingModalOpen(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [lightboxImage, isBookingModalOpen]);

  const t = (enText: string, bnText: string) => {
    return language === 'bn' ? bnText : enText;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        setTheme,
        toggleTheme,
        activeTab,
        setActiveTab,
        homepageSettings,
        updateHomepageSettings,
        products,
        fabrics,
        updateProduct,
        addProduct,
        deleteProduct,
        toggleProductSoldOut,
        updateFabric,
        addFabric,
        deleteFabric,
        toggleFabricSoldOut,
        resetCatalogToDefaults,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        isBookingModalOpen,
        bookingType,
        selectedProduct,
        selectedFabric,
        selectedGarment,
        openProductBooking,
        openFabricBooking,
        openCustomGarmentBooking,
        openGeneralBooking,
        closeBookingModal,
        lightboxImage,
        openImageZoom,
        closeImageZoom,
        t,
      }}
    >
      {children}
      {lightboxImage && (
        <ImageLightboxModal
          imageUrl={lightboxImage.url}
          title={lightboxImage.title}
          itemId={lightboxImage.itemId}
          additionalImages={lightboxImage.additionalImages}
          onClose={closeImageZoom}
        />
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

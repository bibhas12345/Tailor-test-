import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Fabric, HomepageSettings } from '../types';
import {
  Lock,
  User,
  LogOut,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  Upload,
  RefreshCw,
  Image as ImageIcon,
  Tag,
  ShieldAlert,
  Scissors,
  Check,
  Package,
  Layers,
  Search,
  ZoomIn,
  Layout,
  Save,
  Store,
  MapPin,
  Phone,
  Sparkles,
  Award,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
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
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    openImageZoom,
    t,
  } = useApp();

  // Login form state
  const [adminIdInput, setAdminIdInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active subtab in admin panel
  const [adminSection, setAdminSection] = useState<'products' | 'fabrics' | 'homepage'>('products');

  // Search query state for admin panel
  const [adminSearchQuery, setAdminSearchQuery] = useState('');

  // Homepage Settings form state
  const [homepageForm, setHomepageForm] = useState<HomepageSettings>(homepageSettings);
  const [isSavingHomepage, setIsSavingHomepage] = useState(false);
  const [homepageSaveSuccess, setHomepageSaveSuccess] = useState(false);

  useEffect(() => {
    setHomepageForm(homepageSettings);
  }, [homepageSettings]);

  const handleSaveHomepage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingHomepage(true);
    setHomepageSaveSuccess(false);
    try {
      await updateHomepageSettings(homepageForm);
      setHomepageSaveSuccess(true);
      setTimeout(() => setHomepageSaveSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to update homepage settings:', err);
    } finally {
      setIsSavingHomepage(false);
    }
  };

  const handleHomepageImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const rawDataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setHomepageForm((prev) => ({ ...prev, heroImage: compressedDataUrl }));
        } else {
          setHomepageForm((prev) => ({ ...prev, heroImage: rawDataUrl }));
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleHomepageFrontProductUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const rawDataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 900;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setHomepageForm((prev) => ({ ...prev, frontProductImage: compressedDataUrl }));
        } else {
          setHomepageForm((prev) => ({ ...prev, frontProductImage: rawDataUrl }));
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleHomepageFrontFabricUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const rawDataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 900;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setHomepageForm((prev) => ({ ...prev, frontFabricImage: compressedDataUrl }));
        } else {
          setHomepageForm((prev) => ({ ...prev, frontFabricImage: rawDataUrl }));
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const defaultCraftDemoPhotos = [
    {
      id: '1',
      title: 'Blouse Stitching',
      bengaliTitle: 'ব্লাউজ সেলাই',
      subtitle: 'Custom neck & fit',
      bengaliSubtitle: 'কাস্টম ডিজাইন ও ফিটিং',
      imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '2',
      title: 'Making Clothes',
      bengaliTitle: 'পোশাক তৈরি',
      subtitle: 'Kurti, Nighty & Dresses',
      bengaliSubtitle: 'কুর্তি, নাইটি ও ড্রেস',
      imageUrl: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '3',
      title: 'Side Stitching',
      bengaliTitle: 'সাইড সেলাই',
      subtitle: 'Seam finish & alteration',
      bengaliSubtitle: 'পারফেক্ট সাইড ফিটিং',
      imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const currentCraftPhotos = (homepageForm.craftPhotos && homepageForm.craftPhotos.length === 3)
    ? homepageForm.craftPhotos
    : defaultCraftDemoPhotos;

  const updateCraftPhotoField = (index: number, field: string, value: string) => {
    setHomepageForm((prev) => {
      const list = prev.craftPhotos && prev.craftPhotos.length === 3
        ? prev.craftPhotos.map((item) => ({ ...item }))
        : defaultCraftDemoPhotos.map((item) => ({ ...item }));

      (list[index] as any)[field] = value;
      return { ...prev, craftPhotos: list };
    });
  };

  const handleCraftPhotoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const rawDataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          updateCraftPhotoField(index, 'imageUrl', compressedDataUrl);
        } else {
          updateCraftPhotoField(index, 'imageUrl', rawDataUrl);
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Modal / Form state for edit/create
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const [editingFabric, setEditingFabric] = useState<Fabric | null>(null);
  const [isAddingFabric, setIsAddingFabric] = useState(false);

  useEffect(() => {
    if (isAddingProduct || editingProduct || isAddingFabric || editingFabric) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAddingProduct, editingProduct, isAddingFabric, editingFabric]);

  // Form input states for Product
  const [productForm, setProductForm] = useState<Partial<Product>>({});
  // Form input states for Fabric
  const [fabricForm, setFabricForm] = useState<Partial<Fabric>>({});

  // Image preview state
  const [productImagePreview, setProductImagePreview] = useState<string>('');
  const [fabricImagePreview, setFabricImagePreview] = useState<string>('');

  // Generator helpers for unique PB-XXXX and FB-XXXX IDs
  const generateUniqueProductId = (): string => {
    let counter = products.length + 1;
    let candidate = `PB-${String(counter).padStart(4, '0')}`;
    while (products.some((p) => p.id === candidate)) {
      counter++;
      candidate = `PB-${String(counter).padStart(4, '0')}`;
    }
    return candidate;
  };

  const generateUniqueFabricId = (): string => {
    let counter = fabrics.length + 1;
    let candidate = `FB-${String(counter).padStart(4, '0')}`;
    while (fabrics.some((f) => f.id === candidate)) {
      counter++;
      candidate = `FB-${String(counter).padStart(4, '0')}`;
    }
    return candidate;
  };

  // Handle Login submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = adminLogin(adminIdInput, adminPasswordInput);
    if (!success) {
      setLoginError(
        t(
          'Invalid credentials! Hint: Use ID "test" and Password "1234".',
          'ভুল আইডি বা পাসওয়ার্ড! সঠিক আইডি: test এবং পাসওয়ার্ড: 1234'
        )
      );
    }
  };

  // File to Base64 compressed reader helper - Auto compresses image to max 900px canvas JPEG so Firestore syncs instantly!
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'product' | 'fabric' | 'product_additional' | 'fabric_additional',
    slotIndex?: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const rawDataUrl = reader.result as string;
      
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 900;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.82);

          if (type === 'product') {
            setProductForm((prev) => ({ ...prev, image: compressed }));
            setProductImagePreview(compressed);
          } else if (type === 'fabric') {
            setFabricForm((prev) => ({ ...prev, textureImage: compressed }));
            setFabricImagePreview(compressed);
          } else if (type === 'product_additional' && slotIndex !== undefined) {
            setProductForm((prev) => {
              const list = [...(prev.additionalImages || [])];
              list[slotIndex] = compressed;
              return { ...prev, additionalImages: list };
            });
          } else if (type === 'fabric_additional' && slotIndex !== undefined) {
            setFabricForm((prev) => {
              const list = [...(prev.additionalImages || [])];
              list[slotIndex] = compressed;
              return { ...prev, additionalImages: list };
            });
          }
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Open Edit Product Modal
  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      ...product,
      displayOrder: product.displayOrder ?? 1,
      additionalImages: product.additionalImages || [],
    });
    setProductImagePreview(product.image);
    setIsAddingProduct(false);
  };

  // Open Add Product Modal
  const openAddProductModal = () => {
    const newId = generateUniqueProductId();
    setEditingProduct(null);
    setProductForm({
      id: newId,
      title: '',
      bengaliTitle: '',
      category: 'kurti',
      subCategory: 'Kurti Collection',
      price: 1299,
      originalPrice: 1599,
      fabric: 'Soft Cotton',
      estimatedDays: 2,
      sizes: ['M', 'L', 'XL', 'XXL'],
      tags: ['New Arrival'],
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      additionalImages: [],
      description: '',
      bengaliDescription: '',
      features: ['100% Handcrafted by Pal Tailors'],
      inStock: true,
      isSoldOut: false,
      displayOrder: 1,
    });
    setProductImagePreview('https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80');
    setIsAddingProduct(true);
  };

  // Save Product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price) {
      alert(t('Please enter at least Title and Price', 'শিরোনাম এবং মূল্য লিখুন'));
      return;
    }

    const cleanAdditional = (productForm.additionalImages || [])
      .slice(0, 4)
      .filter((url): url is string => typeof url === 'string' && url.trim().length > 0);

    const finalProduct: Product = {
      id: productForm.id || generateUniqueProductId(),
      title: productForm.title || 'Custom Garment',
      bengaliTitle: productForm.bengaliTitle || productForm.title || 'পোশাক',
      category: (productForm.category as any) || 'kurti',
      subCategory: productForm.subCategory || 'General',
      price: Number(productForm.price) || 0,
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
      fabric: productForm.fabric || 'Pure Fabric',
      estimatedDays: Number(productForm.estimatedDays) || 3,
      sizes: Array.isArray(productForm.sizes)
        ? productForm.sizes
        : typeof productForm.sizes === 'string'
        ? (productForm.sizes as string).split(',').map((s) => s.trim())
        : ['M', 'L', 'XL'],
      tags: Array.isArray(productForm.tags)
        ? productForm.tags
        : typeof productForm.tags === 'string'
        ? (productForm.tags as string).split(',').map((s) => s.trim())
        : ['Custom'],
      image: productForm.image || productImagePreview || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      additionalImages: cleanAdditional,
      description: productForm.description || '',
      bengaliDescription: productForm.bengaliDescription || '',
      features: productForm.features || ['Handcrafted by Pal Tailors'],
      inStock: !productForm.isSoldOut,
      isSoldOut: !!productForm.isSoldOut,
      displayOrder: productForm.displayOrder ? Number(productForm.displayOrder) : 1,
    };

    try {
      if (isAddingProduct) {
        await addProduct(finalProduct);
        alert(t('Product added successfully!', 'পণ্যটি সফলভাবে যোগ করা হয়েছে!'));
      } else {
        await updateProduct(finalProduct);
        alert(t('Product updated successfully!', 'পণ্যটি সফলভাবে আপডেট করা হয়েছে!'));
      }
      setIsAddingProduct(false);
      setEditingProduct(null);
    } catch (err) {
      console.error('Failed to save product:', err);
      alert(t('Failed to save product. Please try again.', 'পণ্য সংরক্ষণে সমস্যা হয়েছে। আবার চেষ্টা করুন।'));
    }
  };

  // Open Edit Fabric Modal
  const openEditFabricModal = (fabric: Fabric) => {
    setEditingFabric(fabric);
    setFabricForm({
      ...fabric,
      displayOrder: fabric.displayOrder ?? 1,
      additionalImages: fabric.additionalImages || [],
    });
    setFabricImagePreview(fabric.textureImage);
    setIsAddingFabric(false);
  };

  // Open Add Fabric Modal
  const openAddFabricModal = () => {
    const newId = generateUniqueFabricId();
    setEditingFabric(null);
    setFabricForm({
      id: newId,
      name: '',
      bengaliName: '',
      material: 'Murshidabad Silk',
      pricePerMeter: 650,
      origin: 'Bengal Handloom',
      description: '',
      colors: ['Red', 'Golden', 'Maroon'],
      textureImage: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      additionalImages: [],
      inStock: true,
      isSoldOut: false,
      displayOrder: 1,
    });
    setFabricImagePreview('https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80');
    setIsAddingFabric(true);
  };

  // Save Fabric
  const handleSaveFabric = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fabricForm.name || !fabricForm.material) {
      alert(t('Please enter at least Fabric Name and Material', 'কাপড়ের নাম এবং উপাদান লিখুন'));
      return;
    }

    const cleanAdditional = (fabricForm.additionalImages || [])
      .slice(0, 4)
      .filter((url): url is string => typeof url === 'string' && url.trim().length > 0);

    const finalFabric: Fabric = {
      id: fabricForm.id || generateUniqueFabricId(),
      name: fabricForm.name || 'Pure Fabric',
      bengaliName: fabricForm.bengaliName || fabricForm.name || 'কাপড়',
      material: fabricForm.material || 'Cotton Silk',
      pricePerMeter: Number(fabricForm.pricePerMeter) || 500,
      origin: fabricForm.origin || 'Bengal',
      description: fabricForm.description || '',
      colors: Array.isArray(fabricForm.colors)
        ? fabricForm.colors
        : typeof fabricForm.colors === 'string'
        ? (fabricForm.colors as string).split(',').map((c) => c.trim())
        : ['Red', 'Gold'],
      textureImage: fabricForm.textureImage || fabricImagePreview || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
      additionalImages: cleanAdditional,
      inStock: !fabricForm.isSoldOut,
      isSoldOut: !!fabricForm.isSoldOut,
      displayOrder: fabricForm.displayOrder ? Number(fabricForm.displayOrder) : 1,
    };

    try {
      if (isAddingFabric) {
        await addFabric(finalFabric);
        alert(t('Fabric added successfully!', 'ফেব্রিকটি সফলভাবে যোগ করা হয়েছে!'));
      } else {
        await updateFabric(finalFabric);
        alert(t('Fabric updated successfully!', 'ফেব্রিকটি সফলভাবে আপডেট করা হয়েছে!'));
      }
      setIsAddingFabric(false);
      setEditingFabric(null);
    } catch (err) {
      console.error('Failed to save fabric:', err);
      alert(t('Failed to save fabric. Please try again.', 'ফেব্রিক সংরক্ষণে সমস্যা হয়েছে। আবার চেষ্টা করুন।'));
    }
  };

  // IF NOT LOGGED IN SHOW LOGIN SCREEN
  if (!isAdminLoggedIn) {
    return (
      <section className="min-h-[80vh] py-16 bg-[#FAF5EE] dark:bg-[#180D0F] flex items-center justify-center px-4 transition-colors">
        <div className="max-w-md w-full bg-[#FFFDF9] dark:bg-[#221216] rounded-3xl border-2 border-[#E5D8C8] dark:border-[#3D1B22] p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#801921] text-[#F7EBE8] flex items-center justify-center shadow-lg">
              <Lock className="w-8 h-8 text-amber-300" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#331A1E] dark:text-[#F7EBE8]">
              {t('Pal Tailors Owner Login', 'পাল টেলরস অ্যাডমিন লগইন')}
            </h2>
            <p className="text-xs text-[#63483E] dark:text-[#D8C3B8]">
              {t(
                'Enter admin credentials to add, edit or delete catalog dresses & fabrics.',
                'পোশাক ও ফ্যাব্রিক ক্যাটালগ এডিট ও আপডেট করতে লগইন করুন।'
              )}
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-800 rounded-xl text-xs font-bold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#331A1E] dark:text-[#F7EBE8] mb-1">
                {t('Admin ID', 'অ্যাডমিন আইডি')}
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder={t('Enter Admin ID', 'অ্যাডমিন আইডি লিখুন')}
                  value={adminIdInput}
                  onChange={(e) => setAdminIdInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5D8C8] dark:border-[#3D1B22] bg-[#FFFDF9] dark:bg-[#180C0F] text-[#331A1E] dark:text-[#F7EBE8] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#801921]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#331A1E] dark:text-[#F7EBE8] mb-1">
                {t('Password', 'পাসওয়ার্ড')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="password"
                  required
                  placeholder={t('Enter Password', 'পাসওয়ার্ড লিখুন')}
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E5D8C8] dark:border-[#3D1B22] bg-[#FFFDF9] dark:bg-[#180C0F] text-[#331A1E] dark:text-[#F7EBE8] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#801921]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#801921] hover:bg-[#991D26] text-white font-bold text-xs shadow-md transition active:scale-95"
            >
              {t('Login to Dashboard', 'ড্যাশবোর্ডে প্রবেশ করুন')}
            </button>
          </form>
        </div>
      </section>
    );
  }

  // LOGGED IN ADMIN DASHBOARD
  return (
    <section className="py-10 bg-[#FAF5EE] dark:bg-[#180D0F] transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Bar */}
        <div className="bg-[#FFFDF9] dark:bg-[#221216] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-3xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#801921] text-white flex items-center justify-center shadow-md">
              <Scissors className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                {t('Pal Tailors Owner Dashboard', 'পাল টেলরস মালিক ড্যাশবোর্ড')}
              </h2>
              <p className="text-xs text-[#63483E] dark:text-[#D8C3B8]">
                {t('Manage dresses, fabric textures, prices & sold-out statuses in real-time across all devices.', 'সব ডিভাইসে আপনার শপের পোশাক ও ফ্যাব্রিক লাইভ পরিচালনা করুন।')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={adminLogout}
              className="px-4 py-2 rounded-xl bg-rose-800 hover:bg-rose-900 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('Logout', 'লগআউট')}</span>
            </button>
          </div>
        </div>

        {/* Navigation Section Tabs & Search Filter */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-[#F3E9DD]/90 dark:bg-[#221216] p-4 rounded-2xl border border-[#E5D8C8] dark:border-[#3D1B22]">
          
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <button
              onClick={() => setAdminSection('products')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                adminSection === 'products'
                  ? 'bg-[#801921] text-white shadow-md dark:bg-[#991D26]'
                  : 'bg-[#FFFDF9] dark:bg-[#2D161C] text-[#331A1E] dark:text-[#EBD6CB] hover:bg-[#EBE0D2]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>{t(`Ready-Made Dresses (${products.length})`, `তৈরি পোশাক (${products.length})`)}</span>
            </button>

            <button
              onClick={() => setAdminSection('fabrics')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                adminSection === 'fabrics'
                  ? 'bg-[#801921] text-white shadow-md dark:bg-[#991D26]'
                  : 'bg-[#FFFDF9] dark:bg-[#2D161C] text-[#331A1E] dark:text-[#EBD6CB] hover:bg-[#EBE0D2]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{t(`Pure Fabrics (${fabrics.length})`, `ফ্যাব্রিক ক্যাটালগ (${fabrics.length})`)}</span>
            </button>

            <button
              onClick={() => setAdminSection('homepage')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                adminSection === 'homepage'
                  ? 'bg-[#801921] text-white shadow-md dark:bg-[#991D26]'
                  : 'bg-[#FFFDF9] dark:bg-[#2D161C] text-[#331A1E] dark:text-[#EBD6CB] hover:bg-[#EBE0D2]'
              }`}
            >
              <Layout className="w-4 h-4 text-amber-400" />
              <span>{t('Homepage & Store Info', 'হোমপেজ ও স্টোর সেটিংস')}</span>
            </button>
          </div>

          {/* Search Box & Add New Button */}
          {adminSection !== 'homepage' && (
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder={t('Search by ID or title...', 'আইডি বা নাম খুঁজুন...')}
                  value={adminSearchQuery}
                  onChange={(e) => setAdminSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E5D8C8] dark:border-[#3D1B22] bg-[#FFFDF9] dark:bg-[#180C0F] text-[#331A1E] dark:text-[#F7EBE8]"
                />
              </div>

              {adminSection === 'products' ? (
                <button
                  onClick={openAddProductModal}
                  className="px-4 py-2 rounded-xl bg-[#801921] hover:bg-[#991D26] text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition active:scale-95 flex-shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('Add New Dress', 'নতুন পোশাক যোগ')}</span>
                </button>
              ) : (
                <button
                  onClick={openAddFabricModal}
                  className="px-4 py-2 rounded-xl bg-[#801921] hover:bg-[#991D26] text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition active:scale-95 flex-shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{t('Add New Fabric', 'নতুন ফ্যাব্রিক যোগ')}</span>
                </button>
              )}
            </div>
          )}

        </div>


        {/* SECTION 1: PRODUCTS LIST */}
        {adminSection === 'products' && (
          <div className="space-y-4">
            {products.filter((prod) => {
              const q = adminSearchQuery.trim().toLowerCase();
              if (!q) return true;
              return (
                prod.id.toLowerCase().includes(q) ||
                prod.title.toLowerCase().includes(q) ||
                prod.bengaliTitle.includes(q) ||
                prod.category.toLowerCase().includes(q) ||
                prod.subCategory.toLowerCase().includes(q) ||
                prod.fabric.toLowerCase().includes(q)
              );
            }).length === 0 ? (
              <div className="p-8 text-center bg-[#FFFDF9] dark:bg-[#221216] rounded-2xl border border-[#E5D8C8] dark:border-[#3D1B22] text-[#63483E] dark:text-[#D8C3B8]">
                <p className="font-bold text-sm">
                  {t('No products matched your search ID or title.', 'আপনার সার্চ আইডির সাথে কোনো পোশাক মেলেনি।')}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products
                  .filter((prod) => {
                    const q = adminSearchQuery.trim().toLowerCase();
                    if (!q) return true;
                    return (
                      prod.id.toLowerCase().includes(q) ||
                      prod.title.toLowerCase().includes(q) ||
                      prod.bengaliTitle.includes(q) ||
                      prod.category.toLowerCase().includes(q) ||
                      prod.subCategory.toLowerCase().includes(q) ||
                      prod.fabric.toLowerCase().includes(q)
                    );
                  })
                  .map((prod, idx) => {
                    const isSoldOut = !!prod.isSoldOut;
                    return (
                      <div
                        key={prod.id}
                        className={`bg-[#FFFDF9] dark:bg-[#221216] rounded-2xl border transition shadow-md overflow-hidden flex flex-col justify-between ${
                          isSoldOut
                            ? 'border-stone-400 dark:border-stone-700 bg-stone-100/90 dark:bg-stone-900/80 opacity-80'
                            : 'border-[#E5D8C8] dark:border-[#3D1B22]'
                        }`}
                      >
                        {/* Top Image Preview & Badges - Fitted 3:4 Aspect Ratio */}
                        <div
                          onClick={() => openImageZoom(prod.image, prod.title, prod.id, prod.additionalImages)}
                          className="relative aspect-[3/4] bg-[#F3E9DD] dark:bg-[#180D0F] overflow-hidden cursor-pointer group/img"
                          title="Click to view full image gallery"
                        >
                          <img
                            key={prod.image}
                            src={prod.image}
                            alt={prod.title}
                            className={`w-full h-full object-cover object-top transition duration-500 ${
                              isSoldOut ? 'grayscale contrast-90 brightness-95 opacity-85' : 'group-hover/img:scale-105'
                            }`}
                          />

                          {/* Unique Product ID Badge - Warm Professional Tone */}
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#FFFDF9]/95 dark:bg-[#2A221E]/95 backdrop-blur-md text-[#522917] dark:text-[#E8D3C3] font-mono text-[10px] font-bold tracking-wider border border-[#E0D0C0] dark:border-[#4A3B32] shadow-sm z-10">
                            ID: {prod.id}
                          </div>

                          {/* Additional Photos Badge - Warm Professional Tone */}
                          {prod.additionalImages && prod.additionalImages.filter(Boolean).length > 0 && (
                            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#FFFDF9]/95 dark:bg-[#2A221E]/95 backdrop-blur-md text-[#522917] dark:text-[#E8D3C3] text-[10px] font-bold flex items-center gap-1 shadow-sm border border-[#E0D0C0] dark:border-[#4A3B32] z-10">
                              +{prod.additionalImages.filter(Boolean).length + 1} photos
                            </div>
                          )}

                          {/* Sold Out Overlay Badge - Crisp & Grayish without Blur */}
                          {isSoldOut ? (
                            <div className="absolute inset-0 bg-stone-900/15 flex items-center justify-center pointer-events-none z-10">
                              <span className="px-3.5 py-1.5 rounded-lg bg-stone-900/90 text-stone-100 font-extrabold text-xs uppercase tracking-widest border border-stone-600 shadow-xl flex items-center gap-1.5">
                                <XCircle className="w-4 h-4 text-amber-400" />
                                <span>{t('SOLD OUT', 'আউট অব স্টক')}</span>
                              </span>
                            </div>
                          ) : (
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-800 text-white text-[11px] font-bold shadow-md">
                              {t('Available', 'স্টকে আছে')}
                            </div>
                          )}

                          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/80 text-amber-300 text-xs font-bold font-mono">
                            ₹{prod.price}
                          </div>
                        </div>

                        {/* Content Details */}
                        <div className="p-4 space-y-3 flex-1">
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-serif font-bold text-base text-[#331A1E] dark:text-[#F7EBE8] line-clamp-1">
                                {prod.title}
                              </h3>
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F3E9DD] dark:bg-[#2A141A] text-[#801921] dark:text-[#F4D6DC] border border-[#E5D8C8]">
                                {prod.id}
                              </span>
                            </div>
                            <p className="text-xs text-[#801921] dark:text-rose-400 font-bold">
                              {prod.bengaliTitle}
                            </p>
                          </div>

                          <div className="text-xs text-[#63483E] dark:text-[#D8C3B8] space-y-1">
                            <p>
                              <span className="font-bold">{t('Category:', 'ক্যাটাগরি:')}</span>{' '}
                              <span className="capitalize">{prod.category === 'traditional' ? t('Traditional (Man/Woman)', 'ট্র্যাডিশনাল (পুরুষ/মহিলা)') : prod.category}</span> ({prod.subCategory})
                            </p>
                            <p>
                              <span className="font-bold">{t('Fabric:', 'ফ্যাব্রিক:')}</span> {prod.fabric}
                            </p>
                            <div className="flex items-center gap-2 pt-1.5 border-t border-[#E5D8C8]/60 dark:border-[#3D1B22]/60">
                              <span className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">{t('Display Order:', 'প্রদর্শন ক্রম:')}</span>
                              <input
                                type="number"
                                min="1"
                                value={prod.displayOrder ?? (idx + 1)}
                                onChange={(e) => updateProduct({ ...prod, displayOrder: Number(e.target.value) })}
                                className="w-16 px-2 py-1 rounded-lg border border-[#E5D8C8] dark:border-[#3D1B22] bg-[#FAF5EE] dark:bg-[#180C0F] text-center text-xs font-bold text-[#801921] dark:text-amber-300"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Actions Bar: Edit, Sold Out Toggle, Delete */}
                        <div className="p-4 pt-0 space-y-2 border-t border-[#E5D8C8] dark:border-[#3D1B22] mt-2">
                          <div className="flex items-center gap-2 pt-3">
                            <button
                              onClick={() => toggleProductSoldOut(prod.id)}
                              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 ${
                                isSoldOut
                                  ? 'bg-emerald-700 hover:bg-emerald-600 text-white'
                                  : 'bg-rose-800 hover:bg-rose-900 text-white'
                              }`}
                            >
                              {isSoldOut ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>{t('Mark Available', 'উপলব্ধ করুন')}</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>{t('Mark SOLD OUT', 'সোল্ড আউট')}</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => openEditProductModal(prod)}
                              className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold transition"
                              title={t('Edit Product Details', 'সম্পাদনা করুন')}
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={async () => {
                                if (confirm(t('Are you sure you want to delete this product?', 'এই পোশাকটি ডিলিট করতে চান?'))) {
                                  try {
                                    await deleteProduct(prod.id);
                                    alert(t('Product deleted successfully!', 'পণ্যটি সফলভাবে মুছে ফেলা হয়েছে!'));
                                  } catch (e) {
                                    alert(t('Failed to delete product.', 'পণ্য মুছতে সমস্যা হয়েছে।'));
                                  }
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300 font-bold transition"
                              title={t('Delete Product', 'মুছে ফেলুন')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: FABRICS LIST */}
        {adminSection === 'fabrics' && (
          <div className="space-y-4">
            {fabrics.filter((fab) => {
              const q = adminSearchQuery.trim().toLowerCase();
              if (!q) return true;
              return (
                fab.id.toLowerCase().includes(q) ||
                fab.name.toLowerCase().includes(q) ||
                fab.bengaliName.includes(q) ||
                fab.material.toLowerCase().includes(q)
              );
            }).length === 0 ? (
              <div className="p-8 text-center bg-[#FFFDF9] dark:bg-[#221216] rounded-2xl border border-[#E5D8C8] dark:border-[#3D1B22] text-[#63483E] dark:text-[#D8C3B8]">
                <p className="font-bold text-sm">
                  {t('No fabrics matched your search query.', 'আপনার অনুসন্ধানের সাথে কোনো ফ্যাব্রিক মেলেনি।')}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fabrics
                  .filter((fab) => {
                    const q = adminSearchQuery.trim().toLowerCase();
                    if (!q) return true;
                    return (
                      fab.id.toLowerCase().includes(q) ||
                      fab.name.toLowerCase().includes(q) ||
                      fab.bengaliName.includes(q) ||
                      fab.material.toLowerCase().includes(q)
                    );
                  })
                  .map((fab, idx) => {
                    const isSoldOut = !!fab.isSoldOut;
                    return (
                      <div
                        key={fab.id}
                        className={`bg-[#FFFDF9] dark:bg-[#221216] rounded-2xl border transition shadow-md overflow-hidden flex flex-col justify-between ${
                          isSoldOut
                            ? 'border-stone-400 dark:border-stone-700 bg-stone-100/90 dark:bg-stone-900/80 opacity-80'
                            : 'border-[#E5D8C8] dark:border-[#3D1B22]'
                        }`}
                      >
                        <div
                          onClick={() => openImageZoom(fab.textureImage, fab.name, fab.id, fab.additionalImages)}
                          className="relative aspect-16/10 bg-[#F3E9DD] dark:bg-[#180D0F] overflow-hidden cursor-pointer group/img"
                          title="Click to view full fabric gallery"
                        >
                          <img
                            key={fab.textureImage}
                            src={fab.textureImage}
                            alt={fab.name}
                            className={`w-full h-full object-cover object-center transition duration-500 ${
                              isSoldOut ? 'grayscale contrast-90 brightness-95 opacity-85' : 'group-hover/img:scale-105'
                            }`}
                          />

                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#FFFDF9]/95 dark:bg-[#2A221E]/95 backdrop-blur-md text-[#522917] dark:text-[#E8D3C3] font-mono text-[10px] font-bold tracking-wider border border-[#E0D0C0] dark:border-[#4A3B32] shadow-sm z-10">
                            ID: {fab.id}
                          </div>

                          {/* Additional Photos Badge - Warm Professional Tone */}
                          {fab.additionalImages && fab.additionalImages.filter(Boolean).length > 0 && (
                            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#FFFDF9]/95 dark:bg-[#2A221E]/95 backdrop-blur-md text-[#522917] dark:text-[#E8D3C3] text-[10px] font-bold flex items-center gap-1 shadow-sm border border-[#E0D0C0] dark:border-[#4A3B32] z-10">
                              +{fab.additionalImages.filter(Boolean).length + 1} photos
                            </div>
                          )}

                          {/* Sold Out Overlay Badge - Crisp & Grayish without Blur */}
                          {isSoldOut ? (
                            <div className="absolute inset-0 bg-stone-900/15 flex items-center justify-center pointer-events-none z-10">
                              <span className="px-3.5 py-1.5 rounded-lg bg-stone-900/90 text-stone-100 font-extrabold text-xs uppercase tracking-widest border border-stone-600 shadow-xl flex items-center gap-1.5">
                                <XCircle className="w-4 h-4 text-amber-400" />
                                <span>{t('SOLD OUT', 'আউট অব স্টক')}</span>
                              </span>
                            </div>
                          ) : (
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-800 text-white text-[11px] font-bold shadow-md">
                              {t('Available', 'স্টকে আছে')}
                            </div>
                          )}
                        </div>

                        <div className="p-4 space-y-3 flex-1">
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-serif font-bold text-base text-[#331A1E] dark:text-[#F7EBE8] line-clamp-1">
                                {fab.name}
                              </h3>
                              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#F3E9DD] dark:bg-[#2A141A] text-[#801921] dark:text-[#F4D6DC] border border-[#E5D8C8]">
                                {fab.id}
                              </span>
                            </div>
                            <p className="text-xs text-[#801921] dark:text-rose-400 font-bold">
                              {fab.bengaliName}
                            </p>
                          </div>

                          <div className="text-xs text-[#63483E] dark:text-[#D8C3B8] space-y-1">
                            <p>
                              <span className="font-bold">{t('Price:', 'দাম:')}</span> ₹{fab.pricePerMeter || 500}
                            </p>
                            <p>
                              <span className="font-bold">{t('Material:', 'উপাদান:')}</span> {fab.material}
                            </p>
                            <div className="flex items-center gap-2 pt-1.5 border-t border-[#E5D8C8]/60 dark:border-[#3D1B22]/60">
                              <span className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">{t('Display Order:', 'প্রদর্শন ক্রম:')}</span>
                              <input
                                type="number"
                                min="1"
                                value={fab.displayOrder ?? (idx + 1)}
                                onChange={(e) => updateFabric({ ...fab, displayOrder: Number(e.target.value) })}
                                className="w-16 px-2 py-1 rounded-lg border border-[#E5D8C8] dark:border-[#3D1B22] bg-[#FAF5EE] dark:bg-[#180C0F] text-center text-xs font-bold text-[#801921] dark:text-amber-300"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 pt-0 space-y-2 border-t border-[#E5D8C8] dark:border-[#3D1B22] mt-2">
                          <div className="flex items-center gap-2 pt-3">
                            <button
                              onClick={() => toggleFabricSoldOut(fab.id)}
                              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5 ${
                                isSoldOut
                                  ? 'bg-emerald-700 hover:bg-emerald-600 text-white'
                                  : 'bg-rose-800 hover:bg-rose-900 text-white'
                              }`}
                            >
                              {isSoldOut ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>{t('Mark Available', 'উপলব্ধ করুন')}</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>{t('Mark SOLD OUT', 'সোল্ড আউট')}</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => openEditFabricModal(fab)}
                              className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold transition"
                              title={t('Edit Fabric Details', 'সম্পাদনা করুন')}
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={async () => {
                                if (confirm(t('Are you sure you want to delete this fabric?', 'এই ফ্যাব্রিকটি ডিলিট করতে চান?'))) {
                                  try {
                                    await deleteFabric(fab.id);
                                    alert(t('Fabric deleted successfully!', 'ফেব্রিকটি সফলভাবে মুছে ফেলা হয়েছে!'));
                                  } catch (e) {
                                    alert(t('Failed to delete fabric.', 'ফেব্রিক মুছতে সমস্যা হয়েছে।'));
                                  }
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300 font-bold transition"
                              title={t('Delete Fabric', 'মুছে ফেলুন')}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}

        {/* SECTION 3: HOMEPAGE & STORE SETTINGS */}
        {adminSection === 'homepage' && (
          <form onSubmit={handleSaveHomepage} className="space-y-6">
            
            {/* Top Info Banner with Save & Cancel Buttons */}
            <div className="bg-[#FFFDF9] dark:bg-[#221216] p-6 rounded-2xl border border-[#E5D8C8] dark:border-[#3D1B22] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3E9DD] dark:bg-[#2A141A] text-[#801921] dark:text-[#F4D6DC] text-xs font-bold border border-[#E5D8C8]">
                  <Store className="w-3.5 h-3.5 text-[#801921]" />
                  <span>{t('Store & Homepage Customization', 'হোমপেজ ও স্টোর সেটিংস')}</span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                  {t('Edit Homepage Photos, Tagline & Address', 'হোমপেজ ছবি, ট্যাগলাইন ও ঠিকানা পরিবর্তন')}
                </h2>
                <p className="text-xs text-[#63483E] dark:text-[#D8C3B8]">
                  {t(
                    'Changes made here update homepage hero photo, text inside photo, front product/fabric card images, address banner, and contact buttons instantly.',
                    'এখানে পরিবর্তন করলে হোমপেজের ছবি, ছবির ভিতরের লেখা, ফ্রন্ট প্রোডাক্ট ও ফ্যাব্রিক ছবি এবং ফোন নম্বর লাইভ আপডেট হবে।'
                  )}
                </p>
              </div>

              {/* Save or Cancel Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setHomepageForm(homepageSettings)}
                  className="px-4 py-2.5 rounded-xl bg-[#EFE7DC] hover:bg-[#E2D6C6] dark:bg-[#2A181C] dark:hover:bg-[#382025] text-[#331A1E] dark:text-[#F7EBE8] font-bold text-xs sm:text-sm border border-[#E5D8C8] dark:border-[#3D1B22] transition cursor-pointer"
                >
                  {t('Cancel', 'বাতিল')}
                </button>

                <button
                  type="submit"
                  disabled={isSavingHomepage}
                  className="px-6 py-2.5 rounded-xl bg-[#801921] hover:bg-[#991D26] text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSavingHomepage ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                  ) : (
                    <Save className="w-4 h-4 text-amber-300" />
                  )}
                  <span>{isSavingHomepage ? t('Saving...', 'সেভ হচ্ছে...') : t('Save Settings', 'সেভ করুন')}</span>
                </button>
              </div>
            </div>

            {/* Success Toast Notification */}
            {homepageSaveSuccess && (
              <div className="p-4 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center justify-between border border-emerald-600 shadow-md animate-in fade-in">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-300" />
                  <span>{t('Homepage settings saved successfully! Customer homepage updated in real-time.', 'হোমপেজ সেটিংস সফলভাবে সেভ করা হয়েছে!')}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Column: Brand & Content inside Photo */}
              <div className="space-y-6">
                
                {/* Brand Titles & Photo Overlay Content Card */}
                <div className="bg-[#FFFDF9] dark:bg-[#221216] p-6 rounded-2xl border border-[#E5D8C8] dark:border-[#3D1B22] shadow-sm space-y-4">
                  <h3 className="font-serif font-bold text-base text-[#331A1E] dark:text-[#F7EBE8] flex items-center gap-2 pb-2 border-b border-[#E5D8C8] dark:border-[#3D1B22]">
                    <Sparkles className="w-4 h-4 text-[#801921] dark:text-amber-400" />
                    <span>{t('Content Inside Homepage Photo', 'ছবিতে দেখানোর লেখা')}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-xs text-[#331A1E] dark:text-[#F7EBE8]">
                        {t('Store Title (English)', 'দোকানের নাম (ইংরেজি)')}
                      </label>
                      <input
                        type="text"
                        value={homepageForm.title}
                        onChange={(e) => setHomepageForm({ ...homepageForm, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-semibold"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-xs text-[#331A1E] dark:text-[#F7EBE8]">
                        {t('Store Title (Bengali)', 'দোকানের নাম (বাংলা)')}
                      </label>
                      <input
                        type="text"
                        value={homepageForm.bengaliTitle}
                        onChange={(e) => setHomepageForm({ ...homepageForm, bengaliTitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-semibold"
                        required
                      />
                    </div>
                  </div>

                  {/* Main Title inside Photo */}
                  <div className="space-y-2 pt-2 border-t border-[#E5D8C8] dark:border-[#3D1B22]">
                    <div className="space-y-1">
                      <label className="font-bold text-xs text-[#331A1E] dark:text-[#F7EBE8]">
                        {t('Main Title Inside Hero Photo (English)', 'ছবিতে মূল শিরোনাম (ইংরেজি)')}
                      </label>
                      <input
                        type="text"
                        value={homepageForm.imageTagline}
                        onChange={(e) => setHomepageForm({ ...homepageForm, imageTagline: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-semibold"
                        placeholder="e.g. Pal Tailors — Heritage Stitching, Modern Comfort"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-xs text-[#331A1E] dark:text-[#F7EBE8]">
                        {t('Main Title Inside Hero Photo (Bengali)', 'ছবিতে মূল শিরোনাম (বাংলা)')}
                      </label>
                      <input
                        type="text"
                        value={homepageForm.bengaliImageTagline}
                        onChange={(e) => setHomepageForm({ ...homepageForm, bengaliImageTagline: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-semibold"
                        placeholder="যেমন: পাল টেলরস — ঐতিহ্যবাহী সেলাই ও আধুনিক আরাম"
                        required
                      />
                    </div>
                  </div>

                  {/* Sub-description inside Photo */}
                  <div className="space-y-2 pt-2 border-t border-[#E5D8C8] dark:border-[#3D1B22]">
                    <div className="space-y-1">
                      <label className="font-bold text-xs text-[#331A1E] dark:text-[#F7EBE8]">
                        {t('Sub-description Inside Hero Photo (English)', 'ছবিতে বিবরণ (ইংরেজি)')}
                      </label>
                      <textarea
                        rows={2}
                        value={homepageForm.tagline}
                        onChange={(e) => setHomepageForm({ ...homepageForm, tagline: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-xs text-[#331A1E] dark:text-[#F7EBE8]">
                        {t('Sub-description Inside Hero Photo (Bengali)', 'ছবিতে বিবরণ (বাংলা)')}
                      </label>
                      <textarea
                        rows={2}
                        value={homepageForm.bengaliTagline}
                        onChange={(e) => setHomepageForm({ ...homepageForm, bengaliTagline: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Front Cards Images: Product & Fabric Cards */}
                <div className="bg-[#FFFDF9] dark:bg-[#221216] p-6 rounded-2xl border border-[#E5D8C8] dark:border-[#3D1B22] shadow-sm space-y-4">
                  <h3 className="font-serif font-bold text-base text-[#331A1E] dark:text-[#F7EBE8] flex items-center gap-2 pb-2 border-b border-[#E5D8C8] dark:border-[#3D1B22]">
                    <Package className="w-4 h-4 text-[#801921] dark:text-amber-400" />
                    <span>{t('Front Product & Front Fabric Images', 'হোমপেজের ফ্রন্ট প্রোডাক্ট ও ফ্যাব্রিক ছবি')}</span>
                  </h3>

                  {/* Front Product Image */}
                  <div className="space-y-2 p-3 bg-[#FAF5EE] dark:bg-[#180C0F] rounded-xl border border-[#E5D8C8] dark:border-[#3D1B22]">
                    <label className="font-bold text-xs text-[#331A1E] dark:text-[#F7EBE8] block">
                      {t('Front Product Image (Ready Made Card)', 'ফ্রন্ট প্রোডাক্ট ছবি (রেডিমেড কার্ড)')}
                    </label>
                    <input
                      type="text"
                      value={homepageForm.frontProductImage || ''}
                      onChange={(e) => setHomepageForm({ ...homepageForm, frontProductImage: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FFFDF9] dark:bg-[#221216] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-lg text-xs font-mono"
                      placeholder="Image URL..."
                    />
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHomepageFrontProductUpload}
                        className="hidden"
                        id="homepage-front-product-upload"
                      />
                      <label
                        htmlFor="homepage-front-product-upload"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F3E9DD] dark:bg-[#2A141A] text-[#801921] dark:text-[#F4D6DC] font-bold text-xs border border-[#E5D8C8] cursor-pointer transition"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{t('Upload Product Image', 'ছবি আপলোড করুন')}</span>
                      </label>
                      {homepageForm.frontProductImage && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-300">
                          <img src={homepageForm.frontProductImage} alt="Front Product" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Front Fabric Image */}
                  <div className="space-y-2 p-3 bg-[#FAF5EE] dark:bg-[#180C0F] rounded-xl border border-[#E5D8C8] dark:border-[#3D1B22]">
                    <label className="font-bold text-xs text-[#331A1E] dark:text-[#F7EBE8] block">
                      {t('Front Fabric Image (Fabric Catalog Card)', 'ফ্রন্ট ফ্যাব্রিক ছবি (ফ্যাব্রিক ক্যাটালগ কার্ড)')}
                    </label>
                    <input
                      type="text"
                      value={homepageForm.frontFabricImage || ''}
                      onChange={(e) => setHomepageForm({ ...homepageForm, frontFabricImage: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FFFDF9] dark:bg-[#221216] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-lg text-xs font-mono"
                      placeholder="Image URL..."
                    />
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHomepageFrontFabricUpload}
                        className="hidden"
                        id="homepage-front-fabric-upload"
                      />
                      <label
                        htmlFor="homepage-front-fabric-upload"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F3E9DD] dark:bg-[#2A141A] text-[#801921] dark:text-[#F4D6DC] font-bold text-xs border border-[#E5D8C8] cursor-pointer transition"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{t('Upload Fabric Image', 'ছবি আপলোড করুন')}</span>
                      </label>
                      {homepageForm.frontFabricImage && (
                        <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-300">
                          <img src={homepageForm.frontFabricImage} alt="Front Fabric" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Tailoring Craft Showcase Photos Card (3 Items) */}
                <div className="bg-[#FFFDF9] dark:bg-[#221216] p-6 rounded-2xl border border-[#E5D8C8] dark:border-[#3D1B22] shadow-sm space-y-4">
                  <h3 className="font-serif font-bold text-base text-[#331A1E] dark:text-[#F7EBE8] flex items-center gap-2 pb-2 border-b border-[#E5D8C8] dark:border-[#3D1B22]">
                    <Scissors className="w-4 h-4 text-[#801921] dark:text-amber-400" />
                    <span>{t('Tailoring Craft Showcase Photos (3 Cards)', 'সেলাই কারিগরি ছবি (৩ টি কার্ড)')}</span>
                  </h3>

                  <div className="space-y-4">
                    {currentCraftPhotos.map((photo, index) => (
                      <div key={photo.id || index} className="p-3.5 bg-[#FAF5EE] dark:bg-[#180C0F] rounded-xl border border-[#E5D8C8] dark:border-[#3D1B22] space-y-3">
                        <div className="flex items-center justify-between pb-1 border-b border-[#E5D8C8]/60 dark:border-[#3D1B22]">
                          <span className="font-bold text-xs text-[#801921] dark:text-amber-400">
                            #{index + 1} {photo.title || `Photo ${index + 1}`}
                          </span>
                          {photo.imageUrl && (
                            <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-300">
                              <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] font-semibold text-[#331A1E] dark:text-[#F7EBE8] block mb-0.5">
                              {t('Title (English)', 'শিরোনাম (ইংরেজি)')}
                            </label>
                            <input
                              type="text"
                              value={photo.title}
                              onChange={(e) => updateCraftPhotoField(index, 'title', e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-[#FFFDF9] dark:bg-[#221216] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-lg text-xs font-semibold"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-[#331A1E] dark:text-[#F7EBE8] block mb-0.5">
                              {t('Title (Bengali)', 'শিরোনাম (বাংলা)')}
                            </label>
                            <input
                              type="text"
                              value={photo.bengaliTitle}
                              onChange={(e) => updateCraftPhotoField(index, 'bengaliTitle', e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-[#FFFDF9] dark:bg-[#221216] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-lg text-xs font-semibold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] font-semibold text-[#331A1E] dark:text-[#F7EBE8] block mb-0.5">
                              {t('Subtitle (English)', 'উপশিরোনাম (ইংরেজি)')}
                            </label>
                            <input
                              type="text"
                              value={photo.subtitle}
                              onChange={(e) => updateCraftPhotoField(index, 'subtitle', e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-[#FFFDF9] dark:bg-[#221216] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-lg text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-[#331A1E] dark:text-[#F7EBE8] block mb-0.5">
                              {t('Subtitle (Bengali)', 'উপশিরোনাম (বাংলা)')}
                            </label>
                            <input
                              type="text"
                              value={photo.bengaliSubtitle}
                              onChange={(e) => updateCraftPhotoField(index, 'bengaliSubtitle', e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-[#FFFDF9] dark:bg-[#221216] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-lg text-xs"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-[#331A1E] dark:text-[#F7EBE8] block">
                            {t('Image URL', 'ছবি URL')}
                          </label>
                          <input
                            type="text"
                            value={photo.imageUrl}
                            onChange={(e) => updateCraftPhotoField(index, 'imageUrl', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-[#FFFDF9] dark:bg-[#221216] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-lg text-xs font-mono"
                            placeholder="https://..."
                          />
                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleCraftPhotoUpload(index, e)}
                              className="hidden"
                              id={`craft-photo-upload-${index}`}
                            />
                            <label
                              htmlFor={`craft-photo-upload-${index}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F3E9DD] dark:bg-[#2A141A] text-[#801921] dark:text-[#F4D6DC] font-bold text-xs border border-[#E5D8C8] cursor-pointer transition"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>{t('Upload New Photo', 'নতুন ছবি আপলোড করুন')}</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shop Location & Contact Info */}
                <div className="bg-[#FFFDF9] dark:bg-[#221216] p-6 rounded-2xl border border-[#E5D8C8] dark:border-[#3D1B22] shadow-sm space-y-4">
                  <h3 className="font-serif font-bold text-base text-[#331A1E] dark:text-[#F7EBE8] flex items-center gap-2 pb-2 border-b border-[#E5D8C8] dark:border-[#3D1B22]">
                    <MapPin className="w-4 h-4 text-[#801921] dark:text-amber-400" />
                    <span>{t('Shop Address & Contact Numbers', 'ঠিকানা ও যোগাযোগ নম্বর')}</span>
                  </h3>

                  <div className="space-y-1">
                    <label className="font-bold text-xs text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Full Shop Address / Location', 'দোকানের মূল ঠিকানা')}
                    </label>
                    <input
                      type="text"
                      value={homepageForm.address}
                      onChange={(e) => setHomepageForm({ ...homepageForm, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-bold text-xs text-[#331A1E] dark:text-[#F7EBE8]">
                        {t('Phone Number (Call Us Button)', 'ফোন নম্বর (কল করুন)')}
                      </label>
                      <input
                        type="text"
                        value={homepageForm.phone}
                        onChange={(e) => setHomepageForm({ ...homepageForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-xs text-[#331A1E] dark:text-[#F7EBE8]">
                        {t('WhatsApp Number', 'হোয়াটসঅ্যাপ নম্বর')}
                      </label>
                      <input
                        type="text"
                        value={homepageForm.whatsapp}
                        onChange={(e) => setHomepageForm({ ...homepageForm, whatsapp: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs"
                        required
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Hero Photo & Live Preview */}
              <div className="space-y-6">
                
                <div className="bg-[#FFFDF9] dark:bg-[#221216] p-6 rounded-2xl border border-[#E5D8C8] dark:border-[#3D1B22] shadow-sm space-y-4">
                  <h3 className="font-serif font-bold text-base text-[#331A1E] dark:text-[#F7EBE8] flex items-center gap-2 pb-2 border-b border-[#E5D8C8] dark:border-[#3D1B22]">
                    <ImageIcon className="w-4 h-4 text-[#801921] dark:text-amber-400" />
                    <span>{t('Main Homepage Hero Showcase Photo', 'হোমপেজের মূল ছবি')}</span>
                  </h3>

                  {/* Photo URL & Upload Button */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="font-bold text-xs text-[#331A1E] dark:text-[#F7EBE8]">
                        {t('Showcase Photo Image URL', 'হোমপেজ ছবির URL')}
                      </label>
                      <input
                        type="url"
                        value={homepageForm.heroImage}
                        onChange={(e) => setHomepageForm({ ...homepageForm, heroImage: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-mono"
                        required
                      />
                    </div>

                    {/* File Upload Button */}
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHomepageImageUpload}
                        className="hidden"
                        id="homepage-hero-upload"
                      />
                      <label
                        htmlFor="homepage-hero-upload"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F3E9DD] dark:bg-[#2A141A] hover:bg-[#EBE0D2] text-[#801921] dark:text-[#F4D6DC] font-bold text-xs border border-[#E5D8C8] dark:border-[#4A202A] cursor-pointer transition"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{t('Upload Custom Photo', 'নতুন ছবি আপলোড করুন')}</span>
                      </label>
                    </div>

                    {/* Quick Preset Sample Photo Picks */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[11px] font-bold text-[#63483E] dark:text-[#D8C3B8]">
                        {t('Or pick from curated sample photos:', 'অথবা রেডিমেড নমুনা ছবি নির্বাচন করুন:')}
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <button
                          type="button"
                          onClick={() => setHomepageForm({ ...homepageForm, heroImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80' })}
                          className="p-2 rounded-xl border border-[#E5D8C8] dark:border-[#3D1B22] hover:border-[#801921] bg-[#FAF5EE] dark:bg-[#180C0F] font-semibold text-left truncate cursor-pointer"
                        >
                          🧵 Tailoring Workshop
                        </button>
                        <button
                          type="button"
                          onClick={() => setHomepageForm({ ...homepageForm, heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80' })}
                          className="p-2 rounded-xl border border-[#E5D8C8] dark:border-[#3D1B22] hover:border-[#801921] bg-[#FAF5EE] dark:bg-[#180C0F] font-semibold text-left truncate cursor-pointer"
                        >
                          👗 Kurti & Festive Wear
                        </button>
                        <button
                          type="button"
                          onClick={() => setHomepageForm({ ...homepageForm, heroImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=80' })}
                          className="p-2 rounded-xl border border-[#E5D8C8] dark:border-[#3D1B22] hover:border-[#801921] bg-[#FAF5EE] dark:bg-[#180C0F] font-semibold text-left truncate cursor-pointer"
                        >
                          🌸 Cotton Nighty Showcase
                        </button>
                        <button
                          type="button"
                          onClick={() => setHomepageForm({ ...homepageForm, heroImage: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=80' })}
                          className="p-2 rounded-xl border border-[#E5D8C8] dark:border-[#3D1B22] hover:border-[#801921] bg-[#FAF5EE] dark:bg-[#180C0F] font-semibold text-left truncate cursor-pointer"
                        >
                          🧶 Fabric Roll Collection
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Live Photo Preview Card with Tagline Overlay */}
                  <div className="pt-3 border-t border-[#E5D8C8] dark:border-[#3D1B22]">
                    <span className="text-xs font-bold text-[#331A1E] dark:text-[#F7EBE8] block mb-2">
                      {t('Live Homepage Photo & Text Preview:', 'হোমপেজ ছবি ও লেখার লাইভ প্রভিউ:')}
                    </span>
                    <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-[#E2D2C0] dark:border-[#3B1B21] shadow-lg bg-[#F2E6D5] dark:bg-[#221014]">
                      <img
                        src={homepageForm.heroImage}
                        alt="Hero Preview"
                        className="w-full h-full object-cover object-center"
                      />
                      
                      {/* Top Badge Preview */}
                      <div className="absolute top-2.5 left-2.5 bg-[#1A0B0E]/85 text-amber-200 px-2.5 py-0.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 border border-amber-500/30">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Please visit us for the experience</span>
                      </div>

                      {/* Inside Tagline Overlay Preview */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/65 to-transparent p-3 pt-6 text-center flex flex-col items-center justify-end space-y-1">
                        <h4 className="text-xs sm:text-sm font-bold text-white drop-shadow-sm">
                          {t(homepageForm.imageTagline, homepageForm.bengaliImageTagline)}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-amber-100/90 line-clamp-2">
                          {t(homepageForm.tagline, homepageForm.bengaliTagline)}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Bottom Save / Cancel Action Bar */}
            <div className="pt-4 border-t border-[#E5D8C8] dark:border-[#3D1B22] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setHomepageForm(homepageSettings)}
                className="px-5 py-3.5 rounded-xl bg-[#EFE7DC] hover:bg-[#E2D6C6] dark:bg-[#2A181C] dark:hover:bg-[#382025] text-[#331A1E] dark:text-[#F7EBE8] font-bold text-xs sm:text-sm border border-[#E5D8C8] dark:border-[#3D1B22] transition cursor-pointer"
              >
                {t('Cancel', 'বাতিল')}
              </button>

              <button
                type="submit"
                disabled={isSavingHomepage}
                className="px-8 py-3.5 rounded-xl bg-[#801921] hover:bg-[#991D26] text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {isSavingHomepage ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                ) : (
                  <Save className="w-4 h-4 text-amber-300" />
                )}
                <span>{isSavingHomepage ? t('Saving...', 'সেভ হচ্ছে...') : t('Save Homepage Settings', 'হোমপেজ সেটিংস সেভ করুন')}</span>
              </button>
            </div>

          </form>
        )}

        {/* MODAL 1: ADD OR EDIT PRODUCT MODAL */}

        {(isAddingProduct || editingProduct) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs overflow-y-auto">
            <div className="bg-[#FFFDF9] dark:bg-[#221216] border-2 border-[#E5D8C8] dark:border-[#3D1B22] rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-[#E5D8C8] dark:border-[#3D1B22] pb-4">
                <h3 className="font-serif text-xl font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                  {isAddingProduct
                    ? t('Add New Ready-Made Dress', 'নতুন তৈরি পোশাক যোগ করুন')
                    : t(`Edit Dress (${productForm.id})`, `পোশাক সম্পাদনা (${productForm.id})`)}
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#801921] text-amber-200 font-mono text-xs font-bold">
                  ID: {productForm.id}
                </span>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Title (English) *', 'শিরোনাম (ইংরেজি) *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={productForm.title || ''}
                      onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-medium"
                      placeholder="e.g. Royal Murshidabad Silk Panjabi"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Title (Bengali)', 'শিরোনাম (বাংলা)')}
                    </label>
                    <input
                      type="text"
                      value={productForm.bengaliTitle || ''}
                      onChange={(e) => setProductForm({ ...productForm, bengaliTitle: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-medium"
                      placeholder="যেমন: রয়্যাল সিল্ক পাঞ্জাবী"
                    />
                  </div>
                </div>

                {/* Price, Category & Display Order */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Price (₹ Offer) *', 'অফার প্রাইস (₹) *')}
                    </label>
                    <input
                      type="number"
                      required
                      value={productForm.price || ''}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Original Price (₹ Optional)', 'আসল দাম (ঐচ্ছিক)')}
                    </label>
                    <input
                      type="number"
                      value={productForm.originalPrice || ''}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Category', 'ক্যাটাগরি')}
                    </label>
                    <select
                      value={productForm.category || 'kurti'}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-medium"
                    >
                      <option value="nighty">{t('Nighty', 'নাইটি')}</option>
                      <option value="kurti">{t('Kurti', 'কুর্তি')}</option>
                      <option value="traditional">{t('Traditional (Man/Woman)', 'ট্র্যাডিশনাল (পুরুষ/মহিলা)')}</option>
                      <option value="bedsheet">{t('Bed Sheet', 'বেড শিট')}</option>
                      <option value="others">{t('Others', 'অন্যান্য')}</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Display Order (e.g. 1, 2, 3)', 'প্রদর্শন ক্রম (যেমন ১, ২, ৩)')}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={productForm.displayOrder || 1}
                      onChange={(e) => setProductForm({ ...productForm, displayOrder: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-bold text-[#801921]"
                    />
                  </div>
                </div>

                {/* Image Upload or Image URL */}
                <div className="space-y-2 pt-2 border-t border-[#E5D8C8] dark:border-[#3D1B22]">
                  <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8] block">
                    {t('Outfit Photo (Upload Local File or Paste URL)', 'পোশাকের ছবি (আপলোড করুন বা URL দিন)')}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-8 space-y-2">
                      <input
                        type="text"
                        value={productForm.image || ''}
                        onChange={(e) => {
                          setProductForm({ ...productForm, image: e.target.value });
                          setProductImagePreview(e.target.value);
                        }}
                        placeholder="Paste Image URL here..."
                        className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-mono"
                      />

                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'product')}
                          className="hidden"
                          id="product-file-upload"
                        />
                        <label
                          htmlFor="product-file-upload"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F3E9DD] dark:bg-[#2A141A] hover:bg-[#EBE0D2] text-[#801921] dark:text-[#F4D6DC] font-bold text-xs border border-[#E5D8C8] dark:border-[#4A202A] cursor-pointer transition"
                        >
                          <Upload className="w-4 h-4 text-[#801921]" />
                          <span>{t('Upload Photo from Phone / PC', 'ফোন বা কম্পিউটার থেকে ছবি আপলোড করুন')}</span>
                        </label>
                      </div>
                    </div>

                    {/* Image Preview Box */}
                    <div className="sm:col-span-4 aspect-[3/4] rounded-xl border border-[#E5D8C8] dark:border-[#3D1B22] bg-[#F3E9DD] overflow-hidden relative">
                      {productImagePreview ? (
                        <img
                          src={productImagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 text-xs">
                          <ImageIcon className="w-6 h-6 mb-1" />
                          <span>No Preview</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Product Photos (Up to 4 images) */}
                <div className="space-y-3 pt-2 border-t border-[#E5D8C8] dark:border-[#3D1B22]">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8] block text-xs sm:text-sm">
                      {t('Additional Product Photos (Up to 4 More Photos)', 'অতিরিক্ত ছবিসমূহ (সর্বোচ্চ ৪ টি অতিরিক্ত ছবি)')}
                    </label>
                    <span className="text-[11px] font-semibold text-stone-500">
                      {(productForm.additionalImages || []).filter(Boolean).length}/4 {t('Added', 'যোগ করা হয়েছে')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[0, 1, 2, 3].map((slotIdx) => {
                      const currentVal = (productForm.additionalImages || [])[slotIdx] || '';
                      return (
                        <div
                          key={slotIdx}
                          className="p-2.5 rounded-xl bg-[#F3E9DD]/60 dark:bg-[#201014] border border-[#E5D8C8] dark:border-[#3D1B22] space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-[#801921] dark:text-amber-300">
                            <span>{t(`Extra Photo ${slotIdx + 1}`, `অতিরিক্ত ছবি ${slotIdx + 1}`)}</span>
                            {currentVal && (
                              <button
                                type="button"
                                onClick={() => {
                                  setProductForm((prev) => {
                                    const list = [...(prev.additionalImages || [])];
                                    list[slotIdx] = '';
                                    return { ...prev, additionalImages: list };
                                  });
                                }}
                                className="text-red-500 hover:text-red-700 text-[10px] font-bold underline cursor-pointer"
                              >
                                {t('Remove', 'মুছে ফেলুন')}
                              </button>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {currentVal ? (
                              <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone-300 dark:border-stone-700 flex-shrink-0 bg-stone-900">
                                <img src={currentVal} alt={`Slot ${slotIdx + 1}`} className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-400 text-[10px] flex-shrink-0">
                                {slotIdx + 1}
                              </div>
                            )}

                            <div className="flex-1 space-y-1.5 min-w-0">
                              <input
                                type="text"
                                value={currentVal}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProductForm((prev) => {
                                    const list = [...(prev.additionalImages || [])];
                                    list[slotIdx] = val;
                                    return { ...prev, additionalImages: list };
                                  });
                                }}
                                placeholder={`Paste Image ${slotIdx + 1} URL...`}
                                className="w-full px-2.5 py-1.5 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-lg text-[11px] font-mono"
                              />

                              <div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, 'product_additional', slotIdx)}
                                  className="hidden"
                                  id={`prod-file-upload-${slotIdx}`}
                                />
                                <label
                                  htmlFor={`prod-file-upload-${slotIdx}`}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#801921]/10 dark:bg-amber-400/10 hover:bg-[#801921]/20 text-[#801921] dark:text-amber-300 font-bold text-[10px] cursor-pointer transition"
                                >
                                  <Upload className="w-3 h-3" />
                                  <span>{t('Upload File', 'ছবি আপলোড')}</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Fabric Material & SubCategory */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Fabric Material', 'ফ্যাব্রিক মেটেরিয়াল')}
                    </label>
                    <input
                      type="text"
                      value={productForm.fabric || ''}
                      onChange={(e) => setProductForm({ ...productForm, fabric: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs"
                      placeholder="e.g. Murshidabad Pure Silk"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Sub Category', 'সাব-ক্যাটাগরি')}
                    </label>
                    <input
                      type="text"
                      value={productForm.subCategory || ''}
                      onChange={(e) => setProductForm({ ...productForm, subCategory: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs"
                      placeholder="e.g. Panjabi & Kurta"
                    />
                  </div>
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Description (English)', 'বিবরণ (ইংরেজি)')}
                    </label>
                    <textarea
                      rows={3}
                      value={productForm.description || ''}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Description (Bengali)', 'বিবরণ (বাংলা)')}
                    </label>
                    <textarea
                      rows={3}
                      value={productForm.bengaliDescription || ''}
                      onChange={(e) => setProductForm({ ...productForm, bengaliDescription: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs"
                    />
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 border-t border-[#E5D8C8] dark:border-[#3D1B22] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingProduct(false);
                      setEditingProduct(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold"
                  >
                    {t('Cancel', 'বাতিল')}
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#801921] hover:bg-[#991D26] text-white font-bold shadow-md"
                  >
                    {t('Save Dress Details', 'পোশাক সেভ করুন')}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* MODAL 2: ADD OR EDIT FABRIC MODAL */}
        {(isAddingFabric || editingFabric) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs overflow-y-auto">
            <div className="bg-[#FFFDF9] dark:bg-[#221216] border-2 border-[#E5D8C8] dark:border-[#3D1B22] rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-[#E5D8C8] dark:border-[#3D1B22] pb-4">
                <h3 className="font-serif text-xl font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                  {isAddingFabric
                    ? t('Add New Fabric Texture', 'নতুন ফ্যাব্রিক টেক্সচার যোগ করুন')
                    : t(`Edit Fabric (${fabricForm.id})`, `ফ্যাব্রিক সম্পাদনা (${fabricForm.id})`)}
                </h3>
                <span className="px-3 py-1 rounded-full bg-[#801921] text-amber-200 font-mono text-xs font-bold">
                  ID: {fabricForm.id}
                </span>
              </div>

              <form onSubmit={handleSaveFabric} className="space-y-4 text-xs">
                {/* Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Fabric Name (English) *', 'কাপড়ের নাম (ইংরেজি) *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={fabricForm.name || ''}
                      onChange={(e) => setFabricForm({ ...fabricForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-medium"
                      placeholder="e.g. Pure Bishnupuri Katan Silk"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Fabric Name (Bengali)', 'কাপড়ের নাম (বাংলা)')}
                    </label>
                    <input
                      type="text"
                      value={fabricForm.bengaliName || ''}
                      onChange={(e) => setFabricForm({ ...fabricForm, bengaliName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-medium"
                      placeholder="যেমন: বিষ্ণুপুরী কাতান সিল্ক"
                    />
                  </div>
                </div>

                {/* Material, Price & Display Order */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Material Type *', 'উপাদান টাইপ *')}
                    </label>
                    <input
                      type="text"
                      required
                      value={fabricForm.material || ''}
                      onChange={(e) => setFabricForm({ ...fabricForm, material: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-medium"
                      placeholder="e.g. 100% Mulberry Silk"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Fabric Price (₹) *', 'ফ্যাব্রিক এর দাম (₹) *')}
                    </label>
                    <input
                      type="number"
                      required
                      value={fabricForm.pricePerMeter || ''}
                      onChange={(e) => setFabricForm({ ...fabricForm, pricePerMeter: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-medium"
                      placeholder="e.g. 650"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                      {t('Display Order (e.g. 1, 2, 3)', 'প্রদর্শন ক্রম (যেমন ১, ২, ৩)')}
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={fabricForm.displayOrder || 1}
                      onChange={(e) => setFabricForm({ ...fabricForm, displayOrder: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-bold text-[#801921]"
                    />
                  </div>
                </div>

                {/* Image Upload or Texture Image URL */}
                <div className="space-y-2 pt-2 border-t border-[#E5D8C8] dark:border-[#3D1B22]">
                  <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8] block">
                    {t('Texture Photo (Upload Local File or Paste URL)', 'টেক্সচার ছবি (আপলোড বা URL)')}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-8 space-y-2">
                      <input
                        type="text"
                        value={fabricForm.textureImage || ''}
                        onChange={(e) => {
                          setFabricForm({ ...fabricForm, textureImage: e.target.value });
                          setFabricImagePreview(e.target.value);
                        }}
                        placeholder="Paste Texture Image URL here..."
                        className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs font-mono"
                      />

                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'fabric')}
                          className="hidden"
                          id="fabric-file-upload"
                        />
                        <label
                          htmlFor="fabric-file-upload"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F3E9DD] dark:bg-[#2A141A] hover:bg-[#EBE0D2] text-[#801921] dark:text-[#F4D6DC] font-bold text-xs border border-[#E5D8C8] dark:border-[#4A202A] cursor-pointer transition"
                        >
                          <Upload className="w-4 h-4 text-[#801921]" />
                          <span>{t('Upload Texture Photo', 'টেক্সচার ছবি আপলোড করুন')}</span>
                        </label>
                      </div>
                    </div>

                    {/* Image Preview Box */}
                    <div className="sm:col-span-4 aspect-16/10 rounded-xl border border-[#E5D8C8] dark:border-[#3D1B22] bg-[#F3E9DD] overflow-hidden relative">
                      {fabricImagePreview ? (
                        <img
                          src={fabricImagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 text-xs">
                          <ImageIcon className="w-6 h-6 mb-1" />
                          <span>No Preview</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Fabric Photos (Up to 4 images) */}
                <div className="space-y-3 pt-2 border-t border-[#E5D8C8] dark:border-[#3D1B22]">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8] block text-xs sm:text-sm">
                      {t('Additional Fabric Photos (Up to 4 More Photos)', 'অতিরিক্ত কাপড়ের ছবিসমূহ (সর্বোচ্চ ৪ টি)')}
                    </label>
                    <span className="text-[11px] font-semibold text-stone-500">
                      {(fabricForm.additionalImages || []).filter(Boolean).length}/4 {t('Added', 'যোগ করা হয়েছে')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[0, 1, 2, 3].map((slotIdx) => {
                      const currentVal = (fabricForm.additionalImages || [])[slotIdx] || '';
                      return (
                        <div
                          key={slotIdx}
                          className="p-2.5 rounded-xl bg-[#F3E9DD]/60 dark:bg-[#201014] border border-[#E5D8C8] dark:border-[#3D1B22] space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs font-bold text-[#801921] dark:text-amber-300">
                            <span>{t(`Extra Photo ${slotIdx + 1}`, `অতিরিক্ত ছবি ${slotIdx + 1}`)}</span>
                            {currentVal && (
                              <button
                                type="button"
                                onClick={() => {
                                  setFabricForm((prev) => {
                                    const list = [...(prev.additionalImages || [])];
                                    list[slotIdx] = '';
                                    return { ...prev, additionalImages: list };
                                  });
                                }}
                                className="text-red-500 hover:text-red-700 text-[10px] font-bold underline cursor-pointer"
                              >
                                {t('Remove', 'মুছে ফেলুন')}
                              </button>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {currentVal ? (
                              <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone-300 dark:border-stone-700 flex-shrink-0 bg-stone-900">
                                <img src={currentVal} alt={`Fabric Slot ${slotIdx + 1}`} className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="w-12 h-12 rounded-lg border border-dashed border-stone-300 dark:border-stone-700 flex items-center justify-center text-stone-400 text-[10px] flex-shrink-0">
                                {slotIdx + 1}
                              </div>
                            )}

                            <div className="flex-1 space-y-1.5 min-w-0">
                              <input
                                type="text"
                                value={currentVal}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setFabricForm((prev) => {
                                    const list = [...(prev.additionalImages || [])];
                                    list[slotIdx] = val;
                                    return { ...prev, additionalImages: list };
                                  });
                                }}
                                placeholder={`Paste Fabric Image ${slotIdx + 1} URL...`}
                                className="w-full px-2.5 py-1.5 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-lg text-[11px] font-mono"
                              />

                              <div>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, 'fabric_additional', slotIdx)}
                                  className="hidden"
                                  id={`fab-file-upload-${slotIdx}`}
                                />
                                <label
                                  htmlFor={`fab-file-upload-${slotIdx}`}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#801921]/10 dark:bg-amber-400/10 hover:bg-[#801921]/20 text-[#801921] dark:text-amber-300 font-bold text-[10px] cursor-pointer transition"
                                >
                                  <Upload className="w-3 h-3" />
                                  <span>{t('Upload File', 'ছবি আপলোড')}</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="font-bold text-[#331A1E] dark:text-[#F7EBE8]">
                    {t('Description', 'বিবরণ')}
                  </label>
                  <textarea
                    rows={3}
                    value={fabricForm.description || ''}
                    onChange={(e) => setFabricForm({ ...fabricForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF5EE] dark:bg-[#180C0F] border border-[#E5D8C8] dark:border-[#3D1B22] rounded-xl text-xs"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-4 border-t border-[#E5D8C8] dark:border-[#3D1B22] flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingFabric(false);
                      setEditingFabric(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold"
                  >
                    {t('Cancel', 'বাতিল')}
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#801921] hover:bg-[#991D26] text-white font-bold shadow-md"
                  >
                    {t('Save Fabric Details', 'ফ্যাব্রিক সেভ করুন')}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export interface Product {
  id: string;
  title: string;
  bengaliTitle: string;
  category: 'nighty' | 'kurti' | 'traditional' | 'bedsheet' | 'others';
  subCategory: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewsCount?: number;
  fabric: string;
  estimatedDays: number;
  sizes: string[];
  tags: string[];
  image: string;
  additionalImages?: string[];
  description: string;
  bengaliDescription: string;
  features: string[];
  inStock: boolean;
  isSoldOut?: boolean;
  displayOrder?: number;
}

export interface Fabric {
  id: string;
  name: string;
  bengaliName: string;
  material: string;
  pricePerMeter?: number;
  colors: string[];
  textureImage: string;
  additionalImages?: string[];
  recommendedFor?: string[];
  description: string;
  origin: string;
  inStock: boolean;
  minMeters?: number;
  isSoldOut?: boolean;
  displayOrder?: number;
}

export interface GarmentOption {
  id: string;
  name: string;
  bengaliName: string;
  category: 'men' | 'women' | 'unisex';
  baseStitchingCharge: number;
  estimatedDays: number;
  defaultMetersNeeded: number;
  necklineOptions: string[];
  sleeveOptions: string[];
  embroideryOptions: { id: string; name: string; price: number }[];
  image: string;
}

export interface MeasurementData {
  chest?: string;
  waist?: string;
  shoulder?: string;
  sleeveLength?: string;
  garmentLength?: string;
  hip?: string;
  neck?: string;
  inseam?: string;
  armhole?: string;
}

export interface StylingPreferences {
  neckline?: string;
  sleeveStyle?: string;
  embroidery?: string;
  lining?: string;
  fitType?: 'Slim Fit' | 'Traditional Regular' | 'Relaxed Fit';
}

export interface OrderBooking {
  id: string;
  type: 'ready_made' | 'custom_fabric';
  itemTitle: string;
  itemBengaliTitle?: string;
  itemImage?: string;
  fabricSelected?: Fabric;
  garmentType?: string;
  
  // Customer info
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  preferredDate?: string;

  // Sizing & Specs
  sizingOption: 'standard' | 'custom' | 'doorstep';
  standardSize?: string;
  measurements?: MeasurementData;
  styling?: StylingPreferences;

  // Custom user description & instructions
  description: string;

  // Financial preview
  itemPrice: number;
  stitchingCharge: number;
  totalEstimatedPrice: number;

  createdAt: string;
  status: 'Draft' | 'Sent via WhatsApp' | 'Confirmed';
}

export interface CraftDemoPhoto {
  id: string;
  title: string;
  bengaliTitle: string;
  subtitle: string;
  bengaliSubtitle: string;
  imageUrl: string;
}

export interface HomepageSettings {
  title: string;
  bengaliTitle: string;
  tagline: string;
  bengaliTagline: string;
  imageTagline: string;
  bengaliImageTagline: string;
  heroImage: string;
  frontProductImage?: string;
  frontFabricImage?: string;
  craftPhotos?: CraftDemoPhoto[];
  address: string;
  phone: string;
  whatsapp: string;
}

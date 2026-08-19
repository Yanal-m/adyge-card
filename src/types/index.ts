export interface Business {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  categoryId: string;
  categoryName: string;
  logoUrl: string;
  coverUrl: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  openingHours: string;
  status: 'published' | 'pending' | 'draft' | 'rejected';
  isVerified: boolean;
  isCircassianOwned: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  viewsCount: number;
  establishedYear?: number;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    whatsapp?: string;
  };
  services: Service[];
  products: Product[];
  gallery: GalleryImage[];
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  businessId: string;
  name: string;
  description: string;
  price?: string;
  iconName?: string;
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  externalUrl?: string;
  isAvailable: boolean;
  category?: string;
}

export interface GalleryImage {
  id: string;
  businessId: string;
  imageUrl: string;
  caption?: string;
  sortOrder: number;
}

export interface Review {
  id: string;
  businessId: string;
  authorName: string;
  authorLocation?: string;
  authorAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  role: 'visitor' | 'business_owner' | 'admin';
  ownedBusinessIds: string[];
  savedBusinessIds: string[];
}

export type ViewMode = 
  | 'home'
  | 'businesses'
  | 'business-detail'
  | 'services'
  | 'products'
  | 'people'
  | 'community'
  | 'about'
  | 'add-business'
  | 'dashboard'
  | 'admin'
  | 'saved';

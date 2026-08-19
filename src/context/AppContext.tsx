import React, { createContext, useContext, useState, useEffect } from 'react';
import { Business, Category, User, ViewMode, Review } from '../types';
import { INITIAL_BUSINESSES, INITIAL_CATEGORIES, INITIAL_USER } from '../data/mockData';

interface AppContextType {
  // Navigation & View
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedBusinessSlug: string | null;
  openBusinessDetail: (slug: string) => void;
  
  // Data
  businesses: Business[];
  categories: Category[];
  currentUser: User;
  
  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (slug: string | null) => void;
  selectedCountry: string | null;
  setSelectedCountry: (country: string | null) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (val: boolean) => void;
  circassianOwnedOnly: boolean;
  setCircassianOwnedOnly: (val: boolean) => void;
  
  // Actions
  toggleSaveBusiness: (businessId: string) => void;
  isBusinessSaved: (businessId: string) => boolean;
  addBusiness: (businessData: Omit<Business, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'rating' | 'reviewCount'>) => Business;
  updateBusiness: (id: string, businessData: Partial<Business>) => void;
  deleteBusiness: (id: string) => void;
  approveBusiness: (id: string) => void;
  rejectBusiness: (id: string) => void;
  toggleVerifyBusiness: (id: string) => void;
  toggleFeatureBusiness: (id: string) => void;
  addReview: (businessId: string, review: Omit<Review, 'id' | 'businessId' | 'date'>) => void;
  
  // User Management
  setUserRole: (role: 'visitor' | 'business_owner' | 'admin') => void;
  
  // Toast & Modal States
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isAddBusinessModalOpen: boolean;
  setIsAddBusinessModalOpen: (open: boolean) => void;
  activeShareBusiness: Business | null;
  setActiveShareBusiness: (biz: Business | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with localStorage fallbacks
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [selectedBusinessSlug, setSelectedBusinessSlug] = useState<string | null>(null);

  const [businesses, setBusinesses] = useState<Business[]>(() => {
    const saved = localStorage.getItem('adyge_businesses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse businesses from localStorage', e);
      }
    }
    return INITIAL_BUSINESSES;
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('adyge_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
    return INITIAL_USER;
  });

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [circassianOwnedOnly, setCircassianOwnedOnly] = useState<boolean>(false);

  // Modals & UI
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAddBusinessModalOpen, setIsAddBusinessModalOpen] = useState<boolean>(false);
  const [activeShareBusiness, setActiveShareBusiness] = useState<Business | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('adyge_businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('adyge_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const openBusinessDetail = (slug: string) => {
    setSelectedBusinessSlug(slug);
    setViewMode('business-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSaveBusiness = (businessId: string) => {
    const isSaved = currentUser.savedBusinessIds.includes(businessId);
    const updated = isSaved
      ? currentUser.savedBusinessIds.filter(id => id !== businessId)
      : [...currentUser.savedBusinessIds, businessId];

    setCurrentUser(prev => ({
      ...prev,
      savedBusinessIds: updated,
    }));

    showToast(isSaved ? 'Removed from saved businesses' : 'Saved to your digital collection');
  };

  const isBusinessSaved = (businessId: string) => {
    return currentUser.savedBusinessIds.includes(businessId);
  };

  const addBusiness = (
    businessData: Omit<Business, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'rating' | 'reviewCount'>
  ): Business => {
    const newBiz: Business = {
      ...businessData,
      id: `biz-${Date.now()}`,
      rating: 5.0,
      reviewCount: 1,
      viewsCount: 12,
      status: currentUser.role === 'admin' ? 'published' : 'published', // Publish directly for frictionless MVP experience
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBusinesses(prev => [newBiz, ...prev]);
    setCurrentUser(prev => ({
      ...prev,
      ownedBusinessIds: [...prev.ownedBusinessIds, newBiz.id],
    }));

    showToast('Business successfully added to Adyge Card!');
    return newBiz;
  };

  const updateBusiness = (id: string, updates: Partial<Business>) => {
    setBusinesses(prev =>
      prev.map(b => (b.id === id ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b))
    );
    showToast('Business details updated successfully');
  };

  const deleteBusiness = (id: string) => {
    setBusinesses(prev => prev.filter(b => b.id !== id));
    showToast('Business removed');
  };

  const approveBusiness = (id: string) => {
    setBusinesses(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'published' } : b))
    );
    showToast('Business approved and published');
  };

  const rejectBusiness = (id: string) => {
    setBusinesses(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'rejected' } : b))
    );
    showToast('Business listing rejected');
  };

  const toggleVerifyBusiness = (id: string) => {
    setBusinesses(prev =>
      prev.map(b => (b.id === id ? { ...b, isVerified: !b.isVerified } : b))
    );
    showToast('Verification status toggled');
  };

  const toggleFeatureBusiness = (id: string) => {
    setBusinesses(prev =>
      prev.map(b => (b.id === id ? { ...b, isFeatured: !b.isFeatured } : b))
    );
    showToast('Featured status updated');
  };

  const addReview = (businessId: string, review: Omit<Review, 'id' | 'businessId' | 'date'>) => {
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      businessId,
      date: new Date().toISOString().split('T')[0],
    };

    setBusinesses(prev =>
      prev.map(b => {
        if (b.id !== businessId) return b;
        const updatedReviews = [newRev, ...b.reviews];
        const newRating =
          updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length;
        return {
          ...b,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: Number(newRating.toFixed(1)),
        };
      })
    );
    showToast('Thank you for supporting this Circassian business!');
  };

  const setUserRole = (role: 'visitor' | 'business_owner' | 'admin') => {
    setCurrentUser(prev => ({ ...prev, role }));
    showToast(`Switched view to: ${role === 'admin' ? 'Administrator' : role === 'business_owner' ? 'Business Owner' : 'Visitor'}`);
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        selectedBusinessSlug,
        openBusinessDetail,
        businesses,
        categories,
        currentUser,
        searchQuery,
        setSearchQuery,
        selectedCategorySlug,
        setSelectedCategorySlug,
        selectedCountry,
        setSelectedCountry,
        verifiedOnly,
        setVerifiedOnly,
        circassianOwnedOnly,
        setCircassianOwnedOnly,
        toggleSaveBusiness,
        isBusinessSaved,
        addBusiness,
        updateBusiness,
        deleteBusiness,
        approveBusiness,
        rejectBusiness,
        toggleVerifyBusiness,
        toggleFeatureBusiness,
        addReview,
        setUserRole,
        toastMessage,
        showToast,
        isAddBusinessModalOpen,
        setIsAddBusinessModalOpen,
        activeShareBusiness,
        setActiveShareBusiness,
      }}
    >
      {children}
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

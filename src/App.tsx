import React, { useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/home/HeroSection";
import { CategoryGrid } from "./components/home/CategoryGrid";
import { FeaturedBusinesses } from "./components/home/FeaturedBusinesses";
import { DirectoryView } from "./components/discovery/DirectoryView";
import { BusinessProfileView } from "./components/business/BusinessProfileView";
import { OwnerDashboard } from "./components/dashboard/OwnerDashboard";
import { AdminDashboard } from "./components/dashboard/AdminDashboard";
import { SavedBusinessesView } from "./components/saved/SavedBusinessesView";
import { CommunityView } from "./components/community/CommunityView";
import { AboutView } from "./components/about/AboutView";
import { ShareModal } from "./components/business/ShareModal";
import { AddBusinessModal } from "./components/forms/AddBusinessModal";
import { CircassianEmblem } from "./components/cultural/CircassianEmblem";
import { Plus } from "lucide-react";

const MainContent: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    selectedBusinessSlug,
    businesses,
    openBusinessDetail,
    toastMessage,
    isAddBusinessModalOpen,
    setIsAddBusinessModalOpen,
    activeShareBusiness,
    setActiveShareBusiness,
  } = useApp();

  // Listen to window hash changes for browser history back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#business/")) {
        const slug = hash.replace("#business/", "");
        const exists = businesses.find((b) => b.slug === slug);
        if (exists) {
          openBusinessDetail(slug);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Initial check on mount
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [businesses]);

  // Selected business for detail view
  const currentBusiness =
    businesses.find((b) => b.slug === selectedBusinessSlug) || businesses[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F2E9] text-[#17211D] relative">
      {/* Toast Notification Notification Pill */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0D3026] text-white border border-[#B99A52] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <CircassianEmblem size={20} color="gold" showStars={false} />
          <span className="text-xs sm:text-sm font-semibold">
            {toastMessage}
          </span>
        </div>
      )}

      {/* Main Header Navigation */}
      <Navbar />

      {/* Main Viewport Routing */}
      <main className="flex-1">
        {viewMode === "home" && (
          <div className="space-y-4">
            <HeroSection />
            <CategoryGrid />
            <FeaturedBusinesses />

            {/* Homepage Add Business CTA Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="bg-[#0D3026] text-white rounded-3xl border border-[#174A3A] p-8 sm:p-12 relative overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Background Image & Overlay */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <img
                    src="/cta-adiga.jpg"
                    alt="Circassian Community"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[#071A14]/75 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#071A14]/95 via-[#0D3026]/80 to-[#071A14]/70" />
                </div>

                <div className="space-y-2 max-w-xl text-center md:text-left z-10">
                  <h2 className="font-serif-heading font-bold text-2xl sm:text-3xl text-white">
                    Are you a business owner?
                  </h2>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    Join our network and connect with thousands of Circassian
                    people worldwide. Get your verified digital business card.
                  </p>
                </div>

                <div className="z-10 shrink-0">
                  <button
                    onClick={() => setIsAddBusinessModalOpen(true)}
                    className="flex items-center gap-2 bg-[#B99A52] hover:bg-[#B99A52]/90 text-[#0D3026] font-bold px-7 py-3.5 rounded-xl text-sm transition-all shadow-md hover:scale-105 cursor-pointer"
                  >
                    <Plus size={18} />
                    <span>Add Your Business</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {(viewMode === "businesses" ||
          viewMode === "services" ||
          viewMode === "products" ||
          viewMode === "people") && <DirectoryView />}

        {viewMode === "business-detail" && currentBusiness && (
          <BusinessProfileView
            business={currentBusiness}
            onBack={() => setViewMode("businesses")}
          />
        )}

        {viewMode === "dashboard" && <OwnerDashboard />}
        {viewMode === "admin" && <AdminDashboard />}
        {viewMode === "saved" && <SavedBusinessesView />}
        {viewMode === "community" && <CommunityView />}
        {viewMode === "about" && <AboutView />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Share Modal (QR code, vCard, copy link) */}
      <ShareModal
        business={activeShareBusiness}
        onClose={() => setActiveShareBusiness(null)}
      />

      {/* 6-step Add Business Wizard Modal */}
      <AddBusinessModal
        isOpen={isAddBusinessModalOpen}
        onClose={() => setIsAddBusinessModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import {
  Plus,
  Search,
  Bookmark,
  Shield,
  Building,
  User as UserIcon,
  Menu,
  X,
  Globe,
  Check,
  Sparkles,
  Layers,
  ChevronDown,
  ShoppingBag,
  Users,
} from "lucide-react";
import { ViewMode } from "../../types";

interface NavbarProps {
  onSearchClick?: () => void;
  isTransparent?: boolean;
}

interface SubmenuItem {
  label: string;
  mode: ViewMode;
  categoryFilter?: string;
  icon: React.FC<{ size?: number; className?: string }>;
  description: string;
}

export const Navbar: React.FC<NavbarProps> = ({ isTransparent = false }) => {
  const {
    viewMode,
    setViewMode,
    currentUser,
    setUserRole,
    setIsAddBusinessModalOpen,
    setSelectedCategorySlug,
    setSearchQuery,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isBusinessDropdownOpen, setIsBusinessDropdownOpen] = useState(false);
  const [isMobileBusinessExpanded, setIsMobileBusinessExpanded] =
    useState(true);

  const businessDropdownRef = useRef<HTMLDivElement>(null);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  const businessSubmenu: SubmenuItem[] = [
    {
      label: "All Businesses",
      mode: "businesses",
      categoryFilter: "businesses",
      icon: Building,
      description: "Explore Circassian enterprises & companies",
    },
    {
      label: "Services",
      mode: "services",
      categoryFilter: "services",
      icon: Layers,
      description: "Professional, technical & trade services",
    },
    {
      label: "Products",
      mode: "products",
      categoryFilter: "products",
      icon: ShoppingBag,
      description: "Circassian-made crafts, food & goods",
    },
    {
      label: "People",
      mode: "people",
      categoryFilter: "professionals",
      icon: Users,
      description: "Founders, specialists & professionals",
    },
    {
      label: "Community",
      mode: "community",
      icon: Globe,
      description: "Discussions, networking & initiatives",
    },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        businessDropdownRef.current &&
        !businessDropdownRef.current.contains(event.target as Node)
      ) {
        setIsBusinessDropdownOpen(false);
      }
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRoleDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (link: {
    label: string;
    mode: ViewMode;
    categoryFilter?: string;
  }) => {
    if (link.categoryFilter) {
      setSelectedCategorySlug(link.categoryFilter);
    } else {
      setSelectedCategorySlug(null);
    }
    setSearchQuery("");
    setViewMode(link.mode);
    setIsMobileMenuOpen(false);
    setIsBusinessDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isBusinessActive = [
    "businesses",
    "services",
    "products",
    "people",
    "community",
    "business-detail",
  ].includes(viewMode);

  return (
    <header
      id="main-navbar"
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isTransparent
          ? "bg-[#0D3026]/95 text-white backdrop-blur-md border-b border-[#174A3A]/60 shadow-lg"
          : "bg-[#0D3026] text-white border-b border-[#174A3A] shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick({ label: "Home", mode: "home" })}
            className="flex items-center gap-3.5 group text-left cursor-pointer focus:outline-none"
          >
            <div>
              <img
                src="/logo-symbol.png"
                alt="Adyge Card Logo"
                className="w-[60px] h-[60px] object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-heading font-bold text-xl sm:text-2xl tracking-wider text-white">
                  ADYGE CARD
                </span>
              </div>
              <span className="block text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-[#B99A52] uppercase">
                Circassian Business Network
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Main Navigation"
          >
            {/* Home */}
            <button
              id="nav-link-home"
              onClick={() => handleNavClick({ label: "Home", mode: "home" })}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors relative cursor-pointer ${
                viewMode === "home"
                  ? "text-[#B99A52] font-semibold"
                  : "text-white/80 hover:text-white hover:bg-[#174A3A]/50"
              }`}
            >
              Home
              {viewMode === "home" && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B99A52] rounded-full" />
              )}
            </button>

            {/* Business Dropdown Menu */}
            <div
              ref={businessDropdownRef}
              className="relative"
              onMouseEnter={() => setIsBusinessDropdownOpen(true)}
              onMouseLeave={() => setIsBusinessDropdownOpen(false)}
            >
              <button
                id="nav-link-business-dropdown"
                onClick={() =>
                  setIsBusinessDropdownOpen(!isBusinessDropdownOpen)
                }
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer relative ${
                  isBusinessActive
                    ? "text-[#B99A52] font-semibold"
                    : "text-white/80 hover:text-white hover:bg-[#174A3A]/50"
                }`}
                aria-expanded={isBusinessDropdownOpen}
              >
                <span>Business</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    isBusinessDropdownOpen
                      ? "rotate-180 text-[#B99A52]"
                      : "text-white/60"
                  }`}
                />
                {isBusinessActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B99A52] rounded-full" />
                )}
              </button>

              {/* Submenu Popover Card */}
              {isBusinessDropdownOpen && (
                <div className="absolute left-0 mt-1.5 w-72 bg-[#0B261E] text-white rounded-2xl shadow-2xl border border-[#174A3A] p-2 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-lg">
                  <div className="px-3 py-2 border-b border-[#174A3A]/70 mb-1">
                    <p className="text-[11px] font-bold text-[#B99A52] uppercase tracking-wider">
                      Business Directory & Hub
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    {businessSubmenu.map((item) => {
                      const IconComponent = item.icon;
                      const isActive = viewMode === item.mode;
                      return (
                        <button
                          key={item.label}
                          id={`submenu-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => handleNavClick(item)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer group ${
                            isActive
                              ? "bg-[#174A3A] text-white shadow-sm border border-[#B99A52]/40"
                              : "hover:bg-[#174A3A]/60 text-white/85 hover:text-white"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-lg shrink-0 transition-colors ${
                              isActive
                                ? "bg-[#B99A52] text-[#0D3026]"
                                : "bg-[#174A3A]/60 text-[#B99A52] group-hover:bg-[#B99A52] group-hover:text-[#0D3026]"
                            }`}
                          >
                            <IconComponent size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-sm font-semibold ${isActive ? "text-[#B99A52]" : "text-white group-hover:text-[#B99A52]"}`}
                              >
                                {item.label}
                              </span>
                              {isActive && (
                                <Check size={14} className="text-[#B99A52]" />
                              )}
                            </div>
                            <p className="text-[11px] text-white/60 group-hover:text-white/80 line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* About */}
            <button
              id="nav-link-about"
              onClick={() => handleNavClick({ label: "About", mode: "about" })}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors relative cursor-pointer ${
                viewMode === "about"
                  ? "text-[#B99A52] font-semibold"
                  : "text-white/80 hover:text-white hover:bg-[#174A3A]/50"
              }`}
            >
              About
              {viewMode === "about" && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#B99A52] rounded-full" />
              )}
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Search Shortcut */}
            <button
              id="nav-quick-search-btn"
              onClick={() => {
                setViewMode("businesses");
                const el = document.getElementById("search-input-field");
                if (el) el.focus();
              }}
              title="Search businesses"
              className="p-2 rounded-full text-white/70 hover:text-[#B99A52] hover:bg-[#174A3A]/50 transition-colors cursor-pointer"
            >
              <Search size={18} />
            </button>

            {/* Saved Bookmarks */}
            <button
              id="nav-saved-btn"
              onClick={() => setViewMode("saved")}
              className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                viewMode === "saved"
                  ? "text-[#B99A52] bg-[#174A3A]"
                  : "text-white/70 hover:text-[#B99A52] hover:bg-[#174A3A]/50"
              }`}
              title="Saved Businesses"
            >
              <Bookmark size={18} />
              {currentUser.savedBusinessIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B99A52] text-[#0D3026] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#0D3026]">
                  {currentUser.savedBusinessIds.length}
                </span>
              )}
            </button>

            {/* + Add Business Primary CTA */}
            <button
              id="nav-add-business-btn"
              onClick={() => setIsAddBusinessModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#174A3A] hover:bg-[#286B52] text-white border border-[#B99A52]/60 hover:border-[#B99A52] px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Plus size={16} className="text-[#B99A52]" />
              <span>Add Business</span>
            </button>

            {/* Role / Profile Dropdown */}
            <div ref={roleDropdownRef} className="relative">
              <button
                id="nav-user-menu-btn"
                onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full bg-[#174A3A]/60 border border-[#B99A52]/30 hover:border-[#B99A52] text-white transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#B99A52] text-[#0D3026] font-bold flex items-center justify-center text-xs overflow-hidden">
                  {currentUser.displayName
                    ? currentUser.displayName.charAt(0)
                    : "U"}
                </div>
                <ChevronDown size={14} className="text-white/70" />
              </button>

              {isRoleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-[#FFFDF9] text-[#17211D] rounded-xl shadow-xl border border-[#D9DED8] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setIsRoleDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-[#D9DED8]/60">
                    <p className="font-semibold text-sm text-[#17211D]">
                      {currentUser.displayName}
                    </p>
                    <p className="text-xs text-[#68736D] truncate">
                      {currentUser.email}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#F6F2E9] border border-[#B99A52]/40 text-[#174A3A]">
                        {currentUser.role === "admin"
                          ? "Administrator"
                          : currentUser.role === "business_owner"
                            ? "Business Owner"
                            : "Community Visitor"}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      id="dropdown-dashboard-btn"
                      onClick={() => setViewMode("dashboard")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F2E9] flex items-center gap-2.5 cursor-pointer text-[#17211D]"
                    >
                      <Building size={16} className="text-[#174A3A]" />
                      <span>Owner Dashboard</span>
                    </button>
                    <button
                      id="dropdown-admin-btn"
                      onClick={() => setViewMode("admin")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F2E9] flex items-center gap-2.5 cursor-pointer text-[#17211D]"
                    >
                      <Shield size={16} className="text-[#B99A52]" />
                      <span>Admin Moderation</span>
                    </button>
                    <button
                      id="dropdown-saved-btn"
                      onClick={() => setViewMode("saved")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-[#F6F2E9] flex items-center gap-2.5 cursor-pointer text-[#17211D]"
                    >
                      <Bookmark size={16} className="text-[#174A3A]" />
                      <span>
                        Saved Businesses ({currentUser.savedBusinessIds.length})
                      </span>
                    </button>
                  </div>

                  {/* Role Switcher Demo Tool */}
                  <div className="pt-2 border-t border-[#D9DED8]/60 px-3">
                    <p className="text-[11px] font-semibold text-[#68736D] uppercase tracking-wider mb-1 px-1">
                      Switch Role Mode:
                    </p>
                    <div className="grid grid-cols-3 gap-1 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUserRole("visitor");
                        }}
                        className={`text-xs py-1 rounded border transition-colors ${
                          currentUser.role === "visitor"
                            ? "bg-[#174A3A] text-white border-[#174A3A]"
                            : "bg-[#F6F2E9] text-[#17211D] border-[#D9DED8] hover:border-[#B99A52]"
                        }`}
                      >
                        Visitor
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUserRole("business_owner");
                        }}
                        className={`text-xs py-1 rounded border transition-colors ${
                          currentUser.role === "business_owner"
                            ? "bg-[#174A3A] text-white border-[#174A3A]"
                            : "bg-[#F6F2E9] text-[#17211D] border-[#D9DED8] hover:border-[#B99A52]"
                        }`}
                      >
                        Owner
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setUserRole("admin");
                        }}
                        className={`text-xs py-1 rounded border transition-colors ${
                          currentUser.role === "admin"
                            ? "bg-[#174A3A] text-white border-[#174A3A]"
                            : "bg-[#F6F2E9] text-[#17211D] border-[#D9DED8] hover:border-[#B99A52]"
                        }`}
                      >
                        Admin
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-add-btn"
              onClick={() => setIsAddBusinessModalOpen(true)}
              className="bg-[#174A3A] border border-[#B99A52] p-2 rounded-lg text-white"
              title="Add Business"
            >
              <Plus size={18} />
            </button>
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-[#174A3A]/50 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0D3026] border-b border-[#174A3A] px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {/* Home */}
            <button
              onClick={() => handleNavClick({ label: "Home", mode: "home" })}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                viewMode === "home"
                  ? "bg-[#174A3A] text-[#B99A52] font-semibold"
                  : "text-white/85 hover:bg-[#174A3A]/40"
              }`}
            >
              <span>Home</span>
              {viewMode === "home" && (
                <Check size={16} className="text-[#B99A52]" />
              )}
            </button>

            {/* Business Accordion Section */}
            <div className="rounded-xl bg-[#09221B] border border-[#174A3A] overflow-hidden">
              <button
                onClick={() =>
                  setIsMobileBusinessExpanded(!isMobileBusinessExpanded)
                }
                className={`w-full text-left px-4 py-2.5 text-base font-medium flex items-center justify-between ${
                  isBusinessActive
                    ? "text-[#B99A52] font-semibold"
                    : "text-white/90"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building size={18} className="text-[#B99A52]" />
                  <span>Business</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isMobileBusinessExpanded
                      ? "rotate-180 text-[#B99A52]"
                      : "text-white/60"
                  }`}
                />
              </button>

              {isMobileBusinessExpanded && (
                <div className="px-2 pb-2 pt-1 space-y-1 border-t border-[#174A3A]/60">
                  {businessSubmenu.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = viewMode === item.mode;
                    return (
                      <button
                        key={item.label}
                        onClick={() => handleNavClick(item)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between transition-colors ${
                          isActive
                            ? "bg-[#174A3A] text-[#B99A52] font-medium"
                            : "text-white/80 hover:bg-[#174A3A]/40 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <IconComponent
                            size={16}
                            className={
                              isActive ? "text-[#B99A52]" : "text-white/60"
                            }
                          />
                          <span>{item.label}</span>
                        </div>
                        {isActive && (
                          <Check size={14} className="text-[#B99A52]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* About */}
            <button
              onClick={() => handleNavClick({ label: "About", mode: "about" })}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                viewMode === "about"
                  ? "bg-[#174A3A] text-[#B99A52] font-semibold"
                  : "text-white/85 hover:bg-[#174A3A]/40"
              }`}
            >
              <span>About</span>
              {viewMode === "about" && (
                <Check size={16} className="text-[#B99A52]" />
              )}
            </button>
          </div>

          {/* User Quick Actions */}
          <div className="pt-3 border-t border-[#174A3A] space-y-2">
            <button
              onClick={() => {
                setViewMode("saved");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/90 hover:bg-[#174A3A]/40 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Bookmark size={18} className="text-[#B99A52]" />
                Saved Businesses
              </span>
              <span className="bg-[#B99A52] text-[#0D3026] text-xs px-2 py-0.5 rounded-full font-bold">
                {currentUser.savedBusinessIds.length}
              </span>
            </button>

            <button
              onClick={() => {
                setViewMode("dashboard");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/90 hover:bg-[#174A3A]/40 flex items-center gap-2"
            >
              <Building size={18} className="text-[#B99A52]" />
              Owner Dashboard
            </button>

            <button
              onClick={() => {
                setViewMode("admin");
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-white/90 hover:bg-[#174A3A]/40 flex items-center gap-2"
            >
              <Shield size={18} className="text-[#B99A52]" />
              Admin Moderation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

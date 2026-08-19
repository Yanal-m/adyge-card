import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Business, Service, Product } from '../../types';
import { BusinessCard } from '../business/BusinessCard';
import { 
  X, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Building, 
  Image as ImageIcon, 
  Briefcase, 
  ShoppingBag, 
  Phone, 
  Eye, 
  Plus, 
  Trash2,
  Sparkles,
  MapPin
} from 'lucide-react';

interface AddBusinessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddBusinessModal: React.FC<AddBusinessModalProps> = ({ isOpen, onClose }) => {
  const { addBusiness, categories, openBusinessDetail, currentUser, showToast } = useApp();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-all');
  const [categoryName, setCategoryName] = useState(categories[0]?.name || 'Businesses');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('Türkiye');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [establishedYear, setEstablishedYear] = useState<number | undefined>(2024);

  // Branding
  const [logoUrl, setLogoUrl] = useState('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80');
  const [coverUrl, setCoverUrl] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80');
  const [isCircassianOwned, setIsCircassianOwned] = useState(true);

  // Contact
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(currentUser.email || '');
  const [website, setWebsite] = useState('');
  const [openingHours, setOpeningHours] = useState('Mon - Sat: 09:00 - 18:00');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');

  // Dynamic Services
  const [services, setServices] = useState<Service[]>([
    {
      id: 'temp-1',
      businessId: '',
      name: 'Custom Consultation',
      description: 'Personalized professional service and advisory.',
      price: '$100',
    }
  ]);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  // Dynamic Products
  const [products, setProducts] = useState<Product[]>([]);
  const [newProdName, setNewProdName] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80');

  if (!isOpen) return null;

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setCategoryId(selectedId);
    const cat = categories.find(c => c.id === selectedId);
    if (cat) setCategoryName(cat.name);
  };

  const handleAddService = () => {
    if (!newServiceName.trim()) return;
    setServices(prev => [
      ...prev,
      {
        id: `srv-${Date.now()}`,
        businessId: '',
        name: newServiceName,
        description: newServiceDesc || 'Professional service',
        price: newServicePrice || 'Contact for price',
      }
    ]);
    setNewServiceName('');
    setNewServiceDesc('');
    setNewServicePrice('');
  };

  const handleRemoveService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const handleAddProduct = () => {
    if (!newProdName.trim()) return;
    setProducts(prev => [
      ...prev,
      {
        id: `prd-${Date.now()}`,
        businessId: '',
        name: newProdName,
        slug: newProdName.toLowerCase().replace(/\s+/g, '-'),
        description: newProdDesc || 'Authentic product',
        price: Number(newProdPrice) || 50,
        currency: 'USD',
        imageUrl: newProdImage,
        isAvailable: true,
      }
    ]);
    setNewProdName('');
    setNewProdDesc('');
    setNewProdPrice('');
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Preview dummy business object
  const previewBusiness: Business = {
    id: 'preview-temp',
    ownerId: currentUser.id,
    name: name || 'Your Circassian Business Name',
    slug: (name || 'my-circassian-business').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    tagline: tagline || `${categoryName} & Specialty`,
    description: description || 'Add a detailed description of your Circassian-owned business, history, products, and services to connect with community members worldwide.',
    categoryId,
    categoryName,
    logoUrl,
    coverUrl,
    country,
    city: city || 'City',
    address: address || 'Main Street',
    phone: phone || '+1 555 123 4567',
    email: email || 'contact@business.com',
    website: website || 'https://business.com',
    openingHours,
    status: 'published',
    isVerified: false,
    isCircassianOwned,
    isFeatured: false,
    rating: 5.0,
    reviewCount: 1,
    viewsCount: 0,
    establishedYear: establishedYear || 2024,
    socialLinks: {
      instagram,
      facebook,
      linkedin,
    },
    services,
    products,
    gallery: [
      { id: 'g1', businessId: '', imageUrl: coverUrl, caption: 'Main Storefront / Project', sortOrder: 1 }
    ],
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleFinalSubmit = () => {
    if (!name.trim() || !description.trim()) {
      showToast('Please provide a business name and description');
      setCurrentStep(1);
      return;
    }

    const created = addBusiness({
      ownerId: currentUser.id,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline,
      description,
      categoryId,
      categoryName,
      logoUrl,
      coverUrl,
      country,
      city: city || 'Global',
      address,
      phone,
      email,
      website,
      openingHours,
      status: 'published',
      isVerified: true, // auto verify created business in demo
      isCircassianOwned,
      isFeatured: false,
      establishedYear,
      socialLinks: {
        instagram,
        facebook,
        linkedin,
      },
      services,
      products,
      gallery: [
        { id: `gal-${Date.now()}-1`, businessId: '', imageUrl: coverUrl, caption: 'Feature Showcase', sortOrder: 1 }
      ],
      reviews: [
        {
          id: `rev-${Date.now()}`,
          businessId: '',
          authorName: currentUser.displayName || 'Community Supporter',
          authorLocation: `${city || 'Diaspora'}, ${country}`,
          rating: 5,
          comment: 'Proud to welcome this Circassian business to our global network!',
          date: new Date().toISOString().split('T')[0],
        }
      ],
    });

    onClose();
    openBusinessDetail(created.slug);
  };

  const steps = [
    { num: 1, label: 'Info' },
    { num: 2, label: 'Branding' },
    { num: 3, label: 'Services' },
    { num: 4, label: 'Products' },
    { num: 5, label: 'Contact' },
    { num: 6, label: 'Preview' },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFDF9] rounded-3xl max-w-3xl w-full border border-[#D9DED8] shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0D3026] text-white p-5 sm:p-6 flex items-center justify-between relative border-b border-[#174A3A]">
          <div className="flex items-center gap-3">
            <div>
              <img
                src="/logo-symbol.png"
                alt="Adyge Card Logo"
                className="w-[60px] h-[60px] object-contain"
              />
            </div>
            <div>
              <h2 className="font-serif-heading font-bold text-xl sm:text-2xl text-white">
                Add Your Business to Adyge Card
              </h2>
              <p className="text-xs text-[#B99A52]">
                Join the global Circassian business network in 6 simple steps
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-full bg-black/20 hover:bg-black/40 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Wizard Step Progress Bar */}
        <div className="bg-[#F6F2E9] px-4 sm:px-8 py-3 border-b border-[#D9DED8] flex items-center justify-between">
          {steps.map((step) => {
            const isDone = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <div 
                key={step.num}
                onClick={() => setCurrentStep(step.num)}
                className="flex items-center gap-1 sm:gap-2 cursor-pointer"
              >
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isDone 
                    ? 'bg-[#174A3A] text-white' 
                    : isCurrent 
                      ? 'bg-[#B99A52] text-white ring-2 ring-[#B99A52]/40' 
                      : 'bg-[#FFFDF9] border border-[#D9DED8] text-[#68736D]'
                }`}>
                  {isDone ? <Check size={12} /> : step.num}
                </div>
                <span className={`text-[11px] sm:text-xs font-semibold hidden md:inline ${
                  isCurrent ? 'text-[#174A3A]' : 'text-[#68736D]'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          
          {/* STEP 1: BUSINESS INFO */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="font-serif-heading font-bold text-lg text-[#17211D] border-b border-[#D9DED8] pb-2">
                1. General Information
              </h3>

              <div>
                <label className="block text-xs font-semibold text-[#17211D] mb-1">Business Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Nalchik Heritage Bakery, Caucasus Tech Studio"
                  className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-4 py-2.5 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17211D] mb-1">Category *</label>
                  <select
                    value={categoryId}
                    onChange={handleCategoryChange}
                    className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2.5 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                  >
                    {categories.filter(c => c.slug !== 'more').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17211D] mb-1">Tagline / Short Subtitle</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="e.g. Traditional Caucasian Cuisine & Pastries"
                    className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-4 py-2.5 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17211D] mb-1">Business Description *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell the community about your story, heritage, services, craft, and mission..."
                  className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-4 py-2.5 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17211D] mb-1">Country *</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Türkiye, USA, Jordan"
                    className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2.5 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17211D] mb-1">City *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Istanbul, Paterson, Amman"
                    className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2.5 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17211D] mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Kadikoy Moda Cad. 88"
                    className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2.5 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                  />
                </div>
              </div>

            </div>
          )}

          {/* STEP 2: BRANDING */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <h3 className="font-serif-heading font-bold text-lg text-[#17211D] border-b border-[#D9DED8] pb-2">
                2. Visual Branding & Media
              </h3>

              <div>
                <label className="block text-xs font-semibold text-[#17211D] mb-1">Cover Photo URL</label>
                <input
                  type="text"
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-4 py-2 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                />
                {/* Preset image suggestions */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] text-[#68736D]">Presets:</span>
                  {[
                    { label: 'Architecture', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80' },
                    { label: 'Restaurant', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80' },
                    { label: 'Crafts', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80' },
                    { label: 'Mountains', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80' },
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setCoverUrl(p.url)}
                      className="text-xs bg-[#FFFDF9] border border-[#D9DED8] px-2.5 py-1 rounded-md hover:border-[#174A3A] cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17211D] mb-1">Logo URL</label>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-4 py-2 text-sm text-[#17211D] focus:outline-none focus:border-[#174A3A]"
                />
              </div>

              <div className="p-4 bg-[#F6F2E9] rounded-2xl border border-[#D9DED8] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-[#17211D]">Circassian Owned Business</p>
                  <p className="text-xs text-[#68736D]">Display the Circassian heritage badge on your digital card</p>
                </div>
                <input
                  type="checkbox"
                  checked={isCircassianOwned}
                  onChange={(e) => setIsCircassianOwned(e.target.checked)}
                  className="w-5 h-5 text-[#174A3A] rounded focus:ring-[#174A3A] accent-[#174A3A]"
                />
              </div>
            </div>
          )}

          {/* STEP 3: SERVICES */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-[#D9DED8] pb-2">
                <h3 className="font-serif-heading font-bold text-lg text-[#17211D]">
                  3. Services & Specializations
                </h3>
                <span className="text-xs text-[#68736D]">{services.length} added</span>
              </div>

              {/* Service Add Form */}
              <div className="bg-[#F6F2E9] p-4 rounded-2xl border border-[#D9DED8] space-y-3">
                <p className="text-xs font-semibold text-[#174A3A]">Add a service:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    placeholder="Service Name (e.g. Interior Consultation)"
                    className="bg-[#FFFDF9] border border-[#D9DED8] rounded-lg px-3 py-2 text-xs text-[#17211D]"
                  />
                  <input
                    type="text"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    placeholder="Price or Starting Rate (e.g. $150)"
                    className="bg-[#FFFDF9] border border-[#D9DED8] rounded-lg px-3 py-2 text-xs text-[#17211D]"
                  />
                </div>
                <input
                  type="text"
                  value={newServiceDesc}
                  onChange={(e) => setNewServiceDesc(e.target.value)}
                  placeholder="Short description of what the service includes"
                  className="w-full bg-[#FFFDF9] border border-[#D9DED8] rounded-lg px-3 py-2 text-xs text-[#17211D]"
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  className="bg-[#174A3A] text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#286B52] flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Service</span>
                </button>
              </div>

              {/* Listed Services */}
              <div className="space-y-2">
                {services.map((srv) => (
                  <div key={srv.id} className="flex items-center justify-between p-3 bg-[#FFFDF9] rounded-xl border border-[#D9DED8]">
                    <div>
                      <p className="font-semibold text-xs sm:text-sm text-[#17211D]">{srv.name}</p>
                      <p className="text-xs text-[#68736D]">{srv.description} • <span className="text-[#174A3A] font-bold">{srv.price}</span></p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveService(srv.id)}
                      className="text-[#68736D] hover:text-red-600 p-1.5 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: PRODUCTS */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-[#D9DED8] pb-2">
                <h3 className="font-serif-heading font-bold text-lg text-[#17211D]">
                  4. Products & Crafts (Optional)
                </h3>
                <span className="text-xs text-[#68736D]">{products.length} added</span>
              </div>

              {/* Product Add Form */}
              <div className="bg-[#F6F2E9] p-4 rounded-2xl border border-[#D9DED8] space-y-3">
                <p className="text-xs font-semibold text-[#174A3A]">Add a product item:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="Product Name (e.g. Silver Adyge Star Pendant)"
                    className="bg-[#FFFDF9] border border-[#D9DED8] rounded-lg px-3 py-2 text-xs text-[#17211D]"
                  />
                  <input
                    type="number"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="Price in USD (e.g. 75)"
                    className="bg-[#FFFDF9] border border-[#D9DED8] rounded-lg px-3 py-2 text-xs text-[#17211D]"
                  />
                </div>
                <input
                  type="text"
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Product details, materials, dimensions"
                  className="w-full bg-[#FFFDF9] border border-[#D9DED8] rounded-lg px-3 py-2 text-xs text-[#17211D]"
                />
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="bg-[#174A3A] text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#286B52] flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Product</span>
                </button>
              </div>

              {/* Listed Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.map((prod) => (
                  <div key={prod.id} className="flex items-center justify-between p-3 bg-[#FFFDF9] rounded-xl border border-[#D9DED8]">
                    <div className="flex items-center gap-3">
                      <img src={prod.imageUrl} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-semibold text-xs text-[#17211D]">{prod.name}</p>
                        <p className="text-xs text-[#174A3A] font-bold">${prod.price}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(prod.id)}
                      className="text-[#68736D] hover:text-red-600 p-1 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: CONTACT */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <h3 className="font-serif-heading font-bold text-lg text-[#17211D] border-b border-[#D9DED8] pb-2">
                5. Contact & Social Channels
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17211D] mb-1">Phone Number / WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+90 555 123 4567"
                    className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2 text-sm text-[#17211D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17211D] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@business.com"
                    className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2 text-sm text-[#17211D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17211D] mb-1">Official Website</label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://mybusiness.com"
                    className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2 text-sm text-[#17211D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17211D] mb-1">Operating Hours</label>
                  <input
                    type="text"
                    value={openingHours}
                    onChange={(e) => setOpeningHours(e.target.value)}
                    placeholder="Mon - Sat: 09:00 - 18:00"
                    className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2 text-sm text-[#17211D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#17211D] mb-1">Instagram URL</label>
                  <input
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2 text-xs text-[#17211D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17211D] mb-1">Facebook URL</label>
                  <input
                    type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    placeholder="https://facebook.com/..."
                    className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2 text-xs text-[#17211D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#17211D] mb-1">LinkedIn URL</label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/..."
                    className="w-full bg-[#F6F2E9] border border-[#D9DED8] rounded-xl px-3 py-2 text-xs text-[#17211D]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: PREVIEW & PUBLISH */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="text-center">
                <span className="text-xs font-semibold text-[#0D3026] bg-[#B99A52] px-3 py-1 rounded-full uppercase tracking-wider">
                  Live Card Preview
                </span>
                <h3 className="font-serif-heading font-bold text-xl sm:text-2xl text-[#17211D] mt-2">
                  Review Your Digital Business Card
                </h3>
                <p className="text-xs text-[#68736D]">
                  This is how your business card will appear to Circassians worldwide.
                </p>
              </div>

              {/* Interactive Card Preview */}
              <div className="max-w-sm mx-auto">
                <BusinessCard business={previewBusiness} />
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Navigation */}
        <div className="bg-[#F6F2E9] px-6 py-4 border-t border-[#D9DED8] flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#17211D] bg-[#FFFDF9] border border-[#D9DED8] px-4 py-2 rounded-xl hover:bg-[#F6F2E9] cursor-pointer"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={() => {
                if (currentStep === 1 && (!name.trim() || !description.trim())) {
                  showToast('Please enter a business name and description');
                  return;
                }
                setCurrentStep(prev => prev + 1);
              }}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white bg-[#174A3A] hover:bg-[#286B52] px-5 py-2 rounded-xl cursor-pointer shadow-sm transition-all"
            >
              <span>Next Step</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0D3026] bg-[#B99A52] hover:bg-[#B99A52]/90 px-6 py-2.5 rounded-xl cursor-pointer shadow-md hover:scale-105 transition-all"
            >
              <Sparkles size={16} />
              <span>Publish Business Card</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

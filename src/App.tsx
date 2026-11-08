import React, { useState, useEffect, useMemo } from 'react';
import { TopBar } from './components/TopBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { DtfCard } from './components/DtfCard';
import { DtfDetailModal } from './components/DtfDetailModal';
import { DTF_DESIGNS_DATA, DtfDesign } from './data/dtfDesigns';
import { OrderDrawer } from './components/OrderDrawer';
import { Footer } from './components/Footer';
import { PRODUCTS_DATA, Product } from './data/products';
import { DEFAULT_SITE_SETTINGS } from './data/defaultSettings';
import { SiteSettings } from './types/admin';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { OrderItem } from './utils/whatsapp';
import { Check, Search, X, Heart, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import homeBannerImg from './assets/images/kalon_home_banner_1794065982613.jpg';
import { AboutPage } from './components/AboutPage';
import { determineBackAction } from './utils/navigation';

export default function App() {
  // Routing state for /admin (accessed directly by URL path or hash, no public button)
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      return path === '/admin' || path.startsWith('/admin') || hash === '#/admin' || hash.startsWith('#/admin');
    }
    return false;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kalon_admin_session') === 'authenticated';
    }
    return false;
  });

  useEffect(() => {
    const handleLocationCheck = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const onAdmin = path === '/admin' || path.startsWith('/admin') || hash === '#/admin' || hash.startsWith('#/admin');
      setIsAdminRoute(onAdmin);
    };

    window.addEventListener('popstate', handleLocationCheck);
    window.addEventListener('hashchange', handleLocationCheck);
    return () => {
      window.removeEventListener('popstate', handleLocationCheck);
      window.removeEventListener('hashchange', handleLocationCheck);
    };
  }, []);

  const navigateToStore = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      setIsAdminRoute(false);
    }
  };

  const navigateToAdmin = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '#/admin');
      setIsAdminRoute(true);
    }
  };

  const handleLogoutAdmin = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kalon_admin_session');
      setIsAdminAuthenticated(false);
      navigateToStore();
    }
  };

  // Products Database State (Initialized from PRODUCTS_DATA with studio flat-lay photography)
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kalon_custom_products_v5');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return PRODUCTS_DATA;
        }
      }
    }
    return PRODUCTS_DATA;
  });

  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('kalon_custom_products_v5', JSON.stringify(newProducts));
  };

  // Site Settings & Editable Content State
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kalon_site_settings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_SITE_SETTINGS;
        }
      }
    }
    return DEFAULT_SITE_SETTINGS;
  });

  const handleUpdateSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    localStorage.setItem('kalon_site_settings', JSON.stringify(newSettings));
  };

  // Enforce pure white theme exclusively
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('kalon_theme');
    }
  }, []);

  // WhatsApp number shortcut synced with siteSettings
  const whatsAppNumber = siteSettings.whatsAppNumber;

  // Mobile & Navigation Tab: 'home' | 'catalog' | 'wishlist' | 'dtf' | 'about'
  const [currentTab, setCurrentTab] = useState<'home' | 'catalog' | 'wishlist' | 'dtf' | 'about'>('home');
  const [activeDtfCategory, setActiveDtfCategory] = useState<string>('all');
  const [selectedDtfDesign, setSelectedDtfDesign] = useState<DtfDesign | null>(null);

  // Category, Search & Sorting
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState<boolean>(false);

  // Filtered DTF print designs memo
  const filteredDtfDesigns = useMemo(() => {
    let list = [...DTF_DESIGNS_DATA];
    if (activeDtfCategory !== 'all') {
      list = list.filter((d) => d.category === activeDtfCategory);
    }
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.code.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeDtfCategory, searchQuery]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kalon_wishlist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('kalon_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Order items bag
  const [orderItems, setOrderItems] = useState<OrderItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kalon_order_items');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('kalon_order_items', JSON.stringify(orderItems));
  }, [orderItems]);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Modal & Drawer Open/Close with Browser History synchronization
  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    try {
      window.history.pushState({ kalonModal: 'product' }, '');
    } catch {
      // ignore
    }
  };

  const handleCloseProduct = () => {
    if (typeof window !== 'undefined' && window.history.state?.kalonModal === 'product') {
      window.history.back();
    } else {
      setSelectedProduct(null);
    }
  };

  const handleOpenOrderDrawer = () => {
    setIsOrderDrawerOpen(true);
    try {
      window.history.pushState({ kalonModal: 'order' }, '');
    } catch {
      // ignore
    }
  };

  const handleCloseOrderDrawer = () => {
    if (typeof window !== 'undefined' && window.history.state?.kalonModal === 'order') {
      window.history.back();
    } else {
      setIsOrderDrawerOpen(false);
    }
  };

  const handleOpenDtfModal = (design: DtfDesign) => {
    setSelectedDtfDesign(design);
    try {
      window.history.pushState({ kalonModal: 'dtf' }, '');
    } catch {
      // ignore
    }
  };

  const handleCloseDtfModal = () => {
    if (typeof window !== 'undefined' && window.history.state?.kalonModal === 'dtf') {
      window.history.back();
    } else {
      setSelectedDtfDesign(null);
    }
  };

  const handleToggleSearch = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (next) {
        try {
          window.history.pushState({ kalonModal: 'search' }, '');
        } catch {
          // ignore
        }
      }
      return next;
    });
  };

  const handleCloseSearch = () => {
    if (typeof window !== 'undefined' && window.history.state?.kalonModal === 'search') {
      window.history.back();
    } else {
      setIsSearchOpen(false);
    }
  };

  const handleSelectTab = (tab: 'home' | 'catalog' | 'wishlist' | 'dtf' | 'about') => {
    if (tab === currentTab && (tab !== 'catalog' || activeCategory === 'all')) return;

    if (currentTab === 'home' && tab !== 'home') {
      try {
        window.history.pushState({ kalonTab: tab }, '');
      } catch {
        // ignore
      }
    }

    setCurrentTab(tab);
    if (tab === 'home') {
      setActiveCategory('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById('grid-prendas');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: string) => {
    if (currentTab === 'home' || activeCategory !== cat) {
      try {
        window.history.pushState({ kalonCategory: cat }, '');
      } catch {
        // ignore
      }
    }

    setActiveCategory(cat);
    if (currentTab !== 'catalog') setCurrentTab('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back button handling: Closes modals or returns to Inicio; if already on Inicio, allows normal browser exit
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBackIntercept = () => {
      // If admin route was toggled, let location check handle it
      const path = window.location.pathname;
      const hash = window.location.hash;
      const onAdmin = path === '/admin' || path.startsWith('/admin') || hash === '#/admin' || hash.startsWith('#/admin');
      if (onAdmin !== isAdminRoute) {
        setIsAdminRoute(onAdmin);
        return;
      }

      if (isAdminRoute) return;

      const action = determineBackAction({
        hasProductModal: Boolean(selectedProduct),
        hasOrderDrawer: Boolean(isOrderDrawerOpen),
        hasDtfModal: Boolean(selectedDtfDesign),
        hasSearchOpen: Boolean(isSearchOpen),
        currentTab,
        activeCategory,
      });

      switch (action) {
        case 'CLOSE_PRODUCT_MODAL':
          setSelectedProduct(null);
          break;
        case 'CLOSE_ORDER_DRAWER':
          setIsOrderDrawerOpen(false);
          break;
        case 'CLOSE_DTF_MODAL':
          setSelectedDtfDesign(null);
          break;
        case 'CLOSE_SEARCH':
          setIsSearchOpen(false);
          break;
        case 'NAVIGATE_TO_HOME':
          setCurrentTab('home');
          setActiveCategory('all');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'ALLOW_BROWSER_EXIT':
          // Browser naturally exits or navigates back like a normal website
          break;
      }
    };

    window.addEventListener('popstate', handleBackIntercept);
    return () => {
      window.removeEventListener('popstate', handleBackIntercept);
    };
  }, [
    isAdminRoute,
    selectedProduct,
    isOrderDrawerOpen,
    selectedDtfDesign,
    isSearchOpen,
    currentTab,
    activeCategory,
  ]);

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast('Eliminado de favoritos');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Guardado en favoritos');
        return [...prev, id];
      }
    });
  };

  const handleAddToOrder = (product: Product, size: string, color: string) => {
    setOrderItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size && item.color === color
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            code: product.code,
            price: product.price,
            size,
            color,
            quantity: 1,
          },
        ];
      }
    });

    showToast(`"${product.name}" añadido a la lista`);
  };

  const handleQuickAddToOrder = (product: Product, size: string, color: string) => {
    handleAddToOrder(product, size, color);
  };

  const handleUpdateQuantity = (id: string, size: string, color: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id, size, color);
      return;
    }
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string, size: string, color: string) => {
    setOrderItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size && item.color === color))
    );
  };

  const handleClearOrder = () => {
    setOrderItems([]);
    showToast('Lista de pedidos vaciada');
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (currentTab === 'wishlist' && !wishlist.includes(p.id)) {
        return false;
      }

      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [products, activeCategory, searchQuery, currentTab, wishlist]);

  // Sorted Products based on user choice
  const filteredAndSortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Pagination State (6 garments per page for clean responsive 2-column mobile & 3-column grid)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy, currentTab]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage, ITEMS_PER_PAGE]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    const el = document.getElementById('grid-prendas');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Caracas Merch-Style Category Header Details synced with siteSettings
  const categoryMeta: Record<string, { title: string; desc: string; expanded: string }> = useMemo(() => {
    const map: Record<string, { title: string; desc: string; expanded: string }> = {
      all: {
        title: 'Streetwear Collection',
        desc: 'Explora la colección oficial KALON, una selección de prendas con cortes contemporáneos y siluetas oversized creadas para quienes buscan piezas con identidad, presencia y acabados DTF de ultra-alta definición.',
        expanded: 'Textiles pesados de 240 a 420 GSM de 100% algodón peinado, estampados mediante termo-fijación neumática DTF de micropigmentación a 300 DPI, garantizados contra desprendimiento y cuarteado por más de 50 ciclos de lavado.',
      },
      tees: {
        title: 'T-Shirts',
        desc: 'Explora las remeras streetwear KALON: siluetas boxy y cortes relajados contemporáneos creados para quienes buscan piezas con presencia, peso textil y un enfoque global del streetwear.',
        expanded: 'Algodón ring-spun preencogido de 240 a 260 GSM con cuellos acanalados indeformables de 3 cm y tratamientos artesanos de lavado ácido mineral.',
      },
      hoodies: {
        title: 'Hoodies',
        desc: 'Buzos con capucha de confección pesada en felpa perchada de 420 GSM: corte oversized drop-shoulder con caída estructurada y estampados de tacto cero rigidez.',
        expanded: 'Capuchas dobles sin cordones para un perfil minimalista limpio, bolsillo canguro geométrico y termoadhesión elástica de poliamida japonesa.',
      },
      jerseys: {
        title: 'Jerseys',
        desc: 'Siluetas inspiradas en el fútbol vintage y sportswear urbano con gráfico gótico y escudo KALON en micropigmentación DTF de máxima definición.',
        expanded: 'Interlock técnico de tacto sedoso y transpirabilidad superior con cuello bicolor indeformable y garantía antimanchas.',
      },
      crewnecks: {
        title: 'Crewnecks',
        desc: 'Sudaderas de cuello redondo con proporciones arquitectónicas inspiradas en el minimalismo industrial: líneas limpias y estampados tipográficos de alta definición.',
        expanded: 'Tejido de punto cerrado antipilling de 380 GSM con elasticidad multidireccional y pigmentos textiles ecológicos certificados libres de solventes.',
      },
      essentials: {
        title: 'Sets & Essentials',
        desc: 'Conjuntos vanguardistas y prendas de layering monocromo para un look streetwear editorial de alto impacto.',
        expanded: 'Piezas sastre combinables con buzos térmicos y monograma KALON termo-adherido de tacto satinado.',
      },
    };

    if (siteSettings.categories && siteSettings.categories.length > 0) {
      siteSettings.categories.forEach((cat) => {
        map[cat.id] = {
          title: cat.title || cat.label,
          desc: cat.desc || '',
          expanded: cat.expanded || '',
        };
      });
    }

    return map;
  }, [siteSettings.categories]);

  const currentMeta = categoryMeta[activeCategory] || categoryMeta['all'];

  const scrollToCatalog = () => {
    setCurrentTab('catalog');
    const el = document.getElementById('grid-prendas');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // ================= ADMIN ROUTE RENDERING =================
  if (isAdminRoute) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => setIsAdminAuthenticated(true)}
          onBackToStore={navigateToStore}
        />
      );
    }

    return (
      <AdminDashboard
        products={products}
        onUpdateProducts={handleUpdateProducts}
        siteSettings={siteSettings}
        onUpdateSiteSettings={handleUpdateSiteSettings}
        onBackToStore={navigateToStore}
        onLogout={handleLogoutAdmin}
      />
    );
  }

  // ================= PUBLIC STOREFRONT (ZERO ADMIN LOGOS/BUTTONS) =================
  return (
    <div className="min-h-screen bg-white text-neutral-900 transition-colors duration-200 pb-20 md:pb-0 dark:bg-neutral-950 dark:text-neutral-100">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 z-50 -translate-x-1/2 border border-neutral-300 bg-neutral-950 px-5 py-2.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-md dark:border-neutral-700 dark:bg-white dark:text-neutral-950">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-500" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* TopBar with Centered KALON Serif Logo and Balanced 3-Zone Architecture */}
      <TopBar
        orderCount={orderItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenOrderDrawer={handleOpenOrderDrawer}
        whatsAppNumber={whatsAppNumber}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onToggleSearch={handleToggleSearch}
        isSearchOpen={isSearchOpen}
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        activeDtfCategory={activeDtfCategory}
        onSelectDtfCategory={(cat) => {
          setActiveDtfCategory(cat);
          const el = document.getElementById('grid-prendas');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenWishlist={() => handleSelectTab('wishlist')}
        customCategories={siteSettings.categories}
      />

      {/* Expandable Mobile Search Bar */}
      {isSearchOpen && (
        <div className="border-b border-neutral-200 bg-white p-3 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mx-auto flex max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por prenda, hoodie, remera o código..."
                className="w-full border border-neutral-300 bg-neutral-50 py-2 pr-9 pl-9 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              onClick={handleCloseSearch}
              className="px-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Editorial Lifestyle Hero Banner - EXCLUSIVELY rendered on Inicio / Home view (Full-width edge-to-edge) */}
      {currentTab === 'home' && (
        <section aria-label="Campaña Editorial KALON" className="w-full border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] max-h-[580px] overflow-hidden select-none">
            <img
              src={homeBannerImg}
              alt="KALON Streetwear Editorial Campaign"
              className="h-full w-full object-cover object-center"
              loading="eager"
            />
            {/* Subtle bottom gradient for readability of editorial stamps */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Editorial aesthetic text overlays (as seen in Caracas Merch reference cap) */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-8 flex items-end justify-between pointer-events-none">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans">
                KALON STATE OF MIND
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-sans">
                KALON™
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Main Catalog Viewport (Direct Caracas Merch Streetwear Layout) */}
      <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {currentTab === 'about' ? (
          <AboutPage
            whatsAppNumber={whatsAppNumber}
            onExploreCatalog={() => {
              setCurrentTab('catalog');
              setActiveCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            {/* Centered Collection Header (Only for clothing and wishlist, removed for DTF as requested) */}
            {currentTab !== 'dtf' && (
          <div className="pt-8 sm:pt-12 pb-4 text-center max-w-2xl mx-auto px-4">
            <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase">
              {currentTab === 'wishlist'
                ? 'Prendas Favoritas'
                : currentTab === 'home'
                ? 'Best Sellers KALON'
                : currentMeta.title}
            </h1>
            
            <p className="mt-2.5 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans font-normal">
              {currentTab === 'wishlist'
                ? 'Tus prendas guardadas para consultar disponibilidad y ordenar directamente por WhatsApp.'
                : currentMeta.desc}
            </p>

            <div className="mt-2">
              {isDescriptionExpanded && (
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed border-t border-neutral-100 pt-2 font-sans">
                  {currentMeta.expanded}
                </p>
              )}
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-1 text-xs font-semibold text-neutral-950 underline hover:opacity-70 transition-opacity font-sans"
              >
                {isDescriptionExpanded ? 'Mostrar menos' : 'Leer más'}
              </button>
            </div>
          </div>
        )}

        {/* Filter & Sort Bar (Clean Hairline Borders) */}
        <div className={`border-y border-neutral-200 py-2.5 sm:py-3 ${currentTab === 'dtf' ? 'mt-3 mb-6' : 'my-6'}`}>
          {currentTab === 'dtf' ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs tracking-wider uppercase font-sans">
                <span className="text-[10.5px] font-bold text-neutral-900 tracking-wider">
                  TEMÁTICAS PARA EVENTOS
                </span>
                <span className="text-xs text-neutral-400 lowercase font-medium">
                  {filteredDtfDesigns.length} {filteredDtfDesigns.length === 1 ? 'ejemplo' : 'ejemplos'}
                </span>
              </div>
              {/* Event Themes Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-[11px] font-sans uppercase">
                {[
                  { id: 'all', label: 'TODOS' },
                  { id: 'cumpleanos', label: 'CUMPLEAÑOS' },
                  { id: 'bodas', label: 'BODAS' },
                  { id: 'eventos', label: 'EVENTOS' },
                  { id: 'deportes', label: 'DEPORTES' },
                  { id: 'empresas', label: 'EMPRESAS' },
                ].map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setActiveDtfCategory(theme.id)}
                    className={`px-2.5 py-1 text-[11px] font-semibold transition-colors shrink-0 ${
                      activeDtfCategory === theme.id
                        ? 'bg-neutral-950 text-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs tracking-wider uppercase font-sans">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 font-medium text-neutral-800 hover:text-neutral-950 transition-colors"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Filtrar y ordenar</span>
              </button>

              <span className="text-xs text-neutral-400 lowercase font-medium">
                {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'producto' : 'productos'}
              </span>
            </div>
          )}

          {/* Quick Sorting Dropdown Options */}
          {isFilterOpen && (
            <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-900 flex flex-wrap items-center gap-2 text-xs font-sans">
              <span className="text-neutral-400 text-[11px] mr-2">Ordenar por:</span>
              {[
                { id: 'featured', label: 'Destacados' },
                { id: 'price-asc', label: 'Precio: Menor a Mayor' },
                { id: 'price-desc', label: 'Precio: Mayor a Menor' },
                { id: 'name', label: 'Nombre A-Z' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSortBy(opt.id as any);
                    setIsFilterOpen(false);
                  }}
                  className={`px-3 py-1.5 border text-[11px] font-medium transition-colors ${
                    sortBy === opt.id
                      ? 'border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-black'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DTF Graphic Prints Grid View OR Apparel Products Grid View */}
        {currentTab === 'dtf' ? (
          <div id="grid-prendas" className="pb-16">
            {filteredDtfDesigns.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4">
                {filteredDtfDesigns.map((design) => (
                  <DtfCard
                    key={design.id}
                    design={design}
                    onOpenDetails={handleOpenDtfModal}
                    whatsAppNumber={whatsAppNumber}
                  />
                ))}
              </div>
            ) : (
              <div className="my-12 flex flex-col items-center justify-center border border-neutral-200 bg-white p-8 text-center">
                <p className="font-sans text-base font-bold text-neutral-900">
                  No se encontraron estampados para esta categoría o búsqueda
                </p>
                <button
                  onClick={() => {
                    setActiveDtfCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-3 bg-neutral-950 px-5 py-2.5 text-xs font-semibold text-white uppercase tracking-wider hover:bg-neutral-800 font-sans"
                >
                  Ver todos los diseños DTF
                </button>
              </div>
            )}
          </div>
        ) : paginatedProducts.length > 0 ? (
          <>
            <div id="grid-prendas" className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4 pb-8 sm:pb-12">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetails={handleOpenProduct}
                  onQuickAddToOrder={handleQuickAddToOrder}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                />
              ))}
            </div>

            {/* Pagination Controls ("1 2 3 4" etc. requested by user) */}
            {totalPages > 1 && (
              <div className="pt-2 pb-16 flex flex-col items-center justify-center gap-3">
                <nav className="inline-flex items-center gap-1.5 sm:gap-2" aria-label="Paginación de productos">
                  {/* Previous Page Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-neutral-200 bg-white text-neutral-800 disabled:opacity-25 disabled:pointer-events-none hover:border-neutral-950 transition-colors dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-white"
                    aria-label="Página anterior"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* Page Numbers 1 2 3 4 */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center text-xs font-sans font-bold transition-all ${
                        currentPage === pageNum
                          ? 'border border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-neutral-950 shadow-xs'
                          : 'border border-neutral-200 bg-white text-neutral-700 hover:border-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-white'
                      }`}
                      aria-label={`Página ${pageNum}`}
                      aria-current={currentPage === pageNum ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Next Page Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center border border-neutral-200 bg-white text-neutral-800 disabled:opacity-25 disabled:pointer-events-none hover:border-neutral-950 transition-colors dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-white"
                    aria-label="Página siguiente"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>

                <p className="font-sans text-[11px] font-medium text-neutral-400 uppercase tracking-wider">
                  Página {currentPage} de {totalPages} · {filteredAndSortedProducts.length} productos en total
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="my-12 flex flex-col items-center justify-center border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
            {currentTab === 'wishlist' ? (
              <>
                <div className="flex h-12 w-12 items-center justify-center border border-neutral-200 bg-neutral-100 text-neutral-400 dark:border-neutral-800 dark:bg-neutral-800">
                  <Heart className="h-6 w-6" />
                </div>
                <p className="mt-3 font-sans text-base font-bold text-neutral-900 dark:text-white">
                  Aún no tienes favoritos guardados
                </p>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                  Toca el icono del corazón en cualquier prenda para guardarla aquí.
                </p>
                <button
                  onClick={() => handleSelectTab('catalog')}
                  className="mt-4 bg-neutral-950 px-5 py-2.5 text-xs font-semibold text-white uppercase tracking-wider dark:bg-white dark:text-neutral-950 font-sans"
                >
                  Explorar Prendas
                </button>
              </>
            ) : (
              <>
                <p className="font-sans text-base font-bold text-neutral-900 dark:text-white">
                  No se encontraron prendas con &quot;{searchQuery}&quot;
                </p>
                <button
                  onClick={() => {
                    handleSelectCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-3 bg-neutral-950 px-5 py-2.5 text-xs font-semibold text-white uppercase tracking-wider dark:bg-white dark:text-neutral-950 font-sans"
                >
                  Ver todo el catálogo
                </button>
              </>
            )}
          </div>
        )}
          </>
        )}

      </main>

      {/* Footer (Matches Caracas Merch Reference with Accordions, Big KALON Wordmark, Badges, etc.) */}
      <Footer whatsAppNumber={whatsAppNumber} onOpenAdmin={navigateToAdmin} />

      {/* Product Detail Sheet / Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseProduct}
        onAddToOrder={handleAddToOrder}
        whatsAppNumber={whatsAppNumber}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Multi-Item Order Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={handleCloseOrderDrawer}
        items={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
        whatsAppNumber={whatsAppNumber}
      />

      {/* DTF Graphic Prints Inspection Modal */}
      <DtfDetailModal
        design={selectedDtfDesign}
        onClose={handleCloseDtfModal}
        whatsAppNumber={whatsAppNumber}
      />

    </div>
  );
}

import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Search, ChevronRight, ChevronLeft, MessageCircle } from 'lucide-react';

interface TopBarProps {
  orderCount: number;
  onOpenOrderDrawer: () => void;
  whatsAppNumber: string;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onToggleSearch?: () => void;
  isSearchOpen?: boolean;
  currentTab: 'home' | 'catalog' | 'wishlist' | 'dtf' | 'about';
  onSelectTab: (tab: 'home' | 'catalog' | 'wishlist' | 'dtf' | 'about') => void;
  activeDtfCategory: string;
  onSelectDtfCategory: (cat: string) => void;
  onOpenWishlist?: () => void;
  customCategories?: Array<{ id: string; label: string; enabled: boolean }>;
}

export const TopBar: React.FC<TopBarProps> = ({
  orderCount,
  onOpenOrderDrawer,
  whatsAppNumber,
  activeCategory,
  onSelectCategory,
  onToggleSearch,
  currentTab,
  onSelectTab,
  activeDtfCategory,
  onSelectDtfCategory,
  onOpenWishlist,
  customCategories,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuView, setMenuView] = useState<'main' | 'shop'>('main');

  const handleOpenMobileMenu = () => {
    setMobileMenuOpen(true);
    if (typeof window !== 'undefined') {
      window.history.pushState({ kalonModal: 'menu' }, '');
    }
  };

  const handleCloseMobileMenu = () => {
    if (typeof window !== 'undefined' && window.history.state?.kalonModal === 'menu') {
      window.history.back();
    } else {
      setMobileMenuOpen(false);
      setMenuView('main');
    }
  };

  // Close mobile drawer when user presses the browser or mobile Back button
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const handlePopState = () => {
      setMobileMenuOpen(false);
      setMenuView('main');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [mobileMenuOpen]);

  const categories = React.useMemo(() => {
    if (customCategories && customCategories.length > 0) {
      const active = customCategories
        .filter((c) => c.enabled !== false)
        .map((c) => ({ id: c.id, label: c.label.toUpperCase() }));
      if (!active.some((c) => c.id === 'all')) {
        active.push({ id: 'all', label: 'VER TODO' });
      }
      return active;
    }
    return [
      { id: 'tees', label: 'T-SHIRTS' },
      { id: 'hoodies', label: 'HOODIES' },
      { id: 'jerseys', label: 'JERSEYS' },
      { id: 'crewnecks', label: 'CREWNECKS' },
      { id: 'all', label: 'VER TODO' },
    ];
  }, [customCategories]);

  const handleNavClick = (targetId: string, categoryId?: string) => {
    if (categoryId) {
      onSelectCategory(categoryId);
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. Animated Sliding Ticker Bar (Text moving continuously in slide, ultra-compact) */}
      <div className="bg-black text-white overflow-hidden py-1.5 border-b border-neutral-900 select-none">
        <div className="animate-marquee flex items-center whitespace-nowrap text-[9px] sm:text-[9.5px] font-medium tracking-[0.22em] uppercase text-neutral-100">
          <div className="flex items-center gap-8 shrink-0 pr-8">
            <span>FREE SHIPPING ON ORDERS +$999 MXN</span>
            <span className="opacity-40">•</span>
            <span>ESTAMPADO DTF ULTRA-HD 300 DPI</span>
            <span className="opacity-40">•</span>
            <span>TEXTILES HEAVYWEIGHT 240-420 GSM</span>
            <span className="opacity-40">•</span>
            <span>PEDIDOS DIRECTOS POR WHATSAPP</span>
            <span className="opacity-40">•</span>
            <span>KALON STREETWEAR ATELIER</span>
            <span className="opacity-40">•</span>
            <span>SILUETAS OVERSIZED & CONTEMPORÁNEAS</span>
            <span className="opacity-40">•</span>
          </div>
          <div className="flex items-center gap-8 shrink-0 pr-8" aria-hidden="true">
            <span>FREE SHIPPING ON ORDERS +$999 MXN</span>
            <span className="opacity-40">•</span>
            <span>ESTAMPADO DTF ULTRA-HD 300 DPI</span>
            <span className="opacity-40">•</span>
            <span>TEXTILES HEAVYWEIGHT 240-420 GSM</span>
            <span className="opacity-40">•</span>
            <span>PEDIDOS DIRECTOS POR WHATSAPP</span>
            <span className="opacity-40">•</span>
            <span>KALON STREETWEAR ATELIER</span>
            <span className="opacity-40">•</span>
            <span>SILUETAS OVERSIZED & CONTEMPORÁNEAS</span>
            <span className="opacity-40">•</span>
          </div>
        </div>
      </div>

      {/* 2. Main Minimalist Pure White Header Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/98 backdrop-blur-md transition-colors dark:border-neutral-800 dark:bg-neutral-950/98">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="relative flex h-14 sm:h-16 items-center justify-between">
            
            {/* Left Zone: Minimalist Hamburger Menu Button */}
            <div className="flex items-center gap-2 z-10 w-1/4">
              <button
                onClick={handleOpenMobileMenu}
                className="flex h-10 w-10 items-center justify-center -ml-2 text-neutral-950 transition-opacity hover:opacity-70 dark:text-white"
                aria-label="Abrir menú de navegación"
              >
                <Menu className="h-5 w-5 stroke-[1.8]" />
              </button>
            </div>

            {/* Center Zone: The Clean Iconic KALON Wordmark (Dead-Centered on all screen sizes) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto text-center">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-block group"
              >
                <span className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[0.22em] text-neutral-950 dark:text-white uppercase transition-opacity hover:opacity-80">
                  KALON
                </span>
              </a>
            </div>

            {/* Right Zone: Search Icon, Theme Toggle & Shopping Bag */}
            <div className="flex items-center justify-end gap-2 sm:gap-4 z-10 w-1/4">
              {/* Search Toggle Icon */}
              {onToggleSearch && (
                <button
                  onClick={onToggleSearch}
                  className="flex h-9 w-9 items-center justify-center text-neutral-900 transition-opacity hover:opacity-70 dark:text-white"
                  aria-label="Buscar productos"
                >
                  <Search className="h-4.5 w-4.5 stroke-[1.8]" />
                </button>
              )}

              {/* Shopping Bag Button (Exact Caracas Merch Outline Style with Numeric Badge) */}
              <button
                onClick={onOpenOrderDrawer}
                className="relative flex h-10 w-10 items-center justify-center text-neutral-900 transition-opacity hover:opacity-70"
                aria-label="Ver bolsa de pedidos"
              >
                <ShoppingBag className="h-5 w-5 stroke-[1.8]" />
                {orderCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center bg-neutral-950 font-sans text-[9px] font-bold text-white">
                    {orderCount}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* 3. Horizontal Category Text Links Sub-Bar (Strictly Original 5 Categories, Perfectly Centered) */}
        <div className="border-t border-neutral-100 bg-white w-full overflow-hidden">
          <div className="mx-auto w-full max-w-md sm:max-w-7xl px-3 sm:px-8 py-1.5 sm:py-2">
            <nav className="flex items-center justify-between sm:justify-center sm:gap-8 text-[9px] sm:text-xs font-semibold tracking-[0.06em] sm:tracking-[0.16em] uppercase text-neutral-600">
              {categories.map((cat) => {
                const isActive = currentTab === 'catalog' && activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      if (currentTab !== 'catalog') onSelectTab('catalog');
                      onSelectCategory(cat.id);
                    }}
                    className={`py-1 px-0.5 border-b-2 transition-all shrink-0 ${
                      isActive
                        ? 'border-neutral-950 text-neutral-950 font-bold'
                        : 'border-transparent text-neutral-500 hover:text-neutral-950'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* 4. Sleek Slide-out Drawer Menu (When hamburger ☰ is clicked) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-2xs transition-opacity"
            onClick={handleCloseMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative z-10 flex h-full w-full max-w-xs sm:max-w-sm flex-col bg-white shadow-2xl border-r border-neutral-200 p-6">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
              {menuView === 'main' ? (
                <span className="font-editorial text-xl font-bold tracking-[0.2em] text-neutral-950 uppercase">
                  KALON
                </span>
              ) : (
                <button
                  onClick={() => setMenuView('main')}
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-700 hover:text-black transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Volver</span>
                </button>
              )}
              
              <button
                onClick={handleCloseMobileMenu}
                className="p-1 text-neutral-500 hover:text-neutral-950 transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Menu Body */}
            <div className="mt-5 flex-1 overflow-y-auto pr-1">
              {menuView === 'main' ? (
                /* Main Minimalist Options List */
                <nav className="flex flex-col space-y-1 text-neutral-900">
                  {/* 1. Inicio */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSelectTab('home');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left py-2.5 text-base sm:text-lg font-medium tracking-tight hover:opacity-70 transition-opacity ${
                      currentTab === 'home' ? 'text-neutral-950 font-bold' : 'text-neutral-900'
                    }`}
                  >
                    Inicio
                  </button>

                  {/* 2. Nuevos Drops */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSelectTab('catalog');
                      onSelectCategory('all');
                      handleNavClick('grid-prendas', 'all');
                    }}
                    className="w-full text-left py-2.5 text-base sm:text-lg font-medium tracking-tight hover:opacity-70 transition-opacity"
                  >
                    Nuevos Drops
                  </button>

                  {/* 3. Más Vendidos */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSelectTab('catalog');
                      onSelectCategory('all');
                      handleNavClick('grid-prendas', 'all');
                    }}
                    className="w-full text-left py-2.5 text-base sm:text-lg font-medium tracking-tight hover:opacity-70 transition-opacity"
                  >
                    Más Vendidos
                  </button>

                  {/* 4. Tienda (Opens sub-menu with category options) */}
                  <button
                    onClick={() => setMenuView('shop')}
                    className="w-full flex items-center justify-between text-left py-2.5 text-base sm:text-lg font-medium tracking-tight hover:opacity-70 transition-opacity"
                  >
                    <span>Tienda</span>
                    <ChevronRight className="h-4.5 w-4.5 text-neutral-500" />
                  </button>

                  {/* 5. Catálogo DTF (Navigates directly to the DTF designs view) */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSelectTab('dtf');
                      const el = document.getElementById('grid-prendas');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-left py-2.5 hover:opacity-70 transition-opacity group"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-base sm:text-lg font-medium tracking-tight ${currentTab === 'dtf' ? 'text-black font-bold' : 'text-neutral-900'}`}>
                        Catálogo DTF
                      </span>
                      <ChevronRight className="h-4.5 w-4.5 text-neutral-500" />
                    </div>
                    <span className="text-xs text-neutral-500 font-normal block font-sans tracking-normal normal-case mt-0.5">
                      Diseños de estampados (no ropa)
                    </span>
                  </button>

                  {/* 6. Sobre KALON (Switches to dedicated 'about' tab) */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSelectTab('about');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left py-2.5 text-base sm:text-lg font-medium tracking-tight hover:opacity-70 transition-opacity ${
                      currentTab === 'about' ? 'text-black font-bold' : 'text-neutral-900'
                    }`}
                  >
                    Sobre KALON
                  </button>

                  {/* 7. Asesoría WhatsApp */}
                  <a
                    href={`https://wa.me/${whatsAppNumber.replace(/[^\d]/g, '')}?text=Hola%20KALON!%20Me%20gustar%C3%ADa%20hacer%20una%20consulta.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left py-2.5 text-base sm:text-lg font-medium tracking-tight hover:opacity-70 transition-opacity"
                  >
                    Asesoría WhatsApp
                  </a>
                </nav>
              ) : (
                /* Submenu: Tienda / Categorías */
                <div>
                  <div className="pb-3 mb-2 border-b border-neutral-100">
                    <span className="text-[11px] font-sans font-bold tracking-widest uppercase text-neutral-400">
                      Categorías de Prendas
                    </span>
                  </div>

                  <nav className="flex flex-col space-y-1">
                    <button
                      onClick={() => {
                        onSelectTab('catalog');
                        handleNavClick('grid-prendas', 'all');
                        setMenuView('main');
                      }}
                      className="w-full flex items-center justify-between text-left py-2.5 text-base sm:text-lg font-semibold text-neutral-950 hover:opacity-70 transition-opacity"
                    >
                      <span>Ver Todo</span>
                      <ChevronRight className="h-4 w-4 text-neutral-400" />
                    </button>

                    {categories.filter((c) => c.id !== 'all').map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectTab('catalog');
                          handleNavClick('grid-prendas', cat.id);
                          setMenuView('main');
                        }}
                        className="w-full flex items-center justify-between text-left py-2.5 text-base sm:text-lg font-medium text-neutral-800 hover:text-black hover:opacity-70 transition-opacity"
                      >
                        <span>{cat.label}</span>
                        <ChevronRight className="h-4 w-4 text-neutral-400" />
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </div>

            {/* Bottom Actions in Drawer */}
            <div className="mt-auto border-t border-neutral-100 pt-4 space-y-3">
              <a
                href={`https://wa.me/${whatsAppNumber.replace(/[^\d]/g, '')}?text=Hola%20KALON!%20Me%20gustar%C3%ADa%20hacer%20una%20consulta%20del%20cat%C3%A1logo.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-neutral-950 py-3 text-xs font-bold tracking-widest text-white uppercase hover:bg-neutral-800 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp KALON</span>
              </a>

              {/* Minimal Social Links */}
              <div className="flex items-center justify-center gap-6 pt-1 text-[10px] font-sans font-bold tracking-widest uppercase text-neutral-500">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Instagram
                </a>
                <span>•</span>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  TikTok
                </a>
              </div>

              <div className="text-center pt-1">
                <p className="text-[9.5px] text-neutral-400 tracking-widest uppercase font-sans font-medium">
                  KALON ATELIER · STREETWEAR & DTF
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

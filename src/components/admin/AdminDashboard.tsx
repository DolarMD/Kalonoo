import React, { useState, useMemo } from 'react';
import {
  Package,
  Layers,
  Sliders,
  Shield,
  ExternalLink,
  Plus,
  Edit3,
  Trash2,
  Check,
  Search,
  LogOut,
  Phone,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Tag,
  X,
} from 'lucide-react';
import { Product, PRODUCTS_DATA } from '../../data/products';
import { DTF_DESIGNS_DATA, DtfDesign } from '../../data/dtfDesigns';
import { SiteSettings, CategoryItem } from '../../types/admin';
import { DEFAULT_CATEGORIES } from '../../data/defaultSettings';
import { ProductEditorModal } from './ProductEditorModal';
import { formatCurrency } from '../../utils/whatsapp';
import { KalonLogo } from '../KalonLogo';

interface AdminDashboardProps {
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
  siteSettings: SiteSettings;
  onUpdateSiteSettings: (newSettings: SiteSettings) => void;
  onBackToStore: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onUpdateProducts,
  siteSettings,
  onUpdateSiteSettings,
  onBackToStore,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'dtf' | 'settings' | 'security'>('products');

  // Categories state from siteSettings or default
  const categories: CategoryItem[] = useMemo(() => {
    return siteSettings.categories && siteSettings.categories.length > 0
      ? siteSettings.categories
      : DEFAULT_CATEGORIES;
  }, [siteSettings.categories]);

  // Category Editor modal state
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [categoryFormData, setCategoryFormData] = useState<CategoryItem>({
    id: '',
    label: '',
    title: '',
    desc: '',
    expanded: '',
    enabled: true,
  });

  // Product editor state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // DTF state
  const [dtfCategoryFilter, setDtfCategoryFilter] = useState('all');
  const [dtfSearch, setDtfSearch] = useState('');

  // Settings form state
  const [formSettings, setFormSettings] = useState<SiteSettings>(siteSettings);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Security password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // ================= CATEGORY ACTIONS =================
  const handleOpenNewCategory = () => {
    setEditingCategory(null);
    setCategoryFormData({
      id: '',
      label: '',
      title: '',
      desc: '',
      expanded: '',
      enabled: true,
    });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setCategoryFormData({ ...cat });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryFormData.label.trim()) return;

    const rawId = categoryFormData.id.trim()
      ? categoryFormData.id.trim().toLowerCase().replace(/\s+/g, '-')
      : categoryFormData.label.trim().toLowerCase().replace(/\s+/g, '-');

    const updatedCat: CategoryItem = {
      ...categoryFormData,
      id: rawId,
      label: categoryFormData.label.trim().toUpperCase(),
      title: categoryFormData.title.trim() || categoryFormData.label.trim(),
    };

    let nextCategories: CategoryItem[];
    if (editingCategory) {
      nextCategories = categories.map((c) => (c.id === editingCategory.id ? updatedCat : c));
      showToast(`Categoría "${updatedCat.label}" actualizada.`);
    } else {
      if (categories.some((c) => c.id === rawId)) {
        showToast('Ya existe una categoría con ese identificador.');
        return;
      }
      nextCategories = [...categories, updatedCat];
      showToast(`Nueva categoría "${updatedCat.label}" añadida.`);
    }

    const nextSettings: SiteSettings = {
      ...siteSettings,
      categories: nextCategories,
    };
    onUpdateSiteSettings(nextSettings);
    setFormSettings(nextSettings);
    setIsCategoryModalOpen(false);
  };

  const handleToggleCategoryEnabled = (id: string) => {
    const nextCategories = categories.map((c) =>
      c.id === id ? { ...c, enabled: !c.enabled } : c
    );
    const nextSettings = { ...siteSettings, categories: nextCategories };
    onUpdateSiteSettings(nextSettings);
    setFormSettings(nextSettings);
    showToast('Visibilidad de categoría actualizada.');
  };

  const handleDeleteCategory = (id: string, label: string) => {
    if (window.confirm(`¿Eliminar la categoría "${label}" de las opciones de la tienda?`)) {
      const nextCategories = categories.filter((c) => c.id !== id);
      const nextSettings = { ...siteSettings, categories: nextCategories };
      onUpdateSiteSettings(nextSettings);
      setFormSettings(nextSettings);
      showToast(`Categoría "${label}" eliminada.`);
    }
  };

  const handleResetCategories = () => {
    if (window.confirm('¿Restablecer las categorías originales (T-Shirts, Hoodies, Jerseys, Crewnecks)?')) {
      const nextSettings = { ...siteSettings, categories: DEFAULT_CATEGORIES };
      onUpdateSiteSettings(nextSettings);
      setFormSettings(nextSettings);
      showToast('Categorías restablecidas por defecto.');
    }
  };

  // ================= PRODUCT ACTIONS =================
  const handleCreateProduct = () => {
    setEditingProduct(null);
    setIsEditorOpen(true);
  };

  const handleEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsEditorOpen(true);
  };

  const handleSaveProduct = (prod: Product) => {
    const existingIndex = products.findIndex((p) => p.id === prod.id);
    let updated: Product[];
    if (existingIndex >= 0) {
      updated = [...products];
      updated[existingIndex] = prod;
      showToast(`Prenda "${prod.name}" actualizada.`);
    } else {
      updated = [prod, ...products];
      showToast(`Nueva prenda creada.`);
    }
    onUpdateProducts(updated);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`¿Eliminar la prenda "${name}" permanentemente?`)) {
      const updated = products.filter((p) => p.id !== id);
      onUpdateProducts(updated);
      showToast('Prenda eliminada.');
    }
  };

  // 1-Tap Quick Stock Toggle
  const handleToggleStock = (id: string, currentStatus: boolean, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = products.map((p) =>
      p.id === id ? { ...p, inStock: !currentStatus } : p
    );
    onUpdateProducts(updated);
    showToast(currentStatus ? 'Marcado como Agotado' : 'Marcado como En Stock');
  };

  // ================= SETTINGS ACTIONS =================
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteSettings(formSettings);
    showToast('Ajustes de tienda guardados.');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    if (newPassword !== confirmPassword) {
      showToast('Las contraseñas no coinciden.');
      return;
    }
    localStorage.setItem('kalon_admin_pass', newPassword.trim());
    setNewPassword('');
    setConfirmPassword('');
    showToast('Contraseña maestra actualizada con éxito.');
  };

  const handleExportData = () => {
    const backupObj = {
      products,
      categories,
      siteSettings,
      exportedAt: new Date().toISOString(),
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kalon_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Copia de respaldo descargada.');
  };

  const handleResetCatalog = () => {
    if (window.confirm('¿Restablecer el catálogo con los 12 productos oficiales de KALON?')) {
      onUpdateProducts(PRODUCTS_DATA);
      showToast('Catálogo restaurado a valores por defecto.');
    }
  };

  // Filtered Products Memo
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
      const q = productSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [products, categoryFilter, productSearch]);

  // Filtered DTF Designs Memo
  const filteredDtfDesigns = useMemo(() => {
    return DTF_DESIGNS_DATA.filter((d) => {
      const matchesCat = dtfCategoryFilter === 'all' || d.category === dtfCategoryFilter;
      const q = dtfSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [dtfCategoryFilter, dtfSearch]);

  // Available categories for product editor
  const availableCategoriesForEditor = useMemo(() => {
    return categories
      .filter((c) => c.enabled)
      .map((c) => ({ id: c.id, label: c.title || c.label }));
  }, [categories]);

  // In-stock metrics
  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = products.length - inStockCount;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-24 md:pb-12 font-sans antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 border border-neutral-300 bg-neutral-950 px-4 py-2.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            
            {/* Left: Brand & Live Indicator */}
            <div className="flex items-center gap-3">
              <span className="font-editorial text-lg sm:text-xl font-black tracking-widest uppercase text-neutral-950">
                KALON
              </span>
              <span className="hidden sm:inline-block h-3.5 w-px bg-neutral-300" />
              <div className="flex items-center gap-1.5 px-2 py-0.5 border border-emerald-200 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Tienda Activa</span>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-600">
              {[
                { id: 'products', label: 'Prendas', icon: Package },
                { id: 'categories', label: 'Opciones / Categorías', icon: Tag },
                { id: 'dtf', label: 'Estampados DTF', icon: Layers },
                { id: 'settings', label: 'Ajustes Tienda', icon: Sliders },
                { id: 'security', label: 'Seguridad', icon: Shield },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 border transition-all ${
                      isActive
                        ? 'border-neutral-950 bg-neutral-950 text-white font-bold'
                        : 'border-transparent text-neutral-600 hover:text-black hover:border-neutral-200'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right: View Store & Logout */}
            <div className="flex items-center gap-2">
              <button
                onClick={onBackToStore}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-neutral-300 bg-white text-xs font-semibold text-neutral-800 hover:border-black transition-colors"
                title="Abrir tienda pública"
              >
                <Eye className="h-3.5 w-3.5 text-neutral-500" />
                <span className="hidden sm:inline">Ver Tienda</span>
              </button>

              <button
                onClick={onLogout}
                className="flex h-8 w-8 items-center justify-center text-neutral-500 hover:text-red-600 hover:bg-neutral-100 transition-colors"
                title="Cerrar sesión"
                aria-label="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-5xl px-3 sm:px-6 pt-4 sm:pt-6">
        
        {/* Dynamic Metrics Row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-5">
          {/* Card 1: Total Prendas */}
          <div className="border border-neutral-200 bg-white p-3 sm:p-4 shadow-2xs">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
              Prendas
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-neutral-950">
                {products.length}
              </span>
              <span className="text-[10.5px] font-semibold text-emerald-600">
                {inStockCount} en stock
              </span>
            </div>
            {outOfStockCount > 0 && (
              <span className="text-[10px] text-neutral-400 mt-0.5 block">
                {outOfStockCount} agotada{outOfStockCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Card 2: Categorías / Opciones */}
          <div className="border border-neutral-200 bg-white p-3 sm:p-4 shadow-2xs">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
              Categorías Activas
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-neutral-950">
                {categories.filter((c) => c.enabled).length}
              </span>
              <span className="text-[10.5px] font-semibold text-neutral-500">
                de {categories.length}
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 mt-0.5 block">
              Siluetas y tipos
            </span>
          </div>

          {/* Card 3: WhatsApp Canal */}
          <div className="border border-neutral-200 bg-white p-3 sm:p-4 shadow-2xs">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
              Canal WhatsApp
            </span>
            <div className="mt-1 truncate">
              <span className="text-xs sm:text-sm font-bold text-neutral-900 block truncate">
                {siteSettings.whatsAppNumber}
              </span>
              <span className="text-[10px] font-medium text-emerald-600">
                Directo en línea
              </span>
            </div>
          </div>
        </div>

        {/* ================= TAB 1: PRENDAS ================= */}
        {activeTab === 'products' && (
          <section className="space-y-4">
            
            {/* Action Bar: Search & New Product */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Buscar por prenda, código KLN-T01..."
                  className="w-full border border-neutral-300 bg-white py-2 pr-8 pl-9 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-hidden shadow-2xs"
                />
                {productSearch && (
                  <button
                    onClick={() => setProductSearch('')}
                    className="absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-400 hover:text-black text-xs font-bold"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Add Product Button */}
              <button
                onClick={handleCreateProduct}
                className="flex items-center justify-center gap-1.5 bg-neutral-950 px-4 py-2 text-xs font-bold tracking-wider uppercase text-white hover:bg-neutral-800 transition-colors shadow-2xs shrink-0 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Nueva Prenda</span>
              </button>
            </div>

            {/* Scrollable Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {[
                { id: 'all', label: 'Todas' },
                ...categories
                  .filter((c) => c.enabled)
                  .map((c) => ({ id: c.id, label: c.title || c.label })),
              ].map((cat) => {
                const count = cat.id === 'all'
                  ? products.length
                  : products.filter((p) => p.category === cat.id).length;
                const isSelected = categoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors shrink-0 border ${
                      isSelected
                        ? 'border-neutral-950 bg-neutral-950 text-white'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    {cat.label} ({count})
                  </button>
                );
              })}
            </div>

            {/* Products List (Touch-Friendly Rows) */}
            <div className="space-y-2">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  return (
                    <div
                      key={product.id}
                      onClick={() => handleEditProduct(product)}
                      className="group flex items-center justify-between border border-neutral-200 bg-white p-2.5 sm:p-3 hover:border-neutral-400 transition-all cursor-pointer shadow-2xs"
                    >
                      {/* Left: Thumbnail & Info */}
                      <div className="flex items-center gap-3 min-w-0">
                        {/* 60x60 Product Thumbnail */}
                        <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 border border-neutral-200 bg-neutral-100 overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                          {!product.inStock && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-[8px] font-bold text-white uppercase tracking-tight">
                                Agotado
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Title, Code, Price */}
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">
                              {product.code}
                            </span>
                            <span className="text-[9.5px] uppercase tracking-wider text-neutral-400">
                              • {product.category}
                            </span>
                            {product.featured && (
                              <span className="text-[9px] bg-neutral-100 px-1 font-semibold uppercase text-neutral-700">
                                En Home
                              </span>
                            )}
                          </div>

                          <h3 className="text-xs sm:text-sm font-bold text-neutral-950 truncate font-sans group-hover:text-black">
                            {product.name}
                          </h3>

                          <div className="mt-0.5 flex items-center gap-2">
                            <span className="text-xs font-extrabold text-neutral-900">
                              {formatCurrency(product.price)}
                            </span>
                            <span className="text-[10px] text-neutral-400">
                              {product.sizes.join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Quick Stock Toggle & Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* 1-Tap Quick Stock Switch */}
                        <button
                          type="button"
                          onClick={(e) => handleToggleStock(product.id, product.inStock, e)}
                          className={`px-2.5 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors border ${
                            product.inStock
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                              : 'border-neutral-300 bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                          }`}
                          title="Alternar disponibilidad inmediata"
                        >
                          {product.inStock ? 'En Stock' : 'Agotado'}
                        </button>

                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditProduct(product);
                          }}
                          className="flex h-8 w-8 items-center justify-center border border-neutral-200 bg-white text-neutral-600 hover:text-black hover:border-black transition-colors"
                          aria-label={`Editar ${product.name}`}
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProduct(product.id, product.name);
                          }}
                          className="flex h-8 w-8 items-center justify-center border border-neutral-200 bg-white text-neutral-400 hover:text-red-600 hover:border-red-300 transition-colors"
                          aria-label={`Eliminar ${product.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                    </div>
                  );
                })
              ) : (
                <div className="border border-neutral-200 bg-white p-8 text-center">
                  <p className="text-sm font-bold text-neutral-900">
                    No se encontraron prendas con los filtros actuales
                  </p>
                  <button
                    onClick={() => {
                      setCategoryFilter('all');
                      setProductSearch('');
                    }}
                    className="mt-3 bg-neutral-950 px-4 py-2 text-xs font-semibold text-white uppercase"
                  >
                    Restablecer Filtros
                  </button>
                </div>
              )}
            </div>

            {/* Quick backup bar */}
            <div className="pt-2 flex items-center justify-between text-xs text-neutral-500">
              <span>{filteredProducts.length} prendas listadas</span>
              <div className="flex gap-2">
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-1 text-[11px] font-semibold text-neutral-700 hover:text-black underline"
                >
                  <Download className="h-3 w-3" />
                  <span>Exportar JSON</span>
                </button>
                <span>•</span>
                <button
                  onClick={handleResetCatalog}
                  className="flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-red-600"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Restaurar Oficial</span>
                </button>
              </div>
            </div>

          </section>
        )}

        {/* ================= TAB 2: GESTIÓN DE CATEGORÍAS (HOODIES, T-SHIRTS, ETC.) ================= */}
        {activeTab === 'categories' && (
          <section className="space-y-4">
            
            {/* Header with Explanation and New Button */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4 bg-white p-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-950">
                  Opciones y Categorías de Prendas
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Modifica los nombres que aparecen en el menú (Hoodies, T-Shirts, Jerseys, etc.), sus textos editoriales o añade nuevas opciones.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleResetCategories}
                  className="px-3 py-2 border border-neutral-200 text-xs font-semibold text-neutral-600 hover:text-black transition-colors"
                >
                  Restaurar por Defecto
                </button>

                <button
                  onClick={handleOpenNewCategory}
                  className="flex items-center gap-1.5 bg-neutral-950 px-4 py-2 text-xs font-bold tracking-wider uppercase text-white hover:bg-neutral-800 transition-colors shadow-2xs"
                >
                  <Plus className="h-4 w-4" />
                  <span>Nueva Opción</span>
                </button>
              </div>
            </div>

            {/* Categories List Cards */}
            <div className="space-y-2.5">
              {categories.map((cat) => {
                const associatedCount = products.filter((p) => p.category === cat.id).length;
                return (
                  <div
                    key={cat.id}
                    className="border border-neutral-200 bg-white p-3.5 sm:p-4 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-neutral-400 transition-colors"
                  >
                    {/* Left: Category Info */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-editorial text-sm sm:text-base font-bold text-neutral-950 tracking-wider">
                          {cat.label}
                        </span>
                        <span className="text-[10px] font-mono bg-neutral-100 text-neutral-600 px-1.5 py-0.5 uppercase">
                          id: {cat.id}
                        </span>
                        <span className="text-[10.5px] font-semibold text-neutral-400">
                          • {associatedCount} prenda{associatedCount === 1 ? '' : 's'} asociada{associatedCount === 1 ? '' : 's'}
                        </span>
                      </div>

                      <div className="text-xs text-neutral-700 font-medium">
                        Título en cabecera: <span className="font-bold text-neutral-900">{cat.title}</span>
                      </div>

                      {cat.desc && (
                        <p className="text-[11px] text-neutral-500 line-clamp-2">
                          {cat.desc}
                        </p>
                      )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {/* Visibility Switch */}
                      <button
                        type="button"
                        onClick={() => handleToggleCategoryEnabled(cat.id)}
                        className={`px-3 py-1 text-[10.5px] font-bold uppercase tracking-wider transition-colors border ${
                          cat.enabled
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                            : 'border-neutral-300 bg-neutral-100 text-neutral-400'
                        }`}
                      >
                        {cat.enabled ? 'Visible en Menú' : 'Oculto'}
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenEditCategory(cat)}
                        className="flex h-8 w-8 items-center justify-center border border-neutral-200 bg-white text-neutral-700 hover:text-black hover:border-black transition-colors"
                        aria-label={`Editar categoría ${cat.label}`}
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>

                      {/* Delete Button (if not only one) */}
                      {categories.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(cat.id, cat.label)}
                          className="flex h-8 w-8 items-center justify-center border border-neutral-200 bg-white text-neutral-400 hover:text-red-600 hover:border-red-300 transition-colors"
                          aria-label={`Eliminar categoría ${cat.label}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>

          </section>
        )}

        {/* ================= TAB 3: ESTAMPADOS DTF ================= */}
        {activeTab === 'dtf' && (
          <section className="space-y-4">
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={dtfSearch}
                  onChange={(e) => setDtfSearch(e.target.value)}
                  placeholder="Buscar diseño DTF por título o código..."
                  className="w-full border border-neutral-300 bg-white py-2 pr-8 pl-9 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-hidden shadow-2xs"
                />
              </div>
            </div>

            {/* Event Themes Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {[
                { id: 'all', label: 'Todas las temáticas' },
                { id: 'cumpleanos', label: 'Cumpleaños' },
                { id: 'bodas', label: 'Bodas' },
                { id: 'eventos', label: 'Eventos' },
                { id: 'deportes', label: 'Deportes' },
                { id: 'empresas', label: 'Empresas' },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setDtfCategoryFilter(theme.id)}
                  className={`px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors shrink-0 border ${
                    dtfCategoryFilter === theme.id
                      ? 'border-neutral-950 bg-neutral-950 text-white'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400'
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>

            {/* DTF Designs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredDtfDesigns.map((design) => (
                <div
                  key={design.id}
                  className="flex gap-3 border border-neutral-200 bg-white p-3 shadow-2xs"
                >
                  <div
                    className="h-20 w-20 shrink-0 border border-neutral-800 flex flex-col items-center justify-center p-1.5 text-center overflow-hidden select-none"
                    style={{ backgroundColor: design.graphicStyle.bgColor }}
                  >
                    <span className="text-[7.5px] font-mono text-neutral-400 block truncate max-w-full">
                      {design.code}
                    </span>
                    <span
                      className="text-[9px] font-black uppercase leading-tight mt-0.5 line-clamp-2"
                      style={{ color: design.graphicStyle.textColor }}
                    >
                      {design.graphicStyle.mainText}
                    </span>
                    <span
                      className="text-[7px] font-bold px-1 py-0.5 mt-1 uppercase text-white truncate max-w-full"
                      style={{ backgroundColor: design.graphicStyle.accentColor }}
                    >
                      {design.graphicStyle.tagText}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-neutral-400">
                        {design.code}
                      </span>
                      <span className="text-[10px] uppercase text-neutral-400">
                        • {design.category}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-neutral-900 truncate mt-0.5">
                      {design.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500 line-clamp-2 mt-0.5">
                      {design.description}
                    </p>
                    <a
                      href={`https://wa.me/${siteSettings.whatsAppNumber.replace(/[^\d]/g, '')}?text=Hola%20KALON!%20Me%20interesa%20el%20dise%C3%B1o%20DTF%20${design.code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10.5px] font-bold text-neutral-900 hover:underline mt-1.5"
                    >
                      <span>Probar consulta WhatsApp</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </section>
        )}

        {/* ================= TAB 4: AJUSTES TIENDA & WHATSAPP ================= */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-4">
            
            {/* WhatsApp Integration Card */}
            <div className="border border-neutral-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 block">
                  CANAL PRINCIPAL DE VENTAS
                </span>
                <h3 className="text-sm font-bold text-neutral-900 uppercase">
                  Número de WhatsApp Oficial
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Los pedidos directos y consultas de catálogo se envían automáticamente a este número.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <div className="relative flex-1">
                  <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={formSettings.whatsAppNumber}
                    onChange={(e) => setFormSettings({ ...formSettings, whatsAppNumber: e.target.value })}
                    placeholder="+52 55 8124 9301"
                    className="w-full border border-neutral-300 bg-neutral-50 py-2.5 pr-3 pl-9 text-xs font-mono font-bold text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <a
                  href={`https://wa.me/${formSettings.whatsAppNumber.replace(/[^\d]/g, '')}?text=Hola%20KALON!%20Prueba%20de%20conexi%C3%B3n.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 px-4 py-2.5 text-xs font-bold text-neutral-800 transition-colors uppercase"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Probar Chat</span>
                </a>
              </div>
            </div>

            {/* Announcement Ticker Bar Texts */}
            <div className="border border-neutral-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 block">
                  CINTILLO SUPERIOR SLIDER
                </span>
                <h3 className="text-sm font-bold text-neutral-900 uppercase">
                  Texto del Banner Deslizante
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Mensajes de aviso que pasan continuamente en la franja negra superior.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                    Aviso Principal
                  </label>
                  <input
                    type="text"
                    value={formSettings.announcementBar.left}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        announcementBar: { ...formSettings.announcementBar, left: e.target.value },
                      })
                    }
                    placeholder="FREE SHIPPING ON ORDERS +$999 MXN"
                    className="mt-1 w-full border border-neutral-300 bg-neutral-50 p-2 text-xs text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                    Aviso Secundario
                  </label>
                  <input
                    type="text"
                    value={formSettings.announcementBar.center}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        announcementBar: { ...formSettings.announcementBar, center: e.target.value },
                      })
                    }
                    placeholder="ESTAMPADO DTF ULTRA-HD 300 DPI"
                    className="mt-1 w-full border border-neutral-300 bg-neutral-50 p-2 text-xs text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto bg-neutral-950 px-8 py-3 text-xs font-bold tracking-wider text-white uppercase hover:bg-neutral-800 transition-colors shadow-2xs cursor-pointer"
              >
                Guardar Ajustes de Marca
              </button>
            </div>

          </form>
        )}

        {/* ================= TAB 5: SEGURIDAD ================= */}
        {activeTab === 'security' && (
          <div className="space-y-4">
            
            {/* Password Change Card */}
            <form onSubmit={handleChangePassword} className="border border-neutral-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 block">
                  CREDENCIALES ATELIER
                </span>
                <h3 className="text-sm font-bold text-neutral-900 uppercase">
                  Cambiar Contraseña Administrativa
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Define una nueva clave para el acceso al panel.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres..."
                    className="mt-1 w-full border border-neutral-300 bg-neutral-50 p-2 text-xs font-mono text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                    Confirmar Contraseña
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repite la clave..."
                    className="mt-1 w-full border border-neutral-300 bg-neutral-50 p-2 text-xs font-mono text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-neutral-950 px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase hover:bg-neutral-800 transition-colors shadow-2xs"
                >
                  Actualizar Contraseña
                </button>
              </div>
            </form>

            {/* Session Info & Reset */}
            <div className="border border-neutral-200 bg-white p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold uppercase text-neutral-900">
                  Copia de Seguridad del Catálogo
                </h4>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Descarga un archivo JSON de respaldo con todos tus productos y configuraciones.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportData}
                className="flex items-center gap-1.5 border border-neutral-300 bg-neutral-50 px-4 py-2 text-xs font-bold text-neutral-800 hover:border-black transition-colors uppercase shrink-0"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Descargar Backup</span>
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Floating Action Button (FAB) on Mobile to quickly add a product or category */}
      {activeTab === 'products' && (
        <button
          onClick={handleCreateProduct}
          className="md:hidden fixed bottom-20 right-4 z-40 flex h-13 w-13 items-center justify-center bg-neutral-950 text-white shadow-2xl active:scale-95 transition-transform"
          aria-label="Añadir nueva prenda"
        >
          <Plus className="h-6 w-6" />
        </button>
      )}

      {activeTab === 'categories' && (
        <button
          onClick={handleOpenNewCategory}
          className="md:hidden fixed bottom-20 right-4 z-40 flex h-13 w-13 items-center justify-center bg-neutral-950 text-white shadow-2xl active:scale-95 transition-transform"
          aria-label="Añadir nueva categoría"
        >
          <Plus className="h-6 w-6" />
        </button>
      )}

      {/* Fixed Bottom App Bar on Mobile (Ergonomic thumb zone navigation with 5 icons) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-neutral-200 bg-white/98 backdrop-blur-md px-1 py-1 flex items-center justify-around select-none">
        {[
          { id: 'products', label: 'Prendas', icon: Package },
          { id: 'categories', label: 'Opciones', icon: Tag },
          { id: 'dtf', label: 'DTF', icon: Layers },
          { id: 'settings', label: 'Ajustes', icon: Sliders },
          { id: 'security', label: 'Seguridad', icon: Shield },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 min-w-[56px] transition-colors ${
                isActive ? 'text-neutral-950' : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              <Icon className={`h-4.5 w-4.5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.6]'}`} />
              <span className={`text-[9.5px] tracking-tight mt-0.5 ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && <span className="h-0.5 w-3.5 bg-neutral-950 rounded-full mt-0.5" />}
            </button>
          );
        })}
      </nav>

      {/* Product Editor Modal / Bottom Sheet */}
      <ProductEditorModal
        product={editingProduct}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveProduct}
        availableCategories={availableCategoriesForEditor}
      />

      {/* Category Editor Modal / Bottom Sheet */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-2xs p-0 sm:p-4">
          <div className="fixed inset-0" onClick={() => setIsCategoryModalOpen(false)} aria-hidden="true" />
          
          <div className="relative z-10 w-full sm:max-w-lg bg-white text-neutral-900 border-t sm:border border-neutral-200 shadow-2xl rounded-t-2xl sm:rounded-none max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Mobile Drag Indicator */}
            <div className="flex sm:hidden justify-center pt-2.5 pb-1">
              <div className="h-1 w-12 rounded-full bg-neutral-300" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-4 sm:px-6 py-3.5 shrink-0 bg-white">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">
                  {editingCategory ? 'EDITAR OPCIÓN / CATEGORÍA' : 'NUEVA OPCIÓN // CATÁLOGO'}
                </span>
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 font-sans">
                  {categoryFormData.label || 'Nueva Opción'}
                </h2>
              </div>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center text-neutral-400 hover:text-black transition-colors rounded-sm hover:bg-neutral-100"
                aria-label="Cerrar modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveCategory} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs font-sans">
              
              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                  Nombre en el Menú (Etiqueta) *
                </label>
                <input
                  type="text"
                  required
                  value={categoryFormData.label}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, label: e.target.value })}
                  placeholder="Ej. HOODIES, T-SHIRTS, HOODIEZ, JERSEYS..."
                  className="mt-1 w-full border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs font-bold text-neutral-900 uppercase focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                />
                <p className="text-[10px] text-neutral-400 mt-1">
                  Este es el texto que se muestra en la barra horizontal y menú hamburguesa.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                  Título de Encabezado en Tienda
                </label>
                <input
                  type="text"
                  value={categoryFormData.title}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, title: e.target.value })}
                  placeholder="Ej. Hoodies, Remeras Streetwear, Buzos..."
                  className="mt-1 w-full border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                  Identificador Único (ID)
                </label>
                <input
                  type="text"
                  disabled={Boolean(editingCategory)}
                  value={categoryFormData.id}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  placeholder="ej. hoodies, tees, jerseys, bandanas"
                  className="mt-1 w-full border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs font-mono text-neutral-900 disabled:opacity-50 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                />
                {editingCategory && (
                  <p className="text-[10px] text-neutral-400 mt-0.5 font-mono">
                    El ID no se puede modificar porque está vinculado a las prendas.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                  Descripción Introductoria (Catálogo)
                </label>
                <textarea
                  rows={2}
                  value={categoryFormData.desc}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, desc: e.target.value })}
                  placeholder="Texto breve que aparece debajo del título al filtrar esta categoría..."
                  className="mt-1 w-full border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                  Detalles Textiles & DTF («Leer más»)
                </label>
                <textarea
                  rows={3}
                  value={categoryFormData.expanded}
                  onChange={(e) => setCategoryFormData({ ...categoryFormData, expanded: e.target.value })}
                  placeholder="Detalles sobre GSM, telas, durabilidad y acabados de esta categoría..."
                  className="mt-1 w-full border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Visibility switch */}
              <div className="flex items-center justify-between border border-neutral-200 p-3 bg-neutral-50">
                <div>
                  <span className="block text-xs font-bold text-neutral-900">Mostrar en el Menú</span>
                  <span className="text-[10px] text-neutral-500">
                    {categoryFormData.enabled ? 'Visible para los clientes' : 'Oculto temporalmente'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCategoryFormData({ ...categoryFormData, enabled: !categoryFormData.enabled })}
                  className={`px-3 py-1 text-[10.5px] font-bold uppercase transition-colors ${
                    categoryFormData.enabled
                      ? 'bg-neutral-950 text-white'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {categoryFormData.enabled ? 'Visible' : 'Oculto'}
                </button>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2.5 border border-neutral-300 text-xs font-semibold text-neutral-700 uppercase hover:bg-neutral-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  {editingCategory ? 'Guardar Cambios' : 'Crear Opción'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

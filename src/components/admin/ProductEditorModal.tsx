import React, { useState } from 'react';
import { X, Check, Plus, Trash2, Image as ImageIcon, Ruler, Sparkles, Layers, DollarSign } from 'lucide-react';
import { Product, ProductColor } from '../../data/products';

interface ProductEditorModalProps {
  product: Product | null; // null if creating new
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  availableCategories?: Array<{ id: string; label: string }>;
}

export const ProductEditorModal: React.FC<ProductEditorModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
  availableCategories,
}) => {
  const [formData, setFormData] = useState<Product>(() => {
    if (product) return { ...product };
    return {
      id: `kln-${Date.now()}`,
      code: `KLN-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      subtitle: '',
      category: 'tees',
      price: 520,
      currency: 'MXN',
      tag: 'NUEVO',
      featured: false,
      images: ['/images/kalon_black_tee_1794005505058.jpg'],
      colors: [
        { name: 'Pitch Black', hex: '#111111' },
        { name: 'Pure White', hex: '#FFFFFF' },
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      dimensions: [
        { size: 'S', chest: '54 cm', length: '70 cm', sleeve: '22 cm' },
        { size: 'M', chest: '57 cm', length: '73 cm', sleeve: '23 cm' },
        { size: 'L', chest: '60 cm', length: '76 cm', sleeve: '24 cm' },
        { size: 'XL', chest: '63 cm', length: '79 cm', sleeve: '25 cm' },
      ],
      description: 'Prenda confeccionada en algodón pesado con estampación textil Direct to Film (DTF) de micropigmentación a 300 DPI.',
      fabric: '100% Algodón Peinado Ring-Spun 240 GSM',
      fit: 'Boxy / Drop-Shoulder Relaxed Fit',
      dtfSpecs: {
        resolution: 'Ultra-HD 300 DPI con tintas textiles al agua',
        finishing: 'Tacto mate sedoso de perfil ultradelgado',
        stretch: 'Poliamida termo-elástica sin fisuras',
        durability: 'Garantía certificada +50 lavados domésticos',
      },
      careInstructions: [
        'Lavar del revés con agua fría (máximo 30°C)',
        'No usar cloro ni blanqueadores agresivos',
        'Secar a la sombra sin retorcer',
        'No planchar directamente sobre el estampado DTF',
      ],
      inStock: true,
    };
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');

  // Sync if product prop changes
  React.useEffect(() => {
    if (product) {
      setFormData({ ...product });
    } else {
      setFormData({
        id: `kln-${Date.now()}`,
        code: `KLN-${Math.floor(100 + Math.random() * 900)}`,
        name: '',
        subtitle: '',
        category: 'tees',
        price: 520,
        currency: 'MXN',
        tag: 'NUEVO',
        featured: false,
        images: ['/images/kalon_black_tee_1794005505058.jpg'],
        colors: [
          { name: 'Pitch Black', hex: '#111111' },
          { name: 'Pure White', hex: '#FFFFFF' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        dimensions: [
          { size: 'S', chest: '54 cm', length: '70 cm', sleeve: '22 cm' },
          { size: 'M', chest: '57 cm', length: '73 cm', sleeve: '23 cm' },
          { size: 'L', chest: '60 cm', length: '76 cm', sleeve: '24 cm' },
          { size: 'XL', chest: '63 cm', length: '79 cm', sleeve: '25 cm' },
        ],
        description: 'Prenda confeccionada en algodón pesado con estampación textil Direct to Film (DTF) a 300 DPI.',
        fabric: '100% Algodón Peinado Ring-Spun 240 GSM',
        fit: 'Boxy / Drop-Shoulder Relaxed Fit',
        dtfSpecs: {
          resolution: 'Ultra-HD 300 DPI con tintas textiles al agua',
          finishing: 'Tacto mate sedoso de perfil ultradelgado',
          stretch: 'Poliamida termo-elástica sin fisuras',
          durability: 'Garantía certificada +50 lavados domésticos',
        },
        careInstructions: [
          'Lavar del revés con agua fría (máximo 30°C)',
          'No usar cloro ni blanqueadores agresivos',
          'Secar a la sombra sin retorcer',
          'No planchar directamente sobre el estampado DTF',
        ],
        inStock: true,
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, newImageUrl.trim()],
      });
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleAddColor = () => {
    if (newColorName.trim()) {
      setFormData({
        ...formData,
        colors: [...formData.colors, { name: newColorName.trim(), hex: newColorHex }],
      });
      setNewColorName('');
      setNewColorHex('#000000');
    }
  };

  const handleRemoveColor = (name: string) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((c) => c.name !== name),
    });
  };

  const toggleSize = (size: string) => {
    if (formData.sizes.includes(size)) {
      setFormData({
        ...formData,
        sizes: formData.sizes.filter((s) => s !== size),
      });
    } else {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, size],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-2xs p-0 sm:p-4">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Bottom Sheet on Mobile / Modal on Tablet & Desktop */}
      <div className="relative z-10 w-full sm:max-w-2xl bg-white text-neutral-900 border-t sm:border border-neutral-200 shadow-2xl rounded-t-2xl sm:rounded-none max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden">
        
        {/* Mobile Drag Indicator */}
        <div className="flex sm:hidden justify-center pt-2.5 pb-1">
          <div className="h-1 w-12 rounded-full bg-neutral-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-4 sm:px-6 py-3.5 shrink-0 bg-white">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase block">
              {product ? 'MODIFICAR PRENDA' : 'NUEVA PRENDA // ATELIER'}
            </span>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 font-sans truncate max-w-xs sm:max-w-md">
              {formData.name || 'Nueva Prenda'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center text-neutral-400 hover:text-black transition-colors rounded-sm hover:bg-neutral-100"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form id="product-editor-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 text-xs font-sans">
          
          {/* 1. Datos Principales */}
          <div className="space-y-3">
            <span className="text-[10.5px] font-bold tracking-wider text-neutral-400 uppercase block">
              1. Identidad de la Prenda
            </span>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                Nombre de la Prenda *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Kalon Pink Logo Black Heavyweight Tee"
                className="mt-1 w-full border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                  Código Referencia
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="KLN-T01"
                  className="mt-1 w-full border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs font-mono text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                  Precio (MXN) *
                </label>
                <div className="relative mt-1">
                  <span className="absolute top-1/2 left-2.5 -translate-y-1/2 text-neutral-400 font-bold">$</span>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full border border-neutral-300 bg-neutral-50 py-2 pr-3 pl-6 text-xs font-bold text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Categoría Selector Táctil */}
            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 uppercase mb-1.5">
                Categoría
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {(availableCategories && availableCategories.length > 0 ? availableCategories : [
                  { id: 'tees', label: 'T-Shirts' },
                  { id: 'hoodies', label: 'Hoodies' },
                  { id: 'jerseys', label: 'Jerseys' },
                  { id: 'crewnecks', label: 'Crewnecks' },
                ]).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.id as any })}
                    className={`py-2 px-1 text-[11px] font-semibold uppercase text-center transition-colors border ${
                      formData.category === cat.id
                        ? 'border-neutral-950 bg-neutral-950 text-white'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                Subtítulo Comercial
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Ej. Heavyweight Cotton 240 GSM & Bold Pink DTF"
                className="mt-1 w-full border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* 2. Estado de Inventario y Etiquetas */}
          <div className="space-y-3">
            <span className="text-[10.5px] font-bold tracking-wider text-neutral-400 uppercase block">
              2. Inventario y Visibilidad
            </span>

            <div className="grid grid-cols-2 gap-3">
              {/* Quick Stock Toggle */}
              <div className="flex items-center justify-between border border-neutral-200 p-3 bg-neutral-50">
                <div>
                  <span className="block text-xs font-bold text-neutral-900">Disponibilidad</span>
                  <span className="text-[10px] text-neutral-500 font-medium">
                    {formData.inStock ? 'Visible y ordenable' : 'Marcado como agotado'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, inStock: !formData.inStock })}
                  className={`px-3 py-1 text-[10.5px] font-bold uppercase transition-colors ${
                    formData.inStock
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-300 text-neutral-700'
                  }`}
                >
                  {formData.inStock ? 'En Stock' : 'Agotado'}
                </button>
              </div>

              {/* Featured toggle */}
              <div className="flex items-center justify-between border border-neutral-200 p-3 bg-neutral-50">
                <div>
                  <span className="block text-xs font-bold text-neutral-900">Destacado</span>
                  <span className="text-[10px] text-neutral-500 font-medium">
                    {formData.featured ? 'Aparece en portada' : 'Catálogo regular'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, featured: !formData.featured })}
                  className={`px-3 py-1 text-[10.5px] font-bold uppercase transition-colors ${
                    formData.featured
                      ? 'bg-neutral-950 text-white'
                      : 'bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {formData.featured ? 'Sí' : 'No'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                Etiqueta / Badge
              </label>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {['NUEVO', 'POPULAR', 'HEAVYWEIGHT', 'EDICIÓN LIMITADA', 'OVERSIZED'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setFormData({ ...formData, tag: formData.tag === tag ? '' : tag })}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors border ${
                      formData.tag === tag
                        ? 'border-neutral-950 bg-neutral-950 text-white'
                        : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* 3. Tallas Disponibles */}
          <div>
            <span className="text-[10.5px] font-bold tracking-wider text-neutral-400 uppercase block mb-1.5">
              3. Tallas Disponibles (Toca para activar/desactivar)
            </span>
            <div className="flex items-center gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                const isSelected = formData.sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`h-9 w-11 flex items-center justify-center font-bold text-xs uppercase transition-all border ${
                      isSelected
                        ? 'border-neutral-950 bg-neutral-950 text-white shadow-2xs'
                        : 'border-neutral-200 bg-white text-neutral-400 hover:text-black hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* 4. Imágenes de la prenda */}
          <div className="space-y-2">
            <span className="text-[10.5px] font-bold tracking-wider text-neutral-400 uppercase block">
              4. Galería Fotográfica
            </span>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative h-20 w-16 shrink-0 border border-neutral-200 bg-neutral-100 overflow-hidden group">
                  <img src={img} alt={`Vista ${idx + 1}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 h-5 w-5 bg-neutral-950/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    aria-label="Eliminar foto"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Input añadir imagen */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Ruta o URL de foto (/images/prenda.jpg)..."
                className="flex-1 border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddImage}
                disabled={!newImageUrl.trim()}
                className="px-3 py-1.5 bg-neutral-950 text-white text-xs font-bold uppercase disabled:opacity-30 transition-colors"
              >
                Añadir
              </button>
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* 5. Variantes de Color */}
          <div className="space-y-2">
            <span className="text-[10.5px] font-bold tracking-wider text-neutral-400 uppercase block">
              5. Variantes de Color
            </span>

            <div className="flex flex-wrap gap-2">
              {formData.colors.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2 border border-neutral-200 bg-white px-2.5 py-1"
                >
                  <span
                    className="h-3.5 w-3.5 border border-neutral-300 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs font-medium text-neutral-800">{c.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(c.name)}
                    className="text-neutral-400 hover:text-red-600 ml-1"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Input añadir color */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                className="h-8 w-9 border border-neutral-300 cursor-pointer p-0.5 bg-white"
              />
              <input
                type="text"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="Nombre (ej. Washed Charcoal)"
                className="flex-1 border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddColor}
                disabled={!newColorName.trim()}
                className="px-3 py-1.5 bg-neutral-950 text-white text-xs font-bold uppercase disabled:opacity-30 transition-colors"
              >
                + Color
              </button>
            </div>
          </div>

          <hr className="border-neutral-100" />

          {/* 6. Especificación Técnica & DTF */}
          <div className="space-y-3">
            <span className="text-[10.5px] font-bold tracking-wider text-neutral-400 uppercase block">
              6. Especificación Textil y DTF
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                  Composición Textil
                </label>
                <input
                  type="text"
                  value={formData.fabric}
                  onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                  placeholder="100% Algodón Peinado 240 GSM"
                  className="mt-1 w-full border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                  Corte / Silueta
                </label>
                <input
                  type="text"
                  value={formData.fit}
                  onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                  placeholder="Boxy / Drop-Shoulder Relaxed Fit"
                  className="mt-1 w-full border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-neutral-700 uppercase">
                Descripción Editorial
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detalle editorial de confección y estampado..."
                className="mt-1 w-full border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 focus:border-neutral-950 focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

        </form>

        {/* Fixed Action Footer at bottom */}
        <div className="border-t border-neutral-200 bg-white p-3 sm:p-4 shrink-0 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 border border-neutral-300 text-xs font-semibold text-neutral-700 uppercase hover:bg-neutral-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="product-editor-form"
            className="px-6 py-2.5 bg-neutral-950 text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer shadow-xs"
          >
            {product ? 'Guardar Cambios' : 'Crear Prenda'}
          </button>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { X, MessageCircle, Sparkles, Check, Layers } from 'lucide-react';
import { DtfDesign } from '../data/dtfDesigns';

interface DtfDetailModalProps {
  design: DtfDesign | null;
  onClose: () => void;
  whatsAppNumber: string;
}

export const DtfDetailModal: React.FC<DtfDetailModalProps> = ({
  design,
  onClose,
  whatsAppNumber,
}) => {
  if (!design) return null;

  const cleanPhone = whatsAppNumber.replace(/[^\d]/g, '');

  const handleInquireDesign = () => {
    const text = encodeURIComponent(
      `Hola KALON! 👋\n` +
      `Me interesa consultar sobre este DISEÑO DE EJEMPLO para mi evento:\n\n` +
      `• Temática: ${design.themeLabel}\n` +
      `• Modelo/Nombre: ${design.title}\n` +
      `• Código: ${design.code}\n` +
      `• Formato sugerido: ${design.dimensions}\n\n` +
      `¿Cómo coordinamos la personalización con nuestros datos y cotización? ¡Gracias!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const handleInquireCustomMeters = () => {
    const text = encodeURIComponent(
      `Hola KALON! Me gustaría cotizar impresión DTF por metro lineal de mis propios diseños.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-xl flex-col bg-white border border-neutral-900 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-3.5 bg-white">
          <div className="flex items-center gap-2">
            <span className="bg-neutral-950 text-white text-[9.5px] font-sans font-bold px-2 py-0.5 uppercase tracking-wider">
              TRANSFER DTF
            </span>
            <span className="text-[10px] font-sans font-semibold text-neutral-500 uppercase tracking-wider">
              {design.code}
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center border border-neutral-200 text-neutral-600 hover:border-neutral-950 hover:text-black transition-colors"
            aria-label="Cerrar detalle"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* Visual Graphic Representation Box */}
          <div
            className="relative aspect-16/10 w-full overflow-hidden border border-neutral-900 flex flex-col items-center justify-center p-6 text-center shadow-inner"
            style={{ backgroundColor: design.graphicStyle.bgColor }}
          >
            <div className="absolute top-2.5 left-3 font-sans font-semibold text-[9px] tracking-wider text-neutral-400 uppercase">
              {design.code}
            </div>

            <div className="absolute top-2.5 right-3 font-sans font-semibold text-[9px] tracking-wider text-neutral-400 uppercase">
              300 DPI · ULTRA-HD
            </div>

            <div className="my-auto py-2">
              <span className="font-sans font-bold text-[10px] tracking-[0.25em] text-neutral-400 block mb-1 uppercase">
                {design.graphicStyle.motif}
              </span>
              <h3
                className="font-sans text-2xl sm:text-3xl font-black tracking-wide uppercase leading-none drop-shadow-sm"
                style={{ color: design.graphicStyle.textColor }}
              >
                {design.graphicStyle.mainText}
              </h3>
              <p className="mt-2 text-[9.5px] font-sans font-semibold tracking-[0.2em] text-neutral-300 uppercase">
                {design.graphicStyle.subText}
              </p>
            </div>

            <div className="absolute bottom-2 inset-x-3 flex items-center justify-between text-[8px] font-sans font-semibold tracking-wider text-neutral-400 border-t border-neutral-800/80 pt-1 uppercase">
              <span>DTF FILM TRANSFER</span>
              <span>CMYK + WHITE DUAL LAYER</span>
            </div>
          </div>

          {/* Title & Theme (No prices - catalog showcase) */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-neutral-950 uppercase tracking-tight">
                {design.title}
              </h2>
              <span className="shrink-0 font-sans text-xs font-bold text-neutral-950 bg-neutral-100 px-2.5 py-1 uppercase tracking-wide">
                {design.themeLabel}
              </span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              {design.description}
            </p>
          </div>

          {/* Technical Specs Grid */}
          <div className="border border-neutral-200 bg-neutral-50 p-4 space-y-2.5 text-xs font-sans">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200/60">
              <span className="text-neutral-500 uppercase text-[10.5px] font-semibold tracking-wider">Dimensiones de Estampado:</span>
              <span className="font-bold text-neutral-900">{design.dimensions}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-neutral-200/60">
              <span className="text-neutral-500 uppercase text-[10.5px] font-semibold tracking-wider">Prenda / Silueta Ideal:</span>
              <span className="font-bold text-neutral-900">{design.idealFor}</span>
            </div>

            <div className="flex items-start justify-between gap-4">
              <span className="text-neutral-500 uppercase text-[10.5px] font-semibold tracking-wider shrink-0">Especificaciones:</span>
              <span className="text-neutral-800 text-right font-sans text-xs">{design.specs}</span>
            </div>
          </div>

          {/* Aclaratoria */}
          <div className="bg-neutral-100 p-3 text-[11px] text-neutral-700 leading-snug">
            <strong>Nota de confección:</strong> Puedes ordenar este estampado para aplicarlo sobre cualquiera de nuestras prendas (T-Shirt, Hoodie, Jersey) o comprar el pliego de transfer DTF individual para plancharlo tú mismo.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-neutral-200 p-4 bg-white flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleInquireDesign}
            className="flex-1 flex items-center justify-center gap-2 bg-neutral-950 py-3 px-4 text-xs font-bold tracking-widest text-white uppercase hover:bg-neutral-800 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Pedir Este Estampado por WhatsApp</span>
          </button>

          <button
            onClick={handleInquireCustomMeters}
            className="flex items-center justify-center gap-1.5 border border-neutral-300 py-3 px-4 text-xs font-semibold tracking-wider text-neutral-800 uppercase hover:border-neutral-950 transition-colors"
          >
            <span>Cotizar por Metro</span>
          </button>
        </div>

      </div>
    </div>
  );
};

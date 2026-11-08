import React, { useState } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { DtfDesign } from '../data/dtfDesigns';

interface DtfCardProps {
  design: DtfDesign;
  onOpenDetails: (design: DtfDesign) => void;
  whatsAppNumber: string;
}

export const DtfCard: React.FC<DtfCardProps> = ({
  design,
  onOpenDetails,
  whatsAppNumber,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      onClick={() => onOpenDetails(design)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col cursor-pointer transition-transform duration-200"
    >
      {/* 1:1 Aspect Ratio Graphic Canvas (Matches Caracas Merch Grid Box) */}
      <div
        className="relative aspect-square w-full overflow-hidden border border-neutral-800 flex flex-col items-center justify-center p-4 sm:p-5 select-none transition-all duration-300 group-hover:border-neutral-950"
        style={{ backgroundColor: design.graphicStyle.bgColor }}
      >
        {/* Top Header inside Canvas */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5">
          <span className="font-sans text-[8.5px] sm:text-[9px] font-semibold tracking-wider text-neutral-400 uppercase">
            {design.code}
          </span>
          <span
            className="text-[7.5px] sm:text-[8px] font-sans font-bold px-1.5 py-0.5 tracking-wider uppercase text-white"
            style={{ backgroundColor: design.graphicStyle.accentColor }}
          >
            {design.graphicStyle.tagText}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 font-sans font-semibold text-[8px] sm:text-[9px] tracking-wider text-neutral-400 uppercase">
          300 DPI
        </div>

        {/* Central Graphic Typography Motif */}
        <div className="my-auto text-center px-2 py-3 transition-transform duration-300 group-hover:scale-105">
          <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-neutral-400 block mb-1 uppercase">
            {design.graphicStyle.motif}
          </span>
          <h3
            className="font-sans text-lg sm:text-2xl font-black tracking-wide uppercase leading-tight drop-shadow-xs"
            style={{ color: design.graphicStyle.textColor }}
          >
            {design.graphicStyle.mainText}
          </h3>
          <p className="mt-1.5 text-[8.5px] sm:text-[9px] font-sans font-semibold tracking-[0.16em] text-neutral-300 uppercase">
            {design.graphicStyle.subText}
          </p>
        </div>

        {/* Film Substrate Bottom Hairline */}
        <div className="absolute bottom-2 inset-x-2.5 sm:inset-x-3 flex items-center justify-between text-[7.5px] sm:text-[8px] font-sans font-semibold tracking-wider text-neutral-400 border-t border-neutral-800/80 pt-1 uppercase">
          <span>DTF TRANSFER</span>
          <span className="truncate max-w-[120px]">{design.dimensions.split('·')[0]}</span>
        </div>
      </div>

      {/* Centered Minimalist Typography below box (No prices - design showcase only) */}
      <div className="mt-3 flex flex-col items-center text-center px-1">
        <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-neutral-400 mb-0.5">
          {design.themeLabel} · {design.dimensions.split('·')[0]}
        </span>
        
        <h4 className="font-sans text-xs sm:text-[13px] font-semibold text-neutral-900 group-hover:opacity-75 transition-opacity line-clamp-2 leading-snug">
          {design.title}
        </h4>

        <span className="mt-1.5 inline-block text-[9.5px] font-sans font-bold uppercase tracking-wider text-neutral-700 border border-neutral-200 px-2 py-0.5 bg-neutral-50">
          Diseño para Eventos
        </span>
      </div>
    </article>
  );
};

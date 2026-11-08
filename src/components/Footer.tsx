import React, { useState } from 'react';
import { ChevronDown, Instagram } from 'lucide-react';

interface FooterProps {
  whatsAppNumber?: string;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ whatsAppNumber = '+52 55 8124 9301', onOpenAdmin }) => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<string>('ESPAÑOL');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const cleanPhone = whatsAppNumber.replace(/[^\d]/g, '');

  return (
    <footer className="w-full bg-black text-white pt-10 sm:pt-14 pb-12 transition-colors select-none">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        {/* 1. Accordion Navigation (Exact Caracas Merch Mobile Hierarchy) */}
        <div className="border-t border-neutral-800">
          
          {/* BRAND Accordion */}
          <div className="border-b border-neutral-800">
            <button
              onClick={() => toggleSection('brand')}
              className="w-full py-4.5 flex items-center justify-between text-left text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase text-white hover:text-neutral-300 transition-colors"
            >
              <span>BRAND</span>
              <ChevronDown
                className={`h-4 w-4 text-neutral-400 transition-transform duration-300 ${
                  openSection === 'brand' ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>
            {openSection === 'brand' && (
              <div className="pb-4 pt-1 space-y-2 text-xs text-neutral-400 font-sans tracking-wide">
                <p>KALON es un atelier de streetwear contemporáneo enfocado en siluetas boxy y cortes oversized de 240 a 420 GSM.</p>
                <p>Nuestras piezas integran tecnología DTF industrial a 300 DPI garantizadas contra decoloración y cuarteado.</p>
              </div>
            )}
          </div>

          {/* SUPPORT Accordion */}
          <div className="border-b border-neutral-800">
            <button
              onClick={() => toggleSection('support')}
              className="w-full py-4.5 flex items-center justify-between text-left text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase text-white hover:text-neutral-300 transition-colors"
            >
              <span>SUPPORT</span>
              <ChevronDown
                className={`h-4 w-4 text-neutral-400 transition-transform duration-300 ${
                  openSection === 'support' ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>
            {openSection === 'support' && (
              <div className="pb-4 pt-1 space-y-2.5 text-xs text-neutral-400 font-sans">
                <a
                  href={`https://wa.me/${cleanPhone}?text=Hola%20KALON!%20Necesito%20soporte%20con%20mi%20pedido.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white font-medium hover:underline"
                >
                  • Chat directo WhatsApp (+52 55 8124 9301)
                </a>
                <p>• Envíos express asegurados a todo el territorio nacional (2 a 5 días hábiles).</p>
                <p>• Guía de tallas y medidas exactas disponible en la ficha de cada prenda.</p>
              </div>
            )}
          </div>

          {/* WORK WITH US Accordion */}
          <div className="border-b border-neutral-800">
            <button
              onClick={() => toggleSection('work')}
              className="w-full py-4.5 flex items-center justify-between text-left text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase text-white hover:text-neutral-300 transition-colors"
            >
              <span>WORK WITH US</span>
              <ChevronDown
                className={`h-4 w-4 text-neutral-400 transition-transform duration-300 ${
                  openSection === 'work' ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>
            {openSection === 'work' && (
              <div className="pb-4 pt-1 space-y-2 text-xs text-neutral-400 font-sans">
                <p>• Pedidos mayoristas y producciones B2B de merchandising personalizado.</p>
                <p>• Programa de creadores y embajadores de marca KALON.</p>
                <a
                  href={`https://wa.me/${cleanPhone}?text=Hola%20KALON!%20Me%20interesa%20colaborar%20con%20la%20marca.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white font-semibold underline mt-1"
                >
                  Contactar al equipo de Atelier →
                </a>
              </div>
            )}
          </div>

          {/* LEGAL Accordion */}
          <div className="border-b border-neutral-800">
            <button
              onClick={() => toggleSection('legal')}
              className="w-full py-4.5 flex items-center justify-between text-left text-xs sm:text-[13px] font-bold tracking-[0.16em] uppercase text-white hover:text-neutral-300 transition-colors"
            >
              <span>LEGAL</span>
              <ChevronDown
                className={`h-4 w-4 text-neutral-400 transition-transform duration-300 ${
                  openSection === 'legal' ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>
            {openSection === 'legal' && (
              <div className="pb-4 pt-1 space-y-2 text-xs text-neutral-400 font-sans">
                <p>• Términos y condiciones de compraventa y coordinación por WhatsApp.</p>
                <p>• Política de privacidad y tratamiento de datos personales encriptados.</p>
                <p>• Garantía de satisfacción textil e inspección previa al despacho.</p>
              </div>
            )}
          </div>

        </div>

        {/* 2. Brand Wordmark & Customer Support (Exact Caracas Merch Center Stack) */}
        <div className="pt-12 sm:pt-16 pb-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            KALON®
          </h2>
          
          <p className="mt-4 text-xs sm:text-sm text-neutral-300 font-sans">
            <span className="font-bold text-white">Customer Support</span>{' '}
            <a
              href="mailto:info@kalonstreetwear.com"
              className="text-neutral-300 underline hover:text-white transition-colors"
            >
              info@kalonstreetwear.com
            </a>
          </p>

          {/* Social Icons (Instagram & TikTok) */}
          <div className="mt-6 flex items-center justify-center gap-6 text-white">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 transition-transform hover:scale-110 active:scale-95"
            >
              <Instagram className="h-5 w-5 stroke-[1.8]" />
            </a>

            {/* Custom TikTok Outline Icon */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="p-2 transition-transform hover:scale-110 active:scale-95"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.27 1.76-.23.99-.04 2.09.6 2.89.65.86 1.77 1.34 2.85 1.25.96-.05 1.87-.54 2.37-1.34.33-.51.49-1.12.51-1.73.07-3.69.03-7.39.04-11.08z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 3. Language Selector Row */}
        <div className="pt-4 pb-6 text-center">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-neutral-400">
            {['ESPAÑOL', 'ENGLISH', 'DEUTSCH', '日本語'].map((lang, idx, arr) => (
              <React.Fragment key={lang}>
                <button
                  onClick={() => setCurrentLang(lang)}
                  className={`transition-colors ${
                    currentLang === lang ? 'text-white font-bold' : 'hover:text-white'
                  }`}
                >
                  {lang}
                </button>
                {idx < arr.length - 1 && <span className="text-neutral-700">/</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 4. Payment Badges (Exact Caracas Merch Badges Matrix) */}
        <div className="py-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {/* Amazon */}
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-xs bg-white text-black font-bold text-[9px] tracking-tight">
            amazon
          </span>

          {/* Amex */}
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-xs bg-[#006fcf] text-white font-bold text-[9px] tracking-tight">
            AMEX
          </span>

          {/* Apple Pay */}
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-xs bg-white text-black font-semibold text-[9px]">
            Pay
          </span>

          {/* Bizum */}
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-xs bg-[#00a499] text-white font-bold text-[9px]">
            bizum
          </span>

          {/* Diners */}
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-xs bg-[#004a97] text-white font-bold text-[9px]">
            DINERS
          </span>

          {/* Discover */}
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-xs bg-[#ff6000] text-white font-bold text-[9px]">
            DISCOVER
          </span>

          {/* Google Pay */}
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-xs bg-white text-black font-semibold text-[9px]">
            GPay
          </span>

          {/* Mastercard */}
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-xs bg-[#222222] text-white font-bold text-[9px] flex items-center gap-0.5">
            <span className="h-2 w-2 rounded-full bg-[#eb001b] inline-block -mr-1"></span>
            <span className="h-2 w-2 rounded-full bg-[#f79e1b] inline-block"></span>
          </span>

          {/* PayPal */}
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-xs bg-[#003087] text-white font-bold text-[9px] italic">
            PayPal
          </span>

          {/* Redsys / Direct */}
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-xs bg-[#e21a22] text-white font-bold text-[9px]">
            Redsys
          </span>

          {/* Shop Pay */}
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-xs bg-[#5a31f4] text-white font-bold text-[9px]">
            shop
          </span>

          {/* Visa */}
          <span className="inline-flex items-center justify-center h-6 px-2 rounded-xs bg-[#1a1f71] text-white font-black text-[9px] tracking-wider italic">
            VISA
          </span>
        </div>

        {/* 5. Company Address & Copyright Footer */}
        <div className="pt-8 text-center text-[10px] sm:text-[11px] text-neutral-500 font-sans space-y-1">
          <p className="font-medium text-neutral-400">KALON Streetwear LLC</p>
          <p>6966 NW 116th Ct</p>
          <p>Doral, FL 33178, United States</p>
          <p className="pt-2 text-neutral-400 font-semibold tracking-wider uppercase">
            © {new Date().getFullYear()}, KALON®
          </p>
          <p className="pt-2">
            <a
              href="#/admin"
              onClick={(e) => {
                if (onOpenAdmin) {
                  e.preventDefault();
                  onOpenAdmin();
                }
              }}
              className="text-neutral-600 hover:text-neutral-400"
            >
              admin
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

import React from 'react';
import { MessageCircle, ShieldCheck, Sparkles, Layers, ArrowRight, Award } from 'lucide-react';
import { KalonLogo } from './KalonLogo';

interface AboutPageProps {
  whatsAppNumber: string;
  onExploreCatalog: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  whatsAppNumber,
  onExploreCatalog,
}) => {
  const cleanPhone = whatsAppNumber.replace(/[^\d]/g, '');

  return (
    <div className="pb-16 pt-6 sm:pt-10">
      {/* Editorial Header */}
      <div className="mx-auto max-w-3xl text-center px-4">
        <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-neutral-400 uppercase">
          MANIFIESTO & TECNOLOGÍA TEXTIL
        </span>
        <h1 className="mt-3 font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase">
          SOBRE KALON
        </h1>
        <p className="mt-4 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans font-normal max-w-xl mx-auto">
          Streetwear contemporáneo nacido de la devoción por el detalle textil, siluetas sobredimensionadas con caída arquitectónica y micropigmentación DTF de ultra-alta definición.
        </p>
      </div>

      {/* Hero Quote / Atelier Statement */}
      <div className="mx-auto mt-10 max-w-4xl px-4">
        <div className="border border-neutral-200 bg-neutral-50/50 p-6 sm:p-10 text-center">
          <p className="font-editorial text-lg sm:text-2xl text-neutral-900 leading-relaxed italic">
            &ldquo;KALON nace para quienes no buscan ropa pasajera, sino piezas con peso real, cortes pensados y gráficos indelebles creados para durar.&rdquo;
          </p>
          <span className="mt-4 block font-sans text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
            ATELIER KALON · STREETWEAR 2026
          </span>
        </div>
      </div>

      {/* 3 Core Pillars Grid */}
      <div className="mx-auto mt-12 max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1 */}
          <div className="border border-neutral-200 p-6 flex flex-col justify-between hover:border-neutral-400 transition-colors bg-white">
            <div>
              <div className="flex h-10 w-10 items-center justify-center bg-neutral-100 text-neutral-900">
                <Layers className="h-5 w-5" />
              </div>
              <span className="mt-4 block font-sans text-[10px] font-bold text-neutral-400 tracking-wider">
                01 // CONFECCIÓN
              </span>
              <h2 className="mt-1 text-base font-bold text-neutral-950 uppercase font-sans tracking-tight">
                Textiles Heavyweight
              </h2>
              <p className="mt-2.5 text-xs text-neutral-600 leading-relaxed font-sans">
                Tejidos de 240 a 420 GSM confeccionados con 100% algodón ring-spun preencogido. Cuellos acanalados indeformables de 3 cm y hombros caídos con caída estructurada boxy-fit.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-neutral-100 text-[10px] font-bold tracking-widest text-neutral-400 font-sans uppercase">
              240 — 420 GSM RING-SPUN
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="border border-neutral-200 p-6 flex flex-col justify-between hover:border-neutral-400 transition-colors bg-white">
            <div>
              <div className="flex h-10 w-10 items-center justify-center bg-neutral-100 text-neutral-900">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="mt-4 block font-sans text-[10px] font-bold text-neutral-400 tracking-wider">
                02 // ESTAMPADO
              </span>
              <h2 className="mt-1 text-base font-bold text-neutral-950 uppercase font-sans tracking-tight">
                DTF Ultra-HD 300 DPI
              </h2>
              <p className="mt-2.5 text-xs text-neutral-600 leading-relaxed font-sans">
                Micropigmentación con tintas al agua ecológicas y poliamida japonesa de termofijación elástica. Colores vivos, negros intensos y tacto suave garantizados por más de 50 lavados.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-neutral-100 text-[10px] font-bold tracking-widest text-neutral-400 font-sans uppercase">
              TACTO SUAVE · SIN CUARTEO
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="border border-neutral-200 p-6 flex flex-col justify-between hover:border-neutral-400 transition-colors bg-white">
            <div>
              <div className="flex h-10 w-10 items-center justify-center bg-neutral-100 text-neutral-900">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="mt-4 block font-sans text-[10px] font-bold text-neutral-400 tracking-wider">
                03 // FILOSOFÍA
              </span>
              <h2 className="mt-1 text-base font-bold text-neutral-950 uppercase font-sans tracking-tight">
                Drops & Producción Ética
              </h2>
              <p className="mt-2.5 text-xs text-neutral-600 leading-relaxed font-sans">
                Producción en lotes controlados para evitar el desperdicio textil. Cada prenda es inspeccionada y empaquetada individualmente con estándares de atelier.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-neutral-100 text-[10px] font-bold tracking-widest text-neutral-400 font-sans uppercase">
              CONTROL DE CALIDAD 1 A 1
            </div>
          </div>

        </div>
      </div>

      {/* Production & Lab Specs Detail Section */}
      <div className="mx-auto mt-12 max-w-5xl px-4">
        <div className="border border-neutral-200 bg-white p-6 sm:p-10">
          <div className="max-w-2xl">
            <span className="font-sans text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
              ESTÁNDARES DE FABRICACIÓN
            </span>
            <h2 className="mt-1 font-sans text-xl sm:text-2xl font-bold text-neutral-950 uppercase">
              Por qué nuestras prendas se sienten diferentes
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              No utilizamos prendas promocionales ligeras. Cada patrón de KALON está desarrollado a medida para lograr esa silueta pesada, relajada y con presencia que define el streetwear de lujo contemporáneo.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-neutral-100 pt-6">
            <div>
              <span className="block font-editorial text-2xl font-bold text-neutral-950">100%</span>
              <span className="mt-1 block text-[11px] font-medium text-neutral-500 font-sans">Algodón peinado pesado</span>
            </div>
            <div>
              <span className="block font-editorial text-2xl font-bold text-neutral-950">300 DPI</span>
              <span className="mt-1 block text-[11px] font-medium text-neutral-500 font-sans">Resolución fotográfica DTF</span>
            </div>
            <div>
              <span className="block font-editorial text-2xl font-bold text-neutral-950">+50</span>
              <span className="mt-1 block text-[11px] font-medium text-neutral-500 font-sans">Ciclos de lavado garantizados</span>
            </div>
            <div>
              <span className="block font-editorial text-2xl font-bold text-neutral-950">0%</span>
              <span className="mt-1 block text-[11px] font-medium text-neutral-500 font-sans">Solventes tóxicos o PVC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Contact & WhatsApp Concierge Banner */}
      <div className="mx-auto mt-12 max-w-5xl px-4">
        <div className="border border-neutral-950 bg-neutral-950 p-6 sm:p-10 text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center border border-neutral-800 bg-neutral-900 p-2">
                <KalonLogo className="h-full w-full text-white" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                  ATELIER KALON · SERVICIO PERSONALIZADO
                </span>
                <h3 className="mt-1 font-sans text-lg sm:text-xl font-bold text-white uppercase">
                  ¿Tienes dudas sobre tallas, pedidos o prendas especiales?
                </h3>
                <p className="mt-1 text-xs text-neutral-400 font-sans">
                  Atendemos consultas y pedidos directamente a través de WhatsApp con respuesta inmediata.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
              <a
                href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hola KALON! Me gustaría hacer una consulta sobre la marca y sus prendas.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-xs font-bold tracking-wider text-neutral-950 uppercase hover:bg-neutral-100 transition-colors font-sans"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Hablar por WhatsApp</span>
              </a>

              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2 border border-neutral-700 bg-transparent px-6 py-3 text-xs font-bold tracking-wider text-white uppercase hover:border-white transition-colors font-sans"
              >
                <span>Ver Catálogo</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

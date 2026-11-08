import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { KalonLogo } from '../KalonLogo';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToStore,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const savedPassword = localStorage.getItem('kalon_admin_pass') || 'kalon2025';

    setTimeout(() => {
      if (password.trim() === savedPassword) {
        localStorage.setItem('kalon_admin_session', 'authenticated');
        onLoginSuccess();
      } else {
        setError('Contraseña incorrecta. Intenta nuevamente.');
      }
      setIsLoading(false);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col justify-between p-4 sm:p-8 font-sans antialiased">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 sm:px-6">
        <button
          onClick={onBackToStore}
          className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-neutral-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a la Tienda</span>
        </button>

        <span className="text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase">
          PANEL ADMINISTRATIVO
        </span>
      </header>

      {/* Center Auth Card */}
      <main className="mx-auto w-full max-w-sm my-auto py-8 px-4">
        <div className="bg-white border border-neutral-200 p-6 sm:p-8 shadow-xs">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-neutral-200 bg-neutral-50 p-2 mb-4">
              <KalonLogo className="h-full w-full text-black" />
            </div>

            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block">
              KALON ATELIER // PRIVADO
            </span>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-neutral-950 uppercase font-sans">
              Panel de Control
            </h1>
            <p className="mt-1.5 text-xs text-neutral-500 font-sans">
              Acceso a gestión de catálogo, precios y pedidos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-neutral-700">
                Contraseña Maestra
              </label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa clave..."
                  className="w-full border border-neutral-300 bg-white py-2.5 pr-10 pl-3 text-xs font-mono tracking-wider text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {error ? (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              ) : (
                <p className="mt-2 text-[10.5px] text-neutral-400 font-mono">
                  Clave inicial: <span className="font-bold text-neutral-700">kalon2025</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-neutral-950 py-3 text-xs font-bold tracking-widest text-white uppercase hover:bg-neutral-800 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isLoading ? 'Comprobando...' : 'Entrar al Panel'}
            </button>
          </form>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="text-center py-4 text-[10px] font-mono tracking-wider text-neutral-400 uppercase">
        KALON ATELIER · ENTORNO DE GESTIÓN MÓVIL
      </footer>
    </div>
  );
};

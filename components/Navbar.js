import Link from 'next/link';
import { useState, useEffect } from 'react';
import { STORE_CONFIG } from '../lib/config';
import { useLanguage } from '../pages/_app';

export default function Navbar({ cartCount, onOpenCart, searchQuery, onSearchChange }) {
  const { lang, setLang, t } = useLanguage();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('talabatkom_theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setIsDark(theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? 'dark' : 'light';
    setIsDark(!isDark);
    localStorage.setItem('talabatkom_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors notranslate" translate="no">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* Desktop & Mobile Main Row */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-white border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
              <img
                src="https://lh3.googleusercontent.com/d/1mujANyzYrKkKgvH4jg5BU7cOKCzVTybB"
                alt="Talabatkom Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white block leading-tight tracking-tight">Talabatkom</span>
              <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {t.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar (Hidden on small mobile) */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full py-2 px-4 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-900 transition-all"
                aria-label={t.searchPlaceholder}
              />
              <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 px-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                🔍
              </div>
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 ltr:right-8 rtl:left-8 px-2 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Controls: Language Selector, Theme Toggle, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Language Selector Dropdown (TR, AR, EN) */}
            <div className="relative">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-bold py-1.5 px-2 sm:px-3 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
                aria-label="Language Selector"
              >
                <option value="tr">🇹🇷 TR</option>
                <option value="ar">🇸🇦 AR</option>
                <option value="en">🇬🇧 EN</option>
              </select>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-amber-300 shadow-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs sm:text-base active:scale-90"
              title="Gece / Gündüz Modu"
              aria-label="Theme Toggle"
            >
              <span>{isDark ? '☀️' : '🌙'}</span>
            </button>

            {/* Cart Button: Always displays localized name (Sepete / السلة / Cart) */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all"
              aria-label={t.cart}
            >
              <span>🛒</span>
              <span className="inline font-bold">{t.cart}</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.2 text-[11px] font-bold bg-amber-400 text-slate-900 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row (Clean full width on mobile) */}
        <div className="sm:hidden pt-1 pb-1">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full py-2 px-4 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-900 transition-all"
              aria-label={t.searchPlaceholder}
            />
            <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 px-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              🔍
            </div>
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 ltr:right-8 rtl:left-8 px-2 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

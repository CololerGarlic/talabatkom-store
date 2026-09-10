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
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      <div className="bg-brand-700 text-white text-xs sm:text-sm py-1.5 px-4 text-center font-medium">
        <span>{t.notification}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-white border border-slate-200 dark:border-slate-700 shadow-xs flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform">
              <img
                src="https://lh3.googleusercontent.com/d/1mujANyzYrKkKgvH4jg5BU7cOKCzVTybB"
                alt="Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white block leading-tight tracking-tight">
                {STORE_CONFIG.storeName}
              </span>
              <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                {t.tagline}
              </span>
            </div>
          </Link>

          <div className="flex-1 max-w-md mx-1 sm:mx-2">
            <div className="relative">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full py-2 px-3 sm:px-4 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-900 transition-all"
                aria-label="Search"
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

          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            {/* Language Selector Dropdown (AR, EN, TR) */}
            <div className="relative">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-bold py-1.5 sm:py-2 px-2 sm:px-3 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-xs"
                aria-label="Language Selector"
              >
                <option value="ar">🇸🇦 العربية</option>
                <option value="en">🇬🇧 English</option>
                <option value="tr">🇹🇷 Türkçe</option>
              </select>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-amber-300 shadow-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-sm sm:text-base active:scale-90"
              title="Toggle Dark / Light Mode"
              aria-label="Toggle Theme"
            >
              <span>{isDark ? '☀️' : '🌙'}</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 bg-brand-600 hover:bg-brand-700 active:scale-95 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all"
              aria-label="Cart"
            >
              <span>🛒</span>
              <span className="hidden sm:inline">{t.cart}</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 sm:px-2 py-0.2 text-xs font-bold bg-amber-400 text-slate-900 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

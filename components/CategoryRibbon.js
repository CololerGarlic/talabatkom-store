import { useRef } from 'react';
import { useLanguage } from '../pages/_app';

export default function CategoryRibbon({ categories, activeSlug, onSelectCategory }) {
  const scrollRef = useRef(null);
  const { lang } = useLanguage();

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getCatName = (cat) => {
    if (lang === 'en' && cat.name_en) return cat.name_en;
    if (lang === 'tr' && cat.name_tr) return cat.name_tr;
    return cat.name;
  };

  return (
    <div className="sticky top-16 sm:top-20 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 relative flex items-center">
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute right-1 z-10 w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95"
          aria-label="Scroll"
        >
          &#10095;
        </button>

        <div
          ref={scrollRef}
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth px-2 sm:px-8 w-full select-none"
        >
          {categories.map((cat) => {
            const isActive = activeSlug === cat.slug;
            const displayName = getCatName(cat);
            return (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md scale-105'
                    : cat.is_sale
                    ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{displayName}</span>
                {cat.is_sale && (
                  <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                    🔥
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute left-1 z-10 w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95"
          aria-label="Scroll"
        >
          &#10094;
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useLanguage } from '../pages/_app';

export default function ProductCard({ product, onAddToCart, cartItem }) {
  const { lang, t } = useLanguage();
  const qty = cartItem ? cartItem.quantity : 0;
  const [imgFailed, setImgFailed] = useState(false);

  const hasPhoto = Boolean(product.image) && !imgFailed;

  // Strict language resolution
  let productName = product.name;
  if (lang === 'tr') {
    productName = product.name_tr || product.name;
  } else if (lang === 'en') {
    productName = product.name_en || product.name;
  }

  const saleTag = lang === 'en' ? 'Sale 🔥' : (lang === 'tr' ? 'İndirim 🔥' : 'عرض 🔥');
  const currencyLabel = t.currency || (lang === 'ar' ? 'ليرة' : 'TL');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-2 sm:p-3 shadow-xs hover:shadow-md hover:border-brand-400 dark:hover:border-brand-500 transition-all flex flex-col justify-between group relative notranslate" translate="no">
      {product.is_sale && (
        <div className="absolute top-1.5 ltr:right-1.5 rtl:left-1.5 z-10 bg-red-600 text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
          {saleTag}
        </div>
      )}

      {hasPhoto && (
        <div className="w-full h-20 sm:h-32 bg-slate-50 dark:bg-slate-800/80 rounded-lg overflow-hidden flex items-center justify-center mb-1.5 relative border border-slate-100 dark:border-slate-700/60">
          <img
            src={product.image}
            alt={productName}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-contain p-0.5 sm:p-1 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[8px] sm:text-[9px] text-brand-700 dark:text-brand-400 font-bold block mb-0.5">
            {product.category}
          </span>
          <h3 className="text-[10px] sm:text-xs font-bold text-slate-900 dark:text-white leading-tight line-clamp-2 min-h-[1.75rem] sm:min-h-[2rem]">
            {productName}
          </h3>
        </div>

        <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1">
          <div>
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className="text-xs sm:text-sm font-extrabold text-brand-700 dark:text-brand-400">
                {product.price} {currencyLabel}
              </span>
              {product.original_price && (
                <span className="text-[9px] text-slate-400 dark:text-slate-500 line-through">
                  {product.original_price}
                </span>
              )}
            </div>
            <span className="text-[8px] sm:text-[9px] text-slate-400 block">
              {product.unit}
            </span>
          </div>

          {qty === 0 ? (
            <button
              onClick={() => onAddToCart(product, 1)}
              className="bg-brand-600 hover:bg-brand-700 active:scale-90 text-white w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shadow-md font-black text-sm transition-all"
              aria-label={lang === 'tr' ? 'Sepete Ekle' : (lang === 'ar' ? 'أضف للسلة' : 'Add to cart')}
            >
              +
            </button>
          ) : (
            <div className="flex items-center bg-brand-600 rounded-lg overflow-hidden shadow-md border border-brand-500">
              <button
                onClick={() => onAddToCart(product, -1)}
                className="w-6 sm:w-7 h-7 sm:h-8 flex items-center justify-center text-white hover:bg-brand-700 active:bg-brand-800 font-black text-sm transition-colors"
                aria-label="Decrease"
              >
                −
              </button>
              <span className="w-6 sm:w-7 text-center text-xs sm:text-sm font-black text-white bg-brand-700/70 py-1 select-none">
                {qty}
              </span>
              <button
                onClick={() => onAddToCart(product, 1)}
                className="w-6 sm:w-7 h-7 sm:h-8 flex items-center justify-center text-white hover:bg-brand-700 active:bg-brand-800 font-black text-sm transition-colors"
                aria-label="Increase"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

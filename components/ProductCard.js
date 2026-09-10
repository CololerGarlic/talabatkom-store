import { useState } from 'react';
import { STORE_CONFIG } from '../lib/config';
import { useLanguage } from '../pages/_app';

export default function ProductCard({ product, onAddToCart, cartItem }) {
  const { lang } = useLanguage();
  const qty = cartItem ? cartItem.quantity : 0;
  const [imgFailed, setImgFailed] = useState(false);

  const hasPhoto = Boolean(product.image) && !imgFailed;

  const productName = (lang === 'en' && product.name_en) 
    ? product.name_en 
    : ((lang === 'tr' && product.name_tr) ? product.name_tr : product.name);

  const saleTag = lang === 'en' ? 'Sale 🔥' : (lang === 'tr' ? 'İndirim 🔥' : 'عرض 🔥');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-2.5 sm:p-3 shadow-xs hover:shadow-md hover:border-brand-400 dark:hover:border-brand-500 transition-all flex flex-col justify-between group relative">
      {product.is_sale && (
        <div className="absolute top-1.5 ltr:right-1.5 rtl:left-1.5 z-10 bg-red-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
          {saleTag}
        </div>
      )}

      {/* Photo Container: Only renders if real photo exists, otherwise clean icon placeholder */}
      {hasPhoto && (
        <div className="w-full h-20 sm:h-32 bg-slate-50 dark:bg-slate-800/80 rounded-lg overflow-hidden flex items-center justify-center mb-2 relative border border-slate-100 dark:border-slate-700/60">
          <img
            src={product.image}
            alt={productName}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[9px] sm:text-[10px] text-brand-700 dark:text-brand-400 font-bold block mb-0.5">
            {product.category}
          </span>
          <h3 className="text-[11px] sm:text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 min-h-[1.75rem] sm:min-h-[2rem]">
            {productName}
          </h3>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xs sm:text-sm font-extrabold text-brand-700 dark:text-brand-400">
                {product.price} {STORE_CONFIG.currency}
              </span>
              {product.original_price && (
                <span className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 line-through">
                  {product.original_price}
                </span>
              )}
            </div>
            <span className="text-[9px] text-slate-400 block">
              {product.unit}
            </span>
          </div>

          {/* Cart Quantity Control */}
          {qty === 0 ? (
            <button
              onClick={() => onAddToCart(product, 1)}
              className="bg-brand-600 hover:bg-brand-700 active:scale-90 text-white w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shadow-xs font-bold text-xs transition-all"
              aria-label="Add to cart"
            >
              +
            </button>
          ) : (
            <div className="flex items-center bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 rounded-lg overflow-hidden shadow-xs">
              <button
                onClick={() => onAddToCart(product, -1)}
                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-brand-800 dark:text-brand-200 font-bold text-xs hover:bg-brand-200 active:bg-brand-300"
              >
                -
              </button>
              <span className="w-5 sm:w-6 text-center text-xs font-extrabold text-brand-900 dark:text-white">
                {qty}
              </span>
              <button
                onClick={() => onAddToCart(product, 1)}
                className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-brand-800 dark:text-brand-200 font-bold text-xs hover:bg-brand-200 active:bg-brand-300"
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

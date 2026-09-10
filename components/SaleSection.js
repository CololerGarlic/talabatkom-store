import ProductCard from './ProductCard';
import Link from 'next/link';

export default function SaleSection({ saleProducts, onAddToCart, cartMap, onSeeAllOffers }) {
  if (!saleProducts || saleProducts.length === 0) return null;

  return (
    <section className="bg-gradient-to-r from-amber-50 via-red-50 to-amber-50 border-y border-amber-200/80 py-6 sm:py-8 my-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl animate-pulse">🔥</span>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                عروض وتخفيضات طلباتكم اليومية
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                أسعار مخفضة خاصة لفترة محدودة - سارع قبل نفاد الكمية!
              </p>
            </div>
          </div>
          
          <button
            onClick={onSeeAllOffers}
            className="text-xs sm:text-sm font-bold text-red-700 hover:text-red-800 bg-white border border-red-200 px-3 py-1.5 rounded-full shadow-xs hover:shadow-sm transition-all"
          >
            عرض الكل ({saleProducts.length}) &larr;
          </button>
        </div>

        {/* 3 items per row on mobile & desktop as requested */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
          {saleProducts.slice(0, 6).map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={onAddToCart}
              cartItem={cartMap[prod.id]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

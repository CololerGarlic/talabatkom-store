import { useState, useMemo } from 'react';
import Link from 'next/link';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import CategoryRibbon from '../components/CategoryRibbon';
import ProductCard from '../components/ProductCard';
import CartDrawer from '../components/CartDrawer';
import CookieConsent from '../components/CookieConsent';
import Footer from '../components/Footer';
import { useCart, useLanguage } from './_app';
import catalogData from '../data/products.json';
import { STORE_CONFIG } from '../lib/config';

export default function Home() {
  const { cart, cartTotalCount, isCartOpen, setIsCartOpen, addToCart, clearCart } = useCart();
  const { lang, t } = useLanguage();
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = catalogData.categories;
  const allProducts = catalogData.products;

  const getCatName = (cat) => {
    if (lang === 'en' && cat.name_en) return cat.name_en;
    if (lang === 'tr' && cat.name_tr) return cat.name_tr;
    return cat.name;
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery && !selectedCategorySlug) return [];
    return allProducts.filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategorySlug || product.category_slug === selectedCategorySlug;
      return matchesSearch && matchesCategory;
    });
  }, [allProducts, selectedCategorySlug, searchQuery]);

  const activeCategory = categories.find(c => c.slug === selectedCategorySlug);
  const activeCategoryName = activeCategory ? getCatName(activeCategory) : '';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEO 
        title={t.heroTitle} 
        description={t.heroDesc}
      />

      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div 
        className="relative bg-slate-900 text-white py-8 sm:py-14 px-4 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/d/174ifZXjerNNuSd2Ao8z5iiZUWTvqr8fA')` }}
      >
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[1px]"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 text-center md:ltr:text-left md:rtl:text-right">
            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl bg-white p-1.5 shadow-2xl border border-white/80 hidden sm:flex items-center justify-center flex-shrink-0">
              <img
                src="https://lh3.googleusercontent.com/d/1mujANyzYrKkKgvH4jg5BU7cOKCzVTybB"
                alt="Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-2 sm:space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-brand-600/80 border border-brand-400/50 px-3.5 py-1 rounded-full text-xs font-bold text-amber-300 shadow-sm">
                <span>{t.heroBadge}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight drop-shadow-md">
                {t.heroTitle}
              </h1>
              <p className="text-xs sm:text-base text-slate-200 leading-relaxed drop-shadow-sm">
                {t.heroDesc}
              </p>
              <div className="pt-1 flex flex-wrap items-center justify-center md:ltr:justify-start md:rtl:justify-start gap-2 text-xs">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30 font-semibold shadow-xs">
                  <span dangerouslySetInnerHTML={{ __html: t.deliveryFeeBadge }} />
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30 font-semibold shadow-xs">
                  {t.codBadge}
                </span>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30 font-semibold shadow-xs">
                  {t.whatsappBadge}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-xl transition-all flex items-center gap-2.5"
            >
              <span>🛒</span>
              <span>{t.viewCart}</span>
              <span className="bg-slate-900 text-amber-300 px-2 py-0.5 rounded-full text-xs font-bold">
                {cartTotalCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      <CategoryRibbon
        categories={categories}
        activeSlug={selectedCategorySlug}
        onSelectCategory={(slug) => {
          setSelectedCategorySlug(slug === selectedCategorySlug ? null : slug);
          setSearchQuery('');
        }}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {(selectedCategorySlug || searchQuery) ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeCategory ? activeCategory.icon : '🔍'}</span>
                <div>
                  <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white">
                    {activeCategory ? activeCategoryName : `"${searchQuery}"`}
                  </h2>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {filteredProducts.length} items
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => { setSelectedCategorySlug(null); setSearchQuery(''); }}
                className="text-xs font-bold text-brand-700 dark:text-brand-400 hover:text-brand-800 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 px-3 py-1.5 rounded-lg"
              >
                {t.allCategories} &times;
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
                <span className="text-4xl block mb-2">🔍</span>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">{t.noProducts}</h3>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    cartItem={cart[product.id]}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((cat) => {
              const catItems = allProducts.filter(p => p.category_slug === cat.slug);
              const previewItems = catItems.slice(0, 6);
              const displayName = getCatName(cat);

              const cardStyle = cat.is_sale 
                ? 'bg-gradient-to-r from-red-50/70 via-amber-50/50 to-red-50/70 dark:from-red-950/30 dark:via-amber-950/20 dark:to-red-950/30 border-red-200 dark:border-red-900/60' 
                : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 shadow-xs';

              return (
                <section
                  key={cat.slug}
                  className={`rounded-2xl p-4 sm:p-5 border transition-all ${cardStyle}`}
                >
                  <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{displayName}</span>
                          {cat.is_sale && (
                            <span className="bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">
                              🔥
                            </span>
                          )}
                        </h2>
                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                          {catItems.length} items
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCategorySlug(cat.slug)}
                      className="text-xs font-bold text-brand-700 dark:text-brand-400 hover:text-brand-800 bg-brand-50 dark:bg-brand-950/40 hover:bg-brand-100 border border-brand-200 dark:border-brand-800 px-3 py-1 rounded-full transition-all flex items-center gap-1"
                    >
                      <span>{t.browseCategory} ({catItems.length})</span>
                      <span>&rarr;</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3.5">
                    {previewItems.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onAddToCart={addToCart}
                        cartItem={cart[prod.id]}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      {cartTotalCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#25D366] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-2xl flex items-center justify-between border-2 border-white"
          >
            <span className="flex items-center gap-2">
              <span className="bg-white text-[#25D366] w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
                {cartTotalCount}
              </span>
              <span>{t.mobileOrder}</span>
            </span>
            <span>WhatsApp &rarr;</span>
          </button>
        </div>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={addToCart}
        onClearCart={clearCart}
      />

      <CookieConsent />
      <Footer categories={categories} />
    </div>
  );
}

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
        (product.name_en && product.name_en.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.name_tr && product.name_tr.toLowerCase().includes(searchQuery.toLowerCase())) ||
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
        title={STORE_CONFIG.storeName} 
        description={STORE_CONFIG.tagline}
      />

      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Categories Navigation Ribbon (Hero background banner removed as requested) */}
      <CategoryRibbon
        categories={categories}
        activeSlug={selectedCategorySlug}
        onSelectCategory={(slug) => {
          setSelectedCategorySlug(slug === selectedCategorySlug ? null : slug);
          setSearchQuery('');
        }}
      />

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 w-full">
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
                    {filteredProducts.length} {lang === 'ar' ? 'صنف متوفر' : (lang === 'tr' ? 'ürün bulundu' : 'items')}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => { setSelectedCategorySlug(null); setSearchQuery(''); }}
                className="text-xs font-bold text-brand-700 dark:text-brand-400 hover:text-brand-800 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 px-3 py-1.5 rounded-lg transition-all"
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
          <div className="space-y-6 sm:space-y-8">
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
                  className={`rounded-2xl p-3 sm:p-5 border transition-all ${cardStyle}`}
                >
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-xl sm:text-2xl">{cat.icon}</span>
                      <div>
                        <h2 className="text-xs sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                          <span>{displayName}</span>
                          {cat.is_sale && (
                            <span className="bg-red-600 text-white text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                              🔥
                            </span>
                          )}
                        </h2>
                        <p className="text-[9px] sm:text-xs text-slate-500 dark:text-slate-400">
                          {catItems.length} {lang === 'ar' ? 'صنف' : (lang === 'tr' ? 'ürün' : 'items')}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCategorySlug(cat.slug)}
                      className="text-[11px] sm:text-xs font-bold text-brand-700 dark:text-brand-400 hover:text-brand-800 bg-brand-50 dark:bg-brand-950/40 hover:bg-brand-100 border border-brand-200 dark:border-brand-800 px-2.5 sm:px-3 py-1 rounded-full transition-all flex items-center gap-1"
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

      {/* Floating Mobile Cart Button */}
      {cartTotalCount > 0 && (
        <div className="fixed bottom-3 left-3 right-3 z-40 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#25D366] text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-2xl flex items-center justify-between border-2 border-white/80 active:scale-98"
          >
            <span className="flex items-center gap-2">
              <span className="bg-white text-[#25D366] w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">
                {cartTotalCount}
              </span>
              <span>{t.mobileOrder}</span>
            </span>
            <span>{t.mobileOrderButton}</span>
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

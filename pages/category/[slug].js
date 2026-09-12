import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SEO from '../../components/SEO';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import CartDrawer from '../../components/CartDrawer';
import Footer from '../../components/Footer';
import { useCart, useLanguage } from '../_app';
import catalogData from '../../data/products.json';
import { STORE_CONFIG } from '../../lib/config';

export default function CategoryPage({ category, products, allCategories }) {
  const router = useRouter();
  const { cart, cartTotalCount, isCartOpen, setIsCartOpen, addToCart, clearCart } = useCart();
  const { lang, t } = useLanguage();
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  const getCatName = (cat) => {
    if (lang === 'en' && cat.name_en) return cat.name_en;
    if (lang === 'tr' && cat.name_tr) return cat.name_tr;
    return cat.name;
  };

  const currentCategoryName = category ? getCatName(category) : '';

  const sortedProducts = useMemo(() => {
    let result = products.filter(p => {
      const q = searchQuery.toLowerCase();
      return searchQuery === '' || 
        p.name.toLowerCase().includes(q) ||
        (p.name_en && p.name_en.toLowerCase().includes(q)) ||
        (p.name_tr && p.name_tr.toLowerCase().includes(q));
    });

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, sortBy, searchQuery]);

  if (router.isFallback || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-base font-bold text-slate-700 dark:text-slate-300">...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors notranslate" translate="no">
      <SEO
        title={`${currentCategoryName} | ${STORE_CONFIG.storeName}`}
        description={STORE_CONFIG.tagline}
        canonical={`/category/${category.slug}`}
      />

      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              {t.allCategories}
            </Link>
            <span>&gt;</span>
            <span className="text-slate-900 dark:text-white font-bold">{currentCategoryName}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-brand-800 dark:bg-slate-900 text-white py-6 sm:py-8 px-4 border-b border-brand-700 dark:border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl sm:text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold">{currentCategoryName}</h1>
              <p className="text-xs sm:text-sm text-brand-100 dark:text-slate-400 mt-0.5">
                {sortedProducts.length} {lang === 'ar' ? 'صنف متوفر' : (lang === 'tr' ? 'ürün' : 'items')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 w-full">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <span className="text-4xl block mb-2">📦</span>
            <p className="text-base font-bold text-slate-800 dark:text-slate-200">{t.noProducts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
            {sortedProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onAddToCart={addToCart}
                cartItem={cart[prod.id]}
              />
            ))}
          </div>
        )}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={addToCart}
        onClearCart={clearCart}
      />

      <Footer categories={allCategories} />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = catalogData.categories.map((c) => ({
    params: { slug: c.slug }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const category = catalogData.categories.find((c) => c.slug === params.slug);
  const products = catalogData.products.filter((p) => p.category_slug === params.slug);

  return {
    props: {
      category,
      products,
      allCategories: catalogData.categories
    }
  };
}

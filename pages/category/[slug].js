import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SEO from '../../components/SEO';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import CartDrawer from '../../components/CartDrawer';
import Footer from '../../components/Footer';
import { useCart } from '../_app';
import catalogData from '../../data/products.json';
import { STORE_CONFIG } from '../../lib/config';

export default function CategoryPage({ category, products, allCategories }) {
  const router = useRouter();
  const { cart, cartTotalCount, isCartOpen, setIsCartOpen, addToCart, clearCart } = useCart();
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  if (router.isFallback || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-base font-bold text-slate-700">جاري تحميل القسم...</p>
      </div>
    );
  }

  const sortedProducts = useMemo(() => {
    let result = products.filter(p => 
      searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    }
    return result;
  }, [products, sortBy, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SEO
        title={`قسم ${category.name}`}
        description={`تصفح جميع منتجات قسم ${category.name} في متجر طلباتكم. أسعار مناسبة مع توصيل سريع لباب بيتك.`}
        canonical={`/category/${category.slug}`}
      />

      <Navbar
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-brand-600 transition-colors">
              الرئيسية
            </Link>
            <span>&gt;</span>
            <span className="text-slate-800 font-bold">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-gradient-to-r from-brand-800 to-brand-700 text-white py-6 sm:py-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl sm:text-5xl">{category.icon}</span>
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold">{category.name}</h1>
              <p className="text-xs sm:text-sm text-brand-100 mt-0.5">
                {category.name_en} • متوفر {products.length} صنف طازج ومميز
              </p>
            </div>
          </div>

          <div className="hidden sm:block text-xs bg-white/10 px-3 py-1.5 rounded-lg border border-white/20">
            🚚 توصيل سريع | 100 ليرة فقط
          </div>
        </div>
      </div>

      {/* Products & Filters */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
          <span className="text-xs sm:text-sm font-bold text-slate-700">
            عرض {sortedProducts.length} من أصل {products.length} منتج
          </span>

          {/* Sorting */}
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="sort" className="font-semibold text-slate-600">
              ترتيب حسب:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg py-1.5 px-3 text-xs font-semibold text-slate-800 focus:border-brand-500"
            >
              <option value="default">الافتراضي</option>
              <option value="price-low">السعر: من الأقل للأعلى</option>
              <option value="price-high">السعر: من الأعلى للأقل</option>
              <option value="name">الاسم أبجدياً</option>
            </select>
          </div>
        </div>

        {/* 3-column responsive grid on desktop & mobile */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
            <span className="text-4xl block mb-2">📦</span>
            <p className="text-base font-bold text-slate-800">لا توجد منتجات مطابقة</p>
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

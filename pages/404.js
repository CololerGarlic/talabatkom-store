import Link from 'next/link';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from './_app';
import catalogData from '../data/products.json';
import { STORE_CONFIG } from '../lib/config';

export default function Custom404() {
  const { cartTotalCount, setIsCartOpen } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SEO
        title="الصفحة غير موجودة (404)"
        description="عذراً، الصفحة التي تبحث عنها غير موجودة في متجر طلباتكم."
      />

      <Navbar cartCount={cartTotalCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1 max-w-2xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-sm">
          🔍
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-3">404</h1>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">
          عذراً، هذه الصفحة غير موجودة
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mb-8 leading-relaxed">
          يبدو أن الرابط الذي حاولت الوصول إليه قد تم نقله أو حذفه، أو أن هناك خطأ في كتابة العنوان. تفضل بالعودة للصفحة الرئيسية لتصفح جميع المنتجات المتوفرة.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all"
          >
            العودة للصفحة الرئيسية &rarr;
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all"
          >
            عرض سلة المشتريات
          </button>
        </div>
      </main>

      <Footer categories={catalogData.categories} />
    </div>
  );
}

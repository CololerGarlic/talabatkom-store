import Link from 'next/link';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from './_app';
import catalogData from '../data/products.json';
import { STORE_CONFIG } from '../lib/config';

export default function TermsPage() {
  const { cartTotalCount, setIsCartOpen } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SEO
        title="الشروط والأحكام (Terms & Conditions)"
        description={`شروط وأحكام الشراء والتوصيل لمتجر ${STORE_CONFIG.storeName} - تفاصيل رسوم التوصيل (100 ليرة) والدفع عند الاستلام.`}
        canonical="/terms"
      />

      <Navbar cartCount={cartTotalCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              الشروط والأحكام وسياسة التوصيل
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              متجر {STORE_CONFIG.storeName} | الشروط المنظمة لطلبات التوصيل
            </p>
          </div>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. شروط الطلب وتأكيده عبر واتساب</h2>
            <p>
              يتم إنشاء طلبات الشراء عبر سلة التسوق في الموقع، ومن ثم إرسال ملخص الطلب إلى رقم واتساب المعتمد للمتجر. يعتبر الطلب نافذاً ومؤكداً بمجرد رد إدارة المتجر وتأكيد تجهيز الطلب وموعد التوصيل المتوقع.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. سياسة رسوم التوصيل (Delivery Fee)</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900 font-semibold">
              🚚 تضاف رسوم توصيل ثابتة بقيمة <span className="font-extrabold text-brand-800 underline">100 ليرة تركية (100 TL)</span> على كل طلب توصيل منزلي، وتظهر موضحة بوضوح في ملخص السلة قبل إرسال الطلب.
            </div>
            <p>
              تغطي رسوم التوصيل تكاليف الشحن المحلي والتوصيل المباشر لباب بيت العميل في نطاق مناطق الخدمة المحددة.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. طرق الدفع والأسعار</h2>
            <ul className="list-disc list-inside space-y-1 pr-4">
              <li><strong>الدفع عند الاستلام (Cash on Delivery):</strong> يتم سداد إجمالي الفاتورة نقداً لمندوب التوصيل عند استلام المنتجات وفحصها.</li>
              <li><strong>العملة:</strong> جميع الأسعار المعروضة على الموقع هي بالليرة التركية (TL / ₺) وتشمل الضرائب والرسوم المعمول بها.</li>
            </ul>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">4. فحص المنتجات وسياسة الإرجاع</h2>
            <p>
              نظراً لطبيعة المواد الغذائية والمنتجات الطازجة والمجمدة:
            </p>
            <ul className="list-disc list-inside space-y-1 pr-4">
              <li>يرجى من العميل فحص الطلب فور استلامه من مندوب التوصيل.</li>
              <li>في حال وجود أي تلف أو خطأ في أي منتج، يتم استبداله فوراً أو خصم قيمته من الفاتورة.</li>
              <li>لا يمكن إرجاع المواد الغذائية القابلة للتلف السريع بعد مغادرة مندوب التوصيل إلا في حالات وجود عيب مصنعي مثبت.</li>
            </ul>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">5. التواصل والاستفسارات</h2>
            <p>
              لأي استفسار بخصوص المنتجات، الأسعار، أو مواعيد التوصيل، يسعدنا تواصلكم المباشر عبر واتساب على الرقم: 
              <strong className="text-brand-700 font-mono pr-1">{STORE_CONFIG.contactPhone}</strong>.
            </p>
          </section>

          <div className="pt-4 border-t border-slate-200">
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-800">
              <span>&larr;</span>
              <span>العودة إلى الصفحة الرئيسية والتسوق</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer categories={catalogData.categories} />
    </div>
  );
}

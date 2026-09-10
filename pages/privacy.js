import Link from 'next/link';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from './_app';
import catalogData from '../data/products.json';
import { STORE_CONFIG } from '../lib/config';

export default function PrivacyPage() {
  const { cartTotalCount, setIsCartOpen } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <SEO
        title="سياسة الخصوصية (Privacy Policy)"
        description={`سياسة الخصوصية وحماية البيانات الشخصية لمتجر ${STORE_CONFIG.storeName} وفقاً للقوانين والتشريعات التركية (KVKK).`}
        canonical="/privacy"
      />

      <Navbar cartCount={cartTotalCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              سياسة الخصوصية وحماية البيانات (KVKK)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              آخر تحديث: 8 سبتمبر 2026 | متجر {STORE_CONFIG.storeName}
            </p>
          </div>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">1. مقدمة والتزامنا بالخصوصية</h2>
            <p>
              نحن في متجر <strong>{STORE_CONFIG.storeName}</strong> نلتزم بأعلى معايير الشفافية وحماية خصوصية بيانات عملائنا الكرام. تم إعداد هذه السياسة لتوضيح كيفية جمع البيانات واستخدامها ومعالجتها وفقاً لقانون حماية البيانات الشخصية رقم 6698 (KVKK) المعمول به في الجمهورية التركية.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">2. البيانات التي نقوم بجمعها</h2>
            <p>عند استخدامك لموقعنا والطلب عبر واتساب، قد يطلب منك تقديم المعلومات التالية لإتمام الطلب:</p>
            <ul className="list-disc list-inside space-y-1 pr-4">
              <li><strong>الاسم الكريم:</strong> لمخاطبتكم وتسليم الطلب للشخص المعني.</li>
              <li><strong>رقم الهاتف:</strong> للتواصل معكم وتأكيد تفاصيل الطلب والتوصيل عبر واتساب.</li>
              <li><strong>عنوان التوصيل:</strong> لتوصيل المنتجات إلى موقعكم بدقة.</li>
              <li><strong>سلة المشتريات:</strong> لتجهيز المواد الغذائية المطلوبة بدقة وتحديد المجموع.</li>
            </ul>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">3. كيفية استخدام ومعالجة البيانات</h2>
            <p>تستخدم البيانات التي تقدمها فقط للأغراض المشروعة التالية:</p>
            <ul className="list-disc list-inside space-y-1 pr-4">
              <li>تجهيز وتغليف وتوصيل الطلبات الغذائية ومشتريات البقالة.</li>
              <li>التواصل المباشر عبر واتساب لتأكيد موعد الوصول وتكلفة الطلب (شاملاً رسوم التوصيل 100 ليرة).</li>
              <li>تقديم الدعم الفني وخدمة العملاء.</li>
              <li><strong>نؤكد تماماً:</strong> نحن لا نبيع ولا نشارك بياناتك مع أي طرف ثالث لأغراض إعلانية.</li>
            </ul>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">4. ملفات تعريف الارتباط (Cookies) والتخزين المحلي</h2>
            <p>
              يستخدم الموقع ملفات تعريف الارتباط الأساسية والتخزين المحلي في متصفحك (LocalStorage) حصرياً لحفظ محتويات سلة مشترياتك في حال قمت بإغلاق الصفحة والعودة لاحقاً، ولتذكر موافقتك على شريط الخصوصية. لا نقوم بتتبع نشاطك خارج نطاق موقعنا.
            </p>
          </section>

          <section className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-base sm:text-lg font-bold text-slate-900">5. حقوقك القانونية وفقاً لقانون KVKK</h2>
            <p>
              يحق لك في أي وقت الاستفسار عن بياناتك المسجلة لدينا، وتعديلها، أو طلب حذف سجل محادثات الطلب وبيانات التوصيل من خلال التواصل معنا مباشرة على رقم واتساب المتجر: 
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

import Link from 'next/link';
import { STORE_CONFIG } from '../lib/config';

export default function Footer({ categories }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Callout Card: Contact Mohammad for Web Development */}
        <div className="mb-12 bg-gradient-to-r from-slate-800 via-brand-950 to-slate-800 border border-slate-700/80 rounded-2xl p-6 sm:p-8 text-center shadow-xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-3xl">💻✨</span>
            <h3 className="text-base sm:text-xl font-extrabold text-white">
              هل ترغب في إنشاء متجر أو موقع إلكتروني احترافي لعملك؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Want a custom, modern, high-speed website or e-commerce store like this for your business?
            </p>
            <div className="pt-2">
              <a
                href="https://www.linkedin.com/in/mohammadnour-hijazi-797967277"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
              >
                <span>تواصل مع محمد نور حجازي | Contact Mohammad</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 flex items-center justify-center border border-slate-700 overflow-hidden">
                <img src={STORE_CONFIG.logoUrl} alt="شعار طلباتكم" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {STORE_CONFIG.storeName}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {STORE_CONFIG.tagline}. نوفر لكم أفضل المنتجات الغذائية والمواد التموينية الطازجة يومياً مع خدمة التوصيل السريع لباب البيت.
            </p>
            <div className="pt-1 text-xs text-amber-400 font-semibold">
              🚚 رسوم التوصيل: {STORE_CONFIG.deliveryFee} {STORE_CONFIG.currency} فقط
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 tracking-wider">
              أقسام المتجر
            </h4>
            <ul className="space-y-2 text-xs">
              {categories && categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-brand-400 transition-colors flex items-center gap-1.5">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 tracking-wider">
              ساعات العمل والتواصل
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <span>🕒</span>
                <span>{STORE_CONFIG.workingHours}</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>{STORE_CONFIG.storeAddress}</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📱</span>
                <a href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`} className="hover:text-brand-400 text-slate-300 font-mono">
                  {STORE_CONFIG.contactPhone}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Trust & Legal */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3 tracking-wider">
              الخصوصية والشروط القانونية
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors flex items-center gap-1">
                  <span>📄</span>
                  <span>سياسة الخصوصية (Privacy Policy)</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-400 transition-colors flex items-center gap-1">
                  <span>📜</span>
                  <span>الشروط والأحكام (Terms of Service)</span>
                </Link>
              </li>
              <li>
                <a href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>طلب مباشر عبر واتساب</span>
                  <span>&rarr;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Developer Credit */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.storeName}. جميع الحقوق محفوظة.</p>
          
          {/* Developer Credit linking to LinkedIn */}
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span>Website built by</span>
            <a
              href="https://www.linkedin.com/in/mohammadnour-hijazi-797967277"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300 underline font-bold tracking-wide transition-colors"
            >
              Mohammadnour Hijazi
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

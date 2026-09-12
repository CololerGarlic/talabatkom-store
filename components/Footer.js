import Link from 'next/link';
import { STORE_CONFIG } from '../lib/config';
import { useLanguage } from '../pages/_app';

export default function Footer({ categories }) {
  const { lang, t } = useLanguage();

  const getCatName = (cat) => {
    if (lang === 'en' && cat.name_en) return cat.name_en;
    if (lang === 'tr' && cat.name_tr) return cat.name_tr;
    return cat.name;
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Callout Banner: Contact Mohammad */}
        <div className="mb-10 bg-gradient-to-r from-slate-800 via-brand-950 to-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 text-center shadow-xl">
          <div className="max-w-xl mx-auto space-y-2.5">
            <span className="text-3xl block">💻✨</span>
            <h3 className="text-base sm:text-lg font-extrabold text-white">
              {t.webDevTitle}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.webDevDesc}
            </p>
            <div className="pt-2">
              <a
                href="https://www.linkedin.com/in/mohammadnour-hijazi-797967277"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition-all"
              >
                <span>{t.webDevBtn}</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Links & Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400 text-center sm:ltr:text-left sm:rtl:text-right pb-8 border-b border-slate-800">
          <div className="space-y-2">
            <div className="w-12 h-12 mx-auto sm:mx-0 rounded-xl bg-white p-1 flex items-center justify-center border border-slate-700 overflow-hidden">
              <img src="https://lh3.googleusercontent.com/d/1mujANyzYrKkKgvH4jg5BU7cOKCzVTybB" alt="Talabatkom Logo" referrerPolicy="no-referrer" className="w-full h-full object-contain" />
            </div>
            <p className="font-bold text-white text-sm">Talabatkom</p>
            <p>{t.footerTagline}</p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-white mb-2">{t.contactTitle}</h4>
            <p>{t.hours}</p>
            <p>{t.address}</p>
            <p>📱 WhatsApp: {STORE_CONFIG.contactPhone}</p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-white mb-2">{t.legalTitle}</h4>
            <p>
              <Link href="/privacy" className="text-brand-400 hover:underline font-semibold flex items-center gap-1 justify-center sm:justify-start">
                <span>📄</span>
                <span>{t.privacyLink}</span>
              </Link>
            </p>
            <p className="text-slate-500">KVKK & GDPR Compliant</p>
          </div>
        </div>

        {/* Bottom Bar with LinkedIn attribution */}
        <div className="pt-6 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:ltr:text-left sm:rtl:text-right">
          <p>© 2026 {STORE_CONFIG.storeName}. {t.copyright}</p>
          <div className="flex items-center gap-1.5 font-medium text-slate-300 justify-center">
            <span>{t.builtBy}</span>
            <a
              href="https://www.linkedin.com/in/mohammadnour-hijazi-797967277"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300 underline font-bold transition-colors"
            >
              Mohammadnour Hijazi
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

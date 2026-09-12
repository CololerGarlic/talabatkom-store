import Link from 'next/link';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart, useLanguage } from './_app';
import catalogData from '../data/products.json';
import { STORE_CONFIG } from '../lib/config';

export default function PrivacyPage() {
  const { cartTotalCount, setIsCartOpen } = useCart();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <SEO 
        title={t.privacyModalTitle} 
        description={STORE_CONFIG.tagline}
        canonical="/privacy"
      />

      <Navbar 
        cartCount={cartTotalCount} 
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery=""
        onSearchChange={() => {}}
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <Link href="/" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline mb-2 inline-block">
              &larr; {t.allCategories}
            </Link>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {t.privacyModalTitle}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {STORE_CONFIG.storeName} | KVKK No: 6698
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {t.privacySections && t.privacySections.map((sec, idx) => (
              <section key={idx} className="space-y-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {sec.title}
                </h2>
                <p>{sec.text}</p>
              </section>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
            <Link
              href="/"
              className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all inline-block shadow-md"
            >
              {t.modalClose}
            </Link>
          </div>
        </div>
      </main>

      <Footer categories={catalogData.categories} />
    </div>
  );
}

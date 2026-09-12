import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '../pages/_app';

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('talabatkom_cookies');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('talabatkom_cookies', 'accepted');
    setShow(false);
  };

  const close = () => {
    localStorage.setItem('talabatkom_cookies', 'closed');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 transition-colors">
      <p className="text-xs text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">
        {t.cookieNotice}{' '}
        <Link href="/privacy" className="text-brand-600 dark:text-brand-400 underline font-bold">
          {t.readPrivacy}
        </Link>
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={accept}
          className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all active:scale-95"
        >
          {t.accept}
        </button>
        <button
          onClick={close}
          className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs px-3 py-1.5 rounded-lg transition-all"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('talabatkom_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('talabatkom_cookie_consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('talabatkom_cookie_consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 sm:p-5 animate-slide-up">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">🍪</span>
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            إشعار ملفات تعريف الارتباط (Cookies)
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            نستخدم ملفات تعريف الارتباط الأساسية لحفظ سلة مشترياتك وتفضيلات التصفح لضمان تجربة تسوق سريعة ومريحة وفقاً لقانون حماية البيانات الشخصية (KVKK).{' '}
            <Link href="/privacy" className="text-brand-700 underline font-semibold">
              سياسة الخصوصية
            </Link>.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={accept}
              className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xs transition-colors"
            >
              موافق
            </button>
            <button
              onClick={decline}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
            >
              رفض
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

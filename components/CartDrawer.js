import { useState } from 'react';
import { STORE_CONFIG } from '../lib/config';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onClearCart }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Spam protection honeypot
  const [formLoadTime] = useState(Date.now()); // Spam time-check

  if (!isOpen) return null;

  const items = Object.values(cart);
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? STORE_CONFIG.deliveryFee : 0;
  const grandTotal = subtotal + deliveryFee;

  const validateForm = () => {
    const errors = {};
    if (!customerName.trim() || customerName.trim().length < 2) {
      errors.name = "يرجى كتابة الاسم الكريم (حرفين على الأقل)";
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 7) {
      errors.phone = "يرجى إدخال رقم هاتف صحيح للتواصل";
    }
    if (!customerAddress.trim() || customerAddress.trim().length < 5) {
      errors.address = "يرجى كتابة العنوان بالتفصيل (الحي، الشارع، البناء، الشقة)";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    // 1. Spam protection check: honeypot must be empty
    if (honeypot) {
      console.warn("Spam bot detected.");
      return;
    }

    // 2. Spam protection check: human interaction time must be > 1.5 seconds
    if (Date.now() - formLoadTime < 1500) {
      console.warn("Automated bot submission rejected.");
      return;
    }

    // 3. Form validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // 4. Construct WhatsApp Message
    let message = `🛒 *طلب جديد من متجر ${STORE_CONFIG.storeName}*\n`;
    message += `---------------------------------\n`;
    message += `👤 *الاسم:* ${customerName.trim()}\n`;
    message += `📱 *رقم الهاتف:* ${customerPhone.trim()}\n`;
    message += `📍 *عنوان التوصيل:* ${customerAddress.trim()}\n`;
    if (orderNotes.trim()) {
      message += `📝 *ملاحظات:* ${orderNotes.trim()}\n`;
    }
    message += `---------------------------------\n`;
    message += `📦 *المنتجات المطلوبة:*\n`;
    
    items.forEach((item, index) => {
      const itemTotal = item.product.price * item.quantity;
      message += `${index + 1}. ${item.product.name} × ${item.quantity} = ${itemTotal} ${STORE_CONFIG.currency}\n`;
    });

    message += `---------------------------------\n`;
    message += `💵 *المجموع الفرعي:* ${subtotal} ${STORE_CONFIG.currency}\n`;
    message += `🚚 *رسوم التوصيل:* ${deliveryFee} ${STORE_CONFIG.currency}\n`;
    message += `💰 *المجموع الإجمالي المطلوب:* ${grandTotal} ${STORE_CONFIG.currency}\n`;
    message += `---------------------------------\n`;
    message += `يرجى تأكيد استلام الطلب وتجهيزه للتوصيل. شكراً لكم!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-4 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛒</span>
              <h2 className="text-lg font-bold text-slate-900">سلة المشتريات</h2>
              <span className="text-xs bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded-full">
                {items.length} أصناف
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
              aria-label="إغلاق السلة"
            >
              ✕
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <span className="text-5xl block mb-3">🧺</span>
                <p className="text-base font-bold text-slate-700">سلتك فارغة حالياً</p>
                <p className="text-xs text-slate-500 mt-1">تصفح أقسام المتجر وأضف المنتجات لبدء الطلب</p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-sm transition-all"
                >
                  تصفح المنتجات الآن
                </button>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-3 pb-4">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center justify-between gap-3 bg-slate-50/70 p-2.5 rounded-lg border border-slate-200/60">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        {product.image ? (
  <img
    src={product.drive_thumb_url || product.image}
    alt={product.name}
    referrerPolicy="no-referrer"
    className="w-12 h-12 rounded-md object-contain bg-white border border-slate-100 p-0.5 flex-shrink-0"
  />
) : (
  <div className="w-12 h-12 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-lg flex-shrink-0">
    🛒
  </div>
)}
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {product.name}
                          </h4>
                          <span className="text-[11px] text-brand-700 font-semibold block">
                            {product.price} {STORE_CONFIG.currency}
                          </span>
                        </div>
                      </div>

                      {/* Quantity buttons */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(product, -1)}
                          className="w-6 h-6 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-5 text-center">{quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(product, 1)}
                          className="w-6 h-6 rounded bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Checkout details form */}
                <form onSubmit={handleCheckout} className="pt-4 space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    بيانات توصيل الطلب
                  </h3>

                  {/* Honeypot field (hidden from real users, traps spam bots) */}
                  <input
                    type="text"
                    name="b_address"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      الاسم الكريم *
                    </label>
                    <input
                      type="text"
                      placeholder="مثال: محمد نور"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`w-full text-xs p-2.5 rounded-lg border bg-white ${
                        formErrors.name ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-300 focus:border-brand-500'
                      }`}
                      required
                    />
                    {formErrors.name && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      رقم الهاتف للتواصل *
                    </label>
                    <input
                      type="tel"
                      placeholder="05xxxxxxxxx أو +90..."
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className={`w-full text-xs p-2.5 rounded-lg border bg-white ${
                        formErrors.phone ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-300 focus:border-brand-500'
                      }`}
                      required
                    />
                    {formErrors.phone && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      عنوان التوصيل بالتفصيل *
                    </label>
                    <textarea
                      rows="2"
                      placeholder="الحي، اسم الشارع، رقم العمارة، رقم الشقة أو الطابق..."
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className={`w-full text-xs p-2.5 rounded-lg border bg-white ${
                        formErrors.address ? 'border-red-500 ring-1 ring-red-200' : 'border-slate-300 focus:border-brand-500'
                      }`}
                      required
                    ></textarea>
                    {formErrors.address && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ملاحظات إضافية (اختياري)
                    </label>
                    <input
                      type="text"
                      placeholder="أي تعليمات إضافية بخصوص الطلب أو موعد التوصيل..."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white focus:border-brand-500"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Pricing Summary & Checkout Button (One Clear CTA) */}
          {items.length > 0 && (
            <div className="bg-slate-50 border-t border-slate-200 p-4 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-bold text-slate-800">{subtotal} {STORE_CONFIG.currency}</span>
                </div>
                
                {/* 100 TL Delivery Fee clearly displayed as requested */}
                <div className="flex justify-between items-center bg-amber-50 text-amber-900 border border-amber-200/80 px-2 py-1.5 rounded-md">
                  <span className="font-semibold flex items-center gap-1">
                    🚚 رسوم التوصيل:
                  </span>
                  <span className="font-extrabold text-brand-800">
                    +{STORE_CONFIG.deliveryFee} {STORE_CONFIG.currency}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-1 border-t border-slate-200">
                  <span>المجموع الإجمالي:</span>
                  <span className="text-base text-brand-700">{grandTotal} {STORE_CONFIG.currency}</span>
                </div>
              </div>

              {/* ONE CLEAR CALL TO ACTION (CTA) */}
              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] text-white font-extrabold text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 group"
              >
                <svg className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.3-.778.978-.954 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.798-1.5-1.784-1.676-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.589-.493-.509-.678-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.23 3.111c.15.201 2.124 3.243 5.145 4.549.718.311 1.279.497 1.716.636.721.23 1.378.197 1.898.12.579-.086 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.076-.125-.276-.201-.577-.351z"/>
                  <path d="M12.004 0C5.378 0 .008 5.37.008 12c0 2.116.551 4.179 1.599 6.002L.004 24l6.166-1.579C7.943 23.407 9.945 24 12.004 24c6.627 0 11.996-5.37 11.996-12S18.631 0 12.004 0zm0 21.968c-1.802 0-3.567-.485-5.105-1.401l-.366-.218-3.791.97.994-3.693-.239-.379c-1.008-1.603-1.541-3.468-1.541-5.247 0-5.514 4.486-10 10.002-10 5.516 0 10.002 4.486 10.002 10 0 5.514-4.486 10-10.002 10z"/>
                </svg>
                <span>تأكيد وإرسال الطلب عبر واتساب ({grandTotal} {STORE_CONFIG.currency})</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

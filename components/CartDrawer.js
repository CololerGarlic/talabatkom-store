import { useState } from 'react';
import { STORE_CONFIG } from '../lib/config';
import { useLanguage } from '../pages/_app';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onClearCart }) {
  const { lang, t } = useLanguage();
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  if (!isOpen) return null;

  const items = Object.values(cart);
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? STORE_CONFIG.deliveryFee : 0;
  const grandTotal = subtotal + deliveryFee;

  const currencyLabel = t.currency || (lang === 'ar' ? 'ليرة' : 'TL');

  const getProductName = (p) => {
    if (lang === 'en' && p.name_en) return p.name_en;
    if (lang === 'tr' && p.name_tr) return p.name_tr;
    return p.name;
  };

  const validateForm = () => {
    const errors = {};
    if (!customerName.trim()) errors.name = true;
    if (!customerPhone.trim()) errors.phone = true;
    if (!customerAddress.trim()) errors.address = true;
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (honeypot) return;
    if (!validateForm()) {
      alert(t.validationAlert);
      return;
    }

    setIsSubmitting(true);
    let msg = '';

    if (lang === 'tr') {
      msg += `🛒 *Talabatkom Mağazasından Yeni Sipariş*\n`;
      msg += `---------------------------------\n`;
      msg += `👤 *Müşteri Adı:* ${customerName.trim()}\n`;
      msg += `📱 *Telefon:* ${customerPhone.trim()}\n`;
      msg += `📍 *Teslimat Adresi:* ${customerAddress.trim()}\n`;
      if (orderNotes.trim()) msg += `📝 *Notlar:* ${orderNotes.trim()}\n`;
      msg += `---------------------------------\n`;
      msg += `📦 *Sipariş Detayı:*\n`;
      items.forEach((item, idx) => {
        const total = item.product.price * item.quantity;
        const pName = getProductName(item.product);
        msg += `${idx + 1}. ${pName} × ${item.quantity} = ${total} TL\n`;
      });
      msg += `---------------------------------\n`;
      msg += `💵 *Ara Toplam:* ${subtotal} TL\n`;
      msg += `🚚 *Teslimat Ücreti:* ${deliveryFee} TL\n`;
      msg += `💰 *Genel Toplam:* ${grandTotal} TL\n`;
      msg += `---------------------------------\n`;
      msg += `Siparişimi onaylamanızı rica ederim. Teşekkürler!`;
    } else if (lang === 'en') {
      msg += `🛒 *New Order from Talabatkom Store*\n`;
      msg += `---------------------------------\n`;
      msg += `👤 *Customer Name:* ${customerName.trim()}\n`;
      msg += `📱 *Phone:* ${customerPhone.trim()}\n`;
      msg += `📍 *Address:* ${customerAddress.trim()}\n`;
      if (orderNotes.trim()) msg += `📝 *Notes:* ${orderNotes.trim()}\n`;
      msg += `---------------------------------\n`;
      msg += `📦 *Order Items:*\n`;
      items.forEach((item, idx) => {
        const total = item.product.price * item.quantity;
        const pName = getProductName(item.product);
        msg += `${idx + 1}. ${pName} × ${item.quantity} = ${total} TL\n`;
      });
      msg += `---------------------------------\n`;
      msg += `💵 *Subtotal:* ${subtotal} TL\n`;
      msg += `🚚 *Delivery Fee:* ${deliveryFee} TL\n`;
      msg += `💰 *Grand Total:* ${grandTotal} TL\n`;
      msg += `---------------------------------\n`;
      msg += `Please confirm my order. Thank you!`;
    } else {
      msg += `🛒 *طلب جديد من متجر طلباتكم (Talabatkom)*\n`;
      msg += `---------------------------------\n`;
      msg += `👤 *الاسم:* ${customerName.trim()}\n`;
      msg += `📱 *الهاتف:* ${customerPhone.trim()}\n`;
      msg += `📍 *العنوان:* ${customerAddress.trim()}\n`;
      if (orderNotes.trim()) msg += `📝 *ملاحظات:* ${orderNotes.trim()}\n`;
      msg += `---------------------------------\n`;
      msg += `📦 *تفاصيل المنتجات:*\n`;
      items.forEach((item, idx) => {
        const total = item.product.price * item.quantity;
        const pName = getProductName(item.product);
        msg += `${idx + 1}. ${pName} × ${item.quantity} = ${total} ليرة\n`;
      });
      msg += `---------------------------------\n`;
      msg += `💵 *المجموع الفرعي:* ${subtotal} ليرة\n`;
      msg += `🚚 *رسوم التوصيل:* ${deliveryFee} ليرة\n`;
      msg += `💰 *المجموع الإجمالي المطلوب:* ${grandTotal} ليرة\n`;
      msg += `---------------------------------\n`;
      msg += `يرجى تأكيد استلام الطلب وتجهيزه للتوصيل. شكراً لكم!`;
    }

    const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" />
      <div className="fixed inset-y-0 ltr:right-0 rtl:left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-slate-200 dark:border-slate-800 transition-colors">
          
          {/* Header */}
          <div className="px-4 py-3.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛒</span>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">{t.cartTitle}</h2>
              <span className="text-xs bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full shadow-xs">
                {items.length}
              </span>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300">
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100 dark:divide-slate-800">
            {items.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-xs font-bold">
                <span className="text-5xl block mb-3">🧺</span>
                {t.emptyCart}
              </div>
            ) : (
              <>
                <div className="space-y-3 pb-4">
                  {items.map(({ product, quantity }) => {
                    const pName = getProductName(product);
                    const total = product.price * quantity;
                    return (
                      <div key={product.id} className="flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-700 text-xs">
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          {product.image ? (
                            <img src={product.image} alt={pName} referrerPolicy="no-referrer" className="w-12 h-12 rounded-md object-contain bg-white border border-slate-100 dark:border-slate-700 p-0.5 flex-shrink-0" />
                          ) : (
                            <div className="w-12 h-12 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-lg flex-shrink-0">🛒</div>
                          )}
                          <div className="min-w-0">
                            <h4 className="font-bold text-slate-900 dark:text-white truncate">{pName}</h4>
                            <span className="text-brand-700 dark:text-brand-400 font-semibold">{product.price} {currencyLabel} × {quantity} = {total} {currencyLabel}</span>
                          </div>
                        </div>

                        <div className="flex items-center bg-brand-600 rounded-lg overflow-hidden shadow-xs border border-brand-500 flex-shrink-0">
                          <button onClick={() => onUpdateQuantity(product, -1)} className="w-6 h-6 flex items-center justify-center text-white hover:bg-brand-700 active:bg-brand-800 font-black text-xs">−</button>
                          <span className="w-6 text-center text-xs font-black text-white bg-brand-700/70 py-0.5">{quantity}</span>
                          <button onClick={() => onUpdateQuantity(product, 1)} className="w-6 h-6 flex items-center justify-center text-white hover:bg-brand-700 active:bg-brand-800 font-black text-xs">+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <form onSubmit={handleCheckout} className="pt-4 space-y-3">
                  <input type="text" name="b_address" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
                  
                  <div>
                    <input type="text" placeholder={t.nameLabel} value={customerName} onChange={(e) => setCustomerName(e.target.value)} className={`w-full text-xs p-2.5 rounded-lg border bg-white dark:bg-slate-800 dark:text-white ${formErrors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700'}`} required />
                  </div>
                  <div>
                    <input type="tel" placeholder={t.phoneLabel} value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className={`w-full text-xs p-2.5 rounded-lg border bg-white dark:bg-slate-800 dark:text-white ${formErrors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700'}`} required />
                  </div>
                  <div>
                    <textarea rows="2" placeholder={t.addressLabel} value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className={`w-full text-xs p-2.5 rounded-lg border bg-white dark:bg-slate-800 dark:text-white ${formErrors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700'}`} required></textarea>
                  </div>
                  <div>
                    <input type="text" placeholder={t.notesLabel} value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white" />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Pricing & CTA */}
          {items.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 p-4 space-y-3">
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span className="font-bold text-slate-800 dark:text-white">{subtotal} {currencyLabel}</span>
                </div>
                <div className="flex justify-between items-center bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 px-2 py-1.5 rounded-md font-semibold">
                  <span>{t.deliveryFee}</span>
                  <span className="font-extrabold text-brand-700 dark:text-brand-400">+{deliveryFee} {currencyLabel}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span>{t.grandTotal}</span>
                  <span className="text-base text-brand-700 dark:text-brand-400">{grandTotal} {currencyLabel}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>{t.confirmOrder}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

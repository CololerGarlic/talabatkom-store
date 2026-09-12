import '../styles/globals.css';
import { useState, useEffect, createContext, useContext } from 'react';
import Script from 'next/script';
import { TRANSLATIONS } from '../lib/translations';

export const CartContext = createContext();
export const LanguageContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function useLanguage() {
  return useContext(LanguageContext);
}

function detectDeviceLanguage() {
  if (typeof window === 'undefined') return 'tr';
  try {
    const saved = localStorage.getItem('talabatkom_lang');
    if (saved && ['ar', 'en', 'tr'].includes(saved)) {
      return saved;
    }

    const browserLangs = navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || ''];

    for (const raw of browserLangs) {
      if (!raw) continue;
      const code = raw.toLowerCase().split('-')[0];
      if (code === 'tr') return 'tr';
      if (code === 'ar') return 'ar';
      if (code === 'en') return 'en';
    }
  } catch (e) {}
  return 'tr'; // Default to Turkish for users in Turkey
}

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lang, setLangState] = useState('tr');

  useEffect(() => {
    const detected = detectDeviceLanguage();
    setLangState(detected);
    document.documentElement.setAttribute('lang', detected);
    document.documentElement.setAttribute('dir', TRANSLATIONS[detected]?.dir || (detected === 'ar' ? 'rtl' : 'ltr'));
  }, []);

  const setLang = (newLang) => {
    setLangState(newLang);
    try {
      localStorage.setItem('talabatkom_lang', newLang);
      document.documentElement.setAttribute('lang', newLang);
      document.documentElement.setAttribute('dir', TRANSLATIONS[newLang]?.dir || (newLang === 'ar' ? 'rtl' : 'ltr'));
    } catch (e) {}
  };

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('talabatkom_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {}
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    try {
      localStorage.setItem('talabatkom_cart', JSON.stringify(newCart));
    } catch (e) {}
  };

  const addToCart = (product, delta = 1) => {
    const currentItem = cart[product.id];
    const currentQty = currentItem ? currentItem.quantity : 0;
    const newQty = currentQty + delta;

    const newCart = { ...cart };
    if (newQty <= 0) {
      delete newCart[product.id];
    } else {
      newCart[product.id] = { product, quantity: newQty };
    }
    updateCart(newCart);
  };

  const clearCart = () => {
    updateCart({});
  };

  const cartTotalCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  const t = TRANSLATIONS[lang] || TRANSLATIONS.tr;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir: t.dir }}>
      <CartContext.Provider value={{
        cart,
        cartTotalCount,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        clearCart
      }}>
        <Component {...pageProps} />
      </CartContext.Provider>
    </LanguageContext.Provider>
  );
}

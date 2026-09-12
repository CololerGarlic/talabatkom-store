export const STORE_CONFIG = {
  storeName: "Talabatkom",
  storeNameEn: "Talabatkom Store",
  tagline: "بقالة الحارة المفضلة - منتجات عربية وتركية طازجة بأفضل الأسعار",
  taglineEn: "Your Favorite Neighborhood Grocery - Fresh Arab & Turkish Products",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905319715833",
  contactPhone: "+90 531 971 58 33",
  currency: "TL",
  currencySymbol: "₺",
  deliveryFee: 100,
  freeDeliveryThreshold: 1000,
  storeAddress: "Büyükçekmece, İstanbul, Türkiye",
  workingHours: "يومياً من 9:00 صباحاً حتى 11:00 مساءً",
  siteUrl: "https://talabatkom.vercel.app",
  logoUrl: 'https://lh3.googleusercontent.com/d/1mujANyzYrKkKgvH4jg5BU7cOKCzVTybB',
  socialLinks: {
    whatsapp: "https://wa.me/905319715833",
    googleMaps: "https://maps.google.com"
  }
};

export const TRANSLATIONS = {
  ar: {
    dir: "rtl",
    tagline: "بقالة الحارة - طلباتك لباب بيتك",
    searchPlaceholder: "ابحث عن منتج (أرز، بهارات، شاي، سمن...)",
    cart: "السلة",
    currency: "ليرة",
    deliveryFeeAmount: "100 ليرة",
    deliveryNotice: "توصيل لباب البيت برسم 100 ليرة فقط",
    directContact: "تواصل مباشر",
    allCategories: "عرض كل الأقسام",
    browseCategory: "تصفح القسم",
    saleBadge: "عروض حصرية 🔥",
    noProducts: "لا توجد منتجات مطابقة",
    subtotal: "المجموع الفرعي:",
    deliveryFee: "🚚 رسوم التوصيل:",
    grandTotal: "المجموع الكلي:",
    cartTitle: "سلة المشتريات",
    emptyCart: "سلتك فارغة حالياً",
    nameLabel: "الاسم الكريم *",
    phoneLabel: "رقم الهاتف للتواصل *",
    addressLabel: "العنوان بالتفصيل (الحي، الشارع، البناء) *",
    notesLabel: "ملاحظات إضافية (اختياري)",
    confirmOrder: "📱 تأكيد وإرسال الطلب عبر واتساب",
    mobileOrder: "عرض السلة وتأكيد الطلب",
    mobileOrderButton: "إتمام الطلب ←",
    validationAlert: "يرجى ملء الاسم ورقم الهاتف وعنوان التوصيل بالتفصيل",
    cookieNotice: "🍪 نستخدم ملفات تعريف الارتباط الأساسية لحفظ سلة مشترياتك وتفضيلاتك وفقاً لقانون حماية البيانات الشخصية (KVKK).",
    readPrivacy: "قراءة سياسة الخصوصية",
    accept: "موافق",
    close: "إغلاق",
    contactTitle: "التواصل وساعات العمل",
    hours: "🕒 يومياً من 9:00 صباحاً حتى 11:00 مساءً",
    address: "📍 Büyükçekmece, İstanbul, Türkiye",
    legalTitle: "الروابط القانونية والخصوصية",
    privacyLink: "سياسة الخصوصية (Privacy Policy)",
    termsLink: "الشروط والأحكام (Terms of Service)",
    footerTagline: "بقالة الحارة - طلباتك لباب بيتك | توصيل 100 ليرة فقط",
    builtBy: "تم تصميم وتطوير الموقع بواسطة",
    copyright: "جميع الحقوق محفوظة.",
    webDevTitle: "هل ترغب في إنشاء متجر أو موقع إلكتروني احترافي لعملك؟",
    webDevDesc: "نصمم ونطور مواقع ومتاجر إلكترونية عصرية وفائقة السرعة لتنمية أعمالك.",
    webDevBtn: "تواصل مع محمد نور حجازي ←",
    privacyModalTitle: "📄 سياسة الخصوصية وحماية البيانات الشخصية (KVKK)",
    privacySections: [
      {
        title: "1. التزامنا بالخصوصية",
        text: "نلتزم في متجر طلباتكم بأعلى معايير الأمان والشفافية في التعامل مع بياناتكم الشخصية وفقاً لقانون حماية البيانات الشخصية رقم 6698 (KVKK) في الجمهورية التركية."
      },
      {
        title: "2. البيانات المطلوبة لإتمام طلب التوصيل",
        text: "عند إرسال طلب عبر السلة، يطلب منك فقط: الاسم، رقم الهاتف، وعنوان التوصيل. تستخدم هذه المعلومات حصرياً لتجهيز سلة مشترياتك وتوصيلها والتواصل المباشر معك عبر واتساب لتأكيد وصول المندوب وقيمة الفاتورة (شاملاً رسوم التوصيل 100 ليرة)."
      },
      {
        title: "3. عدم مشاركة البيانات",
        text: "نحن لا نشارك ولا نبيع أي معلومات شخصية تخصك لأي جهة إعلانية أو أطراف خارجية إطلاقاً."
      },
      {
        title: "4. ملفات تعريف الارتباط (Cookies)",
        text: "يستخدم الموقع التخزين المحلي المؤقت في متصفحك فقط لحفظ محتويات سلتك وتفضيل اللغة والوضع المظلم لضمان تجربة تسوق سريعة ومريحة."
      }
    ],
    modalClose: "إغلاق ومتابعة التسوق"
  },
  en: {
    dir: "ltr",
    tagline: "Neighborhood Grocery - Delivered to your door",
    searchPlaceholder: "Search for products (rice, spices, tea, ghee...)",
    cart: "Cart",
    currency: "TL",
    deliveryFeeAmount: "100 TL",
    deliveryNotice: "Doorstep delivery flat fee: 100 TL",
    directContact: "Direct Chat",
    allCategories: "View All Categories",
    browseCategory: "Browse Category",
    saleBadge: "Special Offers 🔥",
    noProducts: "No matching products found",
    subtotal: "Subtotal:",
    deliveryFee: "🚚 Delivery Fee:",
    grandTotal: "Grand Total:",
    cartTitle: "Shopping Cart",
    emptyCart: "Your cart is currently empty",
    nameLabel: "Full Name *",
    phoneLabel: "Phone Number *",
    addressLabel: "Delivery Address (District, Street, Building) *",
    notesLabel: "Order Notes (Optional)",
    confirmOrder: "📱 Confirm & Send Order on WhatsApp",
    mobileOrder: "View Cart & Order",
    mobileOrderButton: "Order Now &rarr;",
    validationAlert: "Please fill in your name, phone number, and delivery address",
    cookieNotice: "🍪 We use essential cookies to keep your cart items and language preferences saved in compliance with KVKK / GDPR.",
    readPrivacy: "Read Privacy Policy",
    accept: "Accept",
    close: "Close",
    contactTitle: "Contact & Working Hours",
    hours: "🕒 Daily from 9:00 AM to 11:00 PM",
    address: "📍 Büyükçekmece, Istanbul, Turkey",
    legalTitle: "Legal & Privacy Links",
    privacyLink: "Privacy Policy (KVKK Compliant)",
    termsLink: "Terms of Service",
    footerTagline: "Neighborhood Grocery - Fast delivery 100 TL only",
    builtBy: "Website built by",
    copyright: "All rights reserved.",
    webDevTitle: "Want a custom, modern website or online store for your business?",
    webDevDesc: "We design and develop fast, high-converting websites and e-commerce stores.",
    webDevBtn: "Contact Mohammadnour Hijazi &rarr;",
    privacyModalTitle: "📄 Privacy Policy & Personal Data Protection (KVKK)",
    privacySections: [
      {
        title: "1. Our Privacy Commitment",
        text: "At Talabatkom Store, we are committed to protecting your personal data in accordance with Turkish Law on Protection of Personal Data No. 6698 (KVKK) and international data protection standards."
      },
      {
        title: "2. Information We Collect for Delivery",
        text: "When placing an order, we only request: your name, contact phone number, and delivery address. This information is solely used to prepare, verify, and deliver your groceries, and communicate delivery details with you directly via WhatsApp."
      },
      {
        title: "3. No Third-Party Sharing",
        text: "We never sell, rent, or share your contact or address details with third-party advertisers or external marketing companies."
      },
      {
        title: "4. Essential Cookies & Local Storage",
        text: "Our website uses local storage purely to remember your cart items, language preference, and theme mode so you don't lose your shopping list."
      }
    ],
    modalClose: "Close and continue shopping"
  },
  tr: {
    dir: "ltr",
    tagline: "Mahallenizin Bakkalı - Kapınıza Kadar Teslimat",
    searchPlaceholder: "Ürün ara (pirinç, baharat, çay, tereyağı...)",
    cart: "Sepete",
    currency: "TL",
    deliveryFeeAmount: "100 TL",
    deliveryNotice: "Kapıya sabit teslimat ücreti: 100 TL",
    directContact: "Canlı İletişim",
    allCategories: "Tüm Kategorileri Gör",
    browseCategory: "Kategoriyi İncele",
    saleBadge: "Özel Fırsatlar 🔥",
    noProducts: "Eşleşen ürün bulunamadı",
    subtotal: "Ara Toplam:",
    deliveryFee: "🚚 Teslimat Ücreti:",
    grandTotal: "Genel Toplam:",
    cartTitle: "Sepetiniz (Sepete)",
    emptyCart: "Sepetiniz şu anda boş",
    nameLabel: "Adınız ve Soyadınız *",
    phoneLabel: "İletişim Telefon Numarası *",
    addressLabel: "Açık Teslimat Adresi (Mahalle, Cadde, Bina No) *",
    notesLabel: "Sipariş Notu (İsteğe bağlı)",
    confirmOrder: "📱 Siparişi WhatsApp ile Onayla ve Gönder",
    mobileOrder: "Sepete Git ve Siparişi Tamamla",
    mobileOrderButton: "Sepete Git &rarr;",
    validationAlert: "Lütfen adınızı, telefon numaranızı ve teslimat adresinizi eksiksiz doldurunuz",
    cookieNotice: "🍪 Sepetinizi, dil ve tema tercihlerinizi hatırlamak için KVKK uyumlu temel çerezleri kullanıyoruz.",
    readPrivacy: "Gizlilik Politikasını Oku",
    accept: "Kabul Et",
    close: "Kapat",
    contactTitle: "İletişim ve Çalışma Saatleri",
    hours: "🕒 Her gün 09:00 - 23:00 arası",
    address: "📍 Büyükçekmece, İstanbul, Türkiye",
    legalTitle: "Yasal Bilgiler ve Gizlilik",
    privacyLink: "Gizlilik Politikası (KVKK Uyumlu)",
    termsLink: "Kullanım Koşulları",
    footerTagline: "Mahallenizin Bakkalı - Sabit teslimat ücreti 100 TL",
    builtBy: "Web sitesi tasarımı:",
    copyright: "Tüm hakları saklıdır.",
    webDevTitle: "İşletmeniz için modern ve hızlı bir web sitesi ister misiniz?",
    webDevDesc: "İşinizi büyütmek için özel, modern ve mobil uyumlu e-ticaret siteleri tasarlıyoruz.",
    webDevBtn: "Mohammadnour Hijazi ile İletişime Geçin &rarr;",
    privacyModalTitle: "📄 Gizlilik ve Kişisel Verilerin Korunması Politikası (KVKK)",
    privacySections: [
      {
        title: "1. Gizlilik Taahhüdümüz",
        text: "Talabatkom Mağazası olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca müşterilerimizin kişisel verilerinin gizliliğine ve güvenliğine en üst düzeyde önem veriyoruz."
      },
      {
        title: "2. Sipariş İçin Toplanan Veriler",
        text: "Siparişinizi oluştururken yalnızca: Adınız ve Soyadınız, İletişim Telefon Numaranız ve Açık Teslimat Adresiniz talep edilir. Bu bilgiler sadece siparişinizin eksiksiz hazırlanması, kuryemiz tarafından adresinize ulaştırılması ve WhatsApp üzerinden teslimat onayı için kullanılır."
      },
      {
        title: "3. Veri Paylaşımı Yapılmaz",
        text: "Kişisel verileriniz hiçbir reklam ajansı, veri komisyoncusu veya üçüncü taraf kuruluşla asla paylaşılmaz ve satılmaz."
      },
      {
        title: "4. Temel Çerezler ve Yerel Bellek",
        text: "Web sitemiz, sepet içeriğinizi, dil seçiminizi ve gece/gündüz modunu tarayıcınızda hatırlamak amacıyla yalnızca gerekli yerel depolama özelliklerini kullanır."
      }
    ],
    modalClose: "Kapat ve alışverişe devam et"
  }
};

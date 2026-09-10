import Head from 'next/head';
import { STORE_CONFIG } from '../lib/config';

export default function SEO({ 
  title, 
  description, 
  canonical, 
  ogImage = '/og-image.svg',
  ogType = 'website'
}) {
  const pageTitle = title ? `${title} | ${STORE_CONFIG.storeName}` : `${STORE_CONFIG.storeName} - ${STORE_CONFIG.tagline}`;
  const pageDescription = description || STORE_CONFIG.tagline;
  const pageUrl = canonical ? `${STORE_CONFIG.siteUrl}${canonical}` : STORE_CONFIG.siteUrl;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "GroceryStore",
    "name": STORE_CONFIG.storeName,
    "description": STORE_CONFIG.tagline,
    "url": STORE_CONFIG.siteUrl,
    "telephone": STORE_CONFIG.contactPhone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Büyükçekmece",
      "addressRegion": "İstanbul",
      "addressCountry": "TR"
    },
    "priceRange": "₺₺",
    "openingHours": "Mo-Su 09:00-23:00"
  };

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={pageUrl} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={`${STORE_CONFIG.siteUrl}${ogImage}`} />
      <meta property="og:site_name" content={STORE_CONFIG.storeName} />
      <meta property="og:locale" content="ar_AR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${STORE_CONFIG.siteUrl}${ogImage}`} />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </Head>
  );
}

import { useHead, useSeoMeta } from '@unhead/vue'

export const siteUrl = 'https://praca.zgrana.pl'
export const siteName = 'PracaNaRękę'

const pages = {
  home: { path: '/', title: 'Kalkulatory wynagrodzeń — brutto netto UoP i B2B | PracaNaRękę', description: 'Sprawdź wynagrodzenie netto na umowie o pracę i B2B. Skorzystaj z kalkulatora brutto netto oraz porównaj, co bardziej się opłaca.', image: '/og/praca.svg' },
  uop: { path: '/ile-na-reke-uop', title: 'Kalkulator wynagrodzenia UoP — ile na rękę z brutto? | PracaNaRękę', description: 'Oblicz wynagrodzenie netto z umowy o pracę. Sprawdź składki ZUS, składkę zdrowotną, zaliczkę PIT, koszt pracodawcy i roczne wynagrodzenie.', image: '/og/praca.svg' },
  b2b: { path: '/ile-na-reke-b2b', title: 'Kalkulator B2B — ile zostaje na rękę z faktury? | PracaNaRękę', description: 'Oblicz dochód na rękę z faktury B2B. Porównaj skalę podatkową, podatek liniowy i ryczałt oraz uwzględnij koszty i składki ZUS.', image: '/og/praca.svg' },
  comparison: { path: '/b2b-vs-uop', title: 'B2B czy UoP — kalkulator porównania wynagrodzeń | PracaNaRękę', description: 'Porównaj wynagrodzenie netto na umowie o pracę i B2B. Zobacz miesięczną i roczną różnicę po podatkach, kosztach i składkach.', image: '/og/praca.svg' },
  privacy: { path: '/polityka-prywatnosci', title: 'Polityka prywatności | PracaNaRękę', description: 'Informacje o danych technicznych, kalkulatorach, PWA, plikach cookie i zasadach prywatności w serwisie PracaNaRękę.', image: '/og/praca.svg' },
} as const

export type SeoPageKey = keyof typeof pages
type JsonLd = Record<string, unknown>

export function usePageSeo(key: SeoPageKey, structuredData: JsonLd) {
  const page = pages[key]
  const canonicalUrl = new URL(page.path, siteUrl).href
  const image = new URL(page.image, siteUrl).href
  useSeoMeta({ title: page.title, description: page.description, robots: 'index,follow,max-image-preview:large', ogTitle: page.title, ogDescription: page.description, ogType: 'website', ogUrl: canonicalUrl, ogSiteName: siteName, ogLocale: 'pl_PL', ogImage: image, ogImageAlt: page.title, ogImageWidth: '1200', ogImageHeight: '630', twitterCard: 'summary_large_image', twitterTitle: page.title, twitterDescription: page.description, twitterImage: image })
  useHead({ link: [{ rel: 'canonical', href: canonicalUrl }], script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(structuredData).replace(/</g, '\\u003c') }] })
}

export function softwareSchema(name: string, description: string, path: string, faq: { question: string; answer: string }[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': 'SoftwareApplication', name, description, url: `${siteUrl}${path}`, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', inLanguage: 'pl-PL', offers: { '@type': 'Offer', price: '0', priceCurrency: 'PLN' }, publisher: { '@type': 'Organization', name: siteName, url: siteUrl } },
    { '@type': 'FAQPage', mainEntity: faq.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ] }
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

/* ─── Structured Data ──────────────────────────────────────────────────── */

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['RealEstateAgent', 'LocalBusiness'],
      '@id': 'https://canyon-advisors.com/#business',
      name: 'Canyon Advisors',
      alternateName: 'Canyon Advisors Real Estate',
      description:
        'Canyon Advisors is a woman-owned, family-run fix-and-flip and lease-option real estate firm founded in Phoenix in 1993 — and the parent company of Canyon Markets, Canyon Apts, and Canyon Cleaners.',
      url: 'https://canyon-advisors.com',
      email: 'info@canyon-advisors.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://canyon-advisors.com/logo.png',
      },
      foundingDate: '1993',
      foundingLocation: {
        '@type': 'Place',
        name: 'Phoenix, Arizona',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Phoenix',
        addressRegion: 'AZ',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 33.4484,
        longitude: -112.074,
      },
      areaServed: [
        { '@type': 'City', name: 'Phoenix',  sameAs: 'https://www.wikidata.org/wiki/Q16556'  },
        { '@type': 'City', name: 'Tempe'    },
        { '@type': 'City', name: 'Mesa'     },
        { '@type': 'City', name: 'Chandler' },
        { '@type': 'City', name: 'Gilbert'  },
        { '@type': 'City', name: 'Birmingham' },
        { '@type': 'AdministrativeArea', name: 'United States', sameAs: 'https://www.wikidata.org/wiki/Q30' },
      ],
      knowsAbout: [
        'Fix and Flip Real Estate',
        'Off-Market Property Sourcing',
        'Lease-Option Agreements',
        '1031 Exchange',
        'Private Lending',
      ],
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: 7,
      },
      subOrganization: [
        {
          '@type': 'LocalBusiness',
          name: 'Canyon Markets',
          url: 'https://canyon-markets.com',
          description: 'Micro-market installation and break room services for Phoenix-area workplaces.',
        },
        {
          '@type': 'ApartmentComplex',
          name: 'Canyon Apts',
          url: 'https://canyon-apts.com',
          description: 'Furnished short-term apartment rentals in the Phoenix metro. No credit check required.',
        },
        {
          '@type': 'LocalBusiness',
          name: 'Canyon Cleaners',
          url: 'https://cleaners.canyon-advisors.com',
          description: 'Woman-owned cleaning company serving the Phoenix metro — short-term rental turnovers, corporate housing, and commercial cleaning.',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Real Estate Services',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Fix & Flip',
            description: 'Acquisition, renovation, and resale of undervalued and distressed properties in the Phoenix metro.',
          },
          {
            '@type': 'Offer',
            name: 'Lease-Option / Rent-to-Own',
            description: 'Structured lease-to-own agreements helping families build toward homeownership.',
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://canyon-advisors.com/#website',
      url: 'https://canyon-advisors.com',
      name: 'Canyon Advisors',
      description: 'Woman-owned, family-run fix-and-flip and lease-option real estate firm. Founded 1993, Phoenix AZ.',
      publisher: { '@id': 'https://canyon-advisors.com/#business' },
      inLanguage: 'en-US',
    },
  ],
};

/* ─── Page Metadata ────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: 'Canyon Advisors | Real Estate, Micro-Markets & Cleaning | Phoenix AZ | Est. 1993',
    template: '%s | Canyon Advisors',
  },
  description:
    'Canyon Advisors is a woman-owned, family-run Phoenix real estate firm — fix-and-flip and lease-option properties — and the parent company of Canyon Markets, Canyon Apts, and Canyon Cleaners.',
  keywords: [
    'fix and flip Phoenix AZ',
    'fix and flip investor Phoenix',
    'rent to own homes Phoenix',
    'lease option homes Phoenix AZ',
    'off-market property sourcing Phoenix',
    'lease option program Phoenix AZ',
    '1031 exchange consulting Phoenix',
    'family owned real estate company Phoenix',
    'woman owned business Phoenix',
    'family owned company Phoenix',
    'workplace micro-markets Phoenix',
    'commercial cleaning company Phoenix',
  ],
  authors: [{ name: 'Canyon Advisors', url: 'https://canyon-advisors.com' }],
  metadataBase: new URL('https://canyon-advisors.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://canyon-advisors.com',
    siteName: 'Canyon Advisors',
    title: 'Canyon Advisors | Real Estate, Micro-Markets & Cleaning | Est. 1993',
    description:
      'Canyon Advisors is a woman-owned, family-run Phoenix real estate firm — fix-and-flip and lease-option properties — and the parent company of Canyon Markets, Canyon Apts, and Canyon Cleaners.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Canyon Advisors — Woman-Owned Family of Companies | Phoenix AZ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canyon Advisors | Real Estate, Micro-Markets & Cleaning | Est. 1993',
    description:
      'Canyon Advisors is a woman-owned, family-run Phoenix real estate firm — fix-and-flip and lease-option properties — and the parent company of Canyon Markets, Canyon Apts, and Canyon Cleaners.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'geo.region':    'US-AZ',
    'geo.placename': 'Phoenix, Arizona',
    'geo.position':  '33.4484;-112.0740',
    'ICBM':          '33.4484, -112.0740',
  },
};

/* ─── Root Layout ──────────────────────────────────────────────────────── */

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

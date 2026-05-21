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
        'Canyon Advisors is a family-owned real estate consulting, investment, and management firm founded in Phoenix in 1993. We serve investors, property owners, and families across Arizona, Texas, and Tennessee.',
      url: 'https://canyon-advisors.com',
      email: 'info@canyon-markets.com',
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
        { '@type': 'City', name: 'Dallas',   sameAs: 'https://www.wikidata.org/wiki/Q16557'  },
        { '@type': 'City', name: 'Memphis',  sameAs: 'https://www.wikidata.org/wiki/Q40826'  },
        { '@type': 'AdministrativeArea', name: 'United States', sameAs: 'https://www.wikidata.org/wiki/Q30' },
      ],
      knowsAbout: [
        'Real Estate Investment Consulting',
        'Off-Market Property Sourcing',
        'Lease-Option Agreements',
        '1031 Exchange',
        'Corporate Housing',
        'Private Lending',
        'Real Estate Asset Management',
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
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Real Estate Advisory Services',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Investment Consulting',
            description: 'Property sourcing, strategic planning, private funding contacts, and 1031 exchange consulting for real estate investors.',
          },
          {
            '@type': 'Offer',
            name: 'Lease-Option Program',
            description: 'Structured lease-to-own agreements helping families build toward homeownership.',
          },
          {
            '@type': 'Offer',
            name: 'Corporate Housing Partnership',
            description: 'Master lease partnerships with property owners to convert vacant units into furnished corporate rentals.',
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://canyon-advisors.com/#website',
      url: 'https://canyon-advisors.com',
      name: 'Canyon Advisors',
      description: 'Family-owned real estate consulting, investment, and management firm. Founded 1993, Phoenix AZ.',
      publisher: { '@id': 'https://canyon-advisors.com/#business' },
      inLanguage: 'en-US',
    },
  ],
};

/* ─── Page Metadata ────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  title: {
    default: 'Canyon Advisors | Real Estate Consulting & Investment | Phoenix AZ | Est. 1993',
    template: '%s | Canyon Advisors',
  },
  description:
    'Canyon Advisors is a family-owned real estate consulting, investment, and management firm serving clients in Phoenix, Dallas, and Memphis since 1993. Investment consulting, lease-option programs, and corporate housing.',
  keywords: [
    'real estate consulting Phoenix AZ',
    'real estate investment advisor Phoenix',
    'off-market property sourcing Phoenix',
    'lease option program Phoenix AZ',
    'real estate consulting firm Arizona',
    '1031 exchange consulting Phoenix',
    'corporate housing advisory Phoenix',
    'real estate investment consulting Dallas TX',
    'real estate investment consulting Memphis TN',
    'family owned real estate company Phoenix',
    'private real estate consulting firm',
    'real estate asset management Phoenix AZ',
  ],
  authors: [{ name: 'Canyon Advisors', url: 'https://canyon-advisors.com' }],
  metadataBase: new URL('https://canyon-advisors.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://canyon-advisors.com',
    siteName: 'Canyon Advisors',
    title: 'Canyon Advisors | Real Estate Consulting & Investment | Est. 1993',
    description:
      'A family-owned real estate consulting, investment, and management firm. Investment consulting, lease-option programs, and corporate housing across Phoenix, Dallas, and Memphis.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Canyon Advisors — Real Estate Consulting Phoenix AZ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canyon Advisors | Real Estate Consulting & Investment | Est. 1993',
    description: 'Family-owned real estate consulting, investment, and management firm. Phoenix · Dallas · Memphis. Founded 1993.',
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

import type { Metadata } from 'next';
import { GameProvider } from '@/context/GameContext';
import './globals.css';

const BASE_URL = 'https://oneclic.inkart.fr';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'OneClic – Jeu de Clicker Pirate Gratuit',
    template: '%s | OneClic',
  },
  description:
    'OneClic est un jeu de clicker pirate gratuit en ligne. Cliquez, pilllez, recrutez votre équipage et devenez le roi des pirates ! Jouez maintenant sans téléchargement.',
  keywords: [
    'jeu de clicker',
    'clicker game',
    'jeu clicker gratuit',
    'clicker pirate',
    'jeu pirate en ligne',
    'idle game',
    'jeu incrémental',
    'jeu navigateur',
    'OneClic',
    'jeu de clic',
    'incremental game français',
    'jeu sans téléchargement',
  ],
  authors: [{ name: 'OneClic' }],
  creator: 'OneClic',
  publisher: 'OneClic',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'OneClic',
    title: 'OneClic – Jeu de Clicker Pirate Gratuit',
    description:
      'Cliquez, pillez et recrutez votre équipage dans ce jeu de clicker pirate gratuit ! Devenez le roi des pirates.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'OneClic – Jeu de Clicker Pirate',
      },
    ],
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneClic – Jeu de Clicker Pirate Gratuit',
    description:
      'Cliquez, pillez et recrutez votre équipage dans ce jeu de clicker pirate gratuit !',
    images: [`${BASE_URL}/og-image.png`],
  },
  category: 'game',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'OneClic',
    description:
      'OneClic est un jeu de clicker pirate gratuit en ligne. Cliquez, pillez, recrutez votre équipage et devenez le roi des pirates !',
    url: BASE_URL,
    image: `${BASE_URL}/og-image.png`,
    genre: ['Clicker', 'Idle Game', 'Pirate', 'Incrémental'],
    gamePlatform: 'Web Browser',
    operatingSystem: 'Any',
    applicationCategory: 'Game',
    inLanguage: 'fr',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    author: {
      '@type': 'Organization',
      name: 'OneClic',
      url: BASE_URL,
    },
    keywords:
      'jeu de clicker, clicker game, jeu pirate, idle game, jeu incrémental, jeu navigateur gratuit',
  };

  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white antialiased overflow-hidden select-none">
        <GameProvider>
          {children}
        </GameProvider>
      </body>
    </html>
  );
}

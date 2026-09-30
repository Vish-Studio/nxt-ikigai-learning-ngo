import type { Metadata } from 'next';
import { Poppins, Cormorant_Garamond } from 'next/font/google';
import { CookieConsent } from '@/components/CookieConsent/CookieConsent';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Ikigai | Free Education NGO',
  description: 'Providing free education to financially struggling students.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth overflow-x-clip ${poppins.variable} ${cormorantGaramond.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" rel="stylesheet" />

        <link rel="icon" href="/assets/logo.jpeg" />
      </head>
      <body className="font-sans bg-ikigai-bg text-ikigai-dark antialiased overflow-x-clip selection:bg-ikigai-accent/20 selection:text-ikigai-dark">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}

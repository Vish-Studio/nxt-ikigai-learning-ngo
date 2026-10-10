'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import MobileNav from '@/components/Header/MobileNav';

export default function NotFound() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div data-page="not-found" className="min-h-screen bg-ikigai-bg flex flex-col font-sans text-ikigai-dark">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      {mobileMenuOpen && <MobileNav onClose={() => setMobileMenuOpen(false)} />}

      <main className="flex-grow px-6 pb-20 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        <div className="mx-auto flex min-h-[64vh] max-w-4xl flex-col items-center justify-center text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-ikigai-accent">Error 404</p>

          <div className="my-8 h-px w-24 bg-ikigai-accent/40" />

          <h1 className="font-serif text-4xl font-medium leading-tight text-ikigai-dark sm:text-5xl lg:text-6xl">
            This page is not available.
          </h1>

          <p className="mt-6 max-w-2xl text-base font-light leading-8 text-ikigai-muted sm:text-lg">
            The link may have changed or the page may no longer exist. Return home or contact Ikigai and we will help
            you find the right information.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button href="/" variant="accent">
              Back Home
            </Button>
            <Button href="/#contact" variant="outlined">
              Contact Us
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

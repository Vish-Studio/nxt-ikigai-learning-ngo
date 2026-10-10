'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@/components/Button';
import { getConsent, onConsentBannerOpen, setConsent, type ConsentValue } from '@/lib/consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (getConsent() === null) setVisible(true);
    }, 0);
    const unsubscribe = onConsentBannerOpen(() => setVisible(true));
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const choose = (value: ConsentValue) => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-x-4 bottom-4 z-50 md:inset-x-auto md:left-6 md:bottom-6 md:max-w-md rounded-[1.5rem] border border-ikigai-dark/10 bg-ikigai-bg p-6 shadow-xl"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-ikigai-accent mb-3">Cookies</p>
          <p className="text-sm leading-relaxed text-ikigai-muted mb-6">
            We use analytics cookies to understand how visitors use our site and improve our work. You can accept or
            decline them.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="accent" className="!px-8 !py-3" onClick={() => choose('granted')}>
              Accept
            </Button>
            <Button variant="outlined" className="!px-8 !py-3" onClick={() => choose('denied')}>
              Decline
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

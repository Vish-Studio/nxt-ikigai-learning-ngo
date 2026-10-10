'use client';

import { useEffect, useRef, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { getConsent, onConsentChange } from '@/lib/consent';
import { GA_ID, trackEvent, type EventParams } from '@/lib/analytics';

function describeLink(link: HTMLAnchorElement): { name: string; params: EventParams } | null {
  const href = link.getAttribute('href') ?? '';
  const label = (link.getAttribute('aria-label') || link.textContent || '').trim().slice(0, 100);

  if (href.startsWith('mailto:')) return { name: 'email_click', params: { link_text: label } };
  if (href.startsWith('tel:')) return { name: 'phone_click', params: { link_text: label } };

  if (/^\/?#[\w-]+/.test(href)) {
    return { name: 'cta_click', params: { link_url: href, link_text: label } };
  }

  if (/^https?:\/\//.test(href) && new URL(href).origin !== window.location.origin) {
    return { name: 'outbound_click', params: { link_url: href, link_text: label } };
  }
  return null;
}

export function Analytics() {
  const [granted, setGranted] = useState(false);
  const acceptedNow = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setGranted(getConsent() === 'granted'), 0);
    const unsubscribe = onConsentChange((value) => {
      acceptedNow.current = value === 'granted';
      setGranted(value === 'granted');
    });
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!granted) return;

    // One delegated listener covers every mailto, tel and outbound link on the site.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.('a');
      if (!link) return;
      const event = describeLink(link);
      if (event) trackEvent(event.name, event.params);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [granted]);

  // Declines can't be counted: GA is never loaded without consent.
  useEffect(() => {
    if (granted && acceptedNow.current) {
      acceptedNow.current = false;
      trackEvent('consent_choice', { choice: 'granted' });
    }
  }, [granted]);

  useEffect(() => {
    if (!granted || !document.querySelector('[data-page="not-found"]')) return;
    trackEvent('404_view', { page_path: window.location.pathname, referrer: document.referrer });
  }, [granted]);

  useEffect(() => {
    if (!granted) return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (!entry.isIntersecting || seen.has(id)) return;
          seen.add(id);
          trackEvent('section_view', { section_id: id });
        });
      },
      { threshold: 0.4 },
    );

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [granted]);

  if (!GA_ID || !granted) return null;
  return <GoogleAnalytics gaId={GA_ID} />;
}

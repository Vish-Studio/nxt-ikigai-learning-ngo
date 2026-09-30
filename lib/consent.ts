export type ConsentValue = 'granted' | 'denied';

const STORAGE_KEY = 'ikigai-consent';
const CHANGE_EVENT = 'ikigai-consent-change';
const OPEN_EVENT = 'ikigai-consent-open';

export function getConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage unavailable: the choice only lasts for this page view.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: value }));
}

export function onConsentChange(callback: (value: ConsentValue) => void) {
  const handler = (e: Event) => callback((e as CustomEvent<ConsentValue>).detail);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

export function openConsentBanner() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentBannerOpen(callback: () => void) {
  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
}

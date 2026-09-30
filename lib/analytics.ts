import { sendGAEvent } from '@next/third-parties/google';
import { getConsent } from '@/lib/consent';

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export type EventParams = Record<string, string | number | boolean>;

export function trackEvent(name: string, params: EventParams = {}) {
  if (!GA_ID || getConsent() !== 'granted') return;
  sendGAEvent('event', name, params);
}

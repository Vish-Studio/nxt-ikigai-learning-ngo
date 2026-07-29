"use client";

import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/Button';
import { navItems } from '@/lib/data';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import siteData from '../../data/site-data.json';
import Logo from '../logo/logo';

export default function MobileNav({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="lg:hidden bg-ikigai-bg fixed inset-0 z-[59] flex flex-col px-6 md:px-8 overflow-hidden"
      style={{ top: 'var(--header-height, 5rem)' }}
    >
      {/* Content area - Immersive Experience */}
      <div className="flex-1 flex flex-col pt-16 pb-12 relative overflow-hidden backdrop-blur-xl">
        {/* Animated Background Mesh - Dynamic elegance */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-ikigai-accent/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-24 -left-24 w-64 h-64 bg-ikigai-accent/5 rounded-full blur-[80px]" />
        </div>

        {/* Navigation - Hero Centered Layout */}
        <nav className="relative z-10 px-8 flex-1 flex flex-col justify-center">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.1 + index * 0.1,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <a
                  href={item.href}
                  onClick={onClose}
                  className="group block relative py-5 text-center transition-all duration-700"
                >
                  <div className="overflow-hidden">
                    <span className="block text-4xl md:text-5xl font-serif text-ikigai-dark font-medium group-hover:text-ikigai-accent transition-all duration-700 italic tracking-tight">
                      {item.name}
                    </span>
                  </div>

                  {/* Floating Number Reveal */}
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.5em] text-ikigai-dark/10 group-hover:text-ikigai-accent group-hover:-top-2 transition-all duration-500">
                    0{index + 1}
                  </span>

                  {/* Sophisticated underlining */}
                  <div className="mt-2 mx-auto w-0 h-[1px] bg-ikigai-accent transition-all duration-700 ease-in-out group-hover:w-16" />
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Action Section - Refined Composition */}
        <div className="px-8 space-y-12 relative z-10">
          {/* Luxury CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              className='w-full'
              href={(siteData as any).phone.href}>
              Book a Call
            </Button>
          </motion.div>

          {/* Socials & Meta composition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col items-center gap-10 border-t border-ikigai-dark/5 pt-12"
          >
            <a href={`mailto:${(siteData as any).email}`} className="text-[10px] font-semibold tracking-widest text-ikigai-dark/40 hover:text-ikigai-accent transition-colors uppercase">
              {(siteData as any).email}
            </a>

            <div className="flex gap-10">
              <SocialLinks variant={2} size={22} />
            </div>


            <div className="flex flex-col items-center gap-2">
              <p className="text-center text-ikigai-dark text-[10px] tracking-[0.2em]">
                &copy; {new Date().getFullYear()} Ikigai. All rights reserved. | Website by
                <a
                  className="text-ikigai-accent hover:text-ikigai-dark transition-all ease-in-out"
                  href={(siteData as any).copyright.href}
                  target="_blank"
                  rel="noopener noreferrer"
                > {(siteData as any).copyright.name}</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

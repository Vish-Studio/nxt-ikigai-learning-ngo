"use client";

import { Button } from '@/components/Button';
import { navItems } from '@/lib/data';
import siteData from '../../data/site-data.json';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import Logo from '../logo/logo';

export function Footer() {
  return (
    <footer className="bg-ikigai-dark pt-24 pb-12 text-ikigai-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-full">
                <Logo />
              </div>
            </div>


            <p className="text-ikigai-bg/60 font-light leading-relaxed max-w-xs">
              Nurturing potential and providing free education to those who need it most. Every child deserves a reason for being.
            </p>
            <div className="flex gap-5">
              <SocialLinks variant={1} size={18} />
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer Navigation">
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-ikigai-accent mb-8">Navigation</h4>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-ikigai-bg/70 hover:text-white transition-colors font-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ikigai-accent">{item.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-ikigai-accent mb-8">Contact</h4>
            <ul className="space-y-4 text-ikigai-bg/70 font-light">
              <li>
                <a href={`mailto:${(siteData as any).email}`} className="flex items-center gap-3 hover:text-white transition-colors" aria-label="Email hello at ikigai ngo">
                  <span className="material-symbols-outlined text-ikigai-accent text-[20px] flex-shrink-0" aria-hidden>mail</span>
                  <span>{(siteData as any).email}</span>
                </a>
              </li>

              <li>
                <a href={(siteData as any).phone.href} className="flex items-center gap-3 hover:text-white transition-colors" aria-label="Call Ikigai">
                  <span className="material-symbols-outlined text-ikigai-accent text-[20px] flex-shrink-0" aria-hidden>call</span>
                  <span>{(siteData as any).phone.display}</span>
                </a>
              </li>

              <li>
                <a
                  href={(siteData as any).mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                  aria-label="Open address in maps"
                >
                  <span className="material-symbols-outlined text-ikigai-accent text-[20px] flex-shrink-0" aria-hidden>place</span>
                  <span>{(siteData as any).address}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter/CTA */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-ikigai-accent mb-8">Our Mission</h4>
            <p className="text-ikigai-bg/70 font-light mb-8">
              Join our community of volunteers, students and supporters.
            </p>
            <Button href={`mailto:${(siteData as any).email}`} variant="white">
              Get Involved
            </Button>
          </div>
        </div>

        <div className="pt-12 border-t border-ikigai-bg/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-center text-ikigai-bg/40 text-[10px] uppercase tracking-[0.2em] md:text-left">
            &copy; {new Date().getFullYear()} Ikigai. All rights reserved. | Website by
            <a
              className="text-ikigai-accent hover:text-white transition-all ease-in-out"
              href={(siteData as any).copyright.href}
              target="_blank"
              rel="noopener noreferrer"
            > {(siteData as any).copyright.name}</a>
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-ikigai-bg/40">
            <a href="#" className="hover:text-ikigai-accent transition-colors focus-visible:text-ikigai-accent focus-visible:outline-none">Privacy Policy</a>
            <a href="#" className="hover:text-ikigai-accent transition-colors focus-visible:text-ikigai-accent focus-visible:outline-none">Terms of Service</a>
            <a href="#" className="hover:text-ikigai-accent transition-colors focus-visible:text-ikigai-accent focus-visible:outline-none">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { trackEvent } from '@/lib/analytics';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  autoScroll?: boolean;
  itemsPerPage?: { mobile: number; tablet: number; desktop: number };
}

export function Carousel<T>({
  items,
  renderItem,
  autoScroll = true,
  itemsPerPage = { mobile: 1, tablet: 3, desktop: 4 },
}: CarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);

  useEffect(() => {
    const update = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) setVisibleItems(itemsPerPage.desktop);
        else if (window.innerWidth >= 768) setVisibleItems(itemsPerPage.tablet);
        else setVisibleItems(itemsPerPage.mobile);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [itemsPerPage]);

  const totalSlides = Math.ceil(items.length / visibleItems);
  const currentSlide = Math.min(Math.round(activeIndex / visibleItems), totalSlides - 1);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth } = scrollRef.current;
        const itemWidth = scrollWidth / items.length;
        const index = Math.round(scrollLeft / itemWidth);
        setActiveIndex(index);
      }
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [items.length]);

  useEffect(() => {
    if (!autoScroll || isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const itemWidth = scrollWidth / items.length;

        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: itemWidth * visibleItems, behavior: 'smooth' });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoScroll, isPaused, items.length, visibleItems]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      trackEvent('carousel_scroll', {
        section_id: scrollRef.current.closest('section')?.id ?? 'unknown',
        direction,
      });
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;

      if (direction === 'right') {
        if (scrollLeft >= maxScroll - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft <= 10) {
          scrollRef.current.scrollTo({ left: maxScroll, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: -clientWidth, behavior: 'smooth' });
        }
      }
    }
  };

  const getWidthClass = () => {
    const { mobile, tablet, desktop } = itemsPerPage;

    let classes = 'flex-shrink-0 snap-start h-full ';

    // Mobile (gap-6 -> 1.5rem)
    if (mobile === 1) classes += 'w-full ';
    else if (mobile === 2) classes += 'w-[calc(50%-0.75rem)] ';
    else if (mobile === 3) classes += 'w-[calc(33.333%-1rem)] ';

    // Tablet (md:gap-8 -> 2rem)
    if (tablet === 1) classes += 'md:w-full ';
    else if (tablet === 2) classes += 'md:w-[calc(50%-1rem)] ';
    else if (tablet === 3) classes += 'md:w-[calc(33.333%-1.333rem)] ';
    else if (tablet === 4) classes += 'md:w-[calc(25%-1.5rem)] ';

    // Desktop (lg:gap-8 -> 2rem)
    if (desktop === 1) classes += 'lg:w-full ';
    else if (desktop === 2) classes += 'lg:w-[calc(50%-1rem)] ';
    else if (desktop === 3) classes += 'lg:w-[calc(33.333%-1.333rem)] ';
    else if (desktop === 4) classes += 'lg:w-[calc(25%-1.5rem)] ';
    else if (desktop === 5) classes += 'lg:w-[calc(20%-1.6rem)] ';

    return classes.trim();
  };

  return (
    <div
      className="relative group/carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex overflow-x-auto pb-8 md:pb-24 hide-scrollbar snap-x snap-mandatory gap-6 md:gap-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <div key={index} className={getWidthClass()}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 1,
                delay: (index % visibleItems) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ cursor: 'pointer', transition: { duration: 0.4, ease: 'easeOut' } }}
              className="h-full"
            >
              {renderItem(item, index)}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center md:absolute md:-bottom-4 md:left-0 md:right-0 md:justify-between items-center gap-8 px-4 md:px-0 mt-4 md:mt-0">
        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-ikigai-dark/10 flex items-center justify-center hover:bg-ikigai-dark hover:text-white transition-all duration-300 active:scale-90 shadow-sm hover:shadow-md"
              aria-label="Previous slide"
            >
              <span className="material-symbols-outlined text-[20px] md:text-[24px]">chevron_left</span>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-ikigai-dark/10 flex items-center justify-center hover:bg-ikigai-dark hover:text-white transition-all duration-300 active:scale-90 shadow-sm hover:shadow-md"
              aria-label="Next slide"
            >
              <span className="material-symbols-outlined text-[20px] md:text-[24px]">chevron_right</span>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black tracking-[0.3em] text-ikigai-dark uppercase w-6 text-right">
              {String(currentSlide + 1).padStart(2, '0')}
            </span>
            <div className="w-16 md:w-24 h-[1px] bg-ikigai-dark/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-ikigai-accent origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: (currentSlide + 1) / totalSlides }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] text-ikigai-dark uppercase opacity-30 w-6">
              {String(totalSlides).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

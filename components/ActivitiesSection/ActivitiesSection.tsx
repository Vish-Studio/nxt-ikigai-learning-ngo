'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/Button';
import { Carousel } from '@/components/Carousel';
import Image from 'next/image';
import { useBasePath } from '@/lib/useBasePath';

export function ActivitiesSection() {
  const [selectedImage, setSelectedImage] = useState<null | {
    title: string;
    image: string;
    description: string;
    category: string;
  }>(null);
  const basePath = useBasePath();

  const activities = useMemo(
    () => [
      {
        title: 'Interactive Learning Sessions',
        image: basePath + '/assets/interactive-class.jpeg',
        description:
          'Our volunteers use engaging and creative teaching methods to make learning enjoyable and meaningful for every student.',
        category: 'Education',
      },
      {
        title: 'Art & Expression',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
        description: 'Creative workshops help children express their emotions and discover hidden talents.',
        category: 'Arts',
      },
      {
        title: 'Community Outreach',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop',
        description: 'We work directly with families to understand their needs and provide holistic support.',
        category: 'Community',
      },
      {
        title: 'Health & Wellness',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop',
        description: 'Regular health checkups and yoga sessions to ensure physical and mental well-being.',
        category: 'Wellness',
      },
      {
        title: 'Outdoor Sports',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop',
        description: 'Building character and physical health through organized team sports and play.',
        category: 'Wellness',
      },
    ],
    [basePath],
  );

  return (
    <section
      id="activities"
      className="py-32 bg-ikigai-bg scroll-mt-20 overflow-hidden"
      aria-labelledby="activities-title"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-7xl mx-auto px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-ikigai-accent mb-6 block">
              What We Do
            </span>
            <h2 id="activities-title" className="text-5xl md:text-6xl font-serif text-ikigai-dark leading-tight">
              A glimpse into our daily <span className="italic">impact.</span>
            </h2>
          </div>
        </div>

        <Carousel
          items={activities}
          itemsPerPage={{ mobile: 1, tablet: 3, desktop: 4 }}
          renderItem={(activity) => (
            <div className="group cursor-pointer h-full flex flex-col" onClick={() => setSelectedImage(activity)}>
              <div className="relative aspect-[4/5] w-full rounded-square-image overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ikigai-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transform scale-50 group-hover:scale-100 transition-transform duration-500">
                    <span className="material-symbols-outlined text-[24px]">open_in_full</span>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest text-ikigai-accent rounded-full shadow-sm">
                    {activity.category}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-serif text-ikigai-dark group-hover:text-ikigai-accent transition-colors mb-2">
                {activity.title}
              </h3>
              <p className="text-sm text-ikigai-muted font-light line-clamp-2">{activity.description}</p>
            </div>
          )}
        />
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-ikigai-dark/95 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full bg-white rounded-square-image overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-ikigai-dark hover:bg-ikigai-surface transition-colors"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>

              <div className="relative w-full md:w-2/3 h-[250px] sm:h-[350px] md:h-[600px] flex-shrink-0">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="w-full md:w-1/3 p-6 md:p-12 flex flex-col justify-center bg-white">
                <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-ikigai-accent mb-4 block">
                  {selectedImage.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif text-ikigai-dark mb-6 leading-tight">
                  {selectedImage.title}
                </h3>
                <p className="text-lg text-ikigai-muted font-light leading-relaxed mb-10">
                  {selectedImage.description}
                </p>
                <Button onClick={() => setSelectedImage(null)} variant="outlined" className="w-full">
                  Close Preview
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

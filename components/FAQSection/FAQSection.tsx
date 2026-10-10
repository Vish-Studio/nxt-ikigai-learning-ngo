'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { faqs } from '@/lib/data';
import { trackEvent } from '@/lib/analytics';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    const opening = openIndex !== index;
    setOpenIndex(opening ? index : null);
    if (opening) trackEvent('faq_open', { question: faqs[index].question.slice(0, 100) });
  };

  return (
    <section id="faq" className="py-32 bg-ikigai-bg scroll-mt-20" aria-labelledby="faq-title">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2
            id="faq-title"
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-ikigai-dark mb-6 tracking-tight"
          >
            Frequently Asked <span className="italic text-ikigai-accent">Questions</span>
          </h2>
          <p className="text-lg text-ikigai-muted font-light max-w-2xl mx-auto">
            Everything you need to know about our mission, how we operate, and how you can get involved.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-ikigai-dark/10 rounded-2xl overflow-hidden bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none"
                aria-expanded={openIndex === index}
              >
                <span className="text-md md:text-[16px] font-medium text-ikigai-dark pr-8">{faq.question}</span>
                <span
                  className={`material-symbols-outlined text-ikigai-accent transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                >
                  expand_more
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-0 text-ikigai-muted font-light leading-relaxed">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

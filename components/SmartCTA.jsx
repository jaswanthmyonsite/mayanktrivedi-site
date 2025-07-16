import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePassport } from '@/context/PassportContext';
import { FiArrowRight } from 'react-icons/fi';

const SmartCTA = () => {
  const { passport } = usePassport();
  const [ctaConfig, setCtaConfig] = useState(null);

  useEffect(() => {
    // Determine CTA based on user behavior
    const visitedPages = passport.visitedPages;
    const timeSpent = passport.timeSpent;

    if (visitedPages.includes('ventures') && !visitedPages.includes('contact')) {
      setCtaConfig({
        text: 'Ready to discuss your venture?',
        buttonText: 'Get in Touch',
        href: '/contact',
      });
    } else if (visitedPages.includes('speaking') && !visitedPages.includes('contact')) {
      setCtaConfig({
        text: 'Interested in booking a speaking engagement?',
        buttonText: 'Request Speaking',
        href: '/contact?subject=speaking',
      });
    } else if (timeSpent > 300 && !visitedPages.includes('about')) {
      setCtaConfig({
        text: 'Want to know more about my journey?',
        buttonText: 'Read My Story',
        href: '/about',
      });
    } else if (visitedPages.length >= 3) {
      setCtaConfig({
        text: "Let's build something together",
        buttonText: 'Start a Conversation',
        href: '/contact',
      });
    }
  }, [passport]);

  if (!ctaConfig) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 right-6 bg-white rounded-lg shadow-lg p-6 max-w-sm z-30"
    >
      <button
        onClick={() => setCtaConfig(null)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        aria-label="Close"
      >
        ×
      </button>
      
      <p className="text-brand-navy font-medium mb-3">{ctaConfig.text}</p>
      
      <Link
        href={ctaConfig.href}
        className="inline-flex items-center text-brand-teal hover:text-brand-teal-light transition-colors duration-300 font-medium"
      >
        {ctaConfig.buttonText}
        <FiArrowRight className="ml-2" />
      </Link>
    </motion.div>
  );
};

export default SmartCTA;

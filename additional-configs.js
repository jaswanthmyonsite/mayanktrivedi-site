// components/EasterEgg.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePassport } from '@/context/PassportContext';

const EasterEgg = () => {
  const [gliderClicks, setGliderClicks] = useState(0);
  const [showGlider, setShowGlider] = useState(false);
  const { addAchievement, ACHIEVEMENTS } = usePassport();

  useEffect(() => {
    // Konami Code easter egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeydown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          activateEasterEgg();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  const activateEasterEgg = () => {
    setShowGlider(true);
    addAchievement(ACHIEVEMENTS.EASTER_EGG_FINDER);
    setTimeout(() => setShowGlider(false), 5000);
  };

  const handleGliderClick = () => {
    setGliderClicks(prev => prev + 1);
    if (gliderClicks === 2) {
      activateEasterEgg();
      setGliderClicks(0);
    }
  };

  return (
    <>
      {/* Hidden Glider Icon */}
      <button
        onClick={handleGliderClick}
        className="fixed bottom-4 left-4 w-8 h-8 opacity-0 hover:opacity-10 transition-opacity duration-300"
        aria-hidden="true"
      >
        ✈️
      </button>

      {/* Easter Egg Animation */}
      <AnimatePresence>
        {showGlider && (
          <motion.div
            initial={{ x: -100, y: 100 }}
            animate={{ 
              x: window.innerWidth + 100,
              y: -100,
              rotate: 15
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5, ease: 'linear' }}
            className="fixed bottom-20 left-0 text-6xl pointer-events-none z-50"
            style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }}
          >
            ✈️
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEgg;

// pages/404.js
import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import AvatarChat from '@/components/AvatarChat';
import { AVATAR_MODES } from '@/utils/constants';

const NotFoundPage = () => {
  return (
    <Layout
      title="404 - Page Not Found"
      description="The page you're looking for doesn't exist."
    >
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream to-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-9xl font-sans font-bold text-brand-navy/20 mb-4">
              404
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-navy mb-4">
              Oops! Page Not Found
            </h2>
            
            <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
              It seems you've ventured into uncharted territory. Even the best explorers 
              sometimes take a wrong turn.
            </p>

            <div className="flex justify-center mb-8">
              <AvatarChat
                mode={AVATAR_MODES.DEFAULT}
                size="medium"
                showChat={false}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="btn-primary inline-flex items-center">
                <FiHome className="mr-2" />
                Go Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn-tertiary inline-flex items-center"
              >
                <FiArrowLeft className="mr-2" />
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

// styles/print.css
@media print {
  /* Hide navigation and interactive elements */
  nav,
  footer,
  button,
  .no-print {
    display: none !important;
  }

  /* Reset backgrounds */
  body {
    background: white !important;
    color: black !important;
  }

  /* Ensure proper page breaks */
  .print-break-before {
    page-break-before: always;
  }

  .print-break-after {
    page-break-after: always;
  }

  .print-avoid-break {
    page-break-inside: avoid;
  }

  /* Optimize text for print */
  * {
    color: black !important;
    background: transparent !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }

  /* Make links visible */
  a[href]:after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: #666;
  }

  /* Optimize images */
  img {
    max-width: 100% !important;
    page-break-inside: avoid;
  }

  /* Headers and content */
  h1, h2, h3, h4, h5, h6 {
    page-break-after: avoid;
    page-break-inside: avoid;
  }

  p, blockquote, ul, ol {
    orphans: 3;
    widows: 3;
  }

  /* Timeline specific */
  .timeline-print {
    display: block !important;
    page-break-inside: avoid;
  }
}

// utils/sitemap.js
const generateSitemap = () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mayanktrivedi.com';
  
  const pages = [
    { url: '/', changefreq: 'monthly', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.9 },
    { url: '/ventures', changefreq: 'monthly', priority: 0.9 },
    { url: '/leadership', changefreq: 'monthly', priority: 0.8 },
    { url: '/makers-heart', changefreq: 'monthly', priority: 0.8 },
    { url: '/speaking', changefreq: 'weekly', priority: 0.8 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return sitemap;
};

export default generateSitemap;

// components/SmartCTA.jsx
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

// pages/api/contact.js (API endpoint example)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, organization, category, subject, message } = req.body;

  // Validate input
  if (!name || !email || !category || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Here you would typically:
    // 1. Send email notification
    // 2. Save to database
    // 3. Add to CRM
    // 4. Send confirmation email to user

    // For now, we'll just log and return success
    console.log('Contact form submission:', {
      name,
      email,
      organization,
      category,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

// components/TimeTracker.jsx
import { useEffect } from 'react';
import { usePassport } from '@/context/PassportContext';

const TimeTracker = () => {
  const { updateTimeSpent } = usePassport();

  useEffect(() => {
    const interval = setInterval(() => {
      updateTimeSpent(1); // Update every second
    }, 1000);

    return () => clearInterval(interval);
  }, [updateTimeSpent]);

  return null; // This component doesn't render anything
};

export default TimeTracker;

// Add to _app.js
import TimeTracker from '@/components/TimeTracker';
import EasterEgg from '@/components/EasterEgg';
import SmartCTA from '@/components/SmartCTA';

// Update MyApp component
function MyApp({ Component, pageProps }) {
  // ... existing code ...

  return (
    <PassportProvider>
      <Component {...pageProps} />
      <TimeTracker />
      <EasterEgg />
      <SmartCTA />
    </PassportProvider>
  );
}
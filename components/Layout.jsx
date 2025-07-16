import React from 'react';
import Head from 'next/head';
import Navigation from './Navigation';
import Footer from './Footer';
import PassportWidget from './PassportWidget';
import { motion } from 'framer-motion';
import { usePassport } from '@/context/PassportContext';

const Layout = ({ children, title, description, currentPage }) => {
  const { addStamp } = usePassport();

  React.useEffect(() => {
    if (currentPage) {
      addStamp(currentPage);
    }
  }, [currentPage, addStamp]);

  return (
    <>
      <Head>
        <title>{title || 'Mayank Trivedi - Visionary Leader'}</title>
        <meta name="description" content={description || 'CEO, entrepreneur, and craftsman building the future of healthcare technology.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.png" />
        
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A2540" />
        
        {/* Fonts preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </Head>

      <a href="#main" className="skip-to-main">
        Skip to main content
      </a>

      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <motion.main
          id="main"
          className="flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.main>
        
        <Footer />
        
        <PassportWidget />
      </div>
    </>
  );
};


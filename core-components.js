// components/Layout.jsx
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

export default Layout;

// components/Navigation.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { NAVIGATION_ITEMS } from '@/utils/constants';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center group-hover:bg-brand-teal transition-colors duration-300">
              <span className="text-white font-sans font-bold text-xl">M</span>
            </div>
            <span className="font-sans font-bold text-xl text-brand-navy hidden sm:block">
              Mayank Trivedi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-sans font-medium transition-colors duration-300 relative group ${
                  router.pathname === item.href
                    ? 'text-brand-teal'
                    : 'text-brand-navy hover:text-brand-teal'
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-brand-teal transition-all duration-300 ${
                    router.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-brand-navy hover:bg-brand-gray-soft transition-colors duration-300"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="container-custom py-4">
              {NAVIGATION_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className={`block py-3 font-sans font-medium transition-colors duration-300 ${
                      router.pathname === item.href
                        ? 'text-brand-teal'
                        : 'text-brand-navy hover:text-brand-teal'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;

// components/Footer.jsx
import React from 'react';
import Link from 'next/link';
import { FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* About */}
          <div>
            <h3 className="font-sans font-bold text-lg mb-4">About Mayank</h3>
            <p className="text-gray-300 leading-relaxed">
              Visionary leader with 25+ years of innovative leadership in healthcare technology, 
              building companies that make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.slice(1, 5).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans font-bold text-lg mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://linkedin.com/in/mayanktrivedi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FiLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:mayank@indralok.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <FiMail size={20} />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {currentYear} Mayank Trivedi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
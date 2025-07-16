// context/PassportContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const PassportContext = createContext();

export const usePassport = () => {
  const context = useContext(PassportContext);
  if (!context) {
    throw new Error('usePassport must be used within a PassportProvider');
  }
  return context;
};

const PASSPORT_STORAGE_KEY = 'mayank-portfolio-passport';

const ACHIEVEMENTS = {
  FIRST_VISIT: 'first_visit',
  ABOUT_EXPLORER: 'about_explorer',
  VENTURE_SCOUT: 'venture_scout',
  LEADERSHIP_STUDENT: 'leadership_student',
  CRAFT_ADMIRER: 'craft_admirer',
  SPEAKER_LISTENER: 'speaker_listener',
  CONTACT_INITIATOR: 'contact_initiator',
  TIMELINE_NAVIGATOR: 'timeline_navigator',
  EASTER_EGG_FINDER: 'easter_egg_finder',
  JOURNEY_COMPLETE: 'journey_complete',
};

export const PassportProvider = ({ children }) => {
  const [passport, setPassport] = useState({
    stamps: [],
    visitedPages: [],
    timeSpent: 0,
    lastVisit: null,
    achievements: [],
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Load passport from localStorage
    const savedPassport = localStorage.getItem(PASSPORT_STORAGE_KEY);
    if (savedPassport) {
      setPassport(JSON.parse(savedPassport));
    } else {
      // First visit achievement
      addAchievement(ACHIEVEMENTS.FIRST_VISIT);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      // Save passport to localStorage whenever it changes
      localStorage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(passport));
    }
  }, [passport, isClient]);

  const addStamp = (pageName) => {
    setPassport(prev => ({
      ...prev,
      stamps: [...new Set([...prev.stamps, pageName])],
      visitedPages: [...new Set([...prev.visitedPages, pageName])],
      lastVisit: new Date().toISOString(),
    }));
  };

  const addAchievement = (achievement) => {
    setPassport(prev => ({
      ...prev,
      achievements: [...new Set([...prev.achievements, achievement])],
    }));
  };

  const updateTimeSpent = (seconds) => {
    setPassport(prev => ({
      ...prev,
      timeSpent: prev.timeSpent + seconds,
    }));
  };

  const getProgress = () => {
    const totalPages = 7; // Total main pages
    const visitedCount = passport.visitedPages.length;
    return (visitedCount / totalPages) * 100;
  };

  const value = {
    passport,
    addStamp,
    addAchievement,
    updateTimeSpent,
    getProgress,
    ACHIEVEMENTS,
  };

  return (
    <PassportContext.Provider value={value}>
      {children}
    </PassportContext.Provider>
  );
};

// utils/analytics.js
export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
  
  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Track Event:', eventName, properties);
  }
};

// utils/animations.js
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 }
};

// utils/seo.js
export const defaultSEO = {
  title: 'Mayank Trivedi - Visionary Leader in Healthcare Innovation',
  description: 'CEO, entrepreneur, and craftsman building the future of healthcare technology with heart and hands.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mayanktrivedi.com/',
    site_name: 'Mayank Trivedi Portfolio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mayank Trivedi',
      },
    ],
  },
  twitter: {
    handle: '@mayanktrivedi',
    site: '@mayanktrivedi',
    cardType: 'summary_large_image',
  },
};

// utils/constants.js
export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Ventures', href: '/ventures' },
  { name: 'Leadership', href: '/leadership' },
  { name: "Maker's Heart", href: '/makers-heart' },
  { name: 'Speaking', href: '/speaking' },
  { name: 'Contact', href: '/contact' },
];

export const AVATAR_MODES = {
  DEFAULT: 'default',
  SUIT: 'suit',
  CRAFTSMAN: 'craftsman',
  SPEAKER: 'speaker',
  MENTOR: 'mentor',
  PILOT: 'pilot',
};

export const AVATAR_PHRASES = {
  [AVATAR_MODES.DEFAULT]: [
    "Welcome! I'm excited to share my journey with you.",
    "Every challenge is an opportunity to innovate.",
    "Let's build something meaningful together.",
  ],
  [AVATAR_MODES.SUIT]: [
    "Leadership is about empowering others to achieve their best.",
    "In business, integrity is non-negotiable.",
    "Success is a team sport.",
  ],
  [AVATAR_MODES.CRAFTSMAN]: [
    "There's wisdom in working with your hands.",
    "Every piece tells a story of patience and precision.",
    "When you plane wood, you can't rush it.",
  ],
  [AVATAR_MODES.SPEAKER]: [
    "Sharing knowledge is how we all grow together.",
    "Every audience teaches me something new.",
    "The best talks are conversations, not monologues.",
  ],
  [AVATAR_MODES.MENTOR]: [
    "I see potential in you that you might not see yet.",
    "The greatest reward is seeing others succeed.",
    "Your growth is my success.",
  ],
  [AVATAR_MODES.PILOT]: [
    "Once you overcome fear, the sky is truly the limit.",
    "Flying taught me perspective - in life and business.",
    "Every flight starts with a careful pre-flight check.",
  ],
};
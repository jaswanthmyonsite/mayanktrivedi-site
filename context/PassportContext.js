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


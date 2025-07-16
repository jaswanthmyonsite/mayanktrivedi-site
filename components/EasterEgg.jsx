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

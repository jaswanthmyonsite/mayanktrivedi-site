import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePassport } from '@/context/PassportContext';
import { FiAward, FiX, FiMap } from 'react-icons/fi';

const PassportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { passport, getProgress } = usePassport();
  
  const progress = getProgress();

  const achievementDetails = {
    first_visit: { name: 'First Visit', icon: '🎯', description: 'Welcome to the journey!' },
    about_explorer: { name: 'Story Seeker', icon: '📖', description: 'Explored the About section' },
    venture_scout: { name: 'Venture Scout', icon: '🚀', description: 'Discovered all ventures' },
    leadership_student: { name: 'Leadership Student', icon: '🎓', description: 'Studied leadership principles' },
    craft_admirer: { name: 'Craft Admirer', icon: '🪵', description: "Appreciated the Maker's Heart" },
    speaker_listener: { name: 'Engaged Listener', icon: '🎤', description: 'Explored speaking topics' },
    contact_initiator: { name: 'Connection Maker', icon: '🤝', description: 'Reached out via contact' },
    timeline_navigator: { name: 'Time Traveler', icon: '⏰', description: 'Navigated the timeline' },
    easter_egg_finder: { name: 'Secret Finder', icon: '🥚', description: 'Found a hidden surprise' },
    journey_complete: { name: 'Journey Master', icon: '🏆', description: 'Completed the full journey' },
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-brand-teal text-white rounded-full p-4 shadow-lg hover:bg-brand-teal-light transition-colors duration-300 z-40"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Curiosity Passport"
      >
        <FiMap size={24} />
        {passport.achievements.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {passport.achievements.length}
          </span>
        )}
      </motion.button>

      {/* Passport Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-brand-navy text-white p-6 relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors duration-300"
                  aria-label="Close passport"
                >
                  <FiX size={24} />
                </button>
                <h2 className="font-sans font-bold text-2xl mb-2">Curiosity Passport</h2>
                <p className="text-white/80">Track your journey through my story</p>
              </div>

              {/* Progress */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans font-medium text-brand-navy">Journey Progress</span>
                  <span className="font-sans font-bold text-brand-teal">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-brand-teal to-brand-teal-light h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Achievements */}
              <div className="p-6 overflow-y-auto max-h-96">
                <h3 className="font-sans font-bold text-lg text-brand-navy mb-4">Achievements</h3>
                <div className="space-y-3">
                  {Object.entries(achievementDetails).map(([key, achievement]) => {
                    const isUnlocked = passport.achievements.includes(key);
                    return (
                      <div
                        key={key}
                        className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 ${
                          isUnlocked
                            ? 'bg-brand-teal/10 border border-brand-teal/20'
                            : 'bg-gray-50 border border-gray-200 opacity-50'
                        }`}
                      >
                        <span className="text-2xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <h4 className={`font-sans font-medium ${isUnlocked ? 'text-brand-navy' : 'text-gray-500'}`}>
                            {achievement.name}
                          </h4>
                          <p className={`text-sm ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                            {isUnlocked ? achievement.description : 'Keep exploring to unlock'}
                          </p>
                        </div>
                        {isUnlocked && (
                          <FiAward className="text-brand-teal" size={20} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gray-50 p-6 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="font-sans font-bold text-2xl text-brand-navy">{passport.visitedPages.length}</p>
                    <p className="text-sm text-gray-600">Pages Explored</p>
                  </div>
                  <div>
                    <p className="font-sans font-bold text-2xl text-brand-navy">
                      {Math.round(passport.timeSpent / 60)}m
                    </p>
                    <p className="text-sm text-gray-600">Time Invested</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PassportWidget;

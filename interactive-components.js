// components/AvatarChat.jsx
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { AVATAR_MODES, AVATAR_PHRASES } from '@/utils/constants';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

// 3D Avatar Component
const Avatar3D = ({ mode = AVATAR_MODES.DEFAULT }) => {
  // In production, this would load different GLB files based on mode
  // For now, we'll use a placeholder
  return (
    <mesh>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color={mode === AVATAR_MODES.SUIT ? '#0A2540' : '#6B4423'} />
    </mesh>
  );
};

// Static Avatar Fallback
const AvatarStatic = ({ mode }) => {
  const avatarImages = {
    [AVATAR_MODES.DEFAULT]: '/avatars/default.png',
    [AVATAR_MODES.SUIT]: '/avatars/suit.png',
    [AVATAR_MODES.CRAFTSMAN]: '/avatars/craftsman.png',
    [AVATAR_MODES.SPEAKER]: '/avatars/speaker.png',
    [AVATAR_MODES.MENTOR]: '/avatars/mentor.png',
    [AVATAR_MODES.PILOT]: '/avatars/pilot.png',
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-brand-gray-soft to-white rounded-lg overflow-hidden">
      <img
        src={avatarImages[mode] || avatarImages[AVATAR_MODES.DEFAULT]}
        alt="Mayank Trivedi Avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const AvatarChat = ({ mode = AVATAR_MODES.DEFAULT, showChat = true, size = 'medium' }) => {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [use3D, setUse3D] = useState(true);

  const phrases = AVATAR_PHRASES[mode] || AVATAR_PHRASES[AVATAR_MODES.DEFAULT];
  
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64',
  };

  useEffect(() => {
    // Check if device can handle 3D
    if (typeof window !== 'undefined') {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setUse3D(!isMobile);
    }
  }, []);

  useEffect(() => {
    if (!showChat) return;

    const showPhrase = () => {
      setIsTyping(true);
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      
      // Simulate typing effect
      let index = 0;
      const typeInterval = setInterval(() => {
        setCurrentPhrase(phrase.slice(0, index));
        index++;
        
        if (index > phrase.length) {
          clearInterval(typeInterval);
          setIsTyping(false);
          
          // Clear phrase after 5 seconds
          setTimeout(() => {
            setCurrentPhrase('');
          }, 5000);
        }
      }, 50);
    };

    // Show first phrase after 2 seconds
    const timeout = setTimeout(showPhrase, 2000);
    
    // Show new phrase every 15 seconds
    const interval = setInterval(showPhrase, 15000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [mode, showChat, phrases]);

  const speakPhrase = () => {
    if ('speechSynthesis' in window && currentPhrase) {
      const utterance = new SpeechSynthesisUtterance(currentPhrase);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="relative">
      {/* Avatar Container */}
      <div className={`${sizeClasses[size]} relative`}>
        {use3D ? (
          <Suspense fallback={<AvatarStatic mode={mode} />}>
            <div className="w-full h-full">
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ background: 'transparent' }}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Avatar3D mode={mode} />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Canvas>
            </div>
          </Suspense>
        ) : (
          <AvatarStatic mode={mode} />
        )}
      </div>

      {/* Chat Bubble */}
      {showChat && (
        <AnimatePresence>
          {currentPhrase && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 ml-4"
            >
              <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent" />
                </div>
                <p className="text-brand-navy font-serif text-sm">
                  {currentPhrase}
                  {isTyping && <span className="animate-pulse">|</span>}
                </p>
                
                {audioEnabled && (
                  <button
                    onClick={speakPhrase}
                    className="absolute -top-2 -right-2 bg-brand-teal text-white rounded-full p-1.5 hover:bg-brand-teal-light transition-colors duration-300"
                    aria-label="Speak phrase"
                  >
                    <FiVolume2 size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Audio Toggle */}
      {showChat && (
        <button
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="absolute -bottom-2 -right-2 bg-brand-navy text-white rounded-full p-2 hover:bg-brand-navy-light transition-colors duration-300"
          aria-label={audioEnabled ? 'Disable audio' : 'Enable audio'}
        >
          {audioEnabled ? <FiVolume2 size={16} /> : <FiVolumeX size={16} />}
        </button>
      )}
    </div>
  );
};

export default AvatarChat;

// components/PassportWidget.jsx
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
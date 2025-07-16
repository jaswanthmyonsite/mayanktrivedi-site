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


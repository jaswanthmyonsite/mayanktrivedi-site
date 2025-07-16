import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { usePassport } from '@/context/PassportContext';

const TimelineEvent = ({ year, title, description, icon, isActive }) => (
  <motion.div
    className={`relative ${isActive ? 'opacity-100' : 'opacity-60'}`}
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex flex-col items-center">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
          isActive
            ? 'bg-brand-teal text-white shadow-lg'
            : 'bg-gray-200 text-gray-600'
        }`}
      >
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="font-sans font-bold text-lg text-brand-navy mb-1">{year}</h3>
      <h4 className="font-sans font-medium text-brand-navy mb-2">{title}</h4>
      <p className="text-sm text-gray-600 text-center max-w-xs">{description}</p>
    </div>
  </motion.div>
);

const Timeline = ({ events }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const { addAchievement, ACHIEVEMENTS } = usePassport();

  useEffect(() => {
    // Achievement for navigating timeline
    if (scrollProgress > 50) {
      addAchievement(ACHIEVEMENTS.TIMELINE_NAVIGATOR);
    }
  }, [scrollProgress, addAchievement, ACHIEVEMENTS]);

  const handleScroll = (direction) => {
    if (direction === 'left' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (direction === 'right' && activeIndex < events.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  useEffect(() => {
    const progress = (activeIndex / (events.length - 1)) * 100;
    setScrollProgress(progress);
  }, [activeIndex, events.length]);

  return (
    <div className="relative py-12">
      {/* Glider-style progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-teal to-brand-teal-light"
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Navigation buttons */}
      <button
        onClick={() => handleScroll('left')}
        disabled={activeIndex === 0}
        className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
          activeIndex === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white shadow-md text-brand-navy hover:bg-brand-teal hover:text-white'
        }`}
        aria-label="Previous event"
      >
        <FiChevronLeft size={24} />
      </button>

      <button
        onClick={() => handleScroll('right')}
        disabled={activeIndex === events.length - 1}
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 ${
          activeIndex === events.length - 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white shadow-md text-brand-navy hover:bg-brand-teal hover:text-white'
        }`}
        aria-label="Next event"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Timeline container */}
      <div className="px-16" ref={containerRef}>
        <div className="flex justify-between items-center relative">
          {/* Connection line */}
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200" />
          
          {events.map((event, index) => (
            <TimelineEvent
              key={index}
              {...event}
              isActive={index <= activeIndex}
            />
          ))}
        </div>
      </div>

      {/* Year indicator */}
      <div className="text-center mt-8">
        <p className="font-sans text-4xl font-bold text-brand-navy">
          {events[activeIndex].year}
        </p>
        <p className="text-gray-600 mt-2">{events[activeIndex].detail}</p>
      </div>
    </div>
  );
};

export default Timeline;


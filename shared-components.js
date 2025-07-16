// components/Timeline.jsx
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

// components/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from '@/utils/animations';
import AvatarChat from './AvatarChat';
import { AVATAR_MODES } from '@/utils/constants';

const Hero = ({ title, subtitle, description, cta, avatarMode = AVATAR_MODES.DEFAULT }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-cream via-white to-brand-gray-soft" />
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Content */}
          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-brand-navy mb-6">
              {title}
            </h1>
            {subtitle && (
              <h2 className="text-2xl md:text-3xl font-serif text-brand-navy-light mb-6">
                {subtitle}
              </h2>
            )}
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
              {description}
            </p>
            {cta && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cta}
              </motion.div>
            )}
          </motion.div>

          {/* Avatar */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center lg:justify-end"
          >
            <AvatarChat mode={avatarMode} size="large" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

// components/StatsBar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const StatItem = ({ value, label, prefix = '', suffix = '' }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <p className="font-sans font-bold text-4xl md:text-5xl text-brand-navy">
          {prefix}
          {inView && (
            <CountUp
              end={value}
              duration={2.5}
              separator=","
              decimal="."
              decimals={suffix === '%' ? 0 : 0}
            />
          )}
          {suffix}
        </p>
      </motion.div>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  );
};

const StatsBar = ({ stats, className = '' }) => {
  return (
    <div className={`bg-white py-12 ${className}`}>
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;

// components/QuoteBlock.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const QuoteBlock = ({ quote, author, role, variant = 'default' }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const variants = {
    default: 'bg-brand-gray-soft border-l-4 border-brand-teal',
    highlight: 'bg-gradient-to-r from-brand-navy to-brand-navy-light text-white',
    minimal: 'bg-transparent border-l-4 border-brand-walnut',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6 }}
      className={`p-8 rounded-lg ${variants[variant]}`}
    >
      <blockquote className="text-lg md:text-xl font-serif italic leading-relaxed mb-4">
        "{quote}"
      </blockquote>
      <footer className="flex items-center">
        <div>
          <p className={`font-sans font-bold ${variant === 'highlight' ? 'text-white' : 'text-brand-navy'}`}>
            {author}
          </p>
          {role && (
            <p className={`text-sm ${variant === 'highlight' ? 'text-white/80' : 'text-gray-600'}`}>
              {role}
            </p>
          )}
        </div>
      </footer>
    </motion.div>
  );
};

export default QuoteBlock;

// components/CountUp.jsx - Simple CountUp implementation
import { useEffect, useState } from 'react';

const CountUp = ({ end, duration = 2, separator = ',', decimal = '.', decimals = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  const formatNumber = (num) => {
    const parts = num.toFixed(decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join(decimal);
  };

  return <>{formatNumber(count)}</>;
};

export default CountUp;
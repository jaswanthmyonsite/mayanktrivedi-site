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


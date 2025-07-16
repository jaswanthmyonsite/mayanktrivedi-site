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


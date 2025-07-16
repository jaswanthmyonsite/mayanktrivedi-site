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


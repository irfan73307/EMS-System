import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ children, variant = 'blue', className = '' }) => {
  const variants = {
    blue: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    green: 'bg-green-500/20 text-green-300 border border-green-500/30',
    red: 'bg-red-500/20 text-red-300 border border-red-500/30',
    yellow: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
  };

  return (
    <motion.span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]} ${className}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.span>
  );
};

export default Badge;

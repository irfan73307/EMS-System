import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  delay = 0,
  onClick = null,
}) => {
  return (
    <motion.div
      className={`
        glass p-6 rounded-2xl
        ${hover ? 'hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        transition-smooth
        ${className}
      `}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, boxShadow: '0 20px 25px -5 rgba(59, 130, 246, 0.2)' } : {}}
    >
      {children}
    </motion.div>
  );
};

export default Card;

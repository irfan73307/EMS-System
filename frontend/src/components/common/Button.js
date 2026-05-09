import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  icon = null,
}) => {
  const baseStyles = 'font-semibold rounded-xl transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50',
    secondary: 'bg-white/10 border border-white/20 text-white hover:bg-white/20 disabled:opacity-50',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg hover:shadow-red-500/50 disabled:opacity-50',
    success: 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-lg hover:shadow-green-500/50 disabled:opacity-50',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg hover:shadow-yellow-500/50 disabled:opacity-50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {icon && <span>{icon}</span>}
      {loading ? <span className="animate-spin">⟳</span> : children}
    </motion.button>
  );
};

export default Button;

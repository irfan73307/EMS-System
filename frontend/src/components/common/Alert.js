import React from 'react';
import { motion } from 'framer-motion';

const Alert = ({ message, type = 'info', onClose = null }) => {
  const colors = {
    success: 'bg-green-500/20 border-green-500/30 text-green-300',
    error: 'bg-red-500/20 border-red-500/30 text-red-300',
    warning: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300',
    info: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '!',
    info: 'ℹ',
  };

  return (
    <motion.div
      className={`glass border p-4 rounded-xl flex items-start gap-3 ${colors[type]}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-lg font-bold mt-0.5">{icons[type]}</span>
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-lg hover:opacity-70 transition-smooth"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
};

export default Alert;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children, actions = null }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass max-w-md w-full mx-4 z-50 rounded-3xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="p-8">
              {title && (
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold gradient-text">{title}</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white text-2xl transition-smooth"
                  >
                    ✕
                  </button>
                </div>
              )}
              <div className="mb-6">{children}</div>
              {actions && (
                <div className="flex gap-3 justify-end">
                  {actions}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;

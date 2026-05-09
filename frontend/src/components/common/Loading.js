import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        className="flex gap-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
          />
        ))}
      </motion.div>
      <motion.p
        className="text-gray-300 text-sm"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default Loading;

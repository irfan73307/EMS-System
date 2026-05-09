import React from 'react';
import { motion } from 'framer-motion';

const Table = ({ columns, data, loading = false, onRowClick = null }) => {
  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return (
      <motion.div
        className="text-center py-12 text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-lg">No data available</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="glass overflow-x-auto rounded-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-4 text-left text-sm font-semibold text-blue-300"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <motion.tr
              key={idx}
              className={`border-b border-white/5 transition-smooth ${
                onRowClick ? 'hover:bg-white/5 cursor-pointer' : ''
              }`}
              onClick={() => onRowClick && onRowClick(row)}
              whileHover={onRowClick ? { backgroundColor: 'rgba(255, 255, 255, 0.05)' } : {}}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-sm text-gray-200">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Table;

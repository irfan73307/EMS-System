import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Home from './pages/Home';
import AddEmployee from './pages/AddEmployee';
import ViewEmployees from './pages/ViewEmployees';
import SearchEmployee from './pages/SearchEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import DeleteEmployee from './pages/DeleteEmployee';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/view" element={<ViewEmployees />} />
          <Route path="/search" element={<SearchEmployee />} />
          <Route path="/update" element={<UpdateEmployee />} />
          <Route path="/delete" element={<DeleteEmployee />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;


import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layouts/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Home = () => {
  const features = [
    {
      icon: '➕',
      title: 'Add Employees',
      description: 'Easily add new employees to your system with detailed information',
      path: '/add',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '👥',
      title: 'View All Employees',
      description: 'Browse and manage all employees in a modern, responsive table',
      path: '/view',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '🔍',
      title: 'Search Employees',
      description: 'Quickly find any employee by their ID with instant results',
      path: '/search',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: '✏️',
      title: 'Update Information',
      description: 'Update employee details and designations effortlessly',
      path: '/update',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: '🗑️',
      title: 'Delete Employees',
      description: 'Remove employees from the system securely',
      path: '/delete',
      color: 'from-red-500 to-pink-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <Layout>
      {/* Hero Section */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="gradient-text">Employee Management</span>
          <br />
          <span className="text-4xl md:text-5xl text-gray-200">System</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Streamline your HR operations with our modern, intuitive employee management platform. Manage, track, and organize your workforce effortlessly.
        </p>
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/add">
            <Button variant="primary" size="lg">
              Get Started ➜
            </Button>
          </Link>
          <Link to="/view">
            <Button variant="secondary" size="lg">
              View Employees
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, idx) => (
          <Link key={feature.path} to={feature.path}>
            <Card delay={idx * 0.1} hover>
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <div className={`h-1 w-full bg-gradient-to-r ${feature.color} rounded-full`} />
            </Card>
          </Link>
        ))}
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="glass rounded-3xl p-8 md:p-12 mb-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">100%</div>
            <p className="text-gray-400">Modern & Responsive</p>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">⚡</div>
            <p className="text-gray-400">Lightning Fast Performance</p>
          </div>
          <div>
            <div className="text-4xl font-bold gradient-text mb-2">🔒</div>
            <p className="text-gray-400">Secure & Reliable</p>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Home;

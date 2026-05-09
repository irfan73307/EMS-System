import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/layouts/Layout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Alert from '../components/common/Alert';
import Loading from '../components/common/Loading';
import { employeeAPI } from '../utils/api';

const SearchEmployee = () => {
  const [searchID, setSearchID] = useState('');
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchID.trim()) {
      setError('Please enter an Employee ID');
      return;
    }

    setLoading(true);
    setError('');
    setEmployee(null);
    setSearched(false);

    const result = await employeeAPI.searchEmployee(searchID.trim());

    if (result.success) {
      setEmployee(result.data);
    } else {
      setError(result.error);
    }
    setSearched(true);
    setLoading(false);
  };

  return (
    <Layout title="Search Employee" subtitle="Find employee information by ID">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Search Form */}
        <Card className="mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <Input
                label="Employee ID"
                placeholder="Enter Employee ID (e.g., EMP-001)"
                value={searchID}
                onChange={(e) => {
                  setSearchID(e.target.value);
                  setError('');
                }}
                required
                icon="🔍"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="flex-1"
              >
                {loading ? 'Searching...' : 'Search Employee'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => {
                  setSearchID('');
                  setEmployee(null);
                  setError('');
                  setSearched(false);
                }}
              >
                Clear
              </Button>
            </div>
          </form>
        </Card>

        {/* Results */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loading message="Searching for employee..." />
            </motion.div>
          )}

          {error && searched && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert
                message={error}
                type="error"
                onClose={() => setError('')}
              />
            </motion.div>
          )}

          {employee && searched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="border-2 border-green-500/30">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-3xl font-bold gradient-text">
                      {employee.EmployeeName}
                    </h2>
                    <Badge variant="green">✓ Found</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Employee ID */}
                    <motion.div
                      className="glass p-4 rounded-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className="text-gray-400 text-sm mb-1">Employee ID</p>
                      <p className="text-xl font-semibold text-cyan-300">
                        {employee.EmployeeID}
                      </p>
                    </motion.div>

                    {/* Designation */}
                    <motion.div
                      className="glass p-4 rounded-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-gray-400 text-sm mb-1">Designation</p>
                      <p className="text-xl font-semibold text-purple-300">
                        {employee.Designation}
                      </p>
                    </motion.div>

                    {/* Department */}
                    <motion.div
                      className="glass p-4 rounded-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-gray-400 text-sm mb-1">Department</p>
                      <p className="text-xl font-semibold text-blue-300">
                        {employee.Department}
                      </p>
                    </motion.div>

                    {/* Joining Date */}
                    <motion.div
                      className="glass p-4 rounded-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-gray-400 text-sm mb-1">Joining Date</p>
                      <p className="text-xl font-semibold text-green-300">
                        {new Date(employee.JoiningDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!loading && !searched && !employee && (
          <motion.div
            className="glass rounded-2xl p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Search for an Employee</h3>
            <p className="text-gray-400">
              Enter an Employee ID above to view detailed information
            </p>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default SearchEmployee;

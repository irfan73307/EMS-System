import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/layouts/Layout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Alert from '../components/common/Alert';
import Modal from '../components/common/Modal';
import { employeeAPI } from '../utils/api';

const UpdateEmployee = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [designation, setDesignation] = useState('');
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!employeeID.trim()) {
      setError('Please enter an Employee ID');
      return;
    }

    setSearching(true);
    setError('');
    const result = await employeeAPI.searchEmployee(employeeID.trim());

    if (result.success) {
      setEmployee(result.data);
      setDesignation(result.data.Designation);
      setError('');
    } else {
      setError(result.error);
      setEmployee(null);
      setDesignation('');
    }
    setSearching(false);
  };

  const handleUpdate = async () => {
    if (!designation.trim()) {
      setError('Please enter a designation');
      return;
    }

    setLoading(true);
    const result = await employeeAPI.updateEmployee(employeeID, {
      Designation: designation,
    });

    if (result.success) {
      setSuccess('✓ Employee updated successfully!');
      setEmployee(null);
      setEmployeeID('');
      setDesignation('');
      setShowModal(false);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <Layout title="Update Employee" subtitle="Modify employee information">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Alerts */}
        <AnimatePresence>
          {success && (
            <motion.div className="mb-6">
              <Alert
                message={success}
                type="success"
                onClose={() => setSuccess('')}
              />
            </motion.div>
          )}
          {error && (
            <motion.div className="mb-6">
              <Alert
                message={error}
                type="error"
                onClose={() => setError('')}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search Form */}
        <Card className="mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <Input
              label="Employee ID"
              placeholder="Enter Employee ID to update"
              value={employeeID}
              onChange={(e) => {
                setEmployeeID(e.target.value);
                setError('');
              }}
              required
              icon="🔍"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={searching}
              className="w-full"
            >
              {searching ? 'Searching...' : 'Find Employee'}
            </Button>
          </form>
        </Card>

        {/* Employee Details */}
        <AnimatePresence>
          {employee && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="border-2 border-blue-500/30 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl font-bold gradient-text">
                        {employee.EmployeeName}
                      </h2>
                      <p className="text-gray-400 text-sm mt-1">
                        {employee.Department}
                      </p>
                    </div>
                    <Badge variant="blue">👤 Current</Badge>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass p-4 rounded-xl">
                      <p className="text-gray-400 text-sm mb-1">Employee ID</p>
                      <p className="text-lg font-semibold text-cyan-300">
                        {employee.EmployeeID}
                      </p>
                    </div>
                    <div className="glass p-4 rounded-xl">
                      <p className="text-gray-400 text-sm mb-1">Current Designation</p>
                      <p className="text-lg font-semibold text-purple-300">
                        {employee.Designation}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="success"
                    size="lg"
                    className="w-full"
                    onClick={() => setShowModal(true)}
                  >
                    ✏️ Update Designation
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Update Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Update Designation"
          actions={
            <>
              <Button
                variant="secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="success"
                loading={loading}
                onClick={handleUpdate}
              >
                {loading ? 'Updating...' : 'Confirm Update'}
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-gray-300">
              Update the designation for <span className="font-semibold text-cyan-300">
                {employee?.EmployeeName}
              </span>
            </p>
            <Input
              label="New Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              placeholder="e.g., Senior Developer"
              icon="💼"
            />
          </div>
        </Modal>

        {/* Empty State */}
        {!employee && !searching && (
          <motion.div
            className="glass rounded-2xl p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-6xl mb-4">✏️</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Update Employee Information
            </h3>
            <p className="text-gray-400">
              Search for an employee by ID to update their designation
            </p>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default UpdateEmployee;

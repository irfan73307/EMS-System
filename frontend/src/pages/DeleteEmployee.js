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

const DeleteEmployee = () => {
  const [employeeID, setEmployeeID] = useState('');
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

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
      setError('');
    } else {
      setError(result.error);
      setEmployee(null);
    }
    setSearching(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const result = await employeeAPI.deleteEmployee(employeeID);

    if (result.success) {
      setSuccess('✓ Employee deleted successfully!');
      setEmployee(null);
      setEmployeeID('');
      setShowConfirm(false);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <Layout title="Delete Employee" subtitle="Remove employee from the system">
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
              placeholder="Enter Employee ID to delete"
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

        {/* Employee Details - Confirm Deletion */}
        <AnimatePresence>
          {employee && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="border-2 border-red-500/30 mb-8">
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
                    <Badge variant="red">⚠️ Warning</Badge>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4">
                    <p className="text-red-300 font-semibold">
                      ⚠️ This action cannot be undone. The employee will be permanently removed from the system.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="glass p-4 rounded-xl">
                      <p className="text-gray-400 text-sm mb-1">Employee ID</p>
                      <p className="text-lg font-semibold text-cyan-300">
                        {employee.EmployeeID}
                      </p>
                    </div>
                    <div className="glass p-4 rounded-xl">
                      <p className="text-gray-400 text-sm mb-1">Designation</p>
                      <p className="text-lg font-semibold text-purple-300">
                        {employee.Designation}
                      </p>
                    </div>
                    <div className="glass p-4 rounded-xl md:col-span-2">
                      <p className="text-gray-400 text-sm mb-1">Department</p>
                      <p className="text-lg font-semibold text-blue-300">
                        {employee.Department}
                      </p>
                    </div>
                  </div>

                  <motion.div className="flex gap-4">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="flex-1"
                      onClick={() => {
                        setEmployee(null);
                        setEmployeeID('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      size="lg"
                      className="flex-1"
                      onClick={() => setShowConfirm(true)}
                    >
                      🗑️ Delete Employee
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Modal */}
        <Modal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          title="Confirm Deletion"
          actions={
            <>
              <Button
                variant="secondary"
                onClick={() => setShowConfirm(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                loading={loading}
                onClick={handleDelete}
              >
                {loading ? 'Deleting...' : 'Yes, Delete'}
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <p className="text-red-300">
                Are you absolutely sure? This will permanently delete <span className="font-semibold">
                  {employee?.EmployeeName}
                </span> from the system. This action cannot be reversed.
              </p>
            </div>
            <p className="text-gray-400 text-sm">
              Type the Employee ID <span className="font-mono bg-white/10 px-2 py-1 rounded">
                {employee?.EmployeeID}
              </span> to confirm.
            </p>
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
            <div className="text-6xl mb-4">🗑️</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              Delete an Employee
            </h3>
            <p className="text-gray-400">
              Search for an employee to remove them from the system
            </p>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default DeleteEmployee;

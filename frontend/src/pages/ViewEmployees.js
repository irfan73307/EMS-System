import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layouts/Layout';
import Table from '../components/common/Table';
import Loading from '../components/common/Loading';
import Alert from '../components/common/Alert';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { employeeAPI } from '../utils/api';

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    const result = await employeeAPI.getAllEmployees();

    if (result.success) {
      setEmployees(result.data);
      setAlert(null);
    } else {
      setAlert({ type: 'error', message: `✕ ${result.error}` });
      setEmployees([]);
    }
    setLoading(false);
  };

  const columns = [
    {
      key: 'EmployeeName',
      label: 'Employee Name',
      render: (value) => <span className="font-semibold">{value}</span>,
    },
    {
      key: 'EmployeeID',
      label: 'Employee ID',
      render: (value) => (
        <Badge variant="blue">{value}</Badge>
      ),
    },
    {
      key: 'Designation',
      label: 'Designation',
      render: (value) => <span className="text-cyan-300">{value}</span>,
    },
    {
      key: 'Department',
      label: 'Department',
      render: (value) => (
        <Badge variant="purple">{value}</Badge>
      ),
    },
    {
      key: 'JoiningDate',
      label: 'Joining Date',
      render: (value) => {
        const date = new Date(value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        return <span className="text-green-300">{date}</span>;
      },
    },
  ];

  return (
    <Layout title="Employee Directory" subtitle="View and manage all employees in your organization">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {alert && (
          <motion.div className="mb-6">
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          </motion.div>
        )}

        {/* Header with Refresh */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Total Employees: <span className="gradient-text">{employees.length}</span>
            </h2>
            <p className="text-gray-400 text-sm">
              {employees.length === 0 ? 'No employees found' : 'Displaying all active employees'}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={fetchEmployees}
            disabled={loading}
          >
            🔄 Refresh
          </Button>
        </motion.div>

        {/* Table */}
        {loading ? (
          <Loading message="Loading employees..." />
        ) : employees.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Table
              columns={columns}
              data={employees}
              loading={loading}
            />
          </motion.div>
        ) : (
          <motion.div
            className="glass rounded-2xl p-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No Employees Found</h3>
            <p className="text-gray-400">
              Start by adding your first employee to get started.
            </p>
          </motion.div>
        )}

        {/* Stats */}
        {employees.length > 0 && (
          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="glass p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold gradient-text mb-2">
                {employees.length}
              </div>
              <p className="text-gray-400">Total Employees</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-cyan-300 mb-2">
                {new Set(employees.map(e => e.Department)).size}
              </div>
              <p className="text-gray-400">Departments</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">
                {new Set(employees.map(e => e.Designation)).size}
              </div>
              <p className="text-gray-400">Designations</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default ViewEmployees;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layouts/Layout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import Card from '../components/common/Card';
import { validateForm } from '../utils/validation';
import { employeeAPI } from '../utils/api';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    EmployeeName: '',
    EmployeeID: '',
    Designation: '',
    Department: '',
    JoiningDate: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    const result = await employeeAPI.addEmployee(formData);

    if (result.success) {
      setAlert({ type: 'success', message: '✓ Employee added successfully!' });
      setFormData({
        EmployeeName: '',
        EmployeeID: '',
        Designation: '',
        Department: '',
        JoiningDate: '',
      });
      setTimeout(() => setAlert(null), 3000);
    } else {
      setAlert({ type: 'error', message: `✕ ${result.error}` });
    }
    setLoading(false);
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <Layout title="Add Employee" subtitle="Register a new employee to your system">
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          {alert && (
            <motion.div className="mb-6">
              <Alert
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert(null)}
              />
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee Name */}
            <Input
              label="Employee Name"
              name="EmployeeName"
              placeholder="John Doe"
              value={formData.EmployeeName}
              onChange={handleChange}
              error={errors.EmployeeName}
              required
              icon="👤"
            />

            {/* Employee ID */}
            <Input
              label="Employee ID"
              name="EmployeeID"
              placeholder="EMP-001"
              value={formData.EmployeeID}
              onChange={handleChange}
              error={errors.EmployeeID}
              required
              icon="🆔"
            />

            {/* Designation */}
            <Input
              label="Designation"
              name="Designation"
              placeholder="Senior Developer"
              value={formData.Designation}
              onChange={handleChange}
              error={errors.Designation}
              required
              icon="💼"
            />

            {/* Department */}
            <Input
              label="Department"
              name="Department"
              placeholder="Engineering"
              value={formData.Department}
              onChange={handleChange}
              error={errors.Department}
              required
              icon="🏢"
            />

            {/* Joining Date */}
            <Input
              label="Joining Date"
              name="JoiningDate"
              type="date"
              value={formData.JoiningDate}
              onChange={handleChange}
              error={errors.JoiningDate}
              required
              min={minDate}
              icon="📅"
            />

            {/* Submit Button */}
            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="flex-1"
              >
                {loading ? 'Adding Employee...' : 'Add Employee'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => setFormData({
                  EmployeeName: '',
                  EmployeeID: '',
                  Designation: '',
                  Department: '',
                  JoiningDate: '',
                })}
              >
                Reset
              </Button>
            </motion.div>
          </form>
        </Card>

        {/* Info Card */}
        <motion.div
          className="mt-8 glass p-6 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-blue-300 mb-3">💡 Tips for Adding Employees</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• Employee ID should be unique and follow your company format</li>
            <li>• Joining date must be in the future</li>
            <li>• All fields are required for successful registration</li>
            <li>• Department names should match your organizational structure</li>
          </ul>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default AddEmployee;

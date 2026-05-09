import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee endpoints
export const employeeAPI = {
  // Add new employee
  addEmployee: async (employeeData) => {
    try {
      const response = await api.post('/add-employee', employeeData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to add employee',
      };
    }
  },

  // Get all employees
  getAllEmployees: async () => {
    try {
      const response = await api.get('/employees');
      return { success: true, data: response.data || [] };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch employees',
      };
    }
  },

  // Search employee by ID
  searchEmployee: async (employeeID) => {
    try {
      const response = await api.get(`/search-employee/${employeeID}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Employee not found',
      };
    }
  },

  // Update employee
  updateEmployee: async (employeeID, updateData) => {
    try {
      const response = await api.put(`/update-employee/${employeeID}`, updateData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to update employee',
      };
    }
  },

  // Delete employee
  deleteEmployee: async (employeeID) => {
    try {
      const response = await api.delete(`/delete-employee/${employeeID}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to delete employee',
      };
    }
  },
};

export default api;

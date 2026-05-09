// Form validation utilities
export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (name.length > 50) {
    return 'Name must not exceed 50 characters';
  }
  return '';
};

export const validateEmployeeID = (id) => {
  if (!id || id.trim().length === 0) {
    return 'Employee ID is required';
  }
  if (!/^[A-Z0-9-]{3,}$/.test(id.trim())) {
    return 'Employee ID must contain letters, numbers, or hyphens (minimum 3 characters)';
  }
  return '';
};

export const validateDesignation = (designation) => {
  if (!designation || designation.trim().length === 0) {
    return 'Designation is required';
  }
  if (designation.length > 50) {
    return 'Designation must not exceed 50 characters';
  }
  return '';
};

export const validateDepartment = (department) => {
  if (!department || department.trim().length === 0) {
    return 'Department is required';
  }
  if (department.length > 50) {
    return 'Department must not exceed 50 characters';
  }
  return '';
};

export const validateDate = (date) => {
  if (!date) {
    return 'Date is required';
  }
  const selectedDate = new Date(date);
  const today = new Date();
  if (selectedDate < today) {
    return 'Joining date cannot be in the past';
  }
  return '';
};

export const validateForm = (formData) => {
  const errors = {};
  
  if (formData.EmployeeName !== undefined) {
    const nameError = validateName(formData.EmployeeName);
    if (nameError) errors.EmployeeName = nameError;
  }
  
  if (formData.EmployeeID !== undefined) {
    const idError = validateEmployeeID(formData.EmployeeID);
    if (idError) errors.EmployeeID = idError;
  }
  
  if (formData.Designation !== undefined) {
    const designationError = validateDesignation(formData.Designation);
    if (designationError) errors.Designation = designationError;
  }
  
  if (formData.Department !== undefined) {
    const departmentError = validateDepartment(formData.Department);
    if (departmentError) errors.Department = departmentError;
  }
  
  if (formData.JoiningDate !== undefined) {
    const dateError = validateDate(formData.JoiningDate);
    if (dateError) errors.JoiningDate = dateError;
  }
  
  return errors;
};

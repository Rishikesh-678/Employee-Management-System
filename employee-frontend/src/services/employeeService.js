const API_URL = 'http://localhost:8080/api/employees';

export const fetchEmployees = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return await response.json();
};

export const fetchEmployeeById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch employee by ID');
  }
  return await response.json();
};

export const createEmployee = async (employeeData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData)
  });
  if (!response.ok) {
    throw new Error('Failed to create employee');
  }
  return await response.json();
};

export const updateEmployee = async (id, employeeData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employeeData)
  });
  if (!response.ok) {
    throw new Error('Failed to update employee');
  }
  return await response.json();
};

export const deleteEmployee = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete employee');
  }
  return true;
};

export const searchEmployees = async (keyword) => {
  const response = await fetch(`${API_URL}/search?keyword=${keyword}`);
  if (!response.ok) {
    throw new Error('Failed to search employees');
  }
  return await response.json();
};

export const fetchEmployeesByDepartment = async (department) => {
  const response = await fetch(`${API_URL}/department/${department}`);
  if (!response.ok) {
    throw new Error('Failed to fetch employees by department');
  }
  return await response.json();
};
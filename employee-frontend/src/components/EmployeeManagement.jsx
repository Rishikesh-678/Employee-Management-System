
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Hash } from 'lucide-react';
import EmployeeTable from './EmployeeTable';
import EmployeeModal from './EmployeeModal';
import { 
  fetchEmployees, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee,
  searchEmployees,
  fetchEmployeesByDepartment,
  fetchEmployeeById
} from '../services/employeeService';

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [idFilter, setIdFilter] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    salary: '',
    hireDate: '',
    phone: ''
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
      setActiveFilter('all');
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
    setSearchTerm('');
    setDepartmentFilter('');
    setIdFilter('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, formData);
      } else {
        await createEmployee(formData);
      }
      loadEmployees();
      resetForm();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        loadEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      department: employee.department,
      position: employee.position,
      salary: employee.salary,
      hireDate: employee.hireDate,
      phone: employee.phone
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      position: '',
      salary: '',
      hireDate: '',
      phone: ''
    });
    setEditingEmployee(null);
    setShowModal(false);
  };

  const handleSearch = async () => {
    if (activeFilter === 'name' && searchTerm.trim()) {
      try {
        const data = await searchEmployees(searchTerm);
        setEmployees(data);
      } catch (error) {
        console.error('Error searching employees:', error);
      }
    } else if (activeFilter === 'department' && departmentFilter.trim()) {
      try {
        const data = await fetchEmployeesByDepartment(departmentFilter);
        setEmployees(data);
      } catch (error) {
        console.error('Error filtering by department:', error);
      }
    } else if (activeFilter === 'id' && idFilter.trim()) {
      try {
        const employee = await fetchEmployeeById(idFilter);
        setEmployees([employee]);
      } catch (error) {
        console.error('Error fetching employee by ID:', error);
        setEmployees([]);
        alert('Employee not found with ID: ' + idFilter);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getCurrentInputValue = () => {
    if (activeFilter === 'name') return searchTerm;
    if (activeFilter === 'department') return departmentFilter;
    if (activeFilter === 'id') return idFilter;
    return '';
  };

  const handleInputChange = (value) => {
    if (activeFilter === 'name') setSearchTerm(value);
    else if (activeFilter === 'department') setDepartmentFilter(value);
    else if (activeFilter === 'id') setIdFilter(value);
  };

  const getPlaceholder = () => {
    if (activeFilter === 'name') return 'Search by name or email...';
    if (activeFilter === 'department') return 'Filter by department...';
    if (activeFilter === 'id') return 'Search by Employee ID...';
    return 'Select a filter type...';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Employee Management System</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-pink-500 to-teal-500 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-teal-600 transition text-sm font-medium shadow-md ml-auto"
          >
            <Plus size={16} />
            Add Employee
          </button>
        </div>

        {/* Unified Search/Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="flex flex-col gap-4">
            {/* Filter Type Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                type="button" // <-- Added this
                onClick={() => setActiveFilter('name')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition text-sm font-medium ${
                  activeFilter === 'name'
                    ? 'bg-gradient-to-r from-pink-500 to-teal-500 text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Search size={16} />
                Name/Email
              </button>
              <button
                type="button" // <-- Added this
                onClick={() => setActiveFilter('id')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition text-sm font-medium ${
                  activeFilter === 'id'
                    ? 'bg-gradient-to-r from-pink-500 to-teal-500 text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Hash size={16} />
                ID
              </button>
              <button
                type="button" // <-- Added this
                onClick={() => setActiveFilter('department')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition text-sm font-medium ${
                  activeFilter === 'department'
                    ? 'bg-gradient-to-r from-pink-500 to-teal-500 text-white shadow-md'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter size={16} />
                Department
              </button>
            </div>

            {/* Search Input and Actions */}
            {activeFilter !== 'all' && (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type={activeFilter === 'id' ? 'number' : 'text'}
                  placeholder={getPlaceholder()}
                  value={getCurrentInputValue()}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-sm"
                />
                <button
                  type="button" // <-- Added this
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-pink-500 to-teal-500 text-white px-5 py-2 rounded-full hover:from-pink-600 hover:to-teal-600 transition flex items-center gap-1.5 text-sm font-medium shadow-md w-full sm:w-auto justify-center"
                >
                  <Search size={16} />
                  Search
                </button>
                <button
                  type="button" // <-- Added this
                  onClick={loadEmployees}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-50 transition text-sm font-medium w-full sm:w-auto justify-center"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>
        
        <EmployeeTable 
          employees={employees} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showModal && (
          <EmployeeModal
            editingEmployee={editingEmployee}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onClose={resetForm}
          />
        )}
      </div>
    </div>
  );
}
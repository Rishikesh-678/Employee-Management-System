import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {employee.firstName} {employee.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">{employee.position}</td>
                <td className="px-6 py-4 whitespace-nowrap">Rs {employee.salary.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(employee)}
                      className="text-blue-600 hover:text-blue-800"
                      aria-label="Edit employee"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(employee.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete employee"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {employees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-sm text-gray-600">{employee.position}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(employee)}
                  className="text-blue-600 hover:text-blue-800 p-2"
                  aria-label="Edit employee"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(employee.id)}
                  className="text-red-600 hover:text-red-800 p-2"
                  aria-label="Delete employee"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-800 font-medium break-all">{employee.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Department:</span>
                <span className="text-gray-800 font-medium">{employee.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Salary:</span>
                <span className="text-gray-800 font-medium">Rs {employee.salary.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {employees.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
          No employees found
        </div>
      )}
    </>
  );
}
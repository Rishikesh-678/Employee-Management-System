
package com.example.employee.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.employee.exception.ResourceNotFoundException;
import com.example.employee.model.Employee;
import com.example.employee.repository.EmployeeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmployeeService {
    
    private final EmployeeRepository employeeRepository;
    
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
    
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));
    }
    
    @Transactional
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }
    
    @Transactional
    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = getEmployeeById(id);
        
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setDepartment(employeeDetails.getDepartment());
        employee.setPosition(employeeDetails.getPosition());
        employee.setSalary(employeeDetails.getSalary());
        employee.setHireDate(employeeDetails.getHireDate());
        employee.setPhone(employeeDetails.getPhone());
        
        return employeeRepository.save(employee);
    }
    
    @Transactional
    public void deleteEmployee(Long id) {
        Employee employee = getEmployeeById(id);
        employeeRepository.delete(employee);
    }
    
    public List<Employee> searchEmployees(String keyword) {
        return employeeRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(keyword, keyword);
    }
    
    public List<Employee> getEmployeesByDepartment(String department) {
        return employeeRepository.findByDepartmentIgnoreCase(department);
    }
}
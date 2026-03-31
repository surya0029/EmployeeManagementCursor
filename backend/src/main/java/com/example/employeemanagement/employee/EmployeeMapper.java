package com.example.employeemanagement.employee;

import com.example.employeemanagement.employee.dto.EmployeeRequest;
import com.example.employeemanagement.employee.dto.EmployeeResponse;

final class EmployeeMapper {
  private EmployeeMapper() {}

  static EmployeeResponse toResponse(Employee employee) {
    return new EmployeeResponse(
        employee.getId(),
        employee.getName(),
        employee.getEmail(),
        employee.getDepartment(),
        employee.getSalary()
    );
  }

  static void apply(Employee employee, EmployeeRequest request) {
    employee.setName(request.name());
    employee.setEmail(request.email());
    employee.setDepartment(request.department());
    employee.setSalary(request.salary());
  }
}


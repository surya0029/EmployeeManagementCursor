package com.example.employeemanagement.employee;

import com.example.employeemanagement.common.error.ConflictException;
import com.example.employeemanagement.common.error.NotFoundException;
import com.example.employeemanagement.employee.dto.EmployeeRequest;
import com.example.employeemanagement.employee.dto.EmployeeResponse;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EmployeeService {
  private final EmployeeRepository employeeRepository;

  public EmployeeService(EmployeeRepository employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  @Transactional
  public EmployeeResponse create(EmployeeRequest request) {
    if (employeeRepository.existsByEmailIgnoreCase(request.email())) {
      throw new ConflictException("email already exists");
    }
    Employee employee = new Employee();
    EmployeeMapper.apply(employee, request);
    return EmployeeMapper.toResponse(employeeRepository.save(employee));
  }

  @Transactional(readOnly = true)
  public List<EmployeeResponse> list() {
    return employeeRepository.findAll().stream().map(EmployeeMapper::toResponse).toList();
  }

  @Transactional(readOnly = true)
  public EmployeeResponse get(Long id) {
    Employee employee =
        employeeRepository.findById(id).orElseThrow(() -> new NotFoundException("employee not found"));
    return EmployeeMapper.toResponse(employee);
  }

  @Transactional
  public EmployeeResponse update(Long id, EmployeeRequest request) {
    Employee employee =
        employeeRepository.findById(id).orElseThrow(() -> new NotFoundException("employee not found"));

    employeeRepository
        .findByEmailIgnoreCase(request.email())
        .filter(other -> !other.getId().equals(id))
        .ifPresent(other -> {
          throw new ConflictException("email already exists");
        });

    EmployeeMapper.apply(employee, request);
    return EmployeeMapper.toResponse(employeeRepository.save(employee));
  }

  @Transactional
  public void delete(Long id) {
    if (!employeeRepository.existsById(id)) {
      throw new NotFoundException("employee not found");
    }
    employeeRepository.deleteById(id);
  }
}


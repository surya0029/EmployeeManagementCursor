package com.example.employeemanagement.employee;

import com.example.employeemanagement.employee.dto.EmployeeRequest;
import com.example.employeemanagement.employee.dto.EmployeeResponse;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "${app.cors.allowed-origins:http://localhost:5173}")
public class EmployeeController {
  private final EmployeeService employeeService;

  public EmployeeController(EmployeeService employeeService) {
    this.employeeService = employeeService;
  }

  @PostMapping
  public ResponseEntity<EmployeeResponse> create(@Valid @RequestBody EmployeeRequest request) {
    EmployeeResponse created = employeeService.create(request);
    return ResponseEntity.created(URI.create("/employees/" + created.id())).body(created);
  }

  @GetMapping
  public List<EmployeeResponse> list() {
    return employeeService.list();
  }

  @GetMapping("/{id}")
  public EmployeeResponse get(@PathVariable Long id) {
    return employeeService.get(id);
  }

  @PutMapping("/{id}")
  public EmployeeResponse update(@PathVariable Long id, @Valid @RequestBody EmployeeRequest request) {
    return employeeService.update(id, request);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    employeeService.delete(id);
    return ResponseEntity.noContent().build();
  }
}


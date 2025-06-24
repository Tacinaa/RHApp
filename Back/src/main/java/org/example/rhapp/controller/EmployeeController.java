package org.example.rhapp.controller;

import jakarta.validation.Valid;
import org.example.rhapp.dto.AbsenceDto;
import org.example.rhapp.dto.EmployeeDto;
import org.example.rhapp.dto.LeaveDto;
import org.example.rhapp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping
    public List<EmployeeDto> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@Valid @RequestBody EmployeeDto dto) {
        return ResponseEntity.ok(employeeService.createEmployee(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable Long id, @Valid @RequestBody EmployeeDto dto) {
        return ResponseEntity.ok(employeeService.updateEmployee(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/leaves")
    public ResponseEntity<Void> addLeave(@PathVariable Long id, @RequestBody LeaveDto leaveDto) {
        employeeService.addLeave(id, leaveDto);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/absences")
    public ResponseEntity<Void> addAbsence(@PathVariable Long id, @RequestBody AbsenceDto absenceDto) {
        employeeService.addAbsence(id, absenceDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/leaves")
    public List<LeaveDto> getLeaves(@PathVariable Long id) {
        return employeeService.getLeaves(id);
    }

    @GetMapping("/{id}/absences")
    public List<AbsenceDto> getAbsences(@PathVariable Long id) {
        return employeeService.getAbsences(id);
    }

    @DeleteMapping("/leaves/{leaveId}")
    public ResponseEntity<Void> deleteLeave(@PathVariable Long leaveId) {
        employeeService.deleteLeave(leaveId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/absences/{absenceId}")
    public ResponseEntity<Void> deleteAbsence(@PathVariable Long absenceId) {
        employeeService.deleteAbsence(absenceId);
        return ResponseEntity.noContent().build();
    }
}
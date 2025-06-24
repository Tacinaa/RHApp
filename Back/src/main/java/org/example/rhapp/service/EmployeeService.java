package org.example.rhapp.service;

import org.example.rhapp.dto.AbsenceDto;
import org.example.rhapp.dto.EmployeeDto;
import org.example.rhapp.dto.LeaveDto;

import java.util.List;

public interface EmployeeService {
    List<EmployeeDto> getAllEmployees();
    EmployeeDto getEmployeeById(Long id);
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto updateEmployee(Long id, EmployeeDto employeeDto);
    void deleteEmployee(Long id);
    void addLeave(Long employeeId, LeaveDto leaveDto);
    void addAbsence(Long employeeId, AbsenceDto absenceDto);
    List<LeaveDto> getLeaves(Long employeeId);
    List<AbsenceDto> getAbsences(Long employeeId);
    void deleteLeave(Long leaveId);
    void deleteAbsence(Long absenceId);
}
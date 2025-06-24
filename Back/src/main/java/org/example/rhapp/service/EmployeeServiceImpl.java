package org.example.rhapp.service;

import org.example.rhapp.dto.AbsenceDto;
import org.example.rhapp.dto.EmployeeDto;
import org.example.rhapp.dto.LeaveDto;
import org.example.rhapp.model.Absence;
import org.example.rhapp.model.Employee;
import org.example.rhapp.model.Leave;
import org.example.rhapp.repository.AbsenceRepository;
import org.example.rhapp.repository.EmployeeRepository;
import org.example.rhapp.repository.LeaveRepository;
import org.example.rhapp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private AbsenceRepository absenceRepository;

    @Override
    public List<EmployeeDto> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employé non trouvé"));
        return toDto(emp);
    }

    @Override
    public EmployeeDto createEmployee(EmployeeDto dto) {
        Employee emp = toEntity(dto);
        return toDto(employeeRepository.save(emp));
    }

    @Override
    public void addLeave(Long employeeId, LeaveDto leaveDto) {
        Employee e = employeeRepository.findById(employeeId).orElseThrow();
        Leave leave = new Leave();
        leave.setStartDate(LocalDate.parse(leaveDto.getStartDate()));
        leave.setEndDate(LocalDate.parse(leaveDto.getEndDate()));
        leave.setEmployee(e);
        leaveRepository.save(leave);
    }

    @Override
    public void addAbsence(Long employeeId, AbsenceDto absenceDto) {
        Employee e = employeeRepository.findById(employeeId).orElseThrow();
        Absence absence = new Absence();
        absence.setDate(LocalDate.parse(absenceDto.getDate()));
        absence.setEmployee(e);
        absenceRepository.save(absence);
    }

    @Override
    public List<LeaveDto> getLeaves(Long employeeId) {
        return leaveRepository.findByEmployeeId(employeeId)
                .stream()
                .map(l -> {
                    LeaveDto dto = new LeaveDto();
                    dto.setStartDate(l.getStartDate().toString());
                    dto.setEndDate(l.getEndDate().toString());
                    dto.setId(l.getId());
                    return dto;
                }).toList();
    }

    @Override
    public List<AbsenceDto> getAbsences(Long employeeId) {
        return absenceRepository.findByEmployeeId(employeeId)
                .stream()
                .map(a -> {
                    AbsenceDto dto = new AbsenceDto();
                    dto.setDate(a.getDate().toString());
                    dto.setId(a.getId());
                    return dto;
                }).toList();
    }

    @Override
    public void deleteLeave(Long leaveId) {
        leaveRepository.deleteById(leaveId);
    }

    @Override
    public void deleteAbsence(Long absenceId) {
        absenceRepository.deleteById(absenceId);
    }

    @Override
    public EmployeeDto updateEmployee(Long id, EmployeeDto dto) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employé non trouvé"));

        existing.setNom(dto.getNom());
        existing.setAdresse(dto.getAdresse());
        existing.setEmail(dto.getEmail());
        existing.setTelephone(dto.getTelephone());
        existing.setDateNaissance(dto.getDateNaissance());
        existing.setNumeroIdentification(dto.getNumeroIdentification());
        existing.setPoste(dto.getPoste());
        existing.setSalaire(dto.getSalaire());
        existing.setDebutContrat(dto.getDebutContrat());
        existing.setFinContrat(dto.getFinContrat());
        existing.setObservations(dto.getObservations());

        return toDto(employeeRepository.save(existing));
    }

    @Override
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employé non trouvé");
        }
        employeeRepository.deleteById(id);
    }

    private EmployeeDto toDto(Employee e) {
        EmployeeDto dto = new EmployeeDto();
        dto.setId(e.getId());
        dto.setNom(e.getNom());
        dto.setEmail(e.getEmail());
        dto.setTelephone(e.getTelephone());
        dto.setAdresse(e.getAdresse());
        dto.setNumeroIdentification(e.getNumeroIdentification());
        dto.setDateNaissance(e.getDateNaissance());
        dto.setDebutContrat(e.getDebutContrat());
        dto.setFinContrat(e.getFinContrat());
        dto.setPoste(e.getPoste());
        dto.setSalaire(e.getSalaire());
        dto.setObservations(e.getObservations());
        return dto;
    }

    private Employee toEntity(EmployeeDto dto) {
        Employee e = new Employee();
        e.setNom(dto.getNom());
        e.setEmail(dto.getEmail());
        e.setTelephone(dto.getTelephone());
        e.setAdresse(dto.getAdresse());
        e.setNumeroIdentification(dto.getNumeroIdentification());
        e.setDateNaissance(dto.getDateNaissance());
        e.setDebutContrat(dto.getDebutContrat());
        e.setFinContrat(dto.getFinContrat());
        e.setPoste(dto.getPoste());
        e.setSalaire(dto.getSalaire());
        e.setObservations(dto.getObservations());
        return e;
    }
}

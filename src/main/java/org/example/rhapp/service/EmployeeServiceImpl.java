package org.example.rhapp.service;

import org.example.rhapp.dto.EmployeeDto;
import org.example.rhapp.model.Employee;
import org.example.rhapp.repository.EmployeeRepository;
import org.example.rhapp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

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

package org.example.rhapp.service;

import org.example.rhapp.dto.CandidatDto;
import org.example.rhapp.model.Candidat;
import org.example.rhapp.repository.CandidatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidatServiceImpl implements CandidatService {

    private final CandidatRepository candidatRepository;

    @Autowired
    public CandidatServiceImpl(CandidatRepository candidatRepository) {
        this.candidatRepository = candidatRepository;
    }

    @Override
    public List<CandidatDto> getAllCandidats() {
        return candidatRepository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    public CandidatDto getCandidatById(Long id) {
        Candidat c = candidatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidat non trouvé"));
        return toDto(c);
    }

    @Override
    public CandidatDto createCandidat(CandidatDto dto) {
        return toDto(candidatRepository.save(toEntity(dto)));
    }

    @Override
    public CandidatDto updateCandidat(Long id, CandidatDto dto) {
        Candidat existing = candidatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Candidat non trouvé"));

        existing.setNom(dto.getNom());
        existing.setAdresse(dto.getAdresse());
        existing.setEmail(dto.getEmail());
        existing.setTelephone(dto.getTelephone());
        existing.setDateNaissance(dto.getDateNaissance());
        existing.setNumeroIdentification(dto.getNumeroIdentification());
        existing.setNote(dto.getNote());
        existing.setDomaineTechnique(dto.getDomaineTechnique());
        existing.setDateEntretien(dto.getDateEntretien());
        existing.setObservations(dto.getObservations());

        return toDto(candidatRepository.save(existing));
    }

    @Override
    public void deleteCandidat(Long id) {
        if (!candidatRepository.existsById(id)) {
            throw new RuntimeException("Candidat non trouvé");
        }
        candidatRepository.deleteById(id);
    }

    private CandidatDto toDto(Candidat c) {
        CandidatDto dto = new CandidatDto();
        dto.setId(c.getId());
        dto.setNom(c.getNom());
        dto.setEmail(c.getEmail());
        dto.setTelephone(c.getTelephone());
        dto.setAdresse(c.getAdresse());
        dto.setNumeroIdentification(c.getNumeroIdentification());
        dto.setDateNaissance(c.getDateNaissance());
        dto.setNote(c.getNote());
        dto.setDomaineTechnique(c.getDomaineTechnique());
        dto.setDateEntretien(c.getDateEntretien());
        dto.setObservations(c.getObservations());
        return dto;
    }

    private Candidat toEntity(CandidatDto dto) {
        Candidat c = new Candidat();
        c.setNom(dto.getNom());
        c.setEmail(dto.getEmail());
        c.setTelephone(dto.getTelephone());
        c.setAdresse(dto.getAdresse());
        c.setNumeroIdentification(dto.getNumeroIdentification());
        c.setDateNaissance(dto.getDateNaissance());
        c.setNote(dto.getNote());
        c.setDomaineTechnique(dto.getDomaineTechnique());
        c.setDateEntretien(dto.getDateEntretien());
        c.setObservations(dto.getObservations());
        return c;
    }
}
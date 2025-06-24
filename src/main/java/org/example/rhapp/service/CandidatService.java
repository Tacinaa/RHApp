package org.example.rhapp.service;

import org.example.rhapp.dto.CandidatDto;

import java.util.List;

public interface CandidatService {
    List<CandidatDto> getAllCandidats();
    CandidatDto getCandidatById(Long id);
    CandidatDto createCandidat(CandidatDto candidatDto);
    CandidatDto updateCandidat(Long id, CandidatDto candidatDto);
    void deleteCandidat(Long id);
}
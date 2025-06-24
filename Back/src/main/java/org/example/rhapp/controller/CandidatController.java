package org.example.rhapp.controller;

import jakarta.validation.Valid;
import org.example.rhapp.dto.CandidatDto;
import org.example.rhapp.service.CandidatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidats")
@CrossOrigin(origins = "*")
public class CandidatController {

    private final CandidatService candidatService;

    @Autowired
    public CandidatController(CandidatService candidatService) {
        this.candidatService = candidatService;
    }

    @GetMapping
    public List<CandidatDto> getAllCandidats() {
        return candidatService.getAllCandidats();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CandidatDto> getCandidatById(@PathVariable Long id) {
        return ResponseEntity.ok(candidatService.getCandidatById(id));
    }

    @PostMapping
    public ResponseEntity<CandidatDto> createCandidat(@Valid @RequestBody CandidatDto dto) {
        return ResponseEntity.ok(candidatService.createCandidat(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CandidatDto> updateCandidat(@PathVariable Long id, @Valid @RequestBody CandidatDto dto) {
        return ResponseEntity.ok(candidatService.updateCandidat(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidat(@PathVariable Long id) {
        candidatService.deleteCandidat(id);
        return ResponseEntity.noContent().build();
    }
}
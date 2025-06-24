package org.example.rhapp.dto;

import java.time.LocalDate;

public class EmployeeDto {
    private Long id;
    private String nom;
    private String email;
    private String telephone;
    private String adresse;
    private String numeroIdentification;
    private LocalDate dateNaissance;
    private LocalDate debutContrat;
    private LocalDate finContrat;
    private String poste;
    private Double salaire;
    private String observations;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getNumeroIdentification() {
        return numeroIdentification;
    }

    public void setNumeroIdentification(String numeroIdentification) {
        this.numeroIdentification = numeroIdentification;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public LocalDate getDebutContrat() {
        return debutContrat;
    }

    public void setDebutContrat(LocalDate debutContrat) {
        this.debutContrat = debutContrat;
    }

    public LocalDate getFinContrat() {
        return finContrat;
    }

    public void setFinContrat(LocalDate finContrat) {
        this.finContrat = finContrat;
    }

    public String getPoste() {
        return poste;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }

    public Double getSalaire() {
        return salaire;
    }

    public void setSalaire(Double salaire) {
        this.salaire = salaire;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }
}
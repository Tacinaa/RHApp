import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { Employee } from "../types/Employee";

export default function EditEmployee() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Employee>({
    id: 0,
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    numeroIdentification: "",
    dateNaissance: "",
    debutContrat: "",
    finContrat: "",
    poste: "",
    salaire: 0,
    observations: ""
  });

  useEffect(() => {
    axios
      .get<Employee>(`http://localhost:8080/api/employees/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => {
        console.error(err);
        alert("Employé introuvable");
        navigate("/employees");
      });
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8080/api/employees/${id}`, {
        ...form,
        salaire: Number(form.salaire)
      })
      .then(() => {
        navigate("/employees");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4">
      <h2>Modifier un employé</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Nom</label>
            <input className="form-control" name="nom" value={form.nom} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Téléphone</label>
            <input className="form-control" name="telephone" value={form.telephone} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Adresse</label>
            <input className="form-control" name="adresse" value={form.adresse} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Numéro d'identification</label>
            <input className="form-control" name="numeroIdentification" value={form.numeroIdentification} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Date de naissance</label>
            <input type="date" className="form-control" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Début du contrat</label>
            <input type="date" className="form-control" name="debutContrat" value={form.debutContrat} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Fin du contrat</label>
            <input type="date" className="form-control" name="finContrat" value={form.finContrat} onChange={handleChange} />
          </div>
          <div className="col-md-6 mb-3">
            <label>Poste</label>
            <input className="form-control" name="poste" value={form.poste} onChange={handleChange} required />
          </div>
          <div className="col-md-6 mb-3">
            <label>Salaire</label>
            <input type="number" className="form-control" name="salaire" value={form.salaire} onChange={handleChange} required />
          </div>
          <div className="col-12 mb-3">
            <label>Observations</label>
            <textarea className="form-control" name="observations" value={form.observations} onChange={handleChange} rows={3} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary me-2">Mettre à jour</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/employees")}>
          Annuler
        </button>
      </form>
    </div>
  );
}
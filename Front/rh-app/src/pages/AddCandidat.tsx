import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddCandidat() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
    numeroIdentification: "",
    dateNaissance: "",
    note: 0,
    domaineTechnique: "",
    dateEntretien: "",
    observations: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/candidats", {
        ...form,
        note: Number(form.note)
      })
      .then(() => navigate("/candidats"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-4">
      <h2>Ajouter un candidat</h2>
      <form onSubmit={handleSubmit} className="mt-4 row">
        {[
          { name: "nom", label: "Nom" },
          { name: "email", label: "Email", type: "email" },
          { name: "telephone", label: "Téléphone" },
          { name: "adresse", label: "Adresse" },
          { name: "numeroIdentification", label: "Numéro d'identification" },
          { name: "dateNaissance", label: "Date de naissance", type: "date" },
          { name: "note", label: "Note sur 10", type: "number" },
          { name: "domaineTechnique", label: "Domaine technique" },
          { name: "dateEntretien", label: "Date d'entretien", type: "date" },
        ].map(({ name, label, type = "text" }) => (
          <div className="col-md-6 mb-3" key={name}>
            <label>{label}</label>
            <input
              type={type}
              className="form-control"
              name={name}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="col-12 mb-3">
          <label>Observations</label>
          <textarea
            className="form-control"
            name="observations"
            value={form.observations}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <button type="submit" className="btn btn-success me-2">Ajouter</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/candidats")}>Annuler</button>
      </form>
    </div>
  );
}
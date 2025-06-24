import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { Candidat } from "../types/Candidat";

export default function EditCandidat() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Candidat | null>(null);

  useEffect(() => {
    axios
      .get<Candidat>(`http://localhost:8080/api/candidats/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => {
        console.error(err);
        alert("Candidat introuvable");
        navigate("/candidats");
      });
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (form) {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    axios
      .put(`http://localhost:8080/api/candidats/${id}`, {
        ...form,
        note: Number(form.note)
      })
      .then(() => navigate("/candidats"))
      .catch((err) => console.error(err));
  };

  if (!form) return <div className="p-4">Chargement...</div>;

  return (
    <div className="p-4">
      <h2>Modifier le candidat</h2>
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

        <button type="submit" className="btn btn-primary me-2">Mettre à jour</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/candidats")}>Annuler</button>
      </form>
    </div>
  );
}
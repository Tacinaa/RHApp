import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { Candidat } from "../types/Candidat";

export default function CandidatDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidat, setCandidat] = useState<Candidat | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/candidats/${id}`)
      .then((res) => setCandidat(res.data))
      .catch((err) => {
        console.error(err);
        alert("Candidat introuvable");
        navigate("/candidats");
      });
  }, [id, navigate]);

  const handleDelete = () => {
    if (window.confirm("Supprimer ce candidat ?")) {
      axios
        .delete(`http://localhost:8080/api/candidats/${id}`)
        .then(() => navigate("/candidats"))
        .catch((err) => console.error(err));
    }
  };

  if (!candidat) return <div className="p-4">Chargement...</div>;

  return (
    <div className="p-4">
      <h2>Détails du candidat</h2>

      <div className="mb-4 mt-3">
        <button className="btn btn-primary me-2" onClick={() => navigate(`/candidats/${id}/edit`)}>
          Mettre à jour les données
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Supprimer l'employé
        </button>
      </div>

      <table className="table">
        <tbody>
          {[
            ["Nom", candidat.nom],
            ["Numéro de carte d'identité", candidat.numeroIdentification],
            ["Date de naissance", candidat.dateNaissance],
            ["Adresse", candidat.adresse],
            ["Email", candidat.email],
            ["Téléphone", candidat.telephone],
            ["Note (1-10)", candidat.note],
            ["Domaine technique", candidat.domaineTechnique],
            ["Date de l'entretien", candidat.dateEntretien],
            ["Observation", candidat.observations]
          ].map(([label, value]) => (
            <tr key={label}>
              <th>{label}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-secondary" onClick={() => navigate("/candidats")}>
        Retour
      </button>
    </div>
  );
}
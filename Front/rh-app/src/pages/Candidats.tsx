import { useEffect, useState } from "react";
import axios from "axios";
import type { Candidat } from "../types/Candidat";
import { Link } from "react-router-dom";

export default function Candidats() {
  const [candidats, setCandidats] = useState<Candidat[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/candidats")
      .then((res) => setCandidats(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Supprimer ce candidat ?")) {
      axios
        .delete(`http://localhost:8080/api/candidats/${id}`)
        .then(() => setCandidats(candidats.filter(c => c.id !== id)))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Liste des candidats</h2>
        <Link to="/candidats/add" className="btn btn-primary">
          Ajouter un candidat
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Note</th>
            <th>Domaine</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidats.map(c => (
            <tr key={c.id}>
              <td>{c.nom}</td>
              <td>{c.email}</td>
              <td>{c.note}/10</td>
              <td>{c.domaineTechnique}</td>
              <td>
                <Link to={`/candidats/${c.id}`} className="btn btn-sm btn-success me-2">Voir</Link>
                <Link to={`/candidats/${c.id}/edit`} className="btn btn-sm btn-primary me-2">Modifier</Link>
                <button onClick={() => handleDelete(c.id)} className="btn btn-sm btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
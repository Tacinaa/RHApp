import { useEffect, useState } from "react";
import axios from "axios";
import type { Employee } from "../types/Employee";
import { Link } from "react-router-dom";

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Employee[]>("http://localhost:8080/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Supprimer cet employé ?")) {
      axios
        .delete(`http://localhost:8080/api/employees/${id}`)
        .then(() => setEmployees(employees.filter((e) => e.id !== id)))
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Liste des employés</h2>
        <Link to="/employees/add" className="btn btn-primary">
          Ajouter un employé
        </Link>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Poste</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.nom}</td>
              <td>{emp.poste}</td>
              <td>{emp.email}</td>
              <td>{emp.telephone}</td>
              <td>
                <Link to={`/employees/${emp.id}`} className="btn btn-sm btn-success me-2">
                  Voir
                </Link>
                <Link to={`/employees/${emp.id}/edit`} className="btn btn-sm btn-primary me-2">
                  Mettre à jour
                </Link>
                <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-danger">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
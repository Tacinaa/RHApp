import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { Employee } from "../types/Employee";

export default function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    axios
      .get<Employee>(`http://localhost:8080/api/employees/${id}`)
      .then((res) => setEmployee(res.data))
      .catch((err) => {
        console.error(err);
        alert("Employé introuvable");
        navigate("/employees");
      });
  }, [id, navigate]);

  if (!employee) return <div className="p-4">Chargement...</div>;

  return (
    <div className="p-4">
      <h2>Détails de l'employé</h2>
      <table className="table mt-4">
        <tbody>
          <tr>
            <th>Nom</th>
            <td>{employee.nom}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{employee.email}</td>
          </tr>
          <tr>
            <th>Téléphone</th>
            <td>{employee.telephone}</td>
          </tr>
          <tr>
            <th>Adresse</th>
            <td>{employee.adresse}</td>
          </tr>
          <tr>
            <th>Numéro ID</th>
            <td>{employee.numeroIdentification}</td>
          </tr>
          <tr>
            <th>Date de naissance</th>
            <td>{employee.dateNaissance}</td>
          </tr>
          <tr>
            <th>Début contrat</th>
            <td>{employee.debutContrat}</td>
          </tr>
          <tr>
            <th>Fin contrat</th>
            <td>{employee.finContrat}</td>
          </tr>
          <tr>
            <th>Poste</th>
            <td>{employee.poste}</td>
          </tr>
          <tr>
            <th>Salaire</th>
            <td>{employee.salaire} €</td>
          </tr>
          <tr>
            <th>Observations</th>
            <td>{employee.observations}</td>
          </tr>
        </tbody>
      </table>

      <button className="btn btn-secondary" onClick={() => navigate("/employees")}>
        Retour
      </button>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { Employee } from "../types/Employee";

interface Leave {
  id: number;
  startDate: string;
  endDate: string;
}

interface Absence {
  id: number;
  date: string;
}

export default function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [leaves, setLeaves] = useState<Leave[]>([]);

  const [showAbsenceModal, setShowAbsenceModal] = useState(false);
  const [absenceDate, setAbsenceDate] = useState("");

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveStart, setLeaveStart] = useState("");
  const [leaveEnd, setLeaveEnd] = useState("");

  useEffect(() => {
    if (!id) return;

    axios.get(`http://localhost:8080/api/employees/${id}`).then((res) => setEmployee(res.data));
    axios.get(`http://localhost:8080/api/employees/${id}/absences`).then((res) => setAbsences(res.data));
    axios.get(`http://localhost:8080/api/employees/${id}/leaves`).then((res) => setLeaves(res.data));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Supprimer cet employé ?")) {
      axios.delete(`http://localhost:8080/api/employees/${id}`).then(() => navigate("/employees"));
    }
  };

  const handleAddAbsence = () => {
    axios
      .post(`http://localhost:8080/api/employees/${id}/absences`, { date: absenceDate })
      .then(() => {
        setShowAbsenceModal(false);
        setAbsenceDate("");
        return axios.get(`http://localhost:8080/api/employees/${id}/absences`);
      })
      .then((res) => setAbsences(res.data));
  };

  const handleAddLeave = () => {
    axios
      .post(`http://localhost:8080/api/employees/${id}/leaves`, {
        startDate: leaveStart,
        endDate: leaveEnd
      })
      .then(() => {
        setShowLeaveModal(false);
        setLeaveStart("");
        setLeaveEnd("");
        return axios.get(`http://localhost:8080/api/employees/${id}/leaves`);
      })
      .then((res) => setLeaves(res.data));
  };

  const deleteAbsence = (absenceId: number) => {
    axios.delete(`http://localhost:8080/api/employees/absences/${absenceId}`).then(() => {
      setAbsences(absences.filter((a) => a.id !== absenceId));
    });
  };

  const deleteLeave = (leaveId: number) => {
    axios.delete(`http://localhost:8080/api/employees/leaves/${leaveId}`).then(() => {
      setLeaves(leaves.filter((l) => l.id !== leaveId));
    });
  };

  if (!employee) return <div className="p-4">Chargement...</div>;

  return (
    <div className="p-4">
      <h2>Détails de l'employé</h2>

      <div className="mb-4 mt-3">
        <button className="btn btn-primary me-2" onClick={() => navigate(`/employees/${id}/edit`)}>Mettre à jour les données</button>
        <button className="btn btn-info me-2" onClick={() => setShowLeaveModal(true)}>Attribuer des congés</button>
        <button className="btn btn-warning me-2" onClick={() => setShowAbsenceModal(true)}>Signaler une absence</button>
        <button className="btn btn-danger" onClick={handleDelete}>Supprimer l'employé</button>
      </div>

      <table className="table">
        <tbody>
          {[
            ["Nom", employee.nom],
            ["Occupation", employee.poste],
            ["Salaire", employee.salaire + " €"],
            ["Début du contrat", employee.debutContrat],
            ["Fin du contrat", employee.finContrat],
            ["Numéro d'identification", employee.numeroIdentification],
            ["Date de naissance", employee.dateNaissance],
            ["Adresse", employee.adresse],
            ["Email", employee.email],
            ["Téléphone", employee.telephone],
            ["Observations", employee.observations]
          ].map(([label, value]) => (
            <tr key={label}>
              <th>{label}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="accordion mt-5" id="accordionAbsencesLeaves">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingLeaves">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLeaves" aria-expanded="true" aria-controls="collapseLeaves">
              Congés ({leaves.length})
            </button>
          </h2>
          <div id="collapseLeaves" className="accordion-collapse collapse show" aria-labelledby="headingLeaves" data-bs-parent="#accordionAbsencesLeaves">
            <div className="accordion-body p-0">
              <table className="table table-bordered mb-0">
                <thead>
                  <tr><th>Début</th><th>Fin</th><th></th></tr>
                </thead>
                <tbody>
                  {leaves.map((l) => (
                    <tr key={l.id}>
                      <td>{l.startDate}</td>
                      <td>{l.endDate}</td>
                      <td><button onClick={() => deleteLeave(l.id)} className="btn btn-sm btn-outline-danger">🗑️</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingAbsences">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAbsences" aria-expanded="false" aria-controls="collapseAbsences">
              Absences ({absences.length})
            </button>
          </h2>
          <div id="collapseAbsences" className="accordion-collapse collapse" aria-labelledby="headingAbsences" data-bs-parent="#accordionAbsencesLeaves">
            <div className="accordion-body p-0">
              <table className="table table-bordered mb-0">
                <thead>
                  <tr><th>Jour</th><th></th></tr>
                </thead>
                <tbody>
                  {absences.map((a) => (
                    <tr key={a.id}>
                      <td>{a.date}</td>
                      <td><button onClick={() => deleteAbsence(a.id)} className="btn btn-sm btn-outline-danger">🗑️</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showAbsenceModal && (
        <>
          <div className="modal fade show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Signaler une absence</h5>
                  <button type="button" className="btn-close" onClick={() => setShowAbsenceModal(false)} />
                </div>
                <div className="modal-body">
                  <label>Date de l'absence</label>
                  <input type="date" className="form-control" value={absenceDate} onChange={(e) => setAbsenceDate(e.target.value)} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowAbsenceModal(false)}>Fermer</button>
                  <button className="btn btn-primary" onClick={handleAddAbsence}>OK</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {showLeaveModal && (
        <>
          <div className="modal fade show d-block" tabIndex={-1} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Donner des congés</h5>
                  <button type="button" className="btn-close" onClick={() => setShowLeaveModal(false)} />
                </div>
                <div className="modal-body">
                  <label>Début des congés</label>
                  <input type="date" className="form-control mb-3" value={leaveStart} onChange={(e) => setLeaveStart(e.target.value)} />
                  <label>Fin des congés</label>
                  <input type="date" className="form-control" value={leaveEnd} onChange={(e) => setLeaveEnd(e.target.value)} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowLeaveModal(false)}>Fermer</button>
                  <button className="btn btn-primary" onClick={handleAddLeave}>OK</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}
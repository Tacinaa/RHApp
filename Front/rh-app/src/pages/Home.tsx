import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [candidatCount, setCandidatCount] = useState<number>(0);

  useEffect(() => {
    axios.get("http://localhost:8080/api/employees").then((res) => setEmployeeCount(res.data.length));
    axios.get("http://localhost:8080/api/candidats").then((res) => setCandidatCount(res.data.length));
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100 justify-content-center gap-5">
        <Link to="/employees" className="col-md-3 text-decoration-none">
          <div className="card text-center shadow border-0 hover-card bg-primary text-white">
            <div className="card-body p-5">
              <i className="bi bi-people-fill fs-1 mb-3"></i>
              <h4 className="card-title">{employeeCount} Employés</h4>
            </div>
          </div>
        </Link>

        <Link to="/candidats" className="col-md-3 text-decoration-none">
          <div className="card text-center shadow border-0 hover-card bg-info text-white">
            <div className="card-body p-5">
              <i className="bi bi-person-badge-fill fs-1 mb-3"></i>
              <h4 className="card-title">{candidatCount} Candidats</h4>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
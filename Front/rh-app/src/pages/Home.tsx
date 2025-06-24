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
        <div className="col-md-3">
          <Link to="/employees" className="text-decoration-none">
            <div className="border rounded p-5 text-center shadow-sm">
              <h4>{employeeCount} Employés</h4>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/candidats" className="text-decoration-none">
            <div className="border rounded p-5 text-center shadow-sm">
              <h4>{candidatCount} Candidats</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

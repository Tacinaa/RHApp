import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white p-3 vh-100" style={{ width: '220px' }}>
      <h4>Système de gestion RH</h4>
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">Accueil</Link>
        </li>
        <li className="nav-item">
          <Link to="/employees" className="nav-link text-white">Employés</Link>
        </li>
        <li className="nav-item">
          <Link to="/candidats" className="nav-link text-white">Candidats</Link>
        </li>
      </ul>
    </div>
  );
}
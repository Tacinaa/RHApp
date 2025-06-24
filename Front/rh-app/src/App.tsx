import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Candidats from "./pages/Candidats";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import AddCandidat from "./pages/AddCandidat";
import CandidatDetails from "./pages/CandidatDetails";
import EditCandidat from "./pages/EditCandidat";

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/candidats" element={<Candidats />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/:id/edit" element={<EditEmployee />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/candidats" element={<Candidats />} />
          <Route path="/candidats/add" element={<AddCandidat />} />
          <Route path="/candidats/:id" element={<CandidatDetails />} />
          <Route path="/candidats/:id/edit" element={<EditCandidat />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
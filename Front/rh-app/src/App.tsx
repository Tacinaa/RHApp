import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Candidats from "./pages/Candidats";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";

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
        </Routes>
      </div>
    </div>
  );
}

export default App;
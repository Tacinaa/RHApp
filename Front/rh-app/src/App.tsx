import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Candidats from "./pages/Candidats";

function App() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/candidats" element={<Candidats />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
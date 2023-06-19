import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";

// Admin Components
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAddAdvisor from "./pages/admin/AddAdvisor";
import AdminProfile from "./pages/admin/MyProfile";
import AdminViewLeads from "./pages/advisor/ViewLeads";

// Advisor Components
import AdvisorDashboard from "./pages/advisor/Dashboard";
import AdvisorProfile from "./pages/advisor/MyProfile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-advisor" element={<AdminAddAdvisor />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/view-leads" element={<AdminViewLeads />} />
        </Route>

        {/* Advisor Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/advisor/dashboard" element={<AdvisorDashboard />} />
          <Route path="/advisor/profile" element={<AdvisorProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

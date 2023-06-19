import Home from "./pages/Home";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddLeads from "./pages/advisor/AddLeads";
import Dashboard from "./pages/advisor/Dashboard";
import MyProfile from "./pages/advisor/MyProfile";
import { useSelector } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import ViewLeads from "./pages/advisor/ViewLeads";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Advisor Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/advisor-dashboard" element={<Dashboard />} />
          <Route path="/add-leads" element={<AddLeads />} />
          <Route path="/view-leads" element={<ViewLeads />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

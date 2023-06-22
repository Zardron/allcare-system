import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Admin Components
import AdminDashboard from "./pages/admin/Dashboard";
import AdminAddAdvisor from "./pages/admin/AddAdvisor";
import AdminProfile from "./pages/admin/MyProfile";
import AdminViewLeads from "./pages/advisor/ViewLeads";

// Advisor Components
import AdvisorDashboard from "./pages/advisor/Dashboard";
import AdvisorProfile from "./pages/advisor/MyProfile";
import AdvisorViewLeads from "./pages/advisor/ViewLeads";
import AdvisorViewLeadsDetails from "./pages/advisor/ViewLeadsDetails";
import AdvisorAddProduct from "./pages/advisor/AddProduct";

// Leads Components
import LeadsDashboard from "./pages/leads/Dashboard";
import LeadsProfile from "./pages/leads/MyProfile";
import LeadsViewAdvisor from "./pages/leads/ViewAdvisor";
import LeadsViewAdvisorDetails from "./pages/leads/ViewAdvisorDetails";
import LeadsAdvisorRatingList from "./pages/leads/AdvisorRatingList";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
          <Route path="/advisor/view-leads" element={<AdvisorViewLeads />} />
          <Route
            path="/advisor/leads-details"
            element={<AdvisorViewLeadsDetails />}
          />
          <Route path="/advisor/add-product" element={<AdvisorAddProduct />} />
        </Route>

        {/* Leads Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/leads/dashboard" element={<LeadsDashboard />} />
          <Route path="/leads/profile" element={<LeadsProfile />} />
          <Route path="/leads/view-advisor" element={<LeadsViewAdvisor />} />
          <Route
            path="/leads/advisor-details"
            element={<LeadsViewAdvisorDetails />}
          />
          <Route
            path="/leads/advisor-rating-list"
            element={<LeadsAdvisorRatingList />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import Activities from "./pages/Activities";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Deals from "./pages/Deals";
import DebugLogin from "./pages/DebugLogin";
import Kanban from "./pages/Kanban";
import Leads from "./pages/Leads";
import { LoginPage } from "./pages/Login";
import Notes from "./pages/Notes";
import Pipeline from "./pages/Pipeline";
import { RegisterPage } from "./pages/Register";
import Reports from "./pages/Reports";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/debug" element={<DebugLogin />} />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/kanban" element={<Kanban />} />
                    <Route path="/pipeline" element={<Pipeline />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route
                      path="/communications"
                      element={<Communications />}
                    />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/activities" element={<Activities />} />
                    <Route path="/notes" element={<Notes />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

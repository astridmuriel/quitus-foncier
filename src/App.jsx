import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DeclarationForm from './pages/DeclarationForm';
import AvisImposition from './pages/AvisImposition';
import MinistryDashboard from './pages/MinistryDashboard';
import FiscalCartography from './pages/FiscalCartography';
import Analyses from './pages/Analyses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/:userType" element={<Login />} />
        <Route path="/login" element={<Navigate to="/login/particulier" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/declaration/new" element={<DeclarationForm />} />
        <Route path="/avis/:id" element={<AvisImposition />} />
        <Route path="/ministry" element={<MinistryDashboard />} />
        <Route path="/ministry/cartography" element={<FiscalCartography />} />
        <Route path="/ministry/analyses" element={<Analyses />} />
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

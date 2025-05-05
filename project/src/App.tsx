// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// antes das suas rotas...
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/AuthStore';
// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
// Pages
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import StudentsPage from './pages/students/StudentsPage';
import StudentDetailsPage from './pages/students/StudentDetailsPage';
import InstructorsPage from './pages/instructors/InstructorsPage';
import VehiclesPage from './pages/vehicles/VehiclesPage';
import SchedulePage from './pages/schedule/SchedulePage';
import ExamsPage from './pages/exams/ExamsPage';
import FinancePage from './pages/finance/FinancePage';
import SettingsPage from './pages/settings/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import APIPage from './pages/api/APIPage';
import SupportPage from './pages/support/SupportPage';
import NewStudentPage from './pages/students/NewStudentPage'

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/:id" element={<StudentDetailsPage />} />
          <Route path="instructors" element={<InstructorsPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="exams" element={<ExamsPage />} />
          <Route path="finance" element={<FinancePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="api" element={<APIPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/new" element={<NewStudentPage />} />
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
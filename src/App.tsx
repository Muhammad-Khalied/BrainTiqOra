import { Routes, Route } from 'react-router-dom';
import PublicApp from './PublicApp';
import AdminDashboard from './components/Admin/AdminDashboard';
import Login from './components/Admin/Login';
import ProtectedRoute from './components/Admin/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      {/* Catch all other routes and send them to the Public App */}
      <Route path="*" element={<PublicApp />} />
    </Routes>
  );
}

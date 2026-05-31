import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import NewAppointment from './pages/NewAppointment';
import Doctors from './pages/Doctors';
import DoctorAvailability from './pages/DoctorAvailability';
import MedicalRecords from './pages/MedicalRecords';
import Users from './pages/Users';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="appointments/new" element={<NewAppointment />} />
            <Route path="doctors" element={<Doctors />} />
            <Route path="doctors/:id/availability" element={<DoctorAvailability />} />
            <Route path="medical-records" element={<MedicalRecords />} />
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

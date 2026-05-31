import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    completedAppointments: 0
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await axios.get('/api/appointments');
      const appointments = response.data.appointments;

      // Calcular estadísticas
      setStats({
        totalAppointments: appointments.length,
        pendingAppointments: appointments.filter(a => a.status === 'pendiente').length,
        confirmedAppointments: appointments.filter(a => a.status === 'confirmada').length,
        completedAppointments: appointments.filter(a => a.status === 'completada').length
      });

      // Próximas citas
      const today = new Date();
      const upcoming = appointments
        .filter(a => new Date(a.appointmentDate) >= today && a.status !== 'cancelada')
        .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
        .slice(0, 5);
      
      setUpcomingAppointments(upcoming);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pendiente: 'badge badge-warning',
      confirmada: 'badge badge-info',
      completada: 'badge badge-success',
      cancelada: 'badge badge-danger'
    };
    return badges[status] || 'badge';
  };

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Bienvenido, {user?.firstName}
        </h1>
        {user?.role === 'paciente' && (
          <Link to="/appointments/new" className="btn btn-primary w-full sm:w-auto text-center">
            Nueva Cita
          </Link>
        )}
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2">Total de Citas</h3>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{stats.totalAppointments}</p>
        </div>
        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-4">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2">Pendientes</h3>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{stats.pendingAppointments}</p>
        </div>
        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white p-4">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2">Confirmadas</h3>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{stats.confirmedAppointments}</p>
        </div>
        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2">Completadas</h3>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold">{stats.completedAppointments}</p>
        </div>
      </div>

      {/* Próximas Citas */}
      <div className="card">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Próximas Citas</h2>
        {upcomingAppointments.length === 0 ? (
          <p className="text-gray-500">No hay citas próximas</p>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="border-l-4 border-primary-500 pl-3 sm:pl-4 py-2 bg-gray-50 rounded-r">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base sm:text-lg truncate">
                      {user?.role === 'paciente' 
                        ? `Dr. ${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`
                        : `${appointment.patient.firstName} ${appointment.patient.lastName}`
                      }
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      {format(new Date(appointment.appointmentDate), 'PPP', { locale: es })}
                    </p>
                    <p className="text-sm sm:text-base text-gray-600">
                      {appointment.appointmentTime}
                    </p>
                    {appointment.reason && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">{appointment.reason}</p>
                    )}
                  </div>
                  <span className={`${getStatusBadge(appointment.status)} shrink-0 self-start`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          <Link to="/appointments" className="text-primary-600 hover:text-primary-700 font-medium text-sm sm:text-base">
            Ver todas las citas →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

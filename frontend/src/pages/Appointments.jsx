import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'react-toastify';

const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadAppointments();
  }, [filter]);

  const loadAppointments = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await axios.get('/api/appointments', { params });
      setAppointments(response.data.appointments);
    } catch (error) {
      toast.error('Error al cargar citas');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (!window.confirm('¿Está seguro de cancelar esta cita?')) return;

    try {
      await axios.delete(`/api/appointments/${id}`);
      toast.success('Cita cancelada exitosamente');
      loadAppointments();
    } catch (error) {
      toast.error('Error al cancelar cita');
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.put(`/api/appointments/${id}`, { status });
      toast.success('Estado actualizado');
      loadAppointments();
    } catch (error) {
      toast.error('Error al actualizar estado');
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Citas Médicas</h1>
        {user?.role === 'paciente' && (
          <Link to="/appointments/new" className="btn btn-primary">
            Nueva Cita
          </Link>
        )}
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('pendiente')}
            className={`px-4 py-2 rounded ${filter === 'pendiente' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter('confirmada')}
            className={`px-4 py-2 rounded ${filter === 'confirmada' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Confirmadas
          </button>
          <button
            onClick={() => setFilter('completada')}
            className={`px-4 py-2 rounded ${filter === 'completada' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Completadas
          </button>
        </div>
      </div>

      {/* Lista de Citas */}
      <div className="card">
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No hay citas registradas</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {user?.role === 'paciente' ? 'Médico' : 'Paciente'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">
                          {user?.role === 'paciente'
                            ? `Dr. ${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`
                            : `${appointment.patient.firstName} ${appointment.patient.lastName}`
                          }
                        </div>
                        {user?.role === 'paciente' && appointment.doctor.specialty && (
                          <div className="text-sm text-gray-500">
                            {appointment.doctor.specialty.name}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(appointment.appointmentDate), 'PP', { locale: es })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {appointment.appointmentTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getStatusBadge(appointment.status)}>
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      {['medico', 'admin', 'administrativo'].includes(user?.role) && 
                       appointment.status === 'pendiente' && (
                        <button
                          onClick={() => handleUpdateStatus(appointment.id, 'confirmada')}
                          className="text-green-600 hover:text-green-900"
                        >
                          Confirmar
                        </button>
                      )}
                      {appointment.status !== 'cancelada' && appointment.status !== 'completada' && (
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancelar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;

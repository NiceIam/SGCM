import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorAvailability = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  const daysOfWeek = [
    { id: 0, name: 'Domingo', short: 'Dom' },
    { id: 1, name: 'Lunes', short: 'Lun' },
    { id: 2, name: 'Martes', short: 'Mar' },
    { id: 3, name: 'Miércoles', short: 'Mié' },
    { id: 4, name: 'Jueves', short: 'Jue' },
    { id: 5, name: 'Viernes', short: 'Vie' },
    { id: 6, name: 'Sábado', short: 'Sáb' }
  ];

  useEffect(() => {
    loadDoctorData();
  }, [id]);

  const loadDoctorData = async () => {
    try {
      const [doctorRes, availabilityRes] = await Promise.all([
        axios.get(`/api/doctors/${id}`),
        axios.get(`/api/doctors/${id}/availability`)
      ]);
      
      setDoctor(doctorRes.data.doctor);
      setAvailability(availabilityRes.data.availability);
    } catch (error) {
      toast.error('Error al cargar información del médico');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="text-gray-500 mt-4">Cargando...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Médico no encontrado</p>
        <button onClick={() => navigate('/doctors')} className="btn btn-primary mt-4">
          Volver a médicos
        </button>
      </div>
    );
  }

  // Agrupar disponibilidad por día
  const availabilityByDay = availability.reduce((acc, slot) => {
    if (!acc[slot.dayOfWeek]) {
      acc[slot.dayOfWeek] = [];
    }
    acc[slot.dayOfWeek].push(slot);
    return acc;
  }, {});

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/doctors')}
        className="text-primary-600 hover:text-primary-700 font-medium"
      >
        ← Volver a médicos
      </button>

      {/* Doctor Info Card */}
      <div className="card">
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-4xl font-bold text-primary-600">
              {doctor.user.firstName[0]}{doctor.user.lastName[0]}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Dr. {doctor.user.firstName} {doctor.user.lastName}
            </h1>
            {doctor.specialty && (
              <p className="text-xl text-primary-600 mt-1">
                {doctor.specialty.name}
              </p>
            )}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Licencia Médica</p>
                <p className="font-medium">{doctor.licenseNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duración de Consulta</p>
                <p className="font-medium">{doctor.consultationDuration} minutos</p>
              </div>
            </div>
          </div>
          <Link
            to="/appointments/new"
            className="btn btn-primary"
          >
            Agendar Cita
          </Link>
        </div>
      </div>

      {/* Availability Schedule */}
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Horarios de Atención</h2>
        
        {availability.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No hay horarios configurados</p>
          </div>
        ) : (
          <div className="space-y-3">
            {daysOfWeek.map((day) => {
              const daySlots = availabilityByDay[day.id];
              const hasAvailability = daySlots && daySlots.length > 0;

              return (
                <div
                  key={day.id}
                  className={`flex items-center p-4 rounded-lg border-2 ${
                    hasAvailability
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="w-32 flex-shrink-0">
                    <p className={`font-semibold ${
                      hasAvailability ? 'text-green-900' : 'text-gray-400'
                    }`}>
                      {day.name}
                    </p>
                  </div>
                  <div className="flex-1">
                    {hasAvailability ? (
                      <div className="flex flex-wrap gap-2">
                        {daySlots.map((slot, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center px-4 py-2 bg-white border border-green-300 rounded-lg"
                          >
                            <svg
                              className="w-4 h-4 text-green-600 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-sm font-medium text-gray-900">
                              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic">No disponible</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Additional Info */}
      {doctor.specialty?.description && (
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Sobre la Especialidad</h3>
          <p className="text-gray-600">{doctor.specialty.description}</p>
        </div>
      )}
    </div>
  );
};

export default DoctorAvailability;

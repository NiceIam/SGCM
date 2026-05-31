import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const response = await axios.get('/api/doctors');
      setDoctors(response.data.doctors);
    } catch (error) {
      toast.error('Error al cargar médicos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Médicos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">
                    {doctor.user.firstName[0]}{doctor.user.lastName[0]}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  Dr. {doctor.user.firstName} {doctor.user.lastName}
                </h3>
                {doctor.specialty && (
                  <p className="text-sm text-gray-600 mt-1">
                    {doctor.specialty.name}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Licencia: {doctor.licenseNumber}
                </p>
                <p className="text-sm text-gray-500">
                  Duración consulta: {doctor.consultationDuration} min
                </p>
                <div className="mt-4">
                  <Link
                    to={`/doctors/${doctor.id}/availability`}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Ver disponibilidad →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {doctors.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-500">No hay médicos registrados</p>
        </div>
      )}
    </div>
  );
};

export default Doctors;

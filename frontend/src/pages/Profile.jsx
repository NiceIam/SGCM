import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, loadUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`/api/users/${user.id}`, formData);
      toast.success('Perfil actualizado exitosamente');
      // Recargar datos del usuario
      window.location.reload();
    } catch (error) {
      toast.error('Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>

      <div className="card">
        <div className="mb-6">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl font-bold text-primary-600">
              {user?.firstName[0]}{user?.lastName[0]}
            </span>
          </div>
          <p className="text-center mt-4 text-lg font-semibold">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-center text-gray-600">
            <span className="badge badge-info">{user?.role}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="firstName"
                className="input"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellido
              </label>
              <input
                type="text"
                name="lastName"
                className="input"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="input bg-gray-100"
              value={user?.email}
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">
              El email no puede ser modificado
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              name="phone"
              className="input"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <textarea
              name="address"
              rows="3"
              className="input"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary"
          >
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </form>
      </div>

      {user?.role === 'medico' && user?.doctorProfile && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Información Profesional</h2>
          <div className="space-y-2">
            <p className="text-sm">
              <strong>Licencia Médica:</strong> {user.doctorProfile.licenseNumber}
            </p>
            {user.doctorProfile.specialty && (
              <p className="text-sm">
                <strong>Especialidad:</strong> {user.doctorProfile.specialty.name}
              </p>
            )}
            <p className="text-sm">
              <strong>Duración de Consulta:</strong> {user.doctorProfile.consultationDuration} minutos
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

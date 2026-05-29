import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadUsers();
  }, [filter]);

  const loadUsers = async () => {
    try {
      const params = filter !== 'all' ? { role: filter } : {};
      const response = await axios.get('/api/users', { params });
      setUsers(response.data.users);
    } catch (error) {
      toast.error('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await axios.put(`/api/users/${userId}`, {
        isActive: !currentStatus
      });
      toast.success('Estado actualizado');
      loadUsers();
    } catch (error) {
      toast.error('Error al actualizar estado');
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'badge bg-purple-100 text-purple-800',
      medico: 'badge bg-blue-100 text-blue-800',
      administrativo: 'badge bg-green-100 text-green-800',
      paciente: 'badge bg-gray-100 text-gray-800'
    };
    return badges[role] || 'badge';
  };

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>

      {/* Filtros */}
      <div className="card">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('paciente')}
            className={`px-4 py-2 rounded ${filter === 'paciente' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Pacientes
          </button>
          <button
            onClick={() => setFilter('medico')}
            className={`px-4 py-2 rounded ${filter === 'medico' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Médicos
          </button>
          <button
            onClick={() => setFilter('administrativo')}
            className={`px-4 py-2 rounded ${filter === 'administrativo' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}
          >
            Administrativos
          </button>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="card">
        {users.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No hay usuarios registrados</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Rol
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
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.phone || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={getRoleBadge(user.role)}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={user.isActive ? 'badge badge-success' : 'badge badge-danger'}>
                        {user.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleToggleStatus(user.id, user.isActive)}
                        className={user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                      >
                        {user.isActive ? 'Desactivar' : 'Activar'}
                      </button>
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

export default Users;

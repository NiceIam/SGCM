import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', path: '/', roles: ['paciente', 'medico', 'administrativo', 'admin'] },
    { name: 'Citas', path: '/appointments', roles: ['paciente', 'medico', 'administrativo', 'admin'] },
    { name: 'Médicos', path: '/doctors', roles: ['paciente', 'administrativo', 'admin'] },
    { name: 'Historial Clínico', path: '/medical-records', roles: ['paciente', 'medico', 'admin'] },
    { name: 'Usuarios', path: '/users', roles: ['admin', 'administrativo'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-primary-600">SGCM</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {filteredNavigation.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-primary-600"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user?.firstName} {user?.lastName}
                <span className="ml-2 px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded">
                  {user?.role}
                </span>
              </span>
              <Link to="/profile" className="text-gray-700 hover:text-primary-600">
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-secondary text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

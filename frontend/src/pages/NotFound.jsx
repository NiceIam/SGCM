import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <div className="text-6xl mb-4">🏥</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Página no encontrada
          </h2>
          <p className="text-gray-600 mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/"
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            🏠 Ir al inicio
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary w-full flex items-center justify-center gap-2"
          >
            ← Volver atrás
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>¿Necesitas ayuda? Contacta al administrador</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

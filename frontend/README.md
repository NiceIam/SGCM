# Sistema de Gestión de Citas Médicas - Frontend

Aplicación web frontend para el Sistema de Gestión de Citas Médicas (SGCM) desarrollada con React, React Router y Tailwind CSS.

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI
- **React Router** - Enrutamiento
- **Tailwind CSS** - Framework CSS
- **Axios** - Cliente HTTP
- **React Hook Form** - Manejo de formularios
- **React Toastify** - Notificaciones
- **date-fns** - Manejo de fechas
- **Vite** - Build tool y dev server

## 📋 Requisitos Previos

- Node.js >= 14.x
- npm o yarn
- Backend corriendo en http://localhost:5000

## 🔧 Instalación

1. **Instalar dependencias:**

```bash
cd frontend
npm install
```

2. **Configurar variables de entorno:**

Copiar el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Editar `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

3. **Iniciar el servidor de desarrollo:**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
frontend/
├── public/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Layout.jsx
│   │   └── PrivateRoute.jsx
│   ├── context/            # Context API
│   │   └── AuthContext.jsx
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Appointments.jsx
│   │   ├── NewAppointment.jsx
│   │   ├── Doctors.jsx
│   │   ├── DoctorAvailability.jsx
│   │   ├── MedicalRecords.jsx
│   │   ├── Users.jsx
│   │   └── Profile.jsx
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Características

### Autenticación
- Login y registro de usuarios
- Gestión de sesión con JWT
- Rutas protegidas por autenticación
- Context API para estado global de autenticación

### Dashboard
- Estadísticas de citas
- Próximas citas
- Acceso rápido a funcionalidades

### Gestión de Citas
- Agendar nuevas citas
- Ver citas programadas
- Filtrar por estado
- Cancelar citas
- Confirmar citas (médicos/admin)

### Médicos
- Listado de médicos
- Ver disponibilidad horaria
- Información de especialidades

### Historial Clínico
- Ver registros médicos
- Descargar historial en PDF
- Filtrado por paciente

### Administración de Usuarios
- Listado de usuarios
- Filtrar por rol
- Activar/desactivar usuarios

### Perfil de Usuario
- Editar información personal
- Ver información profesional (médicos)

## 🎭 Roles y Permisos

### Paciente
- Ver y agendar citas propias
- Ver historial clínico propio
- Ver médicos disponibles
- Editar perfil

### Médico
- Ver citas asignadas
- Confirmar/completar citas
- Crear registros médicos
- Gestionar disponibilidad
- Ver historiales de pacientes

### Administrativo
- Gestionar todas las citas
- Ver todos los usuarios
- Generar reportes

### Admin
- Acceso completo al sistema
- Gestión de usuarios
- Configuración del sistema

## 🎨 Personalización de Estilos

El proyecto usa Tailwind CSS. Para personalizar colores y estilos, editar `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Personalizar colores primarios
      }
    }
  }
}
```

## 📦 Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

Para previsualizar el build:

```bash
npm run preview
```

## 🔌 Integración con Backend

La aplicación se comunica con el backend a través de Axios. La configuración base está en `src/context/AuthContext.jsx`.

Todas las peticiones incluyen automáticamente el token JWT en el header `Authorization`.

## 🐛 Solución de Problemas

**Error de CORS:**
- Verificar que el backend tenga CORS configurado correctamente
- Verificar la URL del backend en `.env`

**Error de autenticación:**
- Verificar que el token JWT sea válido
- Limpiar localStorage y volver a iniciar sesión

**Estilos no se aplican:**
- Verificar que Tailwind CSS esté configurado correctamente
- Ejecutar `npm install` nuevamente

## 📝 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Genera build de producción
- `npm run preview` - Previsualiza build de producción

## 📄 Licencia

MIT

# Sistema de Gestión de Citas Médicas (SGCM)

Sistema integral para la gestión de citas médicas, historiales clínicos y administración de consultorios médicos.

## 🏥 Descripción

SGCM es una aplicación web completa que permite a pacientes, médicos y personal administrativo gestionar eficientemente las citas médicas, historiales clínicos y la disponibilidad de los profesionales de la salud.

## ✨ Características Principales

- **Gestión de Usuarios**: Sistema de roles (Admin, Administrativo, Médico, Paciente)
- **Agendamiento de Citas**: Reserva de citas con validación de disponibilidad
- **Historial Clínico**: Registro y consulta de historiales médicos
- **Disponibilidad Médica**: Configuración de horarios de atención
- **Notificaciones**: Sistema de notificaciones por email
- **Reportes**: Generación de reportes en PDF
- **Dashboard**: Estadísticas y visualización de datos

## 🛠️ Tecnologías

### Backend
- Node.js + Express
- PostgreSQL + Sequelize ORM
- JWT para autenticación
- Nodemailer para emails
- PDFKit para reportes

### Frontend
- React 18
- React Router
- Tailwind CSS
- Axios
- Vite

## 📁 Estructura del Proyecto

```
SGCM/
├── backend/          # API REST
│   ├── database/     # Scripts SQL
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── scripts/      # Utilidades
├── frontend/         # Aplicación React
│   └── src/
│       ├── components/
│       ├── context/
│       └── pages/
└── README.md
```

## 🚀 Instalación

### Requisitos Previos
- Node.js >= 14.x
- PostgreSQL >= 12.x
- npm o yarn

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configurar variables de entorno en .env
psql -U postgres -f database/schema.sql
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Configurar VITE_API_URL en .env
npm run dev
```

## 📖 Documentación

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
- [Credenciales de Prueba](./CREDENCIALES.md)

## 👥 Roles del Sistema

- **Admin**: Acceso completo al sistema
- **Administrativo**: Gestión de citas y usuarios
- **Médico**: Gestión de agenda y historiales
- **Paciente**: Agendamiento y consulta de citas

## 🔒 Seguridad

- Autenticación JWT
- Contraseñas hasheadas con bcrypt
- Validación de roles y permisos
- Variables de entorno para datos sensibles

## 📝 Licencia

MIT

## 👨‍💻 Autor

NiceIam

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

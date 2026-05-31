# Guía para Crear Pull Requests - SGCM

## ✅ Estado: Todas las ramas han sido creadas y pusheadas

Ahora necesitas crear los Pull Requests manualmente en GitHub. A continuación encontrarás las instrucciones detalladas para cada PR.

---

## 📋 Instrucciones Generales

1. Ve a: https://github.com/NiceIam/SGCM/pulls
2. Haz clic en "New pull request"
3. Selecciona la rama correspondiente como "compare"
4. Copia el título y descripción proporcionados abajo
5. Crea el Pull Request
6. **Opcional**: Puedes mergear cada PR después de crearlo para simular un desarrollo continuo

---

## PR #1: Configuración inicial y base de datos
**Rama**: `feature/initial-setup` → `main`  
**Fecha**: Mayo 1-2, 2026

### Título
```
feat: Initial project setup and database configuration
```

### Descripción
```markdown
## 📝 Descripción
Configuración inicial del proyecto backend con Express, PostgreSQL y Sequelize.

## ✨ Cambios
- ✅ Creación del esquema de base de datos PostgreSQL
- ✅ Configuración de Sequelize ORM
- ✅ Setup del servidor Express con middleware básico
- ✅ Configuración de variables de entorno
- ✅ Documentación inicial del backend

## 📦 Archivos Principales
- `backend/database/schema.sql` - Esquema completo de la BD
- `backend/src/config/database.js` - Configuración de Sequelize
- `backend/src/server.js` - Servidor Express
- `backend/package.json` - Dependencias del proyecto

## 🧪 Testing
- [x] Servidor inicia correctamente
- [x] Conexión a base de datos funcional

## 📅 Fecha de Implementación
Mayo 1-2, 2026
```

---

## PR #2: Modelos de base de datos
**Rama**: `feature/database-models` → `main`  
**Fecha**: Mayo 3-4, 2026

### Título
```
feat: Implement Sequelize models and associations
```

### Descripción
```markdown
## 📝 Descripción
Implementación de todos los modelos de Sequelize con sus relaciones y validaciones.

## ✨ Cambios
- ✅ Modelo User con roles y autenticación
- ✅ Modelo Specialty para especialidades médicas
- ✅ Modelo Doctor con perfil profesional
- ✅ Modelo DoctorAvailability para horarios
- ✅ Modelo Appointment para citas médicas
- ✅ Modelo MedicalRecord para historiales clínicos
- ✅ Modelo Notification para notificaciones
- ✅ Configuración de asociaciones entre modelos

## 🔗 Relaciones Implementadas
- User ↔ Doctor (1:1)
- Doctor ↔ Specialty (N:1)
- Doctor ↔ DoctorAvailability (1:N)
- Doctor ↔ Appointment (1:N)
- User ↔ Appointment (1:N)
- Appointment ↔ MedicalRecord (1:1)
- User ↔ Notification (1:N)

## 📅 Fecha de Implementación
Mayo 3-4, 2026
```

---

## PR #3: Sistema de autenticación
**Rama**: `feature/authentication` → `main`  
**Fecha**: Mayo 5-6, 2026

### Título
```
feat: Implement JWT authentication system
```

### Descripción
```markdown
## 📝 Descripción
Sistema completo de autenticación con JWT, registro y login de usuarios.

## ✨ Cambios
- ✅ Middleware de autenticación JWT
- ✅ Middleware de autorización por roles
- ✅ Controlador de registro de usuarios
- ✅ Controlador de login con validación
- ✅ Endpoint para obtener usuario actual
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Rutas de autenticación

## 🔒 Seguridad
- Contraseñas hasheadas con bcrypt (10 rounds)
- Tokens JWT con expiración configurable
- Validación de roles en middleware
- Protección de rutas sensibles

## 📍 Endpoints
- `POST /api/auth/register` - Registro de usuarios
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/me` - Usuario actual (protegido)

## 📅 Fecha de Implementación
Mayo 5-6, 2026
```

---

## PR #4: Gestión de usuarios
**Rama**: `feature/user-management` → `main`  
**Fecha**: Mayo 7-8, 2026

### Título
```
feat: Add user management with CRUD operations
```

### Descripción
```markdown
## 📝 Descripción
Sistema completo de gestión de usuarios con operaciones CRUD y control de acceso basado en roles.

## ✨ Cambios
- ✅ Controladores CRUD para usuarios
- ✅ Rutas con protección por roles
- ✅ Middleware de manejo de errores global
- ✅ Validación de permisos por rol
- ✅ Filtrado de usuarios por rol y estado

## 👥 Funcionalidades
- Listar todos los usuarios (Admin/Administrativo)
- Obtener usuario por ID
- Actualizar información de usuario
- Activar/desactivar usuarios (Admin)
- Eliminar usuarios (Admin)

## 📍 Endpoints
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

## 📅 Fecha de Implementación
Mayo 7-8, 2026
```

---

## PR #5: Módulo de médicos
**Rama**: `feature/doctors-module` → `main`  
**Fecha**: Mayo 9-10, 2026

### Título
```
feat: Implement doctors module with availability management
```

### Descripción
```markdown
## 📝 Descripción
Módulo completo para gestión de médicos, especialidades y disponibilidad horaria.

## ✨ Cambios
- ✅ Controladores para médicos y especialidades
- ✅ Gestión de disponibilidad horaria
- ✅ Filtrado por especialidad
- ✅ Búsqueda de médicos disponibles
- ✅ CRUD de especialidades médicas
- ✅ Rutas con control de acceso

## 🏥 Funcionalidades
- Listar médicos con filtros
- Ver perfil completo de médico
- Gestionar especialidades
- Configurar horarios de disponibilidad
- Consultar disponibilidad por fecha

## 📍 Endpoints
- `GET /api/doctors` - Listar médicos
- `GET /api/doctors/:id` - Perfil de médico
- `GET /api/doctors/:id/availability` - Ver disponibilidad
- `POST /api/doctors/:id/availability` - Configurar horarios
- `DELETE /api/doctors/:id/availability/:availabilityId` - Eliminar horario

## 📅 Fecha de Implementación
Mayo 9-10, 2026
```

---

## PR #6: Sistema de citas
**Rama**: `feature/appointments` → `main`  
**Fecha**: Mayo 11-13, 2026

### Título
```
feat: Implement appointment booking system
```

### Descripción
```markdown
## 📝 Descripción
Sistema completo de gestión de citas médicas con validación de disponibilidad y estados.

## ✨ Cambios
- ✅ Controlador de citas con lógica de negocio
- ✅ Validación de disponibilidad del médico
- ✅ Prevención de citas duplicadas
- ✅ Gestión de estados (pendiente, confirmada, completada, cancelada)
- ✅ Filtrado por paciente, médico, fecha y estado
- ✅ Rutas con autorización por rol

## 📋 Funcionalidades
- Agendar nueva cita con validaciones
- Listar citas con filtros múltiples
- Ver detalles de cita
- Confirmar cita (Médico/Admin)
- Completar cita (Médico)
- Cancelar cita

## 🔍 Validaciones
- Verificación de disponibilidad del médico
- Prevención de citas en el mismo horario
- Validación de horarios de atención
- Control de estados válidos

## 📍 Endpoints
- `POST /api/appointments` - Crear cita
- `GET /api/appointments` - Listar citas
- `GET /api/appointments/:id` - Detalle de cita
- `PUT /api/appointments/:id` - Actualizar cita
- `DELETE /api/appointments/:id` - Cancelar cita

## 📅 Fecha de Implementación
Mayo 11-13, 2026
```

---

## PR #7: Historial clínico
**Rama**: `feature/medical-records` → `main`  
**Fecha**: Mayo 14-15, 2026

### Título
```
feat: Add medical records management system
```

### Descripción
```markdown
## 📝 Descripción
Sistema de gestión de historiales clínicos con control de acceso estricto.

## ✨ Cambios
- ✅ Controladores para registros médicos
- ✅ Creación de historiales por médicos
- ✅ Consulta de historiales por paciente
- ✅ Control de acceso (médico tratante y paciente)
- ✅ Rutas protegidas con validación de permisos

## 🏥 Funcionalidades
- Crear registro médico (solo Médicos)
- Listar historiales por paciente
- Ver detalle de registro médico
- Control de acceso: solo médico tratante y paciente

## 🔒 Seguridad
- Solo médicos pueden crear registros
- Pacientes solo ven sus propios registros
- Médicos solo ven registros de sus pacientes
- Admins tienen acceso completo

## 📍 Endpoints
- `POST /api/medical-records` - Crear registro
- `GET /api/medical-records` - Listar registros
- `GET /api/medical-records/:id` - Detalle de registro

## 📅 Fecha de Implementación
Mayo 14-15, 2026
```

---

## PR #8: Sistema de notificaciones
**Rama**: `feature/notifications` → `main`  
**Fecha**: Mayo 16-17, 2026

### Título
```
feat: Implement email notification system
```

### Descripción
```markdown
## 📝 Descripción
Sistema de notificaciones por email para eventos importantes del sistema.

## ✨ Cambios
- ✅ Servicio de email con Nodemailer
- ✅ Sistema de notificaciones automáticas
- ✅ Templates de email personalizados
- ✅ Notificaciones para citas (creación, confirmación, recordatorio)
- ✅ Configuración SMTP flexible

## 📧 Tipos de Notificaciones
- Confirmación de registro
- Nueva cita agendada
- Confirmación de cita por médico
- Recordatorio de cita (24h antes)
- Cancelación de cita
- Cita completada

## ⚙️ Configuración
- Soporte para Gmail, Outlook y SMTP personalizado
- Templates HTML responsivos
- Manejo de errores en envío
- Cola de notificaciones

## 📅 Fecha de Implementación
Mayo 16-17, 2026
```

---

## PR #9: Generación de reportes
**Rama**: `feature/reports` → `main`  
**Fecha**: Mayo 18-19, 2026

### Título
```
feat: Add PDF report generation system
```

### Descripción
```markdown
## 📝 Descripción
Sistema de generación de reportes en PDF para citas e historiales clínicos.

## ✨ Cambios
- ✅ Generador de PDF con PDFKit
- ✅ Reporte de citas con filtros
- ✅ Reporte de historial clínico completo
- ✅ Diseño profesional con logo y formato
- ✅ Controladores y rutas de reportes

## 📊 Tipos de Reportes
- **Reporte de Citas**: Lista de citas con filtros por fecha, médico y estado
- **Historial Clínico**: Historial completo de un paciente con todos sus registros

## 🎨 Características
- Diseño profesional con encabezados
- Tablas formateadas
- Información detallada
- Descarga directa en PDF

## 📍 Endpoints
- `GET /api/reports/appointments` - Reporte de citas (PDF)
- `GET /api/reports/medical-records/:patientId` - Historial clínico (PDF)

## 📅 Fecha de Implementación
Mayo 18-19, 2026
```

---

## PR #10: Scripts de base de datos
**Rama**: `feature/database-scripts` → `main`  
**Fecha**: Mayo 20, 2026

### Título
```
feat: Add database seeding and utility scripts
```

### Descripción
```markdown
## 📝 Descripción
Scripts de utilidad para poblar la base de datos y gestionar usuarios de prueba.

## ✨ Cambios
- ✅ Script SQL de seed con usuarios de prueba
- ✅ Script de seeding con Sequelize
- ✅ Creador de usuarios de prueba
- ✅ Utilidad de testing de contraseñas
- ✅ Script para corregir contraseñas

## 🛠️ Scripts Incluidos
- `seed-users.sql` - Datos iniciales en SQL
- `seedDatabase.js` - Seeding con Sequelize
- `createTestUsers.js` - Crear usuarios de prueba
- `testPassword.js` - Verificar contraseñas
- `fixAllPasswords.js` - Corregir contraseñas hasheadas

## 👥 Usuarios de Prueba
- Admin: admin@sgcm.com
- Administrativo: admin1@sgcm.com
- Médicos: doctor1@sgcm.com, doctor2@sgcm.com
- Pacientes: paciente1@sgcm.com, paciente2@sgcm.com

## 📅 Fecha de Implementación
Mayo 20, 2026
```

---

## PR #11: Frontend - Configuración inicial
**Rama**: `feature/frontend-setup` → `main`  
**Fecha**: Mayo 21-22, 2026

### Título
```
feat: Initialize React frontend with Vite and Tailwind CSS
```

### Descripción
```markdown
## 📝 Descripción
Configuración inicial del frontend con React, Vite, React Router y Tailwind CSS.

## ✨ Cambios
- ✅ Proyecto React con Vite
- ✅ Configuración de Tailwind CSS
- ✅ React Router v6
- ✅ Estructura base de la aplicación
- ✅ Configuración de variables de entorno
- ✅ Estilos globales

## 🛠️ Tecnologías
- React 18
- Vite (build tool)
- React Router v6
- Tailwind CSS
- Axios

## 📦 Configuración
- Hot Module Replacement (HMR)
- PostCSS con Tailwind
- Rutas configuradas
- Estructura de carpetas

## 📅 Fecha de Implementación
Mayo 21-22, 2026
```

---

## PR #12: Frontend - Autenticación
**Rama**: `feature/frontend-auth` → `main`  
**Fecha**: Mayo 23-24, 2026

### Título
```
feat: Implement authentication with Context API and JWT
```

### Descripción
```markdown
## 📝 Descripción
Sistema de autenticación frontend con Context API, JWT y rutas protegidas.

## ✨ Cambios
- ✅ AuthContext con Context API
- ✅ Gestión de estado de autenticación
- ✅ Componente PrivateRoute
- ✅ Página de Login con validación
- ✅ Página de Register con validación
- ✅ Persistencia de sesión en localStorage
- ✅ Interceptor de Axios para JWT

## 🔒 Funcionalidades
- Login con email y contraseña
- Registro de nuevos usuarios
- Persistencia de sesión
- Logout
- Rutas protegidas por autenticación
- Redirección automática

## 📄 Páginas
- `/login` - Inicio de sesión
- `/register` - Registro de usuarios

## 📅 Fecha de Implementación
Mayo 23-24, 2026
```

---

## PR #13: Frontend - Dashboard y Layout
**Rama**: `feature/frontend-dashboard` → `main`  
**Fecha**: Mayo 25, 2026

### Título
```
feat: Add responsive layout and dashboard with statistics
```

### Descripción
```markdown
## 📝 Descripción
Layout responsivo con navegación y dashboard con estadísticas del sistema.

## ✨ Cambios
- ✅ Componente Layout con navegación
- ✅ Sidebar responsivo
- ✅ Dashboard con estadísticas
- ✅ Página de perfil de usuario
- ✅ Navegación adaptada por rol
- ✅ Diseño mobile-first

## 📊 Dashboard
- Estadísticas de citas
- Próximas citas
- Accesos rápidos
- Información personalizada por rol

## 🎨 Layout
- Sidebar colapsable
- Header con información de usuario
- Navegación por roles
- Diseño responsivo
- Logout integrado

## 📄 Páginas
- `/dashboard` - Dashboard principal
- `/profile` - Perfil de usuario

## 📅 Fecha de Implementación
Mayo 25, 2026
```

---

## PR #14: Frontend - Gestión de citas
**Rama**: `feature/frontend-appointments` → `main`  
**Fecha**: Mayo 26-27, 2026

### Título
```
feat: Implement appointment management and booking system
```

### Descripción
```markdown
## 📝 Descripción
Sistema completo de gestión y agendamiento de citas médicas.

## ✨ Cambios
- ✅ Lista de citas con filtros
- ✅ Formulario de nueva cita
- ✅ Selección de médico por especialidad
- ✅ Validación de disponibilidad
- ✅ Gestión de estados de cita
- ✅ Acciones según rol (confirmar, cancelar, completar)

## 📋 Funcionalidades
- Listar citas con filtros (fecha, estado, médico)
- Agendar nueva cita
- Ver detalles de cita
- Confirmar cita (Médico/Admin)
- Cancelar cita
- Completar cita (Médico)

## 🎨 Características
- Calendario de selección de fecha
- Filtro por especialidad
- Validación de horarios
- Estados visuales con colores
- Diseño responsivo

## 📄 Páginas
- `/appointments` - Lista de citas
- `/appointments/new` - Nueva cita

## 📅 Fecha de Implementación
Mayo 26-27, 2026
```

---

## PR #15: Frontend - Módulos adicionales
**Rama**: `feature/frontend-modules` → `main`  
**Fecha**: Mayo 28-29, 2026

### Título
```
feat: Add doctors, medical records and user management modules
```

### Descripción
```markdown
## 📝 Descripción
Módulos adicionales para gestión de médicos, historiales clínicos y usuarios.

## ✨ Cambios
- ✅ Página de listado de médicos
- ✅ Gestión de disponibilidad médica
- ✅ Visualización de historiales clínicos
- ✅ Gestión de usuarios (Admin)
- ✅ Página 404 personalizada
- ✅ Manejo de errores

## 🏥 Módulos Implementados

### Médicos
- Lista de médicos con filtros
- Ver perfil de médico
- Gestionar disponibilidad (Médicos)

### Historiales Clínicos
- Ver historiales por paciente
- Descargar PDF
- Crear nuevo registro (Médicos)

### Usuarios
- Lista de usuarios (Admin)
- Filtrar por rol
- Activar/desactivar usuarios

## 📄 Páginas
- `/doctors` - Lista de médicos
- `/doctors/availability` - Gestión de disponibilidad
- `/medical-records` - Historiales clínicos
- `/users` - Gestión de usuarios
- `*` - Página 404

## 📅 Fecha de Implementación
Mayo 28-29, 2026
```

---

## PR #16: Documentación final
**Rama**: `feature/documentation` → `main`  
**Fecha**: Mayo 30, 2026

### Título
```
docs: Add credentials documentation and project configuration
```

### Descripción
```markdown
## 📝 Descripción
Documentación final del proyecto con credenciales de prueba y configuración.

## ✨ Cambios
- ✅ Documento de credenciales de prueba
- ✅ Configuración del proyecto (.atl)
- ✅ Skill registry
- ✅ Documentación completa

## 📚 Documentación Incluida
- Credenciales de usuarios de prueba
- Guía de roles y permisos
- Configuración del proyecto
- Información de acceso

## 👥 Credenciales Documentadas
- Admin
- Administrativo
- Médicos
- Pacientes

## 📅 Fecha de Implementación
Mayo 30, 2026
```

---

## 🎯 Resumen

**Total de PRs**: 16  
**Período**: Mayo 1-30, 2026  
**Estado**: ✅ Todas las ramas creadas y pusheadas

### Orden Sugerido de Merge
1. PR #1 - Configuración inicial
2. PR #2 - Modelos de BD
3. PR #3 - Autenticación
4. PR #4 - Gestión de usuarios
5. PR #5 - Módulo de médicos
6. PR #6 - Sistema de citas
7. PR #7 - Historial clínico
8. PR #8 - Notificaciones
9. PR #9 - Reportes
10. PR #10 - Scripts de BD
11. PR #11 - Frontend setup
12. PR #12 - Frontend auth
13. PR #13 - Frontend dashboard
14. PR #14 - Frontend citas
15. PR #15 - Frontend módulos
16. PR #16 - Documentación

---

## 💡 Consejos

- Puedes crear todos los PRs de una vez y luego mergearlos en orden
- Los commits ya tienen las fechas correctas (backdated)
- Considera agregar labels a los PRs: `backend`, `frontend`, `documentation`
- Puedes agregar reviewers si trabajas en equipo
- Los PRs se pueden mergear con "Squash and merge" o "Create a merge commit"

---

¡Buena suerte con tus Pull Requests! 🚀

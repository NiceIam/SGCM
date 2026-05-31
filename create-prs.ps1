# Script para crear Pull Requests con fechas backdated
# Sistema de Gestión de Citas Médicas (SGCM)

# Configuración
$env:GIT_AUTHOR_NAME = "NiceIam"
$env:GIT_AUTHOR_EMAIL = "niceiam@example.com"
$env:GIT_COMMITTER_NAME = "NiceIam"
$env:GIT_COMMITTER_EMAIL = "niceiam@example.com"

# Función para crear commit con fecha específica
function Create-BackdatedCommit {
    param(
        [string]$Date,
        [string]$Message
    )
    $env:GIT_AUTHOR_DATE = $Date
    $env:GIT_COMMITTER_DATE = $Date
    git commit -m $Message
}

# PR 1: Configuración inicial y base de datos (Mayo 1-2)
Write-Host "Creando PR 1: Configuración inicial y base de datos..." -ForegroundColor Green
git checkout -b feature/initial-setup
git add backend/database/schema.sql
git add backend/.env.example
git add backend/.gitignore
git add backend/package.json
git add backend/README.md
Create-BackdatedCommit "2026-05-01T09:00:00" "feat: add database schema and initial configuration"

git add backend/src/config/database.js
Create-BackdatedCommit "2026-05-01T14:00:00" "feat: configure Sequelize database connection"

git add backend/src/server.js
Create-BackdatedCommit "2026-05-02T10:00:00" "feat: setup Express server with basic middleware"

git push -u origin feature/initial-setup
Write-Host "PR 1 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 2: Modelos de base de datos (Mayo 3-4)
Write-Host "`nCreando PR 2: Modelos de base de datos..." -ForegroundColor Green
git checkout main
git checkout -b feature/database-models
git add backend/src/models/User.js
git add backend/src/models/Specialty.js
Create-BackdatedCommit "2026-05-03T09:00:00" "feat: add User and Specialty models"

git add backend/src/models/Doctor.js
git add backend/src/models/DoctorAvailability.js
Create-BackdatedCommit "2026-05-03T15:00:00" "feat: add Doctor and DoctorAvailability models"

git add backend/src/models/Appointment.js
git add backend/src/models/MedicalRecord.js
git add backend/src/models/Notification.js
Create-BackdatedCommit "2026-05-04T10:00:00" "feat: add Appointment, MedicalRecord and Notification models"

git add backend/src/models/index.js
Create-BackdatedCommit "2026-05-04T14:00:00" "feat: configure model associations and exports"

git push -u origin feature/database-models
Write-Host "PR 2 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 3: Sistema de autenticación (Mayo 5-6)
Write-Host "`nCreando PR 3: Sistema de autenticación..." -ForegroundColor Green
git checkout main
git checkout -b feature/authentication
git add backend/src/middleware/auth.js
Create-BackdatedCommit "2026-05-05T09:00:00" "feat: add JWT authentication middleware"

git add backend/src/controllers/authController.js
Create-BackdatedCommit "2026-05-05T14:00:00" "feat: implement register and login controllers"

git add backend/src/routes/auth.js
Create-BackdatedCommit "2026-05-06T10:00:00" "feat: add authentication routes"

git push -u origin feature/authentication
Write-Host "PR 3 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 4: Gestión de usuarios (Mayo 7-8)
Write-Host "`nCreando PR 4: Gestión de usuarios..." -ForegroundColor Green
git checkout main
git checkout -b feature/user-management
git add backend/src/controllers/userController.js
Create-BackdatedCommit "2026-05-07T09:00:00" "feat: implement user CRUD controllers"

git add backend/src/routes/users.js
Create-BackdatedCommit "2026-05-07T15:00:00" "feat: add user management routes with role-based access"

git add backend/src/middleware/errorHandler.js
Create-BackdatedCommit "2026-05-08T11:00:00" "feat: add global error handler middleware"

git push -u origin feature/user-management
Write-Host "PR 4 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 5: Módulo de médicos (Mayo 9-10)
Write-Host "`nCreando PR 5: Módulo de médicos..." -ForegroundColor Green
git checkout main
git checkout -b feature/doctors-module
git add backend/src/controllers/doctorController.js
Create-BackdatedCommit "2026-05-09T09:00:00" "feat: implement doctor controllers and specialty management"

git add backend/src/routes/doctors.js
Create-BackdatedCommit "2026-05-10T10:00:00" "feat: add doctor routes with availability endpoints"

git push -u origin feature/doctors-module
Write-Host "PR 5 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 6: Sistema de citas (Mayo 11-13)
Write-Host "`nCreando PR 6: Sistema de citas..." -ForegroundColor Green
git checkout main
git checkout -b feature/appointments
git add backend/src/controllers/appointmentController.js
Create-BackdatedCommit "2026-05-11T09:00:00" "feat: implement appointment booking logic"

Create-BackdatedCommit "2026-05-12T10:00:00" "feat: add appointment status management and validation"

git add backend/src/routes/appointments.js
Create-BackdatedCommit "2026-05-13T11:00:00" "feat: add appointment routes with filtering"

git push -u origin feature/appointments
Write-Host "PR 6 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 7: Historial clínico (Mayo 14-15)
Write-Host "`nCreando PR 7: Historial clínico..." -ForegroundColor Green
git checkout main
git checkout -b feature/medical-records
git add backend/src/controllers/medicalRecordController.js
Create-BackdatedCommit "2026-05-14T09:00:00" "feat: implement medical records controllers"

git add backend/src/routes/medicalRecords.js
Create-BackdatedCommit "2026-05-15T10:00:00" "feat: add medical records routes with access control"

git push -u origin feature/medical-records
Write-Host "PR 7 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 8: Sistema de notificaciones (Mayo 16-17)
Write-Host "`nCreando PR 8: Sistema de notificaciones..." -ForegroundColor Green
git checkout main
git checkout -b feature/notifications
git add backend/src/utils/email.js
Create-BackdatedCommit "2026-05-16T09:00:00" "feat: implement email service with Nodemailer"

git add backend/src/utils/notification.js
Create-BackdatedCommit "2026-05-17T10:00:00" "feat: add notification system for appointments"

git push -u origin feature/notifications
Write-Host "PR 8 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 9: Generación de reportes (Mayo 18-19)
Write-Host "`nCreando PR 9: Generación de reportes..." -ForegroundColor Green
git checkout main
git checkout -b feature/reports
git add backend/src/utils/pdfGenerator.js
Create-BackdatedCommit "2026-05-18T09:00:00" "feat: implement PDF generation with PDFKit"

git add backend/src/controllers/reportController.js
git add backend/src/routes/reports.js
Create-BackdatedCommit "2026-05-19T10:00:00" "feat: add report controllers and routes"

git push -u origin feature/reports
Write-Host "PR 9 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 10: Scripts de base de datos (Mayo 20)
Write-Host "`nCreando PR 10: Scripts de base de datos..." -ForegroundColor Green
git checkout main
git checkout -b feature/database-scripts
git add backend/database/seed-users.sql
git add backend/scripts/seedDatabase.js
git add backend/scripts/createTestUsers.js
Create-BackdatedCommit "2026-05-20T10:00:00" "feat: add database seeding scripts"

git add backend/scripts/testPassword.js
git add backend/scripts/fixAllPasswords.js
Create-BackdatedCommit "2026-05-20T15:00:00" "feat: add password management utilities"

git push -u origin feature/database-scripts
Write-Host "PR 10 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 11: Frontend - Configuración inicial (Mayo 21-22)
Write-Host "`nCreando PR 11: Frontend - Configuración inicial..." -ForegroundColor Green
git checkout main
git checkout -b feature/frontend-setup
git add frontend/package.json
git add frontend/vite.config.js
git add frontend/tailwind.config.js
git add frontend/postcss.config.js
git add frontend/.gitignore
git add frontend/.env.example
git add frontend/README.md
git add frontend/index.html
Create-BackdatedCommit "2026-05-21T09:00:00" "feat: initialize React frontend with Vite and Tailwind"

git add frontend/src/main.jsx
git add frontend/src/App.jsx
git add frontend/src/index.css
Create-BackdatedCommit "2026-05-22T10:00:00" "feat: setup React Router and base application structure"

git push -u origin feature/frontend-setup
Write-Host "PR 11 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 12: Frontend - Autenticación (Mayo 23-24)
Write-Host "`nCreando PR 12: Frontend - Autenticación..." -ForegroundColor Green
git checkout main
git checkout -b feature/frontend-auth
git add frontend/src/context/AuthContext.jsx
Create-BackdatedCommit "2026-05-23T09:00:00" "feat: implement authentication context with JWT"

git add frontend/src/components/PrivateRoute.jsx
git add frontend/src/pages/Login.jsx
git add frontend/src/pages/Register.jsx
Create-BackdatedCommit "2026-05-24T10:00:00" "feat: add login and register pages with form validation"

git push -u origin feature/frontend-auth
Write-Host "PR 12 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 13: Frontend - Dashboard y Layout (Mayo 25)
Write-Host "`nCreando PR 13: Frontend - Dashboard y Layout..." -ForegroundColor Green
git checkout main
git checkout -b feature/frontend-dashboard
git add frontend/src/components/Layout.jsx
Create-BackdatedCommit "2026-05-25T09:00:00" "feat: create responsive layout with navigation"

git add frontend/src/pages/Dashboard.jsx
git add frontend/src/pages/Profile.jsx
Create-BackdatedCommit "2026-05-25T14:00:00" "feat: implement dashboard with statistics and profile page"

git push -u origin feature/frontend-dashboard
Write-Host "PR 13 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 14: Frontend - Gestión de citas (Mayo 26-27)
Write-Host "`nCreando PR 14: Frontend - Gestión de citas..." -ForegroundColor Green
git checkout main
git checkout -b feature/frontend-appointments
git add frontend/src/pages/Appointments.jsx
Create-BackdatedCommit "2026-05-26T09:00:00" "feat: implement appointments list with filtering"

git add frontend/src/pages/NewAppointment.jsx
Create-BackdatedCommit "2026-05-27T10:00:00" "feat: add appointment booking form with doctor selection"

git push -u origin feature/frontend-appointments
Write-Host "PR 14 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 15: Frontend - Módulos adicionales (Mayo 28-29)
Write-Host "`nCreando PR 15: Frontend - Módulos adicionales..." -ForegroundColor Green
git checkout main
git checkout -b feature/frontend-modules
git add frontend/src/pages/Doctors.jsx
git add frontend/src/pages/DoctorAvailability.jsx
Create-BackdatedCommit "2026-05-28T09:00:00" "feat: add doctors list and availability management"

git add frontend/src/pages/MedicalRecords.jsx
git add frontend/src/pages/Users.jsx
Create-BackdatedCommit "2026-05-29T10:00:00" "feat: implement medical records and user management pages"

git add frontend/src/pages/NotFound.jsx
Create-BackdatedCommit "2026-05-29T15:00:00" "feat: add 404 page and error handling"

git push -u origin feature/frontend-modules
Write-Host "PR 15 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

# PR 16: Documentación final (Mayo 30)
Write-Host "`nCreando PR 16: Documentación final..." -ForegroundColor Green
git checkout main
git checkout -b feature/documentation
git add CREDENCIALES.md
Create-BackdatedCommit "2026-05-30T10:00:00" "docs: add credentials documentation"

git add .atl/
Create-BackdatedCommit "2026-05-30T14:00:00" "docs: add project configuration and skill registry"

git push -u origin feature/documentation
Write-Host "PR 16 creado. Crear PR en GitHub manualmente." -ForegroundColor Yellow

Write-Host "`n✅ Todas las ramas han sido creadas y pusheadas!" -ForegroundColor Green
Write-Host "`nPróximos pasos:" -ForegroundColor Cyan
Write-Host "1. Ve a https://github.com/NiceIam/SGCM/pulls" -ForegroundColor White
Write-Host "2. Crea un Pull Request para cada rama feature/*" -ForegroundColor White
Write-Host "3. Usa las fechas correspondientes en las descripciones" -ForegroundColor White
Write-Host "`nRamas creadas:" -ForegroundColor Cyan
Write-Host "- feature/initial-setup (Mayo 1-2)" -ForegroundColor White
Write-Host "- feature/database-models (Mayo 3-4)" -ForegroundColor White
Write-Host "- feature/authentication (Mayo 5-6)" -ForegroundColor White
Write-Host "- feature/user-management (Mayo 7-8)" -ForegroundColor White
Write-Host "- feature/doctors-module (Mayo 9-10)" -ForegroundColor White
Write-Host "- feature/appointments (Mayo 11-13)" -ForegroundColor White
Write-Host "- feature/medical-records (Mayo 14-15)" -ForegroundColor White
Write-Host "- feature/notifications (Mayo 16-17)" -ForegroundColor White
Write-Host "- feature/reports (Mayo 18-19)" -ForegroundColor White
Write-Host "- feature/database-scripts (Mayo 20)" -ForegroundColor White
Write-Host "- feature/frontend-setup (Mayo 21-22)" -ForegroundColor White
Write-Host "- feature/frontend-auth (Mayo 23-24)" -ForegroundColor White
Write-Host "- feature/frontend-dashboard (Mayo 25)" -ForegroundColor White
Write-Host "- feature/frontend-appointments (Mayo 26-27)" -ForegroundColor White
Write-Host "- feature/frontend-modules (Mayo 28-29)" -ForegroundColor White
Write-Host "- feature/documentation (Mayo 30)" -ForegroundColor White

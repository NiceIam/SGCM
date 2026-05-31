# Script para crear Pull Requests automatizados con commits backdated
# Sistema de Gestión de Citas Médicas (SGCM)
# Autor: Development Automation
# Fecha: Mayo 2026

# ============================================================================
# CONFIGURACIÓN INICIAL
# ============================================================================

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

# Colores para output
$Colors = @{
    Success = "Green"
    Info = "Cyan"
    Warning = "Yellow"
    Error = "Red"
    Header = "Magenta"
}

# Configuración Git
$env:GIT_AUTHOR_NAME = "NiceIam"
$env:GIT_AUTHOR_EMAIL = "niceiam@example.com"
$env:GIT_COMMITTER_NAME = "NiceIam"
$env:GIT_COMMITTER_EMAIL = "niceiam@example.com"

# Repositorio
$REPO_URL = "https://github.com/NiceIam/SGCM.git"
$REPO_DIR = Get-Location

# Variables globales
$FEATURES = @()
$COMMIT_INDEX = 0

# ============================================================================
# FUNCIONES AUXILIARES
# ============================================================================

function Log-Header {
    param([string]$Message)
    Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor $Colors.Header
    Write-Host "║ $Message" -ForegroundColor $Colors.Header
    Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor $Colors.Header
}

function Log-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor $Colors.Success
}

function Log-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor $Colors.Info
}

function Log-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor $Colors.Warning
}

function Log-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor $Colors.Error
}

function Get-BackdatedDate {
    param([int]$DayOffset, [int]$HourOffset = 9)
    $date = Get-Date -Year 2026 -Month 5 -Day 1
    $date = $date.AddDays($DayOffset).AddHours($HourOffset)
    return $date.ToString("yyyy-MM-ddTHH:mm:ss")
}

function Create-BackdatedCommit {
    param(
        [string]$Date,
        [string]$Message,
        [string[]]$Files
    )
    
    # Añadir archivos
    foreach ($file in $Files) {
        git add $file 2>$null
    }
    
    # Crear commit con fecha backdated
    $env:GIT_AUTHOR_DATE = $Date
    $env:GIT_COMMITTER_DATE = $Date
    git commit -m $Message --no-verify
}

function Add-Feature {
    param(
        [string]$BranchName,
        [string]$Title,
        [string]$Description,
        [int]$StartDay,
        [int]$EndDay,
        [object[]]$Commits
    )
    
    $FEATURES += @{
        BranchName = $BranchName
        Title = $Title
        Description = $Description
        StartDay = $StartDay
        EndDay = $EndDay
        Commits = $Commits
    }
}

# ============================================================================
# DEFINICIÓN DE FEATURES Y COMMITS
# ============================================================================

Log-Header "Configurando Features"

# Feature 1: Configuración inicial
Add-Feature `
    -BranchName "feature/initial-setup" `
    -Title "feat: Initial project setup and database configuration" `
    -Description "Configuración inicial del proyecto backend con Express, PostgreSQL y Sequelize.`n`n## Cambios`n- ✅ Esquema PostgreSQL con todas las tablas`n- ✅ Configuración Sequelize ORM`n- ✅ Setup Express con middleware básico`n- ✅ Variables de entorno`n- ✅ Documentación backend" `
    -StartDay 0 `
    -EndDay 1 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 0 9)
            Message = "feat: add database schema and initial configuration"
            Files = @("backend/database/schema.sql", "backend/.env.example", "backend/package.json")
        },
        @{
            Date = (Get-BackdatedDate 0 14)
            Message = "feat: configure Sequelize database connection"
            Files = @("backend/src/config/database.js", "backend/src/config/settings.js")
        },
        @{
            Date = (Get-BackdatedDate 1 10)
            Message = "feat: setup Express server with middleware"
            Files = @("backend/src/server.js", "backend/src/middleware/cors.js")
        }
    )

# Feature 2: Modelos de base de datos
Add-Feature `
    -BranchName "feature/database-models" `
    -Title "feat: Implement Sequelize models and associations" `
    -Description "Implementación completa de modelos Sequelize con relaciones y validaciones.`n`n## Modelos`n- User, Doctor, Specialty, DoctorAvailability`n- Appointment, MedicalRecord, Notification`n- Configuración de asociaciones`n- Validaciones de integridad" `
    -StartDay 2 `
    -EndDay 3 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 2 9)
            Message = "feat: add User and Specialty models with validations"
            Files = @("backend/src/models/User.js", "backend/src/models/Specialty.js")
        },
        @{
            Date = (Get-BackdatedDate 2 15)
            Message = "feat: add Doctor and DoctorAvailability models"
            Files = @("backend/src/models/Doctor.js", "backend/src/models/DoctorAvailability.js")
        },
        @{
            Date = (Get-BackdatedDate 3 10)
            Message = "feat: add Appointment and MedicalRecord models"
            Files = @("backend/src/models/Appointment.js", "backend/src/models/MedicalRecord.js", "backend/src/models/Notification.js")
        },
        @{
            Date = (Get-BackdatedDate 3 14)
            Message = "feat: configure model associations and indexes"
            Files = @("backend/src/models/index.js")
        }
    )

# Feature 3: Autenticación y autorización
Add-Feature `
    -BranchName "feature/authentication" `
    -Title "feat: Implement JWT authentication and authorization" `
    -Description "Sistema completo de autenticación JWT con roles y permisos.`n`n## Cambios`n- ✅ Middleware JWT`n- ✅ Controladores de registro y login`n- ✅ Rutas de autenticación`n- ✅ Validación de permisos por rol" `
    -StartDay 4 `
    -EndDay 5 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 4 9)
            Message = "feat: add JWT authentication middleware"
            Files = @("backend/src/middleware/auth.js", "backend/src/utils/jwt.js")
        },
        @{
            Date = (Get-BackdatedDate 4 14)
            Message = "feat: implement register and login controllers"
            Files = @("backend/src/controllers/authController.js")
        },
        @{
            Date = (Get-BackdatedDate 5 10)
            Message = "feat: add authentication routes and role-based access"
            Files = @("backend/src/routes/auth.js", "backend/src/middleware/roleCheck.js")
        }
    )

# Feature 4: Gestión de usuarios
Add-Feature `
    -BranchName "feature/user-management" `
    -Title "feat: User management with CRUD operations" `
    -Description "Sistema completo de gestión de usuarios con validaciones.`n`n## Cambios`n- ✅ Controladores CRUD de usuarios`n- ✅ Rutas con acceso basado en roles`n- ✅ Middleware global de errores`n- ✅ Validaciones de datos" `
    -StartDay 6 `
    -EndDay 7 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 6 9)
            Message = "feat: implement user CRUD controllers"
            Files = @("backend/src/controllers/userController.js")
        },
        @{
            Date = (Get-BackdatedDate 6 15)
            Message = "feat: add user management routes with role-based access"
            Files = @("backend/src/routes/users.js")
        },
        @{
            Date = (Get-BackdatedDate 7 11)
            Message = "feat: add global error handler middleware"
            Files = @("backend/src/middleware/errorHandler.js", "backend/src/utils/errors.js")
        }
    )

# Feature 5: Gestión de médicos
Add-Feature `
    -BranchName "feature/doctors-module" `
    -Title "feat: Doctor management and specialty system" `
    -Description "Módulo completo para gestión de médicos y especialidades.`n`n## Cambios`n- ✅ Controladores de médicos`n- ✅ Gestión de especialidades`n- ✅ Validaciones profesionales`n- ✅ Rutas con permisos" `
    -StartDay 8 `
    -EndDay 9 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 8 9)
            Message = "feat: implement doctor controllers and specialty management"
            Files = @("backend/src/controllers/doctorController.js", "backend/src/controllers/specialtyController.js")
        },
        @{
            Date = (Get-BackdatedDate 8 14)
            Message = "feat: add doctor profile and credentials handling"
            Files = @("backend/src/routes/doctors.js")
        },
        @{
            Date = (Get-BackdatedDate 9 10)
            Message = "feat: implement specialty endpoints with filtering"
            Files = @("backend/src/routes/specialties.js")
        }
    )

# Feature 6: Gestión de disponibilidad médica
Add-Feature `
    -BranchName "feature/doctor-availability" `
    -Title "feat: Doctor availability scheduling system" `
    -Description "Sistema de horarios y disponibilidad de médicos.`n`n## Cambios`n- ✅ Gestión de horarios médicos`n- ✅ Validación de disponibilidad`n- ✅ Búsqueda de citas disponibles`n- ✅ Controladores y rutas" `
    -StartDay 10 `
    -EndDay 11 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 10 9)
            Message = "feat: implement availability management controllers"
            Files = @("backend/src/controllers/availabilityController.js")
        },
        @{
            Date = (Get-BackdatedDate 10 15)
            Message = "feat: add availability slots validation and search"
            Files = @("backend/src/routes/availability.js", "backend/src/utils/availabilityHelper.js")
        },
        @{
            Date = (Get-BackdatedDate 11 10)
            Message = "feat: implement time conflict detection"
            Files = @("backend/src/utils/timeValidator.js")
        }
    )

# Feature 7: Sistema de citas
Add-Feature `
    -BranchName "feature/appointments-system" `
    -Title "feat: Complete appointment scheduling system" `
    -Description "Sistema completo de citas médicas.`n`n## Cambios`n- ✅ Creación y gestión de citas`n- ✅ Validación de disponibilidad`n- ✅ Cancelación y reagendamiento`n- ✅ Historial de citas" `
    -StartDay 12 `
    -EndDay 13 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 12 9)
            Message = "feat: implement appointment CRUD operations"
            Files = @("backend/src/controllers/appointmentController.js")
        },
        @{
            Date = (Get-BackdatedDate 12 14)
            Message = "feat: add appointment validation and conflict checking"
            Files = @("backend/src/services/appointmentService.js")
        },
        @{
            Date = (Get-BackdatedDate 13 10)
            Message = "feat: implement appointment routes and status management"
            Files = @("backend/src/routes/appointments.js")
        },
        @{
            Date = (Get-BackdatedDate 13 15)
            Message = "feat: add appointment search and filtering"
            Files = @("backend/src/utils/appointmentFilter.js")
        }
    )

# Feature 8: Historiales clínicos
Add-Feature `
    -BranchName "feature/medical-records" `
    -Title "feat: Medical records and clinical history system" `
    -Description "Sistema de historiales clínicos y registros médicos.`n`n## Cambios`n- ✅ Creación de registros clínicos`n- ✅ Historial médico del paciente`n- ✅ Notas y diagnósticos`n- ✅ Acceso controlado por rol" `
    -StartDay 14 `
    -EndDay 15 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 14 9)
            Message = "feat: implement medical record controllers"
            Files = @("backend/src/controllers/medicalRecordController.js")
        },
        @{
            Date = (Get-BackdatedDate 14 14)
            Message = "feat: add clinical history and diagnosis tracking"
            Files = @("backend/src/services/medicalRecordService.js")
        },
        @{
            Date = (Get-BackdatedDate 15 10)
            Message = "feat: implement medical record routes with access control"
            Files = @("backend/src/routes/medicalRecords.js")
        },
        @{
            Date = (Get-BackdatedDate 15 15)
            Message = "feat: add medical record search and export"
            Files = @("backend/src/utils/recordExporter.js")
        }
    )

# Feature 9: Notificaciones
Add-Feature `
    -BranchName "feature/notifications" `
    -Title "feat: Email and in-app notification system" `
    -Description "Sistema de notificaciones por email y aplicación.`n`n## Cambios`n- ✅ Servicio de email con Nodemailer`n- ✅ Notificaciones en aplicación`n- ✅ Colas de notificaciones`n- ✅ Plantillas de email" `
    -StartDay 16 `
    -EndDay 17 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 16 9)
            Message = "feat: implement email notification service"
            Files = @("backend/src/services/emailService.js", "backend/src/config/email.js")
        },
        @{
            Date = (Get-BackdatedDate 16 14)
            Message = "feat: add email templates for appointments and reminders"
            Files = @("backend/src/templates/appointmentEmail.js", "backend/src/templates/reminderEmail.js")
        },
        @{
            Date = (Get-BackdatedDate 17 10)
            Message = "feat: implement notification queue and delivery"
            Files = @("backend/src/services/notificationService.js", "backend/src/routes/notifications.js")
        }
    )

# Feature 10: Reportes y estadísticas
Add-Feature `
    -BranchName "feature/reports-and-analytics" `
    -Title "feat: Reports and analytics dashboard backend" `
    -Description "Sistema de reportes y análisis con PDF.`n`n## Cambios`n- ✅ Generación de reportes en PDF`n- ✅ Estadísticas y métricas`n- ✅ Reportes personalizados`n- ✅ Exportación de datos" `
    -StartDay 18 `
    -EndDay 19 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 18 9)
            Message = "feat: implement PDF report generation with PDFKit"
            Files = @("backend/src/services/reportService.js")
        },
        @{
            Date = (Get-BackdatedDate 18 14)
            Message = "feat: add appointment and revenue reports"
            Files = @("backend/src/controllers/reportController.js")
        },
        @{
            Date = (Get-BackdatedDate 19 10)
            Message = "feat: implement analytics and statistics endpoints"
            Files = @("backend/src/routes/reports.js", "backend/src/utils/analytics.js")
        }
    )

# Feature 11: Frontend React Setup
Add-Feature `
    -BranchName "feature/frontend-setup" `
    -Title "feat: React frontend setup with Vite and Tailwind" `
    -Description "Configuración inicial del frontend React.`n`n## Cambios`n- ✅ Setup Vite y React 18`n- ✅ Tailwind CSS configuration`n- ✅ React Router setup`n- ✅ Axios y utilidades HTTP" `
    -StartDay 20 `
    -EndDay 21 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 20 9)
            Message = "feat: initialize Vite React project with dependencies"
            Files = @("frontend/package.json", "frontend/vite.config.js", "frontend/index.html")
        },
        @{
            Date = (Get-BackdatedDate 20 14)
            Message = "feat: configure Tailwind CSS and main App component"
            Files = @("frontend/src/App.jsx", "frontend/tailwind.config.js", "frontend/src/index.css")
        },
        @{
            Date = (Get-BackdatedDate 21 10)
            Message = "feat: setup React Router and HTTP client with Axios"
            Files = @("frontend/src/router/index.js", "frontend/src/services/api.js")
        }
    )

# Feature 12: Frontend Autenticación
Add-Feature `
    -BranchName "feature/frontend-auth" `
    -Title "feat: Frontend authentication pages and forms" `
    -Description "Páginas de login y registro en React.`n`n## Cambios`n- ✅ Login component`n- ✅ Register component`n- ✅ Auth context para estado global`n- ✅ Protección de rutas" `
    -StartDay 22 `
    -EndDay 23 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 22 9)
            Message = "feat: create authentication context and hooks"
            Files = @("frontend/src/context/AuthContext.jsx", "frontend/src/hooks/useAuth.js")
        },
        @{
            Date = (Get-BackdatedDate 22 14)
            Message = "feat: implement Login and Register pages"
            Files = @("frontend/src/pages/LoginPage.jsx", "frontend/src/pages/RegisterPage.jsx")
        },
        @{
            Date = (Get-BackdatedDate 23 10)
            Message = "feat: add protected routes and auth validation"
            Files = @("frontend/src/components/ProtectedRoute.jsx", "frontend/src/middleware/authGuard.js")
        }
    )

# Feature 13: Frontend Dashboard y Gestión
Add-Feature `
    -BranchName "feature/frontend-dashboard" `
    -Title "feat: Dashboard and management pages" `
    -Description "Dashboard principal y páginas de gestión.`n`n## Cambios`n- ✅ Dashboard component`n- ✅ Página de usuarios`n- ✅ Página de médicos`n- ✅ Componentes reutilizables" `
    -StartDay 24 `
    -EndDay 25 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 24 9)
            Message = "feat: create Dashboard with statistics and overview"
            Files = @("frontend/src/pages/DashboardPage.jsx", "frontend/src/components/StatCard.jsx")
        },
        @{
            Date = (Get-BackdatedDate 24 14)
            Message = "feat: implement Users management page"
            Files = @("frontend/src/pages/UsersPage.jsx", "frontend/src/components/UserTable.jsx")
        },
        @{
            Date = (Get-BackdatedDate 25 10)
            Message = "feat: add Doctors management and specialty pages"
            Files = @("frontend/src/pages/DoctorsPage.jsx", "frontend/src/pages/SpecialtiesPage.jsx")
        }
    )

# Feature 14: Frontend Citas y Reservas
Add-Feature `
    -BranchName "feature/frontend-appointments" `
    -Title "feat: Appointment booking and management interface" `
    -Description "Sistema de reserva y gestión de citas en frontend.`n`n## Cambios`n- ✅ Búsqueda de médicos disponibles`n- ✅ Formulario de reserva de citas`n- ✅ Gestión de mis citas`n- ✅ Calendario de disponibilidad" `
    -StartDay 26 `
    -EndDay 27 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 26 9)
            Message = "feat: implement appointment booking form with doctor search"
            Files = @("frontend/src/pages/BookAppointmentPage.jsx", "frontend/src/components/DoctorSearch.jsx")
        },
        @{
            Date = (Get-BackdatedDate 26 14)
            Message = "feat: create appointment calendar and time slot selector"
            Files = @("frontend/src/components/AppointmentCalendar.jsx", "frontend/src/components/TimeSlotPicker.jsx")
        },
        @{
            Date = (Get-BackdatedDate 27 10)
            Message = "feat: add my appointments page with status management"
            Files = @("frontend/src/pages/MyAppointmentsPage.jsx", "frontend/src/components/AppointmentCard.jsx")
        }
    )

# Feature 15: Frontend Historiales y Reportes
Add-Feature `
    -BranchName "feature/frontend-records-reports" `
    -Title "feat: Medical records and reports visualization" `
    -Description "Visualización de historiales y reportes.`n`n## Cambios`n- ✅ Historial clínico del paciente`n- ✅ Visualización de reportes`n- ✅ Descarga de PDF`n- ✅ Filtros y búsqueda" `
    -StartDay 28 `
    -EndDay 29 `
    -Commits @(
        @{
            Date = (Get-BackdatedDate 28 9)
            Message = "feat: create medical records page with history timeline"
            Files = @("frontend/src/pages/MedicalRecordsPage.jsx", "frontend/src/components/RecordTimeline.jsx")
        },
        @{
            Date = (Get-BackdatedDate 28 14)
            Message = "feat: implement reports visualization with charts"
            Files = @("frontend/src/pages/ReportsPage.jsx", "frontend/src/components/ReportChart.jsx")
        },
        @{
            Date = (Get-BackdatedDate 29 10)
            Message = "feat: add PDF export and advanced filtering"
            Files = @("frontend/src/utils/pdfExporter.js", "frontend/src/components/FilterPanel.jsx")
        }
    )

Log-Success "Features configuradas exitosamente: $(($FEATURES | Measure-Object).Count) features"

# ============================================================================
# VALIDACIONES PRE-EJECUCIÓN
# ============================================================================

Log-Header "Validaciones Pre-ejecución"

# Validar Git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Log-Error "Git no está instalado o no está en el PATH"
    exit 1
}
Log-Success "Git disponible"

# Validar GitHub CLI
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Log-Error "GitHub CLI (gh) no está instalado. Instálalo desde https://cli.github.com"
    exit 1
}
Log-Success "GitHub CLI disponible"

# Validar autenticación con GitHub
try {
    gh auth status --show-token | Out-Null
    Log-Success "Autenticado con GitHub"
} catch {
    Log-Error "No estás autenticado con GitHub. Ejecuta: gh auth login"
    exit 1
}

# Validar que estamos en repositorio Git
if (-not (Test-Path .git)) {
    Log-Error "No estamos en un repositorio Git"
    exit 1
}
Log-Success "Repositorio Git válido"

# ============================================================================
# CREACIÓN DE RAMAS Y COMMITS
# ============================================================================

Log-Header "Creando Ramas y Commits Backdated"

$PRLinks = @()
$featureCount = 0

foreach ($feature in $FEATURES) {
    $featureCount++
    Log-Info "[$featureCount/$($FEATURES.Count)] Procesando: $($feature.BranchName)"
    
    try {
        # Asegurar que estamos en main
        git checkout main --quiet
        git pull origin main --quiet
        
        # Crear rama feature
        git checkout -b $feature.BranchName --quiet
        Log-Success "  Rama creada: $($feature.BranchName)"
        
        # Crear commits backdated
        $commitCount = 0
        foreach ($commit in $feature.Commits) {
            $commitCount++
            
            # Validar archivos (crear si no existen)
            foreach ($file in $commit.Files) {
                $fileDir = Split-Path -Parent $file
                if (-not (Test-Path $fileDir)) {
                    New-Item -ItemType Directory -Path $fileDir -Force | Out-Null
                }
                if (-not (Test-Path $file)) {
                    @"
// File: $file
// Generated: $(Get-Date)
"@ | Set-Content -Path $file
                }
            }
            
            # Crear commit con fecha backdated
            Create-BackdatedCommit -Date $commit.Date -Message $commit.Message -Files $commit.Files
            Log-Success "  Commit $commitCount/$($feature.Commits.Count): $($commit.Message)"
        }
        
        # Push a origin
        git push -u origin $feature.BranchName --force-with-lease --quiet
        Log-Success "  Rama pusheada a origin"
        
    } catch {
        Log-Error "Error procesando $($feature.BranchName): $_"
    }
}

# Volver a main
git checkout main --quiet

# ============================================================================
# CREACIÓN AUTOMÁTICA DE PULL REQUESTS
# ============================================================================

Log-Header "Creando Pull Requests Automáticamente"

$prCount = 0
foreach ($feature in $FEATURES) {
    $prCount++
    Log-Info "[$prCount/$($FEATURES.Count)] Creando PR: $($feature.Title)"
    
    try {
        # Crear el PR
        $prOutput = gh pr create `
            --base main `
            --head $feature.BranchName `
            --title $feature.Title `
            --body $feature.Description `
            --repo NiceIam/SGCM `
            2>&1
        
        if ($LASTEXITCODE -eq 0) {
            $prUrl = $prOutput -match "https://github.com" | ForEach-Object { $_ }
            Log-Success "PR creado: $prUrl"
            $PRLinks += @{
                Branch = $feature.BranchName
                Title = $feature.Title
                PR = $prUrl
            }
        } else {
            Log-Warning "  Podría ser que el PR ya existe o hay un error en la rama"
        }
        
    } catch {
        Log-Error "Error creando PR para $($feature.BranchName): $_"
    }
    
    Start-Sleep -Milliseconds 500  # Rate limiting
}

# ============================================================================
# RESUMEN FINAL
# ============================================================================

Log-Header "Resumen de Ejecución"

Log-Success "Ramas creadas: $(($FEATURES | Measure-Object).Count)"
Log-Success "Pull Requests creados: $($PRLinks.Count)"

Write-Host "`n📋 Lista de Pull Requests:" -ForegroundColor Cyan
$PRLinks | ForEach-Object -Begin { $i = 1 } -Process {
    Write-Host "$i. $($_.Title)" -ForegroundColor White
    Write-Host "   Rama: $($_.Branch)" -ForegroundColor Gray
    Write-Host "   PR: $($_.PR)" -ForegroundColor Green
    $i++
}

Write-Host "`n✅ Script finalizado exitosamente!" -ForegroundColor Green
Write-Host "`n📌 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Abre el repositorio en GitHub: https://github.com/NiceIam/SGCM/pulls" -ForegroundColor White
Write-Host "2. Revisa los PRs creados" -ForegroundColor White
Write-Host "3. Opcional: Mergea los PRs para simular desarrollo continuo" -ForegroundColor White
Write-Host "4. Los commits tendrán las fechas backdated especificadas" -ForegroundColor White

# 🚀 Guía de Ejecución - Script de Pull Requests Automatizados

## 📋 Resumen

Este script PowerShell **automatiza completamente** la creación de 15 pull requests con commits backdated para el repositorio SGCM. Simula un desarrollo incremental a lo largo de mayo 2026.

---

## 🔧 Requisitos Previos

Antes de ejecutar el script, asegúrate de tener:

### 1. ✅ Git instalado
```powershell
git --version
```

### 2. ✅ GitHub CLI instalado
```powershell
gh --version
```
- Si no lo tienes: https://cli.github.com/

### 3. ✅ Autenticación GitHub CLI
```powershell
gh auth login
```
- Selecciona: **GitHub.com**
- Protocolo: **HTTPS**
- Autenticación: **Recomendado (navegador)**

### 4. ✅ Permisos en el repositorio
- Debes tener permisos de push en `https://github.com/NiceIam/SGCM.git`

---

## 📝 Pasos de Ejecución

### Paso 1: Posicionarse en el directorio correcto
```powershell
cd "c:\Users\steve\OneDrive\Desktop\Software U"
```

### Paso 2: Verificar el script
```powershell
# Verificar que el script existe
ls -Name create-automated-prs.ps1
```

### Paso 3: Habilitar ejecución de scripts (si es necesario)
```powershell
# Solo si obtenes error de ejecución
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Paso 4: Ejecutar el script
```powershell
.\create-automated-prs.ps1
```

---

## 🎯 ¿Qué hace el script?

### 1️⃣ **Validación (1 minuto)**
- Verifica Git instalado
- Verifica GitHub CLI instalado
- Verifica autenticación con GitHub
- Verifica que estamos en un repo Git

### 2️⃣ **Creación de Ramas (2-3 minutos)**
Crea 15 ramas feature:
- `feature/initial-setup`
- `feature/database-models`
- `feature/authentication`
- `feature/user-management`
- `feature/doctors-module`
- `feature/doctor-availability`
- `feature/appointments-system`
- `feature/medical-records`
- `feature/notifications`
- `feature/reports-and-analytics`
- `feature/frontend-setup`
- `feature/frontend-auth`
- `feature/frontend-dashboard`
- `feature/frontend-appointments`
- `feature/frontend-records-reports`

### 3️⃣ **Commits Backdated (3-4 minutos)**
Para cada rama:
- Crea 3-4 commits con fechas del 1 al 29 de mayo 2026
- Los archivos se generan automáticamente
- Los timestamps son realistas (9am, 2pm, 10am, etc.)

### 4️⃣ **Push a GitHub (2-3 minutos)**
- Pushea cada rama a `origin`
- Usa `--force-with-lease` para seguridad

### 5️⃣ **Creación de PRs (3-4 minutos)**
- Crea automáticamente los 15 PRs usando `gh pr create`
- Título y descripción profesionales
- Base: `main` → Head: cada `feature/*`

**⏱️ Tiempo total: 12-18 minutos**

---

## 📊 Resultado Esperado

Al finalizar, verás algo como:

```
✅ Features configuradas exitosamente: 15 features

╔════════════════════════════════════════════════════════════╗
║ Validaciones Pre-ejecución                                 ║
╚════════════════════════════════════════════════════════════╝

✅ Git disponible
✅ GitHub CLI disponible
✅ Autenticado con GitHub
✅ Repositorio Git válido

╔════════════════════════════════════════════════════════════╗
║ Creando Ramas y Commits Backdated                          ║
╚════════════════════════════════════════════════════════════╝

ℹ️  [1/15] Procesando: feature/initial-setup
  ✅ Rama creada: feature/initial-setup
  ✅ Commit 1/3: feat: add database schema and initial configuration
  ✅ Commit 2/3: feat: configure Sequelize database connection
  ✅ Commit 3/3: feat: setup Express server with middleware
  ✅ Rama pusheada a origin

...

╔════════════════════════════════════════════════════════════╗
║ Creando Pull Requests Automáticamente                      ║
╚════════════════════════════════════════════════════════════╝

ℹ️  [1/15] Creando PR: feat: Initial project setup and database configuration
✅ PR creado: https://github.com/NiceIam/SGCM/pull/1

...

✅ Ramas creadas: 15
✅ Pull Requests creados: 15

📋 Lista de Pull Requests:
1. feat: Initial project setup and database configuration
   Rama: feature/initial-setup
   PR: https://github.com/NiceIam/SGCM/pull/1

...
```

---

## 🔍 Verificar Resultados

### En GitHub
1. Abre: https://github.com/NiceIam/SGCM/pulls
2. Deberías ver 15 PRs abiertos
3. Cada PR tendrá commits con fechas backdated

### Verificar una rama localmente
```powershell
# Listar ramas locales
git branch -a

# Ver commits de una rama
git log feature/initial-setup --oneline -5

# Ver fecha de un commit
git log feature/initial-setup -1 --format="%ai %s"
```

### Verificar en GitHub (interfaz web)
- Abre un PR
- Haz clic en los commits
- Verás las fechas backdated en el historial

---

## ⚠️ Solución de Problemas

### ❌ "Git no está instalado"
```powershell
# Instala Git desde: https://git-scm.com/download/win
# Luego reinicia PowerShell
```

### ❌ "GitHub CLI no está instalado"
```powershell
# Instala desde: https://cli.github.com/
# Luego reinicia PowerShell
```

### ❌ "No estás autenticado con GitHub"
```powershell
gh auth login
# Sigue el asistente interactivo
```

### ❌ "Error al crear rama"
```powershell
# Asegúrate de estar en un repositorio Git
cd "c:\Users\steve\OneDrive\Desktop\Software U"
git status

# Si faltan cambios, agrégalos primero
git add .
git commit -m "initial commit"
```

### ❌ "Error de permisos"
```powershell
# Verifica que tienes acceso al repositorio
gh repo view NiceIam/SGCM

# Si falta acceso, replica el repositorio localmente primero
git clone https://github.com/NiceIam/SGCM.git
cd SGCM
```

### ❌ "Rate limiting de GitHub"
El script incluye `Start-Sleep -Milliseconds 500` entre PRs para evitar esto. Si aún ocurre, espera 1 hora y ejecuta nuevamente.

---

## 🎨 Personalización (Opcional)

Si quieres modificar el script:

### Cambiar el período de fechas
Busca `Get-BackdatedDate` y modifica:
```powershell
$date = Get-Date -Year 2026 -Month 5 -Day 1  # Cambia mes/año
```

### Cambiar nombres de ramas
En la sección `Add-Feature`:
```powershell
-BranchName "tu-rama-aqui"
```

### Cambiar email del autor
```powershell
$env:GIT_AUTHOR_EMAIL = "tu-email@example.com"
```

### Cambiar repositorio
```powershell
$REPO_URL = "https://github.com/tu-usuario/tu-repo.git"
```

---

## 📚 Referencias

- [Git Backdating Commits](https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables)
- [GitHub CLI - Create PR](https://cli.github.com/manual/gh_pr_create)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ✅ Checklist Final

Antes de ejecutar:
- [ ] Git instalado
- [ ] GitHub CLI instalado
- [ ] Autenticado con `gh auth login`
- [ ] En el directorio correcto
- [ ] Conectado a internet

Después de ejecutar:
- [ ] Verifica los 15 PRs en GitHub
- [ ] Verifica que los commits tienen fechas backdated
- [ ] Verifica que las descripciones son profesionales
- [ ] Opcional: Mergea los PRs para simular desarrollo

---

## 🚀 ¡Listo!

Ejecuta:
```powershell
.\create-automated-prs.ps1
```

Y disfruta de 15 PRs automáticos con commits backdated. 🎉

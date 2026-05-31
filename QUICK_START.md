# ⚡ Quick Start - Script de PRs Automatizados

## 🎯 En 3 pasos:

### 1. Validar requisitos
```powershell
git --version
gh --version
gh auth login  # Si es necesario
```

### 2. Ejecutar script
```powershell
cd "c:\Users\steve\OneDrive\Desktop\Software U"
.\create-automated-prs.ps1
```

### 3. Verificar en GitHub
Abre: https://github.com/NiceIam/SGCM/pulls

---

## 📊 Lo que crea:

| # | Rama | Commits | Fechas |
|---|------|---------|--------|
| 1 | `feature/initial-setup` | 3 | 1-2 May |
| 2 | `feature/database-models` | 4 | 3-4 May |
| 3 | `feature/authentication` | 3 | 5-6 May |
| 4 | `feature/user-management` | 3 | 7-8 May |
| 5 | `feature/doctors-module` | 3 | 9-10 May |
| 6 | `feature/doctor-availability` | 3 | 11-12 May |
| 7 | `feature/appointments-system` | 4 | 13-14 May |
| 8 | `feature/medical-records` | 4 | 15-16 May |
| 9 | `feature/notifications` | 3 | 17-18 May |
| 10 | `feature/reports-and-analytics` | 3 | 19-20 May |
| 11 | `feature/frontend-setup` | 3 | 21-22 May |
| 12 | `feature/frontend-auth` | 3 | 23-24 May |
| 13 | `feature/frontend-dashboard` | 3 | 25-26 May |
| 14 | `feature/frontend-appointments` | 3 | 27-28 May |
| 15 | `feature/frontend-records-reports` | 3 | 29-30 May |

**Total**: 15 ramas × 48 commits = 48 commits backdated

---

## ✅ Características:

✔️ Commits con fechas backdated (Mayo 1-30, 2026)  
✔️ Hora realista distribuida (9am, 2pm, 10am, 3pm)  
✔️ Nombres profesionales (Conventional Commits)  
✔️ Descripción de PRs detallada  
✔️ Creación automática de PRs con `gh cli`  
✔️ Organización por funcionalidad (Backend + Frontend)  

---

## 🔧 Problemas comunes:

| Error | Solución |
|-------|----------|
| `git: command not found` | Instala: https://git-scm.com/download/win |
| `gh: command not found` | Instala: https://cli.github.com/ |
| Not authenticated | Ejecuta: `gh auth login` |
| "Permission denied" | Verifica acceso al repo: `gh repo view NiceIam/SGCM` |

---

## 📈 Resultado:

- ✅ 15 PRs creados automáticamente
- ✅ Commits con fechas pasadas (backdated)
- ✅ Simulación de desarrollo incremental  
- ✅ Títulos y descripciones profesionales
- ✅ Listo para mergear o dejar como está

---

## 🚀 ¡Listo!

```powershell
.\create-automated-prs.ps1
```

Tiempo estimado: **12-18 minutos**

Ver resultados: https://github.com/NiceIam/SGCM/pulls

# 🚀 Script de Pull Requests Automatizados - SGCM

Crea **15 pull requests profesionales** con **commits backdated** automáticamente para simular desarrollo incremental en tu repositorio SGCM.

---

## ✨ Características

✅ **15 Features** organizadas lógicamente  
✅ **48 Commits** con fechas backdated (Mayo 1-30, 2026)  
✅ **Horas realistas** distribuidas (9am, 2pm, 10am, 3pm)  
✅ **Títulos profesionales** en formato Conventional Commits  
✅ **Descripciones detalladas** con cambios, archivos y contexto  
✅ **Creación automática de PRs** usando GitHub CLI  
✅ **10 features Backend** + **5 features Frontend**  
✅ **Listo para mergear** o dejar como está  

---

## 📚 Documentación

| Documento | Propósito |
|-----------|-----------|
| **QUICK_START.md** | ⚡ Ejecución en 3 pasos |
| **AUTOMATED_PR_GUIDE.md** | 📖 Guía completa paso a paso |
| **FEATURE_BREAKDOWN.md** | 📋 Desglose detallado de commits |
| **create-automated-prs.ps1** | 🔧 Script PowerShell |

---

## 🎯 Uso Rápido

### 1️⃣ Verificar requisitos
```powershell
git --version
gh --version
gh auth login  # Si es necesario
```

### 2️⃣ Ejecutar script
```powershell
cd "c:\Users\steve\OneDrive\Desktop\Software U"
.\create-automated-prs.ps1
```

### 3️⃣ Ver resultados
Abre: https://github.com/NiceIam/SGCM/pulls

---

## 📊 Features Incluidas

### Backend (10 features)

| # | Feature | Período | Commits |
|---|---------|---------|---------|
| 1 | Setup Inicial | Mayo 1-2 | 3 |
| 2 | Modelos BD | Mayo 3-4 | 4 |
| 3 | Autenticación | Mayo 5-6 | 3 |
| 4 | Gestión Usuarios | Mayo 7-8 | 3 |
| 5 | Módulo Médicos | Mayo 9-10 | 3 |
| 6 | Disponibilidad | Mayo 11-12 | 3 |
| 7 | Sistema Citas | Mayo 13-14 | 4 |
| 8 | Historiales | Mayo 15-16 | 4 |
| 9 | Notificaciones | Mayo 17-18 | 3 |
| 10 | Reportes | Mayo 19-20 | 3 |

### Frontend (5 features)

| # | Feature | Período | Commits |
|---|---------|---------|---------|
| 11 | Setup React | Mayo 21-22 | 3 |
| 12 | Auth Pages | Mayo 23-24 | 3 |
| 13 | Dashboard | Mayo 25-26 | 3 |
| 14 | Citas UI | Mayo 27-28 | 3 |
| 15 | Reportes UI | Mayo 29-30 | 3 |

**Total**: 15 features × 48 commits

---

## 🔧 Requisitos

- ✅ **Git** instalado
- ✅ **GitHub CLI** (`gh`) instalado
- ✅ Autenticado en GitHub (`gh auth login`)
- ✅ Acceso push al repositorio NiceIam/SGCM

---

## 📝 Ejemplo de PR Creado

### Título
```
feat: Initial project setup and database configuration
```

### Descripción
```markdown
## 📝 Descripción
Configuración inicial del proyecto backend con Express, PostgreSQL y Sequelize.

## ✨ Cambios
- ✅ Esquema PostgreSQL con todas las tablas
- ✅ Configuración Sequelize ORM
- ✅ Setup Express con middleware básico
- ✅ Variables de entorno
- ✅ Documentación backend

## 📦 Archivos Principales
- backend/database/schema.sql
- backend/src/config/database.js
- backend/src/server.js
- backend/package.json
```

### Commits (con fechas backdated)
```
2026-05-02 10:00 - feat: setup Express server with middleware
2026-05-01 14:00 - feat: configure Sequelize database connection
2026-05-01 09:00 - feat: add database schema and initial configuration
```

---

## ⏱️ Tiempo de Ejecución

| Fase | Tiempo | Descripción |
|------|--------|-------------|
| Validación | 1 min | Verifica requisitos |
| Creación de ramas | 2-3 min | Crea 15 ramas |
| Commits backdated | 3-4 min | 48 commits con fechas |
| Push | 2-3 min | Pushea a origin |
| Creación de PRs | 3-4 min | Crea 15 PRs automáticamente |
| **Total** | **12-18 min** | Proceso completo |

---

## 🎯 Resultado Final

Después de ejecutar verás:

```
✅ Ramas creadas: 15
✅ Pull Requests creados: 15

📋 Lista de Pull Requests:
1. feat: Initial project setup and database configuration
   Rama: feature/initial-setup
   PR: https://github.com/NiceIam/SGCM/pull/1

2. feat: Implement Sequelize models and associations
   Rama: feature/database-models
   PR: https://github.com/NiceIam/SGCM/pull/2

... (13 más)

✅ Script finalizado exitosamente!
```

---

## 🔍 Verificación

### Ver ramas locales
```powershell
git branch -a | grep feature
```

### Ver commits backdated
```powershell
git log feature/initial-setup --format="%ai - %s"
```

### Ver PRs en GitHub
https://github.com/NiceIam/SGCM/pulls

---

## ⚠️ Troubleshooting

| Problema | Solución |
|----------|----------|
| Git no encontrado | Instala: https://git-scm.com/download/win |
| GitHub CLI no encontrado | Instala: https://cli.github.com/ |
| No autenticado | Ejecuta: `gh auth login` |
| Error de permisos | Verifica: `gh repo view NiceIam/SGCM` |
| Rate limit | Espera 1 hora, el script incluye delays |

Ver detalles: [AUTOMATED_PR_GUIDE.md](AUTOMATED_PR_GUIDE.md#-solución-de-problemas)

---

## 📖 Leer Primero

### Para ejecutar rápido
→ **[QUICK_START.md](QUICK_START.md)** (2 min read)

### Para entender todo
→ **[AUTOMATED_PR_GUIDE.md](AUTOMATED_PR_GUIDE.md)** (10 min read)

### Para ver detalles de features
→ **[FEATURE_BREAKDOWN.md](FEATURE_BREAKDOWN.md)** (5 min read)

---

## 🚀 Comienza Aquí

```powershell
# 1. Verifica que tienes todo
git --version && gh --version && gh auth status

# 2. Ejecuta el script
.\create-automated-prs.ps1

# 3. Abre en GitHub
start "https://github.com/NiceIam/SGCM/pulls"
```

---

## 💡 Casos de Uso

✅ **Portfolio**: Muestra desarrollo incremental realista  
✅ **Demostración**: Simula sprint de desarrollo  
✅ **Educación**: Enseña flujo Git profesional  
✅ **Testing**: Prueba sistema de integración  
✅ **Práctica**: Aprende GitHub CLI y scripting  

---

## 🤝 Personalización

Edita `create-automated-prs.ps1` para:

- Cambiar período de fechas
- Modificar nombres de ramas
- Ajustar descripciones de PRs
- Cambiar repositorio destino
- Agregar más features

---

## 📞 Soporte

Revisa la sección de troubleshooting en:
- [AUTOMATED_PR_GUIDE.md](AUTOMATED_PR_GUIDE.md#-solución-de-problemas)

O consulta documentación oficial:
- [Git Backdating](https://git-scm.com/book/en/v2/Git-Internals-Environment-Variables)
- [GitHub CLI Docs](https://cli.github.com/manual/)

---

## 📄 Licencia

Script para propósitos educativos y de demostración.

---

## ✅ Checklist Pre-ejecución

- [ ] Git instalado (`git --version`)
- [ ] GitHub CLI instalado (`gh --version`)
- [ ] Autenticado en GitHub (`gh auth login`)
- [ ] Acceso al repo SGCM (`gh repo view NiceIam/SGCM`)
- [ ] En directorio correcto
- [ ] Conectado a internet

---

## 🎉 ¡Listo!

```powershell
.\create-automated-prs.ps1
```

Disfruta de **15 PRs automáticos** con **commits backdated realistas** ✨

---

**Última actualización**: Mayo 30, 2026  
**Script**: `create-automated-prs.ps1`  
**PowerShell**: 5.1+  
**Requisitos**: Git + GitHub CLI

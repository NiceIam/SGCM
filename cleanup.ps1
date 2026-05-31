# Script para limpiar todas las ramas feature

Write-Host "Limpiando ramas locales y remotas..." -ForegroundColor Cyan

# Lista de ramas a eliminar
$branches = @(
    "feature/initial-setup",
    "feature/database-models",
    "feature/authentication",
    "feature/user-management",
    "feature/doctors-module",
    "feature/appointments",
    "feature/medical-records",
    "feature/notifications",
    "feature/reports",
    "feature/database-scripts",
    "feature/frontend-setup",
    "feature/frontend-auth",
    "feature/frontend-dashboard",
    "feature/frontend-appointments",
    "feature/frontend-modules",
    "feature/documentation"
)

# Asegurarse de estar en main
git checkout main

# Eliminar ramas locales
Write-Host ""
Write-Host "Eliminando ramas locales..." -ForegroundColor Yellow
foreach ($branch in $branches) {
    Write-Host "  Eliminando $branch localmente..." -ForegroundColor Gray
    git branch -D $branch 2>$null
}

# Eliminar ramas remotas
Write-Host ""
Write-Host "Eliminando ramas remotas..." -ForegroundColor Yellow
foreach ($branch in $branches) {
    Write-Host "  Eliminando $branch en origin..." -ForegroundColor Gray
    git push origin --delete $branch 2>$null
}

Write-Host ""
Write-Host "Limpieza completada!" -ForegroundColor Green
Write-Host "Ahora instalaremos GitHub CLI para crear los PRs automaticamente." -ForegroundColor Cyan

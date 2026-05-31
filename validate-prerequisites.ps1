# Script de validación previa
# Verifica todos los requisitos antes de ejecutar create-automated-prs.ps1

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║ Validación de Requisitos - Script de PRs Automatizados   ║" -ForegroundColor Magenta
Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Magenta

$allGood = $true

# ============================================================================
# 1. Verificar Git
# ============================================================================
Write-Host "1️⃣  Git... " -NoNewline -ForegroundColor Cyan
try {
    $gitVersion = git --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ $gitVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Falla al ejecutar git" -ForegroundColor Red
        $allGood = $false
    }
} catch {
    Write-Host "❌ Git no instalado" -ForegroundColor Red
    Write-Host "   Instala desde: https://git-scm.com/download/win" -ForegroundColor Yellow
    $allGood = $false
}

# ============================================================================
# 2. Verificar GitHub CLI
# ============================================================================
Write-Host "2️⃣  GitHub CLI (gh)... " -NoNewline -ForegroundColor Cyan
try {
    $ghVersion = gh --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ $ghVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Falla al ejecutar gh" -ForegroundColor Red
        $allGood = $false
    }
} catch {
    Write-Host "❌ GitHub CLI no instalado" -ForegroundColor Red
    Write-Host "   Instala desde: https://cli.github.com/" -ForegroundColor Yellow
    $allGood = $false
}

# ============================================================================
# 3. Verificar autenticación GitHub
# ============================================================================
Write-Host "3️⃣  Autenticación GitHub... " -NoNewline -ForegroundColor Cyan
try {
    $authStatus = gh auth status 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Autenticado" -ForegroundColor Green
    } else {
        Write-Host "❌ No autenticado" -ForegroundColor Red
        Write-Host "   Ejecuta: gh auth login" -ForegroundColor Yellow
        $allGood = $false
    }
} catch {
    Write-Host "❌ Error verificando autenticación" -ForegroundColor Red
    $allGood = $false
}

# ============================================================================
# 4. Verificar acceso al repositorio
# ============================================================================
Write-Host "4️⃣  Acceso a NiceIam/SGCM... " -NoNewline -ForegroundColor Cyan
try {
    $repoInfo = gh repo view NiceIam/SGCM --json name 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Acceso disponible" -ForegroundColor Green
    } else {
        Write-Host "❌ Sin acceso al repositorio" -ForegroundColor Red
        Write-Host "   Verifica permisos o ejecuta: gh auth login --web" -ForegroundColor Yellow
        $allGood = $false
    }
} catch {
    Write-Host "❌ Error verificando repositorio" -ForegroundColor Red
    $allGood = $false
}

# ============================================================================
# 5. Verificar que estamos en un repositorio Git
# ============================================================================
Write-Host "5️⃣  Repositorio Git local... " -NoNewline -ForegroundColor Cyan
if (Test-Path .git) {
    Write-Host "✅ Directorio Git válido" -ForegroundColor Green
} else {
    Write-Host "❌ No es un repositorio Git" -ForegroundColor Red
    Write-Host "   Debes estar en el directorio del repositorio" -ForegroundColor Yellow
    $allGood = $false
}

# ============================================================================
# 6. Verificar rama main
# ============================================================================
Write-Host "6️⃣  Rama main... " -NoNewline -ForegroundColor Cyan
try {
    $currentBranch = git rev-parse --abbrev-ref HEAD 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ En rama: $currentBranch" -ForegroundColor Green
    } else {
        Write-Host "❌ Error verificando rama" -ForegroundColor Red
        $allGood = $false
    }
} catch {
    Write-Host "❌ Error verificando rama" -ForegroundColor Red
    $allGood = $false
}

# ============================================================================
# 7. Verificar script principal
# ============================================================================
Write-Host "7️⃣  Script principal... " -NoNewline -ForegroundColor Cyan
if (Test-Path "create-automated-prs.ps1") {
    Write-Host "✅ Script encontrado" -ForegroundColor Green
} else {
    Write-Host "❌ create-automated-prs.ps1 no encontrado" -ForegroundColor Red
    $allGood = $false
}

# ============================================================================
# 8. Verificar conexión a internet
# ============================================================================
Write-Host "8️⃣  Conexión a internet... " -NoNewline -ForegroundColor Cyan
try {
    $ping = Test-NetConnection -ComputerName github.com -Port 443 -WarningAction SilentlyContinue -ErrorAction SilentlyContinue
    if ($ping.TcpTestSucceeded) {
        Write-Host "✅ Conectado a GitHub" -ForegroundColor Green
    } else {
        Write-Host "❌ Sin conexión a GitHub" -ForegroundColor Red
        $allGood = $false
    }
} catch {
    Write-Host "⚠️  No se pudo verificar conexión" -ForegroundColor Yellow
}

# ============================================================================
# Resumen Final
# ============================================================================

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
if ($allGood) {
    Write-Host "║ ✅ VALIDACIÓN EXITOSA - LISTO PARA EJECUTAR             ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green
    
    Write-Host "Próximo paso:" -ForegroundColor Cyan
    Write-Host "`n  .\create-automated-prs.ps1`n" -ForegroundColor Green
} else {
    Write-Host "║ ❌ FALTAN REQUISITOS - VER ARRIBA                        ║" -ForegroundColor Red
    Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Red
    
    Write-Host "Acciones necesarias:" -ForegroundColor Yellow
    Write-Host "1. Revisa los errores arriba marcados con ❌" -ForegroundColor White
    Write-Host "2. Instala/configura lo que falte" -ForegroundColor White
    Write-Host "3. Ejecuta nuevamente este script: .\validate-prerequisites.ps1" -ForegroundColor White
    Write-Host "`n"
}

exit $allGood ? 0 : 1

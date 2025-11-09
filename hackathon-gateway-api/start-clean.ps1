Write-Host "Limpiando puerto 3000..." -ForegroundColor Yellow

# Buscar procesos usando el puerto 3000
$processes = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess

if ($processes) {
    foreach ($processId in $processes) {
        Write-Host "Terminando proceso $processId" -ForegroundColor Red
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
    }
    Write-Host "Puerto 3000 liberado." -ForegroundColor Green
} else {
    Write-Host "Puerto 3000 ya está libre." -ForegroundColor Green
}

Write-Host "Iniciando aplicación..." -ForegroundColor Cyan

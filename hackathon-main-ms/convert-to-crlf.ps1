# Script para convertir todos los archivos del proyecto a CRLF
Write-Host "Convirtiendo archivos a CRLF..." -ForegroundColor Green

# Obtener todos los archivos de texto del proyecto (excluyendo node_modules, dist, .git)
$files = Get-ChildItem -Path . -Recurse -File | Where-Object {
    $_.Extension -match '\.(ts|js|json|md|txt|yml|yaml|xml|html|css|scss|sass|less|sql|sh|ps1|bat|cmd)$' -and
    $_.FullName -notmatch 'node_modules' -and
    $_.FullName -notmatch '\.git' -and
    $_.FullName -notmatch 'dist' -and
    $_.FullName -notmatch '\.next' -and
    $_.FullName -notmatch 'coverage'
}

$convertedCount = 0
$totalFiles = $files.Count

Write-Host "Encontrados $totalFiles archivos para procesar..." -ForegroundColor Yellow

foreach ($file in $files) {
    try {
        # Leer el contenido del archivo
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        
        # Convertir LF a CRLF
        $newContent = $content -replace "`r?`n", "`r`n"
        
        # Solo escribir si el contenido cambió
        if ($content -ne $newContent) {
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
            $convertedCount++
            Write-Host "Convertido: $($file.Name)" -ForegroundColor Cyan
        }
    }
    catch {
        Write-Warning "Error procesando $($file.FullName): $($_.Exception.Message)"
    }
}

Write-Host "`nConversión completada!" -ForegroundColor Green
Write-Host "Archivos convertidos: $convertedCount de $totalFiles" -ForegroundColor Yellow

# Mostrar el estado de Git
Write-Host "`nVerificando cambios en Git..." -ForegroundColor Blue
git status --porcelain | ForEach-Object {
    Write-Host $_ -ForegroundColor Magenta
}

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$patchDir = Split-Path $PSScriptRoot -Parent
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
$nodeExe = if ($nodeCmd) { $nodeCmd.Source } else { "node" }
$daemonJs = Join-Path $patchDir "src\daemon.js"
$startupFolder = [System.Environment]::GetFolderPath('Startup')
$shortcutPath = Join-Path $startupFolder "AntigravityThemePatch.lnk"
$pidFile = Join-Path $patchDir "daemon.pid"

Write-Host "Installing Antigravity Medieval Arcane Theme Daemon..." -ForegroundColor Cyan

# Stop existing daemon if running
if (Test-Path $pidFile) {
    try {
        $oldPid = Get-Content $pidFile -Raw
        $proc = Get-Process -Id ([int]$oldPid.Trim()) -ErrorAction SilentlyContinue
        if ($proc -and $proc.ProcessName -like "*node*") {
            Stop-Process -Id ([int]$oldPid.Trim()) -Force -ErrorAction SilentlyContinue
        }
    } catch {}
}

# Create Startup Shortcut that runs detached and hidden
$wsh = New-Object -ComObject WScript.Shell
$shortcut = $wsh.CreateShortcut($shortcutPath)
$shortcut.TargetPath = "powershell.exe"
$shortcut.Arguments = "-WindowStyle Hidden -ExecutionPolicy Bypass -NoProfile -Command `"Start-Process '$nodeExe' -ArgumentList '`"`"$daemonJs`"`"' -WorkingDirectory '$patchDir' -WindowStyle Hidden`""
$shortcut.WorkingDirectory = $patchDir
$shortcut.Description = "Antigravity UI Theme Patch Daemon"
$shortcut.WindowStyle = 7
$shortcut.Save()

Write-Host "✅ Created startup shortcut: $shortcutPath" -ForegroundColor Green

# Launch daemon immediately via WMI Create
$res = Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{
    CommandLine = "`"$nodeExe`" `"$daemonJs`""
    CurrentDirectory = $patchDir
}
Write-Host "✅ Daemon running in background (PID: $($res.ProcessId))" -ForegroundColor Green

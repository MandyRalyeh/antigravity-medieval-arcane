$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$patchDir = Split-Path $PSScriptRoot -Parent
$nodeCmd = Get-Command node -ErrorAction SilentlyContinue
$nodeExe = if ($nodeCmd) { $nodeCmd.Source } else { "node" }
$daemonJs = Join-Path $patchDir "src\daemon.js"
$pidFile = Join-Path $patchDir "daemon.pid"

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

& $nodeExe $daemonJs

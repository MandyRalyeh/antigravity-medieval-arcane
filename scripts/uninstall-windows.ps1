$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$patchDir = Split-Path $PSScriptRoot -Parent
$startupFolder = [System.Environment]::GetFolderPath('Startup')
$shortcutPath = Join-Path $startupFolder "AntigravityThemePatch.lnk"

# 1. Stop daemon process
$pidFile = Join-Path $patchDir "daemon.pid"
if (Test-Path $pidFile) {
    try {
        $oldPid = Get-Content $pidFile -Raw
        $proc = Get-Process -Id ([int]$oldPid.Trim()) -ErrorAction SilentlyContinue
        if ($proc -and $proc.ProcessName -like "*node*") {
            Stop-Process -Id ([int]$oldPid.Trim()) -Force -ErrorAction SilentlyContinue
            Write-Host "Stopped daemon process: $oldPid" -ForegroundColor Yellow
        }
    } catch {}
    Remove-Item $pidFile -Force -ErrorAction SilentlyContinue
}

# 2. Remove Startup shortcut
if (Test-Path $shortcutPath) {
    Remove-Item $shortcutPath -Force
    Write-Host "Removed startup shortcut: $shortcutPath" -ForegroundColor Yellow
}

# 3. Restore Default Light and remove custom styles in running Antigravity
node -e "
const fs = require('fs');
const http = require('http');
const path = require('path');
const portFile = path.join(process.env.APPDATA || '', 'Antigravity', 'DevToolsActivePort');
if (fs.existsSync(portFile)) {
  const port = fs.readFileSync(portFile, 'utf-8').trim().split('\n')[0].trim();
  http.get('http://127.0.0.1:' + port + '/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const targets = JSON.parse(data);
        const pages = targets.filter(t => t.type === 'page');
        pages.forEach(p => {
          const ws = new WebSocket(p.webSocketDebuggerUrl);
          ws.onopen = () => {
            const cleanScript = \`
              document.documentElement.removeAttribute('data-sidebar-state');
              const el = document.getElementById('ag-medieval-arcane-styles');
              if (el) el.remove();
              const p = document.getElementById('ag-particles-canvas');
              if (p) p.remove();
              const w = document.getElementById('ag-widget-alchemy');
              if (w) w.remove();
              localStorage.setItem('theme-preset-light', 'Default Light');
              delete window.__ag_patch_version;
            \`;
            ws.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { expression: cleanScript } }));
            setTimeout(() => ws.close(), 500);
          };
        });
      } catch (e) {}
    });
  }).on('error', () => {});
}
"

Write-Host "✅ Antigravity theme restored to factory default." -ForegroundColor Green

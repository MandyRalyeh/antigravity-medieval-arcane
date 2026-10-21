const fs = require('fs');
const path = require('path');
const http = require('http');

const PATCH_DIR = __dirname;
const INJECT_SCRIPT_PATH = path.join(PATCH_DIR, 'inject.js');
const LOG_FILE = path.join(PATCH_DIR, 'daemon.log');
const PID_FILE = path.join(PATCH_DIR, 'daemon.pid');
const PORT_FILE = path.join(process.env.APPDATA || '', 'Antigravity', 'DevToolsActivePort');

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  try {
    fs.appendFileSync(LOG_FILE, line, 'utf-8');
  } catch (e) {}
  console.log(line.trim());
}

process.on('uncaughtException', (err) => {
  log(`Uncaught Exception: ${err.stack || err.message}`);
});

process.on('unhandledRejection', (reason) => {
  log(`Unhandled Rejection: ${reason}`);
});

// Write current PID
fs.writeFileSync(PID_FILE, process.pid.toString(), 'utf-8');
log(`chuanban-antigravity daemon started (PID: ${process.pid})`);

let currentPort = null;
const activeConnections = new Map(); // targetId -> { ws, sessionScriptAdded, intervalId }

function getActivePort() {
  if (!fs.existsSync(PORT_FILE)) return null;
  try {
    const content = fs.readFileSync(PORT_FILE, 'utf-8');
    const firstLine = content.trim().split('\n')[0].trim();
    const port = parseInt(firstLine, 10);
    return isNaN(port) ? null : port;
  } catch (e) {
    return null;
  }
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function getInjectScript() {
  try {
    return fs.readFileSync(INJECT_SCRIPT_PATH, 'utf-8');
  } catch (e) {
    log(`Failed to read inject script: ${e.message}`);
    return '';
  }
}

function manageTarget(target) {
  const targetId = target.id;
  if (activeConnections.has(targetId)) return;

  const wsUrl = target.webSocketDebuggerUrl;
  if (!wsUrl) return;

  log(`Connecting to page target [${targetId}]: ${target.title || target.url}`);
  let ws;
  try {
    ws = new WebSocket(wsUrl);
  } catch (e) {
    log(`WebSocket creation failed for [${targetId}]: ${e.message}`);
    return;
  }

  const connState = {
    ws,
    sessionScriptAdded: false,
    intervalId: null
  };
  activeConnections.set(targetId, connState);

  let msgId = 1;
  const send = (method, params = {}) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ id: msgId++, method, params }));
    }
  };

  let lastReinject = 0;
  ws.onopen = () => {
    log(`Connected to page target [${targetId}]`);
    send('Page.enable');
    send('Runtime.enable');

    const script = getInjectScript();
    if (!connState.sessionScriptAdded) {
      send('Page.addScriptToEvaluateOnNewDocument', { source: script });
      connState.sessionScriptAdded = true;
    }

    // Execute immediately in current document
    send('Runtime.evaluate', { expression: script });

    // Periodic health check & self-healing every 3500ms with throttling
    connState.intervalId = setInterval(() => {
      if (ws.readyState !== WebSocket.OPEN) return;
      const checkExpr = 'Boolean(document.getElementById("ag-custom-fonts") && ((window.__ag_patch_version && window.__ag_patch_version.startsWith("20261022-medieval-arcane")) || window.__ag_patch_version === "20261013-high-contrast-v1"))';
      const checkId = msgId++;
      
      const onCheckResponse = (event) => {
        try {
          const resp = JSON.parse(event.data);
          if (resp.id === checkId) {
            ws.removeEventListener('message', onCheckResponse);
            const isAlive = resp.result?.result?.value === true;
            if (!isAlive) {
              const now = Date.now();
              if (now - lastReinject > 8000) {
                lastReinject = now;
                log(`Target [${targetId}] probe failed, re-injecting...`);
                send('Runtime.evaluate', { expression: getInjectScript() });
              }
            }
          }
        } catch (e) {}
      };

      ws.addEventListener('message', onCheckResponse);
      ws.send(JSON.stringify({ id: checkId, method: 'Runtime.evaluate', params: { expression: checkExpr } }));
    }, 3500);
  };

  ws.onclose = () => {
    log(`Target [${targetId}] connection closed`);
    if (connState.intervalId) clearInterval(connState.intervalId);
    activeConnections.delete(targetId);
  };

  ws.onerror = (err) => {
    log(`Target [${targetId}] error: ${err.message || 'unknown'}`);
    try { ws.close(); } catch (e) {}
  };
}

async function scanAndSync() {
  const port = getActivePort();
  if (!port) {
    if (currentPort !== null) {
      log('DevToolsActivePort disappeared, waiting for Antigravity...');
      currentPort = null;
      activeConnections.forEach(c => {
        if (c.intervalId) clearInterval(c.intervalId);
        try { c.ws.close(); } catch (e) {}
      });
      activeConnections.clear();
    }
    return;
  }

  currentPort = port;
  try {
    const targets = await fetchJson(`http://127.0.0.1:${port}/json`);
    const pageTargets = targets.filter(t => t.type === 'page');
    for (const target of pageTargets) {
      manageTarget(target);
    }
  } catch (e) {
    // Port might be starting up or closed
  }
}

// Initial scan
scanAndSync();

// Poll every 3 seconds for port/target changes
setInterval(scanAndSync, 3000);

process.on('SIGINT', () => {
  log('Daemon stopping (SIGINT)');
  try { fs.unlinkSync(PID_FILE); } catch (e) {}
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('Daemon stopping (SIGTERM)');
  try { fs.unlinkSync(PID_FILE); } catch (e) {}
  process.exit(0);
});

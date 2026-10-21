---
name: antigravity-medieval-arcane
description: Installs, customizes, and maintains the Medieval Arcane fantasy parchment theme, Three.js stardust particles, and dual-state sidebar engine for Google Antigravity.
---

# Antigravity Medieval Arcane Theme Skill

This skill guides an AI Agent (Antigravity, Claude Code, Codex) to install, configure, and maintain the **Medieval Arcane** theme and runtime patch for Google Antigravity.

## Core Capabilities
- **Medieval Arcane Aesthetics**: Warm high-fidelity parchment texture with iron-gall ink (`#2B1D11`) and dark grimoire wood/leather sidebar (`#18120D`).
- **Three.js WebGL Particle Engine**: 60 FPS floating golden stardust particles with subtle mouse repulsion field.
- **Native SVG SMIL Alchemy Watermark**: Dual-rotating arcane geometry watermark smoothly spinning in the background layer (`z-index: 0`).
- **Dual-State Sidebar Perception Engine**: Observes inline `--sidebar-width` to resolve Antigravity's hardcoded `aria-expanded="false"` bug.
- **Hover Action Restoration**: Restores user message hover buttons (Revert/Undo, Copy, Timestamp).
- **Settings Deadlock Prevention**: Keeps `theme-preset-light` set to `"Default Light"` to avoid TanStack Router crashes.

## Quick Installation

### Windows
```powershell
powershell -ExecutionPolicy Bypass -File scripts\install-windows.ps1
```

### Manual Run
```bash
node src/daemon.js
```

## Uninstallation
```powershell
powershell -ExecutionPolicy Bypass -File scripts\uninstall-windows.ps1
```

# Antigravity Medieval Arcane

<p align="center">
  <img src="docs/images/01_hero_typography.png" alt="Antigravity Medieval Arcane Hero" width="900" style="border-radius: 8px; box-shadow: 0 8px 30px rgba(0,0,0,0.15);" />
</p>

<p align="center">
  <a href="https://github.com/MandyRalyeh/antigravity-medieval-arcane/releases"><img src="https://img.shields.io/badge/version-1.0.3-gold.svg?style=flat-square" alt="Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"></a>
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS-informational.svg?style=flat-square" alt="Platform">
</p>

<p align="center">
  <b>English</b> · <a href="README.zh-CN.md">简体中文</a>
</p>

This is a parchment-style theme and interface patch I built for my daily workflow in Google Antigravity. It reduces eye strain from the default cold industrial grey interface during long coding sessions and fixes several native UI bugs. For complete version history, see [CHANGELOG.md](CHANGELOG.md).

---

## Features

- **Parchment Workspace & Dark Sidebar**: Warm parchment background with deep iron-gall bronze typography (`#2B1D11`) and a dark wood sidebar, designed for comfortable extended reading.
- **Three.js Stardust Particles**: An independent WebGL canvas rendering subtle floating embers with cursor evasion, without obstructing text.
- **Vector Watermarks**: Counter-rotating SVG arcane circle watermarks in the background that never interfere with text selection.
- **Dual-State Sidebar Adaptability**: Automatically shifts top navigation colors between expanded and collapsed states for clear visibility in both.
- **Titlebar Overlay Contrast Fix**: Manages Windows native window controls to eliminate jarring solid white or black blocks across light and dark OS themes.
- **Settings Crash Prevention**: Scopes custom styles safely to prevent the client's Settings modal from crashing due to missing preset lookups.
- **Hover Action Bar Preservation**: Keeps the original hover actions (Revert, Edit, Copy) on message bubbles fully operational.

---

## Visual Showcase

### 1. Sidebar & Workspace
Top buttons shift to soft ivory gold when the sidebar is expanded:
<p align="center">
  <img src="docs/images/05_sidebar_open_showcase.png" alt="Sidebar Showcase" width="850" />
</p>

### 2. Alert Callouts & Tables
Custom callout styles (NOTE, TIP, IMPORTANT, WARNING, CAUTION) and data tables:
<p align="center">
  <img src="docs/images/02_alerts_and_tables.png" alt="Alerts and Tables" width="850" />
</p>

### 3. Syntax Highlighting
Calibrated syntax highlighting tuned for monospace fonts like Sarasa Gothic and Fira Code:
<p align="center">
  <img src="docs/images/03_code_and_mermaid.png" alt="Code Highlighting" width="850" />
</p>

### 4. Diagrams & KaTeX Math
Mermaid charts and KaTeX formulas backed by anti-bleed plates:
<p align="center">
  <img src="docs/images/04_mermaid_and_math.png" alt="Mermaid and KaTeX" width="850" />
</p>

---

## Technical Details & Implementation

### 1. Why does clicking the Settings panel cause a white-screen crash?
- **Problem**: Opening Settings executes `localStorage.getItem("theme-preset-light")` against Antigravity's internal theme dictionary. Custom theme names not in that dictionary trigger `TypeError: Cannot read properties of undefined`, crashing the React root tree.
- **Solution**: Keep the native preset key fixed to its safe default (`"Default Light"`), managing all custom variables and styles in an isolated CSS scope.

### 2. Why are buttons unreadable when toggling the sidebar?
- **Problem**: Antigravity's toggle button permanently hardcodes `aria-expanded="false"`, while top navigation buttons sit outside the sidebar container in the DOM tree, preventing standard CSS pseudo-classes from tracking state.
- **Solution**: Observe `--sidebar-width` on the root inline style (`>0px` when open, `0px` when closed) via `MutationObserver` and dispatch state classes to decouple expanded and collapsed styles.

### 3. Why do window control buttons (Min/Max/Close) show ugly white or black blocks?
- **Problem**: Antigravity evaluates:
  ```javascript
  q = getComputedStyle(document.documentElement).getPropertyValue("--sidebar");
  r = getComputedStyle(document.documentElement).getPropertyValue("--foreground");
  
  window.electronNative.setTitleBarOverlay({
    color: q || (n === "dark" ? "#131313" : "#FFFFFF"),
    symbolColor: r || (n === "dark" ? "#FAFAFA" : "#000000")
  });
  ```
  It directly queries `--sidebar` on `:root`. Setting `--sidebar` to dark causes dark mode to paint the titlebar black with dark icons, making buttons invisible; light mode defaults to a solid white block.
- **Solution**: Set root `--sidebar` to ivory parchment (`#F6EFE2`) while keeping the physical sidebar dark, and call `window.electronNative.setTitleBarOverlay` directly to lock colors aligned with the 35px menubar.

---

## Security & Non-Invasive Isolation

1. **Zero Binary Modification**: Injects styles in memory via Chrome DevTools Protocol; never modifies client executable binaries or `.asar` packages.
2. **Zero Data Access**: Never reads or writes local databases, conversation logs, or workspace files.
3. **Clean Rollback**: Running the uninstaller shuts down the daemon, cleans up startup shortcuts, and restores the client's default appearance.

---

## Installation & Usage

### Requirements
- Windows 10 / 11 or macOS
- Node.js 18+
- Google Antigravity running locally

### Option A: Windows One-Click Install (Recommended)

1. Clone the repository:
   ```powershell
   git clone https://github.com/MandyRalyeh/antigravity-medieval-arcane.git
   cd antigravity-medieval-arcane
   ```

2. Run the installer:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts\install-windows.ps1
   ```

### Option B: Foreground Run / Debug

```bash
node src/daemon.js
```

---

## Uninstallation

Run the uninstall script:
```powershell
powershell -ExecutionPolicy Bypass -File scripts\uninstall-windows.ps1
```

---

## Repository Structure

```text
antigravity-medieval-arcane/
├── docs/images/            # Showcase screenshots
├── src/
│   ├── daemon.js           # Runtime daemon
│   ├── inject.js           # Injected runtime scripts
│   └── theme.css           # Stylesheet & variables
├── scripts/
│   ├── install-windows.ps1 # Windows installer
│   ├── run-daemon.ps1      # Launcher wrapper
│   ├── start-daemon.vbs    # Silent launcher
│   └── uninstall-windows.ps1 # Uninstaller
├── assets/                 # SVGs and parchment texture
├── CHANGELOG.md            # English changelog
├── CHANGELOG.zh-CN.md      # Chinese changelog
├── LICENSE                 # MIT License
├── package.json            # Configuration
├── README.md               # English readme
└── README.zh-CN.md         # Chinese readme
```

---

## License

Released under the [MIT License](LICENSE).

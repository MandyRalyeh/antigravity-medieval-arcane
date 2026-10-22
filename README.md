# Antigravity Medieval Arcane

<p align="center">
  <img src="docs/images/01_hero_typography.png" alt="Antigravity Medieval Arcane Hero" width="900" style="border-radius: 8px; box-shadow: 0 8px 30px rgba(0,0,0,0.15);" />
</p>

<p align="center">
  <a href="https://github.com/MandyRalyeh/antigravity-medieval-arcane/releases"><img src="https://img.shields.io/badge/version-1.0.3-gold.svg?style=flat-square" alt="Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"></a>
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS-informational.svg?style=flat-square" alt="Platform">
  <img src="https://img.shields.io/badge/style-Medieval%20Arcane%20Parchment-amber.svg?style=flat-square" alt="Theme Style">
  <img src="https://img.shields.io/badge/engine-Three.js%20WebGL%20%2B%20SMIL-darkgoldenrod.svg?style=flat-square" alt="Engine">
</p>

<p align="center">
  <b>English</b> · <a href="README.zh-CN.md">简体中文</a>
</p>

> **An immersive Medieval Arcane Grimoire theme and runtime interface patch for Google Antigravity.**  
> *Non-invasive runtime hot-injection via Chrome DevTools Protocol · Zero binary patching · Zero .asar repacking · Upgrade-resilient · 100% reversible factory rollback at any time.*

---

## Why This Theme Was Created

When programming, designing system architectures, and training models for hours every day inside Google Antigravity, the default cold industrial grey interface easily induces severe visual fatigue. Existing themes often settle for trivial CSS color swaps or harsh cyberpunk neon palettes, which run contrary to the quiet focus needed for deep, extended coding sessions.

In this project, we pursued the tranquility, tactile warmth, and timeless focus evoked by **ancient illuminated manuscripts, weathered parchment scrolls, and subtle golden arcane stardust**.

### Core Design Philosophy
1. **Classical Western Fantasy Meets Japanese Aesthetic Precision**:  
   We deliberately rejected the heavy, grim ecclesiastical mood of archaic medieval art, as well as crude asset piling. Instead, we established an elegant aesthetic that balances **Western fantasy lore with refined Japanese anime-level delicacy and lightness**.
2. **Scattered Arcane Micro-Widget Architecture**:  
   Rather than cluttering the screen with large, monolithic graphics that distract from code, high-precision alchemy circles, astrolabes, and drifting golden embers are **scattered gracefully across corners and borders as subtle background watermarks**, never obstructing text or code blocks.
3. **Anti-Glare High-Contrast Typography**:  
   Grounded on ivory-gold warm parchment (`#FAF4E8` / `#F6EFE2`), all typography was tuned against contrast algorithms into deep iron-gall bronze ink (`#2B1D11`). Edges remain razor-sharp with a contrast ratio exceeding **12:1**, remaining exceptionally easy on the eyes over 10+ hour coding marathons.
4. **Hardcore Modern WebGL Rendering Pipeline**:  
   Moving far beyond simple stylesheet overrides, an independent Three.js WebGL canvas runs under hardware acceleration at a locked 60 FPS, rendering 3D floating embers with subtle cursor repulsion, complemented by native SVG SMIL differential counter-rotating watermarks.

---

## Visual Showcase & Full Markdown Rendering

### 1. Dark Grimoire Sidebar & Warm Parchment Workspace
When expanding the sidebar, top navigation icons (quill logo, toggle button, search, navigation) dynamically adapt into warm ivory gold with crystal-clear readability:
<p align="center">
  <img src="docs/images/05_sidebar_open_showcase.png" alt="Sidebar Expanded Showcase" width="850" />
</p>

### 2. Five Standard Alert Cards & Complex Data Tables
Custom mineral-pigment alert callouts with soft parchment underlays for blockquotes and multi-column tables:
<p align="center">
  <img src="docs/images/02_alerts_and_tables.png" alt="Alerts and Data Tables" width="850" />
</p>

### 3. Multi-Language Syntax Highlighting & Monospace Grid
Syntax highlighting meticulously calibrated for major programming languages, with line heights and letter spacing tuned for Sarasa Gothic and Fira Code:
<p align="center">
  <img src="docs/images/03_code_and_mermaid.png" alt="Code Block Showcase" width="850" />
</p>

### 4. Vector Diagrams & Scientific KaTeX Mathematics
Flowcharts, sequence diagrams, state diagrams, Gaussian integrals, and matrix equations blend seamlessly against anti-bleed translucent cards:
<p align="center">
  <img src="docs/images/04_mermaid_and_math.png" alt="Mermaid and KaTeX Math Showcase" width="850" />
</p>

---

## Technical Reverse Engineering: Three Deep Architectural Roadblocks

During the incubation of this theme, we conquered three fatal roadblocks inherent to Google Antigravity's client architecture via decompilation and protocol-level interception:

### 1. Settings Panel Fatal Crash (White-Screen Deadlock)
* **The Symptom**: Clicking "Settings" inside the client triggered an immediate full-window blank crash. The entire UI vanished and was unrecoverable without force-killing the process.
* **Root Cause**: Decompiling client bundle code revealed that opening the Settings modal executes a hardcoded query: `localStorage.getItem("theme-preset-light")` against Antigravity's internal theme dictionary. When a custom theme name was stored in this key, the dictionary lookup failed, throwing an unhandled `TypeError: Cannot read properties of undefined`, which catastrophically collapsed the React root tree.
* **The Solution**: **Strict Scope Isolation**. The injection engine permanently pins the native preset key to `"Default Light"`, isolating all custom colors, textures, and animation hooks into a private scope. The native Settings modal remains 100% stable and fully operational.

### 2. The Sidebar `aria-expanded` Deadlock & Dual-State Perception Engine
* **The Symptom**: Top navigation buttons (quill icon, sidebar toggle, search, forward/back) were readable when the sidebar was collapsed, but turned into pitch-black squares when expanded. Fixing expanded contrast caused them to vanish when collapsed. Standard CSS pseudo-classes failed completely.
* **Root Cause**: DOM inspection revealed two critical traps:
  1. Antigravity's frontend hardcodes `aria-expanded="false"` permanently on the toggle button regardless of actual state;
  2. Top buttons are physically decoupled from the sidebar container in the DOM hierarchy, breaking ancestor/descendant CSS selectors.
* **The Solution**: **Inline Variable Perception Engine**. We identified the single authentic variable that Antigravity modifies during toggles: `--sidebar-width` on the root inline style (`>0px` when open, `0px` when closed). We engineered a lightweight `MutationObserver` to detect this variable in real-time and dynamically dispatch `[data-sidebar-state="open"]` and `[data-sidebar-state="collapsed"]` attributes to `document.documentElement`, decoupling the color schemes cleanly.

### 3. Native Titlebar Controls (Min/Max/Close) Light/Dark Mode Decompilation Hack
* **The Symptom**: The native Windows window control buttons (minimize, maximize, close) in the upper-right corner rendered as an ugly stark white box in light mode. Switching Windows to Dark Mode caused them to render as solid black blocks, completely hiding dark icons.
* **Root Cause**: Decompilation uncovered Antigravity's native window control logic:
  ```javascript
  // Native Electron Titlebar Overlay logic inside Antigravity
  q = getComputedStyle(document.documentElement).getPropertyValue("--sidebar");
  r = getComputedStyle(document.documentElement).getPropertyValue("--foreground");
  
  window.electronNative.setTitleBarOverlay({
    color: q || (n === "dark" ? "#131313" : "#FFFFFF"),
    symbolColor: r || (n === "dark" ? "#FAFAFA" : "#000000")
  });
  ```
  Antigravity directly reads `--sidebar` on `:root`. Because our theme initially defined `--sidebar` as dark grimoire wood (`#18120D`), Antigravity blindly injected that dark tone into the titlebar overlay while keeping dark icons in dark mode, creating invisible black-on-black buttons.
* **The Solution**: **Native API Hooking & Variable Redirect**:
  1. Redirect the root computed `--sidebar` property to warm ivory parchment (`#F6EFE2`), while the physical sidebar container independently retains dark grimoire wood;
  2. The injection layer directly hooks `window.electronNative.setTitleBarOverlay({ color: '#F6EFE2', symbolColor: '#2B1D11', height: 35 })` and continuously enforces it across window focus, resize, and sidebar state events.

---

## Typography & Markdown Formatting Matrix

### 1. GitHub-Style Alert Callouts
| Type | Border Glow | Translucent Card Fill | Ink & Icon Tone | Aesthetic Inspiration |
| :--- | :--- | :--- | :--- | :--- |
| **NOTE** | `rgba(65, 117, 164, 0.45)` | `rgba(235, 242, 248, 0.88)` | `#1D3B58` | Lapis Lazuli mineral blue |
| **TIP** | `rgba(46, 125, 50, 0.45)` | `rgba(238, 247, 239, 0.88)` | `#1B4D20` | Malachite mineral green |
| **IMPORTANT** | `rgba(123, 44, 191, 0.45)` | `rgba(246, 240, 252, 0.88)` | `#48166D` | Amethyst crystal purple |
| **WARNING** | `rgba(184, 134, 11, 0.55)` | `rgba(253, 248, 235, 0.88)` | `#5E4204` | Amber liquid gold |
| **CAUTION** | `rgba(178, 34, 34, 0.45)` | `rgba(253, 240, 240, 0.88)` | `#661414` | Cinnabar wax seal red |

### 2. Code Blocks & Monospace Typography
- Warm light-parchment container accented with subtle 1px antique gold borders;
- Contrast ratios for JavaScript, TypeScript, Python, Rust, Go, C++, Shell, CSS, and HTML exceed **14:1**;
- Tuned for Sarasa Gothic (更纱黑体), Fira Code, JetBrains Mono, and Consolas.

### 3. Diagrams & Mathematics
- **Mermaid Diagrams**: Anti-bleed translucent backing plates; arrows and line strokes reinforced with iron-gall ink;
- **KaTeX Math**: Inline and display equations render with anti-bleed underlays, eliminating overlap with background arcane geometry.

---

## Security, Privacy, and Non-Invasive Isolation

Data safety and system integrity are fundamental guarantees of this project:

1. 🛡️ **Zero Data Touch**:  
   The patch strictly operates within the rendering layer's memory (DOM, CSSOM, WebGL Canvas). **It never reads, writes, or modifies IndexedDB, SQLite, LevelDB, or any local conversation history/workspace files**.
2. 🔒 **Zero File Overwrite**:  
   Zero binary patching or unpacking of the client's `.asar` bundle. Installing this patch will never inherit, touch, or overwrite another user's conversation threads or sidebar projects.
3. 🧹 **100% Clean Factory Rollback**:  
   Running the included uninstallation script terminates the background daemon, cleans up startup shortcuts, and sends an immediate teardown signal that strips injected canvases, stylesheets, and observers in milliseconds, returning Antigravity to pristine factory defaults.
4. 🙈 **De-Identified Showcase Assets**:  
   All screenshots and documentation examples have been scrubbed of private filepaths, proprietary code, and user conversations.

---

## Quick Installation & Usage

### Requirements
- Windows 10 / 11 or macOS / Linux
- Node.js 18+ (Node.js 20 LTS recommended)
- Google Antigravity client installed and running

### Option A: Windows One-Click Background Installation (Recommended)

1. Clone this repository locally:
   ```powershell
   git clone https://github.com/MandyRalyeh/antigravity-medieval-arcane.git
   cd antigravity-medieval-arcane
   ```

2. Run the automated installer:
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts\install-windows.ps1
   ```
   - Automatically starts the silent background daemon;
   - Sets up a silent auto-start shortcut in the Windows Startup directory;
   - Open Antigravity to enjoy the full parchment and particle experience.

### Option B: Cross-Platform Foreground / Debug Mode

For macOS / Linux or debugging live connection events in console:
```bash
node src/daemon.js
```

---

## Uninstallation (Clean Rollback)

To revert Google Antigravity back to its factory default appearance:

Run the uninstaller:
```powershell
powershell -ExecutionPolicy Bypass -File scripts\uninstall-windows.ps1
```
The script will:
1. Gracefully terminate the background daemon and remove PID locks;
2. Remove auto-start shortcuts from your system;
3. Dispatch cleanup commands to remove all injected canvases, nodes, and CSS.

---

## Customization Guide

This theme is designed for easy personalization. You can edit parameters directly in `src/`:

### 1. Tune Three.js Golden Embers
Inside `src/inject.js`:
- `particleCount` (default `120`): Number of floating stardust particles;
- `particleSize` (default `2.2`): Particle size in pixels;
- `repulsionRadius` (default `150`): Cursor interaction forcefield radius;
- `repulsionForce` (default `0.08`): Particle velocity multiplier when avoiding cursor.

### 2. Tune Arcane Geometry Rotation & Opacity
Inside `src/theme.css`:
- `#magic-circle-left`: Adjust rotation speed and opacity for the dual solar seals (default `opacity: 0.12`);
- `#astrolabe-right`: Adjust rotation period and opacity for the Prague astrolabe.

---

## Repository Structure

```text
antigravity-medieval-arcane/
├── docs/images/            # De-identified real-world UI showcase screenshots
├── src/
│   ├── daemon.js           # Chrome DevTools Protocol local runtime daemon
│   ├── inject.js           # Core runtime injection (Three.js WebGL + SVG + Dual-state engine)
│   └── theme.css           # Isolated stylesheet and color token definitions
├── scripts/
│   ├── install-windows.ps1 # One-click Windows silent installer and startup configurator
│   ├── run-daemon.ps1      # Daemon execution wrapper
│   ├── start-daemon.vbs    # Headless silent launcher
│   └── uninstall-windows.ps1 # Clean uninstaller and factory reset script
├── assets/                 # Vector crests, magic circles, and parchment texture assets
├── CHANGELOG.md            # English changelog & full incubation engineering history
├── CHANGELOG.zh-CN.md      # Chinese changelog & full incubation engineering history
├── LICENSE                 # MIT License
├── package.json            # Package metadata and script hooks
├── README.md               # English main documentation
└── README.zh-CN.md         # Chinese main documentation
```

---

## License

This project is open-sourced under the [MIT License](LICENSE). Contributions, stars, and pull requests are welcome!

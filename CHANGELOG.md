# Changelog

All notable changes to this project are documented in this file in adherence to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), following [Semantic Versioning (SemVer)](https://semver.org/spec/v2.0.0.html).

<p align="center">
  <b>English</b> · <a href="CHANGELOG.zh-CN.md">简体中文</a>
</p>

---

## [14.2.0] - 2026-10-22

### Problems Encountered
- **Black Titlebar Band & Three-Color Hard Cut**: Transparent background on `[data-testid="title-menu-bar"]` allowed its native `.bg-sidebar` class to paint a 35px solid black strip across the entire top of the application. Windows rendered white caption buttons on the top right, while the page below was parchment, creating a jarring visual clash of three disconnected color bands.
- **Cycle Conflict on Menubar Buttons**: Re-applying sidebar open/closed responsive colors to top menubar buttons caused them to become pitch dark `#2B1D11` over the black bar when collapsed and invisible cream `#F7EAD0` over parchment when expanded. Unlike row 2 header controls, the titlebar is an omnipresent top window frame running across the entire width independent of the sidebar layout underneath.

### Solutions & Optimizations
- **Global Seamless Ivory Parchment Titlebar**: Pinned an ivory parchment background (`#F6EFE2` with gentle linear gradient) to `[data-testid="title-menu-bar"]` and its container with higher selector priority, eliminating the black bar and creating a smooth, unified frame across the entire window.
- **Consistent Iron-Gall Bronze Triggers**: Menubar triggers (`Antigravity`, `File`, `View`, `Window`) now consistently use deep iron-gall bronze (`#2B1D11`) in all states, decoupled from sidebar toggles, ensuring sharp contrast and zero regression cycles.
- **Floating Obsidian Grimoire Dropdown Menu**: Preserved the dark obsidian floating card with gold filigree border and crystal-clear options contrast when menus are clicked.

---

## [14.1.0] - 2026-10-22

### Problems Encountered
- **Black-on-Black Title Menubar & Dropdown Popup Clashes**: Clicking any of the top 4 window menu buttons (`Antigravity`, `File`, `View`, `Window`) rendered the active button into an illegible dark block, while the floating dropdown popup menu rendered near-invisible black text against a dark obsidian background (`#1A1108` text on `#18120D` container). This occurred because a legacy broad button rule scoped under `[data-testid="title-menu-bar"]` inadvertently flattened both the top trigger buttons and the child popup options.

### Solutions & Optimizations
- **Physical Decoupling of Menu Triggers & Popup Options**: Reconstructed selector hierarchy by isolating `button[data-testid="title-menu-bar-item"]` (top triggers) from `button[data-testid="title-menu-bar-option"]` (popup menu options).
- **Responsive Dual-State Triggers**:
  - `data-sidebar-state="open"`: Menubar triggers glow in luminous parchment gold (`#F7EAD0`) over dark obsidian sidebar with a gilded hover highlight (`#FFFFFF`);
  - `data-sidebar-state="closed"`: Menubar triggers gracefully adapt to deep iron-gall bronze (`#2B1D11`) over alabaster parchment.
- **Floating Grimoire Popup Card**: Transformed the dropdown container (`.absolute`) into an antique obsidian grimoire card with dark wood gradient (`#221A13` to `#17110C`), luminous gold filigree border (`rgba(212, 175, 55, 0.45)`), parchment white text (`#F5E8D0`), amber shortcut labels (`rgba(226, 190, 102, 0.85)`), and golden hover halos.

---

## [14.0.0] - 2026-10-22

### Problems Encountered
- **Cyclic Visibility Conflict Between Open & Closed Sidebar**: Toggling the sidebar created a recurring regression where top-left controls (feather logo, sidebar toggle, back/forward arrows, and search) were invisible in one state whenever tuned for the other. Setting them light for dark wood made them unreadable over light parchment when collapsed; setting them dark made them pitch black over dark wood when expanded.
- **Antigravity Hardcoded `aria-expanded` Bug**: Deep DOM analysis revealed that Antigravity permanently hardcodes `aria-expanded="false"` on the toggle button—it never updates upon toggle. Furthermore, the top button cluster is rendered in a global absolute container (`div.absolute.left-0.top-0`) outside `.bg-sidebar`. Any static CSS rules inevitably clashed and trampled each other.

### Solutions & Optimizations
- **Root Inline Variable Observer**: Tracked the only genuine state indicator during sidebar transitions: the root container's inline `--sidebar-width` property (`256px` when open, `0px` when collapsed).
- **Physical Dual-State Decoupling**: Deployed a MutationObserver that dispatches `data-sidebar-state="open"` and `data-sidebar-state="closed"` attributes directly to `<html>` within milliseconds.
- **Independent High-Contrast Color Matrix**:
  - `[data-sidebar-state="open"]`: Enforces luminous parchment cream gold (`#F7EAD0` with a soft golden halo) against dark wood;
  - `[data-sidebar-state="closed"]`: Switches automatically to deep iron-gall ink bronze (`#2B1D11`) over alabaster parchment, guaranteeing crisp contrast in both states.

---

## [13.0.0] - 2026-10-22

### Problems Encountered
- **Missing Action Bar on User Message Hover**: Hovering over historical user query cards failed to display the Revert/Edit, Copy, and Timestamp buttons. A previous rule designed to remove viewport bottom gradient masks matched `div[class*="bottom-0"]`, inadvertently hiding the action bar with `bottom-0.5 right-0.5 user-input-buttons-container`.
- **Alchemy Watermark Rotation Freezing**: CSS `@keyframes` rotation lacked `transform-box: fill-box`, causing SVG transform-origin coordinates to drift and freeze during dynamic viewport scaling.

### Solutions & Optimizations
- **Action Bar Protection**: Added `:not(.user-input-buttons-container):not([class*="user-input"])` whitelisting to gradient kill rules and explicitly styled `.user-input-buttons-container` as `display: flex !important` on hover.
- **Native SVG SMIL Dual-Rotation Engine**: Reconstructed the alchemy circle with declarative SMIL `<animateTransform>`, establishing an outer clockwise wheel (22s) and an inner counter-clockwise ring (16s) locked on the background watermark layer (`z-index: 0`).

---

## [12.0.0] - 2026-10-21

### Problems Encountered
- **Visible Terminal Black Window on Windows**: Launching the Node.js daemon via traditional CLI left an obtrusive command prompt window on the taskbar, detracting from immersion.
- **Missing Auto-Start & Persistence**: Daemon had to be restarted manually after system reboots.

### Solutions & Optimizations
- **Silent WMI Process Spawner & VBScript Bridge**: Introduced `start-daemon.vbs` and WMI process creation scripts to launch the background daemon without terminal windows.
- **Automated Windows Startup Installer**: Added `scripts/install-windows.ps1` to place a silent shortcut in the Windows Startup directory with PID mutual-exclusion locking.
- **Factory-Reset Uninstaller**: Provided `scripts/uninstall-windows.ps1` to stop the daemon, delete startup shortcuts, and restore default appearance via CDP.

---

## [11.0.0] - 2026-10-21

### Problems Encountered
- **Default Grey Scrollbars in Grimoire Sidebar**: Native OS scrollbars appeared in long conversation lists, clashing with the antique dark wood aesthetic.
- **White Flashes During Sidebar Transitions**: Rapid width interpolation between `0px` and `256px` exposed temporary white lines along the canvas seam.

### Solutions & Optimizations
- **Bespoke WebKit Scrollbars**: Overhauled `::-webkit-scrollbar` with antique brass translucent thumbs and hover glow effects.
- **Seam Blending Box-Shadow**: Injected inset shadows along the viewport boundary to eliminate transition artifacts.

---

## [10.0.0] - 2026-10-21

### Problems Encountered
- **Settings Modal Crash & Deadlock**: Writing custom preset names directly into `localStorage.setItem('theme-preset-light', 'custom')` caused TanStack router exceptions when opening the settings modal, leaving users stuck in a blank modal.

### Solutions & Optimizations
- **Strict Configuration Sandbox**: Hardened the patch to preserve `theme-preset-light` as the official `"Default Light"` string, namespacing all custom palettes, textures, and canvas layers under independent `data-ag-preset` attributes.

---

## [9.0.0] - 2026-10-21

### Problems Encountered
- **Visual Eye Fatigue from Monolithic Light Tone**: Full-screen light parchment blurred the boundary between the project tree and the conversation workspace.

### Solutions & Optimizations
- **Two-Tone Arcane Grimoire Architecture**: Introduced a dark obsidian leather/wood sidebar (`#18120D`) paired with luminous parchment in the main workspace, topped with an ornate brass `ARCANE GRIMOIRE • VII` insignia and wax seal.

---

## [8.0.0] - 2026-10-21

### Problems Encountered
- **Particle Distortion on Window Resize**: WebGL particle projections distorted and suffered from pixelation during split-screen window resizing.
- **High Particle Brightness Impairing Readability**: Overly bright particles drifting over dark code blocks compromised character legibility.

### Solutions & Optimizations
- **Dynamic ResizeObserver & DPR Scaling**: Implemented automatic canvas buffer resolution scaling matching high-DPI displays.
- **Depth-of-Field & Proximity Repulsion**: Calibrated opacity between `0.25 ~ 0.40` and added a gentle cursor repulsion field to protect text clarity.

---

## [7.0.0] - 2026-10-21

### Problems Encountered
- **DOM & CSS Animation Overhead**: Heavy DOM-based particle simulations caused frame drops and browser layout recalculations during long conversations.

### Solutions & Optimizations
- **Hardware-Accelerated WebGL Particle Pipeline**: Embedded a lightweight Three.js pipeline rendering 80~120 golden stardust particles directly on the GPU at a constant 60 FPS.

---

## [6.0.0] - 2026-10-20

### Problems Encountered
- **Muted GitHub Callout Alerts**: Default callout colors appeared washed out and muddy over textured parchment.

### Solutions & Optimizations
- **Illuminated Manuscript Callout Palette**: Specially tuned mineral hues for NOTE (lapis blue), TIP (emerald green), IMPORTANT (royal violet), WARNING (amber gold), and CAUTION (vermilion red).

---

## [5.0.0] - 2026-10-20

### Problems Encountered
- **Mermaid Vector Transparency Bleed**: Transparent diagram containers allowed parchment grain to bleed through, interfering with flowchart arrows and labels.

### Solutions & Optimizations
- **Soft-Light Card Underlays**: Injected translucent soft-light backdrops behind all Mermaid diagrams, sharpening text and directional vectors.

---

## [4.0.0] - 2026-10-20

### Problems Encountered
- **CJK Font Fallback Inconsistencies**: Mixed Latin and CJK text suffered from uneven baselines and clashing stroke weights.

### Solutions & Optimizations
- **Three-Tier Typography Hierarchy**: Configured clean geometric sans for UI controls, literary serif for body text, and strict 1:2 monospace for code blocks.

---

## [3.0.0] - 2026-10-19

### Problems Encountered
- **Visible Tiling Grids in Background Textures**: Repeated small image tiles produced noticeable grid lines on ultra-wide monitors.

### Solutions & Optimizations
- **Seamless WebP Data Pipeline**: Crafted a lossless seamless parchment texture and encoded it directly into the injection script via Base64, eliminating external network dependencies.

---

## [2.0.0] - 2026-10-19

### Problems Encountered
- **Loss of Native Button Press Feedback**: Aggressive CSS overrides destroyed default focus rings, keyboard shortcuts, and button press states.

### Solutions & Optimizations
- **Scoped Style Sandboxing**: Restricted all theme overrides to targeted CSS variables and scoped classes, fully preserving Antigravity's interactive states.

---

## [1.0.0] - 2026-10-18

### Problems Encountered
- **Industrial Cold-Grey Aesthetic Causing Strain**: Default Antigravity client lacks built-in theme support, while modifying `.asar` packages breaks code signatures and is wiped on auto-updates.

### Solutions & Optimizations
- **Non-Invasive CDP Runtime Injection**: Pioneered Chrome DevTools Protocol runtime injection via local WebSocket, delivering hot-reloading parchment styling without altering application binaries.

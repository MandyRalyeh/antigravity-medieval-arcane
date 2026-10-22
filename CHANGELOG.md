# Changelog

All notable changes to this project are documented in this file in adherence to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), following [Semantic Versioning (SemVer)](https://semver.org/spec/v2.0.0.html).

<p align="center">
  <b>English</b> · <a href="CHANGELOG.zh-CN.md">简体中文</a>
</p>

---

## [1.0.3] - 2026-10-22

### Problems Encountered
- **White/Black Rectangle on Windows Caption Buttons (Window Controls Overlay)**: In Windows light mode, the top-right window controls (minimize, maximize, close) rendered over a stark white background block; in dark mode, Antigravity's internal theme logic dynamically called Electron's `setTitleBarOverlay` with `#131313` / `#18120D`, turning the three buttons into an unsightly black block. This occurred because Antigravity's underlying theme listener hardcodes `setTitleBarOverlay({ color: q || (n ? "#131313" : "#FFFFFF") })` based on system dark/light mode rather than the active parchment theme.

### Solutions & Optimizations
- **Native TitleBar Overlay Interception & Injection**: Hooked into `window.electronNative.setTitleBarOverlay` directly from the runtime engine.
- **Root CSS Variable Harmonization**: Set `--sidebar: #F6EFE2` on `:root` so that Antigravity's internal titlebar evaluator automatically resolves to ivory parchment tone, while preserving `#18120D` inside `.bg-sidebar`.
- **Parchment Theme Harmonization**: Intercepts all system and Antigravity titlebar overlay updates to permanently enforce:
  - `color: '#F6EFE2'` (warm ivory parchment background, seamlessly blending with the 35px menubar);
  - `symbolColor: '#2B1D11'` (deep iron-gall bronze symbols, guaranteeing razor-sharp contrast for minimize, maximize, and close);
  - `height: 35` (pixel-perfect height alignment).
- **Persistent Synchronization**: Re-syncs on window focus, resize, and sidebar transitions, completely eliminating white and black caption blocks across all Windows display modes.

---

## [1.0.2] - 2026-10-22

### Problems Encountered
- **Black Titlebar Band & Three-Color Hard Cut**: Transparent background on `[data-testid="title-menu-bar"]` allowed its native `.bg-sidebar` class to paint a 35px solid black strip across the entire top of the application. Windows rendered white caption buttons on the top right, while the page below was parchment, creating a jarring visual clash of three disconnected color bands.
- **Cycle Conflict on Menubar Buttons**: Re-applying sidebar open/closed responsive colors to top menubar buttons caused them to become pitch dark `#2B1D11` over the black bar when collapsed and invisible cream `#F7EAD0` over parchment when expanded. Unlike row 2 header controls, the titlebar is an omnipresent top window frame running across the entire width independent of the sidebar layout underneath.

### Solutions & Optimizations
- **Global Seamless Ivory Parchment Titlebar**: Pinned an ivory parchment background (`#F6EFE2` with gentle linear gradient) to `[data-testid="title-menu-bar"]` and its container with higher selector priority, eliminating the black bar and creating a smooth, unified frame across the entire window.
- **Consistent Iron-Gall Bronze Triggers**: Menubar triggers (`Antigravity`, `File`, `View`, `Window`) now consistently use deep iron-gall bronze (`#2B1D11`) in all states, decoupled from sidebar toggles, ensuring sharp contrast and zero regression cycles.
- **Floating Obsidian Grimoire Dropdown Menu**: Preserved the dark obsidian floating card with gold filigree border and crystal-clear options contrast when menus are clicked.

---

## [1.0.1] - 2026-10-22

### Problems Encountered
- **Black-on-Black Title Menubar & Dropdown Popup Clashes**: Clicking any of the top 4 window menu buttons (`Antigravity`, `File`, `View`, `Window`) rendered the active button into an illegible dark block, while the floating dropdown popup menu rendered near-invisible black text against a dark obsidian background (`#1A1108` text on `#18120D` container). This occurred because a legacy broad button rule scoped under `[data-testid="title-menu-bar"]` inadvertently flattened both the top trigger buttons and the child popup options.

### Solutions & Optimizations
- **Physical Decoupling of Menu Triggers & Popup Options**: Reconstructed selector hierarchy by isolating `button[data-testid="title-menu-bar-item"]` (top triggers) from `button[data-testid="title-menu-bar-option"]` (popup menu options).
- **Floating Grimoire Popup Card**: Transformed the dropdown container (`.absolute`) into an antique obsidian grimoire card with dark wood gradient (`#221A13` to `#17110C`), luminous gold filigree border (`rgba(212, 175, 55, 0.45)`), parchment white text (`#F5E8D0`), amber shortcut labels (`rgba(226, 190, 102, 0.85)`), and golden hover halos.

---

## [1.0.0] - 2026-10-22

### Features
- **Official Open Source Release**: The initial stable public release of the Medieval Arcane Theme for Google Antigravity.
- **Full Fantasy Visual Overhaul**:
  - Warm aged alabaster parchment manuscript body with high-resolution texture.
  - Three.js GPU-accelerated arcane stardust particle atmosphere.
  - High-precision dual-rotating alchemical circle watermark powered by native SVG SMIL animations.
  - Classical serif typography (`Cinzel`, `Cinzel Decorative`, `EB Garamond`) coupled with legible monospace code fonts (`Sarasa Mono Slab SC`).
  - Seamless dark obsidian wood sidebar with gilded brass accents.
  - Background Node.js silent daemon with auto-healing and Windows service bridge.

---

## Pre-Release Milestones & Incubation History (v0.1.0 - v0.13.0)

Before the official 1.0.0 release, the theme went through 13 iterative development and prototyping sprints:

- **[0.13.0] - 2026-10-22**: Native SVG SMIL dual-rotation alchemy circle and hover action-bar whitelisting.
- **[0.12.0] - 2026-10-21**: Silent WMI process spawner, automated Windows startup installer, and factory-reset uninstaller.
- **[0.11.0] - 2026-10-21**: Sarasa Mono Slab SC monospace font integration for code editors and terminal sessions.
- **[0.10.0] - 2026-10-21**: Classical typography matrix (`Cinzel`, `Cinzel Decorative`, `EB Garamond`).
- **[0.9.0] - 2026-10-21**: Dynamic watermark scaling and viewport aspect ratio clamping.
- **[0.8.0] - 2026-10-21**: Three.js WebGL stardust particle layer with mouse interaction and gold bokeh.
- **[0.7.0] - 2026-10-21**: Custom alchemical flask and wax seal scrollbar thumb replacements.
- **[0.6.0] - 2026-10-20**: High-DPI parchment texture optimization and responsive background scaling.
- **[0.5.0] - 2026-10-20**: Custom input box styling and antique quill send button glow.
- **[0.4.0] - 2026-10-20**: Golden corner flourishes and grimoire card borders.
- **[0.3.0] - 2026-10-19**: Chat message bubble isolation and parchment scroll styling.
- **[0.2.0] - 2026-10-19**: Dark obsidian wood sidebar contrast tuning and brass navigation buttons.
- **[0.1.0] - 2026-10-18**: Proof of concept: Chrome DevTools Protocol runtime injection into Antigravity.

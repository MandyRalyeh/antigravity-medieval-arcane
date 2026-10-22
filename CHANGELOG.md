# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html).

<p align="center">
  <b>English</b> · <a href="CHANGELOG.zh-CN.md">简体中文</a>
</p>

---

## [1.0.3] - 2026-10-22

### Problem Identified
- **Native Titlebar Overlay Contrast Failure**: In Windows Light Mode, the top-right native system control buttons (minimize, maximize, close) appeared as an eye-straining white square. Switching Windows to Dark Mode caused Antigravity's internal logic to color the overlay background solid black, rendering dark icons completely invisible against the black box.
- **Decompilation Root Cause**: Reverse engineering revealed Antigravity's internal titlebar binding:
  ```javascript
  q = getComputedStyle(document.documentElement).getPropertyValue("--sidebar");
  r = getComputedStyle(document.documentElement).getPropertyValue("--foreground");
  
  window.electronNative.setTitleBarOverlay({
    color: q || (n === "dark" ? "#131313" : "#FFFFFF"),
    symbolColor: r || (n === "dark" ? "#FAFAFA" : "#000000")
  });
  ```
  Antigravity directly reads `--sidebar` on `:root`. Because our theme initially defined `--sidebar` as dark grimoire wood (`#18120D`), Antigravity injected that dark color into the native overlay in dark mode, creating invisible black-on-black buttons.

### Solution & Optimization
- **Root Variable Redirection**: Redirected root `--sidebar` to warm ivory parchment (`#F6EFE2`), ensuring Antigravity's evaluation always produces ivory parchment, while the physical sidebar element independently retains dark wood texturing.
- **Direct Native API Hooking**: Directly hooked `window.electronNative.setTitleBarOverlay` inside the injection engine:
  - Background color: warm ivory parchment (`#F6EFE2`), seamlessly integrating with the 35px menubar;
  - Symbol icon color: deep iron-gall bronze ink (`#2B1D11`), guaranteeing crisp visibility;
  - Geometric height: strictly aligned to 35px;
  - Continuously synchronized across window focus, resize, and sidebar toggle events.

---

## [1.0.2] - 2026-10-22

### Problem Identified
- **Top 35px Menubar Black Bar & Three-Tier Hard Edge**: Setting the menubar container to transparent caused inherited sidebar CSS rules to bleed through, painting a 35px solid black strip across the entire top of the window with inverted white buttons over a light parchment workspace.
- **Sidebar Dual-State Conflict on Menubar**: Applying sidebar expand/collapse rules to the top menubar caused cyclical contrast failure: top buttons were unreadable against the black bar when collapsed, and unreadable against light parchment when expanded.

### Solution & Optimization
- **Unified Ivory Parchment Menubar**: Applied an ivory parchment gradient directly to the top menubar container, eliminating the black strip and merging top controls seamlessly into the main parchment canvas.
- **Permanent Iron-Gall Ink for Menubar Buttons**: Locked the four core menubar buttons (Antigravity, File, View, Window) to deep iron-gall bronze ink, decoupling them from sidebar expansion state.
- **Independent Floating Dark Grimoire Menus**: Maintained floating dropdown menus as dark grimoire parchment cards with deep wood gradients, golden borders, and ivory typography.

---

## [1.0.1] - 2026-10-22

### Problem Identified
- **Menubar Triggers & Dropdown Menus Contrast Bleed**: Clicking menubar items turned trigger buttons solid black; simultaneously, dropdown menus inherited global button styles, producing unreadable black text on dark grimoire wood backgrounds.

### Solution & Optimization
- **Selector Decoupling**: Physically isolated menubar trigger button styles from floating dropdown menu item selectors.
- **Refined Grimoire Dropdown Cards**: Restructured dropdown popups into dark parchment cards with golden borders, ivory item text, and subtle golden hover glows.

---

## [1.0.0] - 2026-10-22

### Core Features
- **Initial Open Source Release**: The Medieval Arcane theme and runtime interface patch for Google Antigravity officially released to GitHub.
- **Full Fantasy Visual System**:
  - High-resolution warm parchment workspace texture;
  - Three.js WebGL 3D hardware-accelerated golden stardust particle engine with cursor repulsion field;
  - Native SVG SMIL dual counter-rotating arcane circle watermark;
  - Classical serif and Sarasa Gothic monospace typography matrix;
  - Dark grimoire obsidian wood sidebar with antique brass trims;
  - Lightweight local daemon for non-invasive hot injection via Chrome DevTools Protocol.

---

## Incubation & Engineering History (27-Round Overnight Sprint)

Prior to open-sourcing, this theme underwent an extensive overnight engineering sprint (**2026-10-21 21:06 to 2026-10-22 02:09**) spanning over 3,000 internal steps and 27 iterative real-world interaction rounds:

### Phase 1: Cyberpunk Exploration & Aesthetic Pivot (Rounds 4 ~ 5)
- **Discarding Cyberpunk**: An initial neon cyberpunk theme was tested and abandoned due to severe visual fatigue and aesthetic dissonance with deep code work;
- **Establishing Medieval Arcane**: Defined core requirements: **reject superficial CSS restyling; leverage modern WebGL pipelines (Three.js) and high-grade assets** to create an elegant, focused grimoire workspace.

### Phase 2: Eliminating "Archaic Heaviness" & Scattered Widget Architecture (Rounds 6 ~ 11)
- **Typography Calibration**: Solved blue font tinting, establishing high-contrast iron-gall bronze ink (`#2B1D11`);
- **Balanced Composition**: Balanced the solitary left-aligned magic ring by introducing the Prague astronomical astrolabe and zodiac dial on the right;
- **Replacing Flat SVG Assets**: Removed crude 2D alchemy phials, replacing them with WebGL 3D living candelabra and rising ember particles;
- **Fixing Collision Avoidance Over-Detection**: Fixed a bug where wide composer cards triggered false-positive collisions that hid all decorative widgets, replacing it with a 2D bounding-box intersection algorithm;
- **Aesthetic Refinement (Rejecting Archaic Clutter)**: Rejected early generated dragons and crystal balls as overly dated. Directed the aesthetic toward **Western fantasy elegance infused with Japanese anime-level precision**, prioritizing **scattered micro-widgets over bulky monolithic illustrations**.

### Phase 3: System Crash Remediation & Scope Isolation (Rounds 12 ~ 15)
- **Critical Settings White-Screen Crash**: Solved a fatal bug where clicking "Settings" collapsed the React DOM tree due to `localStorage.getItem("theme-preset-light")` dictionary mismatches. Implemented **absolute scope isolation**, locking native presets to `"Default Light"`;
- **Layout Cleansing**: Eliminated odd light slice artifacts, oversized card frames, and white border anomalies while restoring missing message bubble typography.

### Phase 4: Action Bar Restoration & Dual-State Perception Engine (Rounds 16 ~ 19)
- **Restoring Hover Action Bars**: Fixed a layout regression that concealed user message hover action buttons (Revert/Undo, Edit, Copy); restored arcane circle rotation;
- **Color Refinement**: Shifted drab olive tones to vibrant, modern ivory gold;
- **Overcoming the Sidebar `aria-expanded` Deadlock**: Discovered that Antigravity permanently hardcodes `aria-expanded="false"`. Engineered a `MutationObserver` to monitor root inline `--sidebar-width`, dynamically toggling `[data-sidebar-state="open"]` and `[data-sidebar-state="collapsed"]` to decouple top navigation styling.

### Phase 5: Markdown Stress Testing & Privacy Sanitization (Rounds 20 ~ 23)
- **Full Markdown Verification**: Conducted exhaustive visual validation across GitHub-style alerts, multi-column tables, blockquotes, KaTeX formulas, and Mermaid diagrams;
- **Strict Privacy De-Identification**: Scrubbed personal codebases, system paths, and user prompts, producing clean, production-grade showcase screenshots;
- **Clean Injection Verification**: Verified zero disk file overwrites, zero database tampering, and instant factory rollback via the clean uninstall script.

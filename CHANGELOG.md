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

## [0.9.0] - 2026-10-22

### Problem Identified
- **Contrast Bleed Across Complex Markdown Elements**: Complex rendered elements interfered with the underlying parchment texture and vector watermark. In particular, standard callout blocks lacked contrast, Mermaid diagram typography was soft, and multi-line KaTeX formulas overlapped with background geometry.
- **Privacy Exposure Risk Prior to Open Sourcing**: Showcase screenshots captured during development contained local workspace filepaths, unreleased code snippets, and conversational traces, creating de-anonymization risks.

### Solution & Optimization
- **Standardized Mineral Alert Callouts**: Engineered five distinct callout themes—Lapis Lazuli (NOTE), Malachite (TIP), Amethyst (IMPORTANT), Amber (WARNING), and Cinnabar (CAUTION)—each backed by anti-bleed translucent parchment cards;
- **Anti-Bleed Backing Plates for Diagrams & KaTeX**: Isolated Mermaid flowcharts, sequence diagrams, and mathematical expressions with dedicated soft-glow plates;
- **Full Privacy De-Identification**: Scrubbed all local machine paths and proprietary conversational data, regenerating clean, production-grade showcase assets (`docs/images/`).

---

## [0.8.0] - 2026-10-22

### Problem Identified
- **Sidebar Expand/Collapse Cyclical Deadlock**: Top navigation buttons (quill logo, sidebar toggle, search, back/forward) were sharp when collapsed, but turned solid black when expanded. Tuning expanded styles caused them to blend into the parchment background when collapsed.
- **Hardcoded `aria-expanded` Attribute**: Inspection revealed Antigravity permanently hardcodes `aria-expanded="false"` on the toggle button, preventing external styles from reading state.
- **Accidental Suppression of Message Hover Action Bars**: Card restyling inadvertently concealed the hover action bar (Revert, Edit, Copy) on user message bubbles, and interrupted vector watermark rotation.

### Solution & Optimization
- **Inline Width Perception Engine**: Discovered that `--sidebar-width` on the root inline style is the only true indicator of sidebar state (`>0px` when open, `0px` when closed). Implemented a lightweight `MutationObserver` to dispatch `[data-sidebar-state="open"]` and `[data-sidebar-state="collapsed"]` attributes to `:root`, cleanly decoupling color palettes;
- **Restored Action Bars & Watermark Rotation**: Reconstructed `z-index` layering on message cards to restore hover action buttons, and fixed event handlers driving continuous SVG watermark rotation.

---

## [0.7.0] - 2026-10-22

### Problem Identified
- **Overly Drab Ochre Palette**: Early parchment tones leaned toward a heavy, dark olive-yellow, causing eye strain and feeling visual heavy during extended reading.
- **Sidebar Hover Glow Artifacts & Layer Overlap**: Hovering over sidebar session items produced an uncalibrated white glare strip on the right edge, while the left alchemy circle overlapped task titles.

### Solution & Optimization
- **Modern Ivory Gold Parchment Architecture**: Upgraded workspace tones to an airy ivory gold (`#FAF4E8` / `#F6EFE2`), uniting antique manuscript warmth with modern clarity;
- **Eliminated Glare & Enforced Z-Index Isolation**: Overhauled `:hover` states on sidebar items to remove harsh white glares; pinned vector watermarks to `z-index: 0` with `pointer-events: none` to guarantee absolute text priority.

---

## [0.6.0] - 2026-10-22

### Problem Identified
- **Light Slice Artifacts & Frame Distortions**: Early attempts to scatter decorative micro-widgets across the UI resulted in CSS selector leakage that generated unnatural rectangular light slices and distorted message borders.
- **Disappearing Message Bubbles and Typography**: Broad style rules inadvertently overridden the core conversation stream container, stripping message bubble frames and turning fonts invisible.

### Solution & Optimization
- **Style Cleansing & Precise Selector Scoping**: Stripped leaky decorative classes and confined micro-widgets strictly to safe window perimeters;
- **Container Inheritance Restoration**: Re-anchored primary message bubble selectors with iron-gall bronze typography declarations and dual-layer subtle parchment cards.

---

## [0.5.0] - 2026-10-22

### Problem Identified
- **Fatal White-Screen Crash on Settings Panel**: Clicking "Settings" inside Antigravity immediately caused a total white-screen freeze, crashing the entire UI and requiring force-killing the process.
- **Root Cause Decompilation**: Decompiling client bundle code revealed that opening Settings triggers a hardcoded lookup: `localStorage.getItem("theme-preset-light")` against Antigravity's internal theme dictionary. When a custom theme name was stored in this key, the dictionary query failed, throwing an unhandled `TypeError: Cannot read properties of undefined` that completely collapsed the React root tree.

### Solution & Optimization
- **Absolute Scope Isolation**: Pinned the native preset key permanently to `"Default Light"` while isolating all custom colors, textures, and particle hooks into a private scope;
- **Zero-Crash Resilience**: Ensured the native Settings modal opens, toggles, and closes without interference, completely eliminating white-screen crashes.

---

## [0.4.0] - 2026-10-22

### Problem Identified
- **Archaic Clutter and "Dated Fantasy" Aesthetics**: Early AI-generated assets (bulky dragons, crystal balls) felt heavy, dated, and ecclesiastical.
- **Monolithic Graphics Obstructing Code**: Large, single-piece illustrations occupied valuable screen real estate, creating distractions during deep programming sessions.

### Solution & Optimization
- **Western Fantasy Meets Japanese Aesthetic Precision**: Replaced archaic motifs with an elegant, airy aesthetic balancing Western fantasy lore with refined Japanese anime-level delicacy;
- **Scattered Micro-Widget Architecture**: Replaced monolithic graphics with lightweight, scattered micro-watermarks positioned along margins, preserving code readability.

---

## [0.3.0] - 2026-10-22

### Problem Identified
- **Collision Avoidance False Positives**: An early collision algorithm evaluated wide composer cards against window width, falsely detecting collisions in most viewports and hiding all decorative elements.
- **Unbalanced Right-Side Canvas**: The left-aligned magic ring left the right half of the window feeling empty in maximized viewports.

### Solution & Optimization
- **2D Bounding-Box Intersection Algorithm**: Rebuilt collision detection using strict 2D rectangular overlap tests (`!(compRect.right < deskBox.left || compRect.left > deskBox.right ...)`), hiding corner items only when physically obstructed;
- **Prague Astrolabe & Zodiac Dial Integration**: Placed the Prague astronomical clock and zodiac dial in the upper-right sky to establish a balanced celestial composition.

---

## [0.2.0] - 2026-10-22

### Problem Identified
- **Flat 2D SVG Phials Lacking Tactility**: Early flat vector alchemy bottles felt artificial and lacked depth, clipping awkwardly during window resizes.
- **Font Blue-Cast & Visual Glare**: Early typography produced an unnatural blue tint against warm parchment, causing eye strain and soft edges.

### Solution & Optimization
- **WebGL 3D Living Candelabra**: Replaced flat SVG bottles with hardware-accelerated 3D brass candelabra featuring breathing amber flames and rising embers;
- **High-Contrast Iron-Gall Bronze Ink**: Calibrated font colors into deep iron-gall bronze ink (`#2B1D11`), achieving razor-sharp readability.

---

## [0.1.0] - 2026-10-22

### Problem Identified
- **Closed-Source Architecture & Auto-Update Overwrite**: Google Antigravity is a closed-source client without a theme marketplace; unpacking `.asar` bundles breaks code signatures and is wiped out by client updates.
- **Failure of Cyberpunk Neon Prototype**: Early trials with high-contrast cyberpunk themes resulted in severe visual fatigue during extended code sessions.

### Solution & Optimization
- **Medieval Arcane Parchment Direction Established**: Committed to developing an illuminated manuscript and golden arcane stardust theme for deep focus;
- **Chrome DevTools Protocol Hot-Injection Architecture**: Built a lightweight local daemon communicating over loopback CDP ports to inject styles and WebGL canvases without modifying client binaries, ensuring 100% clean factory rollback.

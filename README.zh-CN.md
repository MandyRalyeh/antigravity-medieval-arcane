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
  <a href="README.md">English</a> · <b>简体中文</b>
</p>

这是我平时使用 Google Antigravity 时自己写的一个羊皮纸风格主题和界面补丁，主要用于改善长时间面对默认冷灰界面时的眼部疲劳，并修复客户端在主题适配上的一些原生 Bug。详细演进历史请查阅 [CHANGELOG.zh-CN.md](CHANGELOG.zh-CN.md)。

---

## 功能特性

- **羊皮纸底色与深色侧边栏**：主工作区采用暖色羊皮纸底纹，文字使用深褐色铁胆墨水色（`#2B1D11`），侧边栏采用深木色，长时间看代码比较柔和。
- **Three.js 悬浮金尘微粒**：底层开辟独立 WebGL 画布渲染微小的漂浮粒子，带有微距鼠标避让效果，不会遮挡文字。
- **矢量旋转法阵**：左侧与右上角带有顺逆时针旋转的 SVG 水印，固定在底层不影响文本选择。
- **侧边栏状态自适应**：在展开与折叠侧边栏时自动切换顶部按键颜色，保证两种状态下都能看清。
- **右上角三键明暗色块适配**：接管 Windows 原生窗口控制按键，解决系统在深色或浅色模式下右上角出现突兀黑块或白块的问题。
- **设置面板防白屏**：隔离自定义主题命名空间，避免打开客户端设置时因找不到官方内置预设而崩溃白屏。
- **恢复气泡悬浮操作栏**：保留鼠标悬停在消息卡片上的撤回、编辑、复制等原有操作按钮。

---

## 视觉效果与 Markdown 排版展示

### 1. 侧边栏展开与工作区
展开侧边栏时，顶部图标自动切为浅金色，保持正常可读：
<p align="center">
  <img src="docs/images/05_sidebar_open_showcase.png" alt="侧边栏展开效果" width="850" />
</p>

### 2. 警示卡片与表格
适配了五种标准警示卡片（NOTE、TIP、IMPORTANT、WARNING、CAUTION）与表格底纹：
<p align="center">
  <img src="docs/images/02_alerts_and_tables.png" alt="警示卡片与数据表格" width="850" />
</p>

### 3. 代码块展示
调谐了主流语言语法高亮，适配更纱黑体与 Fira Code 等等宽字体：
<p align="center">
  <img src="docs/images/03_code_and_mermaid.png" alt="代码块展示" width="850" />
</p>

### 4. 图表与公式
Mermaid 图表与 KaTeX 数学公式配有防穿透衬底，不与背景图重叠：
<p align="center">
  <img src="docs/images/04_mermaid_and_math.png" alt="图表与公式展示" width="850" />
</p>

---

## 技术细节与实现原理

在修改 Antigravity 界面的过程中，主要解决过以下几个技术问题：

### 1. 为什么打开设置面板（Settings）会白屏卡死？
- **问题**：Antigravity 打开设置弹窗时，内部代码硬编码执行 `localStorage.getItem("theme-preset-light")` 去查官方内置主题字典。如果写入了自定义主题名，字典查不到就会报 `TypeError: Cannot read properties of undefined`，导致整层 React 渲染树崩溃白屏。
- **解决**：把官方的内置预设配置项固定维持为默认值（`"Default Light"`），所有自定义颜色和样式放到独立的 CSS 变量和作用域里管理，互不干扰。

### 2. 为什么侧边栏展开和折叠时按钮容易看不清？
- **问题**：官方折叠按钮上的 `aria-expanded` 属性被写死为了 `false`，不管侧边栏开没开都不会变；同时顶部几个按钮在 DOM 结构上脱离了侧边栏，普通 CSS 伪类拿不到状态，导致收起看得清展开就变黑块，展开看清了收起又隐形。
- **解决**：监听根节点上的内联样式 `--sidebar-width`（展开时大于 0，折叠时为 0px），通过 MutationObserver 动态给根节点打上状态类（`[data-sidebar-state="open"]` / `[data-sidebar-state="collapsed"]`），把展开和折叠两套样式解耦。

### 3. 为什么窗口右上角的最小化/最大化/关闭按键会有白块或黑块？
- **问题**：客户端底层有一段代码：
  ```javascript
  q = getComputedStyle(document.documentElement).getPropertyValue("--sidebar");
  r = getComputedStyle(document.documentElement).getPropertyValue("--foreground");
  
  window.electronNative.setTitleBarOverlay({
    color: q || (n === "dark" ? "#131313" : "#FFFFFF"),
    symbolColor: r || (n === "dark" ? "#FAFAFA" : "#000000")
  });
  ```
  它直接去读根节点上的 `--sidebar`。如果主题把 `--sidebar` 设成了深色，到了系统深色模式下，三键背景就会被染成黑色，而按键图标又是暗色，直接黑底黑字看不清；浅色模式下又会回退成纯白方块。
- **解决**：把根节点上的 `--sidebar` 设为羊皮纸暖金色（`#F6EFE2`），真实侧边栏容器内部独立保持深色；同时在脚本里直接调用 `window.electronNative.setTitleBarOverlay` 锁定颜色，与顶部 35px 菜单栏对齐。

---

## 安全与隔离机制

1. **不修改客户端原文件**：基于 Chrome 开发者工具协议在内存中挂载样式，不碰客户端的二进制执行文件和 `.asar` 资源包，客户端更新不受影响。
2. **不触碰用户数据**：不读取、不修改本地的数据库、会话记录和文件。
3. **支持一键还原**：随时运行卸载脚本即可退出后台守护并清理启动项，客户端恢复默认外观。

---

## 安装与使用

### 环境要求
- Windows 10 / 11 或 macOS
- Node.js 18+
- 运行中的 Google Antigravity 客户端

### 方式 A：Windows 一键安装（推荐）

1. 克隆仓库：
   ```powershell
   git clone https://github.com/MandyRalyeh/antigravity-medieval-arcane.git
   cd antigravity-medieval-arcane
   ```

2. 运行安装脚本：
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts\install-windows.ps1
   ```
   脚本会启动后台守护进程并在开机启动项创建快捷方式。

### 方式 B：前台运行 / 调试

```bash
node src/daemon.js
```

---

## 卸载

运行卸载脚本：
```powershell
powershell -ExecutionPolicy Bypass -File scripts\uninstall-windows.ps1
```
脚本会停止守护进程、移除启动项快捷方式并撤销注入。

---

## 仓库结构

```text
antigravity-medieval-arcane/
├── docs/images/            # 界面展示截图
├── src/
│   ├── daemon.js           # 本地守护监听进程
│   ├── inject.js           # 运行时注入脚本（WebGL粒子 + 矢量动效 + 双状态引擎）
│   └── theme.css           # 样式表与配色变量
├── scripts/
│   ├── install-windows.ps1 # Windows 安装脚本
│   ├── run-daemon.ps1      # 守护进程启动脚本
│   ├── start-daemon.vbs    # 静默启动脚本
│   └── uninstall-windows.ps1 # 卸载脚本
├── assets/                 # 矢量法阵与羊皮纸材质
├── CHANGELOG.md            # 英文更新日志
├── CHANGELOG.zh-CN.md      # 中文更新日志
├── LICENSE                 # MIT 许可证
├── package.json            # 项目配置
├── README.md               # 英文说明
└── README.zh-CN.md         # 中文说明
```

---

## 许可证

本项目基于 [MIT License](LICENSE) 开源。

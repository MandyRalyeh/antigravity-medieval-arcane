# Antigravity Medieval Arcane

<p align="center">
  <img src="docs/images/01_hero_typography.png" alt="Antigravity Medieval Arcane Hero" width="900" style="border-radius: 8px; box-shadow: 0 8px 30px rgba(0,0,0,0.15);" />
</p>

<p align="center">
  <a href="https://github.com/MandyWednesday/antigravity-medieval-arcane/releases"><img src="https://img.shields.io/badge/version-14.0.0-gold.svg?style=flat-square" alt="Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"></a>
  <img src="https://img.shields.io/badge/platform-Windows%20%7C%20macOS-informational.svg?style=flat-square" alt="Platform">
  <img src="https://img.shields.io/badge/style-Medieval%20Arcane%20Parchment-amber.svg?style=flat-square" alt="Theme Style">
  <img src="https://img.shields.io/badge/engine-Three.js%20WebGL%20%2B%20SMIL-darkgoldenrod.svg?style=flat-square" alt="Engine">
</p>

> **面向 Google Antigravity 客户端的中世纪奥术魔导书（Medieval Arcane）全套沉浸式主题与界面补丁**  
> *基于 Chrome DevTools Protocol 运行时非侵入热注入 · 不改原包 · 不重打 asar · 零破坏自动更新 · 随时一键无损撤销*

---

## 这是什么

这是我结对使用 Antigravity 开发的一套个人自用的 Antigravity 界面补丁与沉浸式中世纪奥术主题（Medieval Arcane）。

如果你和我一样每天长时间在 Google Antigravity 里面写代码、推演系统架构，原生的冷灰色工业界面看久了眼睛很容易产生视觉疲劳。而我更喜欢那种古典手抄本、羊皮纸书卷以及微弱金色魔导星尘带来的专注与平静感。

于是我为 Antigravity 打造了这套从色彩、字体、微粒动效到交互逻辑完全打磨的主题系统：

- 📜 **微光古典羊皮纸主区**：告别刺眼白屏与冰冷工程灰，主工作区覆以无缝高保真暖色羊皮纸底纹，文字呈现高对比铁胆铜墨（Iron Gall Ink）深褐色，边缘锐利不发虚；
- 📖 **黑曜石木质魔导书侧边栏**：左侧侧边栏采用沉稳深色古籍装帧质感，配合中世纪火漆封印徽章与金色文字，实现自然舒适的空间视觉分层；
- ✨ **Three.js WebGL 悬浮金色星尘**：底层独立开辟硬件加速 Canvas，以恒定 60 FPS 渲染微小的漂浮金尘粒子，带有微距鼠标斥力场，极具魔导沉浸感且绝不干扰代码判读；
- 🛡️ **原生 SVG SMIL 双向旋转炼金法阵**：左侧与右上方点缀古秘术矢量水印法阵，由浏览器底层微内核驱动顺逆平滑公转，层级固定在底纹层，不干扰任何文本选择；
- ⚡ **双状态侧边栏响应式感应引擎**：完美攻克 Antigravity 官方在侧边栏开关时硬编码 `aria-expanded="false"` 的属性假死 Bug，通过感知根节点内联变量 `--sidebar-width` 动态派发状态，展开态金字醒目、折叠态铜墨分明；
- 🔧 **气泡操作栏与官方 Bug 修复**：完美恢复鼠标悬浮在提问卡片上的撤回编辑（Revert）与复制（Copy）功能栏，并防御性阻断 Antigravity 设置面板白屏死锁隐患。

---

## 视觉效果一览 (Showcase)

### 1. 展开态深色魔导书侧边栏 vs 浅色羊皮纸工作区
在打开侧边栏时，顶部羽毛图标、折叠键、搜索与前进后退自动切为明亮羊皮纸奶油金（`#F7EAD0`），高对比度一目了然：
<p align="center">
  <img src="docs/images/05_sidebar_open_showcase.png" alt="Sidebar Open Showcase" width="850" />
</p>

### 2. 标准五大 Alert 警示卡片与复杂表格
为 GitHub 规范的 NOTE / TIP / IMPORTANT / WARNING / CAUTION 重新调配了手抄本矿物色系，折叠引用与数据表格均有专属柔光衬底：
<p align="center">
  <img src="docs/images/02_alerts_and_tables.png" alt="Alerts and Tables" width="850" />
</p>

### 3. 多语言高亮代码块与等宽排版
Python、TypeScript、PowerShell、JSON 代码块深度调谐语法高亮，行高与字距针对长时间沉浸编程做了微调：
<p align="center">
  <img src="docs/images/03_code_and_mermaid.png" alt="Code Blocks Showcase" width="850" />
</p>

### 4. Mermaid 矢量图表与 LaTeX 科学公式
流程图、时序图、状态图与 KaTeX 高斯积分、矩阵方程无缝融合，背景带有防穿透半透光卡片：
<p align="center">
  <img src="docs/images/04_mermaid_and_math.png" alt="Mermaid and Math" width="850" />
</p>

---

## 为什么常规插件做法行不通？（技术底层剖析）

在开发这套主题的过程中，遇到了三个常规手段根本无法解决的死穴：

### 1. 客户端原包签名与更新保护
Google Antigravity 是基于 Electron 构建的闭源现代客户端，不提供官方主题市场。如果通过解包修改 `app.asar` 或修改核心二进制：
- 会直接破坏应用签名，甚至引发操作系统的安全拦截；
- 只要客户端一升级，所有的本地修改会被彻底覆盖抹去。

**解决策略**：基于 **Chrome DevTools Protocol (CDP)**。Antigravity 在运行时会在本地暴露调试接口（`%APPDATA%\Antigravity\DevToolsActivePort`）。我们编写的轻量 Node.js 守护进程只连接 `127.0.0.1` 本地回环，通过 WebSocket 动态完成样式与动效的热挂载，**原生二进制分毫未动**。

### 2. Antigravity 官方 `aria-expanded` 属性假死 Bug
当你在客户端开关侧边栏时，你可能会直觉地尝试使用 `button[aria-expanded="false"]` 或 `button[aria-expanded="true"]` 来切换顶部按钮的颜色。但排查 DOM 会发现一个大坑：
- Antigravity 前端把该按钮的 `aria-expanded` **硬编码写死为了 `"false"`**，无论侧边栏怎么开合，该属性纹丝不动！
- 顶部按钮在 DOM 中脱离了 `.bg-sidebar`，导致只要改了展开态，折叠态就看不清；改了折叠态，展开态又变黑。

**解决策略**：我找到了 Antigravity 切换状态时底层唯一真实改变的变量——根节点上的内联 CSS 变量 `--sidebar-width`（展开时 `256px`，折叠时 `0px`）。守护脚本注入 MutationObserver 毫秒级感知该变量，动态向 `<html>` 打上 `data-sidebar-state="open"` 与 `closed` 标记，彻底把两套配色样式分流解耦。

### 3. 设置面板白屏死锁 (TanStack Router Crash)
如果将自定义主题名称直接写入 LocalStorage（例如 `localStorage.setItem('theme-preset-light', 'medieval-arcane')`），Antigravity 内部的路由在打开设置面板时因找不到该官方模板而抛出异常，导致设置窗口白屏且永远无法关闭。

**解决策略**：注入逻辑严格将原生 `theme-preset-light` 维持在官方合法的 `"Default Light"`，将所有自定义色彩、材质与动效剥离至全新的 `data-ag-preset` 命名空间下独立托管，确保原生设置弹窗 100% 稳定可用。

---

## 快速安装与使用

### 环境要求
- Windows 10 / 11 或 macOS
- Node.js 18+ (推荐 Node.js 20 LTS)
- 已安装并正在运行的 Google Antigravity 客户端

### 方式 A：Windows 一键快速安装（推荐）

1. 克隆本仓库到本地目录：
   ```powershell
   git clone https://github.com/MandyWednesday/antigravity-medieval-arcane.git
   cd antigravity-medieval-arcane
   ```

2. 运行一键后台安装脚本：
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts\install-windows.ps1
   ```
   - 脚本会自动创建无黑窗后台守护进程；
   - 自动在 Windows 开机启动项建立静默自启快捷方式；
   - 启动 Antigravity 即可看到完整的羊皮纸与星尘粒子效果。

### 方式 B：前台命令行运行 / 调试模式

如果你希望直接在控制台查看 CDP 连接日志：
```powershell
node src\daemon.js
```

---

## 一键无损卸载 (100% 回退出厂状态)

如果你想还原回 Antigravity 原厂默认外观，无需担心任何系统残留：

运行卸载脚本：
```powershell
powershell -ExecutionPolicy Bypass -File scripts\uninstall-windows.ps1
```
脚本会：
1. 优雅停止后台守护进程并清理 PID 锁；
2. 移除开机自启快捷方式；
3. 通过 CDP 派发清理脚本，移除注入的 WebGL Canvas、SVG 节点与样式表，恢复原生 Default Light 外观。

---

## 仓库结构

```text
antigravity-medieval-arcane/
├── docs/images/            # 干净脱敏的实机效果展示图
├── src/
│   ├── daemon.js           # CDP 本地守护监听进程
│   ├── inject.js           # 核心运行时注入脚本（Three.js + SMIL + 双状态引擎）
│   └── theme.css           # 独立样式表与配色变量定义
├── scripts/
│   ├── install-windows.ps1 # Windows 一键静默安装与开机自启配置
│   ├── run-daemon.ps1      # 守护进程启动包装器
│   ├── start-daemon.vbs    # VBScript 隐藏黑窗启动脚本
│   └── uninstall-windows.ps1 # 一键完全卸载与出厂还原
├── assets/                 # 矢量纹章、法阵与 WebP 羊皮纸材质
├── CHANGELOG.md            # 严格按照 SemVer 梳理的 14 个版本演进深度记录
├── LICENSE                 # MIT 开源协议
└── README.md
```

---

## 许可证

本项目基于 [MIT License](LICENSE) 开源。欢迎 Star、Fork 或提交 Issue 一同探讨美化！

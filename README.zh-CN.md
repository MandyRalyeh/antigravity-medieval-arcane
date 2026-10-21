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

<p align="center">
  <a href="README.md">English</a> · <b>简体中文</b>
</p>

> **面向 Google Antigravity 客户端的中世纪奥术魔导书全套沉浸式主题与界面补丁**  
> *基于 Chrome 开发者工具协议运行时非侵入热注入 · 不改客户端原包 · 不重打安装包 · 零破坏自动更新 · 随时一键无损撤销*

---

## 这是什么

这是我结对使用 Antigravity 开发的一套个人自用的 Antigravity 界面补丁与沉浸式中世纪奥术魔导书主题。

如果你和我一样每天长时间在 Google Antigravity 里面写代码、推演系统架构，原生的冷灰色工业界面看久了眼睛很容易产生视觉疲劳。而我更喜欢那种古典手抄本、羊皮纸书卷以及微弱金色魔导星尘带来的专注与平静感。

于是我为 Antigravity 打造了这套从色彩、字体、微粒动效到交互逻辑完全打磨的主题系统：

- 📜 **微光古典羊皮纸主区**：告别刺眼白屏与冰冷工程灰，主工作区覆以无缝高保真暖色羊皮纸底纹，文字呈现高对比铁胆铜墨深褐色，边缘锐利不发虚；
- 📖 **黑曜石木质魔导书侧边栏**：左侧侧边栏采用沉稳深色古籍装帧质感，配合中世纪火漆封印徽章与金色文字，实现自然舒适的空间视觉分层；
- ✨ **三维悬浮金色星尘**：底层独立开辟硬件加速画布，以恒定 60 帧渲染微小的漂浮金尘微粒，带有微距鼠标斥力场，极具魔导沉浸感且绝不干扰代码判读；
- 🛡️ **原生矢量双向旋转炼金法阵**：左侧与右上方点缀古秘术矢量水印法阵，由浏览器底层微内核驱动顺逆平滑公转，层级固定在底纹层，不干扰任何文本选择；
- ⚡ **双状态侧边栏响应式感应引擎**：攻克官方在侧边栏开关时无障碍展开属性永久写死的假死问题，通过感知根节点内联宽度变量动态派发状态，展开态金字醒目、折叠态铜墨分明；
- 🔧 **气泡操作栏与官方故障自愈**：恢复鼠标悬浮在提问卡片上的撤回编辑与复制功能栏，并防御性阻断设置面板白屏死锁隐患。

---

## 视觉效果一览

### 1. 展开态深色魔导书侧边栏与浅色羊皮纸工作区
在打开侧边栏时，顶部羽毛图标、折叠键、搜索与前进后退自动切为明亮羊皮纸奶油金（`#F7EAD0`），高对比度一目了然：
<p align="center">
  <img src="docs/images/05_sidebar_open_showcase.png" alt="侧边栏展开实机效果" width="850" />
</p>

### 2. 标准五大警示卡片与复杂表格
为手抄本风格重新调配了矿物色系警示卡片，折叠引用与数据表格均有专属柔光衬底：
<p align="center">
  <img src="docs/images/02_alerts_and_tables.png" alt="警示卡片与数据表格" width="850" />
</p>

### 3. 多语言高亮代码块与等宽排版
各主流语言代码块深度调谐语法高亮，行高与字距针对长时间沉浸编程做了微调：
<p align="center">
  <img src="docs/images/03_code_and_mermaid.png" alt="代码块展示" width="850" />
</p>

### 4. 矢量图表与科学公式
流程图、时序图、状态图与高斯积分、矩阵方程无缝融合，背景带有防穿透半透光卡片：
<p align="center">
  <img src="docs/images/04_mermaid_and_math.png" alt="图表与公式展示" width="850" />
</p>

---

## 为什么常规插件做法行不通？（技术底层剖析）

在开发这套主题的过程中，遇到了三个常规手段根本无法解决的死穴：

### 1. 客户端原包签名与更新保护
Google Antigravity 是基于桌面应用框架构建的闭源现代客户端，不提供官方主题市场。如果通过解包修改核心资源包：
- 会直接破坏应用签名，甚至引发操作系统的安全拦截；
- 只要客户端一升级，所有的本地修改会被彻底覆盖抹去。

**解决策略**：基于**浏览器调试协议**。Antigravity 在运行时会在本地暴露调试接口。我们编写的轻量守护进程只连接本地回环地址，通过通信管道动态完成样式与动效的热挂载，**原生二进制分毫未动**。

### 2. 官方折叠状态属性假死
当你在客户端开关侧边栏时，直觉上通常会尝试使用展开或收起选择器来切换顶部按钮的颜色。但排查底层结构会发现一个大坑：
- 官方前端把折叠按钮的展开属性**硬编码写死为了假值**，无论侧边栏怎么开合，该属性纹丝不动；
- 顶部按钮在结构中脱离了侧边栏主体，导致只要改了展开态，折叠态就看不清；改了折叠态，展开态又变黑。

**解决策略**：我找到了 Antigravity 切换状态时底层唯一真实改变的变量——根节点上的内联样式宽度变量（展开时为特定像素，折叠时为零）。守护脚本注入变化监听器毫秒级感知该变量，动态向根节点打上状态标记，彻底把两套配色样式分流解耦。

### 3. 设置面板白屏死锁
如果将自定义主题名称直接写入本地存储，内部路由在打开设置面板时因找不到该官方模板而抛出未捕获异常，导致设置窗口白屏且永远无法关闭。

**解决策略**：注入逻辑严格将原生预设维持在官方默认选项，将所有自定义色彩、材质与动效剥离至全新的独立命名空间下托管，确保原生设置弹窗百分之百稳定可用。

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

如果你希望直接在控制台查看连接日志：
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
1. 优雅停止后台守护进程并清理运行锁；
2. 移除开机自启快捷方式；
3. 通过调试协议派发清理脚本，移除注入的画布、矢量节点与样式表，恢复原生默认外观。

---

## 仓库结构

```text
antigravity-medieval-arcane/
├── docs/images/            # 干净脱敏的实机效果展示图
├── src/
│   ├── daemon.js           # 调试协议本地守护监听进程
│   ├── inject.js           # 核心运行时注入脚本（三维微粒 + 矢量动效 + 双状态引擎）
│   └── theme.css           # 独立样式表与配色变量定义
├── scripts/
│   ├── install-windows.ps1 # Windows 一键静默安装与开机自启配置
│   ├── run-daemon.ps1      # 守护进程启动包装器
│   ├── start-daemon.vbs    # 无窗口静默启动脚本
│   └── uninstall-windows.ps1 # 一键完全卸载与出厂还原
├── assets/                 # 矢量纹章、法阵与羊皮纸材质
├── CHANGELOG.md            # 英文更新日志
├── CHANGELOG.zh-CN.md      # 纯中文更新日志
├── LICENSE                 # 开源协议
├── README.md               # 英文主文档
└── README.zh-CN.md         # 纯中文主文档
```

---

## 许可证

本项目基于 [MIT License](LICENSE) 开源。欢迎 Star、Fork 或提交 Issue 一同探讨交流！

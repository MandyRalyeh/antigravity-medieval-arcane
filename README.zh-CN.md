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
  <a href="README.md">English</a> · <b>简体中文</b>
</p>

> **面向 Google Antigravity 客户端的中世纪奥术魔导书全套沉浸式主题与界面补丁**  
> *基于 Chrome 开发者工具协议运行时非侵入热注入 · 不改客户端原包 · 不重打安装包 · 零破坏自动更新 · 随时一键无损出厂还原*

---

## 为什么打造这套主题？

每天在 Google Antigravity 里面高强度编写代码、推演系统架构与训练模型，官方默认的冷灰色工业界面看久了极易产生视觉疲劳。市面上常见的主题往往停留在简单的色块替换或刺眼的赛博朋克霓虹色，与长时间深度沉浸编码所需的宁静专注背道而驰。

在这个项目中，我们追求的是一种**古典手抄本、古旧羊皮纸卷轴与微弱金色奥术星尘**带来的专注与平静。

### 核心设计哲学
1. **古典西方奇幻与现代精细审美的平衡**：
   彻底告别死板沉重的中世纪古早宗教感，也拒绝粗糙劣质的素材堆砌。我们确立了**“西方奇幻底蕴与日式二次元精细度交融”**的轻灵典雅魔导书风格；
2. **散布式微光奥术布局**：
   坚决不做大而笨重的单一图块遮挡视线，而是将高精度矢量法阵、星盘与流金微粒**以底纹形式轻盈散布在边缘与角落**，不喧宾夺主，保证核心工作区的信息密度与专注度；
3. **极致防眩光护眼排版**：
   采用温润的象牙羊皮纸暖金作为底色，文字经过多轮对比度博弈，确立为深沉凝练的铁胆铜墨（`#2B1D11`），边缘锐利清晰，全天候编码温润不刺眼；
4. **硬核现代前端渲染管线**：
   摒弃简陋的纯样式覆盖，底层直接开辟独立 WebGL 硬件加速画布（Three.js）渲染三维悬浮金尘微粒，配合浏览器原生矢量 SMIL 差速双向旋转法阵，兼顾高帧率沉浸感与超低系统开销。

---

## 视觉效果与全格式渲染展示

### 1. 展开态深色魔导书侧边栏与羊皮纸工作区
在打开侧边栏时，顶部羽毛图标、折叠键、搜索与前进后退按键自动自适应切为明亮象牙金，高对比度一目了然：
<p align="center">
  <img src="docs/images/05_sidebar_open_showcase.png" alt="侧边栏展开实机效果" width="850" />
</p>

### 2. 标准五大警示卡片与复杂表格
为手抄本风格重新调配了矿物色系警示卡片，折叠引用与数据表格均有专属柔光衬底：
<p align="center">
  <img src="docs/images/02_alerts_and_tables.png" alt="警示卡片与数据表格" width="850" />
</p>

### 3. 多语言高亮代码块与等宽排版
深度调谐主流编程语言的语法高亮，行高与字距针对更纱黑体（Sarasa Gothic）与 Fira Code 做了精细微调，长时间代码审阅舒适清晰：
<p align="center">
  <img src="docs/images/03_code_and_mermaid.png" alt="代码块展示" width="850" />
</p>

### 4. 矢量图表与科学公式
流程图、时序图、状态图与高斯积分、矩阵方程无缝融合，背景带有防文字穿透的柔光半透光卡片：
<p align="center">
  <img src="docs/images/04_mermaid_and_math.png" alt="图表与公式展示" width="850" />
</p>

---

## 攻坚历程：三大底层死穴的技术反编译剖析

在打造这套沉浸式主题的过程中，我们遭遇了三个常规前端手段根本无法解决的深坑，均通过反编译逆向排查并从架构层面彻底自愈：

### 1. 设置面板白屏卡死崩溃（Critical Bug）
* **故障现象**：在注入自定义主题后，用户只要点击界面左下角或菜单中的「Settings（设置）」，整个客户端窗口瞬间彻底白屏卡死，所有 UI 消失无法恢复，只能强杀进程。
* **底层根因**：逆向分析客户端底层前端代码发现，Antigravity 打开设置弹窗时，内部代码硬编码调用 `localStorage.getItem("theme-preset-light")` 去匹配官方内置主题字典。当注入的自定义主题名不在官方预设枚举中时，代码抛出未捕获的运行时异常（`Uncaught TypeError / Cannot read properties of undefined`），直接引发 React 根节点全局崩溃！
* **解决策略**：**作用域彻底隔离**。注入引擎严格将官方原生预设 key 维持在安全默认值（`"Default Light"`），将整套中世纪奥术主题的色彩变量、材质纹理与动效挂载完全剥离至私有独立作用域，让官方原生设置面板百分之百稳定可用。

### 2. 侧边栏展开/折叠状态“属性假死”与循环死锁
* **故障现象**：顶栏按键（羽毛笔、折叠键、搜索与前进后退）在侧边栏收起时看得清，一旦展开就变成深色黑块；修好了展开态的对比度，收起后又融入背景隐形看不清。常规 CSS 伪类与状态类陷入恶性循环。
* **底层根因**：审查 DOM 树发现两大陷阱：
  1. 官方前端将折叠按钮的 `aria-expanded` 属性**永久硬编码写死为了 false**，无论用户怎么点击开合，该属性纹丝不动；
  2. 顶部导航按键在物理结构上脱离了侧边栏主体，普通祖先/后代 CSS 选择器根本无法级联。
* **解决策略**：**内联变量感应分流引擎**。我们追踪到了 Antigravity 切换状态时底层唯一真实改变的变量——根节点上的内联样式宽度变量（`--sidebar-width`，展开时为特定像素，折叠时为 0px）。我们在注入引擎中构建了轻量级 MutationObserver，毫秒级感知该变量变动，并动态向根节点挂载 `[data-sidebar-state="open"]` 与 `[data-sidebar-state="collapsed"]` 状态标签，彻底把两套配色样式物理级分流解耦。

### 3. Windows 原生窗口控制三键明暗黑白块反编译破解
* **故障现象**：窗口右上角的原生系统按键（最小化、最大化、关闭）在浅色模式下呈现为突兀的纯白方块；而当用户切换到 Windows 深色模式后，三键背景立刻变成深黑，深色按键在黑块上完全隐形。
* **底层根因**：反编译客户端核心代码，抓出了官方底层的原生窗口控制逻辑：
  ```javascript
  // Antigravity 官方底层窗口控制逻辑
  q = getComputedStyle(document.documentElement).getPropertyValue("--sidebar");
  r = getComputedStyle(document.documentElement).getPropertyValue("--foreground");
  
  window.electronNative.setTitleBarOverlay({
    color: q || (n === "dark" ? "#131313" : "#FFFFFF"),
    symbolColor: r || (n === "dark" ? "#FAFAFA" : "#000000")
  });
  ```
  由于此前主题将根节点上的 `--sidebar` 赋予了侧边栏深木纹色（`#18120D`），导致在深色系统下，官方直接把该深色灌入了三键背景，并配上暗褐色图标，造成黑底黑字的视觉灾难！
* **解决策略**：**原生接口深度挂钩 + 根节点变量重定向**：
  1. 将根节点全局计算的 `--sidebar` 重定向为象牙羊皮纸暖金色（`#F6EFE2`），确保官方原生代码无论何时读取，都能拿到正确的羊皮纸底色；真实的左侧侧边栏内部容器则独立维持黑曜石深木纹；
  2. 注入层直接接管并主动调用 `window.electronNative.setTitleBarOverlay`，在窗口获得焦点、视口缩放与状态切换时持续守护，彻底消除明暗模式下的黑白块。

---

## 格式排版与视觉设计规范

针对日常工程中最常见的 Markdown 渲染元素，我们做了全面的视觉调谐：

### 1. GitHub 风格五大警示卡片（Alerts）
| 警示类型 | 边框微光色 | 卡片微透衬底 | 文字与符号色 | 调色理念 |
| :--- | :--- | :--- | :--- | :--- |
| **NOTE** | `rgba(65, 117, 164, 0.45)` | `rgba(235, 242, 248, 0.88)` | `#1D3B58` | 青金石矿物蓝，沉静典雅 |
| **TIP** | `rgba(46, 125, 50, 0.45)` | `rgba(238, 247, 239, 0.88)` | `#1B4D20` | 孔雀石矿物绿，温润启发 |
| **IMPORTANT** | `rgba(123, 44, 191, 0.45)` | `rgba(246, 240, 252, 0.88)` | `#48166D` | 紫晶魔晶浅紫，尊贵醒目 |
| **WARNING** | `rgba(184, 134, 11, 0.55)` | `rgba(253, 248, 235, 0.88)` | `#5E4204` | 琥珀流金暖黄，温和戒备 |
| **CAUTION** | `rgba(178, 34, 34, 0.45)` | `rgba(253, 240, 240, 0.88)` | `#661414` | 朱砂火漆深红，清晰警示 |

### 2. 代码块与等宽排版
- 代码容器采用柔和的淡色羊皮纸卡片，带有 1 像素古金边缘衬托；
- 主流语言（JavaScript, TypeScript, Python, Rust, Go, C++, Shell, CSS, HTML）高亮对比度全面超过 **14:1**；
- 完美适配更纱黑体（Sarasa Gothic Fixed / Mono）、Fira Code、JetBrains Mono 与 Consolas。

### 3. 图表与数学公式
- **Mermaid 流程图与时序图**：采用防穿透衬底，矢量线条与箭头强化为深褐色铁胆墨水色，节点文本清晰锐利；
- **KaTeX 数学公式**：行内公式与独立块级公式均配有柔光卡片底纹，杜绝复杂矩阵或多行积分字迹与背景法阵穿透重叠。

---

## 安全隔离与隐私保护承诺

我们在设计之初就将**数据安全与系统无损**作为最高准则：

1. 🛡️ **零数据触碰（Zero Data Touch）**：
   补丁仅在渲染层的内存中挂载 DOM、CSS 与 WebGL Canvas，**绝不读取、修改或写入你的 IndexedDB、SQLite、LevelDB 或任何本地聊天历史与工作区文件**。
2. 🔒 **零文件覆盖（Zero File Overwrite）**：
   不解包、不修改客户端安装目录下的二进制执行文件与核心 `.asar` 资源包。其他用户安装使用，绝不会继承或覆盖你的任何个人侧边栏项目列表。
3. 🧹 **100% 干净回退出厂状态（Clean Rollback）**：
   随时运行内置的卸载脚本，会在毫秒级终止后台守护进程、清理开机启动快捷方式，并自动向客户端派发卸载指令，瞬间还原回 Google Antigravity 原厂默认外观，无任何注册表或磁盘残留。
4. 🙈 **开源展示素材完全脱敏**：
   本仓库文档中的所有展示图均已对个人工作区路径、私有代码与真实对话进行高保真清洗脱敏，严守隐私安全底线。

---

## 快速安装与使用

### 环境要求
- Windows 10 / 11 或 macOS / Linux
- Node.js 18+ (推荐 Node.js 20 LTS)
- 已安装并正在运行的 Google Antigravity 客户端

### 方式 A：Windows 一键快速安装（推荐）

1. 克隆本仓库到本地目录：
   ```powershell
   git clone https://github.com/MandyRalyeh/antigravity-medieval-arcane.git
   cd antigravity-medieval-arcane
   ```

2. 运行一键后台安装脚本：
   ```powershell
   powershell -ExecutionPolicy Bypass -File scripts\install-windows.ps1
   ```
   * 脚本会自动启动无黑窗后台守护进程；
   * 自动在 Windows 开机启动项配置静默自启快捷方式；
   * 打开 Antigravity 即可看到完整的羊皮纸与星尘粒子效果。

### 方式 B：跨平台前台命令行运行 / 调试模式

适用于 macOS / Linux 或需要查看实时连接日志的高级开发者：
```bash
node src/daemon.js
```

---

## 一键无损卸载

如果你想还原回 Antigravity 原厂默认外观：

运行卸载脚本：
```powershell
powershell -ExecutionPolicy Bypass -File scripts\uninstall-windows.ps1
```
脚本会：
1. 优雅停止后台守护进程并清理运行锁；
2. 移除开机自启快捷方式；
3. 向客户端派发清理脚本，实时移除画布、矢量节点与样式表，恢复原生默认外观。

---

## 高级定制指南

本主题支持高度自定义。你可以直接编辑 `src/` 下的代码微调参数：

### 1. 调整 Three.js 金尘粒子
在 `src/inject.js` 中的粒子系统配置段：
* `particleCount`（默认 `120`）：浮游星尘的数量；
* `particleSize`（默认 `2.2`）：微粒像素大小；
* `repulsionRadius`（默认 `150`）：鼠标悬浮斥力场的扩散半径；
* `repulsionForce`（默认 `0.08`）：粒子避让鼠标的灵敏度。

### 2. 微调法阵旋转速度与透明度
在 `src/theme.css` 中检索法阵样式类：
* `#magic-circle-left`：左侧太阳秘术双环的旋转周期与透明度（默认 `opacity: 0.12`）；
* `#astrolabe-right`：右上侧天文钟星盘的旋转速度与透明度。

---

## 仓库结构

```text
antigravity-medieval-arcane/
├── docs/images/            # 干净脱敏的实机效果展示图
├── src/
│   ├── daemon.js           # 调试协议本地守护监听进程
│   ├── inject.js           # 核心运行时注入脚本（三维微粒 + 矢量动效 + 双状态分流引擎）
│   └── theme.css           # 独立样式表与色彩变量定义
├── scripts/
│   ├── install-windows.ps1 # Windows 一键静默安装与开机自启配置
│   ├── run-daemon.ps1      # 守护进程启动包装器
│   ├── start-daemon.vbs    # 无黑窗静默启动辅助脚本
│   └── uninstall-windows.ps1 # 一键完全卸载与出厂还原
├── assets/                 # 矢量纹章、法阵与羊皮纸纹理材质
├── CHANGELOG.md            # 英文更新日志
├── CHANGELOG.zh-CN.md      # 纯中文更新日志（含完整真实研发演进史）
├── LICENSE                 # MIT 开源协议
├── package.json            # 项目配置与脚本入口
├── README.md               # 英文主文档
└── README.zh-CN.md         # 纯中文主文档
```

---

## 许可证

本项目基于 [MIT License](LICENSE) 开源。欢迎 Star、Fork 或提交 Issue 交流探讨！

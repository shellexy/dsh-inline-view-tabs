# dsh-inline-view-tabs

把 DeepSeek Harness Web 顶栏里单独占一行的会话视图标签（「对话」/「轨迹」，以及其它插件注册的视图）**并入顶栏同一行**，放在标题之后、右侧工具图标之前，省下一行高度。

![顶栏效果：标题之后是「对话 / 轨迹」，再往右是工具图标与右侧栏开关](https://raw.githubusercontent.com/shellexy/dsh-inline-view-tabs/main/docs/header.png)

*安装后的顶栏：原来单独一行的「对话 / 轨迹」并入了这一行。*

```text
之前：                              之后：
┌──────────────────────────────┐   ┌──────────────────────────────────────┐
│ 标题              ⚙  ◧        │   │ 标题       对话  轨迹  ⚙  ◧           │
│ 对话  轨迹                    │   └──────────────────────────────────────┘
└──────────────────────────────┘
```

## 安装

在 DSH 的插件页安装 bundle `dsh-inline-view-tabs`（npm 包，装完刷新一次页面）：

```sh
npm view dsh-inline-view-tabs
```

也可以把本仓库目录作为本地 bundle 安装；插件只有浏览器 half：`client.js` 向页面追加一段样式表，Host 侧 `apply()` 为空。

## 实现

- 选择器只依赖 dsh shell 公开的 DOM 锚点：`header[data-window-drag]`、`[data-conversation-header-corner]`、`[data-conversation-tabs]`、`[role="tab"]`，不依赖编译后的哈希类名。
- 标题行被设为 `display: contents`，它内部的「标题 / 工具图标 / 右侧栏开关」因此成为顶栏自身的 flex 子项，再用 `order` 排成「标题 → 视图标签 → 工具图标 → 右侧栏开关」。
- 标签行预留 288px 的测量宽度：顶栏按 `floor((行宽 - 48) / 120)` 决定显示几个标签，其余折叠进「⋯」。预留宽度只影响标题可用宽度，视觉上表现为标题后的空白，因此「对话」「轨迹」会一直显示。

## 边界

- 所有规则都以「顶栏仍渲染视图标签行」为前提（`:has([data-conversation-tabs])`），所以只有 1 个视图、空白新会话、以及被其它插件替换过的 `conversation.session.header` 都不受影响。
- 顶栏高度由约 76px 降到约 48px；窗口很窄时标签仍按原生规则折叠，不会盖住标题。
- 标题行不再作为尺寸容器（`container-type`），窗口窄到约 540px 以下时标题旁的 agent 预设标签不会再自动隐藏文字。
- 依赖 dsh 顶栏的 DOM 结构；若上游改动这些锚点，样式不再匹配，界面退回原来的两行布局，不会破坏其它功能。

测试于 dsh `0.2.1-rc.5`（Web / WebKitGTK）。

## License

MIT

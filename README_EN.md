# dsh-inline-view-tabs

Brings the Conversation View tabs of DeepSeek Harness Web (Chat / Trajectory, plus any View another plugin registers) onto the header's own row, between the title and the right-side controls — reclaiming one row of height.

![Header after install: Chat and Trajectory sit between the title and the right-side controls](https://raw.githubusercontent.com/shellexy/dsh-inline-view-tabs/main/docs/header.png)

*Header after install: the Chat / Trajectory row is gone, folded into the header line.*

```text
before:                            after:
┌──────────────────────────────┐   ┌──────────────────────────────────────┐
│ Title             ⚙  ◧       │   │ Title       Chat  Trajectory  ⚙  ◧   │
│ Chat  Trajectory             │   └──────────────────────────────────────┘
└──────────────────────────────┘
```

## Install

Install the bundle `dsh-inline-view-tabs` from DSH's plugin page (npm package; reload the page once afterwards).

You can also install this repository directory as a local bundle. The plugin is browser-only: `client.js` appends one stylesheet to the page and the Host `apply()` is empty.

## How it works

- Every selector stays on DOM anchors the shell publishes — `header[data-window-drag]`, `[data-conversation-header-corner]`, `[data-conversation-tabs]`, `[role="tab"]` — never on compiled hash class names.
- The header's title row becomes `display: contents`, so its three children (title cluster, utilities, corner) join the header's own flex line; `order` arranges them as title → View tabs → utilities → right-sidebar toggle.
- The tab row reserves 288px of measured width: the header shows `floor((width - 48) / 120)` tabs and folds the rest into "…". The reserved width only shrinks the title's available space, so both Chat and Trajectory stay visible.

## Boundaries

- Every rule is gated on the header actually rendering the View tab row (`:has([data-conversation-tabs])`), so single-View sessions, blank sessions, and a `conversation.session.header` replaced by another plugin are untouched.
- The header drops from ~76px to ~48px; very narrow windows still fold tabs by the native rule instead of covering the title.
- The title row no longer acts as a size container (`container-type`); below roughly 540px the agent-preset chip next to the title stops hiding its label.
- The styles depend on dsh's header DOM anchors. If upstream changes them the rules stop matching and the header falls back to its original two-row layout — nothing else breaks.

Tested with dsh `0.2.1-rc.5` (Web / WebKitGTK).

## License

MIT
